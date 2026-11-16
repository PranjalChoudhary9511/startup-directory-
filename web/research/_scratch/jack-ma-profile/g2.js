const fs=require('fs');const b=fs.readFileSync('20f.htm.txt','utf8').replace(/&#8209;/g,'-').replace(/&#8217;/g,"'").replace(/&#8220;|&#8221;/g,'"').replace(/&#\d+;/g,' ');
let re=/Jack Ma|Mr\. Ma\b/g,m;const seen=[];while(m=re.exec(b))seen.push(m.index);
// show those in principal shareholder section
let idx=b.search(/Principal shareholders|Major Shareholders and Related|Ordinary Shares Beneficially/i);console.log(idx);
for(const h of seen){const s=b.slice(Math.max(0,h-120),h+260);if(/beneficial|ordinary shares|%|Ant Group held|Yunfeng/i.test(s)&&/\d\.\d|\d{3},\d{3}/.test(s))console.log('>>',s,'\n');}
const k=b.search(/Beneficially Owned/i);console.log(b.slice(k,k+1500));
