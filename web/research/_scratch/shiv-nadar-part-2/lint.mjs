import fs from "node:fs";
const j = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
for (const c of j.chapters) {
  let run = 0;
  for (const [i, b] of c.blocks.entries()) {
    const t = b.text || "";
    for (const m of ["==", "__"]) if ((t.split(m).length - 1) % 2) console.log("markup", c.id, i);
    if (b.t === "p") {
      const n = t.split(/(?<=[.!?”])\s+(?=[A-Z“])/).length;
      if (n < 2) console.log("short", c.id, i, t.slice(0, 80));
      run++;
      if (run > 4) console.log("wall", c.id, i, run, t.slice(0, 60));
    } else run = 0;
  }
}
console.log("ok", j.chapters.length, j.sources.length);
