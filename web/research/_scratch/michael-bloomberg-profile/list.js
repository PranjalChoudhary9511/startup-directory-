const https=require('https');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function get(u){return new Promise((res,rej)=>{https.get(u,{headers:{'User-Agent':'BillionDollarPDFsResearch/1.0 (read-only research; contact via project owner)'}},r=>{let d='';r.on('data',c=>d+=c).on('end',()=>res(d))}).on('error',rej)})}
async function api(q){let raw,t=0;for(;;){raw=await get('https://commons.wikimedia.org/w/api.php?'+q+'&format=json');if(raw[0]==='{'||t++>4)break;await sleep(25000)}return raw[0]==='{'?JSON.parse(raw):{}}
(async()=>{
for(const c of ['Category:Bloomberg_L.P.','Category:Michael_Bloomberg_by_year','Category:Mayoralty_of_Michael_Bloomberg','Category:Bloomberg_Terminal','Category:Bloomberg_Tower','Category:Bloomberg_London']){
 const j=await api('action=query&list=categorymembers&cmlimit=60&cmtitle='+encodeURIComponent(c));console.log('##',c);(j.query?j.query.categorymembers:[]).forEach(x=>console.log(x.title));await sleep(6000)}
for(const s of ['"Bloomberg Terminal"','"Bloomberg keyboard"','"Michael Bloomberg" 2001 mayor election','"Salomon Brothers"','"731 Lexington"']){
 const j=await api('action=query&list=search&srnamespace=6&srlimit=15&srsearch='+encodeURIComponent(s));console.log('##',s);(j.query?j.query.search:[]).forEach(x=>console.log(x.title));await sleep(6000)}
})();
