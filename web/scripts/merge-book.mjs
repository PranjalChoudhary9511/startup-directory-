// Merges research fragments into one Billion Dollar PDFs book.
//   node scripts/merge-book.mjs elon-musk
// Reads research/billionaires/<slug>/{profile,part-1,part-2,part-3}.json (any that exist),
// re-numbers every `src` into one combined, de-duplicated `sources` list, and writes
// src/content/billionaires/books/<slug>.json. Chapters keep fragment order (part-1, 2, 3).
import fs from "node:fs";
import path from "node:path";

const root = path.join(import.meta.dirname, "..");
const slug = process.argv[2];
if (!slug) {
  console.error("usage: node scripts/merge-book.mjs <slug>");
  process.exit(1);
}
const dir = path.join(root, "research/billionaires", slug);
const PARTS = ["profile", "part-1", "part-2", "part-3"];

const sources = [];
const byUrl = new Map();
const keyOf = (u) => u.trim().replace(/#.*$/, "").replace(/\/+$/, "");

/** Deep-walks a value, rewriting every `src` / `hookSrc` array through `map`. */
function renumber(v, map) {
  if (Array.isArray(v)) return v.map((x) => renumber(x, map));
  if (v && typeof v === "object") {
    const out = {};
    for (const [k, x] of Object.entries(v)) {
      out[k] = (k === "src" || k === "hookSrc") && Array.isArray(x) ? [...new Set(x.map(map).filter((i) => i !== undefined))] : renumber(x, map);
    }
    return out;
  }
  return v;
}

const book = { slug, chapters: [], photos: [], lessons: [], factCheck: { method: "", disputed: [] } };
for (const part of PARTS) {
  const f = path.join(dir, `${part}.json`);
  if (!fs.existsSync(f)) continue;
  const frag = JSON.parse(fs.readFileSync(f, "utf8"));
  const local = (frag.sources ?? []).map((s) => {
    const k = keyOf(s.url);
    if (!byUrl.has(k)) {
      byUrl.set(k, sources.length);
      sources.push({ label: s.label, url: s.url.trim() });
    }
    return byUrl.get(k);
  });
  const { sources: _, ...rest } = renumber(frag, (i) => local[i]);
  for (const [k, v] of Object.entries(rest)) {
    if (k === "chapters" || k === "photos" || k === "lessons") book[k].push(...v);
    else if (k === "factCheck") {
      book.factCheck.disputed.push(...(v.disputed ?? []));
      if (v.method) book.factCheck.method = [book.factCheck.method, v.method].filter(Boolean).join(" ");
    } else book[k] = v;
  }
}
book.sources = sources;

const outDir = path.join(root, "src/content/billionaires/books");
fs.mkdirSync(outDir, { recursive: true });
const order = ["slug", "name", "verifiedAt", "title", "subtitle", "hook", "hookSrc", "portrait", "photos", "glance", "contact", "chapters", "lessons", "sources", "factCheck"];
const sorted = Object.fromEntries([...order.filter((k) => k in book).map((k) => [k, book[k]]), ...Object.entries(book).filter(([k]) => !order.includes(k))]);
fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(sorted, null, 2) + "\n");
const words = JSON.stringify(book.chapters).split(/\s+/).length;
console.log(`✓ ${slug}: ${book.chapters.length} chapters, ~${words} words, ${sources.length} sources`);
