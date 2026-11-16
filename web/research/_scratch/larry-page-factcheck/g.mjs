// Usage: node g.mjs <idx|all> <width> <regex> [regex...]  : prints context around matches in downloaded text
import fs from "node:fs";
import path from "node:path";
const [idx, width, ...res] = process.argv.slice(2);
const dl = path.join(import.meta.dirname, "dl");
const list = idx === "all" ? fs.readdirSync(dl).filter((f) => f.endsWith(".txt")).map((f) => f.replace(".txt", "")) : idx.split(",");
const W = +width;
for (const i of list) {
  const f = path.join(dl, `${i}.txt`);
  if (!fs.existsSync(f)) { console.log(`[${i}] no file`); continue; }
  const t = fs.readFileSync(f, "utf8");
  for (const r of res) {
    const re = new RegExp(r, "gi");
    let m, n = 0;
    while ((m = re.exec(t)) && n < 4) {
      n++;
      console.log(`[${i}] /${r}/ …${t.slice(Math.max(0, m.index - W), m.index + m[0].length + W)}…`);
    }
    if (!n && idx !== "all") console.log(`[${i}] /${r}/ NO MATCH`);
  }
}
