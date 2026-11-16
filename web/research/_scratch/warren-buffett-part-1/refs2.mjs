import fs from 'fs';
const w=JSON.parse(fs.readFileSync('wp.json','utf8')).parse.wikitext['*'];
const i=w.indexOf('In 1947, Buffett matriculated');
console.log(w.slice(i,i+7000));
