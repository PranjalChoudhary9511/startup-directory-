const fs=require('fs');
const b=JSON.parse(fs.readFileSync('../../../src/content/billionaires/books/mark-zuckerberg.json','utf8'));
const strip=h=>h.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&#8217;|&rsquo;|&#x27;|&#39;|&apos;/g,"'").replace(/&#8220;|&#8221;|&ldquo;|&rdquo;|&quot;/g,'"').replace(/&amp;/g,'&').replace(/&#8212;|&mdash;/g,'—').replace(/&#8211;|&ndash;/g,'–').replace(/\s+/g,' ');
const res=[];let idx=0;
async function w(){while(idx<b.sources.length){const i=idx++;const s=b.sources[i];
 try{const c=new AbortController();const t=setTimeout(()=>c.abort(),40000);
  const r=await fetch(s.url,{redirect:'follow',signal:c.signal,headers:{'user-agent':'firstrupee-books-check/1.0 (education)','accept':'text/html,*/*'}});
  clearTimeout(t);const ct=r.headers.get('content-type')||'';
  let txt='';if(/pdf/.test(ct)||/\.pdf$/.test(s.url)){const buf=Buffer.from(await r.arrayBuffer());fs.writeFileSync(`pages/${i}.pdf`,buf);txt=''}else{txt=strip(await r.text());fs.writeFileSync(`pages/${i}.txt`,txt)}
  res[i]=`${i}\t${r.status}\t${txt.length}\t${s.url.slice(0,70)}`;
 }catch(e){res[i]=`${i}\tERR ${e.code||e.name}\t0\t${s.url.slice(0,70)}`}
}}
Promise.all(Array.from({length:8},w)).then(()=>{fs.writeFileSync('fetch.log',res.join('\n'));console.log(res.join('\n'))});
