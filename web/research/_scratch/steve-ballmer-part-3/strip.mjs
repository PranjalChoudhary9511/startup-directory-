import fs from 'fs';
for (const f of process.argv.slice(2)) {
  let s = fs.readFileSync(f,'utf8');
  s = s.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&#8217;|&rsquo;|&#x27;|&#39;/g,"'").replace(/&#8220;|&#8221;|&ldquo;|&rdquo;|&quot;/g,'"').replace(/&amp;/g,'&').replace(/&#8212;|&mdash;/g,'--').replace(/&nbsp;/g,' ').replace(/[ \t]+/g,' ').replace(/\n\s*\n+/g,'\n');
  fs.writeFileSync(f.replace(/\.html$/,'.txt'),s);
  console.log(f, s.length);
}
