const https=require('https');
function get(u){return new Promise((res,rej)=>{https.get(u,{headers:{'User-Agent':'BillionDollarPDFsResearch/1.0 (read-only research)'}},r=>{let s='';r.on('data',d=>s+=d);r.on('end',()=>res({status:r.statusCode,ra:r.headers['retry-after'],body:s}))}).on('error',rej)})}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const titles=['File:Hangzhou, 1987 (23827424112).jpg','File:Hangzhou, 1987 (23909593526).jpg','File:Jack Ma (292160777).jpg','File:Yiwu Market.jpg','File:Nobbys Beach, Newcastle NSW.jpg','File:China1982-678.jpg'];
(async()=>{
 const u='https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata|size&titles='+encodeURIComponent(titles.join('|'));
 for(let i=0;i<6;i++){
  const r=await get(u);
  if(r.status===200){
   const ps=Object.values(JSON.parse(r.body).query.pages);
   for(const p of ps){const ii=p.imageinfo&&p.imageinfo[0];if(!ii){console.log(p.title,'none');continue}
    const m=ii.extmetadata||{};const strip=s=>(s||'').replace(/<[^>]+>/g,'').trim();
    console.log(JSON.stringify({t:p.title,url:ii.url,page:ii.descriptionurl,artist:strip(m.Artist&&m.Artist.value),lic:m.LicenseShortName&&m.LicenseShortName.value,date:strip(m.DateTimeOriginal&&m.DateTimeOriginal.value),desc:strip(m.ImageDescription&&m.ImageDescription.value).slice(0,220)}));}
   return;
  }
  const ms=(parseInt(r.ra||'0',10)||30)*1000;console.log('status',r.status,'retry-after',r.ra,'waiting',ms);await wait(Math.min(ms,60000));
 }
})();
