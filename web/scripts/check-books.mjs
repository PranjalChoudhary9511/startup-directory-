// Validates Billion Dollar PDFs books in src/content/billionaires/books/*.json against the book
// SOP (see src/content/billionaires/book-schema.ts).
//   node scripts/check-books.mjs                 # all books
//   node scripts/check-books.mjs elon-musk       # some books
//   add --online to also check that every photo and source URL resolves
import fs from "node:fs";
import path from "node:path";

const dir = path.join(import.meta.dirname, "../src/content/billionaires/books");
const args = process.argv.slice(2);
const online = args.includes("--online");
const only = args.filter((a) => !a.startsWith("--"));
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".json")) : [];
const picked = only.length ? files.filter((f) => only.includes(f.replace(/\.json$/, ""))) : files;

const LICENSE = /^(public domain|pd|cc0|cc by(-sa)? [1-4]\.0|cc by(-sa)? 2\.5|cc by(-sa)? 3\.0|cc by(-sa)? 2\.0)/i;
const OUTCOMES = new Set(["failed", "shut", "sold", "merged", "pivoted", "running", "public"]);
const PLATFORMS = new Set(["x", "linkedin", "instagram", "facebook", "youtube", "threads", "telegram", "tiktok", "weibo", "website", "other"]);
const CHANNELS = new Set(["phone", "email", "form", "address", "website", "whatsapp"]);
// Personal-contact guard: free-mail addresses are never a published business channel.
const PERSONAL_MAIL = /@(gmail|yahoo|hotmail|outlook|icloud|proton(mail)?|aol|live|me)\./i;
let total = 0;

async function ok(url) {
  for (let attempt = 0; ; attempt++) {
    try {
      const r = await fetch(url, { method: "GET", redirect: "follow", headers: { "user-agent": "firstrupee-books-check/1.0 (education)" } });
      if (r.status === 429 && attempt < 4) {
        await new Promise((res) => setTimeout(res, 1500 * 2 ** attempt));
        continue;
      }
      return r.status < 400 ? null : r.status;
    } catch (e) {
      return e.code || "ERR";
    }
  }
}

