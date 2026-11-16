const https=require('https');const urls=process.argv.slice(2);
const head=u=>new Promise(res=>{const r=https.request(u,{method:'HEAD',headers:{'User-Agent':'BillionDollarPDFs-research/1.0 (read-only; low rate)'}},x=>res(x.statusCode+' '+x.headers['content-type']));r.on('error',e=>res('ERR '+e.message));r.end()});
(async()=>{for(const u of urls){await new Promise(r=>setTimeout(r,15000));console.log(await head(u),u.split('/').pop().slice(0,50));}})();
