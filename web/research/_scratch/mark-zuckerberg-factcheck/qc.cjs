const fs=require('fs');
const b=JSON.parse(fs.readFileSync('../../../src/content/billionaires/books/mark-zuckerberg.json','utf8'));
const norm=s=>s.toLowerCase().replace(/&#\d+;/g,' ').replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
const pages=b.sources.map((s,i)=>{try{return norm(fs.readFileSync(`pages/${i}.txt`,'utf8'))}catch{return ''}});
// notes
b.chapters.forEach((c,ci)=>{let run=0,maxrun=0;c.blocks.forEach((x,i)=>{if(x.t==='note'){const n=x.text.split(/\s+/).length;if(n>14)console.log('NOTE>14',ci,i,x.text)}
 if(x.t==='p'){run++;maxrun=Math.max(maxrun,run);const s=x.text.split(/(?<=[.!?])\s+/).length;if(s>6)console.log('LONGP',ci,i,s)}else run=0});if(maxrun>4)console.log('WALL',c.id,maxrun)});
// copied shingles
const texts=[];b.chapters.forEach((c,ci)=>c.blocks.forEach((x,i)=>{if(x.t==='p'||x.t==='example')texts.push([`${ci}.${i}`,x.text]);if(x.t==='venture')for(const k of['idea','decision','howStarted','whatHappened','lesson'])texts.push([`${ci}.${i}.${k}`,x[k]])}));
for(const[w,t]of texts){const clean=norm(t.replace(/["“][^"”]*["”]/g,' | ').replace(/==|__|\*\*/g,''));const words=clean.split(' ');const hits=new Set();for(let k=0;k+12<=words.length;k++){const sh=words.slice(k,k+12).join(' ');if(sh.includes('|'))continue;for(let p=0;p<pages.length;p++)if(pages[p].length<400000&&pages[p].includes(sh)){hits.add(`${p}:${sh}`);break}}if(hits.size)console.log('COPY?',w,[...hits].slice(0,2).join(' || '))}
