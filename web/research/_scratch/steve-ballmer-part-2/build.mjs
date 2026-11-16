// Builds part-2.json for the Steve Ballmer book. Source keys map to indexes on first use.
import fs from "node:fs";

const OUT = "C:/Users/Pranjal Choudhary/Desktop/start-up derectory/web/research/billionaires/steve-ballmer/part-2.json";

const SRC = {
  techradarnok: ["TechRadar on Bloomberg's report: Hard Nok life (5 Mar 2014)", "https://www.techradar.com/news/computing/pc/hard-nok-life-ballmer-backing-nokia-buy-led-to-his-downfall-1231273"],
  wikiusa: ["Wikipedia: USAFacts (structure and funding)", "https://en.wikipedia.org/wiki/USAFacts"],
  ballmergroup: ["Ballmer Group: official site", "https://ballmergroup.org/"],
  acquired: ["Acquired podcast: The Steve Ballmer Interview (transcript, June 2025)", "https://www.acquired.fm/episodes/the-steve-ballmer-interview"],
  forbes: ["Forbes: Steve Ballmer profile (real-time, 2 Nov 2026)", "https://www.forbes.com/profile/steve-ballmer/"],
  seattle92: ["Seattle Times: Microsoft Marshal (5 Apr 1992)", "https://archive.seattletimes.com/archive/19920405/1484776/microsoft-marshal----the-man-considered-no-2-behind-gates-hopes-for-order-in-windows-os2-battle"],
  geekwire10: ["GeekWire: Inside the Windows 1.0 reunion (11 Dec 2025)", "https://www.geekwire.com/2025/inside-the-windows-1-0-reunion-how-a-scrappy-team-shipped-the-product-that-changed-everything-eventually/"],
  nwipo: ["Network World: A look back at Microsoft's IPO (quoting Fortune, 1986)", "https://www.networkworld.com/article/949284/30-years-ago-a-look-back-at-microsoft-s-ipo.html"],
  benzinga: ["Benzinga via Yahoo Finance: Hiring Steve Ballmer (5 Jul 2024)", "https://finance.yahoo.com/news/hiring-steve-ballmer-one-bill-170208229.html"],
  rfb: ["Reference for Business: Steve Ballmer biography", "https://www.referenceforbusiness.com/biography/A-E/Ballmer-Steve-1956.html"],
  enc: ["Encyclopedia.com: Ballmer, Steve (Business Leader Profiles)", "https://www.encyclopedia.com/people/social-sciences-and-law/business-leaders/steve-ballmer"],
  entre: ["Business Insider via Entrepreneur: Gates on recruiting Ballmer, from the memoir Source Code (11 Feb 2025)", "https://entrepreneur.com/business-news/bill-gates-got-steve-ballmer-to-quit-school-join/486932"],
  tvi: ["TechCrunch: Sand Hill Road's Consiglieres, August Capital (14 Jun 2014)", "https://techcrunch.com/2014/06/14/sand-hill-roads-consiglieres-august-capital/"],
  geekwire50: ["GeekWire: A new look at Microsoft's startup story (2024)", "https://www.geekwire.com/2024/a-new-look-at-microsofts-startup-story-with-insights-for-today-microsoft-50-chapter-2/"],
  fy2000: ["Microsoft: Record fiscal year revenue and income (18 Jul 2000)", "https://news.microsoft.com/2000/07/18/microsoft-announces-record-fiscal-year-revenue-and-income/"],
  sec13: ["Microsoft Form 8-K, fiscal 2013 results (SEC, 18 Jul 2013)", "https://www.sec.gov/Archives/edgar/data/0000789019/000119312513294305/d570922dex991.htm"],
  sec14: ["Microsoft Form 8-K: Nadella named CEO (SEC, 4 Feb 2014)", "https://www.sec.gov/Archives/edgar/data/0000789019/000119312514035080/d669538dex991.htm"],
  blunders: ["The Register: Ballmer's billion-dollar blunders (27 Jul 2015)", "https://www.theregister.com/2015/07/27/ballmers_billion_dollar_blunders/"],
  kin: ["The Register: Microsoft's KIN is dead (30 Jun 2010)", "https://www.theregister.com/2010/06/30/microsoft_kills_kin_phone/"],
  regfinal: ["The Register on Ballmer's final Fortune interview (11 Dec 2013)", "https://www.theregister.com/2013/12/11/steve_ballmer_final_interview/"],
  neowinregret: ["Neowin on Ballmer's ZDNet interview with Mary Jo Foley (23 Aug 2013)", "https://www.neowin.net/news/ballmers-biggest-regret-while-ceo-was-vistas-loopedy-loo/"],
  toms: ["Tom's Hardware: Ballmer says Vista was his biggest mistake (16 Dec 2013)", "https://www.tomshardware.com/news/microsoft-longhorn-windows-vista-steve-ballmer-mistake,25401.html"],
  nwallchin: ["Network World: Microsoft exec praised Mac to change Vista process (12 Dec 2006)", "https://www.networkworld.com/article/836451/software-microsoft-exec-praised-mac-to-change-vista-process.html"],
  itproallchin: ["ITPro Today: Allchin on Vista, It's Not Going to Work", "https://itprotoday.com/windows-78/allchin-vista-its-not-going-work"],
  gamesbeat: ["GamesBeat, Dean Takahashi: The making of the Xbox, part 1", "https://gamesbeat.com/making-of-the-xbox-1/4/"],
  gamespot: ["GameSpot: Bill Gates was insulted by Xbox pitch (30 Jun 2016)", "https://www.gamespot.com/articles/bill-gates-was-insulted-by-xbox-pitch-co-creator-s/1100-6441429/"],
  kitguru: ["KitGuru on Peter Moore's IGN podcast account (3 Jul 2015)", "https://www.kitguru.net/gaming/console-desktop-pc/matthew-wilson/the-xbox-360s-red-ring-of-death-issue-cost-microsoft-1-15-billion/"],
  nbcxbox: ["AP via NBC News: Xbox issues to cost Microsoft $1 billion-plus (5 Jul 2007)", "https://www.nbcnews.com/news/amp/wbna19620158"],
  zunecbs: ["CBS News: Microsoft's Zune $100 million sales drop (Jan 2009)", "https://www.cbsnews.com/news/microsofts-zune-100-million-sales-drop-plus-layoffs-equals-questions/"],
  eweekzune: ["eWeek: Microsoft Zune killing may have been result of corporate shakeup (15 Mar 2011)", "https://www.eweek.com/mobile/microsoft-zune-killing-may-have-been-result-of-corporate-shakeup/"],
  wikizune: ["Wikipedia: Zune (dates only)", "https://en.wikipedia.org/wiki/Zune"],
  infoweek: ["InformationWeek: Ballmer unfazed by Apple's gains (27 May 2010)", "https://www.informationweek.com/it-leadership/ballmer-unfazed-by-apple-s-gains"],
  cwnokia: ["Computerworld: Microsoft writes off $7.6B (8 Jul 2015)", "https://www.computerworld.com/article/2945371/microsoft-writes-off-76b-admits-failure-of-nokia-acquisition.html"],
  msnokia: ["Microsoft: To acquire Nokia's devices and services business (3 Sep 2013)", "https://news.microsoft.com/source/2013/09/03/microsoft-to-acquire-nokias-devices-services-business-license-nokias-patents-and-mapping-services/"],
  fih: ["TechCrunch: Microsoft offloads Nokia feature phone business for $350M (18 May 2016)", "https://techcrunch.com/2016/05/18/microsoft-offloads-nokia-feature-phone-business-to-foxconn-for-350m"],
  w10m: ["Tom's Hardware: Windows 10 Mobile end of life extended", "https://www.tomshardware.com/news/microsoft-windows-10-mobile-life-extended-eol"],
  itproboard: ["IT Pro on Bloomberg's report: Ballmer at war with board (6 Mar 2014)", "https://itpro.com/strategy/21774/steve-ballmer-at-war-with-board-during-final-months-at-microsoft"],
  techspot: ["TechSpot on Bloomberg's report: Ballmer shouted at board members (6 Mar 2014)", "https://www.techspot.com/news/55907-steve-ballmer-shouted-at-board-members-and-threatened-to-resign-over-nokia-deal.html"],
  bi: ["Business Insider India: Ballmer's shouting match with the board (Mar 2014)", "https://www.businessinsider.in/steve-ballmer-got-into-a-huge-shouting-match-with-microsofts-board-before-deciding-to-retire/articleshow/31488075.cms"],
  wincentral: ["Windows Central on Ballmer's CBS interview (21 Oct 2014)", "https://windowscentral.com/steve-ballmer-nobody-wanted-me-leave-microsoft-ceo"],
  ajyahoo: ["Al Jazeera: Microsoft withdraws Yahoo offer (2008)", "https://www.aljazeera.com/news/2008/6/13/microsoft-withdraws-yahoo-offer"],
  inetyahoo: ["InternetNews: Ballmer throws in the towel on Yahoo bid (4 May 2008)", "https://internetnews.com/it-management/ballmer-throws-in-the-towel-on-yahoo-bid"],
  itproyahoo: ["IT Pro: Timeline, the saga of Microsoft and Yahoo", "https://itpro.com/609714/timeline-the-saga-of-microsoft-and-yahoo"],
  lucky: ["TechCentral.ie: Ballmer lucky Yahoo bid failed (19 Oct 2011)", "https://www.techcentral.ie/ballmer-lucky-yahoo-bid-failed/"],
  verizon: ["MediaPost: Yahoo completes sale of business to Verizon (Jun 2017)", "https://www.mediapost.com/publications/article/302773/yahoo-completes-sale-of-business-to-verizon.html"],
  fb07: ["Microsoft: Facebook and Microsoft expand strategic alliance (24 Oct 2007)", "https://news.microsoft.com/source/2007/10/24/facebook-and-microsoft-expand-strategic-alliance/"],
  skype: ["Fox Business with Reuters: Skype is no more (5 May 2025)", "https://www.foxbusiness.com/technology/microsoft-shuts-down-skype-after-22-years-shifting-users-teams"],
  allin: ["Network World: Ballmer, for the cloud we're all in (Mar 2010)", "https://www.networkworld.com/article/725849/cloud-computing-microsoft-s-ballmer-for-the-cloud-we-re-all-in.html"],
  azure75: ["Neowin: After 15 years of secrecy, Microsoft unveils Azure's revenue (2025)", "https://www.neowin.net/news/after-15-years-of-secrecy-microsoft-unveils-azures-actual-revenue/"],
  fy26: ["IANS: Microsoft Q4 revenue, Azure annual revenue tops $100 billion (30 Jul 2026)", "https://ianslive.in/microsoft-q4-revenue-rises-18-pc-to-90-billion-azure-annual-revenue-tops-100-billion--20260730100216"],
  surface12: ["NPR via HPPR: Microsoft announces Surface (18 Jun 2012)", "https://www.hppr.org/2012-06-18/microsoft-announces-surface-its-foray-into-the-tablet-world"],
  smart: ["SmartCompany: Microsoft swallows bitter tablet as share price dives (22 Jul 2013)", "https://www.smartcompany.com.au/?p=32771"],
  avanade: ["Seattle Times: Microsoft, Andersen team up (14 Mar 2000)", "https://archive.seattletimes.com/archive/20000314/4009979/microsoft-andersen-team-up"],
  wikiavanade: ["Wikipedia: Avanade (ownership history)", "https://en.wikipedia.org/wiki/Avanade"],
  kingsfox: ["Sports Network via Fox News: Kings to remain in Sacramento (15 May 2013)", "https://www.foxnews.com/sports/kings-to-remain-in-sacramento"],
  kingsgw: ["GeekWire: NBA blocks Seattle's bid to purchase team (15 May 2013)", "https://www.geekwire.com/2013/sonics-kings/"],
  kingsnw: ["MyNorthwest: NBA votes down Sacramento Kings move to Seattle (2013)", "https://sports.mynorthwest.com/nba/nba-votes-down-sacramento-kings-move-to-seattle"],
  wrapclip: ["TheWrap: LA Clippers sold to Ballmer for $2 billion (29 May 2014)", "https://thewrap.com/former-microsoft-ceo-steve-ballmer-buy-la-clippers-2-billion"],
  reutersclip: ["Reuters via The Forward: Ballmer's $2B wins bidding (29 May 2014)", "https://forward.com/articles/199169/steve-ballmers-b-wins-bidding-for-donald-sterlin/"],
  apclip: ["AP via Gulf News: Sterling loses appeal to block Clippers sale (14 Aug 2014)", "https://gulfnews.com/sport/donald-sterling-loses-appeal-to-block-los-angeles-clippers-sale-1.1372027"],
  sterlingdrop: ["The Week: Sterling drops $1 billion lawsuit (Jun 2014)", "https://theweek.com/speedreads/452171/donald-sterling-drops-1-billion-lawsuit-agrees-2-billion-clippers-sale"],
  sportico: ["Sportico: Ballmer's net worth drops $14B (29 Jan 2026)", "https://www.sportico.com/personalities/owners/2026/steve-ballmer-net-worth-microsoft-1234882899/"],
  fosdome: ["Front Office Sports: Intuit Dome finally opens (15 Aug 2024)", "https://frontofficesports.com/intuit-dome-finally-opens-as-clippers-hope-for-fresh-start/"],
  wrapforum: ["TheWrap: Clippers buy the Forum for $400 million (24 Mar 2020)", "https://www.thewrap.com/clippers-buy-forum-for-400-million"],
  skyforum: ["Sky Sports: Ballmer completes $400m purchase of the Forum (2020)", "https://www.skysports.com/nba/news/36244/11983256/la-clippers-owner-steve-ballmer-completes-400m-purchase-of-the-forum"],
  cnbcintuit: ["CNBC: Clippers, Intuit strike $500 million-plus naming deal (17 Sep 2021)", "https://www.cnbc.com/2021/09/17/la-clippers-intuit-strike-500-million-plus-arena-naming-rights-deal.html"],
  espnsanberg: ["ESPN: Aspiration co-founder Sanberg sentenced to 14 years (1 Jun 2026)", "https://www.espn.com/nba/story/_/id/48942217"],
  abc25: ["ESPN via ABC7: Ballmer speaks out on the Leonard report (5 Sep 2025)", "https://abc7.com/post/clippers-owner-steve-ballmer-speaks-wake-kawhi-leonard-report/17745639/"],
  abcnba: ["ESPN and AP via ABC7: NBA announces punishments for Clippers (Sep 2026)", "https://abc7.com/post/nba-announces-punishments-la-clippers-kawhi-probe/19781481/"],
  abcnba2: ["ABC7: NBA strips Clippers of five first-round picks (2 Sep 2026)", "https://abc7.com/post/nba-strips-clippers-5-first-round-draft-picks-investigation-fines-steve-ballmer-30-million-kawhi-leonard-700k/19781312/"],
  apaccept: ["AP via KSAT: Ballmer backs down on NBA punishment (13 Sep 2026)", "https://www.ksat.com/sports/2026/09/14/steve-ballmer-backs-down-on-nba-punishment-apologizes-as-clippers-accept-30-million-fine/"],
  fosaccept: ["Front Office Sports: Clippers reverse course (14 Sep 2026)", "https://frontofficesports.com/article/steve-ballmer-clippers-accept-punishment/"],
  twitter: ["CNN Money: Ballmer now owns big stake in Twitter (16 Oct 2015)", "https://money.cnn.com/2015/10/16/investing/twitter-steve-ballmer-stake/index.html"],
  medialeader: ["The Media Leader: Stagwell CEO Mark Penn (26 Apr 2022)", "https://uk.themedialeader.com/?p=253195"],
  axiosstag: ["Axios: Stagwell closes deal to combine with MDC Partners (2021)", "https://www.axios.com/stagwell-mdc-partners-merger-47535e0a-f0e7-4fa4-b39c-8014a08559dc.html"],
  stagbw: ["Business Wire: Stagwell Group announces combination forming Stagwell Inc. (2 Aug 2021)", "https://businesswire.com/news/home/20210802005517/en/The-Stagwell-Group-Announces-the-Successful-Combination-of-Stagwell-Marketing-Group-With-MDC-Partners-Forming-Stagwell-Inc.-NASDAQ-STGW"],
  gwusa: ["GeekWire: Ballmer launches USAFacts (2017)", "https://www.geekwire.com/2017/steve-ballmer-launches-usafacts-using-business-principles-for-unprecedented-government-analysis/"],
  cnnusa: ["CNN Money: Ballmer launches USAFacts (18 Apr 2017)", "https://money.cnn.com/2017/04/18/technology/ballmer-usafacts/"],
  engadget: ["Engadget: Ballmer on iPhone (30 Apr 2007)", "https://www.engadget.com/2007-04-30-ballmer-on-iphone.html"],
  engjan: ["Engadget: Ballmer laughs off the iPhone (18 Jan 2007)", "https://www.engadget.com/2007/01/18/steve-ballmer-laughs-off-the-iphone-deems-it-most-expensive-i/"],
  iolstock: ["AFP via IOL: Microsoft shares soar as Ballmer retires (26 Aug 2013)", "https://iol.co.za/technology/2013-08-26-microsoft-shares-soar-as-ballmer-retires/"],
  fool: ["The Motley Fool: MSFT quote page (close of 27 Oct 2026)", "https://www.fool.com/quote/NASDAQ/MSFT"],
  quartz: ["Quartz citing FactSet: Ballmer can afford the Clippers (30 May 2014)", "https://qz.com/215138/steve-ballmer-can-easily-afford-the-la-clippers-because-he-fired-himself-from-microsoft"],
  cbsdiv: ["CBS News: Money to burn (2004)", "https://www.cbsnews.com/news/money-to-burn"],
  msdiv: ["Microsoft: Quarterly dividend, buyback and special dividend (20 Jul 2004)", "https://news.microsoft.com/source/2004/07/20/microsoft-outlines-quarterly-dividend-four-year-stock-buyback-plan-and-special-dividend-to-shareholders/"],
  eweekappeal: ["eWeek: Appeals court kicks back Microsoft break-up order (2001)", "https://www.eweek.com/news/appeals-court-kicks-back-microsoft-break-up-order/"],
  iweu: ["InformationWeek: Timeline, EU's pursuit of Microsoft", "https://www.informationweek.com/software-services/timeline-eu-s-pursuit-of-microsoft"],
  foxeu: ["Fox News: Timeline, EU case against Microsoft", "https://www.foxnews.com/story/timeline-eu-case-against-microsoft.amp"],
  lucovsky: ["NBC News: Microsoft, Google trade barbs over top exec (Sep 2005)", "https://www.nbcnews.com/news/amp/wbna9187279"],
};

