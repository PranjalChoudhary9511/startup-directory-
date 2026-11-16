import fs from 'node:fs';
const b=JSON.parse(fs.readFileSync('../../../src/content/billionaires/books/jensen-huang.json','utf8'));
const ps=[['portrait',b.portrait],...b.photos.map((p,i)=>['photos'+i,p])];
b.chapters.forEach((c,ci)=>c.blocks.forEach((x,i)=>{if(x.t==='photo')ps.push([`CH${ci}.${i}`,x.photo])}));
const titles=[...new Set(ps.map(([,p])=>decodeURIComponent(p.page.split('/wiki/')[1])))];
const out={};
for(let i=0;i<titles.length;i+=20){const q=titles.slice(i,i+20).join('|');
 const u='https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=960&titles='+encodeURIComponent(q);
 const r=await fetch(u,{headers:{'user-agent':'firstrupee-books-check/1.0 (education)'}});const j=await r.json();
 const norm=Object.fromEntries((j.query.normalized||[]).map(n=>[n.to,n.from]));
 for(const p of Object.values(j.query.pages)){const ii=p.imageinfo?.[0];const m=ii?.extmetadata||{};const clean=s=>(s||'').replace(/<[^>]+>/g,'').trim().slice(0,240);
  out[norm[p.title]||p.title]={missing:!ii,license:clean(m.LicenseShortName?.value),artist:clean(m.Artist?.value),date:clean(m.DateTimeOriginal?.value),desc:clean(m.ImageDescription?.value),url:ii?.url,thumb:ii?.thumburl,nonfree:m.NonFree?.value,cat:(m.Categories?.value||'').slice(0,0)};}
}
for(const [w,p] of ps){const t=decodeURIComponent(p.page.split('/wiki/')[1]);const o=out[t]||out[t.replace(/_/g,' ')]||{};
 const urlOk=[o.url,o.thumb].includes(p.url);
 console.log(`${w}\n  page ${t}\n  book: ${p.license} | ${p.author} | ${p.year} | urlOk=${urlOk}\n  api : ${o.license} | ${o.artist} | ${o.date}\n  desc: ${o.desc}\n  capt: ${p.caption}`);
 if(!urlOk)console.log('  apiurl',o.thumb,'\n  bookurl',p.url);}
