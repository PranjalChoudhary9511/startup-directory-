const https=require('https'),fs=require('fs');
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function get(u){return new Promise((res,rej)=>{https.get(u,{headers:{'User-Agent':'BillionDollarPDFs-research/1.0 (read-only, low volume)'}},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(d));}).on('error',rej);});}
(async()=>{const qs=['Pathfinder 1 airship LTA Research','Google first production server Stanford','Googleplex Mountain View headquarters','Akron Airdock'];const out={};
for(const q of qs){await wait(15000);const d=await get('https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=8&format=json&srsearch='+encodeURIComponent(q));if(!d.trim().startsWith('{')){console.log('RATE',q);continue;}out[q]=JSON.parse(d).query.search.map(s=>s.title);console.log(q,JSON.stringify(out[q]));}
})();
