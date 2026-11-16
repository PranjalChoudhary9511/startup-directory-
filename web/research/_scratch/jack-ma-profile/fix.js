const fs=require('fs');const f=process.argv[2];const d=JSON.parse(fs.readFileSync(f,'utf8'));
// drop the unused HKFP source and renumber
const drop=d.sources.findIndex(s=>s.url.includes('hongkongfp.com'));
d.sources.splice(drop,1);
const map=n=>{if(n===drop)throw new Error('cited dropped');return n>drop?n-1:n};
const walk=o=>{if(Array.isArray(o)){o.forEach(walk);return}if(o&&typeof o==='object'){for(const k of Object.keys(o)){if((k==='src'||k==='hookSrc')&&Array.isArray(o[k]))o[k]=o[k].map(map);else walk(o[k])}}};
walk(d);
const star=d.sources.findIndex(s=>s.url.includes('thestar.com.my'));
const g=d.glance.find(x=>x.label==='Main company today');
g.value="Alibaba Group. He gave up the executive chairman job in 2019, but he is still one of five people on its partnership committee. In 2025, unnamed insiders said he was at his most hands-on since then.";
g.src=[...g.src,star];
const hz=d.contact.channels.find(c=>c.value==='+86-571-8502-2088');hz.url='tel:+8657185022088';
const ph=d.photos.find(p=>p.page.includes('39012606625'));
ph.caption="Jack Ma, then Alibaba's executive chairman, with Abi Ramanan, CEO of ImpactVision, at the World Economic Forum's Annual Meeting in Davos on 24 January 2018.";
d.contact.howToReach=d.contact.howToReach.replace("which has an open application, a contact form and a published WhatsApp line","which takes applications online and publishes a contact form and a WhatsApp line");
fs.writeFileSync(f,JSON.stringify(d,null,2)+"\n",'utf8');
// checks
const raw=fs.readFileSync(f,'utf8');console.log('zero-width chars:',(raw.match(/[​-‍﻿]/g)||[]).length);
let bad=0;const used=new Set();const chk=o=>{if(Array.isArray(o)){o.forEach(chk);return}if(o&&typeof o==='object'){for(const k of Object.keys(o)){if(k==='src'||k==='hookSrc')for(const n of o[k]){used.add(n);if(n<0||n>=d.sources.length){bad++;console.log('OOB',n)}}else chk(o[k])}}};chk(d);
console.log('oob',bad,'sources',d.sources.length,'unused',d.sources.map((s,i)=>used.has(i)?null:s.label).filter(Boolean));
console.log('title words',d.title.split(/\s+/).length,'glance',d.glance.length,'channels',d.contact.channels.length,'socials',d.contact.socials.length,'photos',d.photos.length);
const txt=[d.title,d.subtitle,d.hook,...d.glance.map(g=>g.value),d.contact.howToReach,...d.photos.map(p=>p.caption)].join(' ');console.log('words',txt.split(/\s+/).length);
console.log('howToReach sentences',d.contact.howToReach.split(/(?<=[.!?])\s+/).length);
for(const c of d.contact.channels.concat(d.contact.socials))if(/@[a-z]+\.[a-z]+@/.test(c.value||''))console.log('odd',c);
console.log(d.glance.find(x=>x.label==='First company').src.map(i=>d.sources[i].label),d.contact.channels.find(c=>c.value.includes('antgroup')).src.map(i=>d.sources[i].label));
