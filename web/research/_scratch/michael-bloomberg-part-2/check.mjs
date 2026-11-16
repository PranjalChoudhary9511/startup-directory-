import fs from "fs";
const b = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const S = b.sources.length;
const used = new Set();
let words = 0;
const bad = [];
const cite = (c, w) => {
  if (!Array.isArray(c) || !c.length) bad.push(w + " no src");
  (c || []).forEach((i) => (i >= 0 && i < S ? used.add(i) : bad.push(`${w} src ${i} out of range`)));
};
const count = (t) => (t ? String(t).trim().split(/\s+/).length : 0);
const OUT = new Set(["failed", "shut", "sold", "merged", "pivoted", "running", "public"]);
let ventures = 0;
for (const ch of b.chapters) {
  let cw = 0;
  let run = 0;
  ch.blocks.forEach((x, i) => {
    const w = `${ch.id}[${i}]`;
    if (x.t === "p") run++;
    else if (x.t !== "h") {
      if (run > 4) bad.push(`${w}: ${run} p blocks in a row`);
      run = 0;
    }
    if (["p", "example", "quote"].includes(x.t)) { cw += count(x.text); cite(x.src, w); }
    if (x.t === "quote") { cw += count(x.who); if (count(x.text) > 45) bad.push(w + " long quote"); }
    if (x.t === "h") cw += count(x.text);
    if (x.t === "note") { cw += count(x.text); if (count(x.text) > 14) bad.push(`${w} note ${count(x.text)} words: ${x.text}`); }
    if (x.t === "facts") { x.items.forEach((it, j) => { cw += count(it.value) + count(it.label); cite(it.src, `${w}.${j}`); }); if (x.items.length < 2 || x.items.length > 4) bad.push(w + " facts size"); }
    if (x.t === "timeline") { x.items.forEach((it, j) => { cw += count(it.when) + count(it.text); cite(it.src, `${w}.${j}`); }); if (x.items.length < 3 || x.items.length > 8) bad.push(w + " timeline size"); }
    if (x.t === "venture") {
      ventures++;
      if (!OUT.has(x.outcome)) bad.push(w + " outcome");
      for (const k of ["name", "years", "idea", "decision", "howStarted", "funding", "whatHappened", "lesson"]) {
        if (!x[k] || !x[k].trim()) bad.push(`${w} missing ${k}`);
        cw += count(x[k]);
      }
      cite(x.src, w);
    }
  });
  console.log(ch.id, "blocks", ch.blocks.length, "words", cw);
  words += cw;
}
const unused = [];
for (let i = 0; i < S; i++) if (!used.has(i)) unused.push(i);
console.log({ words, ventures, sources: S, unused });
if (bad.length) console.log("PROBLEMS\n" + bad.join("\n"));
const em = JSON.stringify(b).match(/—/g);
console.log("em dashes:", em ? em.length : 0);
