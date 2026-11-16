import fs from "node:fs";
const b=JSON.parse(fs.readFileSync(process.argv[2],"utf8"));
const ph=[];const push=(p,w)=>{if(p)ph.push({w,...p})};push(b.portrait,"portrait");(b.photos||[]).forEach((p,i)=>push(p,"photos"+i));b.chapters.forEach((c,ci)=>c.blocks.forEach((x,i)=>{if(x.t=="photo")push(x.photo,ci+"."+i)}));
for(const p of ph){const title=decodeURIComponent(p.page.split("/wiki/")[1]);
 const u="https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=extmetadata|url|size&titles="+encodeURIComponent(title);
 let j;for(let a=0;a<6;a++){await new Promise(r=>setTimeout(r,4000*(a+1)));const r=await fetch(u,{headers:{"user-agent":"firstrupee-books-check/1.0 (education; factcheck)"}});const t=await r.text();try{j=JSON.parse(t);break}catch(e){}}if(!j){console.log("RATE",title);continue;}const pg=Object.values(j.query.pages)[0];const ii=pg.imageinfo?.[0];const m=ii?.extmetadata||{};
 const clean=s=>(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().slice(0,260);
 console.log(`\n[${p.w}] ${title} ${ii?ii.width+"x"+ii.height:"MISSING"}\n BOOK: ${p.license} | ${p.author} | ${p.year} | ${p.caption}\n API: lic=${clean(m.LicenseShortName?.value)} | artist=${clean(m.Artist?.value)} | credit=${clean(m.Credit?.value)} | date=${clean(m.DateTimeOriginal?.value)}\n DESC: ${clean(m.ImageDescription?.value)}\n URLOK: ${p.url.includes(ii?.url?.split("/").pop()||"~")}`);
}

