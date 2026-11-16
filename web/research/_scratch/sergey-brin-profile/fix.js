const fs=require('fs'),https=require('https');
const f='C:/Users/Pranjal Choudhary/Desktop/start-up derectory/web/research/billionaires/sergey-brin/profile.json';
let p=JSON.parse(fs.readFileSync(f,'utf8'));
p.hook=p.hook.replace('In a 2008 blog post, Sergey Brin described looking up one gene in his own 23andMe DNA data, a check he says he "viewed" as "mostly" entertainment.','In a 2008 blog post, Sergey Brin described looking up one gene in his own 23andMe DNA data. He "viewed it mostly as entertainment".');
const g=p.glance.find(x=>x.label==='Main company today');g.src=[8,17,30];
const a=p.contact.channels.find(x=>x.value==='parkinsonsroadmap.org/contact-us');a.src=[22,23,26];
fs.writeFileSync(f,JSON.stringify(p,null,2)+'\n','utf8');
p=JSON.parse(fs.readFileSync(f,'utf8'));
const n=p.sources.length;let used=new Set();const chk=(s,w)=>{for(const i of s){if(i<0||i>=n)console.log('BAD',w,i);used.add(i)}};
chk(p.hookSrc,'hook');p.glance.forEach(x=>chk(x.src,x.label));p.contact.channels.forEach(x=>chk(x.src,x.label));p.contact.socials.forEach(x=>chk(x.src,x.handle));
console.log('sources',n,'unused',[...Array(n).keys()].filter(i=>!used.has(i)));
console.log('title words',p.title.split(/\s+/).length,'glance',p.glance.length,'channels',p.contact.channels.length,'socials',p.contact.socials.length,'photos',p.photos.length);
const txt=[p.title,p.subtitle,p.hook,p.contact.howToReach,...p.glance.map(x=>x.value),...p.contact.channels.map(x=>x.label),...p.photos.map(x=>x.caption),p.factCheck.method,...p.factCheck.disputed.map(d=>d.claim+' '+d.note)].join(' ');
console.log('words',txt.split(/\s+/).length,'howToReach sentences',p.contact.howToReach.split(/(?<=[.!?])\s/).length);
const urls=[p.portrait,...p.photos].map(x=>x.url);
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function head(u){return new Promise(res=>{const r=https.request(u,{method:'HEAD',headers:{'User-Agent':'BillionDollarPDFs-research/1.0 (read-only, low volume)'}},x=>res(x.statusCode+' '+x.headers['content-type']));r.on('error',e=>res('ERR '+e.message));r.end();});}
(async()=>{for(const u of urls){console.log(await head(u),u.slice(45,95));await wait(3000);}})();
