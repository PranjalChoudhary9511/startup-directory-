import json,sys
sys.stdout.reconfigure(encoding='utf-8',errors='replace')
P='../../../src/content/billionaires/books/bill-gates.json'
b=json.load(open(P,encoding='utf8'))
S=b['sources']
def add(label,url):
    S.append({'label':label,'url':url});return len(S)-1
BBC=add('BBC News, Jack Goodman and Flora Carmichael, "Coronavirus: Bill Gates \'microchip\' conspiracy theory and other vaccine claims fact-checked", 29 May 2020','https://www.bbc.com/news/52847648')
CNBC20=add('CNBC, Berkeley Lovelace Jr., "Bill Gates denies conspiracy theories that say he wants to use coronavirus vaccines to implant tracking devices", 22 Jul 2020','https://www.cnbc.com/2020/07/22/bill-gates-denies-conspiracy-theories-that-say-he-wants-to-use-coronavirus-vaccines-to-implant-tracking-devices.html')
NRC=add('NRC, Eline Nugteren, report on the Leeuwarden hearing in the civil case naming Bill Gates, 22 Oct 2026 (in Dutch)','https://www.nrc.nl/nieuws/2026/10/22/bill-gates-kwam-niet-naar-leeuwarden-waar-drie-rechters-zich-bogen-over-de-aanklacht-dat-de-mondiale-elite-met-covid-19-genocide-wilde-plegen-a4939551')
LC=add('Leeuwarder Courant, preview of the Leeuwarden hearing, 21 Oct 2026 (in Dutch)','https://www.lc.nl/regio/friesland/bill-gates-mark-rutte-en-de-nederlandse-staat-voor-rechter-wegens-covid-prikken.-wat-speelt-er-donderdag-in-de-rechtbank-leeuwarden/163320746.html')
PR=add('Philanthropy Roundtable, Almanac, "Massive Gifts to Global Health from the Gates Family"','https://www.philanthropyroundtable.org/almanac/massive-gifts-to-global-health-from-the-gates-family/')
NYT04=add('Gary Rivlin, "Microsoft to Pay Special Dividend to Stockholders", The New York Times, 21 Jul 2004','https://www.nytimes.com/2004/07/21/business/technology-microsoft-to-pay-special-dividend-to-stockholders.html')
HL2907=add('HistoryLink.org Essay 2907, "Bill & Melinda Gates Foundation"','https://historylink.org/File/2907')
SEC=add('SEC EDGAR, Schedule 13D/A on Canadian National Railway filed for Cascade Investment, the Gates Foundation Trust, William H. Gates III and Melinda French Gates, May 2021','https://www.sec.gov/Archives/edgar/data/16868/000110465921061095/a21-15143_1sc13da.htm')
FP=add('Barbara Shecter, "Melinda Gates now among largest CN shareholders after marital split stock transfer", Financial Post, 5 May 2021','https://financialpost.com/news/melinda-gates-now-among-largest-cn-shareholders-after-marital-split-stock-transfer/')
NYT21=add('Emily Flitter and Matthew Goldstein, "Long Before Divorce, Bill Gates Had Reputation for Questionable Behavior", The New York Times, 16 May 2021','https://www.nytimes.com/2021/05/16/business/bill-melinda-gates-divorce-epstein.html')
FOX=add('Bradford Betz, report on the New York Times account, Fox Business, 16 May 2021','https://www.foxbusiness.com/business-leaders/bill-gates-marriage-to-melinda-report')
GW17=add('Kurt Schlosser, "Bill Gates joins Instagram to share photos from his adventures, starting in Tanzania", GeekWire, 13 Aug 2017','https://www.geekwire.com/2017/bill-gates-joins-instagram-share-photos-adventures-starting-tanzania/')
MAC=add('The Mac Observer, "Yes, Microsoft Did Steal Apple\'s Interface (Under License)", 8 Jul 2004, quoting the 1985 agreement (archived copy)','https://web.archive.org/web/20210219062050/https://www.macobserver.com/columns/thebackpage/2004/20040708.shtml')
F97=add('Forbes, "Of mice and Microsoft", 7 Nov 1997','https://www.forbes.com/1997/11/07/col.html')
HL2297=add('HistoryLink.org Essay 2297, "Department of Justice and 20 states sue Microsoft on May 18, 1998"','https://www.historylink.org/File/2297')

for s in S:
    if s['url']=='https://www.forbes.com/profile/bill-gates/': s['label']='Forbes, Bill Gates real-time profile (as of 2 Nov 2026; last text update 15 Sep 2026)'
    if 'billionaires/profiles/william-h-gates' in s['url']: s['label']='Bloomberg Billionaires Index, Bill Gates profile (last updated 1 Nov 2026)'

