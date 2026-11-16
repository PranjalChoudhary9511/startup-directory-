const fs=require('fs');for(const f of ['ex99.htm','20f.htm']){let t=fs.readFileSync(f,'utf8').replace(/<[^>]+>/g,' ').replace(/&#160;|&nbsp;/g,' ').replace(/&#8217;/g,"'").replace(/&amp;/g,'&').replace(/\s+/g,' ');fs.writeFileSync(f+'.txt',t);console.log(f,t.length)}
const a=fs.readFileSync('ex99.htm.txt','utf8');let i=a.search(/Investor Relations Contact/i);console.log(a.slice(i,i+500));
const b=fs.readFileSync('20f.htm.txt','utf8');for(const re of [/principal executive offices/i,/Contact Person|Telephone: \+|\+852 2215/i,/Jack Yun MA|Jack Ma/g]){const m=b.match(re);if(m){const j=b.search(re);console.log('---',re,b.slice(Math.max(0,j-200),j+500))}}
let re=/(Jack (Yun )?Ma|Mr\. Ma)/g,c=0,mm;const hits=[];while((mm=re.exec(b))&&c<80){hits.push(mm.index);c++}console.log('hits',hits.length);
for(const h of hits.slice(0,12))console.log('>>',b.slice(Math.max(0,h-150),h+250));
