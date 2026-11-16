// Strip HTML to plain text. Usage: node h2t.js <dir>  -> writes <name>.txt beside each .html
const fs = require('fs'), path = require('path');
const dir = process.argv[2];
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.html')) continue;
  let s = fs.readFileSync(path.join(dir, f), 'utf8');
  s = s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ');
  s = s.replace(/<\/(p|div|li|h\d|tr|br|section|article)>/gi, '\n').replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<[^>]+>/g, ' ');
  s = s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;|&rsquo;|&#8217;/g, "'").replace(/&ldquo;|&rdquo;|&#8220;|&#8221;/g, '"').replace(/&mdash;|&#8212;/g, '-').replace(/&ndash;|&#8211;/g, '-');
  s = s.replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
  fs.writeFileSync(path.join(dir, f.replace(/\.html$/, '.txt')), s);
  console.log(f, s.length);
}
