const fs=require('fs');
const {execFileSync}=require('child_process');
const titles=process.argv.slice(2);
for(let i=0;i<titles.length;i+=20){
 const batch=titles.slice(i,i+20).join('|');
 const url='https://commons.wikimedia.org/w/api.php?action=query&titles='+encodeURIComponent(batch)+'&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=1000&format=json';
 const out=execFileSync('curl',['-s','-A','BillionDollarPDFs-research/1.0',url],{encoding:'utf8',maxBuffer:5e7});
 const j=JSON.parse(out);
 for(const p of Object.values(j.query.pages)){
  const ii=p.imageinfo&&p.imageinfo[0]; if(!ii){console.log('MISSING',p.title);continue}
  const m=ii.extmetadata||{};const s=k=>(m[k]&&String(m[k].value).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim())||'';
  console.log(JSON.stringify({title:p.title,w:ii.width,h:ii.height,thumb:ii.thumburl,page:ii.descriptionurl,artist:s('Artist'),license:s('LicenseShortName'),date:s('DateTimeOriginal'),desc:s('ImageDescription').slice(0,400),credit:s('Credit').slice(0,150)},null,0));
 }
}
