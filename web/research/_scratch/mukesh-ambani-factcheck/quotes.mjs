// Compare every quoted string in the book with the text of the sources it cites.
import fs from "node:fs";
import path from "node:path";
const root = "C:/Users/Pranjal Choudhary/Desktop/start-up derectory/web";
const pdir = path.join(root, "research/_scratch/mukesh-ambani-factcheck/pages");
const b = JSON.parse(fs.readFileSync(path.join(root, "src/content/billionaires/books/mukesh-ambani.json"), "utf8"));
const norm = (s) => s.toLowerCase().replace(/[\u2018\u2019\u201c\u201d'"`]/g, "").replace(/[^a-z0-9₹ ]+/g, " ").replace(/\s+/g, " ").trim();
const texts = {};
for (const f of fs.readdirSync(pdir)) {
  const m = f.match(/^(\d+)(?:\.[a-z]+)?\.txt$/);
  if (m) texts[m[1]] = (texts[m[1]] || "") + " " + norm(fs.readFileSync(path.join(pdir, f), "utf8"));
}
const has = (i, q) => (texts[i] || "").includes(q);
const items = [];
const inline = (text, src, where) => {
  const t = text.replace(/\*\*|__|==/g, "");
  const re = /[“"]([^”"]{6,}?)[”"]/g;
  let m;
  while ((m = re.exec(t))) items.push({ where, q: m[1], src });
};
b.chapters.forEach((ch, ci) =>
  ch.blocks.forEach((x, i) => {
    const w = `${ci}.${i}`;
    if (x.t === "quote") items.push({ where: w + " Q", q: x.text.replace(/\*\*|__|==/g, ""), src: x.src });
    if (x.t === "p" || x.t === "example") inline(x.text, x.src, w);
    if (x.t === "venture") ["idea", "decision", "howStarted", "funding", "whatHappened"].forEach((k) => inline(x[k], x.src, w + k));
    if (x.t === "facts" || x.t === "timeline") x.items.forEach((it) => inline(it.text || it.label, it.src, w));
  })
);
let ok = 0;
for (const it of items) {
  const n = norm(it.q);
  const found = it.src.filter((i) => has(i, n));
  if (found.length) { ok++; continue; }
  const words = n.split(" ");
  // partial match: longest run of the first half inside cited
  const others = Object.keys(texts).filter((k) => has(k, n));
  const missingText = it.src.filter((i) => !texts[i] || texts[i].length < 1500);
  console.log(`MISS ${it.where} src=[${it.src}] ${missingText.length ? "nopage=[" + missingText + "] " : ""}${others.length ? "foundIn=[" + others + "] " : ""}:: ${it.q}`);
}
console.log(`quotes ${items.length}, verified ${ok}`);
