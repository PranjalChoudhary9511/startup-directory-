const ua={'user-agent':'firstrupee-books-check/1.0 (education)'};
(async()=>{const t=await (await fetch('https://www.meta.com/about/leadership/mark-zuckerberg/',{headers:ua})).text();const n=t.split('\/').join('/').split('\u00252F').join('/').split('%2F').join('/');
const re=/zuck|finkd/gi;let m;const s=new Set();while((m=re.exec(n))){const w=n.slice(Math.max(0,m.index-40),m.index+25);if(/facebook|instagram|threads|x\.com|twitter/i.test(w))s.add(w)}console.log([...s].slice(0,15).join('\n'))})()