const order = [];
const s = (...keys) =>
  keys.map((k) => {
    if (!SRC[k]) throw new Error("unknown source " + k);
    let i = order.indexOf(k);
    if (i < 0) { order.push(k); i = order.length - 1; }
    return i;
  });

const p = (text, ...k) => ({ t: "p", text, src: s(...k) });
const h = (text) => ({ t: "h", text });
const note = (text) => ({ t: "note", text });
const ex = (text, ...k) => ({ t: "example", text, src: s(...k) });
const facts = (...items) => ({ t: "facts", items: items.map(([value, label, ...k]) => ({ value, label, src: s(...k) })) });
const tl = (...items) => ({ t: "timeline", items: items.map(([when, text, ...k]) => ({ when, text, src: s(...k) })) });
const v = (name, years, outcome, f, ...k) => ({ t: "venture", name, years, outcome, ...f, src: s(...k) });

// ---------------------------------------------------------------- CHAPTER 1
const everyCompany = {
  id: "every-company",
  kicker: "The complete list",
  title: "Every bet, every flop",
  blocks: [
    p(`Steve Ballmer never founded Microsoft, and he has never pretended he did. He has still said he thinks of himself as a founder, because he arrived so early and personally recruited nearly every senior leader. So this list looks different from a normal founder's list. Most of it is what he built, bought or killed inside a giant company. The rest is what he did with the money afterwards.`, "acquired"),
    p(`One honest warning before the list. For projects inside Microsoft, the answer to where the first money came from is nearly always the same: the profits of Windows and Office. By late 1999 Microsoft was generating about ==$1.5 billion in cash every month==. __That cash let Ballmer survive mistakes that would have killed any startup, and it also made those mistakes easier to repeat.__`, "gamesbeat"),
    note(`Read the flops slowly. They cost more than most companies ever earn.`),
    facts(
      ["$14.7B", "Written off on three Ballmer-era bets: aQuantive $6.2B, Nokia $7.6B, Surface RT $0.9B (our own addition)", "blunders", "cwnokia", "sec13"],
      ["3.4x", "Growth in Microsoft's annual revenue during his time as CEO: $22.96B in fiscal 2000 to $77.85B in fiscal 2013", "fy2000", "sec13"],
      ["6 weeks", "How long the Kin phone lasted on sale, the shortest life of any Microsoft product up to then", "kin"],
    ),

    h("The years he worked for Bill Gates, 1980 to 1999"),
    v("Microsoft (employee, then No. 2, then CEO)", "1980–2014", "public", {
      idea: `Microsoft sold software for the new small computers. Paul Allen's push, as Ballmer tells it, was to write all the software those machines would ever need. What the young company lacked was anyone to run the business side: money, hiring and customers. That was the gap Ballmer was hired to fill.`,
      decision: `He was at Stanford's business school when Bill Gates, his friend from Harvard, persuaded him to leave. Accounts differ on the bait, but Gates writes in his memoir that he gave up 4% of Microsoft from his own holdings to get him. Ballmer was going to give up an MBA for a company of about 30 people. He has said he almost quit after four or five weeks.`,
      howStarted: `He joined in June 1980 as employee No. 30 and the company's first business manager. One account gives his deal as a $50,000 salary plus 10% of any profit growth he generated, later swapped for shares. His first big proposal was to hire 50 to 60 more people, and Gates reacted by saying he would bankrupt the company.`,
      funding: `There was almost no outside money. In 1981 Technology Venture Investors put in $1 million for 5%, which was Microsoft's only venture capital (money from professional investors who buy a slice of a young company). The stock market listing in March 1986 raised $61 million. Ballmer's own stake was 8% when Microsoft became a corporation in 1981.`,
      whatHappened: `He ran hiring, then systems software, then worldwide sales, then the whole company from January 2000. In his last full year as CEO, Microsoft made $77.85 billion in revenue and $21.86 billion in profit. Profit had been $9.42 billion in fiscal 2000. Yet the share price at the end of 2013 was lower than on his first day as chief executive.`,
      lesson: `An early non-founder job with real equity can beat founding your own company. Ask for ownership, not only salary.`,
    }, "acquired", "entre", "forbes", "benzinga", "enc", "rfb", "tvi", "geekwire50", "nwipo", "fy2000", "sec13", "regfinal"),
    note(`Employee No. 30 passed Bill Gates on Bloomberg's rich list in 2024.`),
    v("Windows 1.0", "1984–1985", "running", {
      idea: `Put pictures, menus and a mouse on top of the plain text-based system most IBM-style PCs used. Apple's Macintosh had shown how good that could feel. Microsoft's bet was different: its version would run on the huge base of ordinary PCs.`,
      decision: `Microsoft announced Windows in November 1983, long before it worked. The project stalled in clashes over how it should behave, and critics began calling it vaporware, meaning a product that is promised but never arrives. In August 1984 Ballmer was put in charge of a new systems software group. He has said he took over managing the engineers because the person doing it was not succeeding.`,
      howStarted: `The team worked out of Microsoft's offices in Bellevue, Washington. Most were in their twenties, and a few were teenagers. Ballmer, in his late twenties, was one of the older people in the room, and he says the engineers had to teach him how to manage them. When one printer specialist joined in August 1984, not a single printer driver existed.`,
      funding: `Microsoft's own revenue. The company had taken just $1 million in venture money and would not go public until 1986.`,
      whatHappened: `Gates pushed him to get it done before the winter snow of 1985. It shipped on 20 November 1985, about two years after the announcement. Critics preferred the Mac, and it was Windows 3.1 that became the breakout hit. At a 40th reunion in December 2025, Ballmer told the old team this was the project that made him proudest.`,
      lesson: `A weak first version is fine if it gets you on the field. Windows took three major tries to matter.`,
    }, "seattle92", "geekwire10", "acquired", "nwipo"),
    ex(`For example: the Windows 1.0 team secretly hid their names in the code as a credits screen. As the story goes, Gates stumbled on it by slamming his fists on the keyboard because the system was so slow. They hid it better. Nobody outside noticed it until a researcher found it in 2022.`, "geekwire10"),
    v("OS/2, the joint project with IBM", "1985–1991", "shut", {
      idea: `A new operating system (the core software that runs a computer) built together by Microsoft and IBM. It was meant to replace DOS, the system Microsoft had licensed to IBM for its first PC.`,
      decision: `IBM was so dominant that Microsoft felt it could not refuse. Ballmer's phrase for it was riding the bear: stay on, or get trampled. He became the project's loudest champion, thumping his fist and repeating its name in meetings. Microsoft quietly kept working on Windows at the same time.`,
      howStarted: `The setup was messy. IBM got rights close to ownership over code Microsoft wrote, and parts were built in South Florida, England and Texas. With no real email, disks were physically shipped back and forth. Ballmer once made 16 East Coast trips in 16 weeks, flying overnight, working all day and flying home.`,
      funding: `Each company paid for its own work under a joint development agreement. Microsoft's share came from its own revenue.`,
      whatHappened: `IBM decided to fold Windows inside OS/2, which would have made Windows secondary and hurt Microsoft's DOS income. At a meeting in March 1991 Ballmer said it would not work and promised to eat a floppy disk if it did. The partnership ended. Microsoft's version of OS/2 was renamed Windows NT, and by April 1992 Windows had sold about 10 million copies against 1 million for OS/2.`,
      lesson: `Work with the giant, but never stop building the thing you would own if the giant walked away.`,
    }, "seattle92", "acquired"),
    v("The enterprise sales machine and the Enterprise Agreement", "1992–late 2000s", "running", {
      idea: `Sell software to whole companies through their IT departments, not one box at a time in a shop. An enterprise, in this sense, is any organisation big enough to have an IT team making the decisions.`,
      decision: `Ballmer has said this was not where Gates's passion lay, and he volunteered for it. His reason was fear: he believed IBM could squash Microsoft unless it could also sell to businesses. He moved to run worldwide sales and support in early 1992. Microsoft's revenue then rose by about $1 billion a year until 1995.`,
      howStarted: `Early customers were scattered. By Ballmer's memory, Microsoft's first big Windows customer was the US Air Force, buying single copies. Then came a pilot where Microsoft ran the IT systems of the battery maker Energizer, an idea he credits to Gates. He has called that the seed of what later became cloud services.`,
      funding: `Internal. It was paid for by Windows and Office sales, and the sales team was built on those profits.`,
      whatHappened: `He spotted a trap in the old licences: upgrades cost less than half of new licences, so revenue would shrink as customers upgraded. The fix was a three-year deal, priced per computer, with the same payment each year. That gave Microsoft recurring revenue long before the cloud. As late as 2007 or 2008 some customers still told him Microsoft was not a real enterprise supplier.`,
      lesson: `Look at where your revenue is heading in five years, not where it is today, and change the pricing before it hurts.`,
    }, "acquired", "seattle92", "rfb", "enc", "regfinal"),
    note(`This boring licence may be worth more than every flashy product here.`),
    v("Avanade", "2000–present", "running", {
      idea: `A consulting company to help large businesses install Microsoft's server and email software. Microsoft's own consulting work was small, and it needed partners who knew how to set all this up.`,
      decision: `Ballmer has said Microsoft simply lacked the capacity and needed help from partners. Rather than build a big consulting arm itself, it went in with Andersen Consulting, the firm that later became Accenture. Ballmer also joined Accenture's board.`,
      howStarted: `It was announced in March 2000 and based in Seattle, with a plan to hire more than 3,000 people in two years. The name was made by joining the words avenue and promenade.`,
      funding: `Microsoft put in $385 million in cash. Andersen's share was mostly sweat equity, meaning training, services and know-how rather than money.`,
      whatHappened: `The forecast was $1 billion in yearly revenue within three years. The company survived and grew, and Accenture ended up as its majority owner, with reported ownership splits varying over time.`,
      lesson: `If customers need a skill you do not have, a partner can be faster than hiring for it.`,
    }, "avanade", "acquired", "wikiavanade"),

    h("The bets he made as CEO, 2000 to 2014"),
    p(`He became chief executive on 13 January 2000, with Gates staying on as chief software architect. From here on, every big decision below went through him. Some were his own idea. Some, like Xbox and Zune, were run by others but were his to fund and his to answer for. He has said Microsoft spread itself across too many new things and should have picked one or two.`, "regfinal", "acquired"),
    v("Xbox", "2000–present", "running", {
      idea: `A game console for the living room, built because Sony's PlayStation looked set to become the home computer of the future.`,
      decision: `On 21 December 1999 the general manager told Gates the project would lose $900 million over eight years, or $3.3 billion in a price war with Sony. At a marathon review on 14 February 2000, known inside as the Valentine's Day Massacre, Gates was furious that the design had dropped Windows. Ballmer walked through the expected losses. According to the people present, what moved the two men in the end was the threat from Sony.`,
      howStarted: `About 60 people were on the project by the end of 1999. It was a closed machine that did one thing well: run games. Ballmer's closing view in that review was that once they said yes, they would never reopen the question and would back the team.`,
      funding: `Microsoft's cash pile of about $30 billion, compared with about $5 billion at Sony and $7 billion at Nintendo at the time.`,
      whatHappened: `In 2007 widespread Xbox 360 failures forced a charge of up to $1.15 billion and a three-year warranty. One independent analyst estimated the division had lost more than $6 billion since 2002. Ballmer later said he felt bad about the cost, but that it had built a real asset. Today he calls gaming half a trick, his term for a business that is valuable but not quite a separate engine.`,
      lesson: `If you enter a market to protect your future, decide up front how much loss you will accept, then stop arguing.`,
    }, "gamesbeat", "gamespot", "nbcxbox", "toms", "acquired"),
    ex(`For example: Xbox executive Peter Moore recalled trembling as he told Ballmer the fix for the failing consoles would cost $1.15 billion, including $240 million just for FedEx shipping. By Moore's account, Ballmer approved it on the spot, without hesitating, and the share price barely moved.`, "kitguru"),
    v("Longhorn, which became Windows Vista", "2001–2007", "failed", {
      idea: `The huge next version of Windows after XP. It was supposed to rebuild large parts of the system at once.`,
      decision: `Ballmer says he stayed very deferential to Gates on product direction after becoming CEO. He had a bad feeling but did not fight it. He now says the project had the wrong technical approach from the start and that nobody was willing to say out loud that it was not working.`,
      howStarted: `It was run from inside Windows by the top technical leaders, with Gates as chief software architect. In January 2004 the Windows chief, Jim Allchin, emailed Gates and Ballmer to say he would buy a Mac if he did not work at Microsoft, as a way of forcing change.`,
      funding: `Microsoft's Windows and Office profits, plus years of its best engineers' time.`,
      whatHappened: `In mid-2004 the team reset the project, essentially starting over. Vista reached consumers on 30 January 2007, five years after XP, when the aim had been three. Ballmer has called it the thing he regrets most and the single biggest mistake of his time as CEO. His sharpest point: for seven or eight years it tied up many of the best people who could have been working on phones.`,
      lesson: `The real cost of a failed project is the thing those people did not build instead.`,
    }, "acquired", "nwallchin", "itproallchin", "neowinregret", "toms"),
    note(`Read this twice: the Vista delay and the iPhone arrived in the same month.`),
    v("Windows Mobile and Windows Phone", "2000s–2020", "shut", {
      idea: `Put Windows on phones and charge phone makers a licence, the same model that had worked on PCs.`,
      decision: `Ballmer has admitted the company treated phones as an extension of Windows when they were really a new business. Microsoft even had a slide saying Windows everywhere. It kept a PC-style interface on a device that needed something else.`,
      howStarted: `It was built inside Microsoft, and he says it was held back by the rules of Windows even when it was organised as a separate team. Windows Phone 7, the rebuild, arrived in October 2010, more than three years after the iPhone.`,
      funding: `Internal. From 2011 Microsoft also paid Nokia $1 billion to drop its own Symbian system and use Windows Phone.`,
      whatHappened: `Around Christmas 2008 or 2009, by his memory, the carrier Verizon needed an answer to the iPhone and would have taken Microsoft's product. Microsoft was not ready, and Verizon went with Android. Only two models worked in phones, he says: Apple's hardware profits, and Google's free software paid for by search ads. Microsoft had neither. Support for its last phone system ended on 14 January 2020.`,
      lesson: `If a new market needs a different business model, your old model is a handicap, not an advantage.`,
    }, "acquired", "blunders", "w10m"),
    v("Zune", "2006–2012", "shut", {
      idea: `A music player and online service to take on Apple's iPod.`,
      decision: `It was part of the push to make Microsoft matter to ordinary consumers, run by the entertainment and devices division under Robbie Bach and J Allard.`,
      howStarted: `It launched in the US in November 2006 and followed the iPod into a market Apple already owned.`,
      funding: `Internal, from the budget of the entertainment and devices division, which was still unprofitable in 2007.`,
      whatHappened: `In the 2008 holiday quarter, Zune revenue fell by $100 million, or 54%. Bach and Allard left in the 2010 shake-up. In March 2011 Bloomberg reported that no new players were planned, and the hardware was formally ended in October 2011. Ballmer's verdict: it was a caboose, his word for something that gets pulled along but can never pull the train.`,
      lesson: `Chasing a leader with a similar product rarely wins. Find a real engine, not one more carriage.`,
    }, "wikizune", "zunecbs", "eweekzune", "nbcxbox", "acquired"),
    v("Kin", "2010", "shut", {
      idea: `Two social networking phones aimed at young people, built around messaging, feeds and photos.`,
      decision: `It was the last big project of Robbie Bach's division. It was developed in parallel with Windows Phone 7, not as part of it.`,
      howStarted: `Unveiled in April 2010 and sold through Verizon from May at $49.99 and $99.99, with a data plan required. You could not install apps on it.`,
      funding: `Internal, from the same entertainment and devices division.`,
      whatHappened: `Verizon halved the prices within weeks. Microsoft killed it about six weeks after launch and moved the team over to Windows Phone 7. It was the shortest product life in Microsoft's 35-year history at that point. A month earlier, Ballmer had broken up the division that made it, and Bach and Allard were gone.`,
      lesson: `Two teams inside one company chasing the same customer usually means both ship late or one ships nothing that matters.`,
    }, "kin", "infoweek", "eweekzune"),
    v("aQuantive", "2007–2012", "failed", {
      idea: `Buy an online advertising company so Microsoft could finally earn the kind of ad money Google was earning.`,
      decision: `It was partly a defensive move. Google had just bought the ad company DoubleClick for $3.1 billion, and Ballmer worried about falling further behind.`,
      howStarted: `Microsoft bought aQuantive in 2007 and folded it into its online services business. Its chief executive, Brian McAndrews, left about a year later.`,
      funding: `Microsoft paid $6.3 billion from its own resources.`,
      whatHappened: `In July 2012 Microsoft wrote down $6.2 billion, which means admitting on its books that nearly all the money was gone. That produced a net loss of $492 million for the quarter, the first quarterly loss in its history as a public company.`,
      lesson: `Never buy a company mainly because your rival just bought something similar.`,
    }, "blunders"),
    v("Search: Windows Live Search, then Bing", "2003–present", "running", {
      idea: `Build a search engine and sell ads against it, so that Google did not own the most profitable new business on the internet.`,
      decision: `Ballmer has said Microsoft jumped in around 2003, about five years after Google began. Before that he and Gates spent too long debating whether special sites for travel, cars and local news mattered more than general search.`,
      howStarted: `There was almost no talent available. He says the people who knew search had been hired by Google, so Microsoft drew on Microsoft Research and moved staff from other teams. The product was first tied to the Windows Live brand. It was relaunched as Bing in 2009.`,
      funding: `Internal, and it was very expensive. Over eight years the online services unit lost $11.78 billion, an average of nearly $1.5 billion a year.`,
      whatHappened: `Bing never came close to catching Google. Ballmer counts it as a miss, but he points to a hidden payoff: running search taught Microsoft how to operate at internet scale, and that skill later fed the cloud. Once Microsoft stopped reporting online services as a separate unit, its losses became harder to see.`,
      lesson: `A failed attack can still build a skill you need later. Be honest about which one you actually got.`,
    }, "acquired", "itproyahoo", "blunders"),
    p(`Two near-misses sit between these bets. In October 2007 Microsoft paid $240 million for a small piece of Facebook at a $15 billion valuation, about 1.6% by simple division, and became its exclusive outside ad platform, including overseas. He later said social networking was never the miss that hurt him. And in a sworn 2005 court statement, the engineer Mark Lucovsky said that when he announced he was leaving for Google, Ballmer threw a chair and vowed to crush the company. Ballmer called that account a gross exaggeration.`, "fb07", "acquired", "lucovsky"),
    v("The Yahoo takeover attempt", "2008", "failed", {
      idea: `Buy Yahoo outright and combine it with Microsoft's online business to create a real number two to Google.`,
      decision: `Ballmer has described Yahoo and a phone company as his two big shots at a consumer future. He called Yahoo's chief, Jerry Yang, on 31 January 2008 and went public the next day, offering $31 a share.`,
      howStarted: `It was an unsolicited bid, meaning Yahoo had not asked for it. Yahoo's leaders moved quickly to block it and looked for other partners. Microsoft threatened to go directly to Yahoo's shareholders.`,
      funding: `$44.6 billion, half in cash and half in Microsoft stock. It later rose by about $5 billion to $33 a share.`,
      whatHappened: `Yahoo wanted more, and Ballmer walked away in May 2008. A year later the two signed a search deal that put Bing inside Yahoo. In 2011 he said he had been lucky, because the deal would have closed right as Lehman Brothers collapsed. In 2017 Yahoo's core business sold to Verizon for about $4.48 billion, roughly a tenth of his first offer.`,
      lesson: `Walking away from a price is a real decision. Sometimes it is the best deal of the decade.`,
    }, "acquired", "inetyahoo", "ajyahoo", "itproyahoo", "lucky", "verizon"),
    v("Skype", "2011–2025", "shut", {
      idea: `Buy the world's best-known internet calling service and connect it to Microsoft's products.`,
      decision: `In 2011 Ballmer described it as the tool for people's closest relationships, part of how Microsoft would answer social networks without building one.`,
      howStarted: `Skype was a working business with around 150 million monthly users when Microsoft bought it.`,
      funding: `$8.5 billion, from Microsoft's own balance sheet.`,
      whatHappened: `Its technology did not suit the smartphone era. By 2020, as Zoom surged, Skype was down to roughly 23 million monthly users. Microsoft built Teams separately in 2017 and retired Skype on 5 May 2025.`,
      lesson: `Buying users does not protect you if the technology underneath is built for the last era.`,
    }, "skype", "lucky"),
    v("Azure, the cloud", "2005–present", "running", {
      idea: `Rent computing power over the internet, so customers would stop running their own server rooms. The cloud simply means software and storage living in someone else's giant data centres.`,
      decision: `Around 2005 or 2006, with Amazon's AWS getting started, Ballmer decided Microsoft needed a platform of its own. He pulled in Dave Cutler, the legendary engineer behind Windows NT, and Amitabh Srivastava from Microsoft Research. He kept it outside the existing server group so the new baby would not be smothered by the old business.`,
      howStarted: `It began as an incubation under Ray Ozzie. Cutler brought his own favourite engineers. One early choice was to offer a Windows-centred platform for developers first, and not simply rent raw machines, which Ballmer admits came partly from thinking Windows first.`,
      funding: `Internal, paid for by the existing businesses. He warned investors that cloud margins would be lower but that volume would make up for it.`,
      whatHappened: `Parts of the company resisted. So on 4 March 2010 he told a University of Washington audience that Microsoft was all in, partly as a message to his own staff. By the time he left it had only some momentum, he says. In fiscal 2025 Microsoft first disclosed Azure's size at over $75 billion a year, and in fiscal 2026 it passed $100 billion.`,
      lesson: `Protect a new idea from your own best business, and expect about eight years before it looks obvious.`,
    }, "acquired", "allin", "azure75", "fy26"),
    note(`His biggest win took eight years to show. Remember this when you feel slow.`),
    v("Surface", "2012–present", "running", {
      idea: `Microsoft's own high-end computers. Ballmer felt PC makers would never build premium machines that could compete with Mac in coffee shops and schools.`,
      decision: `He says he had to break the old model, in which Microsoft only licensed software to hardware companies. It meant competing with its own customers. Surface was also a major disagreement with Gates.`,
      howStarted: `He unveiled it himself at a press event in Los Angeles on 18 June 2012, as a challenge to Apple's iPad.`,
      funding: `Internal. He had started building a hardware design team earlier, for Xbox, Surface and phones.`,
      whatHappened: `The Surface RT model sold poorly. In July 2013 Microsoft took a $900 million charge on unsold stock, and the shares fell about 11%. Surface remained a Microsoft product line. The surprise is the side effect: he says the hardware skills built for those gadgets now matter most in Azure data centres.`,
      lesson: `Build skills ahead of need. Sometimes the skill outlives the product and pays off somewhere you never planned.`,
    }, "acquired", "surface12", "sec13", "smart"),
    v("Nokia's phone business", "2011–2016", "failed", {
      idea: `Own a phone maker outright and capture the hardware profit, since Microsoft could not match Google's advertising money.`,
      decision: `He had looked at buying a phone maker for years, including three or four trips to Taiwan to study HTC, before deciding that integration would be too hard. Nokia's partnership could not work financially, he says, because Nokia lacked the money to compete and Microsoft could not earn back what it spent. Gates and Nadella were among those initially opposed.`,
      howStarted: `A 2011 partnership had already made Windows Phone Nokia's exclusive smartphone system. With that deal running out in 2014 and Nokia hinting at Android, Ballmer asked the board to buy the business.`,
      funding: `EUR 5.44 billion in cash, or about $7.2 billion when announced on 3 September 2013. It came to approximately $7.9 billion at closing in April 2014, with about 32,000 people expected to transfer.`,
      whatHappened: `The deal closed after he had already announced his exit. In July 2014 his successor announced 18,000 job cuts, most from the Nokia side. In July 2015 Microsoft wrote off $7.6 billion and cut another 7,800 jobs. In May 2016 it sold the basic-phone business for $350 million.`,
      lesson: `A last big bet from a leader on the way out deserves extra suspicion, including from that leader.`,
    }, "acquired", "blunders", "itproboard", "techspot", "bi", "techradarnok", "msnokia", "cwnokia", "fih"),

    h("The bets with his own money, 2013 onward"),
    p(`Now the money is his. These last ventures are the ones most like a normal investor's list, and they are also the most personal. He told one interviewer that outside Microsoft his fortune is mostly the Clippers, the arena and plain index funds, with one business he backed for an old friend. __Almost everyone at his level runs a big, busy investment office. Ballmer mostly doesn't.__`, "acquired"),
    v("Sacramento Kings bid, to bring the NBA back to Seattle", "2013", "failed", {
      idea: `Buy a basketball team and move it to Seattle, which had lost the SuperSonics to Oklahoma City in 2008. Ballmer had been going to Sonics games since at least the early 1990s.`,
      decision: `He teamed up with the hedge fund manager Chris Hansen, while he was still running Microsoft. They planned to rename the team the SuperSonics.`,
      howStarted: `In January 2013 the group agreed to buy 65% of the Kings from the Maloof family for a reported $341 million.`,
      funding: `Private money from Hansen, Ballmer and other investors. Offers were raised several times, reaching a team valuation of $625 million.`,
      whatHappened: `Sacramento's mayor, the former NBA player Kevin Johnson, answered with a new arena plan and a rival investor group. The league's relocation committee voted against the move in April, and on 15 May 2013 the owners voted 22 to 8 to keep the Kings in Sacramento. Ballmer stayed in Seattle that day, hosting a conference of chief executives.`,
      lesson: `Money alone does not win when a local community organises. Local politics can beat a higher bid.`,
    }, "kingsfox", "kingsgw", "kingsnw", "seattle92"),
    v("Los Angeles Clippers", "2014–present", "running", {
      idea: `Own an NBA team outright, and turn one of the league's weakest brands into something serious.`,
      decision: `The team came up for sale after the NBA banned Donald Sterling for life over racist remarks on a leaked recording. Ballmer did not seek partners. He opened at $1.8 billion and went to $2 billion in a single day.`,
      howStarted: `He beat a $1.6 billion group led by David Geffen with Larry Ellison and Oprah Winfrey, and a $1.2 billion Los Angeles group. Sterling, who had paid $12 million in 1981, sued to stop the sale and lost. A probate judge cleared Shelly Sterling to sell, and the deal closed in August 2014.`,
      funding: `His own wealth. He says he borrowed at first because he did not want to sell shares, and that the loan was later paid off.`,
      whatHappened: `The previous NBA record was $550 million, paid weeks earlier for the Milwaukee Bucks. He was criticised for overpaying. Forbes now values the team at $7.5 billion and Sportico at $6.72 billion. He has said team values are safer than Microsoft stock, as there are few teams and more rich buyers each year. On the court, the team still had not reached the Finals when its new arena opened in 2024.`,
      lesson: `For a rare asset, the price that looks insane today can look cheap in ten years, but only if you never need to sell.`,
    }, "reutersclip", "wrapclip", "apclip", "sterlingdrop", "acquired", "forbes", "sportico", "fosdome"),
    note(`$12 million in 1981. $2 billion in 2014. Forbes says $7.5 billion today.`),
    v("The Forum, Inglewood", "2020–present", "running", {
      idea: `Buy the famous concert arena next to his planned new stadium.`,
      decision: `Madison Square Garden Co., which owned the Forum and is led by Knicks owner James Dolan, had sued for over a year to block the Clippers' arena nearby. Buying the building was the way to end the fight.`,
      howStarted: `The purchase was announced in March 2020 and went through a new company called CAPSS LLC.`,
      funding: `$400 million, reported as an all-cash deal.`,
      whatHappened: `The sale completed in 2020, and the lawsuits stopped being an obstacle. The Forum carried on as a music venue, so he gained a second arena business while clearing the way for his own.`,
      lesson: `Sometimes buying your opponent's asset is cheaper than beating them in court for years.`,
    }, "wrapforum", "skyforum"),
    v("Intuit Dome", "2021–present", "running", {
      idea: `A basketball-only arena built for hardcore fans, so the Clippers could stop sharing a building with the Lakers after 25 years.`,
      decision: `He has called it the product he had the clearest vision for in his whole career. He designed it for fans like himself and did not survey the market. He refused hockey, because a rink would push seats further from the court, and he gave up suites along one side.`,
      howStarted: `Construction started in 2021 in Inglewood, California. It seats 18,000 and has one side called the Wall: 51 unbroken rows and about 4,000 seats, where visiting team gear is not allowed.`,
      funding: `No public money, since he says California does not allow it for arenas. He paid for it with a loan on the building, stock-backed borrowing that he pays down with dividends, and a 23-year naming deal with Intuit worth about $500 million. He also pledged $100 million to Inglewood.`,
      whatHappened: `It opened on 15 August 2024 at a cost of about $2 billion. It has an acre of scoreboard and 1,160 toilets, three times the NBA average. He says visiting players now shoot worse at free throws there than anywhere else in the league. Student section seats cost $1,000 a season.`,
      lesson: `When you know one customer deeply, build for that person. It is the opposite of asking everyone what they want.`,
    }, "fosdome", "cnbcintuit", "wrapforum", "acquired"),
    ex(`For example: Ballmer put debt on the building on purpose, for a reason most teenagers would never guess. A future buyer pays less cash up front for a building that already carries a loan, so more people can afford it. That makes the asset easier to sell someday, even though he has no plan to sell it himself.`, "acquired"),
    p(`He also made one public stock bet. In October 2015 he announced he had bought 4% of Twitter over the previous few months, as a vote of confidence in Jack Dorsey's return as chief executive. We could not find a reliable record of when or how he exited, so it does not get its own entry here.`, "twitter"),
    v("Stagwell", "2015–present", "merged", {
      idea: `Build a modern marketing group using data and digital tools, to challenge giant old ad agencies.`,
      decision: `Mark Penn was Ballmer's old college acquaintance and had worked at Microsoft as its chief strategy officer. Ballmer has described Stagwell as the one business he backed with money that is not in index funds.`,
      howStarted: `Penn founded it in 2015 in Washington, DC, and it grew by buying marketing firms.`,
      funding: `$250 million of starting capital from Ballmer and Penn.`,
      whatHappened: `In 2019 Stagwell put $100 million into the older ad group MDC Partners, and Penn became its chief executive. In August 2021 the two combined to form Stagwell Inc., listed on Nasdaq. Stagwell's side held about 69%, and Ballmer stayed in as a limited partner, meaning an investor who does not run the business.`,
      lesson: `Backing one person you have known for decades is a smaller risk than backing a good pitch from a stranger.`,
    }, "acquired", "medialeader", "itproboard", "stagbw", "axiosstag"),
    v("USAFacts", "2017–present", "running", {
      idea: `A plain website showing what US governments actually collect and spend, in the form of a company's annual report.`,
      decision: `He had spent his career reading financial statements and wanted the same clarity for government. He deliberately keeps it non-partisan and leaves out opinions.`,
      howStarted: `It launched on Tax Day, 18 April 2017, built by researchers in Seattle along with a grant to the University of Pennsylvania.`,
      funding: `Ballmer told The New York Times he had spent $10 million by launch. He and his wife, Connie Ballmer, fund it.`,
      whatHappened: `It runs as a data source and is legally separate from Ballmer Group, his philanthropy. It is one project where he has spent money to explain numbers, not to earn from them.`,
      lesson: `Clear numbers are a product. People use them when no one else bothers to organise them.`,
    }, "gwusa", "cnnusa", "wikiusa"),
    v("Ballmer Group", "2015–present", "running", {
      idea: `Philanthropy aimed at economic mobility for children and families in the United States, founded with his wife, Connie Ballmer.`,
      decision: `The dollar value of the couple's giving ramped up after he left Microsoft. It was this that first made him think hard about selling his shares.`,
      howStarted: `It operates from an office in Bellevue, Washington, staffed partly by ex-Microsoft people.`,
      funding: `Dividends on his shares, plus some asset sales and gifts into a donor-advised fund, which is an account that holds money set aside for charity.`,
      whatHappened: `He says the giving is close to what the dividend cheques bring in. Forbes puts the couple's total giving at more than $7.4 billion so far.`,
      lesson: `Decide what your money is for, because that decision changes what you do with your assets.`,
    }, "ballmergroup", "acquired", "forbes"),
    v("Aspiration", "2021–2025", "failed", {
      idea: `An environmentally focused digital bank, founded in 2013 by Joe Sanberg and backed by Hollywood names.`,
      decision: `Ballmer invested, and in September 2021 the Clippers announced a 23-year, $300 million partnership with it, covering the arena and the jersey patch. He has said Aspiration even offered more than Intuit for the arena's name.`,
      howStarted: `He was an investor, and his team was its sponsorship partner. He was not a founder. He says he introduced Aspiration to Kawhi Leonard in November 2021 at its request, which he says the rules allowed.`,
      funding: `$60 million of his own money, all of which his lawyer says he lost.`,
      whatHappened: `Aspiration went bankrupt in 2025. Sanberg pleaded guilty to wire fraud covering at least $248 million and was sentenced to 14 years in June 2026. Ballmer says he was fooled. The NBA's investigation then found rule-breaking by the Clippers themselves, a story told in the last chapter.`,
      lesson: `When a company you fund also does deals with your star, you own that risk, whatever you believed.`,
    }, "espnsanberg", "abc25", "abcnba"),
  ],
};

