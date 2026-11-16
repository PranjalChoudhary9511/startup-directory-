import fs from 'node:fs';
const book=JSON.parse(fs.readFileSync('../../../src/content/billionaires/books/jensen-huang.json','utf8'));
const src=book.sources;
const strip=h=>h.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<\/(p|div|li|h\d|tr|br)>/gi,'\n').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#8217;|&rsquo;|&#x27;|&#39;|&apos;/g,"'").replace(/&#8220;|&#8221;|&ldquo;|&rdquo;|&quot;/g,'"').replace(/[ \t]+/g,' ').replace(/\n\s*\n+/g,'\n');
const res=[];let n=0;
async function one(i){const s=src[i];const ctl=new AbortController();const t=setTimeout(()=>ctl.abort(),45000);
 try{const r=await fetch(s.url,{redirect:'follow',signal:ctl.signal,headers:{'user-agent':'firstrupee-books-check/1.0 (education)','accept':'text/html,application/pdf,*/*'}});
  const ct=r.headers.get('content-type')||'';
  const buf=Buffer.from(await r.arrayBuffer());
  if(/pdf/.test(ct)||s.url.endsWith('.pdf')){fs.writeFileSync(`pages/${i}.pdf`,buf);res[i]=[r.status,ct.slice(0,20),buf.length];}
  else{const t=strip(buf.toString('utf8'));fs.writeFileSync(`pages/${i}.txt`,t);res[i]=[r.status,ct.slice(0,20),t.length];}
 }catch(e){res[i]=['ERR',e.cause?.code||e.name,0];}finally{clearTimeout(t);}
}
const q=[...src.keys()];
await Promise.all(Array.from({length:10},async()=>{while(q.length){await one(q.shift());}}));
fs.writeFileSync('status.tsv',res.map((r,i)=>`${i}\t${r[0]}\t${r[1]}\t${r[2]}\t${src[i].url.slice(0,70)}`).join('\n'));
