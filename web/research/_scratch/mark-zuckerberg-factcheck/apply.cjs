const fs=require('fs');const F='../../../src/content/billionaires/books/mark-zuckerberg.json';
const b=JSON.parse(fs.readFileSync(F,'utf8'));const B=(c,i)=>b.chapters[c].blocks[i];
let n=0;
function rep(c,i,field,oldS,newS){const x=B(c,i);if(typeof x[field]!=='string'||!x[field].includes(oldS))throw new Error(`miss ${c}.${i}.${field}: ${oldS}`);x[field]=x[field].replace(oldS,newS);n++}
function vrep(x,field,oldS,newS){if(!x[field].includes(oldS))throw new Error(`miss venture ${x.name}.${field}: ${oldS}`);x[field]=x[field].replace(oldS,newS);n++}
const src=(c,i,arr)=>{B(c,i).src=arr};
// sources
const S=b.sources;
const add=(label,url)=>{S.push({label,url});return S.length-1};
S[9].label='Forbes, Mark Zuckerberg profile and real-time net worth (read 2-3 November 2026)';
S[82].label='StockAnalysis, Meta Platforms (META) price history (read 3 November 2026)';
S[59]={label:'US Court of Appeals, Ninth Circuit, Lane v. Facebook (Beacon settlement opinion), 20 Sept 2012',url:'https://law.justia.com/cases/federal/appellate-courts/ca9/10-16380/10-16380-2012-09-20.html'};
S[61]={label:'Silvergate Capital press release filed with the SEC, purchase of Diem assets, 31 Jan 2022',url:'https://www.sec.gov/Archives/edgar/data/1312109/000131210922000021/ex991assetpurchasepr1-31x22.htm'};
S[149]={label:"NPR, Aarti Shahani, 'Zuckerberg Denies Fake News On Facebook Had Impact On The Election', 11 Nov 2016",url:'https://www.npr.org/sections/alltechconsidered/2016/11/11/501743684/zuckerberg-denies-fake-news-on-facebook-had-impact-on-the-election'};
const Q3=add('Meta press release, Third Quarter 2026 Results, 21 Oct 2026 (contacts and official disclosure channels)','https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Third-Quarter-2026-Results/default.aspx');
const BEACON=add("Facebook Newsroom, Mark Zuckerberg, 'Announcement: Facebook Users Can Now Opt Out of Beacon Feature', Dec 2007",'https://about.fb.com/news/2007/12/announcement-facebook-users-can-now-opt-out-of-beacon-feature/');
const NYTHOME=add("The New York Times, Mike Isaac, 'What Happened to the Facebook Phone? Not Very Much, It Seems', 27 June 2014",'https://archive.nytimes.com/bits.blogs.nytimes.com/2014/06/27/what-happened-to-the-facebook-phone-not-very-much-it-seems/');
const TNWHOME=add("The Next Web, 'Facebook Home is quiet, but not quite dead', 27 June 2014",'https://thenextweb.com/news/facebook-home-quiet-quite-dead');
const GIPHY=add("CNBC, 'Meta sells Giphy to Shutterstock at a loss in a $53 million deal', 23 May 2023",'https://www.cnbc.com/2023/05/23/meta-sells-giphy-to-shutterstock-at-a-loss-in-a-53-million-deal.html');
const HAUGEN=add("Associated Press, 'Ex-Facebook manager criticizes company, urges more oversight', 5 Oct 2021",'https://apnews.com/article/facebook-haugen-congress-testimony-1daac7a76ca7bf0b0802cc46e732b51b');
const TOI=add("The Times of India, Mark Zuckerberg, 'Free Basics protects net neutrality', 28 Dec 2015",'https://timesofindia.indiatimes.com/blogs/toi-edit-page/free-basics-protects-net-neutrality/');
const BIGM=add("Business Insider, 'How Mark Zuckerberg Told Priscilla Chan's Family They Were Engaged', 14 Nov 2014",'https://www.businessinsider.com/how-mark-zuckerberg-told-priscilla-chans-family-they-were-engaged-2014-11');
const NYTM=add("The New York Times, 'Mark Zuckerberg, Speaking Mandarin, Tries to Win Over China for Facebook', 23 Oct 2014",'https://archive.nytimes.com/bits.blogs.nytimes.com/2014/10/23/zuckerberg-speaking-chinese-shows-up-at-beijing-forum/');
const BIOHUB=add("Biohub, 'Launching the first large-scale scientific initiative combining frontier AI with frontier biology', 6 Nov 2025",'https://biohub.org/blog/frontier-ai-biology-initiative/');
const CNN=add("CNN Business, 'Mark Zuckerberg is reportedly recruiting a team to build a superintelligence', 10 June 2025",'https://www.cnn.com/2025/06/10/tech/mark-zuckerberg-meta-superintelligence');
const HILL=add("The Hill, 'Zuckerberg says he learned of Definers through NYT story', 15 Nov 2018",'https://thehill.com/policy/technology/416974-zuckerberg-i-have-tremendous-respect-for-george-soros');
const FINKD=add("Business Insider, 'Mark Zuckerberg posted a Spiderman meme in his first tweet in a decade', 6 July 2023",'https://www.businessinsider.com/mark-zuckerberg-posts-spiderman-meme-first-tweet-in-a-decade-2023-7');

