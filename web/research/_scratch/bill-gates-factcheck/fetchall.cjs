const fs=require('fs'),path=require('path');
const b=JSON.parse(fs.readFileSync('../../../src/content/billionaires/books/bill-gates.json','utf8'));
fs.mkdirSync('src',{recursive:true});
function strip(h){return h.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<br\s*\/?>/gi,'\n').replace(/<\/(p|div|li|h\d|tr)>/gi,'\n').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#0?39;|&apos;|&rsquo;|&#8217;/g,"'").replace(/&ldquo;|&rdquo;|&#8220;|&#8221;/g,'"').replace(/&mdash;|&#8212;/g,'—').replace(/[ \t]+/g,' ').replace(/\n\s*\n+/g,'\n');}
const res=[];let i=0;
async function work(){while(i<b.sources.length){const k=i++;const s=b.sources[k];const ctl=new AbortController();const t=setTimeout(()=>ctl.abort(),30000);
 try{const r=await fetch(s.url,{redirect:'follow',signal:ctl.signal,headers:{'user-agent':'firstrupee-books-check/1.0 (education)','accept':'text/html,application/pdf,*/*'}});
  const ct=r.headers.get('content-type')||'';let len=0;
  if(/pdf/.test(ct)||/\.pdf$/.test(s.url)){const buf=Buffer.from(await r.arrayBuffer());fs.writeFileSync(`src/${k}.pdf`,buf);len=buf.length;res.push([k,r.status,'pdf',len,s.url]);}
  else{const t=await r.text();const x=strip(t);fs.writeFileSync(`src/${k}.txt`,x);res.push([k,r.status,ct.slice(0,20),x.length,s.url]);}
 }catch(e){res.push([k,'ERR',e.code||e.name,0,s.url]);}
 clearTimeout(t);}}
(async()=>{await Promise.all(Array.from({length:10},work));res.sort((a,b)=>a[0]-b[0]);fs.writeFileSync('status.tsv',res.map(r=>r.join('\t')).join('\n'));
const badL=res.filter(r=>r[1]!==200||r[3]<1500);console.log('ok',res.length-badL.length,'bad',badL.length);console.log(badL.map(r=>r.join(' ')).join('\n'));})();
