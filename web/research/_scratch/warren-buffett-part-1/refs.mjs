import fs from 'fs';
const w=JSON.parse(fs.readFileSync('wp.json','utf8')).parse.wikitext['*'];
const i=w.indexOf('== Early life'); const j=w.indexOf('==', w.indexOf('== Career')+12);
console.log(w.slice(w.indexOf('Early life')-5, w.indexOf('Berkshire Hathaway', w.indexOf('Early life')+6000)).slice(0,9000));
