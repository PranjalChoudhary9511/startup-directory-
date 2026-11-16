const fs=require('fs');
const b=JSON.parse(fs.readFileSync('../../../src/content/billionaires/books/mark-zuckerberg.json','utf8'));
const strip=h=>h.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const norm=s=>s.replace(/&#0*39;|&#x27;|&apos;|&#8217;|&#146;|&rsquo;/gi,"'").replace(/&#\d+;|&[a-z]+;/gi,' ').toLowerCase().replace(/[^a-z0-9]+/g,'');
(async()=>{
 for(const i of [59,61,149,...Array.from({length:b.sources.length-165},(_,k)=>165+k)]){
  try{const r=await fetch(b.sources[i].url,{headers:{'user-agent':'firstrupee-books-check/1.0 (education)'},redirect:'follow'});const t=strip(await r.text());fs.writeFileSync(`pages/${i}.txt`,t);console.log(i,r.status,t.length)}catch(e){console.log(i,'ERR',e.code||e.name)}
 }
 const pages={};b.sources.forEach((s,i)=>{let t='';try{t=fs.readFileSync(`pages/${i}.txt`,'utf8')}catch{};pages[i]=norm(t)});
 const out=[];let cnt=0,ok=0;
 function chk(where,q,src){cnt++;const parts=q.split(/\[[^\]]*\]/).map(norm).filter(x=>x.length>3);if(!parts.length)return;
  if((src||[]).some(i=>parts.every(p=>pages[i]&&pages[i].includes(p)))){ok++;return}
  const any=Object.keys(pages).filter(i=>parts.every(p=>pages[i].includes(p)));
  out.push(`${where} src{${src}} anyin{${any}} :: ${q}`)}
 function scan(where,text,src){if(!text)return;const re=/["“]([^"”]{4,}?)["”]/g;let m;while((m=re.exec(text)))chk(where,m[1],src)}
 scan('hook',b.hook,b.hookSrc);
 b.chapters.forEach((c,ci)=>c.blocks.forEach((x,i)=>{const w=`${ci}.${i}`;
  if(x.t==='quote')chk(w+' QUOTE',x.text,x.src);
  if(x.t==='p'||x.t==='example')scan(w,x.text,x.src);
  if(x.t==='venture')for(const k of['idea','decision','howStarted','funding','whatHappened','lesson'])scan(w+'.'+k,x[k],x.src);
  if(x.t==='facts'||x.t==='timeline')x.items.forEach((y,j)=>scan(w+'.'+j,y.text||y.label,y.src));
 }));
 console.log(cnt,ok);console.log(out.join('\n'));
})();
