const fs = require('fs');
const f = process.argv[2];
let s = fs.readFileSync(f, 'utf8');
const R = [
  ['Picture the loudest man in the history of American business.', 'Picture one of the loudest men in American business.'],
  ['Her father, Sam, was a Jewish immigrant who had been a cobbler in Russia. Steve\'s account is that Sam got away from the persecution Jews faced in the tsar\'s army, in what is now Belarus. In Detroit he started in junk and came to own an auto parts shop.',
   'Her father, Sam, was a Jewish immigrant who had been a cobbler in Russia. The family story, told in the Detroit Jewish News, is that he came from Belarus and avoided persecution as a Jew in the tsar\'s army. In Detroit he started in junk and came to own an auto parts shop.'],
  ['Steve remembers him explaining the tax rules on a special kind of export company at home, seeing every angle, while the boy listened and could not follow it.',
   'Steve remembers him explaining the tax rules on a special kind of export company, seeing every angle, and he says he could never follow how his father did it.'],
  ['Steve was bad at math, she said, and might struggle in third grade because of it.', 'Steve was bad at math, the teacher said, and might struggle in third grade because of it.'],
  ['12th Street was the street where his mother said she was born. Steve has not made much of that link in public, but he has never stopped talking about Detroit\'s neighborhoods. Today he and his wife Connie fund anti-poverty work in the city. He still tells people to drive up Grand River from Detroit to Farmington Hills, the road he grew up near, to see what work is left to do.',
   '12th Street is the street where, Steve says, his mother was born. He still talks about Detroit through its neighborhoods, and today he and his wife Connie fund anti-poverty work in the city. When people say Detroit has come back, he rolls his eyes. He tells them to drive up Grand River from Detroit to Farmington Hills and see what work is left to do.'],
  ['Both things were true at once. His energy came out through math, where he was sure of himself. Put him in a normal social moment and the nerves came straight back.',
   'Both things seem to have been true at once. The energy poured out at the blackboard, where he was sure of the answer. The nerves stayed for everything else.'],
  ['So Steve started taking evening classes at a nearby college, Lawrence Institute of Technology, now Lawrence Technological University. He also attended its Summer Science Institute after junior year.',
   'So Steve started taking college math at night and co-enrolled at Lawrence Institute of Technology, now Lawrence Technological University. He also attended its Summer Science Institute after junior year.'],
  ['"who": "Richard Marburger, former dean and later president of Lawrence Tech"', '"who": "Richard Marburger, then a dean and later president of Lawrence Tech"'],
  ['But when Edward Kuss asked what he was proudest of, the math star did not mention math. He said it was shaving ==20 seconds== off his time in the quarter-mile, and even then the time wasn\'t good.',
   'What impressed Edward Kuss most was something else. The math star said his proudest achievement was shaving ==20 seconds== off his time in the quarter-mile, and even then the time wasn\'t good.'],
  ['He chose Harvard, a place no one in his family had ever studied.', 'He chose Harvard, and became the first in his family to go to college.'],
  ['He applied to Harvard, Caltech and MIT, and got into all three, which he jokes proves his numbers orientation. Then he did what his father had been announcing since he was eight.", "src": [3, 9]',
   'XX'],
  ['Steve arrived at Harvard in 1973 and tried to sign up for both of the university\'s most feared freshman courses, Math 55 and Physics 55.', 'Steve arrived at Harvard in 1973 and tried to sign up for both Math 55 and Physics 55 at once.'],
  ['Steve dropped his in about ten months, while still keeping math as part of his degree.', 'Steve dropped his by the end of his first year, while still keeping math as part of his degree.'],
  ['He was 17. He changed the plan his whole family had built.', 'He was 18, and he dropped the plan everyone expected of him.'],
  ['But at every team meal he had to stand up, shout \\"listen up\\" and make the coaches\' announcements to a room of huge young men.', 'But at every team meal he had to stand up, shout \\"listen up\\" and make the coaches\' announcements to the whole team.'],
  ['A skinny sophomore named Bill Gates lived down the same hall.', 'A fellow sophomore named Bill Gates lived down the same hall.'],
  ['two films linked by one song, and came back to Currier singing it loud enough to start a row with a neighbor.', 'two films linked by one song, and their own version of that song back at Currier set off a heated exchange with a dorm mate.'],
  ['On the Putnam, America\'s hardest college math competition, the order flipped.', 'On the Putnam, the top math contest for college students in the US and Canada, the order flipped.'],
  ['\\"Hi, my name\'s Steve Ballmer. My palms are sweating but don\'t worry, I\'m OK.\\"', '\\"Hi, my name\'s Steve Ballmer. My-- my palms are sweating but don\'t worry, I\'m OK.\\"'],
  ['Here is the part most biographies skip. In the spring of 1979', 'Here is a part of the story many people never hear. In the spring of 1979'],
  ['"text": "Stanford, and the classmate from Bombay"', '"text": "Stanford, and the classmate from India"'],
  ['Ballmer and Mukesh Ambani were classmates here in 1979–80.', 'Ballmer and Mukesh Ambani were in the same class here.'],
  ['\\"When we got up to 30, it was still just me, a secretary, and 28 programmers,\\"', '\\"When we got up to 30 [employees], it was still just me, a secretary, and 28 programmers,\\"'],
  ['Best friends. Same house. Three days of silence. Co-founding is hard.', 'Best friends. Same house. Three days of silence. Working with friends is hard.'],
  ['He had no technical background to speak of and no shares yet. His parents were baffled, and his best friend had just fought him for three days. What he did have was a question to answer, whether he could hire one good person. He got to work.", "src": [21, 24, 10]',
   'He knew a lot about business, not much about computers, and he had no shares yet. His parents were baffled, and his best friend had just fought him for three days. What he did have was a question to answer: could he hire one good person? He got to work.", "src": [21, 24, 10, 25]'],
  ['After ninth grade, Steve also went off to a math camp, and he joined a summer National Science Foundation program for advanced students.", "src": [7, 9]', 'After ninth grade, Steve also went off to a math camp, and he joined a summer National Science Foundation program for advanced students.", "src": [7, 9, 33]'],
  ['He told Gates he was going back.", "src": [10, 21, 11]', 'He told Gates he was going back.", "src": [10, 21, 11, 23]'],
  ['it places Scott McNealy at Country Day', 'it appears to place Scott McNealy at Country Day'],
  ['the LA Times timeline and Hard Drive as quoted by HistoryLink. We use', 'and the LA Times timeline of Microsoft. We use'],
  ['"claim": "What grade Gates\'s departure and Ballmer\'s P&G deferral"', '"claim": "When Gates left Harvard, and how long Ballmer put off Stanford"'],
];
for (const [a, b] of R) {
  if (b === 'XX') continue;
  if (!s.includes(a)) { console.log('MISS: ' + a.slice(0, 70)); continue; }
  s = s.replace(a, b);
}
s = s.replace(/("t": "note", "text": "(?:[^"\\]|\\.)*"), "src": \[\]/g, '$1');
const o = JSON.parse(s);
fs.writeFileSync(f, s, 'utf8');
let words = 0, maxNote = 0, S = o.sources.length, used = new Set(), bad = [];
const cnt = t => t.replace(/[*_=]{2}/g, '').split(/\s+/).filter(Boolean).length;
const cite = (c, w) => { if (!Array.isArray(c) || !c.length) bad.push('no src ' + w); else c.forEach(i => { if (i < 0 || i >= S) bad.push('range ' + w); used.add(i); }); };
for (const c of o.chapters) {
  let cw = 0, run = 0, maxRun = 0;
  for (const b of c.blocks) {
    if (b.t === 'p') { run++; maxRun = Math.max(maxRun, run); } else if (b.t !== 'h') run = 0;
    if (b.text) cw += cnt(b.text);
    if (b.t === 'note') { const n = cnt(b.text); if (n > 14) bad.push('note ' + n + ': ' + b.text); if ('src' in b) bad.push('note src'); }
    if (['p', 'quote', 'example'].includes(b.t)) cite(b.src, b.t + ':' + b.text.slice(0, 30));
    if (b.t === 'facts' || b.t === 'timeline') { b.items.forEach(it => { cite(it.src, b.t); cw += cnt((it.value || it.when) + ' ' + (it.label || it.text)); }); if (b.t === 'facts' && (b.items.length < 2 || b.items.length > 4)) bad.push('facts len'); if (b.t === 'timeline' && (b.items.length < 3 || b.items.length > 8)) bad.push('tl len'); }
    if (b.t === 'photo' && !/^https:\/\/upload\.wikimedia\.org\//.test(b.photo.url)) bad.push('photo');
  }
  console.log(c.id, 'words', cw, 'blocks', c.blocks.length, 'max p run', maxRun);
  words += cw;
}
console.log('total', words, 'sources', S, 'unused', [...Array(S).keys()].filter(i => !used.has(i)));
console.log('problems', bad);
