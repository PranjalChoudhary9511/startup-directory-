const https=require('https'),fs=require('fs');
const titles=["File:Sergey Brin Ted 2010 (cropped).jpg","File:Sergey Brin, Web 2.0 Conference.jpg","File:Sergey Brin (50910683).jpg","File:Sergey on China.jpg","File:Sergey Brin.JPG","File:Schmidt-Brin-Page-20080520.jpg","File:Page+brin by origa.jpg","File:Sergey Brin 2008.jpg","File:Google page brin.jpg","File:Larry, Sergey, Eric Schmidt (Google's Geo Developer Day 2006).jpg","File:Secretary Kerry Chats With Google Co-Founder Brin After Viewing a Google Self-Driving Car at the 2016 Global Entrepreneurship's Innovation Marketplace at Stanford University (27786622531).jpg","File:Google team group photo with Vanhanen.jpg","File:Sergey Brin at Google Developer Day.jpg"];
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function get(u){return new Promise((res,rej)=>{https.get(u,{headers:{'User-Agent':'BillionDollarPDFs-research/1.0 (read-only, low volume)'}},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(d));}).on('error',rej);});}
(async()=>{const out=fs.existsSync('meta.json')?JSON.parse(fs.readFileSync('meta.json','utf8')):[];const done=new Set(out.map(o=>o.title));
await wait(45000);
for(const t of titles){if(done.has(t))continue;let d;for(let a=0;a<3;a++){d=await get('https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=1000&titles='+encodeURIComponent(t));if(d.trim().startsWith('{'))break;await wait(30000);}
if(!d.trim().startsWith('{')){console.log('RATE',t);await wait(30000);continue;}
const j=JSON.parse(d);for(const p of Object.values(j.query.pages)){const ii=p.imageinfo&&p.imageinfo[0];if(!ii){out.push({title:p.title,missing:true});continue;}const m=ii.extmetadata||{};const s=x=>(m[x]&&String(m[x].value).replace(/<[^>]+>/g,'').trim());out.push({title:p.title,thumb:ii.thumburl,page:ii.descriptionurl,w:ii.width,h:ii.height,artist:s('Artist'),license:s('LicenseShortName'),date:s('DateTimeOriginal'),desc:(s('ImageDescription')||'').slice(0,400)});}
fs.writeFileSync('meta.json',JSON.stringify(out,null,1));await wait(8000);}
console.log('done',out.length);})();
