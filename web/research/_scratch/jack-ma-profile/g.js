const fs=require('fs');const b=fs.readFileSync('20f.htm.txt','utf8').replace(/&#8209;/g,'-').replace(/&#8217;/g,"'").replace(/&#8220;|&#8221;/g,'"');
for(const q of [/969 West/g,/Wen Yi/g,/corporate headquarters/gi,/Our website|our corporate website|www\.alibabagroup/gi,/Jack Ma \(\d|Jack Yun Ma|Jack Ma\s+[\d,]{6,}/g,/founded in 1999|Our company was founded|was founded in/gi]){
let m,c=0;while((m=q.exec(b))&&c<3){console.log('['+q.source+']',b.slice(Math.max(0,m.index-200),m.index+350));console.log();c++}}
// major shareholders table
const i=b.search(/Major Shareholders/);let j=b.indexOf('Major Shareholders',i+2000);
let re=/beneficial own/gi,m;const idxs=[];while(m=re.exec(b))idxs.push(m.index);
const t=b.search(/Jack Ma\s*\(?\d*\)?\s*[\d,]{9,}/);console.log('T',t, t>0?b.slice(t-400,t+700):'');
