const https=require('https');
const get=u=>new Promise(r=>https.get(u,{headers:{'User-Agent':'BillionDollarPDFs/1.0 (research; read-only)'}},s=>{let d='';s.on('data',c=>d+=c).on('end',()=>r(d))}));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const strip=s=>(s||'').replace(/<[^>]+>/g,'').trim();
(async()=>{
 const titles=['File:Currier House - Harvard University.jpg','File:Poker Room.jpg','File:Currier House, Radcliffe Quadrangle - IMG 1693.jpg','File:Mrs. Carter with Detroit Country Day School - DPLA - 0ed56e4cbf2e9592efc1b74560afcd11.jpg'];
 await wait(25000);
 const d=await get('https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1200&titles='+encodeURIComponent(titles.join('|')));
 try{const p=JSON.parse(d).query.pages;for(const k in p){const i=p[k].imageinfo&&p[k].imageinfo[0];if(!i){console.log(p[k].title,'MISSING');continue}const m=i.extmetadata||{};console.log(JSON.stringify({title:p[k].title,url:i.url,page:i.descriptionurl,author:strip(m.Artist&&m.Artist.value),license:m.LicenseShortName&&m.LicenseShortName.value,date:strip(m.DateTimeOriginal&&m.DateTimeOriginal.value),desc:strip(m.ImageDescription&&m.ImageDescription.value).slice(0,200)}))}}catch(e){console.log('ERR',d.slice(0,100))}
 for(const t of ['1967 Detroit riot','Stanford Graduate School of Business','Nuremberg trials courtroom interpreters','Procter & Gamble headquarters Cincinnati']){await wait(25000);const r=await get('https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=10&format=json&srsearch='+encodeURIComponent(t));console.log('## '+t);try{JSON.parse(r).query.search.forEach(x=>console.log(x.title))}catch(e){console.log('ERR')}}
})();
