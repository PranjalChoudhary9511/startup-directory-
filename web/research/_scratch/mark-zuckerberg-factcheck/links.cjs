const ua={'user-agent':'firstrupee-books-check/1.0 (education)'};
(async()=>{for(const u of ['https://about.fb.com/news/','https://www.meta.com/about/leadership/mark-zuckerberg/','https://chanzuckerberg.com/','https://biohub.org/contact/','https://about.fb.com/media-gallery/']){const t=await (await fetch(u,{headers:ua})).text();
const norm=t.split(String.fromCharCode(92)+'/').join('/');
const all=[...norm.matchAll(/https?:\/\/[^"'\s<>)]*/gi)].map(m=>m[0]);
const h=[...new Set(all)].filter(x=>/(facebook\.com|instagram\.com|threads\.(net|com)|twitter\.com|x\.com|youtube\.com|linkedin\.com)/i.test(x)&&!/fbcdn|static|sharer|share\?|intent|developers|about\.fb|business\.|\.js|plugins/i.test(x));
console.log('##',u);console.log(h.slice(0,25).join('\n'));
console.log('emails',[...new Set(norm.match(/[a-z]+@[a-z]+\.[a-z]+/gi)||[])].slice(0,10));}})()