// ---------------------------------------------------------------- CHAPTER 2
const ridingBear = {
  id: "riding-the-bear",
  kicker: "1980–1999",
  title: "Riding the bear",
  blocks: [
    p(`Picture the first month. Ballmer is 24, fresh out of a business school he has abandoned, inside a tiny software company in the Seattle area. He looks at how overworked everyone is and tells Bill Gates to hire 50 or 60 more people. Gates explodes and says this will bankrupt the company.`, "enc", "forbes"),
    p(`Ballmer later said he nearly quit around that time, at four or five weeks in. They had another big fight a year later, about money. He has described the relationship as never smooth, and as a large part of what built Microsoft. __Their fights were the system: one pushed the product, the other pushed the business.__`, "acquired"),
    note(`He was 24. He nearly walked away from a stake now worth billions.`),
    p(`Then IBM called. Shortly after he joined, men from the most powerful computer company on earth asked to visit, but only after Microsoft signed a one-sided secrecy agreement. They wanted to build a personal computer and hoped to get an operating system. Microsoft did not actually have one, so it sent them to Digital Research. When that fell through, Paul Allen and Ballmer went to see a small local firm called Seattle Computer Products.`, "acquired"),
    p(`By his memory, they paid ==$45,000 or $49,000== for the system that became MS-DOS. IBM paid a one-time fee, not a charge per computer, and the deal let Microsoft sell the same software to other PC makers. Ballmer says that for several years Microsoft still charged fixed prices and acted more like a hired research department. He also says this was a big dose of luck, and that nobody in the room saw what it would become.`, "acquired"),
    ex(`For example: years later Intel's Andy Grove predicted the world would soon buy 100 million PCs a year. Ballmer and Gates laughed and thought he was crazy. They still invested as if he might be right, just in case. Ballmer says they consistently underestimated how big their own market would be.`, "acquired"),
    p(`For most of the 1980s, Microsoft did not feel powerful. Ballmer says the mood lasted well into the 1990s, even as Windows and Office took off. Inside the company they called IBM the bear, and their strategy was simple: hang on, because letting go meant being trampled. He kept that fear for a very long time. It explains a lot about the aggressive way Microsoft later behaved.`, "acquired"),
    h("Going public, nervously"),
    p(`An IPO, or initial public offering, is when a private company first sells its shares to anyone on the stock market. Microsoft was not desperate for the money. It was nearing the legal limit on how many shareholders a private company could have, which would have forced it to file public reports anyway. Gates saw the whole thing as a pain.`, "nwipo"),
    p(`During ten hours of questions from bankers, the Microsoft team kept being more pessimistic than the people interrogating them. Fortune's account says Ballmer listed so many ways the company could die that one banker joked he would not want to hear him on a bad day. Gates even fought for a lower price range than the bankers suggested. The shares sold at ==$21== on 13 March 1986, raised $61 million and opened at $25.75.`, "nwipo"),
    facts(
      ["$61M", "Raised by Microsoft's IPO, 13 March 1986", "nwipo"],
      ["$1M", "The only venture capital before the IPO, from TVI in 1981, for 5%", "tvi", "geekwire50"],
      ["11 days", "The gap between the IPO and Ballmer's 30th birthday on 24 March 1986. He was already a multimillionaire.", "rfb", "nwipo"],
    ),
    note(`Very important for first-time founders: Microsoft barely needed outside money. It sold software.`),
    p(`The shares made him rich, but the hardest years with IBM were still ahead. In 1987 he became Microsoft's main voice for OS/2, and he held hope in the partnership right up to the break. He has told two versions of the moment it ended. In 1992 he described a tense meeting at Microsoft's headquarters in March 1991. In 2025 he recalled stopping on a morning run with his wife around May 1990, picking up The Wall Street Journal and reading that IBM was divorcing Microsoft.`, "seattle92", "acquired"),
    p(`Either way, his reaction was fear and energy in equal parts. Microsoft now had to fight the bear with no customers at big companies. IBM owned those relationships. He had also already hired Dave Cutler from Digital Equipment, who at first refused to work on toy operating systems. Ballmer's answer, in his own telling, was that this was fine, because Microsoft did have a toy operating system and needed Cutler to build a real one.`, "acquired"),
    p(`So in 1992, as head of worldwide sales and support, he began the slow work of selling to companies. His energy was a management tool, and it had a physical cost. In one well-known episode he shouted so hard in meetings that he damaged his vocal cords and needed surgery. Colleagues said a session with him made them want to run through walls. A software newsletter publisher warned people not to mistake the noise for the whole man, since branding and pricing were largely his work.`, "seattle92", "enc"),
    tl(
      ["1980", "Joins as employee No. 30. Fights with Gates over hiring within weeks.", "forbes", "enc", "acquired"],
      ["1981", "Microsoft incorporates. He owns 8%. TVI invests $1 million for 5%.", "rfb", "tvi"],
      ["1984", "Named to head systems software and takes over the stalled Windows project.", "seattle92"],
      ["1985", "Windows 1.0 ships on 20 November.", "geekwire10"],
      ["1986", "IPO at $21 a share raises $61 million.", "nwipo"],
      ["1987–1991", "Leads OS/2 with IBM until the relationship collapses.", "seattle92", "acquired"],
      ["1992", "Moves to run worldwide sales and support.", "seattle92"],
      ["2000", "Becomes CEO on 13 January.", "regfinal"],
    ),
    p(`One more thing from this era shaped everything after it. Before the big antitrust case, the first government attention came from the US Federal Trade Commission around 1989 or 1990. Ballmer says it suspected Microsoft and IBM of dividing the market between them, just as the two were falling out. Antitrust is the area of law that stops powerful companies from crushing competition. He says the company never felt secure at the time, since it still saw IBM and later Linux as real threats.`, "acquired"),
    note(`He was scared of IBM long after IBM should have been scared of him.`),
  ],
};

