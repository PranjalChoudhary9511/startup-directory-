const fs=require('fs');
const b=JSON.parse(fs.readFileSync('../../../src/content/billionaires/books/mark-zuckerberg.json','utf8'));
const ps=[['portrait',b.portrait],...b.photos.map((p,i)=>['photos'+i,p])];
b.chapters.forEach((c,ci)=>c.blocks.forEach((x,i)=>{if(x.t==='photo')ps.push([`${ci}.${i}`,x.photo])}));
(async()=>{for(const[w,p]of ps){const title=decodeURIComponent(p.page.split('/wiki/')[1]);
 const u=`https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&titles=${encodeURIComponent(title)}`;
 let j;for(let k=0;k<6;k++){const r=await fetch(u,{headers:{"user-agent":"firstrupee-books-check/1.0 (education)"}});const tx=await r.text();try{j=JSON.parse(tx);break}catch{await new Promise(s=>setTimeout(s,8000*(k+1)))}}await new Promise(s=>setTimeout(s,2500));const pg=Object.values(j.query.pages)[0];const ii=pg.imageinfo&&pg.imageinfo[0];
 if(!ii){console.log(w,title,'MISSING');continue}const m=ii.extmetadata;const clean=s=>(s||'').replace(/<[^>]+>/g,'').trim();
 console.log(`${w} | ${title}\n  book: ${p.author} | ${p.license} | ${p.year}\n  api : ${clean(m.Artist&&m.Artist.value)} | ${clean(m.LicenseShortName&&m.LicenseShortName.value)} | ${clean(m.DateTimeOriginal&&m.DateTimeOriginal.value).slice(0,40)}\n  desc: ${clean(m.ImageDescription&&m.ImageDescription.value).slice(0,260)}\n  urlmatch: ${p.url.includes(ii.url.split('/').pop())} cap: ${p.caption.slice(0,120)}`)}})();
