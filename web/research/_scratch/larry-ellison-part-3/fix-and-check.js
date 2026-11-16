const fs = require('fs');
const f = process.argv[2];
let s = fs.readFileSync(f, 'utf8');
const reps = [
  [" He reported directly to Ellison rather than to the chief executives, which was almost unheard of at that level.", " He reported directly to Ellison rather than to the chief executives."],
  ["over lunch at his 40-acre Woodside estate in 2006", "over lunch at his Woodside estate in 2006"],
  ["Musk suggested $2 billion or more, Ellison at one point agreed to that, and the amount he finally invested was ==$1 billion==.\", \"src\": [21, 22]", "Musk suggested $2 billion or more, Ellison at one point agreed to that, and the amount he finally invested was ==$1 billion==.\", \"src\": [21, 22, 118]"],
  ["He lost more than most nations earn. He kept showing up.", "He lost $104 billion on paper in ten weeks. He kept showing up."],
  ["Fortune reported in 2024 that he is known for long hours at the gym and a careful diet.", "Fortune reported in 2024 that he is known for long hours at the gym and for sipping carrot juice."],
  ["saying most of his assets had long been placed in a trust", "saying nearly all his assets had long been placed in a trust"],
  ["Months later a former employee was telling reporters the institute had switched its plans on them.", "Yet a former employee told reporters that the institute had switched its plans on them."],
  [" Most young Indian engineers probably know him less as a personality than as the name on a campus or a database exam.", ""],
  ["__A decade of legal fees bought no payout at all, and the industry largely cheered the loss.__", "__A decade of legal fees bought no payout at all.__"],
  ["In Turkey, junior bosses could approve marketing payments under $5,000 with no proof at all.", "At the units involved, first-line bosses could approve marketing payments under $5,000 with no proof at all."],
  ["So did a privacy case at $115 million, over claims Oracle tracked people and sold the data, which it denied.", "A privacy case settled too, at $115 million, over claims Oracle tracked people and sold the data, which it denied."],
  ["TechCrunch pointed out that the evidence on such crime tools is weak, noting the Los Angeles police had dropped a prediction programme after an audit.", "TechCrunch said the evidence does not necessarily back him, noting the Los Angeles police had suspended a prediction programme after an audit."],
  ["__The last bet of his life is the largest, and it may not be settled until he is nearly 90.__", "__This bet is the largest of his life, and the result may not be known for years.__"],
  ["{ \"label\": \"Ars Technica: Supreme Court rules API copying is fair use, Apr 5 2021\", \"url\": \"https://arstechnica.com/tech-policy/2021/04/supreme-court-sides-with-google-in-api-copyright-battle-with-oracle/\" }", "{ \"label\": \"Ars Technica: Supreme Court rules API copying is fair use, Apr 5 2021\", \"url\": \"https://arstechnica.com/tech-policy/2021/04/supreme-court-sides-with-google-in-api-copyright-battle-with-oracle/\" },\n    { \"label\": \"HackerNoon Legal PDF series: Twitter v. Musk court filing, Exhibit H, Ellison and Musk text messages\", \"url\": \"https://hackernoon.com/oracles-larry-ellison-and-elon-musk-landed-on-his-$2-billion-twitter-investment-over-text\" }"]
];
for (const [a, b] of reps) {
  if (!s.includes(a)) { console.log('MISSING:', a.slice(0, 70)); continue; }
  s = s.replace(a, () => b);
}
fs.writeFileSync(f, s);
const j = JSON.parse(s);
const n = j.sources.length;
const used = new Set();
const bad = [];
const chk = (c, where) => { if (!Array.isArray(c) || !c.length) bad.push('nosrc ' + where); else c.forEach(i => { if (i < 0 || i >= n) bad.push('range ' + i + ' ' + where); used.add(i); }); };
let total = 0;
for (const c of j.chapters) {
  let w = 0;
  const wc = t => t.split(/\s+/).filter(Boolean).length;
  for (const b of c.blocks) {
    const tag = c.id + ':' + b.t + ':' + (b.text || '').slice(0, 30);
    if (b.text) w += wc(b.text);
    if (b.t === 'note') { if (wc(b.text) > 14) bad.push('note long: ' + b.text); }
    else if (['p', 'quote', 'example'].includes(b.t)) chk(b.src, tag);
    if (b.t === 'p') {
      const sc = (b.text.replace(/C\. S\./g, 'CS').match(/[.!?](\s|$|_|=|\*)/g) || []).length;
      if (sc < 2 || sc > 6) console.log('sentences', sc, tag);
    }
    if (b.items) for (const it of b.items) { chk(it.src, tag); w += wc(it.text || (it.value + ' ' + it.label)); }
  }
  console.log(c.id, 'words', w, 'blocks', c.blocks.length, 'p-run max', (() => { let m = 0, r = 0; for (const b of c.blocks) { if (b.t === 'p') { r++; m = Math.max(m, r); } else if (b.t !== 'h') r = 0; } return m; })());
  total += w;
}
console.log('TOTAL chapter words', total, 'sources', n, 'lessons', j.lessons.length);
console.log('unused sources', [...Array(n).keys()].filter(i => !used.has(i)).join(','));
console.log('problems', bad.length ? bad : 'none');
// straight double quotes inside text were avoided: count quote blocks and curly/straight quotes
const allText = j.chapters.flatMap(c => c.blocks.map(b => b.text || '')).join('\n');
console.log('quote blocks', j.chapters.flatMap(c => c.blocks).filter(b => b.t === 'quote').length, 'double-quote chars in text', (allText.match(/["“”]/g) || []).length);
