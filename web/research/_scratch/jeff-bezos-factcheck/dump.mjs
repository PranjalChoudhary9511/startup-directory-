import fs from 'node:fs';
const b=JSON.parse(fs.readFileSync('src/content/billionaires/books/jeff-bezos.json','utf8'));
let out='';
const S=c=>'['+(c||[]).join(',')+']';
b.chapters.forEach((ch,ci)=>{out+=`\n=== CH${ci} ${ch.id} | ${ch.kicker} | ${ch.title}\n`;
ch.blocks.forEach((x,i)=>{const p=`${ci}.${i} `;
switch(x.t){case 'p':out+=p+'P '+x.text+' '+S(x.src)+'\n';break;
case 'h':out+=p+'H '+x.text+'\n';break;case 'note':out+=p+'NOTE '+x.text+'\n';break;
case 'quote':out+=p+'QUOTE "'+x.text+'" -- '+x.who+' '+S(x.src)+'\n';break;
case 'example':out+=p+'EX '+x.text+' '+S(x.src)+'\n';break;
case 'facts':case 'timeline':out+=p+x.t.toUpperCase()+'\n';x.items.forEach(it=>out+='   - '+(it.value||it.when)+' :: '+(it.label||it.text)+' '+S(it.src)+'\n');break;
case 'photo':out+=p+'PHOTO '+x.photo.page+' | '+x.photo.caption+' | '+x.photo.author+' | '+x.photo.license+' | '+x.photo.year+'\n';break;
case 'venture':out+=p+'VENTURE '+x.name+' ('+x.years+') '+x.outcome+'\n  idea: '+x.idea+'\n  decision: '+x.decision+'\n  howStarted: '+x.howStarted+'\n  funding: '+x.funding+'\n  what: '+x.whatHappened+'\n  lesson: '+x.lesson+' '+S(x.src)+'\n';break;
case 'lesson':out+=p+'LESSON '+x.title+': '+x.text+'\n';break;default:out+=p+JSON.stringify(x)+'\n';}
});});
out+='\n=== LESSONS\n';b.lessons.forEach((l,i)=>out+=i+' '+l.title+': '+l.text+'\n');
out+='\n=== DISPUTED\n';b.factCheck.disputed.forEach((d,i)=>out+=i+' '+d.claim+' :: '+d.note+'\n');
out+='\n=== SOURCES\n';b.sources.forEach((s,i)=>out+=i+' '+s.label+' | '+s.url+'\n');
fs.writeFileSync('research/_scratch/jeff-bezos-factcheck/dump.txt',out);console.log(out.length,out.split('\n').length);
