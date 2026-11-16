import fs from 'node:fs';
const b=JSON.parse(fs.readFileSync('src/content/billionaires/books/michael-dell.json','utf8'));
let o='';
b.chapters.forEach((c,ci)=>{o+=`\n===== [${ci}] ${c.id} | ${c.kicker} | ${c.title}\n`;
c.blocks.forEach((x,i)=>{const s=x.src?` {${x.src.join(',')}}`:'';
 switch(x.t){
 case 'p':case 'example':case 'note':case 'h':o+=`${i} ${x.t}: ${x.text}${s}\n`;break;
 case 'quote':o+=`${i} Q: "${x.text}" -- ${x.who}${s}\n`;break;
 case 'facts':case 'timeline':o+=`${i} ${x.t}:\n`;x.items.forEach(it=>o+=`   - ${it.value??it.when} :: ${it.label??it.text} {${it.src.join(',')}}\n`);break;
 case 'photo':o+=`${i} photo: ${x.photo.page} | ${x.photo.caption} | ${x.photo.author} | ${x.photo.license}\n`;break;
 case 'venture':o+=`${i} VENTURE ${x.name} (${x.years}) [${x.outcome}]${s}\n   idea: ${x.idea}\n   decision: ${x.decision}\n   started: ${x.howStarted}\n   funding: ${x.funding}\n   happened: ${x.whatHappened}\n   lesson: ${x.lesson}\n`;break;
 case 'lesson':o+=`${i} lesson: ${x.title}: ${x.text}\n`;break;
 }});});
o+='\n===== LESSONS\n';b.lessons.forEach((l,i)=>o+=`${i} ${l.title}: ${l.text}\n`);
fs.writeFileSync('research/_scratch/michael-dell-factcheck/book.txt',o);
let s='';b.sources.forEach((x,i)=>s+=`${i}\t${x.label}\t${x.url}\n`);fs.writeFileSync('research/_scratch/michael-dell-factcheck/sources.txt',s);
let d='';b.factCheck.disputed.forEach((x,i)=>d+=`${i} ${x.claim} :: ${x.note}\n`);fs.writeFileSync('research/_scratch/michael-dell-factcheck/disputed.txt',d);
console.log(o.length,s.length,d.length);
