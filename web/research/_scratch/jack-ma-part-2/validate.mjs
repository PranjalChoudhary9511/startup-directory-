import fs from "node:fs";
const b = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const n = b.sources.length;
const outcomes = new Set(["failed","shut","sold","merged","pivoted","running","public"]);
const used = new Set();
let words = 0, errs = 0;
const wc = (t) => (t || "").split(/\s+/).filter(Boolean).length;
const cite = (c, where) => {
  if (!Array.isArray(c)) { console.log("no src", where); errs++; return; }
  for (const i of c) { if (!Number.isInteger(i) || i < 0 || i >= n) { console.log("bad src", i, where); errs++; } used.add(i); }
};
const ids = new Set();
for (const ch of b.chapters) {
  if (ids.has(ch.id)) { console.log("dup id", ch.id); errs++; } ids.add(ch.id);
  let chw = 0, run = 0, maxrun = 0, ventures = 0;
  for (const bl of ch.blocks) {
    let w = 0;
    if (bl.t === "p") { w = wc(bl.text); run++; maxrun = Math.max(maxrun, run);
      const sent = bl.text.split(/[.!?](\s|$)/).filter(x => x && x.trim()).length;
      if (!bl.src.length) console.log("uncited p:", bl.text.slice(0, 60));
      cite(bl.src, "p"); }
    else run = 0;
    if (bl.t === "h") w = wc(bl.text);
    if (bl.t === "note") { w = wc(bl.text); if (w > 14) { console.log("note long", w, bl.text); errs++; } }
    if (bl.t === "quote") { w = wc(bl.text); cite(bl.src, "quote"); console.log("quote words", w, bl.text); }
    if (bl.t === "example") { w = wc(bl.text); cite(bl.src, "example"); }
    if (bl.t === "facts") { if (bl.items.length < 2 || bl.items.length > 4) { console.log("facts size"); errs++; } for (const i of bl.items) { w += wc(i.value) + wc(i.label); cite(i.src, "facts " + i.label); } }
    if (bl.t === "timeline") { if (bl.items.length < 3 || bl.items.length > 8) { console.log("timeline size", bl.items.length); errs++; } for (const i of bl.items) { w += wc(i.when) + wc(i.text); cite(i.src, "tl " + i.when); } }
    if (bl.t === "venture") { ventures++; for (const k of ["name","years","outcome","idea","decision","howStarted","funding","whatHappened","lesson"]) { if (typeof bl[k] !== "string" || !bl[k]) { console.log("venture missing", bl.name, k); errs++; } } if (!outcomes.has(bl.outcome)) { console.log("outcome", bl.outcome); errs++; } for (const k of ["idea","decision","howStarted","funding","whatHappened","lesson"]) w += wc(bl[k]); cite(bl.src, "v " + bl.name); }
    chw += w;
  }
  words += chw;
  console.log(ch.id, "words", chw, "blocks", ch.blocks.length, "ventures", ventures, "max p run", maxrun);
}
const unused = []; for (let i = 0; i < n; i++) if (!used.has(i)) unused.push(i + ":" + b.sources[i].label.slice(0, 40));
const raw = JSON.stringify(b.chapters);
console.log("TOTAL words", words, "sources", n, "errors", errs, "disputed", b.factCheck.disputed.length);
console.log("unused:", unused);
const seen = new Set(); for (const s of b.sources) { if (seen.has(s.url)) console.log("dup url", s.url); seen.add(s.url); }
const m = [...raw.matchAll(/\\"/g)].length; console.log("escaped dq in chapters:", m);
console.log("em dash count:", (raw.match(/—/g) || []).length);
