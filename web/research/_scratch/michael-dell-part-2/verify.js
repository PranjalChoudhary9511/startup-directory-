// Checks the built fragment: parses, all src indexes valid, and locally held quotes appear verbatim.
const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '../../billionaires/michael-dell/part-2.json');
const j = JSON.parse(fs.readFileSync(file, 'utf8'));
const norm = (s) => s.toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ');
const tim = norm(fs.readFileSync(path.join(__dirname, 'tim.txt'), 'utf8'));
const opin = norm(fs.readFileSync(path.join(__dirname, 'chancery2016.txt'), 'utf8'));
const n = j.sources.length;
let bad = 0;
const check = (src, where) => {
  if (!Array.isArray(src) || !src.length) { bad++; console.log('no src:', where); return; }
  for (const i of src) if (!(Number.isInteger(i) && i >= 0 && i < n)) { bad++; console.log('bad index', i, where); }
};
const quotes = [];
for (const c of j.chapters) {
  for (const b of c.blocks) {
    const w = (b.text || b.name || '').slice(0, 40);
    if (['p', 'quote', 'example', 'venture'].includes(b.t)) check(b.src, w);
    if (b.items) for (const it of b.items) check(it.src, (it.label || it.text).slice(0, 40));
    if (b.t === 'quote') quotes.push(b);
    const chars = JSON.stringify(b);
    if (/—/.test(chars)) console.log('em dash in', w);
  }
}
for (const q of quotes) {
  const t = norm(q.text);
  console.log((tim.includes(t) ? 'TIM ' : opin.includes(t) ? 'OPIN' : 'ext '), q.text.slice(0, 80), '|', q.who);
}
// inline quoted fragments from the Ferriss transcript
for (const frag of ["We went right from 890 million to 2.1 billion in one year", "And everything started to fall apart", "a horrible mistake we made in managing our supply chain", "we were running out of capital", "And I'm the CEO of the company", "It was just a short period of time, but it was pretty weird", "hard to not think about all the people you're responsible for"]) {
  console.log(tim.includes(norm(frag)) ? 'ok  ' : 'MISS', frag);
}
const used = new Set();
const walk = (o) => { if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === 'object') { if (o.src) o.src.forEach((i) => used.add(i)); Object.values(o).forEach(walk); } };
walk(j.chapters);
console.log('sources', n, 'used', used.size, 'bad', bad);
const noteLens = j.chapters.flatMap((c) => c.blocks.filter((b) => b.t === 'note').map((b) => b.text.split(/\s+/).length));
console.log('notes', noteLens.length, 'max words', Math.max(...noteLens));
console.log('ok');
