import fs from "node:fs";
import path from "node:path";
const [bookPath, dl] = process.argv.slice(2);
const b = JSON.parse(fs.readFileSync(bookPath, "utf8"));
const norm = (s) =>
  s
    .toLowerCase()
    .replace(/[‘’‚‛`´]/g, "'")
    .replace(/[“”„]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/\*\*|__|==/g, "")
    .replace(/[^a-z0-9$%. ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const text = {};
for (let i = 0; i < b.sources.length; i++) {
  const f = path.join(dl, `${i}.txt`);
  text[i] = fs.existsSync(f) ? norm(fs.readFileSync(f, "utf8")) : null;
}
const out = [];
function check(q, src, where) {
  const n = norm(q).replace(/\.$/, "");
  if (n.length < 6) return;
  const avail = src.filter((i) => text[i] && text[i].length > 1500);
  const hit = avail.find((i) => text[i].includes(n));
  let other = null;
  if (hit === undefined) {
    for (let i = 0; i < b.sources.length; i++) if (text[i] && text[i].includes(n)) { other = i; break; }
  }
  out.push({ where, q, src, status: hit !== undefined ? "OK" : other !== null ? `ELSEWHERE:${other}` : avail.length ? "NOT-IN-CITED" : "UNAVAILABLE" });
}
b.chapters.forEach((c, ci) =>
  c.blocks.forEach((x, j) => {
    const w = `${c.id}[${j}]`;
    if (x.t === "quote") check(x.text, x.src, w + " QUOTE");
    for (const k of ["text", "idea", "decision", "howStarted", "funding", "whatHappened"]) {
      if ((x.t === "p" || x.t === "example" || x.t === "venture") && x[k]) {
        for (const m of x[k].matchAll(/[“"]([^”"]{6,}?)[”"]/g)) check(m[1], x.src, w + " inline");
      }
    }
    if (x.t === "timeline") x.items.forEach((it, n) => { for (const m of it.text.matchAll(/[“"]([^”"]{6,}?)[”"]/g)) check(m[1], it.src, `${w}.${n} inline`); });
  })
);
const by = {};
for (const r of out) by[r.status.split(":")[0]] = (by[r.status.split(":")[0]] || 0) + 1;
console.log(by);
for (const r of out) if (r.status !== "OK") console.log(r.status, "|", r.where, "|", JSON.stringify(r.src), "|", r.q);
