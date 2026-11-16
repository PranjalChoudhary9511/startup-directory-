// plain read-only fetch of listed pages, saved as stripped text
const fs=require('fs'),cp=require('child_process');
const list=fs.readFileSync(process.argv[2],'utf8').split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
function strip(h){return h.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<noscript[\s\S]*?<\/noscript>/gi,' ').replace(/<(br|p|div|li|h\d|tr)[^>]*>/gi,'\n').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#x27;|&#39;|&rsquo;|&lsquo;/g,"'").replace(/&quot;|&ldquo;|&rdquo;/g,'"').replace(/&mdash;/g,'-').replace(/[ \t]+/g,' ').replace(/\n\s*\n+/g,'\n').trim();}
for(const u of list){const name=u.replace(/^https?:\/\//,'').replace(/[^a-zA-Z0-9]+/g,'_').slice(0,90);const out='pages/'+name+'.txt';
 let r;try{r=cp.execFileSync('curl',['-sL','--max-time','40','-A','Mozilla/5.0 (read-only research)','-w','\n@@%{http_code}',u],{maxBuffer:6e7}).toString('utf8')}catch(e){console.log('ERR',u);continue}
 const m=r.lastIndexOf('\n@@');const code=r.slice(m+3);const t=strip(r.slice(0,m));fs.writeFileSync(out,u+'\n'+t);console.log(code,t.length,name);}
