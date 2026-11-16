const fs=require('fs');const b=JSON.parse(fs.readFileSync('../../../src/content/billionaires/books/amancio-ortega.json','utf8'));
const cited=new Set();const walk=v=>{if(Array.isArray(v))v.forEach(walk);else if(v&&typeof v==='object'){for(const[k,x]of Object.entries(v)){if((k==='src'||k==='hookSrc')&&Array.isArray(x))x.forEach(i=>cited.add(i));else walk(x)}}};walk(b);
console.log('uncited',b.sources.map((s,i)=>cited.has(i)?null:i+':'+s.label.slice(0,50)).filter(Boolean).join(' | '));
const bad=[70,91,92,80,115,119,121,59,137,138,145];
b.chapters.forEach((c,ci)=>{let run=0;c.blocks.forEach((x,i)=>{if(x.t==='p'){run++;const s=x.text.split(/(?<=[.!?”])\s+/).length;if(s>5)console.log('long',ci,i,s);if(run>4)console.log('wall',ci,i,run)}else if(x.t==='h'){} else run=0;if(x.t==='note'&&x.text.split(/\s+/).length>14)console.log('note',ci,i,x.text);
 const j=JSON.stringify(x);const m=[...j.matchAll(/"src":\[([0-9,]*)\]/g)].flatMap(r=>r[1].split(',').map(Number));for(const n of bad)if(m.includes(n))console.log('badsrc',n,ci,i,x.t)})});
for(const k of ['glance','lessons'])JSON.stringify(b[k]);
const t=JSON.stringify(b.chapters)+JSON.stringify(b.lessons);for(const w of ['The Times','Telegraph','Limited','Harrods','Better Retailing','The Man from Zara','vertigo','Z-day','Today,','zaracare'])console.log(w,(t.match(new RegExp(w,'g'))||[]).length);