for (const f of picked) {
  const problems = [];
  const bad = (m) => problems.push(m);
  let b;
  try {
    b = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  } catch (e) {
    console.log(`✗ ${f}: invalid JSON (${e.message})`);
    total++;
    continue;
  }
  const S = b.sources?.length ?? 0;
  const cite = (c, where) => {
    if (!Array.isArray(c) || c.length === 0) return bad(`${where}: missing src`);
    for (const i of c) if (!Number.isInteger(i) || i < 0 || i >= S) bad(`${where}: src index ${i} out of range (0–${S - 1})`);
  };
  const str = (v, where, min = 1) => (typeof v !== "string" || v.trim().length < min) && bad(`${where}: missing text`);
  const photo = (p, where) => {
    if (p === null) return;
    if (!p || typeof p !== "object") return bad(`${where}: not a photo`);
    if (!/^https:\/\/upload\.wikimedia\.org\//.test(p.url ?? "")) bad(`${where}: url must be upload.wikimedia.org`);
    if (!/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/.test(p.page ?? "")) bad(`${where}: page must be a Commons File: page`);
    if (!LICENSE.test(p.license ?? "")) bad(`${where}: licence "${p.license}" not an allowed free licence`);
    str(p.author, `${where}.author`);
    str(p.caption, `${where}.caption`);
  };

  if (b.slug !== f.replace(/\.json$/, "")) bad(`slug "${b.slug}" ≠ filename`);
  for (const k of ["name", "title", "subtitle", "hook"]) str(b[k], k);
  cite(b.hookSrc, "hookSrc");
  photo(b.portrait, "portrait");
  (b.photos ?? []).forEach((p, i) => photo(p, `photos[${i}]`));
  if ((b.glance?.length ?? 0) < 6) bad(`glance: ${b.glance?.length ?? 0}, need ≥ 6`);
  (b.glance ?? []).forEach((g, i) => cite(g.src, `glance[${i}]`));

  const C = b.contact ?? {};
  str(C.howToReach, "contact.howToReach", 60);
  if ((C.channels?.length ?? 0) < 2) bad("contact.channels: need ≥ 2");
  (C.channels ?? []).forEach((c, i) => {
    if (!CHANNELS.has(c.kind)) bad(`contact.channels[${i}].kind "${c.kind}"`);
    if (PERSONAL_MAIL.test(c.value ?? "")) bad(`contact.channels[${i}]: personal email address not allowed`);
    str(c.whose, `contact.channels[${i}].whose`);
    cite(c.src, `contact.channels[${i}]`);
  });
  (C.socials ?? []).forEach((s, i) => {
    if (!PLATFORMS.has(s.platform)) bad(`contact.socials[${i}].platform "${s.platform}"`);
    if (!/^https:\/\//.test(s.url ?? "")) bad(`contact.socials[${i}].url`);
    cite(s.src, `contact.socials[${i}]`);
  });

  const ids = new Set();
  let words = 0;
  let ventures = 0;
  if ((b.chapters?.length ?? 0) < 8) bad(`chapters: ${b.chapters?.length ?? 0}, need ≥ 8`);
  (b.chapters ?? []).forEach((ch, ci) => {
    const at = `chapters[${ci}]`;
    if (!/^[a-z0-9-]+$/.test(ch.id ?? "") || ids.has(ch.id)) bad(`${at}.id "${ch.id}" missing, not kebab-case or repeated`);
    ids.add(ch.id);
    str(ch.title, `${at}.title`);
    if ((ch.blocks?.length ?? 0) < 4) bad(`${at}: ${ch.blocks?.length ?? 0} blocks, need ≥ 4`);
    (ch.blocks ?? []).forEach((x, i) => {
      const w = `${at}.blocks[${i}]`;
      words += JSON.stringify(x).split(/\s+/).length;
      switch (x.t) {
        case "p":
        case "example":
          str(x.text, w);
          cite(x.src, w);
          break;
        case "quote":
          str(x.text, w);
          str(x.who, `${w}.who`);
          cite(x.src, w);
          break;
        case "h":
        case "note":
          str(x.text, w);
          if (x.t === "note" && x.text.split(/\s+/).length > 16) bad(`${w}: note longer than 16 words`);
          break;
        case "facts":
        case "timeline":
          if (!(x.items?.length >= 2)) bad(`${w}: need ≥ 2 items`);
          (x.items ?? []).forEach((it, j) => cite(it.src, `${w}.items[${j}]`));
          break;
        case "photo":
          photo(x.photo, `${w}.photo`);
          break;
        case "venture":
          ventures++;
          if (!OUTCOMES.has(x.outcome)) bad(`${w}.outcome "${x.outcome}"`);
          for (const k of ["name", "idea", "decision", "howStarted", "funding", "whatHappened", "lesson"]) str(x[k], `${w}.${k}`);
          cite(x.src, w);
          break;
        case "lesson":
          str(x.title, `${w}.title`);
          str(x.text, `${w}.text`);
          break;
        default:
          bad(`${w}: unknown block type "${x.t}"`);
      }
    });
  });
  if (ventures < 2) bad(`ventures: ${ventures}, need ≥ 2 (every company, including failures)`);
  if (words < 9000) bad(`book is ~${words} words, need ≥ 9000`);
  if ((b.lessons?.length ?? 0) < 10) bad(`lessons: ${b.lessons?.length ?? 0}, need ≥ 10`);
  if (S < 25) bad(`sources: ${S}, need ≥ 25`);
  (b.sources ?? []).forEach((s, i) => !/^https?:\/\//.test(s.url ?? "") && bad(`sources[${i}].url`));
  str(b.factCheck?.method, "factCheck.method");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.verifiedAt ?? "")) bad("verifiedAt: need YYYY-MM-DD");

  if (online) {
    const photos = [b.portrait, ...(b.photos ?? []), ...(b.chapters ?? []).flatMap((c) => c.blocks.filter((x) => x.t === "photo").map((x) => x.photo))].filter(Boolean);
    for (const p of photos) {
      const s = await ok(p.url);
      if (s) bad(`photo ${p.url} → ${s}`);
    }
    for (const [i, s] of (b.sources ?? []).entries()) {
      const r = await ok(s.url);
      if (r) bad(`sources[${i}] ${s.url} → ${r} (check by hand; some sites block bots)`);
    }
  }

  total += problems.length;
  console.log(problems.length ? `✗ ${f} (~${words} words)\n  - ${problems.join("\n  - ")}` : `✓ ${f} (~${words} words, ${b.chapters.length} chapters, ${S} sources)`);
}
console.log(`\n${picked.length} file(s), ${total} problem(s)`);
process.exit(total ? 1 : 0);