// CHAPTER 0
rep(0,13,'text','so the children had only half an hour online before office hours ended at 5 p.m.',"so the rule was half an hour per person, and the children's turn did not start until the office closed at 5 p.m.");
B(0,10).photo.caption='An Atari 800, the kind of early home computer Edward Zuckerberg says he owned. His came with a programming disk.';
rep(0,18,'text','and the hygienist could ping that a room was ready','and the hygienist could say she would be ready for an exam in five minutes');
B(0,27).text='It also mattered that his parents put so much into their children\'s schooling. "My parents worked really hard to make sure me and my sisters could go to good schools," he has said.';
rep(0,21,'text','What he was like at 5 and at 10','What he was like as a boy');
B(0,29).items[4].text='Edward starts computerizing his dental office.';
// CHAPTER 1
src(1,19,[11,10]);
rep(1,21,'text','In April 2003 the tech news site Slashdot posted about the project under the headline "Machine Learning and MP3s." Big companies noticed.','In April 2003, when Mark was already a freshman at Harvard, the tech news site Slashdot posted about the project under the headline "Machine Learning and MP3s." Big companies noticed.');
src(1,21,[35,24,11,10]);
B(1,23).text='His first account, in 2003, was simple. One company offered $950,000 if the pair would work for it for three years. "We wanted to go to college, so we said no," he told the Crimson. TIME later described it the same way: he would have had to drop out of school to develop the program, and he chose Harvard.';
src(1,23,[10,24]);
{const tl=B(1,33).items;const i=tl.findIndex(x=>x.when==='2002');if(i<0)throw 'tl2002';tl[i]={when:'Sept 2002',text:'Synapse goes online as a free download; Mark starts at Harvard.',src:[10,29]};
 const j=tl.findIndex(x=>x.when==='Apr 2003');if(j<0)throw 'tl2003';tl[j]={when:'Apr 2003',text:'Slashdot features Synapse. Offers arrive, and the pair say no.',src:[35,10]};
 tl.push({when:'Later',text:'The pair decide to sell, but the buyer has lost interest.',src:[11]});
 tl[tl.findIndex(x=>x.when==='2001–02')].src=[11,10];}
