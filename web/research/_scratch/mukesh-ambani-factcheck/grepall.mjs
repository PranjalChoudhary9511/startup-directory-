import fs from "node:fs";
import path from "node:path";
const pdir = "C:/Users/Pranjal Choudhary/Desktop/start-up derectory/web/research/_scratch/mukesh-ambani-factcheck/pages";
const res = process.argv.slice(2);
const files = fs.readdirSync(pdir).filter((f) => /^\d+\.txt$/.test(f));
for (const re of res) {
  console.log(`\n## /${re}/`);
  let hits = 0;
  for (const f of files) {
    const t = fs.readFileSync(path.join(pdir, f), "utf8").replace(/\s+/g, " ");
    const m = new RegExp(re, "i").exec(t);
    if (m && hits < 6) { hits++; console.log(`  [${f.replace(".txt", "")}] ...${t.slice(Math.max(0, m.index - 130), m.index + m[0].length + 130)}...`); }
  }
  if (!hits) console.log("  NONE");
}