// ---------------------------------------------------------------- CHAPTER 3
const lostDecade = {
  id: "the-flat-decade",
  kicker: "2000–2014",
  title: "Rich, and still losing",
  blocks: [
    p(`He took over on 13 January 2000, at the worst possible moment. Microsoft's market value, the total price of all its shares, was about ==$556 billion==. Then the dot-com bubble burst, and the US government won an order to split the company in two. Ballmer says he expected to run the Windows half and Gates the applications half, though they never got as far as planning it.`, "infoweek", "acquired"),
    p(`The break-up order was thrown out on appeal in June 2001, and Microsoft settled with the Justice Department that autumn. In Europe the fights went on, with a record fine of EUR 497 million in March 2004 that a court upheld in 2007. But the damage inside the building was already done. Senior people felt their own integrity was under attack, and he came to see it as a culture problem as much as a legal one.`, "eweekappeal", "foxeu", "iweu", "acquired"),
    ex(`For example: at an executive retreat in Oregon around 2001 or 2002, about 80 or 90 leaders flew in to hear a sales report. Orlando Ayala, the head of sales, stood up instead and said he was a proud Colombian but did not feel like a proud employee, because his integrity was under attack. Ballmer scrapped the whole agenda and rebuilt the meeting around that problem. Gates was unhappy about it.`, "acquired"),
    p(`The hardest part may have been the two men themselves. When Gates asked him to become CEO, Ballmer asked whether he really meant it or wanted a figurehead, and Gates said he meant it. Neither knew how to behave after that. For about a year, roughly from early 2000 to 2001, they did not speak. Ballmer has said their wives pushed them back together, starting with an awkward dinner at a health club.`, "acquired"),
    note(`A year of silence between the two most powerful people in software.`),
    p(`Even then, Ballmer stayed very deferential to Gates on product decisions, and __that was where the worst mistake grew__. He had a pit in his stomach about Longhorn, the giant Windows rebuild, and did not press it. Meanwhile the company had to move from stock options to stock awards, a change he says Microsoft made before most of tech. Options are rights to buy shares at a set price, and they lose most of their appeal once a share price goes flat. That was the morale crisis nobody outside saw.`, "acquired"),
    h("The money that nobody applauded"),
    p(`Here is the strange part. Revenue more than tripled, from $22.96 billion in fiscal 2000 to $77.85 billion in fiscal 2013. Profit went from $9.42 billion to $21.86 billion. Ballmer says the true profit growth was bigger, because the earlier figures did not count stock options as a cost. He told Fortune in 2013 that over those years Microsoft had probably made more money than almost anyone on the planet.`, "fy2000", "sec13", "acquired", "regfinal"),
    p(`Yet the stock went nowhere, and he gives three reasons worth learning. First, he and Gates kept telling investors the shares were too expensive, skipped the quarterly calls with analysts and gave no guidance on future results. Second, he took over when the price was absurdly high. Third, investors saw him as a big spender and worried about the future of Windows. By the end he says he could not reset that image without a new CEO, and he told the board so in his goodbye letter.`, "acquired"),
    facts(
      ["$556B", "Microsoft's market value when he took over, January 2000", "infoweek"],
      ["$219B", "Its value in May 2010, the day Apple's $221B passed it", "infoweek"],
      ["$32B", "Special dividend paid to shareholders in 2004. About $1.23B of it went to Ballmer.", "msdiv", "cbsdiv"],
      ["$21.86B", "Profit in fiscal 2013, his last full year", "sec13"],
    ),
    p(`A dividend is cash a company pays out to its shareholders, and that 2004 payment showed how much money was piling up. Ballmer then held 410.9 million shares. By 2014 FactSet showed him at about 333 million, so roughly 78 million shares left his hands in that decade (our subtraction).`, "cbsdiv", "quartz"),
    h("The month that defined him"),
    p(`In January 2007, Steve Jobs showed off the iPhone. Ballmer laughed at it on CNBC, calling it the most expensive phone in the market with no keyboard for business users. That April, on stage at a USA Today forum, he repeated the view.`, "engjan", "engadget"),
    { t: "quote", text: "There's no chance that the iPhone is going to get any significant market share.", who: "Steve Ballmer, USA Today CEO Forum, April 2007", src: s("engadget") },
    p(`It is the most mocked sentence of his career, but the deeper error was structural, not verbal. His business was built on charging phone makers for software. Apple made its profit on hardware, and Google gave its software away and earned on search ads. __You cannot laugh your way out of a competitor with a different business model.__ In a separate setback, Microsoft's own phone team missed the opening at Verizon, which then went to Android.`, "acquired"),
    note(`Don't only copy the competitor's product. Study how they make money.`),
    p(`He has since sorted his misses into a neat list. He says only phones and search really hurt him, because they were close to what Microsoft already did. He wanted three huge engines in the company, and it got two: the desktop business and the server business. He has a good phrase for this. Most companies never build even one engine, and you should respect anyone who builds one.`, "acquired"),
    h("The hire that changed who came next"),
    p(`The best story from this period is about ego, and Ballmer tells it himself. Around 2009 Satya Nadella was running Bing. His colleague Harry Shum said they had to meet a brilliant Yahoo executive named Qi Lu, simply to learn from him. Nadella, Shum and Ballmer flew to California. After Qi Lu left the room, the group spent about 15 minutes talking, and then someone suggested something very unusual.`, "acquired"),
    p(`They told Ballmer to hire Qi Lu as their boss. Shum phoned him and asked him to come back. Ballmer says this one meeting told him more about Nadella than any review ever could: this was someone who would put the company ahead of his own ego. It also let Ballmer move Nadella to server and tools, giving him the wider experience a future CEO would need.`, "acquired"),
    ex(`For example: Microsoft ran a succession plan every year, with two different names on it. One was who takes over if the CEO is hit by a bus tomorrow. The other was who takes over after a normal term. Ballmer says those are usually different people, and most companies should plan for both.`, "acquired"),
    h("The last fight"),
    p(`By 2013 phones were eating at him. Two new directors, John Thompson and Steve Luczo, pressed him to move faster against Apple and Google. Thompson later said the board had not pushed him out, only pushed him very hard on speed. In June the board rejected his plan to buy Nokia, and Bloomberg reported he shouted loudly enough to be heard outside the room and said he could not stay as CEO without it.`, "bi", "itproboard", "techspot"),
    p(`His own account is calmer, and different. He told CBS in 2014 that nobody wanted him to leave, though there were dust-ups over Nokia. In 2025 he said the board's process had felt disrespectful, that much of it came down to friction with Gates, and that the phone was his last shot at a consumer future. So he decided it was time. He also believed the cloud needed a new leader to rebuild how the company worked.`, "wincentral", "acquired"),
    p(`He announced his retirement on 23 August 2013, and the market's reply was brutal. Microsoft's shares jumped more than 7% that day, adding billions to the value of the company he had spent 33 years building. Less than two weeks later, Microsoft announced the Nokia deal anyway. On 4 February 2014 Satya Nadella was named CEO. Ballmer has said he stayed for one more board meeting and then cut the cord, because he thought Gates's long goodbye had confused everyone.`, "iolstock", "msnokia", "sec14", "acquired"),
    note(`Investors cheered his exit. He kept most of his shares. Who was right?`),
    tl(
      ["Jan 2000", "Becomes CEO. Microsoft is worth about $556 billion.", "infoweek", "regfinal"],
      ["Jun 2001", "Appeals court throws out the break-up order.", "eweekappeal"],
      ["Mid-2004", "Longhorn is reset and essentially restarted.", "nwallchin"],
      ["Jan 2007", "Vista ships to consumers, the same month Apple shows the iPhone.", "nwallchin", "engjan"],
      ["May 2008", "Drops the $44.6 billion-plus bid for Yahoo.", "inetyahoo"],
      ["May 2010", "Apple passes Microsoft in market value.", "infoweek"],
      ["Jul 2012", "$6.2 billion aQuantive write-down and first-ever quarterly loss.", "blunders"],
      ["Aug 2013", "Announces retirement. Shares jump more than 7%.", "iolstock"],
    ),
  ],
};

