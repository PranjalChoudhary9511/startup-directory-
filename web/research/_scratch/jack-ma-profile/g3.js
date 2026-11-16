const fs=require('fs');const b=fs.readFileSync('20f.htm.txt','utf8').replace(/&#8209;/g,'-').replace(/&#8217;/g,"'").replace(/&#8220;|&#8221;/g,'"').replace(/&#\d+;/g,' ');
const k=b.search(/Name Beneficial ownership \(Shares\)/);console.log(b.slice(k,k+1600));
let re=/Jack Ma[^.]{0,200}(ordinary shares|Shares|%)/g,m;let c=0;while((m=re.exec(b))&&c<10){if(m.index>k-2000&&m.index<k+8000){console.log('NOTE',b.slice(m.index-100,m.index+400));c++}}
const n=b.indexOf('Lakeside Partners');console.log(b.slice(n-250,n+150));
