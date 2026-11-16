import fs from 'node:fs';
const F='../../../src/content/billionaires/books/jensen-huang.json';
const b=JSON.parse(fs.readFileSync(F,'utf8'));
const ch=b.chapters;
const rep=(ci,bi,old,nw,field='text')=>{const x=ch[ci].blocks[bi];if(typeof x[field]!=='string'||!x[field].includes(old))throw new Error(`miss CH${ci}.${bi} ${field}: ${old}`);x[field]=x[field].replace(old,nw)};
const setSrc=(ci,bi,s)=>{ch[ci].blocks[bi].src=s};
const addSrc=(ci,bi,...s)=>{const x=ch[ci].blocks[bi];x.src=[...new Set([...x.src,...s])]};
// ---- sources
const S=b.sources;
const add=(label,url)=>{S.push({label,url});return S.length-1};
const PCGN=add('PCGamesN, Ben Hardwidge, “The GPU Nvidia would rather forget: GeForce FX” (29 Mar 2024)','https://www.pcgamesn.com/nvidia/geforce-fx');
const CBASE=add('ComputerBase, retrospective on the GeForce FX 5800 Ultra (Apr 2018, in German)','https://www.computerbase.de/2018-04/nvidia-geforce-fx-5800-test-rueckblick/');
const TT=add('Taipei Times, “Nvidia set to gobble up ULi” (15 Dec 2005)','https://www.taipeitimes.com/News/biz/archives/2005/12/15/2003284543');
const STAR=add("Reuters via The Star, “DOJ probes Nvidia's licensing deal with AI startup Groq, NYT reports” (10 Sep 2026)",'https://www.thestar.com.my/tech/tech-news/2026/09/10/us-doj-probes-nvidia039s-licensing-deal-with-ai-startup-groq-nyt-reports');
const ST=add('Stocktwits, “Nvidia brushes off circular financing fears after massive sales beat” (Aug 2026)','https://stocktwits.com/news-articles/markets/equity/nvidia-brushes-off-circular-financing-fears-after-massive-sales-beat-we-see-it-differently/cZY8N3lRJpQ');
const NDTV=add("NDTV Profit, “Jensen Huang's net worth crosses $200 billion” (3 Oct 2026)",'https://www.ndtvprofit.com/world/jensen-huang-s-net-worth-crosses-200-billion-becomes-world-s-7th-richest-person-12132360');
S[0].label='Forbes: Jensen Huang profile (real-time net worth, read 3 Nov 2026)';
S[8].label="Fortune: How Nvidia's billionaire CEO went from Denny's dishwasher to leading Nvidia (2024, updated 5 Aug 2025)";
S[77]={label:'Lex Fridman Podcast #494, Jensen Huang, official transcript (Mar 2026)',url:'https://lexfridman.com/jensen-huang-transcript/'};
S[235]={label:'U.S. Court of Appeals for the Ninth Circuit, In re NVIDIA GPU Litigation, No. 11-15186, memorandum (4 Sep 2013)',url:'https://cdn.ca9.uscourts.gov/datastore/memoranda/2013/09/04/11-15186.pdf'};
// global src swaps
const swap={50:38,262:179,123:ST,169:PCGN,170:TT,148:229,149:229};
const drop=new Set([172,176,265]);
const walk=v=>{if(Array.isArray(v))v.forEach(walk);else if(v&&typeof v==='object'){for(const[k,x]of Object.entries(v)){if(k==='src'||k==='hookSrc'){v[k]=[...new Set(x.map(i=>swap[i]??i).filter(i=>!drop.has(i)))]}else walk(x)}}};
walk(b);
// ---- hook & glance
if(!b.hook.includes('In the mid-1970s, a ==nine-year-old=='))throw new Error('hook');
b.hook=b.hook.replace('In the mid-1970s, a ==nine-year-old==','In about 1973, a ==nine-year-old==');
b.hookSrc=[...new Set([...b.hookSrc,21])];
const gl=l=>b.glance.find(g=>g.label===l);
gl('Born').value='1963, Taiwan: Taipei according to Nvidia, Tainan in several other profiles';gl('Born').src=[24,4,213];
gl('Source of wealth').value="About 4% of Nvidia, by Forbes's count. Forbes real-time net worth $176.3 billion, No. 7 in the world (as of 2 Nov 2026)";
// socials
b.contact.socials[0].src=[20,33];
// ---- CH0
addSrc(0,0,150);ch[0].blocks[28].items[0].src=[24,8,150];
addSrc(0,1,23);
rep(0,6,'There was a problem. Nobody in the house spoke English, including his mother, who was a schoolteacher. So she invented her own course.','There was a problem. At the time, Huang recalled, his mother did not understand any English at all. So she invented her own course.');
setSrc(0,6,[23]);
ch[0].blocks[28].items[3].when='Late 1960s–early 1970s';
// ---- CH1
rep(1,11,'__He still remembers one lost match because he lost his focus, not his skill.__','__Decades later he could not recall his results, only that he had lost his focus.__');
rep(1,19,'CNBC, citing a 2010 New York Times interview, reported','CNBC, citing a New York Times interview, reported');
// ---- CH2
rep(2,0,'He was 16. He looked even younger than he was',"He was 16, by his own account and Oregon State's. He looked even younger than he was");
// ---- CH3
rep(3,6,'The company began with about $40,000 in the bank.','Fortune and CNBC report that the three founders began with about $40,000 between them.','funding');addSrc(3,6,23);
rep(3,18,"Nvidia's own chip teams built it, and the first cards reached the market around the end of 2002.","Nvidia's own chip teams built it. It was unveiled in November 2002, and the cards reached buyers about five months later.",'howStarted');addSrc(3,18,CBASE,48);
rep(3,24,'Both products carried on as small side lines.',"GeForce NOW is still listed as a gaming product in Nvidia's latest annual report, but we found no sign that either became a big business.",'whatHappened');addSrc(3,24,12);
rep(3,27,'Around 2013, he sent a Friday-night email','He then sent a Friday-night email','decision');
// ---- CH4
rep(4,4,'That is the “$20 million of venture capital” in most accounts of Nvidia.','That is the $20 million of venture capital you see in most accounts of Nvidia.');
rep(4,10,'Priem wanted to stay on the NV2 path. Huang wanted customers to stop returning the product.',"Priem wanted to press on with his NV2 design. Huang's worry was simpler: shops were sending the product back.");
// ---- CH5
rep(5,16,'The $196 million estimate',"Nvidia's $196 million estimate");addSrc(5,16,71);
// ---- CH6
{const x=ch[6].blocks[3];const t=x.text;const cut=t.indexOf('Separately, investors sued');if(cut<0)throw new Error('cut');const a=t.slice(0,cut).trim(),c=t.slice(cut).trim();x.text=a;x.src=[99,230];ch[6].blocks.splice(4,0,{t:'p',text:c,src:[100,101,103,231,232]});}
// after the splice, CH6 indexes from old 4 on shift by +1
const c6=(old)=>old+1;
rep(6,c6(17),'AMD stayed in the fight, and by late September 2026 one tracker valued it at close to $1 trillion. But the newer threat','AMD stayed in the fight. But the newer threat');addSrc(6,c6(17),24);
rep(6,c6(19),'leading to an expected $5.5 billion charge.','leading Nvidia to warn of a $5.5 billion charge, which came in at $4.5 billion.');addSrc(6,c6(19),248,269);
rep(6,c6(22),'Nvidia told investors in August 2026 that it had invested nearly $50 billion in frontier AI labs.','Nvidia told investors in August 2026 that it had invested or committed nearly $50 billion in frontier AI labs.');
addSrc(6,c6(24),ST);
rep(6,c6(26),'and $177.5 billion on 1 November.','and $176.3 billion on 2 November.');addSrc(6,c6(26),NDTV);
ch[6].blocks.splice(c6(23)+1,0,{t:'note',text:'A guarantee is not a sale. Read the fine print.'});
// ---- CH7
rep(7,0,'Forbes valued him at ==$177.5 billion== as of 1 November 2026','Forbes valued him at ==$176.3 billion== as of 2 November 2026');
ch[7].blocks[1].items[0]={value:'$176.3B',label:'Forbes real-time net worth, No. 7 (2 Nov 2026)',src:[0]};
ch[7].blocks[1].items[1].label='Bloomberg estimate, No. 8 (23 Oct 2026, via DaveManuel.com)';
{const x=ch[7].blocks[12];if(!x.text.includes('$35.5 million'))throw new Error('pay');x.text="Huang's salary is almost irrelevant. In fiscal 2026, his total pay was ==$36.3 million==: about $1.5 million in salary, $6 million in cash bonus, $24.8 million in stock awards and about $4 million in other benefits. At 2026 share prices, one normal trading day can move his wealth by more than that. His job is paid mainly in the price of the thing he built.";x.src=[229,228,0];}
addSrc(7,8,150);
// ---- CH8
rep(8,18,"“If you send it, I'll read it,” he says. ",'');addSrc(8,18,185);
rep(8,21,"Don't send it late on a Friday evening, one former employee told Kim. “It would wreck your weekend.” Most people",'One former employee told Kim not to send one late on a Friday evening, because the reply could eat your weekend. Most people');
rep(8,25,'A project leader can suddenly find themselves reporting directly to Huang as a “pilot in charge”.','Project leaders can suddenly find themselves reporting directly to Huang, and they are dubbed “pilots in charge”.');
// ---- CH9
ch[9].title='Eight Beliefs, All Uncomfortable';
rep(9,20,'Deciding what to give up, he said, is at the very core of success.','He called it a hard decision, and a market sacrificed on purpose.');
if(ch[9].blocks[21].t!=='quote')throw new Error('ch9 quote');ch[9].blocks.splice(21,1);
// ---- CH10
rep(10,17,'In 2019 he gave a building to the Kentucky school where he once cleaned the bathrooms.',"In 2019 the Kentucky school where he once cleaned the bathrooms opened a building named after him, helped by the couple's $2 million matching grant.");addSrc(10,17,1);
rep(10,12,'His 2026 pay package was $36.3 million','His pay for fiscal 2026 was $36.3 million');
// ---- CH11
rep(11,1,"On The Times's tech podcast, in an episode built around an interview with Witt, the public Jensen is called an act, a carefully cultivated persona. Both can be true. ",'Yet thousands of people have watched him work that stage like a showman. ');addSrc(11,1,10);
rep(11,16,"China is more complicated. He went there three times in 2025 in what Reuters called a charm offensive, and said about half the world's AI researchers are Chinese, while his company was squeezed by both governments.","China is more complicated. He has noted that about half the world's AI researchers are in China, while his company has been squeezed by both governments.");
ch[11].blocks[16].src=ch[11].blocks[16].src.filter(i=>i!==250);
// ---- CH12
addSrc(12,8,82);
addSrc(12,28,STAR);
// ---- insert notes, highest index first
ch[5].blocks.splice(27,0,{t:'note',text:'The activist wanted buybacks, not CUDA cuts. Luck counts too.'});
ch[5].blocks.splice(24,0,{t:'note',text:'Intel ended up paying $1.5 billion to its own rival.'});
ch[5].blocks.splice(21,0,{t:'note',text:'Pizza first. Business only at eight. Then a 48-hour offer.'});
ch[4].blocks.splice(30,0,{t:'note',text:'His biggest customer was joining a rival. He printed that in the prospectus.'});
// ---- lessons
const le=t=>{const l=b.lessons.find(l=>l.title===t);if(!l)throw new Error('lesson '+t);return l};
le('Stay a little afraid.').text="For years Huang opened staff presentations by saying Nvidia was 30 days from going out of business, and he says the feeling has never left him. Fear keeps you looking around corners when success tells you to relax. Just don't let it run your whole life, because he admits it is exhausting.";
le('Build where nobody is standing.').text='He put CUDA into every chip while shareholders complained and, as he tells it, the market cap hovered just above a billion dollars. Years later, researchers came and the AI boom ran on it. If a market already has a size on a slide, you are probably late.';
le('Be honest with investors about your risky revenue.').text="The SEC found Nvidia had not disclosed how much crypto drove its gaming growth, which cost a $5.5 million penalty. Investors also sued, quoting Huang's line “Crypto is small for us”, in a case that ran for nearly eight years and reached the Supreme Court. Nvidia never admitted wrongdoing, but the distraction was enormous. When a hot, shaky revenue source shows up, say so loudly and early.";
// ---- disputed
let D=b.factCheck.disputed;
const rm=c=>{const n=D.length;D=D.filter(d=>d.claim!==c);if(D.length===n)throw new Error('no disputed '+c)};
rm('Birthplace: Taipei or Tainan');rm('Size of the Groq deal');rm("Huang's stake in Nvidia");
const dd=c=>{const x=D.find(d=>d.claim===c);if(!x)throw new Error('no '+c);return x};
dd("Huang's birthplace").note='Nvidia, via CNN, says Taipei, with a later move to Tainan. The Computer History Museum, Reuters (2025) and Britannica (seen only as a search excerpt, since the page blocked us) say Tainan. We follow Nvidia in the chapters and show both in the glance.';
dd("Huang's exact birth date").note="17 February 1963 appears on DaveManuel.com and in Britannica's search excerpt, and Nvidia's Feb 2026 10-K lists him as 63, which fits. We could not read a primary record giving the day.";
dd("Huang's age at Oneida Baptist Institute").note="The school's own page says he was nine, in the mid-1970s. Huang told NPR he left after unrest in 1973, and NPR gives his age as nine, though a February 1963 birthday would make him ten for most of that year. Carnegie says he went to an uncle at nine and enrolled at Oneida at ten. We say nine and “about 1973”.";
dd("Nvidia's starting capital").note="CNBC (2018) and Fortune (2024) say about $40,000 between the founders. Secondary accounts based on Tae Kim's book describe each founder putting in about $200. We could not verify either in a primary source, so the $40,000 is attributed; the SEC-documented money is the 1993 Series A of 4,303,000 shares at $0.50.";
dd("Huang's current share count").note='Proxy (23 Mar 2026): 870.6 million, or 3.58%, including 58.7 million foundation shares in which he has no pecuniary interest. Form 4 (18 Sep 2026), as reconciled by DaveManuel.com because SEC.gov refused our direct read: about 811.5 million, of which about 140 million are in irrevocable family trusts. Forbes says about 4% and Bloomberg about 3.3%. All are shown with labels.';
dd('Size of the Groq licensing deal').note="CNBC reports $20 billion from Disruptive's CEO, Bloomberg says $20 billion, and Reuters, citing the NYT, says $17 billion. Nvidia and Groq did not confirm a price and call it a non-exclusive licence with hires. The DOJ inquiry is reported, and neither Nvidia nor the DOJ has confirmed its scope.";
D.push({claim:'His age when he started at Oregon State',note:'Oregon State, Fortune and Huang himself say he started at 16, and Carnegie and Business Insider say he finished high school at 16. With a February 1963 birthday he would have been 17 by autumn 1980. We attribute the 16.'});
D.push({claim:'Net worth on the day of checking',note:"Forbes's real-time figure moves all day: $186.6 billion on 29 Oct 2026, $177.5 billion after the 30 Oct close and $176.3 billion dated 2 Nov (another snapshot dated the same day showed $180.6 billion). Bloomberg had $172 billion on 23 Oct. We show the Forbes figure we read last."});
D.push({claim:'How much Nvidia has put into AI labs',note:"CFO Colette Kress's August 2026 “nearly $50 billion” was reported as “invested or committed” by Stocktwits. We could not open the call transcript itself, so we use the wider wording."});
b.factCheck.disputed=D;
b.factCheck.method="Four parallel research writers drafted this book from SEC filings, court records, Huang's own transcripts and established press, and a separate fact-checker re-checked it on 3 November 2026 by downloading the roughly 210 cited pages that allow it, machine-checking every quotation and number against them, and reading the riskiest claims by hand, which led to corrections including a wrong pay figure. Reuters, Bloomberg, WSJ, NYT, some Forbes pages, The Atlantic, Quartz, Benzinga and others block automated reading, so those claims were checked through search excerpts or syndicated copies where possible, and items the checker could not reach, such as The Atlantic's review and Bloomberg's fried-chicken report, rest on the writers' earlier reading. SEC.gov refused our read of Huang's September 2026 Form 4, so that share breakdown relies on DaveManuel.com's reconciliation of the filing, and the checker's search allowance ran out before every narrative detail could be independently re-read. Photos were confirmed through the Wikimedia Commons API, and contact channels on Nvidia's own pages.";
fs.writeFileSync(F,JSON.stringify(b,null,2)+'\n');
console.log('ok',b.sources.length);
