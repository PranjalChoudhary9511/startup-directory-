import fs from 'node:fs';
const b=JSON.parse(fs.readFileSync('../../../src/content/billionaires/books/amancio-ortega.json','utf8'));
const out=[];
const strip=h=>h.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&#x27;|&rsquo;|&lsquo;/g,"'").replace(/&ldquo;|&rdquo;/g,'"').replace(/&euro;/g,'€').replace(/\s+/g,' ');
let i=0;
async function worker(){while(i<b.sources.length){const n=i++;const s=b.sources[n];try{const c=new AbortController();const t=setTimeout(()=>c.abort(),30000);const r=await fetch(s.url,{redirect:'follow',signal:c.signal,headers:{'user-agent':'Mozilla/5.0 (compatible; firstrupee-books-check/1.0; education)','accept-language':'en,es'}});const ct=r.headers.get('content-type')||'';const buf=Buffer.from(await r.arrayBuffer());clearTimeout(t);if(ct.includes('pdf')){fs.writeFileSync(`pages/${n}.pdf`,buf);out[n]=`${n} ${r.status} PDF ${buf.length}`;}else{const txt=strip(buf.toString('utf8'));fs.writeFileSync(`pages/${n}.txt`,txt);out[n]=`${n} ${r.status} ${txt.length}`;}}catch(e){out[n]=`${n} ERR ${e.name}`;}}}
await Promise.all(Array.from({length:8},worker));
console.log(out.join('\n'));
