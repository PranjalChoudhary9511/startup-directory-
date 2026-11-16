const https=require('https');const q=process.argv.slice(2);
const get=u=>new Promise(r=>https.get(u,{headers:{'User-Agent':'BillionDollarPDFs/1.0 (research; read-only)'}},s=>{let d='';s.on('data',c=>d+=c).on('end',()=>r(d))}));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{for(const t of q){await wait(9000);const u='https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=12&format=json&srsearch='+encodeURIComponent(t);const d=await get(u);console.log('## '+t);try{JSON.parse(d).query.search.forEach(r=>console.log(r.title))}catch(e){console.log('ERR '+d.slice(0,80))}}})();
