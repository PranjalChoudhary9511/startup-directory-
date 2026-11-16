const https=require('https');
const urls=["https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Google_page_brin.jpg/960px-Google_page_brin.jpg","https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Sergey_Brin%2C_Web_2.0_Conference.jpg/960px-Sergey_Brin%2C_Web_2.0_Conference.jpg","https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Google_team_group_photo_with_Vanhanen.jpg/960px-Google_team_group_photo_with_Vanhanen.jpg"];
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function head(u){return new Promise(res=>{const r=https.request(u,{method:'HEAD',agent:false,timeout:15000,headers:{'User-Agent':'BillionDollarPDFs-research/1.0 (read-only, low volume)'}},x=>{x.resume();res(x.statusCode+' '+x.headers['content-type'])});r.on('timeout',()=>{r.destroy();res('TIMEOUT')});r.on('error',e=>res('ERR '+e.message));r.end();});}
(async()=>{for(const u of urls){await wait(25000);console.log(await head(u),u.slice(50,90));}process.exit(0)})();
