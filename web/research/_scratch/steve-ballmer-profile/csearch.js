const https=require('https');
const get=u=>new Promise(res=>https.get(u,{headers:{'User-Agent':'BillionDollarPDFs-research/1.0 (read-only; low rate)'}},r=>{let d='';r.on('data',c=>d+=c).on('end',()=>res(d))}));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const qs=['Intuit Dome','Microsoft Redmond campus','Harvard Currier House','Detroit Country Day School','Ballmer Windows Phone','Bill Gates Steve Ballmer'];
 for(const q of qs){
  const u='https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=12&format=json&srsearch='+encodeURIComponent(q);
  const d=await get(u); console.log('== '+q);
  try{JSON.parse(d).query.search.forEach(r=>console.log(r.title))}catch(e){console.log('RATE LIMITED: '+d.slice(0,80))}
  await wait(12000);
 }
})();
