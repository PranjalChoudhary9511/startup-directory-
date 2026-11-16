const https=require('https');
function get(u){return new Promise((res,rej)=>{https.get(u,{headers:{'User-Agent':'BillionDollarPDFsResearch/1.0 (read-only research)'}},r=>{let s='';r.on('data',d=>s+=d);r.on('end',()=>res({status:r.statusCode,body:s}))}).on('error',rej)})}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const qs=['Shangri-La Hotel Hangzhou','Hangzhou Normal University','Hangzhou Dianzi University','West Lake Hangzhou 1980s','Bank of California Center Seattle Fifth Avenue','Pingtan storytelling Suzhou','Great Wall Mutianyu 1998','Yiwu International Trade Market','Jin Yong Louis Cha portrait','Hangzhou Duanqiao Broken Bridge','New Lambton Newcastle New South Wales'];
 for(const q of qs){
  const u='https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=8&format=json&srsearch='+encodeURIComponent(q);
  const r=await get(u);console.log('==',q,r.status);
  try{JSON.parse(r.body).query.search.forEach(x=>console.log(x.title))}catch(e){console.log('ERR',r.body.slice(0,120))}
  await wait(1500);
 }
})();
