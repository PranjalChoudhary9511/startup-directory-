const fs=require('fs');const b=JSON.parse(fs.readFileSync('../../../src/content/billionaires/books/mark-zuckerberg.json','utf8'));
let o=[];
b.chapters.forEach((c,ci)=>{o.push(`\n#### [${ci}] ${c.id} | ${c.kicker} | ${c.title}`);c.blocks.forEach((x,i)=>{
 const s=x.src?` {${x.src}}`:'';
 if(x.t==='p'||x.t==='example')o.push(`${ci}.${i} ${x.t}: ${x.text}${s}`);
 else if(x.t==='h'||x.t==='note')o.push(`${ci}.${i} ${x.t}: ${x.text}`);
 else if(x.t==='quote')o.push(`${ci}.${i} QUOTE: "${x.text}" -- ${x.who}${s}`);
 else if(x.t==='facts'||x.t==='timeline')o.push(`${ci}.${i} ${x.t}: `+x.items.map(y=>`(${y.value||y.when}) ${y.label||y.text} {${y.src}}`).join(' | '));
 else if(x.t==='photo')o.push(`${ci}.${i} photo: ${x.photo.page} :: ${x.photo.caption}`);
 else if(x.t==='venture')o.push(`${ci}.${i} VENTURE ${x.name} [${x.years}] ${x.outcome}\n  idea: ${x.idea}\n  decision: ${x.decision}\n  how: ${x.howStarted}\n  funding: ${x.funding}\n  what: ${x.whatHappened}\n  lesson: ${x.lesson}${s}`);
 else if(x.t==='lesson')o.push(`${ci}.${i} lesson: ${x.title} :: ${x.text}`);
 else o.push(`${ci}.${i} ??? ${x.t}`);
})});
fs.writeFileSync('book.txt',o.join('\n'));
fs.writeFileSync('sources.txt',b.sources.map((s,i)=>`${i}\t${s.label}\t${s.url}`).join('\n'));
