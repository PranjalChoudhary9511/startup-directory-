import fs from "node:fs";
import path from "node:path";
const [bookPath, dl] = process.argv.slice(2);
const b = JSON.parse(fs.readFileSync(bookPath, "utf8"));
const t = {};
for (let i = 0; i < b.sources.length; i++) { const f = path.join(dl, `${i}.txt`); if (fs.existsSync(f)) { const s = fs.readFileSync(f, "utf8"); if (s.length > 1500) t[i] = s.replace(/&#036;/g, "$").replace(/\s+/g, " "); } }
const nums = (s) => {
  const out = new Set();
  for (const m of s.matchAll(/\$\s?[\d][\d,.]*\d|\$\d|₹[\d,.]+|€[\d.]+|\b\d[\d,.]*\d?%|\b\d{1,3}(?:,\d{3})+\b|\b\d+\.\d+\b/g)) out.add(m[0].replace(/[\s]/g, "").replace(/\.$/, ""));
  return [...out];
};
const has = (n, txt) => {
  const bare = n.replace(/^[$₹€]/, "");
  if (txt.includes(bare)) return true;
  const noComma = bare.replace(/,/g, "");
  if (txt.includes(noComma)) return true;
  return false;
};
const miss = [];
const check = (s, src, where) => {
  const avail = (src || []).filter((i) => t[i]);
  if (!avail.length) { miss.push(`NOSRC ${where} ${JSON.stringify(src)} :: ${nums(s).join(" ")}`); return; }
  const m = nums(s).filter((n) => !avail.some((i) => has(n, t[i])));
  if (m.length) miss.push(`${where} ${JSON.stringify(src)} :: ${m.join(" ")}`);
};
b.chapters.forEach((c) => c.blocks.forEach((x, j) => {
  const w = `${c.id}[${j}]`;
  if (x.t === "p" || x.t === "example") check(x.text, x.src, w);
  if (x.t === "venture") check([x.idea, x.decision, x.howStarted, x.funding, x.whatHappened].join(" "), x.src, w + " " + x.name);
  if (x.t === "facts") x.items.forEach((it) => check(it.value + " " + it.label, it.src, w));
  if (x.t === "timeline") x.items.forEach((it) => check(it.text, it.src, w));
}));
console.log(miss.length); miss.forEach((m) => console.log(m));
