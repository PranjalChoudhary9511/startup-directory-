import fs from "node:fs";
const file = process.argv[2];
let s = fs.readFileSync(file, "utf8");
const R = [
// Hope
[" He also sold medicine and medical equipment door to door for over a year."," He also spent over a year selling medicine and medical equipment to hospitals and clinics."],
["He and colleagues pooled 3,000 yuan, roughly a few hundred dollars. Rent","He and colleagues pooled 3,000 yuan. Rent"],
// China Pages
["Ma, his wife and one friend, in Hangzhou, in April 1995. He had never","Ma and a few others, in Hangzhou, in April 1995. He had never"],
// Yahoo China
["Ma wanted the cash above all, and Yahoo China came along with it. Taking it also meant running a large foreign-branded web portal, which was nothing like his core business.","The deal was a package, so taking Yahoo's cash meant taking the portal too. Running a large foreign-branded web portal was nothing like his core business."],
// Tmall
["Launched in April 2008. It was struggling","Launched in 2008. It was struggling"],
// Cloud
["The first internal customer was Alibaba's small-loans team","An early internal customer was Alibaba's small-loans team"],
// YunOS
["\"years\": \"2011 to about 2017\"","\"years\": \"From 2011\""],
// Yunfeng
["a detail that shows he did not want it seen as a personal payday.","a detail worth noticing."],
// DingTalk
["and that backlash made news. Today it is part of Alibaba's AI and cloud group.","and that backlash made news. Alibaba's 2026 results describe its new AI workplace agent as deeply tied into DingTalk."],
// Cainiao
["A shared data network tying together China's delivery companies, instead of Alibaba owning all the vans and warehouses. It solved parcel delays that were capping online shopping.","A shared data network tying together China's delivery companies, launched with partner firms, aimed at the delivery bottleneck in online shopping."],
["Alibaba chose to coordinate others rather than copy the rival model of owning every truck. The 2023 plan","Alibaba chose to link up existing delivery firms rather than own every van. The 2023 plan"],
// Pictures
["It later went on to lose money for years. By 2018 Variety was calling","It was still being described as loss-making in 2018, when Variety called"],
["its big fantasy film Asura the most expensive flop in Chinese history. Alibaba added","its big fantasy film Asura the most expensive flop in Chinese history. Alibaba added"],
// Evergrande
["the deal was widely mocked as a vanity purchase.","the deal was heavily criticised as a vanity purchase."],
["\"src\": [109, 111, 110]","\"src\": [109, 111, 110, 149]"],
// Spree
["After 2013 Alibaba feared missing the move to phones, and Joe Tsai drove a wave of more than $3.8 billion of deals.","Phones were changing how people shopped, and by 2014 Joe Tsai had driven more than $3.8 billion of deals across mapping, education and more."],
["Youku began with $1.1 billion for 16.5% in 2014.","Youku began with a 16.5% stake."],
["The results are mixed. These deals gave Alibaba reach in phones, video and delivery, but several stayed expensive. Alibaba later rolled food delivery into an intense fight with rival Meituan and is still spending heavily there.","The results are mixed. These deals gave Alibaba reach in phones, video and delivery, but they cost a great deal. Its 2026 results still name quick-delivery spending as a main reason profit fell."],
["\"src\": [111, 139, 118, 119, 133]","\"src\": [111, 146, 150, 109, 118, 119, 133]"],
// Physical retail
["\"years\": \"2014 to 2025\",\n          \"outcome\": \"sold\"","\"years\": \"2017 to 2025\",\n          \"outcome\": \"sold\""],
["New Retail: mix online data with real department stores and giant supermarkets, on the theory that the future was neither purely online nor purely offline.","Mix online data with real department stores and giant supermarkets. Alibaba called this push New Retail."],
["It reversed course under new management. In December","It reversed course as it refocused on its core business. In December"],
["Days later it sold its Sun Art stake","About two weeks later it agreed to sell its Sun Art stake"],
// MoneyGram
["It was the fast route to worldwide reach, and Ma had already been courting American politicians. But it put a Chinese company next to Americans' financial data at a tense moment.","It was the fast route to worldwide reach, and Ma had already met Donald Trump in 2017 to pitch his plans for America. But American scrutiny of Chinese investment was rising."],
["\"funding\": \"Ant's own funds.\"","\"funding\": \"Ant offered $1.2 billion. The deal never closed, so the money was not paid to shareholders.\""],
["\"src\": [89]","\"src\": [89, 126]"],
// Hupan
["\"funding\": \"Founders' backing, plus tuition","\"funding\": \"Backing from Alibaba and its founders, according to Caixin-style reports, plus tuition"],
["\"src\": [102, 103, 104]","\"src\": [102, 103, 104, 151]"],
// Trusts
["Part of the giving now runs through the Jack Ma Foundation, which also handles media questions about him. Philanthropy is one reason his Alibaba stake reads lower today in some counts.","Ma's giving now runs partly through the Jack Ma Foundation, which also handles media questions about him. When he retired from Alibaba, philanthropy and education were his stated focus."],
["\"src\": [88, 12, 68, 127]","\"src\": [88, 12, 68, 127, 152, 153]"],
// Farming
["\"name\": \"Ma's Kitchen, fish farms and a Bordeaux chateau\"","\"name\": \"Ma's Kitchen, sea farming and a Bordeaux chateau\""],
["A sea-farming company in Hainan followed in 2020.","A marine-themed investment company in Hainan followed in 2020."],
["The Hainan firm had 200 million yuan of registered capital.","The Hainan firm had 200 million yuan of registered capital, under a parent in which he holds 50%."],
// Near death
["Many first-time founders start with vague promises to friends, as Ma had in Beijing. This time there would","Ma had just been burned in Beijing by a stake that was promised but never pinned down. This time there would"],
["Tsai handled the paperwork and later spent 14 years as chief financial officer, negotiating with the likes of Yahoo and SoftBank.","Tsai handled the paperwork and served as chief financial officer until 2013, negotiating with investors like Yahoo and SoftBank."],
["\"src\": [17, 139] }","\"src\": [17, 15, 146] }"],
["Kwan soon sat down with Ma, Tsai and technology chief John Wu and agreed","Kwan soon sat down with Ma and Tsai and agreed"],
["because a slower process would have cost another month's burn and much more misery. As he put it, no death by a thousand cuts.","because a slower process would have cost another month's burn and much more misery. One deep cut, he believed, beats many small ones."],
["Ma has said that by the end of 2002 the company made one dollar in profit, a low number he was very proud of.","Ma has said that by the end of 2002 the company made one dollar in profit."],
["        { \"t\": \"p\", \"text\": \"One more point is worth noticing. In these years other Chinese internet companies were listed and suffered as their stock crashed. Alibaba was private, so it could fail in silence, fix itself and try again without daily headlines about its share price. Being unable to go public in 2000 felt like bad luck. It turned out to be a gift.\", \"src\": [1, 18] },\n",""],
// Crocodile
["the country's largest online auction site, founded by a Harvard graduate. In June 2003 it bought the rest. Its CEO Meg Whitman told the Wall Street Journal the competition amounted to small rivals nipping at its heels. She announced China as a top priority, and she had far more money than anyone else in the country.","China's largest e-commerce company, founded by a Harvard graduate. In June 2003 it bought the rest. Its CEO Meg Whitman told the Wall Street Journal the competition amounted to small rivals nipping at its heels. eBay named China its second priority market after the United States, and it had far more money than Alibaba."],
["\"src\": [5, 28, 21] }","\"src\": [5, 147, 28, 27] }"],
["In 2003 a small team was sworn to secrecy and sent to work in Ma's old apartment, just as SARS","In 2003 a small team worked in secret in Ma's old apartment, just as SARS"],
["but he was a crocodile in the Yangtze. Lose in deep water, win in the river you know.","but he was a crocodile in the Yangtze. The point was to fight in home water."],
["\"src\": [27, 26, 24] }","\"src\": [27, 26, 24, 148] }"],
["They went around the block, turning to smaller websites and online forums. eBay had the large stage. Taobao went to where small sellers were already talking to each other.\", \"src\": [28] }","They went around the block by advertising on a large number of online bulletin boards. eBay had the large stage. Taobao went where internet users were already talking to each other.\", \"src\": [28, 148] }"],
["That one step removed your biggest fear.\", \"src\": [22, 23] }","That one step removed your biggest fear.\", \"src\": [22, 23, 148] }"],
["Taobao's chat tool let buyers haggle directly with sellers, as they would in a market.\", \"src\": [27, 123] }","Taobao also had its own messaging tool, later merged under the name Ali Wangwang.\", \"src\": [27, 148, 123] }"],
["By the following year eBay was spending heavily on ads but had no answer for free.","eBay drained its advertising budget but never found an answer to free."],
// Big bets
["At the time it was the largest such deal in Chinese internet history, and the prospectus shows how much control changed hands.\"","That is a huge sum for a company that had made its first dollar of profit less than three years before.\""],
["It was the most popular IPO in Hong Kong's history among retail investors.","The sale drew record demand from Hong Kong's retail investors."],
["People who bought on the excited first day lost most of their money.","People who bought at the first day's close lost about two-thirds of their money."],
["Wei's exit surprised the market: he had helped take the company public and was widely respected. __Ma","__Ma"],
["Yahoo said it was not told in time, and the row went public.","Yahoo said this happened without its knowledge, and the row went public."],
["{ \"t\": \"note\", \"text\": \"Both sides still call this justified. Decide for yourself.\" }","{ \"t\": \"note\", \"text\": \"A founder moved a key asset. Was it right? You decide.\" }"],
["That broke the local rule of equal votes for equal shares. Alibaba took","Hong Kong's regulators would not accept giving partners that power regardless of shareholding. Alibaba took"],
// Fall
["Alibaba hit back and accused a named official of bias, which AP called almost unheard of in China. The share price fell sharply and the two sides patched things up.","Alibaba hit back and accused a named official of bias, which AP called almost unheard of in China. The dispute rattled investors and the share price tumbled."],
["Ten days before Donald Trump's inauguration, in January 2017, Ma visited","Days before Donald Trump's inauguration, in January 2017, Ma visited"],
["He had already handed the CEO title to Jonathan Lu in 2013, and Daniel Zhang","He had already given up the CEO title in 2013, and Daniel Zhang"],
["in a second listing in Hong Kong, the city that had turned it down in 2014.","in a second listing in Hong Kong, the city that had turned down its structure before the 2014 IPO."],
["and he was China's richest man.\", \"src\": [49, 50, 58, 66] }","and he was China's richest person.\", \"src\": [49, 50, 58, 66, 95] }"],
["saying the regulatory environment had changed and that Ant might no longer meet the conditions. Hong Kong followed.","citing changes in the regulatory environment. Hong Kong followed."],
["Regulators found Alibaba had pressed merchants not to sell on rival platforms.","Regulators found Alibaba had abused its dominant position over rivals and merchants, and exclusivity was at the heart of the debate."],
["\"src\": [51, 63, 55, 56, 104, 65] }","\"src\": [51, 63, 55, 56, 104, 65, 154] }"],
["But a founder who once joked about going to jail for Alipay had grown used to being the one person who could argue his way past regulators. In 2020, that changed in a single week.","But Ma had built Alipay by moving ahead of the rules, once telling staff he would go to jail for it if he had to, and for years he was allowed to. In 2020 that stopped within a single week."],
["and one day it briefly passed Alibaba's. Market value","and one day it briefly passed Alibaba's. Market value"],
["\"src\": [132, 131] }","\"src\": [132, 131, 155] }"],
["An employee posted on Alibaba's internal forum that he could not sleep.","An employee posted on Alibaba's internal forum about being unable to sleep over the news."],
["\"src\": [131, 132] }","\"src\": [131, 132, 156] }"],
["The stock dropped, and the plan was reportedly put on hold, with Ma's stated purpose being to fund his farming ventures.","The stock dropped, and the plan, reportedly meant to fund his new initiatives, was held off."],
["Bloomberg's breakdown is the most surprising part of the book.","Bloomberg's breakdown holds one of the biggest surprises in this book."],
["is simply estimated cash from decades of dividends and share sales.__","is simply estimated cash from dividends and share sales.__"],
["is 35% to 60% smaller than it was six years ago, even though Alibaba's revenue has grown a great deal since. His direct","is 35% to 60% smaller than it was six years ago. His direct"],
// Alipay never listed
["It has still never listed.","As far as we could find, it had still not listed by late 2026."],
// New sources
["{ \"label\": \"China.com, Alibaba nearly died too (2016)\", \"url\": \"http://tech.china.com/news/11146418/20160716/23069716_all.html\" }",
"{ \"label\": \"China.com, Alibaba nearly died too (2016)\", \"url\": \"http://tech.china.com/news/11146418/20160716/23069716_all.html\" },\n    { \"label\": \"Reuters, Alibaba's IPO architect lays out blueprint (2014)\", \"url\": \"https://www.reuters.com/article/world/alibabas-ipo-architect-lays-out-blueprint-for-e-commerce-empire-idUSBREA3124E/\" },\n    { \"label\": \"Forbes, Helen H. Wang, Alibaba Saga II (2014)\", \"url\": \"https://www.forbes.com/sites/helenwang/2014/07/02/alibaba-saga-ii-whitman-met-her-match/\" },\n    { \"label\": \"Harvard Business School Digital Initiative, student case on Taobao (2017)\", \"url\": \"https://aiinstitute.hbs.edu/platform-digit/submission/digital-winner-in-chinas-online-c2c-marketplace-taobao-com/\" },\n    { \"label\": \"Quartz, Alibaba bets on Chinese soccer (2014)\", \"url\": \"https://qz.com/217123/alibaba-bets-that-chinese-soccer-will-emerge-from-its-malaise-of-corrupt-mediocrity\" },\n    { \"label\": \"Alibaba Group, Completes Full Acquisition of UCWeb (2014)\", \"url\": \"https://www.alibabagroup.com/en-US/document-1489318545857708032\" },\n    { \"label\": \"Asia Times, Puzzle as Jack Ma's elite uni stripped of status (2021)\", \"url\": \"https://asiatimes.com/2021/05/puzzle-as-jack-mas-elite-uni-stripped-of-status/\" },\n    { \"label\": \"China Daily / Xinhua, Alibaba founders set up charity fund (2014)\", \"url\": \"https://www.chinadaily.com.cn/business/tech/2014-04/25/content_17465748.htm\" },\n    { \"label\": \"Fortune, Alibaba's top brass can't lose (2014)\", \"url\": \"https://fortune.com/2014/09/17/alibaba-stock-options-ipo/\" },\n    { \"label\": \"Straits Times / Bloomberg, What does Jack Ma giving up control of Ant mean (2023)\", \"url\": \"https://www.straitstimes.com/business/what-does-jack-ma-giving-up-control-of-ant-mean-for-its-ipo-reboot\" },\n    { \"label\": \"Nikkei Asia, Alibaba feels the heat as PDD catches up (2023)\", \"url\": \"https://asia.nikkei.com/business/technology/alibaba-feels-the-heat-as-pdd-catches-up-in-u.s.-market-cap\" },\n    { \"label\": \"Momentum Works, Jack Ma congratulates PDD, translated posts (2023)\", \"url\": \"https://thelowdown.momentum.asia/jack-ma-congratulates-pdd-and-rallies-alibaba-employees-to-change/\" }"],
];
let bad = 0;
for (const [a, b] of R) {
  const n = s.split(a).length - 1;
  if (n !== 1) { console.log("MATCH x" + n + ": " + a.slice(0, 90)); bad++; continue; }
  s = s.replace(a, () => b);
}
fs.writeFileSync(file, s, "utf8");
console.log("edits", R.length, "failed", bad);
