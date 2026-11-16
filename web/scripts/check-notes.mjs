// Validates brand notes in src/content/stories/notes/*.json against the notes SOP
// (see src/content/stories/notes-schema.ts).
//   node scripts/check-notes.mjs            # all files
//   node scripts/check-notes.mjs rolex nike # some files
//   add --online to also check that every photo and source URL resolves
import fs from "node:fs";
import path from "node:path";

const dir = path.join(import.meta.dirname, "../src/content/stories/notes");
const args = process.argv.slice(2);
const online = args.includes("--online");
const only = args.filter((a) => !a.startsWith("--"));
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".json")) : [];
const picked = only.length ? files.filter((f) => only.includes(f.replace(/\.json$/, ""))) : files;

const HEX = /^#[0-9a-f]{6}$/i;
const KINDS = new Set(["life", "job", "attempt", "failure", "breakthrough", "now"]);
const LICENSE = /^(public domain|pd|cc0|cc by(-sa)? [1-4]\.0|cc by(-sa)? 2\.5|cc by(-sa)? 3\.0|cc by(-sa)? 2\.0)/i;
let total = 0;

async function ok(url) {
  // Wikimedia rate-limits bursts with 429: back off and retry before calling it broken.
  for (let attempt = 0; ; attempt++) {
    try {
      const r = await fetch(url, { method: "GET", redirect: "follow", headers: { "user-agent": "firstrupee-notes-check/1.0 (education)" } });
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
  const warnings = [];
  const bad = (m) => problems.push(m);
  const warn = (m) => warnings.push(m);
  let n;
  try {
    n = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  } catch (e) {
    console.log(`✗ ${f}: invalid JSON (${e.message})`);
    total++;
    continue;
  }
  const S = n.sources?.length ?? 0;
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

  if (n.slug !== f.replace(/\.json$/, "")) bad(`slug "${n.slug}" ≠ filename`);
  for (const k of ["primary", "secondary", "accent", "ink", "paper"]) if (!HEX.test(n.palette?.[k] ?? "")) bad(`palette.${k} not a #rrggbb hex`);
  str(n.tagline, "tagline");
  str(n.hook, "hook");
  cite(n.hookSrc, "hookSrc");
  (n.cast ?? []).forEach((c, i) => {
    str(c.name, `cast[${i}].name`);
    photo(c.photo, `cast[${i}].photo`);
    cite(c.src, `cast[${i}]`);
  });

  const F = n.founder ?? {};
  str(F.name, "founder.name");
  str(F.background, "founder.background", 120);
  cite(F.backgroundSrc, "founder.background");
  photo(F.portrait, "founder.portrait");
  (F.photos ?? []).forEach((p, i) => photo(p, `founder.photos[${i}]`));
  if ((F.journey?.length ?? 0) < 8) bad(`founder.journey: ${F.journey?.length ?? 0} steps, need ≥ 8`);
  (F.journey ?? []).forEach((j, i) => {
    if (!KINDS.has(j.kind)) bad(`journey[${i}].kind "${j.kind}"`);
    str(j.title, `journey[${i}].title`);
    cite(j.src, `journey[${i}]`);
  });
  if (!(F.journey ?? []).some((j) => j.kind === "failure")) bad("founder.journey: no failure step");
  if ((F.mindset?.length ?? 0) < 3) bad("founder.mindset: need ≥ 3");
  (F.mindset ?? []).forEach((m, i) => cite(m.src, `mindset[${i}]`));
  (F.habits ?? []).forEach((m, i) => cite(m.src, `habits[${i}]`));
  str(F.darkestHour?.story, "darkestHour.story", 80);
  cite(F.darkestHour?.src, "darkestHour");
  if (F.genuineness) cite(F.genuineness.src, "genuineness");
  str(F.now, "founder.now");
  cite(F.nowSrc, "founder.now");

  if ((n.numbers?.length ?? 0) < 4) bad("numbers: need ≥ 4");
  (n.numbers ?? []).forEach((x, i) => {
    str(x.asOf, `numbers[${i}].asOf`);
    cite(x.src, `numbers[${i}]`);
  });
  if ((n.milestones?.length ?? 0) < 6) bad("milestones: need ≥ 6");
  (n.milestones ?? []).forEach((x, i) => cite(x.src, `milestones[${i}]`));
  cite(n.howItMakesMoney?.src, "howItMakesMoney");
  if ((n.howItMakesMoney?.flows?.length ?? 0) < 2) bad("howItMakesMoney.flows: need ≥ 2");
  if ((n.failures?.length ?? 0) < 2) bad("failures: need ≥ 2");
  (n.failures ?? []).forEach((x, i) => cite(x.src, `failures[${i}]`));
  (n.mythVsFact ?? []).forEach((x, i) => cite(x.src, `mythVsFact[${i}]`));
  if ((n.quotes?.length ?? 0) < 2) bad("quotes: need ≥ 2");
  (n.quotes ?? []).forEach((x, i) => cite(x.src, `quotes[${i}]`));
  if (n.lessons?.length !== 5) bad(`lessons: ${n.lessons?.length ?? 0}, need exactly 5`);
  (n.moments ?? []).forEach((m, i) => {
    if (!/^[\w-]{11}$/.test(m.youtubeId ?? "")) bad(`moments[${i}].youtubeId`);
    if (!Number.isInteger(m.at) || m.at < 0) bad(`moments[${i}].at`);
  });
  if (S < 8) bad(`sources: ${S}, need ≥ 8`);
  (n.sources ?? []).forEach((s, i) => !/^https?:\/\//.test(s.url ?? "") && bad(`sources[${i}].url`));
  str(n.factCheck?.method, "factCheck.method");

  if (online) {
    const photos = [F.portrait, ...(F.photos ?? []), ...(n.cast ?? []).map((c) => c.photo)].filter(Boolean);
    for (const p of photos) {
      const s = await ok(p.url);
      if (s) bad(`photo ${p.url} → ${s}`);
    }
    for (const [i, s] of (n.sources ?? []).entries()) {
      const r = await ok(s.url);
      // 401/403 is usually a bot wall (Cloudflare etc.), not a dead page: warn, check by hand.
      if (r === 401 || r === 403) warn(`sources[${i}] ${s.url} → ${r} (bot wall? open it in a browser to confirm)`);
      else if (r) bad(`sources[${i}] ${s.url} → ${r}`);
    }
  }

  total += problems.length;
  console.log(problems.length ? `✗ ${f}\n  - ${problems.join("\n  - ")}` : `✓ ${f}`);
  if (warnings.length) console.log(`  ! ${warnings.join("\n  ! ")}`);
}
console.log(`\n${picked.length} file(s), ${total} problem(s)`);
process.exit(total ? 1 : 0);
