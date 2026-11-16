// usage: node get.mjs name url  -> saves stripped text into ../pages/name.txt
import {writeFileSync} from 'fs';import {dirname,join} from 'path';import {fileURLToPath} from 'url';
const [,,name,url]=process.argv;
const dir=join(dirname(fileURLToPath(import.meta.url)),'..','pages');
const r=await fetch(url,{headers:{'user-agent':'Mozilla/5.0 (research; read-only)','accept':'text/html'},redirect:'follow'}).catch(e=>({status:'ERR '+e.message,text:async()=>''}));
let h=await r.text();
h=h.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<noscript[\s\S]*?<\/noscript>/gi,' ');
h=h.replace(/<\/(p|div|h\d|li|tr|section|article)>/gi,'\n').replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,' ');
h=h.replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;|&#39;|&rsquo;|&lsquo;/g,"'").replace(/&ldquo;|&rdquo;/g,'"').replace(/&mdash;/g,'--').replace(/&#8217;/g,"'").replace(/&#8220;|&#8221;/g,'"').replace(/[ \t]+/g,' ').replace(/\n\s*\n+/g,'\n');
writeFileSync(join(dir,name+'.txt'),h);
console.log(name,r.status,h.length);
