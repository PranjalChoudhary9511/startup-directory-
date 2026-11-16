const fs=require('fs');
const b=JSON.parse(fs.readFileSync('../../../src/content/billionaires/books/bill-gates.json','utf8'));
const ps=[];if(b.portrait)ps.push(['portrait',b.portrait]);b.photos.forEach((p,i)=>ps.push(['photos['+i+']',p]));b.chapters.forEach((c,ci)=>c.blocks.forEach((x,i)=>{if(x.t==='photo')ps.push([`ch${ci}.${i}`,x.photo])}));
const ua={'user-agent':'FirstRupeeBooksCheck/1.0 (education; contact via jainjatin2525 project) node-fetch'};
(async()=>{const titles=[...new Set(ps.map(([w,p])=>decodeURIComponent(p.page.split('/wiki/')[1]).replace(/_/g,' ')))];
 const u='https://commons.wikimedia.org/w/api.php?action=query&format=json&maxlag=5&prop=imageinfo&iiprop=extmetadata|url&titles='+encodeURIComponent(titles.join('|'));
 let txt;for(let a=0;a<5;a++){const r=await fetch(u,{headers:ua});txt=await r.text();if(txt.startsWith('{'))break;await new Promise(r=>setTimeout(r,20000));}
 const j=JSON.parse(txt);const map={};for(const pg of Object.values(j.query.pages))map[pg.title]=pg;
 const norm={};(j.query.normalized||[]).forEach(n=>norm[n.from]=n.to);
 for(const [w,p] of ps){const t=decodeURIComponent(p.page.split('/wiki/')[1]).replace(/_/g,' ');const pg=map[norm[t]||t];const ii=pg&&pg.imageinfo&&pg.imageinfo[0];
 if(!ii){console.log(w,t,'MISSING');continue}const m=ii.extmetadata;const g=k=>(m[k]?String(m[k].value).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().slice(0,500):'');
 console.log(`--- ${w} ${t}\n book: ${p.author} | ${p.license} | ${p.year}\n cap: ${p.caption}\n api: artist=${g('Artist')} | lic=${g('LicenseShortName')} | cred=${g('Credit')} | date=${g('DateTimeOriginal')} | usage=${g('UsageTerms')}\n desc=${g('ImageDescription')}`);}
})();