// ---------------------------------------------------------------- CHAPTER 4
const secondAct = {
  id: "the-second-fortune",
  kicker: "2014–2026",
  title: "Hold, buy, fall",
  blocks: [
    p(`The most profitable thing Steve Ballmer ever did took no meetings at all. He left and held his shares. On the day before he announced his retirement in August 2013, FactSet's count of about 333 million shares valued his stake at around $10.8 billion. Forbes put his whole fortune at about $20 billion when he bought the Clippers in 2014. As of 2 November 2026, Forbes puts it at about ==$160 billion==, ranking him ninth in the world.`, "quartz", "sportico", "forbes"),
    note(`His fortune grew about $140 billion after he quit. Patience is a skill.`),
    p(`It was closer than it looks, because letting go was hard. He went to one shareholder meeting, behaved badly by his own description, and took about a year to detach. Around 2015 or 2016, with the couple's giving ramping up, he thought about selling everything simply to cut the emotional tie. A former Microsoft finance employee in his own office told him not to, because the stock was going to be worth much more. He did sell a little and gave some away, and then he stopped.`, "acquired"),
    p(`His reason was loyalty, and he says money had nothing to do with it. He also thought Microsoft could go either way, to nothing or to something huge, and decided he could live with both because he had enough. Charlie Munger once stood up at a country club question session and asked him why he held on when his partners did not. __The point is simple: he could afford to be wrong, so he could afford to wait.__`, "acquired"),
    ex(`For example: he also did the tax arithmetic, the way a mathematician would. If he sold, he would pay capital gains tax (tax on profit from selling an asset). So selling only made sense if Microsoft would lag the market by more than that tax. He has no use for the extra cash. And most of his money was heading to philanthropy or the government anyway.`, "acquired"),
    facts(
      ["~$160B", "Forbes real-time net worth, 2 Nov 2026. Rank: 9th.", "forbes"],
      ["~$158B", "Rough value of a 4% stake in Microsoft at $3.96T, close of 27 Oct 2026 (our arithmetic; his exact share count is not public)", "fool", "sportico"],
      ["$7.5B", "Forbes value of the Clippers, Oct 2026. Sportico said $6.72B in Jan 2026.", "forbes", "sportico"],
      ["$1B", "Microsoft dividends he reportedly received in 2024", "benzinga"],
    ),
    p(`Compare his 2014 decision with what Microsoft became. In fiscal 2026 it made $331.8 billion in revenue and $133.7 billion in net income, with Azure above $100 billion. Azure alone now brings in more each year than the whole company did in his last full year, and it came from a project he started. He says the big momentum came in the years after he left. __He planted it, somebody else grew it, and he kept his share of the harvest.__`, "fy26", "sec13", "acquired"),
    p(`The rest of his fortune is simple to describe. It is mostly index funds, which are cheap funds that hold a slice of the whole market, plus the Clippers and arena and a stake in Stagwell. Dividend cheques from Microsoft and other holdings roughly pay for what the couple gives away, around a billion dollars a year by his hosts' count in 2025. Forbes says total giving has passed $7.4 billion.`, "acquired", "forbes"),
    h("The team he overpaid for"),
    p(`When he bid $2 billion in May 2014, the record for an NBA team was $550 million. Critics said he overpaid. His logic was unusual for a mathematician: he treats a team less like a business and more like art. Few exist, rich buyers keep increasing, and people do not buy them for profits. He has even said it cannot go to zero, the way Microsoft theoretically could.`, "wrapclip", "fosdome", "acquired"),
    p(`He then ran the team the way he ran software. He says the draft and free agency are the major yearly release, the trade deadline is the minor release, ticket sales are like licences, and television money works like the fees PC makers paid. What surprised him was the accountability. Every 24 seconds there is a result, and every number is visible to the customers too. He says he wishes he had understood that at Microsoft.`, "acquired"),
    note(`The Wall trade-off: he gave up suite money for noise. That is product taste.`),
    h("The fall"),
    p(`Then came the part no fan expected. On 3 September 2025 the journalist Pablo Torre reported that Kawhi Leonard had a $28 million endorsement deal with Aspiration, the bank the Clippers were partnered with, and that he barely did any work for it. An NBA salary cap limits how much a team can pay its players. Paying a star extra through a sponsor would be a way of cheating that limit, known as circumvention.`, "espnsanberg", "abc25", "fosaccept"),
    p(`Ballmer gave an interview within days. He said he had only made an introduction, which the rules allowed, that he had no knowledge of the contract's terms, and that he had been conned along with everyone else. The Clippers said repeatedly they expected to be cleared. The league hired the law firm Wachtell Lipton. Sanberg, the Aspiration co-founder, sat for two in-person interviews with its investigators before being sentenced to 14 years in federal prison in June 2026 for his fraud.`, "abc25", "abcnba", "espnsanberg"),
    p(`On 2 September 2026 the NBA announced its findings. It said the Clippers, already a prior offender, had broken rules on deals between Leonard and four companies doing business with the team: Aspiration, Boingo Wireless, Daktronics and Lockton Insurance. It said Ballmer had knowingly sought to help Leonard get outside income and had approved a business deal he knew was a precondition for the Aspiration contract. The commissioner, Adam Silver, described the violations as flagrant and blamed leadership failures.`, "abcnba", "abcnba2"),
    facts(
      ["$30M", "Fine on the Clippers, announced 2 Sep 2026", "abcnba2"],
      ["5", "First-round draft picks forfeited, 2029 to 2033", "abcnba2"],
      ["1 year", "Ballmer's suspension from all league and team activities", "abcnba2", "apaccept"],
      ["$700K", "Paid to the league by Kawhi Leonard, who said he acted in good faith", "abcnba2"],
    ),
    p(`The first response was war. The team rejected the findings and called the investigation biased, and his lawyer called it a witch hunt and said no rule had been broken. Eleven days later, on the night of 13 September, Ballmer reversed course. He said the team had paid the fine and would comply. He apologised to fans, staff and other owners, and accepted responsibility as principal owner, while saying disagreements about the findings remained.`, "abcnba", "apaccept", "fosaccept"),
    p(`This is not fully over: Front Office Sports, citing The New York Times, reported that the US Justice Department had opened an early-stage inquiry into the Clippers' dealings with Leonard. No charges were reported in the sources we read. Ballmer's lawyer has also cited civil litigation and the Aspiration bankruptcy case. The Clippers remain under a five-year league compliance programme, and the planned trade of Leonard back to Toronto was still awaiting completion in mid-September reports. __Treat all of this as unresolved, and check for news after this page was written.__`, "fosaccept", "abcnba"),
    note(`At 70 and worth $160 billion, he still lost a year.`),
    p(`To be fair, he lost $60 million of his own money to a fraudster, and a federal judge called that fraud one of the worst he had seen. That does not cancel what the league found, and he did accept the penalty, though not every finding. The lesson for a young founder is uncomfortable and practical. A rule you see as a technicality can still end up as the headline of your career. Money does not protect you from that.`, "espnsanberg", "abcnba", "apaccept"),
    tl(
      ["Feb 2014", "Nadella becomes CEO. Ballmer soon leaves the board and keeps his shares.", "sec14", "acquired"],
      ["Aug 2014", "Closes the $2 billion Clippers purchase.", "apclip"],
      ["Oct 2015", "Announces a 4% stake in Twitter.", "twitter"],
      ["Apr 2017", "Launches USAFacts.", "gwusa"],
      ["Mar 2020", "Buys the Forum for $400 million, ending the fight with MSG.", "wrapforum"],
      ["Aug 2024", "Intuit Dome opens, at a cost of about $2 billion.", "fosdome"],
      ["Sep 2026", "NBA suspends him for a year. He accepts within two weeks.", "abcnba2", "apaccept"],
    ),
  ],
};

