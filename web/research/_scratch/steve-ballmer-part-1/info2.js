const https=require('https');
const get=u=>new Promise(r=>https.get(u,{headers:{'User-Agent':'BillionDollarPDFs/1.0 (research; read-only)'}},s=>{let d='';s.on('data',c=>d+=c).on('end',()=>r(d))}));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const strip=s=>(s||'').replace(/<[^>]+>/g,'').trim();
const titlesOf=async t=>{await wait(30000);const r=await get('https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=8&format=json&srsearch='+encodeURIComponent(t));console.log('## '+t);try{return JSON.parse(r).query.search.map(x=>x.title)}catch(e){console.log('ERR');return []}};
(async()=>{
 const a=await titlesOf('Detroit riot 1967 National Guard');a.forEach(x=>console.log(x));
 const b=await titlesOf('Procter Gamble Cincinnati towers headquarters');b.forEach(x=>console.log(x));
 const c=await titlesOf('Nuremberg Trials courtroom 1946 defendants dock');c.forEach(x=>console.log(x));
 const pick=['File:Stanford Business School.jpg',...a.slice(0,5),...b.slice(0,4),...c.slice(0,5)];
 await wait(30000);
 const d=await get('https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&titles='+encodeURIComponent(pick.join('|')));
 try{const p=JSON.parse(d).query.pages;for(const k in p){const i=p[k].imageinfo&&p[k].imageinfo[0];if(!i){console.log(p[k].title,'MISSING');continue}const m=i.extmetadata||{};console.log(JSON.stringify({title:p[k].title,url:i.url.split('?')[0],page:i.descriptionurl,author:strip(m.Artist&&m.Artist.value).slice(0,120),license:m.LicenseShortName&&m.LicenseShortName.value,date:strip(m.DateTimeOriginal&&m.DateTimeOriginal.value).slice(0,40),desc:strip(m.ImageDescription&&m.ImageDescription.value).slice(0,160)}))}}catch(e){console.log('ERR',d.slice(0,100))}
})();
