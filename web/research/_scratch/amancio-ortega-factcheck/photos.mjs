import fs from 'node:fs';
const b=JSON.parse(fs.readFileSync('../../../src/content/billionaires/books/amancio-ortega.json','utf8'));
const ph=[...(b.portrait?[['portrait',b.portrait]]:[]),...b.photos.map((p,i)=>[`photos[${i}]`,p])];
b.chapters.forEach((c,ci)=>c.blocks.forEach((x,i)=>{if(x.t==='photo')ph.push([`${ci}.${i}`,x.photo])}));
const titles=[...new Set(ph.map(([w,p])=>decodeURIComponent(p.page.split('/wiki/')[1]).replace(/_/g,' ')))];
const u=`https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=extmetadata|url|size&iiurlwidth=960&titles=${encodeURIComponent(titles.join('|'))}`;
let j;for(let a=0;a<6;a++){const r=await fetch(u,{headers:{'user-agent':'firstrupee-books-check/1.0 (education; billion-dollar-pdfs fact-check)'}});const t=await r.text();try{j=JSON.parse(t);break}catch{console.log('retry',a,t.slice(0,60));await new Promise(r=>setTimeout(r,30000*(a+1)))}}
if(!j){process.exit(1)}
const byT={};Object.values(j.query.pages).forEach(p=>byT[p.title.replace(/^File:/,'')]=p);
const clean=s=>(s||'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
for(const [w,p] of ph){const tl=decodeURIComponent(p.page.split('/wiki/')[1]).replace(/_/g,' ').replace(/^File:/,'');const pg=byT[tl];const ii=pg?.imageinfo?.[0];if(!ii){console.log(w,'MISSING',tl);continue}const m=ii.extmetadata;
console.log(`${w} | ${tl}\n  claimed: ${p.author} | ${p.license} | ${p.year}\n  API: artist=${clean(m.Artist?.value).slice(0,80)} | lic=${clean(m.LicenseShortName?.value)} | date=${clean(m.DateTimeOriginal?.value).slice(0,25)} | desc=${clean(m.ImageDescription?.value).slice(0,140)}\n  url match: ${p.url===ii.url||p.url===ii.thumburl}`)}
