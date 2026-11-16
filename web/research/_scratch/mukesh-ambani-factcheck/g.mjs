// usage: node g.mjs specfile   (lines: idx[,idx]|regex|context?)
import fs from "node:fs";
import path from "node:path";
const pdir = "C:/Users/Pranjal Choudhary/Desktop/start-up derectory/web/research/_scratch/mukesh-ambani-factcheck/pages";
const lines = fs.readFileSync(process.argv[2], "utf8").split(/\r?\n/).filter((l) => l.trim());
for (const l of lines) {
  const [ids, re, ctx] = l.split("|");
  const c = Number(ctx || 160);
  console.log(`\n## ${ids} /${re}/`);
  for (const i of ids.split(",")) {
    const f = path.join(pdir, `${i}.txt`);
    if (!fs.existsSync(f)) { console.log(`  [${i}] no page`); continue; }
    const t = fs.readFileSync(f, "utf8").replace(/\s+/g, " ");
    const r = new RegExp(re, "gi");
    let m, n = 0, last = -1e9;
    while ((m = r.exec(t)) && n < 1) {
      if (m.index - last < c) continue;
      last = m.index; n++;
      console.log(`  [${i}] ...${t.slice(Math.max(0, m.index - c), m.index + m[0].length + c)}...`);
    }
    if (!n) console.log(`  [${i}] NOT FOUND`);
  }
}