const factCheck = {
  method: `Each claim was checked against the source cited beside it, read directly where the site allowed (SEC filings, Microsoft press releases, AP, Reuters and ESPN copy, the 1992 Seattle Times profile, the full Acquired transcript). Ballmer's own memories are attributed to him and not treated as independent proof. Totals labelled as our arithmetic were computed by us. All wording is paraphrased; a single short verbatim quote is used. Wikipedia is used only for two dates and ownership background, and is flagged in the source label.`,
  disputed: [
    { claim: `How much of Microsoft Ballmer got, and how.`, note: `Gates's memoir, as reported by Business Insider, says Gates gave him 4% from his own holdings. Reference for Business and Benzinga describe 8% at the 1981 incorporation, with Benzinga saying a pay deal of $50,000 plus 10% of profit growth was swapped for shares. These may be stages of one story. We state both and do not reconcile them.` },
    { claim: `Employee number.`, note: `Forbes and most sources say No. 30. At least one source says 24th. We use 30.` },
    { claim: `When and how the IBM partnership ended.`, note: `The 1992 Seattle Times describes a climactic meeting in March 1991. In 2025 Ballmer recalled reading of the divorce in The Wall Street Journal around May 1990. Encyclopedia.com says 1992. We give the first two and attribute each.` },
    { claim: `Why Ballmer left Microsoft.`, note: `Bloomberg, as relayed by IT Pro, TechSpot and Business Insider, reported that he shouted at a June 2013 board meeting and that directors looked for ways to ease him out. Ballmer told CBS nobody wanted him to leave. He told the Wall Street Journal he decided in May 2013, before that meeting. In 2025 he said the board first rejected Nokia, he decided to go, and the board then changed its mind. CBS coverage has him deciding after the approval. All are attributed, none stated as settled fact.` },
    { claim: `Price of the Nokia phone business.`, note: `Microsoft announced EUR 5.44 billion, about $7.2 billion. The Register says $7.1 billion paid. Computerworld, citing an SEC filing, says about $7.9 billion at close. The total charge in July 2015 was reported as $7.6 billion (Nokia impairment) within a larger $8.44 billion charge.` },
    { claim: `The 2005 chair-throwing account.`, note: `This comes from Mark Lucovsky's sworn court statement in Microsoft's dispute over Kai-Fu Lee. Ballmer called it a gross exaggeration in an unsworn statement. Attributed only.` },
    { claim: `Ballmer's Microsoft share count today.`, note: `FactSet showed about 333.25 million shares in 2014, and he has said he later sold a little and gave some away. He is under the 5% level that would require naming in filings, so no 2026 count is public. Sportico says roughly 4%. Our $158 billion figure is rough arithmetic from 4% of a $3.96 trillion market value, and it should not be read as a filed figure.` },
    { claim: `Forbes net worth in autumn 2026.`, note: `Forbes real-time figures moved sharply. Front Office Sports quoted $126 billion on 14 Sep 2026; Forbes showed $161.7 billion and $159.6 billion on separate reads of 2 Nov 2026. We use about $160 billion and date it.` },
    { claim: `Clippers valuation.`, note: `Forbes $7.5 billion (Oct 2026) against Sportico $6.72 billion (Jan 2026). Different methods and dates.` },
    { claim: `Intuit Dome cost.`, note: `Reports range from $1.8 billion at the 2021 groundbreaking to about $2 billion at opening. We use about $2 billion.` },
    { claim: `Stagwell's starting capital.`, note: `The Media Leader says $250 million came from Ballmer and Penn together. Some other sources credit Ballmer alone. We use the first wording.` },
    { claim: `Avanade's current ownership.`, note: `Reports differ (Accenture 95% of voting stock in 2007, 80/20 in a later Dutch report). We say only that Accenture is the majority owner.` },
    { claim: `Whether the 11% share fall in July 2013 was due only to Surface.`, note: `SmartCompany ties the 11% drop to the announcement of the $900 million charge, which came with results that also missed expectations. We give the fall alongside the charge and do not claim sole cause.` },
    { claim: `The NBA's findings against Ballmer.`, note: `The league and its outside law firm made these findings. Ballmer initially denied involvement, his lawyer called the case a witch hunt, and when he accepted the penalties he said disagreements with the findings remained. He has not been charged with a crime in any source we read.` },
  ],
};

