import fs from "node:fs";
const f = process.argv[2]; let s = fs.readFileSync(f, "utf8");
const R = [
["Backing from Alibaba and its founders, according to Caixin-style reports, plus tuition","Backing from Alibaba, according to Caixin, plus tuition"],
["\"src\": [102, 103, 104, 151]","\"src\": [102, 103, 104, 151, 157]"],
["Ma first met Jerry Yang around 1998, while working in Beijing. Those walks on the Great Wall turned into a friendship, and the friendship turned into a negotiation that finished at the Pebble Beach resort in California.","Ma first met Jerry Yang around 1998, while working in Beijing. Walks together on the Great Wall became a friendship, and the friendship became a negotiation that finished at the Pebble Beach resort in California."],
["One deep cut, he believed, beats many small ones.\", \"src\": [18] }","One deep cut, he believed, beats many small ones.\", \"src\": [18, 19] }"],
["\"src\": [51, 63, 55, 56, 104, 65, 154] }","\"src\": [51, 63, 55, 56, 57, 104, 65, 154] }"],
["__The lesson for you: be slow to buy and fast to test.__\", \"src\": [] }","__The lesson for you: be slow to buy and fast to test.__\", \"src\": [18, 22, 76, 79, 109, 112, 116] }"],
["\"url\": \"https://thelowdown.momentum.asia/jack-ma-congratulates-pdd-and-rallies-alibaba-employees-to-change/\" }","\"url\": \"https://thelowdown.momentum.asia/jack-ma-congratulates-pdd-and-rallies-alibaba-employees-to-change/\" },\n    { \"label\": \"Caixin Global, Alibaba-backed business school forced to drop university from name (2021)\", \"url\": \"https://www.caixinglobal.com/2021-05-20/trending-in-china-alibaba-backed-biz-school-forced-to-drop-university-from-name-101715519.html\" }"],
];
let bad=0; for (const [a,b] of R){const n=s.split(a).length-1; if(n!==1){console.log("x"+n,a.slice(0,80));bad++;continue;} s=s.replace(a,()=>b);} fs.writeFileSync(f,s,"utf8"); console.log("failed",bad);
