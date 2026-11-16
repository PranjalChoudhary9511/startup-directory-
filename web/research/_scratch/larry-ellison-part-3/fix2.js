const fs = require('fs');
const f = process.argv[2];
const j = JSON.parse(fs.readFileSync(f, 'utf8'));
const ch = id => j.chapters.find(c => c.id === id);
const afterStart = (c, start, block) => {
  const i = c.blocks.findIndex(b => (b.text || '').startsWith(start));
  if (i < 0) throw new Error('no block ' + start);
  c.blocks.splice(i + 1, 0, block);
};
afterStart(ch('personal-life'), 'Months later he was racing', { t: 'note', text: 'Broken neck, smashed arm, failing company. He kept racing.' });
afterStart(ch('today'), '**Media** is the family bet', { t: 'note', text: "Borrowing to fund your child's deal: always ask who carries the risk." });
afterStart(ch('how-they-work'), 'Safra Catz is the exception', { t: 'note', text: 'Find the person who finishes what you start. Then keep them.' });
afterStart(ch('the-brand'), 'He was 52 when', {
  t: 'example',
  text: "For example: in September 2013 Team New Zealand had led his America's Cup team by eight races to one. Then Oracle began winning, and a key race clashed with his closing OpenWorld keynote, where attendees had paid up to $2,650 to be there. Chairman Jeff Henley walked on with an apology, and people streamed out. Oracle won the Cup nine races to eight, but weeks earlier he had also skipped an earnings call for a race, and Safra Catz had told analysts so on the line.",
  src: [12, 49, 50, 51]
});
const ind = ch('the-brand').blocks.find(b => (b.text || '').startsWith('Indian coverage has its own flavour'));
ind.text = ind.text.replace('The Economic Times explains', "Safra Catz told Indian reporters in 2017 that she rarely spoke to the US press and was making an exception for them. The Economic Times explains");
ind.src.push(102);
const t = ch('today').blocks.find(b => (b.text || '').startsWith('Those swings are almost entirely'));
t.src.push(113);
fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n');