C=b['chapters']
def B(ci,i): return C[ci]['blocks'][i]
def rep(o,k,old,new):
    assert old in o[k],(k,old,o[k][:200]); o[k]=o[k].replace(old,new)
def setsrc(o,drop=(),addl=()):
    o['src']=[x for x in o['src'] if x not in drop]
    for x in addl:
        if x not in o['src']: o['src'].append(x)

# front matter
rep(b,'subtitle','$118 billion','$120 billion')
b['glance'][4]['value']='As a teenager he and school friends wrote a payroll program for a Portland company and were paid in free computer time. At 16 or 17 he was paid to write Lakeside\'s class-scheduling program'
setsrc(b['glance'][4],addl=[27])
b['glance'][8]['value']='About $120.4 billion (Forbes, 2 Nov 2026, world #16), made from Microsoft; Forbes estimates he now owns less than 1% of it after giving more than $63.9 billion to his foundation'
rep(b['contact'],'howToReach','Bill Gates has no public personal email or phone','Bill Gates publishes no personal email or phone')
rep(b['contact'],'howToReach','his verified LinkedIn, X and Instagram accounts','his official LinkedIn, X and Instagram accounts')
setsrc(b['contact']['socials'][2],addl=[GW17])
b['contact']['socials'][1]['whose']='Bill Gates (personal, linked from the Gates Foundation)'
b['contact']['socials'][3]['whose']='Bill Gates (personal, linked from the Gates Foundation)'
b['contact']['socials'][0]['whose']='Bill Gates (personal, verified; linked from the Gates Foundation)'
# photos
b['photos'][1]['caption']='A Teletype Model 33 printing terminal, from a 1974 magazine advert. This is the kind of machine Gates and Allen first used at Lakeside. It printed only capital letters, about 10 characters a second.'
b['photos'][4]['caption']='13 December 1977, Albuquerque: a police photograph of a 22-year-old Bill Gates. The file\'s Commons description says it followed a speeding ticket and a forgotten licence. Microsoft was still a tiny company in New Mexico.'
B(1,8)['photo']['caption']='Paul Allen (left) and Bill Gates at Lakeside School in 1970. Gates was 14 or 15 here.'
# ch0
rep(B(0,7),'text','Berger describes him as tall, civil and quietly respected.','The Seattle journalist Knute Berger, who once sat at a dinner with both parents, describes him as tall, civil and quietly respected.')
rep(B(0,11),'text','The Seattle journalist Knute Berger put it bluntly','Berger put it bluntly')
B(0,37)['text']='Gates has since written that if he were growing up today, he would probably be diagnosed on the autism spectrum. When The Wall Street Journal printed an excerpt from his memoir, its headline asked if he was on the spectrum, and answered: "Probably." In the 1960s, almost nobody raised children with that idea in mind, which helps explain the clashes at home.'
setsrc(B(0,37),addl=[209])
# ch1 age
B(1,26)['text']='Gates had just turned 15 if the job really dates from November 1970. Allen\'s memoir remembers him as "just turned 16". Either way, his résumé for the payroll job was written in pencil on lined notebook paper. As Allen later wrote: "We got the job."'
rep(B(1,29),'text','Sixteen, and already','Fifteen, and already')
B(1,43)['items'][0]['value']='15'
setsrc(B(1,43)['items'][0],addl=[27])
rep(B(1,57)['items'][2],'text','He has just turned 16.','He has just turned 15.')
rep(B(1,58),'text','pencilled a résumé at 16','pencilled a résumé at 15')
rep(B(1,36),'text','He was writing a version of BASIC for a small PDP-8 computer that a teacher friend could use, and it had only six kilobytes of memory','Just for the challenge, he was writing a version of BASIC for a small PDP-8 computer that someone had lent to Lakeside. It had only six kilobytes of memory')
# ch2 quotes
B(2,4)['text']="There were always lots of people in my dorm room late at night discussing things, because everyone knew I didn't worry about getting up in the morning. That's how I came to be the leader of the anti-social group."
B(2,6)['text']="I used to sit in on lots of classes I hadn't even signed up for."
rep(B(2,40),'text','They formed a partnership they first called "Micro-Soft".','They formed a partnership they first called "Micro-Soft", a name Gates\'s own timeline dates to that April.')
setsrc(B(2,40),addl=[48])
# ch3
rep(B(3,5),'whatHappened','Reports say the work netted close to $20,000.','Reports say the work netted close to $20,000, though Gates has recalled about $10,000.')
setsrc(B(3,5),addl=[57])
setsrc(B(3,12),drop=[60])
rep(B(3,22),'decision','Microsoft came early, with Windows Mobile in 2000.','Microsoft came early, with pocket versions of Windows around 2000.')
rep(B(3,29),'whatHappened',' He told Fortune he was no risk taker.','')
rep(B(3,31),'howStarted','A largest block came from a Canadian pension fund in 2017.','The biggest block, about $520 million of farmland, came from a Canadian pension fund.')
rep(B(3,33),'funding','A first stock gift of about $94 million in 1994.','A first stock gift of $94 million in 1994.')
rep(B(3,33),'funding','and has given about $43 billion so far.','and gave more than $47 billion in all before stopping in July 2026.')
setsrc(B(3,33),drop=[117],addl=[PR,223])
# ch4
B(4,27)['items'][3]['value']='0'
# ch5
rep(B(5,2),'text','It stopped the sublicensing deals that were Microsoft\'s main income, and a judge barred new sales until an arbitrator ruled. An arbitrator is a private judge whose decision both sides agree to accept.','It stopped paying royalties and blocked the licensing deals that were Microsoft\'s main income, and the fight went to arbitration. An arbitrator is a private judge whose decision both sides agree to accept.')
setsrc(B(5,2),drop=[153],addl=[F97])
B(5,3)['text']='The company was starving, and one history says it was on the verge of bankruptcy until one of its own programmers, Bob Greenberg, lent it money. __Gates\'s own father, a lawyer, stood behind the case.__ Everything now rested on one line in the contract.'
B(5,3)['src']=[152,151]
rep(B(5,4),'text','The contract had said MITS must use its best efforts to sell licences, and blocking them broke that promise. The arbitrator called it corporate piracy.','The contract had said MITS must use its best efforts to license and market the software, and blocking deals broke that promise. One history says the ruling called it an act of corporate piracy.')
setsrc(B(5,4),drop=[153],addl=[F97])
setsrc(B(5,13),drop=[60],addl=[158,MAC])
setsrc(B(5,14),addl=[158,MAC])
rep(B(5,14),'text','Microsoft promised to hold back an IBM-compatible Excel for a while and to improve Word for the Mac.','Microsoft promised to hold back an IBM-compatible Excel until October 1986 and to improve Word for the Mac.')
rep(B(5,30),'text','the US Justice Department and 19 states sued.','the US Justice Department and 20 states sued. One state later dropped out.')
setsrc(B(5,30),addl=[HL2297])
rep(B(5,37)['items'][5],'text','The US government and 19 states sue.','The US government and 20 states sue.')
setsrc(B(5,37)['items'][5],addl=[HL2297])
# ch6
rep(B(6,6),'text',' Fortune once reported that he kept most of it in bonds.','')
setsrc(B(6,8),addl=[SEC,FP])
rep(B(6,10),'text','He gave over $16 billion in a single stretch in 1999, and a $3.3 billion Microsoft dividend in 2004 went straight to the foundation.','When the merged foundation was confirmed in August 1999, HistoryLink says its endowment already stood at $17 billion. In 2004 he pledged his whole $3.3 billion share of a special Microsoft dividend to it.')
setsrc(B(6,10),drop=[117],addl=[HL2907,NYT04])
rep(B(6,12),'text','whose gifts have reached about $43 billion','whose gifts reached more than $47 billion')
setsrc(B(6,12),addl=[223])
rep(B(6,14),'text','As of the start of November 2026, Forbes puts','As of 2 November 2026, Forbes puts')
for j in range(4): rep(B(6,15)['items'][j],'label','31 Oct 2026','1 Nov 2026')
rep(B(6,28)['items'][0],'label','1 Nov 2026','2 Nov 2026')
# ch9
setsrc(B(9,8),drop=[202],addl=[26])
rep(B(9,9),'text','In her first interview on it, in 2022, she said there was no single moment. She named an affair he had in 2000 with a Microsoft employee, and his relationship with Jeffrey Epstein, whom she had told him not to deal with.','In her first interview on it, in 2022, she said there was no single moment. GeekWire\'s report of that interview lists among the issues an affair he had in 2000 with a Microsoft employee, and his relationship with Jeffrey Epstein, whom she had told him not to deal with.')
# ch10
rep(B(10,2),'text','In November 1995 Gates, 39 and already the world','In November 1995 Gates, just turned 40 and already the world')
B(10,14)['text']='Fame has a price. In May 2020 a Yahoo News/YouGov poll found ==28% of Americans== believed Gates wanted to use a Covid vaccine to implant tracking microchips, including 44% of Republicans. The BBC found no evidence for the claim. The Associated Press has described the foundation as the target of numerous unfounded conspiracy theories. Gates denied it, and told CBS News: "We need to get the truth out there."'
B(10,14)['src']=[233,BBC,CNBC20,204]
B(10,15)['text']='Such theories have also reached the courts. In October 2024 a Dutch court in Leeuwarden ruled it had jurisdiction over him in a civil claim brought by people alleging vaccine injury. Fact-checkers stressed this was a procedural ruling in a civil case, not a criminal charge or a finding against him. Judges heard the case on 22 October 2026. Gates did not attend, and his lawyers reject the claims. __The claims are unproven, and as of early November 2026 we found no report of a verdict.__'
B(10,15)['src']=[235,236,NRC,LC]
rep(B(10,23),'text',' He has also travelled there for talks, including in Andhra Pradesh on health and governance.','')
setsrc(B(10,23),drop=[242])
# ch11
rep(B(11,24),'text','The New York Times, also citing anonymous sources, reported overtures to women who worked for him.','The New York Times, citing current and former staff, reported that he had asked out women who worked for him. His spokeswoman said claims that he mistreated employees were false.')
setsrc(B(11,24),addl=[NYT21,FOX])
rep(B(11,27),'text','Gates has not been accused of any crime, and GeekWire reports that no Epstein victim has accused him of wrongdoing.','ABC News in Australia reports that Gates has not been accused of any crimes, and GeekWire reports that no Epstein victim has accused him of wrongdoing.')
setsrc(B(11,27),addl=[253])
# ch12
rep(B(12,0),'text','on 1 November 2026','on 2 November 2026')
rep(B(12,1)['items'][0],'label','1 Nov 2026','2 Nov 2026')
# notes for pace (insert from the back so indexes hold)
ins=[(5,29,'Ask who else benefits when a rival offers to help.'),(5,16,'One signature in 1985 decided a $5.5 billion fight. Read before signing.'),(4,32,'Bored by bankers. Wide awake the moment the talk turned to price.'),(4,16,'He promised IBM a product he did not own yet. Sound familiar?')]
for ci,i,t in ins: C[ci]['blocks'].insert(i,{'t':'note','text':t})
# disputed
D=b['factCheck']['disputed']
drop={'Net worth figure used elsewhere in the book','Traffic-data business earnings','TerraPower was founded in 2008.','Microsoft board and Gates leaving in 2020.'}
D[:]=[d for d in D if d['claim'] not in drop]
for d in D:
    if d['claim']=='Traf-O-Data earnings and dates': d['note']='HistoryLink says $20,000 in one summer; CNBC, drawing on Allen, says the work netted nearly $20,000 overall; Gates told Masters of Scale about $10,000. Start and end dates vary between 1972 and about 1980. The text gives the range and attributes it.'
    if d['claim']=="TerraPower's founding date": d['note']="Caixin and Bloomberg say 2008, and a leadership bio on TerraPower's site agrees. TechCrunch (2026) says 2015, which conflicts with earlier reports. TerraPower's site also says Gates has been chairman since 2006. The venture entry uses 2008."
    if d['claim']=='Date Micro-Soft was formed': d['note']="Gates's own Gates Notes timeline dates the name to April 1975 and Heise gives 4 April 1975. HistoryLink's Gates essay says summer 1975 and its Microsoft essay says 'by fall 1975'. The text says the partnership formed in summer 1975 and that the name dates from April."
    if d['claim']=='The Greenberg loan in 1977': d['note']="Heise's 2025 history says Bob Greenberg lent $70,000. The writer's reading of Allen's memoir gave $7,000, but this checker could not open the book. Because the two differ by a factor of ten, the text gives no figure."
    if d['claim']=='Why Gates left the Microsoft board in 2020': d['note']="Microsoft's release gives philanthropy as the reason and Microsoft confirmed an investigation without saying what led to the departure. The Wall Street Journal (2021), citing people familiar, says directors decided he should go amid an inquiry. Gates's spokeswoman said the two were not related. All three positions are stated, none as fact."
D.extend([
 {'claim':"Gates's age at the Portland payroll job",'note':"HistoryLink dates the contract to November 1970, when Gates had just turned 15. Allen's memoir, quoted by HistoryLink, says 'just turned 16'. Both cannot be right, since he was born on 28 October 1955. The text says 15 and flags Allen's wording."},
 {'claim':"Gates's age on Letterman in November 1995",'note':'CNBC says he was 39. He was born on 28 October 1955, so he had turned 40 by then. The text says just turned 40.'},
 {'claim':'How many states sued Microsoft on 18 May 1998','note':"HistoryLink's essay on the filing says 20 states, later dropped to 19; its Microsoft essay says 19. The text says 20, and that one later dropped out."},
])
json.dump(b,open(P,'w',encoding='utf8',newline='\n'),ensure_ascii=False,indent=2)
open(P,'a',encoding='utf8',newline='\n').write('\n')
print('ok',len(S),len(D))
