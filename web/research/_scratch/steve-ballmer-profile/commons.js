const https=require('https');
const titles=process.argv.slice(2);
const q=encodeURIComponent(titles.join('|'));
const u=`https://commons.wikimedia.org/w/api.php?action=query&titles=${q}&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=1000&format=json`;
https.get(u,{headers:{'User-Agent':'BillionDollarPDFs-research/1.0 (read-only)'}},r=>{let d='';r.on('data',c=>d+=c).on('end',()=>{
const p=JSON.parse(d).query.pages;
for(const k in p){const i=(p[k].imageinfo||[])[0];if(!i){console.log(p[k].title,'MISSING');continue;}const m=i.extmetadata;
const s=x=>(m[x]?String(m[x].value).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim():'');
console.log(JSON.stringify({title:p[k].title,w:i.width,h:i.height,thumb:i.thumburl,page:i.descriptionurl,artist:s('Artist'),license:s('LicenseShortName'),date:s('DateTimeOriginal'),desc:s('ImageDescription').slice(0,300),credit:s('Credit').slice(0,120)},null,0));}
})});