const fragment = {
  chapters: [everyCompany, ridingBear, lostDecade, secondAct],
  sources: order.map((k) => ({ label: SRC[k][0], url: SRC[k][1] })),
  factCheck,
};

fs.mkdirSync(OUT.replace(/\/[^/]+$/, ""), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(fragment, null, 1), "utf8");

// Report
const words = (t) => (t || "").replace(/[*_=]{2}/g, "").trim().split(/\s+/).filter(Boolean).length;
let total = 0, ventures = 0;
const longNotes = [];
for (const c of fragment.chapters) {
  let cw = 0;
  for (const b of c.blocks) {
    if (b.t === "venture") { ventures++; cw += ["idea","decision","howStarted","funding","whatHappened","lesson"].reduce((a, f) => a + words(b[f]), 0); }
    else if (b.t === "facts") cw += b.items.reduce((a, i) => a + words(i.value) + words(i.label), 0);
    else if (b.t === "timeline") cw += b.items.reduce((a, i) => a + words(i.text), 0);
    else cw += words(b.text);
    if (b.t === "note" && words(b.text) > 14) longNotes.push(b.text);
  }
  console.log(c.id, cw, "blocks", c.blocks.length);
  total += cw;
}
console.log("total", total, "ventures", ventures, "sources", order.length, "longNotes", longNotes);
const unused = Object.keys(SRC).filter((k) => !order.includes(k));
console.log("unused", unused);
