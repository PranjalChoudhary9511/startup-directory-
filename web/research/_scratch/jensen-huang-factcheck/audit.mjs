import fs from 'node:fs';
const b=JSON.parse(fs.readFileSync('../../../src/content/billionaires/books/jensen-huang.json','utf8'));
const norm=s=>s.toLowerCase().replace(/[’‘`´]/g,"'").replace(/[“”]/g,'"').replace(/&#8217;|&#x27;|&#039;|&rsquo;/g,"'").replace(/[—–-]/g,' ').replace(/[^a-z0-9$%.' ]/g,' ').replace(/\s+/g,' ');
const cache={};const page=i=>{if(i in cache)return cache[i];let t='';try{t=fs.readFileSync(`pages/${i}.txt`,'utf8')}catch{};
 const st=fs.readFileSync('status.tsv','utf8').split('\n')[i].split('\t');
 return cache[i]={t:norm(t),ok:st[1]=='200'&&t.length>1500}};
const items=[];
const walk=(where,text,src)=>items.push({where,text,src});
b.chapters.forEach((c,ci)=>c.blocks.forEach((x,i)=>{const w=`CH${ci}.${i}`;
 if(x.t==='p'||x.t==='example'||x.t==='quote')walk(w+':'+x.t,x.text,x.src);
 if(x.t==='facts'||x.t==='timeline')x.items.forEach((it,j)=>walk(`${w}.${j}:${x.t}`,(it.value||it.when)+' '+(it.label||it.text),it.src));
 if(x.t==='venture')for(const k of ['idea','decision','howStarted','funding','whatHappened'])walk(`${w}:${x.name}.${k}`,x[k],x.src);
}));
b.glance.forEach((g,i)=>walk('glance'+i,g.value,g.src));walk('hook',b.hook,b.hookSrc);
const qmiss=[],nmiss=[];
for(const it of items){
 const pages=(it.src||[]).map(page);const anyUnread=(it.src||[]).filter(i=>!page(i).ok);
 const full=pages.map(p=>p.t).join(' || ');
 // quotes
 let qs=[...it.text.matchAll(/[“]([^”]{12,})[”]/g)].map(m=>m[1]);
 if(it.where.endsWith(':quote'))qs=[it.text];
 for(const q of qs){
   const parts=norm(q.replace(/\[[^\]]*\]/g,'|')).split('|').map(s=>s.trim().replace(/[.,;:'"]+$/,'').replace(/ \.\.\. .*/,'')).filter(s=>s.length>6);
   const found=parts.every(p=>full.includes(p));
   if(!found)qmiss.push(`${it.where} src=${it.src} unread=${anyUnread}\n   "${q}"`);
 }
 // numbers
 const nums=[...it.text.matchAll(/\$?\d[\d,]*(?:\.\d+)?(?:%| ?(?:billion|million|trillion))?/g)].map(m=>m[0]);
 const miss=[...new Set(nums)].filter(n=>{const core=n.replace(/ ?(billion|million|trillion)/,'').replace(/[$%]/g,'');if(core.length<2)return false;if(/^(19|20)\d\d$/.test(core))return !full.includes(core);return !full.includes(norm(core));});
 if(miss.length)nmiss.push(`${it.where} src=${it.src} unread=${anyUnread} MISSING ${miss.join(' ; ')}`);
}
fs.writeFileSync('qmiss.txt',qmiss.join('\n'));fs.writeFileSync('nmiss.txt',nmiss.join('\n'));
console.log(items.length,qmiss.length,nmiss.length);