// CHAPTER 2
rep(2,28,'text','enough to keep the servers running for about two months','enough, they reckoned, to keep the site live for at least two months');
src(2,26,[37,86]);
rep(2,31,'text',"That night he went to Noch's, a spot near campus, with his friend KX Jin.","That night he went to Noch's with his friend KX.");
rep(2,32,'text',"He was 19, eating pizza, and didn't think he'd be the one.","He was 19, out with a friend, and didn't think he'd be the one.");
rep(2,43,'text','And he was honest, years later, about the safety net that made the risk possible.','Years later he was honest about the safety net that made the risk possible, as you will read in the chapter on his beliefs.');
// CHAPTER 3
{const x=B(3,3);x.years='2002–2003 (built in high school)';x.funding='No outside money at all. It was built with their own time and released free. The two did split the $12,000 cost of a patent, sure that future profits would cover it.';
 vrep(x,'whatHappened','Mark later recalled offers of up to about $1 million, then one of about $2 million.','In 2003 Mark said one company had offered $950,000 plus a three-year job. In 2004 he recalled offers of up to about $1 million, then one of about $2 million.');x.src=[10,11];}
{const x=B(3,5);vrep(x,'howStarted','One student, one laptop, one week.','One student and less than a week of work.');vrep(x,'whatHappened','Association of Harvard Black Women','Association of Black Harvard Women');x.src=[31,11,29];}
{const x=B(3,8);vrep(x,'funding','Ads paid for the servers from the very start.','Within months, a few ads were helping to pay for the servers.');}
{const x=B(3,13);x.whatHappened='Users were furious that their shopping was being shown to friends without clear permission. Facebook switched it to opt-in, and Mark wrote: "We simply did a bad job with this release, and I apologize for it." Under a class-action settlement filed in 2009, Facebook agreed to shut Beacon down for good and pay $9.5 million. In 2011 Mark himself listed Beacon as a high-profile mistake that overshadowed much of the company\'s good work.';x.howStarted='Launched in November 2007 with outside websites as partners.';x.src=[59,58,BEACON];}
{const x=B(3,14);vrep(x,'idea',"Snapchat's disappearing photos were exploding among teenagers.","Snapchat's disappearing photos were growing fast, just as Facebook admitted that teens were using it less.");x.whatHappened='Poke flopped. Snapchat stayed independent. This round was a clear loss.';x.lesson="Copying a product is not the same as copying why people love it. Speed alone did not win over Snapchat's users.";}
{const x=B(3,18);vrep(x,'decision','starting with a few HTC and Samsung models, including the HTC First.','starting with a short list of Android phones and the new HTC First.');x.howStarted='Released on 12 April 2013, in the US only.';vrep(x,'whatHappened','It was quietly dropped.','In June 2014 The New York Times reported that Facebook had disbanded the team that built it. Facebook told The Next Web another team was still working on Home, but it never took off.');x.src=[54,NYTHOME,TNWHOME];}
B(3,20).src=[55,56,139];
{const x=B(3,25);vrep(x,'whatHappened','Reality Labs has lost money every single year.','Reality Labs has lost money in every year listed here.');}
{const x=B(3,31);vrep(x,'decision','(an LLC) controlled by Mark rather than','(an LLC) run by the couple rather than');x.src=[9,80,128,129];}
{const x=B(3,32);vrep(x,'whatHappened','In January 2022 the project was wound down and its technology was sold to Silvergate Capital, for a price reported at about $200 million.',"In January 2022 the project's technology and other assets went to the crypto bank Silvergate Capital, which put the price it paid at $182 million, mostly in its own shares. The project then began winding down.");}
{const x=B(3,33);x.whatHappened="It turned a regulatory loss in India into a partnership with one of the country's biggest business groups.";}
{const x=B(3,35);x.years='2020–2023';x.howStarted='Bought by Meta in 2020 for $315 million.';x.funding="$315 million of Meta's money.";x.whatHappened+=' In May 2023 Meta agreed to sell it to the stock-photo company Shutterstock for $53 million, a loss of about $262 million on the purchase price.';x.src=[65,GIPHY];}
{const x=B(3,37);vrep(x,'decision','worried about falling behind Google and OpenAI','facing tough competition from Google and OpenAI');}
// CHAPTER 4: replace dup quote with note
if(B(4,19).t!=='quote')throw 'ch4';
b.chapters[4].blocks[19]={t:'note',text:'One customer, Zynga, at 12% of revenue. Count your risky dependencies.'};
// CHAPTER 6
rep(6,4,'text','Meta reportedly cut about 8,000 jobs, around 10% of staff, starting in May 2026, to help pay for computing.','Reuters reported in April 2026 that Meta planned to cut about 8,000 jobs, around 10% of staff, starting in May, as it poured money into AI.');
rep(6,7,'text','In August 2026 Meta agreed a deal','That August a New Mexico judge added about $567 million in costs after finding its platforms a public nuisance; Meta has asked the court to throw out the judgments, and that judgment is on hold. Also in August 2026, Meta agreed a deal');
B(6,12).text="For example: 342.4 million shares times Meta's closing price of $614.99 on 30 October 2026 comes to about $210.6 billion. Forbes's real-time figure on 2 November, after the shares slipped again, was $209.6 billion, sixth in the world.";
{const it=B(6,21).items[0];it.value='$209.6B';it.label='Forbes net worth, 2 Nov 2026 (#6 in the world)';}
// CHAPTER 7
rep(7,27,'text','At the same event he said the most important thing is to keep your team as small as possible, and pointed out','At the same event he said the top priority is to keep a team as small as you can, and pointed out');
B(7,31).src=[100,94,101,CNN];
// CHAPTER 8
rep(8,2,'text',"he went for pizza at Noch's with his friend KX Jin","he went to Noch's with his friend KX");
rep(8,29,'text',"He told the court the deal was also meant to improve Facebook's quality.","He told the court the real question had been whether to build a better camera or buy one.");
B(8,29).src=[112,113,114];
B(8,31).src=[113,114,115];
B(8,36).src=[HAUGEN];
// CHAPTER 9
rep(9,1,'text','Waiting in line for the bathroom he told her: "I\'m going to get kicked out in three days, so we need to go on a date quickly."','Waiting in line for the bathroom, he told her he was about to be kicked out, so they had better go on a date fast.');
B(9,3).text='To please her family he took on a hard project. So many of Priscilla\'s relatives speak only Mandarin that he began studying the language in 2010. When the couple decided to marry, he told her grandmother the news in Chinese. "She was really shocked," he said.';
B(9,3).src=[119,BIGM,NYTM];
rep(9,13,'text','He has listed running 365 miles and reading 25 books among them, and one year he vowed to eat only meat he had killed himself.','One year it was reading a new book every other week. In 2011 he vowed to eat only meat he had killed himself.');
B(9,14).items[1].text='Build a home AI system called Jarvis, inspired by Iron Man.';
rep(9,22,'text','and it took over the AI lab EvolutionaryScale','and the team from the AI lab EvolutionaryScale joined it');
rep(9,22,'text','the initiative had stopped funding a primary school that gave education and health care to underserved children','the initiative had stopped paying for a school that offered lessons and health care to children in need');
B(9,22).src=[130,131,BIOHUB];
// CHAPTER 10
rep(10,22,'text','In March 2024 he and Priscilla were among the guests','In March 2024 he was among the guests');
B(10,20).src=[139,140,56,TOI];
// CHAPTER 11
B(11,31).text='In November 2018 the New York Times reported that Facebook had hired a Republican-linked firm, Definers, whose document painted financier George Soros as the money behind groups criticising Facebook. Facebook cut ties with the firm. Mark told reporters he only learned of the hiring from the newspaper. Facebook also said it was wrong to suggest it had asked Definers to spread misinformation, and Definers stood by its work.';
B(11,31).src=[160,HILL];
// CHAPTER 12
B(12,0).text='Mark Zuckerberg is 42 and still chairman and chief executive of the company he started in a dorm at 19. Forbes put his fortune at about ==$209.6 billion== on 2 November 2026, sixth in the world, and almost all of it is Meta stock. So it moves with the share price every day.';
B(12,0).src=[9,80,4];
{const it=B(12,1).items[0];it.value='$209.6B';it.label='Forbes net worth, 2 Nov 2026 (#6)';}
rep(12,12,'text','with about 4.65 billion votes for and 318 million against','with about 4.65 billion votes for and 318 million withheld');
rep(12,15,'text','a one-time 5% tax on billionaires','a proposed 5% wealth tax on billionaires');
// glance
const G=l=>{const g=b.glance.find(g=>g.label===l);if(!g)throw 'glance '+l;return g};
G('Born').value='14 May 1984, White Plains, New York, USA (he turned 28 the same week Facebook went public)';G('Born').src=[28,118];
G('Main role today').value='Founder, Chairman and CEO of Meta (Facebook, Instagram, WhatsApp). Controls 60.6% of shareholder votes through special 10-vote shares, and takes a salary of $1 a year';G('Main role today').src=[80,1,4];
G('Net worth').value='$209.6 billion, #6 in the world (Forbes real-time estimate, 2 November 2026); owns about 13% of Meta; self-made';
G('First product').value="Synapse, a free music player that learned your taste, built with Adam D'Angelo at Exeter; the pair turned down a $950,000 offer that came with a three-year job";
G('Family (public basics)').src=[9,13,118];
// contact
const C=b.contact;
C.howToReach="We found no public personal email for Mark Zuckerberg, and nothing you send to Meta's switchboard or inboxes will be passed to him just because you asked. The doors that really open are narrow: journalists can write to press@meta.com, shareholders to investor@meta.com, and anyone with a serious governance concern can post a letter to Meta's Corporate Secretary, which Meta says can be sent anonymously or confidentially. If your Facebook, Instagram or WhatsApp account has a problem, use the Meta Help Centre; the press and investor inboxes are for reporters and shareholders, not for account problems. Meta names his Facebook, Instagram and Threads accounts as official places where he speaks, so a sharp comment there is your only open line, but expect no reply, and treat any account that messages you in his name offering money or jobs as fake. If you write to any of these teams, keep it under 120 words: who you are, the one specific thing you want, and why that team is the right one.";
const ch=l=>{const c=C.channels.find(c=>c.label.startsWith(l));if(!c)throw 'ch '+l;return c};
ch('Investor relations').src=[Q3];
ch('Press (media only)').src=[3,Q3];
ch('Chan Zuckerberg Initiative grants database').label='Chan Zuckerberg Initiative grants database (lists grants made since 2018)';
const so=(p,h)=>{const s=C.socials.find(s=>s.platform===p&&s.handle===h);if(!s)throw 'so '+h;return s};
{const s=so('facebook','zuck');s.whose='Mark Zuckerberg (personal; Meta names it as an official disclosure channel)';s.src=[Q3];}
{const s=so('instagram','@zuck');s.whose='Mark Zuckerberg (personal, verified; Meta names it as an official disclosure channel)';s.src=[Q3,17];}
{const s=so('threads','@zuck');s.whose='Mark Zuckerberg (personal, verified; Meta names it as an official disclosure channel)';s.src=[Q3,18];}
{const s=so('x','@finkd');s.whose="Mark Zuckerberg (personal, rarely used; press-confirmed, but not on Meta's official list)";s.src=[16,FINKD];}
{const s=so('youtube','Meta');s.url='https://www.youtube.com/meta';s.src=[4];}
{const s=so('threads','@metanewsroom');s.url='https://www.threads.net/@MetaNewsroom';}
// deletions (descending)
if(B(3,9).t!=='quote'||B(3,6).t!=='quote'||B(2,44).t!=='quote')throw 'del';
b.chapters[3].blocks.splice(9,1);b.chapters[3].blocks.splice(6,1);
b.chapters[2].blocks.splice(44,1);
// disputed rewrite
b.factCheck.disputed=[
{claim:'How much Synapse was offered for, and when',note:'The Harvard Crimson (Oct 2003) quotes Mark on one $950,000 offer with a three-year job, after the April 2003 Slashdot post, when he was already at Harvard. The Crimson (June 2004) quotes him on offers "up to one million" and then "like two million", and says that the pair later tried to accept. TIME (2010) says AOL and Microsoft offered around $1 million and implies he chose Harvard over the deal. No buyer has confirmed any amount. A 2011 Atlantic Wire piece says he sold Synapse to Microsoft for $950,000; both Crimson articles contradict that, so we say the offers were refused.'},
{claim:'When Mark got his first computer',note:'His father says about age 8 or 9 (Dental Products Report, 2016); Mark told the Harvard Crimson (2004) it was sixth grade. TIME (2010) says he started on a Quantex 486DX; his father also describes an older Atari 800. Both versions are given with attribution.'},
{claim:"Facemash traffic and timing: '450 visitors in first four hours' vs '450 visitors by shutdown'",note:"The Crimson's June 2004 profile says 450 visitors in the first four hours; the Crimson's Nov 2003 news reports, closer to the event, say about 450 visitors had cast at least 22,000 votes by the time it was taken down. The book uses the Nov 2003 version."},
{claim:'ZuckNet date and age',note:"TIME says Mark built ZuckNet at 12; People reports he was 11; his father dates its office use to 1996, when Mark was 11-12. Written as 'around age 12'."},
{claim:"ZuckNet as 'the world's first social media network'",note:"This is Edward Zuckerberg's own proud description, not an established fact; it is quoted and labelled as his claim."},
{claim:'Accel invested $12.7 million in 2005.',note:"Most later accounts say $12.7M at a ~$98M valuation; TechCrunch's September 2005 report says $12.2M in April 2005 at a rumoured ~$100M valuation. We cite the contemporaneous TechCrunch figure."},
{claim:'Peter Thiel paid $500,000 for 10.2% of Facebook.',note:'TechCrunch (2005) reports an angel round of about $500,000. Mark told The Crimson (2005) it was basically a loan with interest and equity attached, and the amount was undisclosed there. We could not verify the 10.2% stake from a source we could read, so we left it out.'},
{claim:'Yahoo cut its 2006 offer to $800 million.',note:'Wired (2007) says $800 million; some later accounts say $850 million. We use Wired.'},
{claim:'Size of the August 2026 state settlement.',note:"AP reported 'up to $18 billion' with 48 states (some headlines said $17 billion); Meta's 10-Q says up to about $18.59 billion with 52 attorneys general across states, territories and DC, of which about $5.3 billion depends on industry peers. We use the 10-Q."},
{claim:'Muse launched in August 2026.',note:"AP's Q3 earnings story says August; AP's launch story (via PBS) is dated 8 September 2026 and says it launched that Tuesday. We use 8 September."},
{claim:'Instagram was bought for $1 billion.',note:"The announced headline value was about $1 billion; Facebook's Q3 2012 10-Q, as reported by The Next Web, put the final cost at about $715 million because the stock portion lost value. We give both."},
{claim:'What Silvergate paid for Diem.',note:"The Wall Street Journal reported about $200 million before the deal was announced; Silvergate's own release filed with the SEC values the cash and shares at $182 million. We use Silvergate's figure."},
{claim:'What became of Facebook Home.',note:'The New York Times (June 2014) reported the original team was disbanded; Facebook told The Next Web that a team was still working on it. We found no official shutdown date in a source we could read, so we give no end date beyond that.'},
{claim:'Zuckerberg wakes at about 8 a.m.',note:"A 2023 Business Insider profile (via Entrepreneur) says about 8 a.m. Fortune's 2025 report on his Theo Von interview says 7:00 to 7:30. We lead with the more recent figure."},
{claim:'He cancelled all meetings for two weeks in 2012 until staff brought mobile work.',note:'This rests on one recollection by Meta executive Nicola Mendelsohn on a 2022 podcast. We found no memo or second named witness, so we attribute it to her.'},
{claim:'Meta offered $100 million signing bonuses to OpenAI staff.',note:'The figure comes from Sam Altman, a rival, as reported by Fortune. Exact pay was not confirmed by Meta. We attribute it to Altman.'},
{claim:'Llama 4\'s published results were "fudged" and Zuckerberg sidelined the GenAI group.',note:"Yann LeCun's account in the Financial Times, read through The Decoder's summary. LeCun is a departing executive with his own views on AI, so we present it as his account."},
{claim:'The Google+ "lockdown" and "Carthago delenda est" speech.',note:"Comes from Antonio Garcia Martinez's book Chaos Monkeys, read through a Digit report of the Vanity Fair excerpt. He is a former employee writing critically, and we did not find an independent second account, so it is attributed to him."},
{claim:'HTML5 was Facebook\'s "biggest mistake".',note:'Wording differs. Engadget quotes "one of the biggest mistakes if not the biggest strategic mistakes we\'ve ever made"; UPI has "one of the biggest if not the biggest strategic mistake we made". We quote Engadget.'},
{claim:"New Mexico's count of violations and money figures.",note:"Source NM reports close to 44 million violations; Meta's 10-Q says more than 43 million. There are three separate New Mexico money figures: $375 million (March 2026 child-safety verdict), about $567 million (August 2026 public-nuisance judgment, on hold) and $25 billion (October 2026 penalty in a separate privacy and misstatement case, which Meta says it will appeal)."},
{claim:'Zuckerberg has moved to Florida.',note:'Fox Business, citing the Wall Street Journal, said in February 2026 he was buying a Florida home; it also said the deal was not confirmed as closed. Forbes still lists Palo Alto as his residence on 2 November 2026. Whether he has changed legal residency is not established.'},
{claim:'Size of the Kauai property.',note:'Reports vary between about 1,400 and 1,500 acres. We use about 1,500, as in Hyperallergic.'},
{claim:'Wedding guest count.',note:'AP via Times of Israel says fewer than 100; other reports say about 100.'},
{claim:'The "masculine energy" wording.',note:'Reports of the Rogan interview use slightly different wording. We quote only short phrases that match across sources.'},
{claim:'Who is responsible for the Newark outcome.',note:'Russakoff\'s book and interviews are critical. Figures for how the money was split vary, so we give no split. "The money is gone" is Fortune\'s summary of her reporting.'},
];
b.factCheck.method="This book was researched by four parallel writers working from filings, court records, Mark Zuckerberg's own letters and talks, and established press, then checked independently by a separate fact-checker. The checker opened the cited pages again, tested every quote against the source text by script, re-read the hook, glance, funding figures and legal outcomes, and corrected or removed what did not hold up, such as the Synapse timeline, the Diem sale price and an unsupported Mandarin story; photo licences were confirmed through the Wikimedia Commons API and every contact channel was checked against Meta's, CZI's or Biohub's own pages. Several sites blocked direct reading, so Meta's investor pages, Source NM, Quartz, MediaPost, SCMP (opening only), Benzinga, TechRepublic, UPI, Business Insider India, Times of Israel, BBC via Capital FM and the StreetInsider copy of the 8-K were read through a fetch or search tool instead; Bloomberg could only be read in its opening lines, and WSJ and Reuters could not be opened, so CNN and primary documents replace them. Interviews we could only see through another outlet's report, including LeCun's FT interview and the Garcia Martinez excerpt, are labelled as such, and not every sentence could be traced word by word, so small errors may remain.";
fs.writeFileSync(F,JSON.stringify(b,null,1));console.log('edits',n,'sources',b.sources.length);
