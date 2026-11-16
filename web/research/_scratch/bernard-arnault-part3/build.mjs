import { writeFileSync } from "node:fs";
import { S } from "./sources.mjs";
import { howTheyWork } from "./ch1.mjs";
import { mindset } from "./ch2.mjs";
import { personal } from "./ch3.mjs";
import { brand } from "./ch4.mjs";
import { wrong } from "./ch5.mjs";
import { today, lessons } from "./ch6.mjs";
import { factCheck } from "./fc.mjs";

const out = process.argv[2];
const chapters = [howTheyWork, mindset, personal, brand, wrong, today];
const used = new Map();
const sources = [];
const idx = (k) => {
  if (!S[k]) throw new Error("Unknown source key: " + k);
  if (!used.has(k)) { used.set(k, sources.length); sources.push({ label: S[k][0], url: S[k][1] }); }
  return used.get(k);
};
const words = (s) => (s || "").split(/\s+/).filter(Boolean).length;
let total = 0;
for (const c of chapters) {
  let w = 0, run = 0, maxRun = 0;
  for (const b of c.blocks) {
    if (b.src) b.src = b.src.map(idx);
    if (b.items) for (const it of b.items) { it.src = it.src.map(idx); w += words(it.text) + words(it.value) + words(it.label); }
    w += words(b.text);
    if (b.t === "p") { run++; maxRun = Math.max(maxRun, run); if (!b.src.length) throw new Error("No src: " + b.text); }
    else if (b.t !== "h") run = 0;
    if (b.t === "note" && words(b.text) > 14) console.log("LONG NOTE", b.text);
    if (b.t === "quote" && !b.src.length) throw new Error("No src quote");
  }
  total += w;
  console.log(c.id, "words", w, "blocks", c.blocks.length, "max p run", maxRun);
}
console.log("TOTAL chapter words", total, "lessons", lessons.length, "sources", sources.length);
const unused = Object.keys(S).filter((k) => !used.has(k));
if (unused.length) console.log("Unused sources:", unused.join(", "));
writeFileSync(out, JSON.stringify({ chapters, lessons, sources, factCheck }, null, 1) + "\n", "utf8");
