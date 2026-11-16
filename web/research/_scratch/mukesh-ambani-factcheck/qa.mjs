// QA on the corrected book: quotes vs sources, copied runs, Wikipedia left, walls of paragraphs.
import fs from "node:fs";
import path from "node:path";
const root = "C:/Users/Pranjal Choudhary/Desktop/start-up derectory/web/";
const dir = root + "research/_scratch/mukesh-ambani-factcheck/";
const b = JSON.parse(fs.readFileSync(root + "src/content/billionaires/books/mukesh-ambani.json", "utf8"));
const old = JSON.parse(fs.readFileSync(dir + "book-merged.json", "utf8"));
const ns = JSON.parse(fs.readFileSync(dir + "newsrc.json", "utf8"));
const norm = (s) => s.toLowerCase().replace(/&#x27;|&#039;|&rsquo;|&lsquo;|&ldquo;|&rdquo;|&quot;|\\u201[89cd]/g, "").replace(/[\u2018\u2019\u201c\u201d'"`]/g, "").replace(/[^a-z0-9₹ ]+/g, " ").replace(/\s+/g, " ").trim();
const byUrl = {};
const add = (url, f) => { if (fs.existsSync(f)) byUrl[url] = (byUrl[url] || "") + " " + norm(fs.readFileSync(f, "utf8")); };
old.sources.forEach((s, i) => add(s.url, `${dir}pages/${i}.txt`));
Object.entries(ns).forEach(([k, s]) => add(s.url, `${dir}pagesx/${k}.txt`));
[["bs126", "https://www.business-standard.com/article/companies/reliance-industries-sells-us-shale-block-for-126-million-117100601142_1.html"], ["scroll", "https://amp.scroll.in/article/778534/scroll_in"], ["btjio", "https://www.businesstoday.in/story/ril-agm-mukesh-ambani-announces-reliance-jio-hiring-plans/1/195640.html"], ["bs50", "https://www.business-standard.com/article/pti-stories/jio-crosses-50-million-subscriber-mark-in-83-days-116112801292_1.html"]].forEach(([k, u]) => add(u, `${dir}pagesx/${k}.txt`));
// McKinsey blocks bots; compare with the full reprint and Mint.
add("https://www.mckinsey.com/featured-insights/future-of-asia/mukesh-ambanis-bold-ambitions-building-businesses-of-the-future", `${dir}pagesx/mckprint.txt`);
const T = (i) => byUrl[b.sources[i].url] || "";
const items = [];
const inl = (text, s, where) => { const t = text.replace(/\*\*|__|==/g, ""); for (const m of t.matchAll(/[“"]([^”"]{6,}?)[”"]/g)) items.push({ where, q: m[1], s }); };
b.chapters.forEach((ch, ci) => ch.blocks.forEach((x, i) => {
  const w = `${ci}.${i}`;
  if (x.t === "quote") items.push({ where: w + "Q", q: x.text.replace(/\*\*|__|==/g, ""), s: x.src });
  if (x.t === "p" || x.t === "example") inl(x.text, x.src, w);
  if (x.t === "venture") ["idea", "decision", "howStarted", "funding", "whatHappened"].forEach((k) => inl(x[k], x.src, w + k));
  if (x.items) x.items.forEach((it) => inl(it.text || it.label, it.src, w));
}));
let ok = 0;
for (const it of items) {
  const n = norm(it.q);
  if (it.s.some((i) => T(i).includes(n))) { ok++; continue; }
  console.log(`QUOTE? ${it.where} [${it.s}] ${it.q}`);
}
console.log(`quotes ${items.length} ok ${ok}`);
// copied runs: 11-word shingle overlap with cited sources, outside quotes
let copied = 0;
b.chapters.forEach((ch, ci) => ch.blocks.forEach((x, i) => {
  const texts = x.t === "venture" ? ["idea", "decision", "howStarted", "funding", "whatHappened"].map((k) => x[k]) : x.t === "p" || x.t === "example" ? [x.text] : [];
  for (const raw of texts) {
    const t = norm(raw.replace(/[“"][^”"]*[”"]/g, " | ").replace(/\*\*|__|==/g, ""));
    const w = t.split(" ");
    let best = "";
    for (let k = 0; k + 11 <= w.length; k++) {
      const sh = w.slice(k, k + 11).join(" ");
      if (sh.includes("|")) continue;
      if ((x.src || []).some((s) => T(s).includes(sh))) { if (!best) best = sh; }
    }
    if (best) { copied++; console.log(`COPY? ${ci}.${i} [${best}]`); }
  }
}));
console.log("copied runs", copied);
console.log("wikipedia sources left:", b.sources.filter((s) => /wikipedia\.org/.test(s.url)).map((s) => s.url));
b.chapters.forEach((c) => {
  let run = 0, mx = 0;
  c.blocks.forEach((x) => { run = x.t === "p" ? run + 1 : 0; mx = Math.max(mx, run); });
  if (mx > 4) console.log("wall", c.id, mx);
});
const missing = b.sources.map((s, i) => (byUrl[s.url] ? null : i + " " + s.url.slice(0, 80))).filter(Boolean);
console.log("sources with no page read:", missing);
