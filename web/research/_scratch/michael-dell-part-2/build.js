// Assembles part-2.json: maps source keys to indexes, validates the block rules, counts words.
const fs = require('fs');
const path = require('path');
const registry = require('./sources');
const every = require('./ch1');
const { nearDeath, scale } = require('./ch2');
const { bigBets, fortune } = require('./ch3');
const factCheck = require('./factcheck');

const OUT = path.resolve(__dirname, '../../billionaires/michael-dell/part-2.json');
const chapters = [every, nearDeath, scale, bigBets, fortune];
const used = new Map();
const idx = (k) => {
  if (!registry[k]) throw new Error('Unknown source key: ' + k);
  if (!used.has(k)) used.set(k, used.size);
  return used.get(k);
};
const mapSrc = (a) => [...new Set(a)].map(idx);
const issues = [];
const words = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;
const sentences = (s) => (s.replace(/\b(Mr|Mrs|No|St)\./g, '$1').match(/[.!?]+["')]*(\s|$)/g) || []).length;
let total = 0;

for (const ch of chapters) {
  let run = 0; let chWords = 0;
  for (const b of ch.blocks) {
    if (b.src) b.src = mapSrc(b.src);
    if (b.t === 'p') {
      run++;
      if (run > 4) issues.push(`${ch.id}: more than 4 p in a row: ${b.text.slice(0, 50)}`);
      const n = sentences(b.text);
      if (n < 2 || n > 6) issues.push(`${ch.id}: p has ${n} sentences: ${b.text.slice(0, 50)}`);
      chWords += words(b.text);
    } else if (b.t !== 'h') run = 0;
    if (b.t === 'h') chWords += words(b.text);
    if (b.t === 'note') {
      if (words(b.text) > 14) issues.push(`note too long: ${b.text}`);
      chWords += words(b.text);
    }
    if (b.t === 'quote' || b.t === 'example') chWords += words(b.text) + words(b.who);
    if (b.t === 'facts') {
      if (b.items.length < 2 || b.items.length > 4) issues.push(`facts size: ${b.items.length}`);
      for (const it of b.items) { it.src = mapSrc(it.src); chWords += words(it.value) + words(it.label); }
    }
    if (b.t === 'timeline') {
      if (b.items.length < 3 || b.items.length > 8) issues.push(`timeline size: ${b.items.length}`);
      for (const it of b.items) { it.src = mapSrc(it.src); chWords += words(it.when) + words(it.text); }
    }
    if (b.t === 'venture') {
      for (const f of ['name', 'years', 'outcome', 'idea', 'decision', 'howStarted', 'funding', 'whatHappened', 'lesson']) {
        if (!b[f]) issues.push(`venture ${b.name} missing ${f}`);
        chWords += words(b[f]);
      }
      if (!['failed', 'shut', 'sold', 'merged', 'pivoted', 'running', 'public'].includes(b.outcome)) issues.push(`bad outcome ${b.outcome}`);
    }
  }
  console.log(ch.id, 'words', chWords, 'blocks', ch.blocks.length, 'ventures', ch.blocks.filter((x) => x.t === 'venture').length);
  total += chWords;
}
const sources = [...used.keys()].map((k) => ({ label: registry[k][0], url: registry[k][1] }));
const unused = Object.keys(registry).filter((k) => !used.has(k));
const frag = { chapters, sources, factCheck };
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(frag, null, 2) + '\n', 'utf8');
console.log('TOTAL words', total, 'sources', sources.length, 'unused keys', unused.join(','));
console.log(issues.length ? 'ISSUES:\n' + issues.join('\n') : 'no issues');
console.log('wrote', OUT);
