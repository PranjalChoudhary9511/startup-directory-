const https=require('https');
function get(u){return new Promise((res,rej)=>{https.get(u,{headers:{'User-Agent':'BillionDollarPDFsResearch/1.0 (read-only research)'}},r=>{let s='';r.on('data',d=>s+=d);r.on('end',()=>res({status:r.statusCode,body:s}))}).on('error',rej)})}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const titles=['File:Hangzhou, 1987 (23827424112).jpg','File:Hangzhou, 1987 (23909593526).jpg','File:Jack Ma (292160777).jpg','File:Yiwu Market.jpg','File:Nobbys Beach, Newcastle NSW.jpg','File:China1982-678.jpg','File:Duanqiao.jpg'];
(async()=>{
 for(const t of titles){
  await wait(3000);
  const u='https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata|size&titles='+encodeURIComponent(t);
  const r=await get(u);
  if(r.status!==200){console.log(t,r.status);continue}
  const p=Object.values(JSON.parse(r.body).query.pages)[0];const ii=p.imageinfo&&p.imageinfo[0];if(!ii){console.log(t,'none');continue}
  const m=ii.extmetadata||{};const strip=s=>(s||'').replace(/<[^>]+>/g,'').trim();
  console.log(JSON.stringify({t,url:ii.url,page:ii.descriptionurl,w:ii.width,h:ii.height,artist:strip(m.Artist&&m.Artist.value),lic:m.LicenseShortName&&m.LicenseShortName.value,date:strip(m.DateTimeOriginal&&m.DateTimeOriginal.value),desc:strip(m.ImageDescription&&m.ImageDescription.value).slice(0,200)}));
 }
})();
