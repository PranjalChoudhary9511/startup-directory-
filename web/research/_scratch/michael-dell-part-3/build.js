// Builds part-3.json for Michael Dell. Keys in src arrays are mapped to indexes here.
const fs = require("fs");
const path = "C:/Users/Pranjal Choudhary/Desktop/start-up derectory/web/research/billionaires/michael-dell/part-3.json";

const S = {
  ferriss: ["The Tim Ferriss Show #534: Michael Dell transcript, 28 September 2021 (tim.blog/podcast)", "https://tim.blog/2021/09/28/michael-dell-transcript/"],
  timeless: ["Timeless: In Conversation with Michael Dell, 7 October 2025", "https://www.timelesspartners.com/journal/conversations/michael-dell"],
  mck: ["McKinsey Quarterly: Direct from Michael Dell, 16 September 2024", "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/direct-from-michael-dell-leadership-lessons-and-the-future-of-ai"],
  biSleep: ["Business Insider: Michael Dell Says Workers Need to Laugh and Play, December 2024", "https://www.businessinsider.com/michael-dell-tech-work-life-balance-burnout-downtime-parents-advice-2024-12"],
  hbr: ["Harvard Business Review: Execution Without Excuses, interview with Michael Dell and Kevin Rollins, March 2005 (reprint copy)", "https://www.pickardlaws.com/myleadership/myfiles/rtdocs/hbr/Execution%20without%20excuses%20Mar05%20HBR.pdf"],
  bw: ["BusinessWeek: What You Don't Know About Dell, 2 November 2003 (Internet Archive copy)", "https://web.archive.org/web/20120808134325/www.businessweek.com/stories/2003-11-02/what-you-dont-know-about-dell"],
  bwDq: ["Dataquest India reprint of BusinessWeek: What You Don't Know About Dell, 25 November 2003", "https://www.dqindia.com/what-you-don-t-know-about-dell/"],
  sb: ["strategy+business: How Dell Got Soul, 25 August 2004", "https://www.strategy-business.com/article/04305"],
  cbs: ["CBS News (Geoffrey James): Sales Culture, Interview with Michael Dell, published 9 July 2009", "https://www.cbsnews.com/news/sales-culture-interview-with-michael-dell/"],
  indep: ["The Independent: A day in the life of Michael Dell, 30 June 2006", "https://www.independent.co.uk/news/business/analysis-and-features/a-day-in-the-life-of-michael-dell-founder-and-chairman-of-dell-inc-6096669.html"],
  charter: ["Charter via TIME (Kevin Delaney): review of Play Nice But Win, 17 November 2021", "https://time.com/partner-content/charter/6120095/play-nice-but-win-michael-dell/"],
  carter: ["Mike Carter: My 30 Years at Dell, personal essay by a former employee, June 2020", "https://mcarter.company/portfolio/my-30-years-at-dell/"],
  orakwue: ["Austin American-Statesman: interview with Nnamdi Orakwue, former chief of staff to Michael Dell, January 2017", "https://www.statesman.com/story/news/2017/01/23/former-dell-executive-talks-about-education-intervention-changed-his-life-and-led-his-career-tech/10175169007/"],
  fortune24: ["Fortune (Michal Lev-Ram): In 40 years as a founder-CEO, 25 March 2024", "https://fortune.com/2024/03/25/michael-dell-technologies-generative-ai-servers-storage-neural-processor-latitude/"],
  cnbc21: ["CNBC Make It (written by Michael Dell): 21 lessons, 6 October 2021", "https://www.cnbc.com/make-it/2021/10/06/billionaire-michael-dell-started-his-company-at-19-with-just-1000-here-are-his-top-lessons-for-success.html"],
  mcontrol: ["Moneycontrol: 10 key takeaways from Play Nice But Win, 8 January 2022", "https://www.moneycontrol.com/news/trends/features/10-key-takeaways-from-michael-dells-book-play-nice-but-win-7914421.html"],
  stat19: ["Austin American-Statesman: Michael Dell, 'We're constantly evolving and learning', 31 May 2019", "https://www.statesman.com/story/business/technology/2019/05/31/michael-dell-were-constantly-evolving-and-learning/4964003007/"],
  reuters07: ["Reuters: Michael Dell says direct sales 'not a religion', 27 April 2007", "https://www.reuters.com/article/business/michael-dell-says-direct-sales-not-a-religion-idUSN27327877/"],
  forbes07: ["Forbes (Christopher Helman): The Second Coming, 10 December 2007", "https://www.forbes.com/forbes/2007/1210/078.html"],
  secPr: ["US SEC press release 2010-131: SEC Charges Dell and Senior Executives, 22 July 2010", "https://www.sec.gov/newsroom/press-releases/2010-131-sec-charges-dell-senior-executives-disclosure-accounting-fraud"],
  dellPr: ["Dell press release: Dell Reaches Settlement with SEC, 22 July 2010", "https://investors.delltechnologies.com/news-events/press-releases/detail/1073/dell-reaches-settlement-with-securities-and-exchange-commission"],
  bbc10: ["BBC News: Dell computers pays $100m to settle SEC fraud charge, 23 July 2010", "https://www.bbc.com/news/business-10736517"],
  nyt10a: ["The New York Times: Suit Over Faulty Computers Highlights Dell's Decline, 29 June 2010", "https://www.nytimes.com/2010/06/29/technology/29dell.html"],
  nyt10b: ["The New York Times: Dell Faces New Questions Over Faulty Computers, 19 November 2010", "https://www.nytimes.com/2010/11/19/technology/19docs.html"],
  vb: ["VentureBeat: reporting on the unsealed Dell lawsuit documents, 19 November 2010", "https://venturebeat.com/business/unsealed-lawsuit-reveals-dell-lied-about-millions-of-faulty-computers"],
  statAit: ["Austin American-Statesman: Documents from Dell lawsuit return spotlight to past problems", "https://www.statesman.com/story/news/2012/09/01/documents-from-dell-lawsuit-return-spotlight-to-past-problems/9933230007/"],
  infoAit: ["InfoWorld: The ignominious fall of Dell, with Dell's response, 1 July 2010", "https://www.infoworld.com/article/2300167/the-ignominious-fall-of-dell.html"],
  apBattery: ["Associated Press via Arizona Daily Star: Dell record recall not technology flaw, 16 August 2006", "https://tucson.com/business/technology/article_28db5329-76c7-5216-a1f2-9134663dbce5.html"],
  nyt07: ["The New York Times: Can Michael Dell Refocus His Namesake?, 9 September 2007", "https://www.nytimes.com/2007/09/09/technology/09dell.html"],
  ftRollins: ["Financial Times: Dell founder back after Rollins exit, 1 February 2007", "https://www.ft.com/content/4685ef1a-b178-11db-b901-0000779e2340"],
  sec07: ["Dell Inc. press release filed with the SEC: Michael Dell Assumes Duties as CEO, 31 January 2007", "https://www.sec.gov/Archives/edgar/data/826083/000095013407002027/d43276exv99w1.htm"],
  cnn11: ["CNN: 14 years later, Dell founder backtracks on Apple attack, 18 October 2011", "https://edition.cnn.com/2011/10/18/tech/web/michael-dell-apple/index.html"],
  tc11: ["TechCrunch: Michael Dell on his infamous Apple quote, 18 October 2011", "https://techcrunch.com/2011/10/18/michael-dell-on-the-infamous-apple-shut-it-down-quote-my-answer-was-largely-misconstrued/"],
  cult: ["Cult of Mac: Michael Dell quote on Apple, Today in Apple history, 6 October 2026", "https://www.cultofmac.com/apple-history/michael-dell-quote-about-apple"],
  delFee: ["Delaware Court of Chancery: In re Dell Technologies Class V Stockholders Litigation, fee opinion, 2023", "https://courts.delaware.gov/Opinions/Download.aspx?id=350730"],
  delClassV: ["Delaware Court of Chancery: In re Dell Technologies Class V Stockholders Litigation, motion to dismiss opinion, 2020", "https://courts.delaware.gov/Opinions/Download.aspx?id=306710"],
  delSup24: ["Delaware Supreme Court: affirming the Class V fee award, 2024", "https://courts.delaware.gov/Opinions/Download.aspx?id=368080"],
  dell8k22: ["Dell Technologies Form 8-K on the Class V settlement, 15 November 2022 (SEC EDGAR)", "https://www.sec.gov/Archives/edgar/data/1571996/000157199622000038/dell-20221115.htm"],
  dellNote23: ["Dell Technologies FY2023 financial notes on the Class V settlement (SEC EDGAR)", "https://www.sec.gov/Archives/edgar/data/1571996/000157199623000007/R24.htm"],
  dellNote25: ["Dell Technologies financial notes on the Class V payment, 2025 (SEC EDGAR)", "https://www.sec.gov/Archives/edgar/data/1571996/000157199625000034/R22.htm"],
  rgrd: ["Robbins Geller (plaintiffs' law firm): $1 Billion Recovery for Dell Class V Stockholders, 2023", "https://www.rgrdlaw.com/news-item-Robbins-Geller-Secures-1-Billion-Recovery-on-Behalf-of-Dell-Class-V-Stockholders.html"],
  blawFee: ["Bloomberg Law: Dell's $1 Billion Settlement Yields $266.7 Million for Attorneys, 31 July 2023", "https://news.bloomberglaw.com/esg/dells-1-billion-settlement-yields-266-7-million-for-attorneys"],
  delSup17: ["Delaware Supreme Court: Dell, Inc. v. Magnetar Global Event Driven Master Fund, 14 December 2017", "https://law.justia.com/cases/delaware/supreme-court/2017/565-2016.html"],
  potter: ["Potter Anderson client alert: Delaware Supreme Court reverses Dell appraisal decision, 14 December 2017", "https://www.potteranderson.com/insights/news/Client-Alert-Delaware-Supreme-Court-Reverses-Dell-Appraisal-Decision-Affording-Chancery-Court-Discretion-to-Choose-Deal-Price"],
  wsgr: ["Wilson Sonsini: Delaware Supreme Court Issues Important Opinion in Dell Appraisal Case, 15 December 2017", "https://www.wsgr.com/en/insights/delaware-supreme-court-issues-important-opinion-in-dell-appraisal-case.html"],
  excerpt: ["Michael Dell on LinkedIn: excerpt from Play Nice But Win, 2 October 2021", "https://www.linkedin.com/pulse/play-nice-win-michael-dell"],
  hybrid: ["Michael Dell on LinkedIn: Culture is Key to Hybrid Work, 7 September 2022", "https://www.linkedin.com/pulse/culture-key-hybrid-work-michael-dell"],
  fortune22: ["Fortune: Is Dell pausing external hiring?, quoting the hybrid post, 9 September 2022", "https://fortune.com/2022/09/09/dell-cfo-company-hiring-key-areas/"],
  biRemote: ["Business Insider: Dell Workers Can Stay Remote, but They're Not Going to Get Promoted, 16 March 2024", "https://www.businessinsider.com/dell-remote-workers-promotion-return-office-push-flexible-work-2024-3"],
  biFive: ["Business Insider: Dell Orders All Staff Back to the Office 5 Days a Week, 31 January 2025", "https://www.businessinsider.com/dell-return-to-office-five-days-week-rto-michael-dell-2025-1"],
  biHead: ["Business Insider: Dell Staff Numbers Have Fallen by 25,000 in the Last Two Years, 26 March 2025", "https://www.businessinsider.com/dell-employee-numbers-decline-by-25000-since-2023-rto-layoffs-2025-3"],
  regHead: ["The Register: Dell again sheds ten percent of staff in a year, 27 March 2025", "https://www.theregister.com/on-prem/2025/03/27/dell-again-sheds-ten-percent-of-staff-in-a-year/559399"],
  regColor: ["The Register: Dell to color-code staff based on how hybrid they really are, 8 May 2024", "https://www.theregister.com/on-prem/2024/05/08/dell-to-color-code-staff-based-on-how-hybrid-they-really-are/1495755"],
  ars: ["Ars Technica: Dell risks employee retention by forcing all teams back into offices, 31 January 2025", "https://arstechnica.com/information-technology/2025/01/dell-risks-employee-retention-by-forcing-all-teams-back-into-offices-full-time/"],
  tenk: ["Dell Technologies Form 10-K for the fiscal year ended 30 January 2026 (SEC EDGAR)", "https://www.sec.gov/Archives/edgar/data/1571996/000157199626000008/dell-20260130.htm"],
  accc: ["Australian Competition and Consumer Commission: $10m penalty for Dell Australia, 14 August 2023", "https://www.accc.gov.au/media-release/10m-penalty-for-dell-australia-for-misleading-representations-about-discount-prices-of-computer-monitors"],
  doj: ["US Department of Justice: Dell and Iron Bow Agree to Pay $4.3M, 19 November 2024", "https://www.justice.gov/archives/opa/pr/dell-and-iron-bow-agree-pay-43m-resolve-false-claims-act-allegations-relating-submitting-non"],
  pa: ["PA News via KentOnline: Dell confirms data breach affecting customer personal details, 10 May 2024", "https://www.kentonline.co.uk/news/national/dell-confirms-data-breach-affecting-customer-personal-details-117281/"],
  bleep: ["BleepingComputer: Dell API abused to steal 49 million customer records, 10 May 2024", "https://www.bleepingcomputer.com/news/security/dell-api-abused-to-steal-49-million-customer-records-in-data-breach/"],
  info03: ["InfoWorld: Dell shifts some support calls to US after complaints, 24 November 2003", "https://www.infoworld.com/article/2222400/dell-shifts-some-support-calls-to-us-after-complaints.html"],
  ap03: ["Associated Press via Deseret News: Dell cuts corporate calls to India, 25 November 2003", "https://www.deseret.com/2003/11/25/19797656/dell-cuts-corporate-calls-to-india/"],
  nyt06: ["The New York Times: Dell to Double Workforce in India, 20 March 2006", "https://www.nytimes.com/2006/03/20/technology/dell-to-double-workforce-in-india.html"],
  pti13: ["PTI via The Times of India: Dell to increase headcount in India, 30 January 2013", "https://timesofindia.indiatimes.com/jobs/dell-to-increase-headcount-in-india-michael-dell/articleshow/18255106.cms"],
  bl15: ["The Hindu BusinessLine: Dell sees strong momentum in consumer biz, 7 September 2015", "https://www.thehindubusinessline.com/info-tech/dell-sees-strong-momentum-in-consumer-biz/article7625760.ece"],
  hindu15: ["The Hindu: Michael Dell goes speed dating with Indian start-ups, 15 September 2015", "https://www.thehindu.com/news/cities/bangalore/michael-dell-goes-speed-dating-with-indian-startups/article7655677.ece"],
  mint16: ["Mint: Dell Technologies's road map for India, 14 November 2016", "https://www.livemint.com/Companies/qlApzzpVLqT90aJHwwrOoI/Dell-Technologiess-road-map-for-India.html"],
  fi25: ["Forbes India: The India factor in Dell's AI playbook, 13 May 2025", "https://www.forbesindia.com/article/take-one-big-story-of-the-day/the-india-factor-in-dells-ai-playbook/95956/1"],
  msdfIndia: ["Michael & Susan Dell Foundation: India", "https://www.dell.org/india/"],
  aspire: ["Michael & Susan Dell Foundation: Dell Aspire Scholars, India's Future Leaders, 18 October 2024", "https://www.dell.org/ideas/dell-aspire-scholars-indias-future-leaders/"],
  atlantic: ["The Atlantic (James Fallows): When the Top U.S. Tax Rate Was 70 Percent, 25 January 2019", "https://www.theatlantic.com/ideas/archive/2019/01/tax-rates-davos/622220/"],
  guardian: ["The Guardian: Alexandria Ocasio-Cortez knows yesterday's radicalism, 29 January 2019", "https://www.theguardian.com/commentisfree/2019/jan/29/alexandria-ocasio-cortez-knows-yesterdays-radicalism-can-become-tomorrows-common-sense"],
  techradar: ["TechRadar: 'Dude, you're getting a Dell... server rack', 20 August 2026", "https://www.techradar.com/pro/dude-youre-getting-a-dell-server-rack-iconic-tv-ad-campaign-returns-with-an-ai-twist"],
  nexttv: ["Multichannel News: Dude, Dell's New Ads Rock, 28 July 2003", "https://www.nexttv.com/news/dude-dells-new-ads-rock-145545"],
  usatoday: ["USA Today: Goofy Dell guy exudes star power, 14 January 2002", "https://usatoday30.usatoday.com/money/index/2002-01-14-dell-dude.htm"],
  jarvis: ["Jeff Jarvis, BuzzMachine: Dell story, the draft, 21 October 2007", "https://buzzmachine.com/dell-story-the-draft/"],
  jarvis2: ["Jeff Jarvis, BuzzMachine: Drinks with Dell, 3 April 2007", "https://buzzmachine.com/2007/04/03/drinks-with-dell/"],
  smt07: ["Social Media Today: Dell's Journey in Word of Mouth (Lionel Menchaca session), 14 November 2007", "https://www.socialmediatoday.com/content/dells-journey-word-mouth"],
  cringely: ["InfoWorld (Robert Cringely): Escape from Dell Hell, 2 May 2007", "https://www.infoworld.com/article/2321354/escape-from-dell-hell.html"],
  smt09: ["Social Media Today: How Dell Generated $3 million in Sales Using Twitter, 24 June 2009", "https://www.socialmediatoday.com/content/how-dell-generated-3-million-sales-using-twitter"],
  fortuneX: ["Fortune/Bloomberg: Nvidia and Dell shares rise on news of AI factory for xAI, 20 June 2024", "https://fortune.com/2024/06/20/nvidia-super-micro-michael-dell-elon-musk-ai-xai/"],
  biLife: ["Business Insider: The Fabulous Life of Michael Dell, 19 December 2024", "https://www.businessinsider.com/life-of-michael-dell-2016-9"],
  fact26: ["Michael and Susan Dell: Commitment to The University of Texas at Austin, fact sheet, 21 April 2026", "https://www.onedell.com/wp-content/uploads/2026/04/Giving-Fact-Sheet-April-21-2026.pdf"],
  cnbc26: ["CNBC: Michael, Susan Dell donate $750 million for UT Austin medical campus, 21 April 2026", "https://www.cnbc.com/2026/04/21/michael-susan-dell-ut-austin-donation-medical-campus.html"],
  ap26: ["Associated Press: University of Texas at Austin receives $750 million donation, 21 April 2026", "https://apnews.com/article/michael-dell-susan-university-of-texas-healthcare-c58928b61803f0615ec15692548446c1"],
  axios26: ["Axios Austin: Michael and Susan Dell pledge $750 million to University of Texas, 21 April 2026", "https://www.axios.com/local/austin/2026/04/21/michael-dell-university-texas-donation"],
  reuters25: ["Reuters: Dell family to donate $6 billion to 'Trump accounts', 2 December 2025", "https://www.reuters.com/technology/michael-susan-dell-pledge-625-billion-investment-accounts-us-children-2025-12-02/"],
  onedellOct: ["Michael and Susan Dell: 25 Million Reasons to Dream Big, October 2026", "https://www.onedell.com/25-million-children-trump-accounts-dell-contribution/"],
  onedellDec: ["Michael and Susan Dell: We're Committing $6.25 Billion, December 2025", "https://www.onedell.com/investamerica/"],
  invest: ["Invest America: Check Eligibility for Michael & Susan Dell's $250", "https://investamerica.org/check-dell-250-eligibility/"],
  wh25: ["The White House: Landmark Dell Gift Supercharges Trump Accounts, 2 December 2025", "https://www.whitehouse.gov/releases/2025/12/landmark-dell-gift-supercharges-trump-accounts-for-americas-kids/"],
  cnbc18: ["CNBC: Michael Dell purchased $100 million penthouse that broke Manhattan records, 22 February 2018", "https://www.cnbc.com/2018/02/22/michael-dell-purchased-100-million-penthouse-that-broke-manhattan-records.html"],
  rd: ["The Real Deal: Dell dials up, how the tech billionaire became a major real estate player, 4 April 2023", "https://therealdeal.com/magazine/national-april-2023/dell-dials-up-how-the-tech-billionaire-quietly-became-a-major-real-estate-player/"],
  forbesP: ["Forbes: Michael Dell profile, real-time net worth as of 2 November 2026", "https://www.forbes.com/profile/michael-dell/"],
  sbj: ["Sports Business Journal: new Raiders investors, 19 May 2026", "https://www.sportsbusinessjournal.com/Articles/2026/05/19/ari-emanuel-mark-shapiro-among-new-raiders-investors-as-egon-durban-expands-his-minority-stake/"],
  chron: ["Houston Chronicle: Texas billionaire buys stake in Raiders, 20 May 2026", "https://www.chron.com/sports/article/michael-dell-raiders-ownership-22267298.php"],
  r2: ["Dell Technologies 2026 proxy data: Pay vs Performance disclosure (SEC EDGAR)", "https://www.sec.gov/Archives/edgar/data/1571996/000119312526203969/R2.htm"],
  proxy: ["Dell Technologies 2026 proxy statement, Form DEF 14A (SEC EDGAR)", "https://www.sec.gov/Archives/edgar/data/1571996/000119312526226734/d132444ddef14a.htm"],
  forbes26: ["Forbes: Michael Dell Drops To No. 4 In Billionaire Rankings, 14 September 2026", "https://www.forbes.com/sites/fionariley/2026/09/14/michael-dell-drops-to-no-4-in-billionaire-rankings-as-ai-selloff-hits-dell/"],
  qz: ["Quartz: Michael Dell passes Jeff Bezos, 9 September 2026", "https://qz.com/michael-dell-jeff-bezos-net-worth-billionaire-ranking-090926"],
  q2: ["Investing.com: Dell Q2 fiscal 2027 earnings call transcript, 1 September 2026", "https://www.investing.com/news/transcripts/earnings-call-transcript-dell-beats-q2-2027-estimates-shares-rebound-after-hours-93CH-4884715"],
  gs: ["Dell Technologies at Goldman Sachs Communacopia + Technology Conference, transcript, 9 September 2026", "https://stockanalysis.com/stocks/dell/transcripts/739640-goldman-sachs-communacopia-technology-conference-2026/"],
  variety: ["Variety: TikTok U.S. Joint Venture Deal Closes, 23 January 2026", "https://variety.com/2026/digital/news/tiktok-us-joint-venture-deal-closes-adam-presser-ceo-1236638722/"],
  chosun: ["Chosun Biz: Chey Tae-won taps Dell fund, 14 October 2026", "https://biz.chosun.com/en/en-industry/2026/10/14/JTZCA5WVRJCPDKCURRJJSRX6R4/"],
  alpha: ["Alpha Biz: SK Chairman to sell stake to Michael Dell family investment firm, 14 October 2026", "https://www.alphabiz.co.kr/news/articleView.html?idxno=192648"],
  wsjBase: ["The Wall Street Journal: Zach Dell Is Raising Money to Put a Battery in Your Backyard, 3 August 2026", "https://www.wsj.com/business/energy-oil/zach-dell-is-raising-money-to-put-a-battery-in-your-backyard-cd7e52e8"],
  base: ["Base Power press release: $1B Series D, 3 August 2026", "https://www.businesswire.com/news/home/20260803203117/en/Base-Power-Announces-%241B-Series-D-and-Launches-Base-Core-First-of-its-Kind-Home-Battery-Built-in-the-United-States"],
  fortuneBase: ["Fortune: Zach Dell aims to build a name for himself with Base Power, 11 August 2026", "https://fortune.com/2026/08/11/zach-dell-aims-to-build-a-name-for-himself-with-base-power/"],
  blawTx: ["Bloomberg Law: Dell Shareholders Approve Corporate Move From Delaware to Texas, 25 June 2026", "https://news.bloomberglaw.com/esg/dell-shareholders-approve-corporate-move-from-delaware-to-texas"],
  eightK26: ["Dell Technologies Form 8-K on the move to Texas, 1 July 2026", "https://investors.delltechnologies.com/sec-filings/all-sec-filings/content/0001571996-26-000036/dell-20260625.htm"],
  fox: ["Fox Business: Dell shareholders approve legal move from Delaware to Texas, 26 June 2026", "https://www.foxbusiness.com/markets/dell-shareholders-approve-legal-move-from-delaware-texas"],
  medal: ["The White House: National Medals of Science and of Technology and Innovation, 8 October 2026", "https://www.whitehouse.gov/releases/2026/10/president-trump-presents-national-medals-of-science-and-national-medals-of-technology-and-innovation/"],
  cio: ["CIO India: India is the third largest market globally for Dell, 8 September 2015", "https://www.cio.com/article/218276/india-is-the-third-largest-market-globally-for-dell-ceo-michael-dell.html"],
  fe: ["Financial Express: Inside Michael Dell's 4 AM routine, 22 April 2026", "https://www.financialexpress.com/life/lifestyle-inside-tech-billionaire-michael-dells-4-am-routine-and-work-play-relax-philosophy-to-succeed-4214788/"],
  crn19: ["CRN: New COO Jeff Clarke Knows Dell Technologies 'Inside And Out', 2 December 2019", "https://www.crn.com/news/data-center/new-coo-jeff-clarke-knows-dell-technologies-inside-and-out"],
  nextplat: ["The Next Platform: Dell Says AI Will Drive 75 Percent Of Datacenter Demand By 2030, 7 September 2026", "https://www.nextplatform.com/compute/2026/09/07/dell-says-ai-will-drive-75-percent-of-datacenter-demand-by-2030/5294882"],
  phil: ["Chronicle of Philanthropy: Michael and Susan Dell Pledge $750 Million, 21 April 2026", "https://www.philanthropy.com/news/michael-and-susan-dell-pledge-750-million-to-build-a-life-sciences-hub/"],
};

const p = (text, ...src) => ({ t: "p", text, src });
const h = (text) => ({ t: "h", text });
const note = (text) => ({ t: "note", text });
const quote = (text, who, ...src) => ({ t: "quote", text, who, src });
const example = (text, ...src) => ({ t: "example", text, src });
const facts = (...items) => ({ t: "facts", items: items.map(([value, label, ...src]) => ({ value, label, src })) });
const timeline = (...items) => ({ t: "timeline", items: items.map(([when, text, ...src]) => ({ when, text, src })) });

const photos = {
  drEvil: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Dr._Evil2.jpg/960px-Dr._Evil2.jpg", page: "https://commons.wikimedia.org/wiki/File:Dr._Evil2.jpg", caption: "A Dr. Evil impersonator stands with Michael Dell at a Dell presentation, January 2007. He is the man who calls the stage an act.", author: "Edans", license: "CC BY 2.0", year: 2007 },
  hq: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Dell_headquarters.jpg/960px-Dell_headquarters.jpg", page: "https://commons.wikimedia.org/wiki/File:Dell_headquarters.jpg", caption: "Dell headquarters in Round Rock, Texas, in April 2004. He stepped down as CEO that July and returned in January 2007.", author: "Tim Patterson", license: "CC BY 2.0", year: 2004 },
  wh: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/P202512002MR-1471.jpg/960px-P202512002MR-1471.jpg", page: "https://commons.wikimedia.org/wiki/File:P202512002MR-1471.jpg", caption: "President Donald Trump, Michael Dell, Speaker Mike Johnson, Sen. Ted Cruz and others at the \"Trump Accounts\" announcement in the White House Roosevelt Room, 2 December 2025. Official White House photo by Molly Riley.", author: "The White House (Molly Riley)", license: "Public domain", year: 2025 },
  med: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Dell_Medical_School_Health_Discovery_Building_2020.jpg/960px-Dell_Medical_School_Health_Discovery_Building_2020.jpg", page: "https://commons.wikimedia.org/wiki/File:Dell_Medical_School_Health_Discovery_Building_2020.jpg", caption: "The Health Discovery Building at Dell Medical School, University of Texas at Austin, in 2020. His parents wanted him to become a doctor. His name went on the school instead.", author: "Larry D. Moore", license: "CC BY 4.0", year: 2020 },
};
const photo = (k) => ({ t: "photo", photo: photos[k] });

const chapters = [
{ id: "how-they-work", kicker: "How he runs things", title: "The Bulldozer on His Desk", blocks: [
  p(`In the fall of 2001, Michael Dell received a report card he did not enjoy. Internal interviews showed that people who worked for him found him impersonal and emotionally detached. A survey that summer, taken after the company's first mass layoffs, found that ==half== of all employees would leave if they got the chance. He was about 36, and he had been running the company since he was a teenager.`, "bw"),
  p(`Within a week he stood in front of his top 20 managers and criticised himself. He told them he was hugely shy, that it could make him look aloof, and that he would try to build closer bonds with them. Company personality tests had already labelled him an "off-the-charts introvert," so people in that room knew what this was costing him. Days later, a video of the talk was being shown to every manager in the company, several thousand people.`, "bw"),
  quote(`It was powerful stuff. You could tell it wasn't easy for him.`, "Brian Wood, then a Dell sales head, to BusinessWeek, 2003", "bw"),
  p(`Then came the toy. He put a small plastic bulldozer on his desk, as a reminder not to ram ideas through without bringing people along. His partner Kevin Rollins, who had been called autocratic, got a Curious George doll to remind him to listen first. __Think about that for a moment: one of the richest men in America fixed a personal flaw with a desk toy, because willpower alone had not worked.__`, "bw"),
  note(`A billionaire used a toy to remember to listen. Steal this trick.`),
  p(`This chapter is about the system around him, not his genius. Most of it is cheap and most of it can be copied. Some of it was also hard on people, and we will show that too.`, "bw", "sb"),

  h(`His day, as far as it has been reported`),
  p(`He goes to bed at about 8:30 or 9 p.m. and gets up around 4 or 5 a.m. to exercise. That is his own account, given on a podcast in 2024. "You won't find me at the nightcap," he said. "I'll be asleep." In another interview he called himself a big fan of sleep, and listed it first among the things that recharge him.`, "biSleep", "ferriss"),
  quote(`I learned a long time ago that there's a diminishing return to the number of hours worked in any given day.`, "Michael Dell, In Good Company podcast, as reported by Business Insider, December 2024", "biSleep", "fe"),
  p(`Do not read this as a story about balance from day one. In his 2021 memoir he also wrote: "Anyone who says you can start a company and have work-life balance is lying." Both lines are his. Our reading: the young founder paid a price at the start, and the older CEO learned where extra hours stop paying back.`, "charter", "biSleep"),
  example(`For example: in 2003, BusinessWeek described him with a BlackBerry strapped to his hip. One former executive said he blocked an hour each morning and another each afternoon only to read and answer email. By 2006, The Independent reported that his first task of any day was checking questions and complaints from customers. In a 2024 interview he mentioned, in passing, that he had spent that morning with a pharmaceutical company.`, "bwDq", "indep", "mck"),
  p(`He protects his time by deciding what he will not do. He told an interviewer in 2025 that he does not join the quarterly earnings calls, though he does meet big investors whose questions he can learn from. Asked by Fortune what he loves about the work, he named two things, the technology and the customers. Then he added, "I don't really love anything else."`, "timeless", "fortune24"),

  h(`Meetings, memos and the number-to-word ratio`),
  p(`He dislikes anything that slows information down. "Extra layers, approvals, and meetings just slow things down," he told Harvard Business Review in 2005. In the same interview he said any Dell presentation, from any part of the company, will have lots of data. His line for this was, "Our number-to-word ratio is really high."`, "hbr"),
  note(`Next time you make a pitch deck, count numbers versus adjectives.`),
  p(`One meeting says a lot about what he values. In an older interview published by CBS News in 2009, he described the customer advocate meeting: generally every Friday at ==7:30 a.m.==, at any Dell operation in any country. Often 200 or 300 people came from manufacturing, finance, HR, engineering and sales. They went through the numbers that showed whether customers were being served, and customers themselves were invited.`, "cbs"),
  example(`For example: Dell explained in 2005 how live data changed a normal morning. Salespeople could see their margin on a sale while still on the phone with the buyer. If the consumer team noticed at 10 a.m. that too few calls were coming in, they could run a web promotion by 10:15. As Rollins put it, they did not need to call the bosses for permission.`, "hbr"),
  p(`His memoir describes a company process that he says settles any decision, however complex, in ==30 to 40 days==. The first stage is called Facts and Alternatives, a few weeks of collecting facts and looking at the real options. The second is Choices and Commitments, where you decide and then stick to it. Dell used this method to choose the name Dell Technologies after the EMC merger.`, "charter"),
  p(`Rollins summed up the rule in that 2005 interview: decide fast, even without complete data, because deciding with no data is a sin, but so is delaying while you over-analyse. Jamie Dimon of JPMorgan compares Dell's style to the OODA loop, a military idea: observe, orient, decide, act. __Speed here does not come from guessing. It comes from having the numbers ready before the question is asked.__`, "hbr", "fortune24"),

  h(`Two people in one glass box`),
  p(`For years, Dell and Rollins worked in adjoining offices. The wall between them was glass, with a large door that was never closed. In 2001 Dell proposed that neither would make a major move without the other's approval. He said each of them was right about ==80%== of the time, and that together their hit rate was much higher.`, "hbr", "bwDq"),
  quote(`It's a myth that one person can really run a company.`, "Michael Dell, Harvard Business Review, March 2005", "hbr"),
  p(`Rollins finished the thought: "Either he doesn't actually run it, or he dies trying." They even disagreed in turns. Dell was keen on entering printers while Rollins held back, and on the storage partnership with EMC they swapped sides. The same idea ran lower down. Dell often paired two executives on one important business, an approach called "two-in-a-box," so that each checked the other and they shared the blame.`, "hbr", "bw"),
  p(`The Rollins partnership ended badly, as you will read later. But the habit stayed. Jeff Clarke, who joined in 1987, is the closest thing he has to a co-founder, and Dell credits him with much of the company's AI road map. Dell moved him up to chief operating officer in 2019, calling him a trusted adviser of more than 30 years. Asked about partners in 2024, Dell was blunt.`, "fortune24", "crn19"),
  quote(`I know I can't do much of anything by myself, so I've been intentional in trying to find the best people I can to help me.`, "Michael Dell, McKinsey Quarterly, 2024", "mck"),

  h(`Hiring, firing and the swim test`),
  p(`He is honest about how rough the early system was. "We used to just throw people in the deep end and see if they'd sink or swim," he said of the late 1990s. "If they couldn't swim, we'd get someone else." Rollins admitted part of the problem was hiring the wrong people. The fix was to grow their own: promotions to vice president and director moved from about ==75% outside hires== to about ==70% from within==.`, "hbr"),
  p(`When he did need outsiders, he went and got them. Dell needed engineers who could design microprocessor systems, and Compaq had them. So the company put up a giant billboard right outside Compaq's headquarters. It read "158 Miles to Opportunity," with an arrow pointing to Austin. "Culturally, it worked," he says. University of Texas graduates could come home.`, "timeless"),
  note(`A billboard outside your rival's office. Cheaper than a recruiter, and much funnier.`),
  p(`Performance was judged hard. When top managers in Europe lost out on profits in 1999 by not cutting costs enough, they were replaced. BusinessWeek reported that the head of the server business was demoted after delivering 16% sales growth in 2002, because, two former executives said, it could have been better. A Dell spokesman said the move was part of a wider reorganisation. Asked what happens to a manager whose unit starts losing money, Rollins answered, "You become a pariah." Dell added, "It hasn't happened recently."`, "bw", "hbr"),
  p(`He also has a theory about people who cannot grow as fast as the company. In 1987 Dell hired Don Collis, a former treasurer at Standard Oil, as CFO. When the company became ten times bigger, Dell asked him to step down to treasurer. Later came another step down, to director of investor relations. Each time, Dell recalls, Collis said yes. By Dell's telling, he made several hundred million dollars by staying, where leaving would have earned him a couple of million.`, "timeless"),
  quote(`Well, you don't want everybody sticking around. You want the ones that are delivering and helping you succeed.`, "Michael Dell, Timeless interview, 2025", "timeless"),
  note(`Your ego or your shares. Don Collis chose his shares.`),

  h(`What working there was actually like`),
  p(`Mike Carter joined in 1989 and left in 2020, and he wrote down what he remembered. This is one man's memory, but it is specific. New hires had breakfast with the founder, then 24, with big hair and bigger glasses, who said "obviously" and "cool" a lot. Carter recalls him standing behind people's desks asking what they were coding, taking sales calls, working the assembly line, and loading trucks up to the ==11:59 p.m.== cut-off at quarter end. Big wins earned an "On the Spot Award": a $100 bill from his wallet.`, "carter"),
  p(`The culture he described in that older CBS interview had first names, no assigned parking and blue jeans in many areas. He said he answered email from anyone in the company. His reason is worth copying: as a company grows, "you can definitely lose track with what is actually going on." Then he added, "It is often very different from what appears to be going on."`, "cbs"),
  p(`Now the other side. In 2004, Dell's own chief marketing officer, Michael George, told strategy+business that some people got great results but "break too much glass along the way," and that the company had tolerated it too much. He also said, "We saw there was a little too much of a sink-or-swim mentality." Executive coach Kate Ludeman, who had worked with Dell since 1995, told BusinessWeek in 2003: "They need to work a lot on appreciating people."`, "sb", "bw"),
  p(`Nnamdi Orakwue, who became Dell's chief of staff in 2011, called him "fantastic" and "a legend." He also described being one of "200-odd vice presidents" competing for budget inside a roughly $60 billion company. He left in 2015 to start his own firm and said the inside fight had prepared him for that. Fortune reports that employees from the private-company years say Dell became more connected to his workforce after 2013, and in 2015 he said the internal Tell Dell survey had its best scores in 14 years.`, "orakwue", "fortune24", "cio"),
  p(`So what do you take from all of this? Show your numbers. Hold one meeting a week about your customers. Find a partner who can overrule you. Put your weakness somewhere you will see it every day. __None of these needs money. They need a founder who can stand being told he is wrong.__`, "hbr", "bw"),
] },

{ id: "mindset", kicker: "What he believes", title: "Pleased, But Never Satisfied", blocks: [
  p(`Michael Dell is not a man who gives you big speeches about his philosophy. Fortune says it is hard to get a splashy sound bite out of him. But he has been saying the same few things for 40 years. Here are eight of them, each with the story that shows whether he means it.`, "fortune24"),

  h(`1. Play nice, but win`),
  p(`His parents said this to him and his brothers whenever they went out to play ball in the street. He thinks people often remember only half of it. For him it means being fair and ethical and also not forgetting to win. He says he has seen again and again that treating people fairly comes back to you.`, "ferriss"),
  p(`The clearest test came on ==29 May 2013==. Carl Icahn was trying to take his company from him. Dell picked up the phone, called him directly, and was invited to dinner at Icahn's home that same evening. Over Mrs. Icahn's meatloaf, he kept asking what Icahn's plan for the company actually was. He left convinced there was none. Polite dinner guest, cold conclusion: that is the motto in one evening.`, "excerpt", "charter", "ferriss"),
  note(`He went to his enemy's house, ate meatloaf, and found the bluff.`),
  p(`In fairness, Icahn tells it differently. Dell and his partner Silver Lake did raise their offer, by 10 cents a share plus a special dividend for some holders. "The shareholders got a lot more money because of me," Icahn told Fortune in 2024. And "nice" has limits. In his memoir Dell calls Icahn things like a circus clown, and a review published with TIME called the book a victory lap of sorts.`, "fortune24", "charter"),

  h(`2. Pleased, but never satisfied`),
  p(`Inside Dell they shorten this to PBNS. BusinessWeek reported in 2003 that a success at the company earned five seconds of praise, then five hours of post-mortem on what could have been better. When Dell's first Asian factory opened in Malaysia, the CEO sent the manager one of his old running shoes. The message was that this was only the first step in a marathon.`, "mcontrol", "bw"),
  quote(`Celebrate for a nanosecond. Then move on.`, "Michael Dell, BusinessWeek, 2003", "bw"),
  p(`He calls it a race with no finish line and links it to the Japanese idea of kaizen, continuous improvement. In 2019, when a reporter asked about his legacy, he said, "Ask me when I'm 90 or something," and claimed to spend 99.99% of his time thinking about the future. His office also keeps mementos of the company's high and low points, because he believes success depends on how you deal with failure.`, "cnbc21", "stat19", "mcontrol"),
  note(`Great for growth. Hard on morale. See the 2001 survey again.`),

  h(`3. Success is a horrible teacher`),
  p(`The year after Dell went public, two things nearly finished it. A hugely ambitious engineering project named after the Olympics failed. And the company got caught holding the wrong kind of memory chip during an industry change. Dell says the fledgling company almost went out of business, and calls the episode embarrassing.`, "ferriss"),
  p(`Then look at what came out of it. The Olympic failure taught the engineers to be more pragmatic, and it left them with the skill to build a broad line of products quickly. The memory mess became, in his words, the root of the just-in-time supply chain that made Dell famous. __The thing the world admired most about Dell was built out of its most embarrassing mistake.__`, "ferriss"),
  quote(`Failure is always an ingredient of success.`, "Michael Dell, The Tim Ferriss Show, 2021", "ferriss"),

  h(`4. Listen to customers, not rivals`),
  p(`This one is more radical than it sounds. He says competition can actually limit you, because if your rival is not very good, you are measuring yourself against a low bar. You can learn what not to do from them. But he says you learn far more from customers, and he calls this having "big ears."`, "ferriss", "cnbc21"),
  p(`This explains something odd about the company. Fortune points out that Dell has never been a "market maker," a firm that creates demand for something nobody knew they wanted. Analyst Patrick Moorhead says what it does well is knowing when to enter a market, because it is so close to its customers. In a 2003 BusinessWeek view, Dell's mission was not to invent the next big thing but to build the current big thing better than anyone else.`, "fortune24", "bw"),
  note(`You do not need to be Steve Jobs. Dell mostly chose not to be.`),

  h(`5. Facts beat ego, even your own`),
  p(`For more than 20 years, selling direct was the religion at Dell. Then, in April 2007, three months after returning as CEO, he wrote to staff in a memo that leaked. Forbes called it a repudiation of the gospel he had written himself. He was telling everyone that the idea with which he had changed the industry might no longer be enough.`, "reuters07", "forbes07"),
  quote(`The direct model has been a revolution, but is not a religion.`, "Michael Dell, memo to employees, 25 April 2007", "reuters07"),
  p(`He describes this as plain method. "It's all about the objective function and the objective function was success," he said in 2025. "Not emotional wins." In his list of 21 lessons he says the scientific method works in business, and that you must be humble enough to change your mind if the data says so. __The founder is often the last person in the company allowed to say the founding idea has run out. So he has to say it himself.__`, "timeless", "cnbc21"),

  h(`6. Being short of money is an advantage`),
  p(`He loves one comparison. He started with ==$1,000==. Compaq, launched two years earlier in the same state, started with ==$100 million==. Dell had no spare money to pile up unsold machines, so it became a company that holds very little stock. "We didn't become asset-light just because it was a brilliant strategy," he said. "We didn't have any choice."`, "hbr"),
  p(`He still thinks this way. In 2025 he said he would have been skeptical of early investors even if venture capital had existed in his day, because the company did not need it. He said more companies have too much capital than too little, and "that can be a real curse."`, "timeless"),
  note(`Read this twice before you spend a month chasing a funding round.`),

  h(`7. Most risks are smaller than they look`),
  p(`Asked about starting up, he says it never seemed like a big risk to him. "It's not life or death. It is just a risk," he said in 2025. His attitude at 19 was that if it worked, great, and if not, he would go back to college. He also says he never cared much what friends thought of the idea, since most of them did not understand it anyway.`, "timeless"),
  p(`Be fair when you read this. He could say it partly because college was still sitting there, waiting, and many readers of this book do not have that kind of cushion. The useful part is the question behind it: what is the actual worst case, and can you walk back from it? He wrote his memoir hoping people would take more risks, because he sees talent wasted by fear.`, "timeless", "ferriss"),
  quote(`I have this belief that a lot of human potential is left unrealized because people are afraid to fail.`, "Michael Dell, The Tim Ferriss Show, 2021", "ferriss"),

  h(`8. Nobody knows, so build for it anyway`),
  p(`He is suspicious of predictions, including his own. "History shows that predictions are mostly wrong; nobody really knows," he said in 2025. He says that if you had asked the top 100 AI scientists in 2019 whether language models would change everything within five years, 99 would have said no. When Fortune asked in 2024 how big AI could be, he thought aloud, and ended with, "I don't know for sure. Nobody knows."`, "timeless", "fortune24"),
  p(`So he does not bet on forecasts. He prepares, then moves when conditions are right. He points out that the US ten-year Treasury note dropped below 2% three times in about 12 years. The first time he took Dell private. The second time he bought EMC and VMware. The third was during the coronavirus.`, "mck"),
  quote(`When money goes on sale, stuff happens.`, "Michael Dell, McKinsey Quarterly, 2024", "mck"),
  example(`For example: he says Dell knew data was valuable long before anyone was really using it, and went all in on storing and handling it. It tried servers in 1989, which he says was too early, and got serious in the mid-1990s. Being early without betting the company is how you are still around when the timing finally turns right.`, "timeless", "fortune24"),
  p(`One more line from his list of 21 lessons: "Try never to be the smartest person in the room." Another: "Don't be a victim, ever." Neither one costs anything, and you can start on both today.`, "cnbc21"),
] },

{ id: "personal-life", kicker: "The private man", title: "The Boy Who Stopped Stuttering", blocks: [
  p(`Tim Ferriss once asked him the Warren Buffett question: what is the best investment you ever made? Dell gave the obvious answer first, the $1,000 he put into his company. Then he told a story almost nobody knows. In about second or third grade, he had a bad stutter.`, "ferriss"),
  p(`His mother noticed, and found him a speech coach. It felt to him like he went every day after school. After about six months, he stopped stuttering. He says it could have held him back otherwise. "My mother, may she rest in peace," he began, when telling it, and he counted it as an investment she made rather than one he did.`, "ferriss"),
  note(`Now he speaks to thousands. As a small boy, he needed a speech coach.`),
  p(`He kept the shyness, though. He calls himself "pretty introverted, maybe deeply introverted." Because he succeeded so young, people were always asking him for things, and he says he developed "a little bit of a Teflon coating" to deflect them. His memoir admits that when strangers ask for a meeting, he usually says, "Sure, call my office," and then does not follow up. It also reveals that he kept a dictionary with a black leather cover on his desk, so he could secretly look up words he did not know.`, "ferriss", "charter"),
  quote(`But the on-stage stuff, it's all an act; it's not my natural state of being.`, "Michael Dell, The Tim Ferriss Show, 2021", "ferriss"),
  p(`He was not always the careful man you see now. In the same interview he owned up to being an irresponsible young guy, driving fast cars and collecting too many traffic tickets. One stop too many ended with him in the back of an Austin police car, taken downtown and fingerprinted, before he was let go. He says he would not have told that story 20 years ago, when he was not comfortable showing weakness.`, "ferriss"),

  h(`Susan`),
  p(`He went on a blind date in 1988 with Susan Lieberman, a fashion designer from Dallas. "He was the nicest guy I'd ever met," she told Texas Monthly. They married in October 1989, when he was 24. She ran a boutique in Austin, designed inaugural ball gowns for the Bush daughters in 2001, and later opened a New York fashion label called Phi, which closed in 2009.`, "biLife"),
  p(`When he describes his worst stretches, she is the person he names. In the early 1990s, when everything at the company seemed to fall apart at once, he says he would go home and try to sleep while thinking about the families who had moved to Austin because of him. During the 2013 buyout fight, the board at one point asked him not to speak to members of his own management team. His wife was there supporting him, he says. And when he recharges, it is often on a long walk in the woods, sometimes with her.`, "ferriss"),
  note(`Read that again: he lay awake thinking about other people's families.`),

  h(`Four children and house rules`),
  p(`They have four children. He is careful about them in public, and so are we. What he has said is mostly about method. Of parenting he says "you have to be helpful but not too much," and you have to decide when to let your kids make mistakes. In their house, he says, the rules were the rules: if you wanted something, you worked for it or saved for it.`, "timeless", "indep"),
  p(`The one child whose work is fully public is Zach Dell, co-founder and CEO of Base Power, an Austin home-battery company he started in 2023. In August 2026 it raised $1 billion at a ==$13 billion== valuation. Fortune noted that the "nepo baby" talk follows him, and he clearly wants to build a name of his own. His father's answer to how his children got ambitious is short: part of it is "the genetic lottery," and he is not calling them every day to push them.`, "wsjBase", "base", "fortuneBase", "timeless"),

  h(`How he stays well`),
  p(`He is open about his habits and very private about anything else. An interviewer listed them in 2025: a 35-year marriage, no drinking, regular exercise. Why? "Because the opposite is horrible," he said. "It's pretty simple." He wakes early to exercise, and in the older CBS interview he recommended exercise as the way to deal with day-to-day stress.`, "timeless", "biSleep", "cbs"),
  p(`His hobbies are few. Fortune calls them "very, very few." In a rapid-fire round in 2024 he picked cycling over mountain biking, a book over a movie, and basketball when asked to pick between football and baseball. His friend Marc Benioff told Fortune that Dell had recently taken up hunting birds with a bow and arrow, though the company would not confirm it. And when asked what he would do if not this, he said: "Gee, I don't know. Maybe unemployed."`, "fortune24", "mck"),

  h(`How he spends and how he gives`),
  facts(
    ["$3.38M", "His total reported pay for fiscal 2026. He receives no stock grants at all.", "r2"],
    ["$100.47M", "Record price of the Manhattan penthouse he reportedly bought in 2014. The buyer stayed secret until 2018.", "cnbc18", "rd"],
    ["$10B+", "Total philanthropic commitments by Michael and Susan Dell, by their own count, April 2026.", "fact26"],
    ["$6.25B", "Their 2025 gift: $250 each for the investment accounts of 25 million US children.", "reuters25", "onedellOct"],
  ),
  p(`Yes, he lives very large. Besides the penthouse, reports list homes in Texas, Hawaii and Boston, and we are leaving out the details. He started his family office in 1998 with $400 million of his own money, and it has owned hotels and much else. Forbes says much of his fortune now sits there. In May 2026 NFL owners approved his purchase of a ==5.3%== stake in the Las Vegas Raiders, a stake the Houston Chronicle estimated at $524 million.`, "cnbc18", "rd", "forbesP", "sbj", "chron"),
  p(`He and Susan set up the Michael & Susan Dell Foundation in 1999. Why children? "Being a parent of four children and seeing some children who are not so fortunate, it just seemed the right thing to focus on," he said in 2006. That same year, praising Warren Buffett's decision to give away his fortune, he made a very dry joke about what rich men could do instead: "They could have collected Fabergé eggs or something."`, "indep"),
  p(`The biggest single gift came on ==2 December 2025==, at the White House. They pledged $6.25 billion to put $250 into the new government-backed investment accounts of 25 million children. The accounts carry a political name, Trump Accounts, while the Dells describe the wider idea as bipartisan. By 9 October 2026, the money had gone out to children born from 2016 to 2024 in ZIP codes with median family income of about $117,300 or less. They say the children's letters are what made the number real for them.`, "reuters25", "wh25", "onedellDec", "onedellOct", "invest"),
  photo("wh"),
  p(`Then there is the university he left. In April 2026 they committed ==$750 million== to UT Austin, for a medical centre planned to open in 2030 with AI built into it from the start, plus scholarships and computing. Lifetime giving to UT passed $1 billion. As part of it, the old Dobie residence hall is being renamed The Dell House. His parents wanted him to be a doctor, remember. He dropped out of pre-med, and his name went on the medical school.`, "cnbc26", "fact26", "ap26", "fortune24"),
  note(`The dropout's old dorm is being renamed Dell House.`),
  photo("med"),
  p(`India is a real part of this, and it is the part most readers here can touch. The foundation says it has backed urban microfinance in India since 2006, equips 1.3 million young people with job skills, and enables credit for 460,000 business owners. Its Dell Aspire Scholars programme gives students at Delhi colleges including Delhi Technological University and Hansraj College tuition, housing, a laptop, coaching and a mentor. It aims to support over 1,000 students by 2035. These are the foundation's own figures. By 2015 it had already put in about $185 million.`, "msdfIndia", "aspire", "bl15"),
  note(`Studying at these Delhi colleges? Check the foundation's page. It comes with a mentor.`),
] },

{ id: "the-brand", kicker: "The public face", title: "Vanilla and Square", blocks: [
  p(`In March 2024, a Fortune writer watched Michael Dell come out of a photo shoot he had tolerated but clearly not enjoyed. She described him as measured, analytical and "almost intentionally unexciting." The next morning she watched him speak at a health summit and summed up the performance as "just fine." This was a man worth about $100 billion that very month, and his name is on millions of machines.`, "fortune24"),
  p(`He knows it. BusinessWeek reported an old moment that says everything. After hearing tales about the flamboyant Larry Ellison of Oracle, he held up a sheet of paper and told an aide with a straight face: "See this? It's vanilla and square, and so am I." __Here is the surprise of his brand: he never had to build a personality, because he put his name on the product and let the product do the talking.__`, "bw", "fortune24"),
  note(`You can be boring and still win. Very important for introverted founders.`),
  photo("drEvil"),

  h(`The ad that was not about him`),
  p(`For most ordinary people in the early 2000s, Dell did not have a founder's face. It had Steven. Starting in 2000, a young actor named Ben Curtis appeared in 26 commercials as a chirpy kid telling people, "Dude, you're getting a Dell!" Dell's advertising manager told USA Today in 2002 that he had made the company seem approachable and fun.`, "techradar", "usatoday"),
  p(`Then the company did something most brands would not. Its marketing chief later said that "the advertising began to become more about Steven than about the Dell product," and Dell ended the character. He said the duller replacement ads actually sold better per spot. Twenty-three years later came the twist. In August 2026, Michael Dell himself posted a ten-second AI-made video on X, captioned only "2026," in which a lookalike watches a crane lower an AI server rack into a suburban yard.`, "nexttv", "techradar"),
  note(`Vanilla and square, but he has clearly learned how to post a joke.`),

  h(`The sentence he has never lived down`),
  p(`On 6 October 1997, at a Gartner conference, he was pressed on what he would do with struggling Apple if he were Steve Jobs. "What would I do? I'd shut it down and give the money back to the shareholders." Apple was then in real trouble, and CNN later noted that others were saying similar things. Jobs answered with an email: "CEOs are supposed to have class. I can see that isn't an opinion you hold." At his next keynote he added, "We're coming after you, buddy!"`, "cnn11", "cult", "charter"),
  p(`Dell's account has shifted over time. In 2011, weeks after Jobs died, he told a conference that he had been asked more than once, and that he meant only that he was the CEO of Dell and not a CEO for hire. "My answer was misconstrued," he said, and he added that Jobs was a friend. In his 2021 memoir, according to one reviewer, he says he called Jobs to smooth things over and now calls the comment stupid. Apple went on to be worth around $400 billion by that 2011 talk, and the line follows him still.`, "tc11", "charter"),
  note(`One sentence at a conference. Twenty-nine years later, it is still quoted.`),

  h(`When the internet shouted back`),
  p(`In June 2005, journalist Jeff Jarvis got fed up with a bad laptop and a worse helpline, and posted on his blog under the headline "Dell sucks." Thousands joined in, and the episode was soon known as "Dell Hell." Dell's policy toward bloggers at the time was "look, don't touch." Jarvis returned the laptop and bought a Mac.`, "jarvis", "jarvis2"),
  p(`What came next is the useful part. A Dell manager later recalled Michael Dell asking why they were not listening to these voices and connecting them with customer service. In 2006 the company sent technicians to complaining bloggers and started its own blog, Direct2Dell. In February 2007 he launched IdeaStorm, a site where customers could tell the company what to do. Staff told Jarvis it was his own idea. Customers demanded Linux on desktops, and Dell agreed.`, "smt07", "jarvis", "jarvis2", "cringely"),
  example(`For example: by 2009, Dell's @DellOutlet account on Twitter had passed $3 million in sales from promotions. Commentators at the time noted the money was not the main point. A company once famous for ignoring its critics now had many corporate Twitter accounts, wikis and blogs answering them. Its negative blog mentions had fallen, by Dell's own measure, from 49% to 22%.`, "smt09", "jarvis"),

  h(`When he does speak up`),
  p(`He picks few public fights, but he has had some memorable ones. At Davos in January 2019, a panel moderator asked him about a proposal for a 70% top tax rate. "No, I'm not supportive of that," he said, as the room laughed. "Name a country where that's worked." From the same panel, MIT economist Erik Brynjolfsson replied: "The United States." He pointed out that the top rate averaged about 70% from the 1930s to the 1960s, and that growth in those years was pretty good. The clip spread across social media.`, "guardian", "atlantic"),
  p(`These days his most direct channel is his own account on X. On 19 June 2024 he wrote, "We're building a Dell AI factory with @nvidia to power @grok for @xai @elonmusk." Dell shares climbed as much as 8.3% the next morning, before giving back most of that. In June 2026 he personally announced on X that shareholders had voted, with 97% approval, to move the company's legal home to Texas. He also writes long posts on LinkedIn, and one of those comes back to bite him in the next chapter.`, "fortuneX", "fox", "hybrid"),
  p(`He wrote two books more than 20 years apart, and they show how his public voice changed. He says the first one, from the 1990s, did not disclose much. The second, Play Nice But Win in 2021, tells of near-failures, the arrest and bad decisions. His explanation is age and maturity, and a wish to show people how hard it really was.`, "ferriss"),

  h(`How different countries see him`),
  p(`In Austin he is close to a founding father. The city's mayor told Fortune in 2024, "If you took Michael Dell out of the equation, it would be a strikingly different city." The president of UT called him "Leading Exhibit A" for why people should come there. Axios says he has arguably had a greater economic impact on Austin than anyone in its history. In Washington, in October 2026, he received a National Medal of Technology and Innovation from President Trump. Our reading: the medal and the Trump Accounts tie his image closer to one political moment than it used to be.`, "fortune24", "axios26", "medal", "wh25"),
  p(`Abroad, his youth was the first story. When he went to Japan as a 23-year-old CEO, he recalls that it seemed highly unusual to people there. In the US, he says, the reaction was simply: a young computer guy from Texas, okay, we get it.`, "timeless"),
  p(`India has known him as an employer for a long time, and not always a smooth one. In 2003, after an onslaught of complaints, Dell stopped sending some US corporate support calls to Bangalore. Dell would not discuss the reasons, but a Texas newspaper reported complaints about accents and scripted answers. Yet three years later he stood in Bangalore and promised to double his India staff to ==20,000==. In 2013 he told PTI the country had gone from one person to 27,000 and that he personally visited a few times a year.`, "ap03", "info03", "nyt06", "pti13"),
  quote(`We love the talent that is available in India, so we are going to keep growing in India.`, "Michael Dell to PTI, Davos, January 2013", "pti13"),
  p(`In 2015 he came to Bengaluru, praised Digital India and Make in India, and held what The Hindu called "speed dating" with Indian start-ups. "We want to be the entrepreneurs' best friend," he said. India was then Dell's third-largest market, and he pointed out that only 10% of its 240 million households had a PC. A year later Mint reported India was the only country outside the US with Dell's networking, storage and server research. By 2025, IDC ranked Dell third in India's PC market with a 16.1% share.`, "hindu15", "bl15", "mint16", "fi25"),
  p(`Our reading: to most Indian students, Dell is a laptop brand and a possible employer in Bengaluru more than a personality. That seems to be the kind of fame he prefers.`, "fortune24", "fi25"),
  timeline(
    ["1997", "\"I'd shut it down\": the Apple comment.", "cnn11"],
    ["2000–03", "\"Dude, you're getting a Dell\" makes the brand a household joke.", "techradar"],
    ["2005", "\"Dell Hell\" shows that customers can now answer back in public.", "jarvis"],
    ["2007", "IdeaStorm launches. The founder asks customers what to do.", "jarvis"],
    ["2019", "Davos: \"Name a country where that's worked.\"", "guardian"],
    ["2021", "Play Nice But Win: the vulnerable version of the story.", "ferriss"],
    ["2026", "An AI-made \"Dude\" video on X, and a medal at the White House event.", "techradar", "medal"],
  ),
] },

{ id: "what-went-wrong", kicker: "The bills he paid", title: "What Went Wrong", blocks: [
  p(`He says it himself, about the turns his company has taken: "we got a lot of them right, but we didn't get all of them right." Here are the ones he got wrong, or that went wrong on his watch. We have been careful here. A settlement is not a conviction, an allegation is not a finding, and we will say which is which each time.`, "mck"),
  facts(
    ["$100M + $4M", "SEC penalties in 2010: the company's, and his own. Settled without admitting or denying.", "secPr"],
    ["$1 billion", "The 2023 Class V settlement, a record in the Delaware Court of Chancery.", "delFee"],
    ["$300M", "Charge Dell announced in 2005, partly to fix faulty desktop computers.", "nyt10a"],
    ["133,000 → 97,000", "Dell's headcount, February 2023 to January 2026.", "biHead", "tenk"],
  ),

  h(`He stepped back, and the company slid`),
  p(`In July 2004 he handed the CEO title to Kevin Rollins and stayed as chairman. By his own account not much really changed, and they kept running it together. Early in 2005 things looked perfect: Fortune named Dell America's most admired company. By late 2005, sales were missing projections. Rivals had copied much of its supply chain, and customers were moving from customisable desktops to notebooks.`, "excerpt"),
  p(`He admits two things in his memoir: "It took us a little bit longer than we would have liked to figure all this out," and that for a few years the company had put profit ahead of growth and share. Back in June 2006, though, his tone was different. Asked about Wall Street's charge of complacency, he said, "Anyone internally would laugh at the complacency charge." Seven months later Rollins was out and Dell was CEO again. Hewlett-Packard had taken the top spot in PCs.`, "excerpt", "indep", "sec07", "ftRollins"),
  p(`He had said in 2003 that the company was much stronger with the two of them doing it together. In 2007 the analyst Roger Kay told the Financial Times that Dell probably shared as much responsibility as Rollins for the failings, adding, "The rules of Wall Street demand that there be human sacrifice." Dell himself writes that if there was blame, he shared it. __When you share the wheel with someone, you also share the crash, whatever the title says.__`, "bwDq", "ftRollins", "excerpt"),
  note(`Laughing at the complacency charge is itself a warning sign.`),
  photo("hq"),

  h(`The Intel money`),
  p(`This is the most serious one. On 22 July 2010 the US Securities and Exchange Commission charged Dell Inc. with failing to tell investors about large payments it received from Intel for not using chips from rival AMD. The SEC alleged those payments grew from ==10%== of Dell's operating income in fiscal 2003 to ==38%== in fiscal 2006, and peaked at ==76%== in one quarter of fiscal 2007. It alleged that without them, Dell would have missed Wall Street's earnings estimates in every quarter from fiscal 2002 to 2006.`, "secPr", "bbc10"),
  p(`When Intel cut the payments after Dell announced it would use AMD, profits dropped sharply. The SEC alleged that Dell, Rollins and the CFO, who had been warned this could happen, told investors the drop came from aggressive pricing and component costs. Separately, the SEC charged former finance staff with using "cookie jar" reserves to smooth the numbers. Dell had already restated its books, erasing $92 million of net income.`, "secPr", "forbes07"),
  p(`The outcome: Dell Inc. paid a ==$100 million== penalty. Michael Dell and Rollins paid ==$4 million== each and the former CFO $3 million. All settled without admitting or denying the allegations. In fairness, the company pointed out that Mr. Dell's settlement covered only claims that require negligence, not fraudulent intent, and did not involve the accounting fraud charges. It also did not stop him from remaining CEO and chairman.`, "secPr", "dellPr", "bbc10"),
  example(`For example: imagine a shop that says its profit comes from great service, when three-quarters of it in one period is a cheque from a supplier for not stocking a rival's goods. Any investor would want to know. That, stripped down, is what the SEC claimed was missing from Dell's story.`, "secPr"),
  note(`Very important: know where your profit really comes from, and say so.`),

  h(`The bad capacitors`),
  p(`From 2003 to 2005, Dell sold millions of OptiPlex office desktops with faulty capacitors, tiny parts worth a fraction of a penny that leaked and burst. When computers failed at the University of Texas, his own university, Dell reportedly suggested the math department had overworked them with difficult calculations. A 2004 internal study first predicted that 12% of some models would have trouble in three years, then raised that to 45%, and said it could reach 97%.`, "nyt10a", "nyt10b", "vb"),
  p(`Lawsuit documents unsealed in 2010 showed employees knew the machines were likely to break while playing down the problem to customers, The New York Times reported. Dell did not recall them. It replaced them case by case. The company's answer was that this was an industry-wide problem from a supplier, that it had extended warranties and worked with customers, that there was no safety risk, and that the plaintiff had used desktops as servers. Its lawyers denied the plaintiff's claims, and it settled that suit in September 2010 on undisclosed terms.`, "nyt10a", "nyt10b", "infoAit", "statAit"),
  p(`The exploding batteries were a different kind of trouble. In August 2006 Dell recalled ==4.1 million== laptop batteries that could overheat and catch fire. That one was mainly Sony's flaw, the Associated Press and The New York Times both noted, and Apple recalled batteries too. Fair is fair. But it landed in the same bad year, and it hurt.`, "apBattery", "nyt07"),

  h(`The $1 billion lawsuit`),
  p(`To help pay for EMC in 2016, Dell created a special share class, Class V, that was supposed to track VMware's value. It traded at a discount of about 30% from the start. Part of the reason, a Delaware judge wrote, was the company's right to force conversion of those shares. In 2018 Dell bought them out for ==$23.9 billion==. Former holders sued Michael Dell, Silver Lake and other directors, alleging they were pushed into an unfair deal.`, "delClassV", "blawFee", "rgrd"),
  p(`The case settled on the eve of trial for ==$1 billion== in cash. The judge wrote, "The 'b' is not a typo." It was the largest recovery of its kind in that court, and $266.7 million of it went to the lawyers. The company and its insurers paid, on behalf of the defendants, under indemnity agreements a board committee reviewed. Because it settled, no court ruled on whether the allegations were true. In fairness, the price had already been raised from $109 to $120 a share after big holders pushed back, before the deal closed.`, "delFee", "dell8k22", "dellNote23", "dellNote25", "delSup24", "delClassV"),
  p(`There was also a fight over the 2013 buyout itself. In 2016 a Delaware judge decided that the shares bought at $13.75 were worth ==$17.62==. That implied investors had been shortchanged. In December 2017 the Delaware Supreme Court reversed that part of the ruling, saying the judge was wrong to give no weight to the market price, and sent the case back. So on that one, the record leans his way.`, "delSup17", "potter", "wsgr"),
  note(`Complicated share structures make complicated enemies. Keep your cap table simple.`),

  h(`The promise he reversed`),
  p(`On 7 September 2022 he wrote on LinkedIn, in his own name, about employees working from home. The words are worth reading carefully, given what came next. He said Dell had found no meaningful differences between remote and office workers on careers, and that the company had committed to letting people choose their work style.`, "hybrid", "fortune22"),
  quote(`If you are counting on forced hours spent in a traditional office to create collaboration and provide a feeling of belonging within your organization, you're doing it wrong.`, "Michael Dell, LinkedIn, 7 September 2022", "hybrid"),
  p(`In February 2024, Dell told staff that those who stayed fully remote would not be considered for promotion or be able to change roles. Hybrid staff had to be on site 39 days a quarter, and The Register reported that attendance would be graded. Dell's statement said in-person connections were critical to innovation. Business Insider reported that nearly half of workers had picked remote anyway. Then on 31 January 2025 he emailed staff: "We are retiring the hybrid policy." Anyone living near an office would be back five days a week from 3 March.`, "biRemote", "regColor", "ars", "biFive"),
  p(`He is allowed to change his mind. Belief number 5 in this book says so. But a public promise is different, because staff who chose remote work had relied on it. Over the same stretch, headcount fell from about 133,000 to 120,000, then 108,000, then ==97,000==. As The Register points out, not all of that is layoffs, since people leave on their own and Dell has sold parts of the business. But some of it was. And in 2024 he was still saying AI would augment humans and not replace them.`, "biHead", "tenk", "regHead", "mck"),
  note(`Before you publish a principle, ask if it survives a bad year.`),

  h(`Smaller bills, and the bad bets`),
  p(`Phones were a turn he saw coming and still missed. He told McKinsey in 2024 that Dell is not an operating system company, and that once Android and iOS won there was no decent return in making Android phones. "So that turned out to be a bad use of capital," he said. Dell's Venue phones came out in 2010 and were dropped in 2012. Back in 2003, HP's then-CEO Carly Fiorina had called Dell "a one-trick pony," and it spent just 1.3% of revenue on research, against nearly 6% at IBM and HP.`, "mck", "bw"),
  p(`Some bills came from the company rather than from him. In 2023 an Australian court ordered Dell Australia to pay A$10 million after it admitted overstating discounts on add-on monitors, sold to more than 5,300 buyers. In 2024 Dell agreed to pay $2.3 million to settle US claims of overcharging the Army through non-competitive bids, with no finding of liability. Also in 2024, someone scraped order data through a partner portal and claimed 49 million records; Dell confirmed names, addresses and order details were exposed, but no financial data.`, "accc", "doj", "bleep", "pa"),

  h(`What you should not copy`),
  p(`Do not hide where your profit comes from. Do not blame the customer for a broken product. Do not laugh off a warning sign in an interview. Do not mock a rival who is down, especially on a public stage. Do not design a deal so complicated that your own investors need a court to understand it. And do not make a public promise to your team that you are not ready to keep through a bad year.`, "secPr", "nyt10a", "indep", "cnn11", "delClassV", "hybrid"),
  p(`What he did right, even in these stories, is also worth noting. He came back and took charge in person. He wrote down many of the mistakes in his own book. __Keep that habit from the very start. Writing down your own mistakes is the cheapest business school there is.__`, "sec07", "excerpt", "ferriss"),
] },

{ id: "today", kicker: "Where he is now", title: "Still at the Desk at 61", blocks: [
  p(`Michael Dell is 61, and he is still chairman and CEO of the company he started in a dorm room in 1984. Benioff calls him probably the longest-sitting CEO in tech. He holds more than half of all votes in director elections. By most measures, the last two years have been the biggest of his life.`, "forbesP", "fortune24", "proxy"),
  facts(
    ["$228.5B", "Forbes estimate on 2 November 2026, world no. 4.", "forbesP"],
    ["$95B", "Record backlog of AI server orders in Dell's latest reported quarter.", "q2"],
    ["$192B", "Dell's revenue forecast for the fiscal year, its own guidance, up about 70%.", "q2"],
    ["97,000", "Employees in January 2026.", "tenk"],
  ),
  p(`The numbers around him now swing wildly. On 8 September 2026, Forbes put him at $267.7 billion and third in the world, ahead of Jeff Bezos. He briefly touched no. 2 that week. By 14 September an AI sell-off had knocked $15 billion off in a single morning, and by 2 November he was at $228.5 billion. In April that same year the same list had him near $172 billion. Remember what these figures are: paper value that moves with a share price which, by mid-September, had risen about 321% that year.`, "qz", "forbes26", "forbesP", "phil"),
  note(`Almost $40 billion gone in eight weeks, on paper. Paper moves. Keep calm.`),

  h(`The current bet: AI needs machines`),
  p(`In the quarter reported on 1 September 2026, Dell booked ==$60.9 billion== of AI server orders, the most in its history. Revenue was up 58% to $47 billion. AI customers passed 6,500. Operating costs are heading towards about 8% of revenue, which management calls the lowest in the company's 42 years. The full-year figures are forecasts, and this sector can turn fast, as the September sell-off showed.`, "q2", "forbes26"),
  p(`He talked it through at a Goldman Sachs conference on 9 September 2026. His view is that maybe 10% or 15% of companies truly understand what they have to do, and the real prize is rebuilding whole workflows, not just giving people better tools. He said the barrier is not technology: "It's people, it's cultures, it's regulation, it's courage." He also said that supply of chips is in a structural shortage, "probably worse in 2027 than in 2026," and that 400 million PCs over four years old will eventually need replacing.`, "gs"),
  quote(`The AI today is pretty extraordinary, but it's also the worst that it'll ever be.`, "Michael Dell, Goldman Sachs conference, September 2026", "gs"),
  p(`Watch one sentence closely. In 2024 he told McKinsey he thought fears of replacement were "quite wrong" and that AI would augment humans. In September 2026 he told investors this: "If you had 200 people doing something, now you can have 50 people doing the same thing with $10 million of AI spend, and it costs half as much, and it actually works better." __He is selling the machines that do this, and running a company whose own staff has shrunk sharply. You should hold both facts in your head.__`, "mck", "gs", "tenk"),
  note(`If you are 17, read that 200-to-50 line again. Plan accordingly.`),
  p(`The man who once sold upgraded PCs from a dorm room now says the complexity of AI systems is his friend. Customers order thousands of systems and Dell handles the design, power, cooling and even short-term financing. Then, after all that talk of data centres, he slipped in a small joke that points back to the dorm room: "And we still make PCs."`, "gs"),

  h(`The money outside Dell`),
  p(`His family office, DFO Management, is now a story of its own. Forbes says much of his fortune lies there, and that 39% of the $69 billion Broadcom paid for VMware in 2023 went to him. In January 2026 the Dell Family Office was named among the investors in TikTok's new US joint venture, alongside Silver Lake and Oracle. We did not find a disclosed stake size.`, "forbesP", "variety"),
  p(`In October 2026, a DFO fund agreed to buy 1.34% of SK Inc., the holding company of the South Korean group whose SK Hynix is a major maker of AI memory chips, for about 544 billion won, roughly $400 million. Korean press called it the firm's first entry into that market under the DFO name. The filings do not state a purpose, and it is the family's fund, not Dell Technologies, so we will not guess at one. Egon Durban, his Silver Lake partner from the 2013 buyout, sits with him in the Raiders ownership group as well.`, "chosun", "alpha", "sbj"),

  h(`Taking the company home to Texas`),
  p(`On 25 June 2026, shareholders voted to move Dell's legal home from Delaware to Texas, effective 1 July. He announced it on X and said the company had innovated and invested in Texas for four decades. Bloomberg Law reported the move sets new restrictions on smaller shareholders. Dell's own filing shows Texas law now requires holders of at least ==3%== of the shares to bring a derivative suit against directors or officers.`, "fox", "blawTx", "eightK26"),
  p(`Future shareholder fights will go to Texas courts rather than the Delaware court that handled the Class V case. Dell says this is about reflecting where it has built its business, and we have no evidence of any other motive. But you now know the history, and you can weigh it yourself. The 97% vote also means less than it sounds, given how much of the vote he holds.`, "fox", "delFee", "proxy", "eightK26"),

  h(`What he says he wants next`),
  p(`We found no retirement date from him. The 2026 proxy says only that "the Board reviews and maintains a succession plan." When Fortune asked in 2024 if he could see himself running Dell in 20 years, he said he had not thought that far, and that no other role appealed to him. Clarke, nearly 40 years at the company, remains vice chairman and COO. Fortune said in 2024 that Dell was spending a little more time each year on his foundation and getting more hands-on with his family office.`, "proxy", "fortune24", "nextplat"),
  quote(`I've said this before: I'll still care about Dell when I'm gone.`, "Michael Dell to Fortune, 2024", "fortune24"),
  p(`Beyond the business, the commitments are concrete. A hospital that opens in 2030 and is designed around data from day one. Twenty-five million children's accounts, which he and Susan hope others will add to. On 8 October 2026 he received the National Medal of Technology and Innovation, cited "for advancing a vision of widespread adoption of personal and enterprise computing."`, "cnbc26", "onedellDec", "medal"),
  p(`And the technology itself? He told investors in September 2026 that he sees "the beginning of an S-curve," and then he went back to work. In 2019 he told a reporter he was pleased but not satisfied, and at 61, worth more than almost anyone alive, he has not changed that line. Asked in 2025 how he has survived so many eras, he said part of it is "waking up every morning and asking what is the most right thing to do at this particular moment." __That question costs nothing. Ask it tomorrow.__`, "gs", "stat19", "timeless"),
] },
];

const lessons = [
  { title: "Say your flaw out loud.", text: "In 2001 Michael Dell stood before his top 20 managers and admitted that his shyness made him seem cold, then let the video go to every manager in the company. Half his staff had said they would leave if they could. Your team already knows your flaw, so saying it costs less than you think." },
  { title: "Put a reminder on your desk.", text: "After that same talk he kept a plastic bulldozer on his desk to stop himself ramming ideas through. He did not trust willpower alone. Pick one bad habit and make it visible today." },
  { title: "Celebrate for a nanosecond.", text: "When Dell's first Asian factory opened in Malaysia, he sent the manager an old running shoe, because the marathon had only just begun. Enjoy the win, then ask what could have been better. Just do not forget to thank people, which is the bit he had to learn later." },
  { title: "Make bad news cheap.", text: "At Dell, he said, the worst thing a leader could do was be in denial, and a manager who admitted a problem and asked for help would be fine. Share the real numbers widely so no one can hide. A problem that arrives early is usually a small problem." },
  { title: "Listen to customers before rivals.", text: "He has run Friday 7:30 a.m. customer meetings and says you learn far more from customers than from competitors. When bloggers roasted Dell in 2005, ignoring them made it worse, and listening produced IdeaStorm. Your benchmark should be the customer's complaint, not the other company's product." },
  { title: "Never marry your method.", text: "Direct selling made him rich, and in 2007 he told his own staff the model \"has been a revolution, but is not a religion.\" Keep the goal and replace the method when the facts change. If you built the idea, you may have to be the one who says it is over." },
  { title: "Let shortage teach you.", text: "He started with $1,000 while Compaq began with $100 million, so Dell learned to hold almost no stock. He says that having too much capital can be a curse. Before you raise money, ask what you would build if you could not." },
  { title: "Watch your cash when you grow.", text: "Dell jumped from $890 million to $2.1 billion in sales in one year in the early 1990s, and everything began to fall apart. He says a new CFO helped him see he was running out of capital. Fast growth can kill you just as surely as no growth." },
  { title: "Pick a partner who can overrule you.", text: "He and Kevin Rollins each reckoned they were right about 80% of the time, and agreed not to make a major move without each other. It worked for years, then ended badly in 2007 when the numbers fell. Choose someone honest enough to stop you, and be clear about who carries the blame." },
  { title: "Do not hand over and look away.", text: "He gave up the CEO title in 2004, stayed close, and still watched Dell lose its lead by 2006. In June of that year he laughed off the charge of complacency, and seven months later he was back. A title change does not take away your responsibility for what you can see." },
  { title: "Tell investors the real reason.", text: "The SEC alleged in 2010 that Intel's payments reached 76% of Dell's operating income in one quarter, without investors being told. He paid $4 million and settled without admitting or denying it. If one source props up your profit, say so before someone else does." },
  { title: "Mean it before you publish it.", text: "In 2022 he wrote that forced office hours were \"doing it wrong,\" and by 2025 he had ordered five days a week. He may have good reasons, but people had planned their lives around his post. Write only the principles you will keep when times get hard." },
  { title: "Do not kick a rival who is down.", text: "His 1997 line about shutting Apple down was still being quoted in October 2026, and a review of his memoir says he now calls it stupid. A cheap shot lasts longer than a good quarter, and the rival may come back for you." },
  { title: "Take the risk you can walk back from.", text: "At 19 his plan was simple: if the company failed, he would go back to college. He says it never felt like a big risk because of that. Work out your real worst case, and if you can survive it, go." },
  { title: "Protect your sleep.", text: "One of the richest men alive is in bed by about 9 p.m. and up by 5 to exercise. He says hours beyond a certain point stop paying back, and he has now lasted more than 40 years at the company. Do not confuse being exhausted with being serious." },
];

const factCheck = {
  method: "Built mainly from Michael Dell's own recorded words (Tim Ferriss 2021, McKinsey 2024, Timeless 2025, HBR 2005, his CNBC essay and LinkedIn posts, and the 2026 Goldman Sachs transcript), SEC filings and press releases, Delaware court opinions, US and Australian government releases, and established press. Legal chapters use the regulator's or court's own text wherever available, state the outcome each time, and include Dell's response. Memoir details not read directly are attributed to reviews (Charter/TIME, Moneycontrol, Forbes and his own LinkedIn excerpt). One former employee's personal essay (Mike Carter) is used only for his own first-hand memories and labelled as such. Reddit, forums and social posts were not used; the only social posts quoted are his own, as reported by press. The HBR text comes from a third-party reprint copy, and the BusinessWeek details come from archive and reprint copies because the Bloomberg original is paywalled. The two New York Times 2010 pieces were read only in part because of the paywall, and their details were cross-checked against VentureBeat, InfoWorld and the Austin American-Statesman. Numbers in the 'today' chapter change daily and are dated in the text.",
  disputed: [
    { claim: "Exact wording of the 1997 Apple remark.", note: "CNN and TechCrunch quote \"I'd shut it down and give the money back to the shareholders.\" The Charter/TIME review of his memoir prints \"I'd shut the company down and give the money back to shareholders.\" We use the version in contemporary press accounts. He has said it was misconstrued (2011) and, per the review, now calls it stupid." },
    { claim: "Why the 'Dude' campaign ended.", note: "Dell's marketing chief said in 2003 the character was dropped in fall 2002 because ads were becoming about Steven, months before the actor's 2003 arrest. Other accounts (TechRadar, PCMag, Business Insider) link the end of his contract to the arrest. We use the executive's on-record account and leave the arrest out, as it is not needed for the story." },
    { claim: "How many laptop batteries were recalled in 2006.", note: "Associated Press says 4.1 million, Forbes says 4.2 million. We use 4.1 million." },
    { claim: "Size of the City of New York batch in the capacitor case.", note: "The New York Times says 20.2% of 5,000 computers; VentureBeat, summarising the Times, says 2,000. Neither figure is printed in the chapter, only the study percentages." },
    { claim: "Who paid the $1 billion Class V settlement.", note: "Fortune says Dell Technologies paid. Dell's SEC filings say the company and/or its insurers paid on behalf of the defendants under indemnification obligations, and expected $106 million back from insurers. We use the filings." },
    { claim: "Buyout price in 2013.", note: "Often given as $13.65 a share. The Delaware Supreme Court uses $13.75, the final deal price with the added consideration. We use $13.75 with the court." },
    { claim: "His net worth.", note: "Forbes showed $228.5 billion and no. 4 on 2 November 2026. Other pieces from the same weeks cite Bloomberg with different figures and ranks (for example fifth, about $241 billion, in October 2026). Dates and methods differ. We use Forbes throughout." },
    { claim: "How much of Dell Technologies he owns.", note: "Fortune (2024) said 53% in his or Susan's name; Chosun Biz (2026) says he and DFO hold 40%. The 2026 proxy text we read says only that he holds more than 50% of total voting power in director elections. We state the voting figure only." },
    { claim: "Total giving.", note: "Their own April 2026 fact sheet says more than $10 billion in commitments. Other reporting cites over $3 billion given by the foundation. Commitments and money paid out are different things. We state \"commitments, by their own count.\"" },
    { claim: "ZIP code threshold for the $250 gift.", note: "The White House said in December 2025 that it applied below $150,000 median income. The Dells' final figure in October 2026 is $117,300 median family income, because the money reached 25 million children at that level. We use the final figure." },
    { claim: "Jeff Clarke's title.", note: "An Investing.com summary of the September 2026 earnings call calls him \"Chief Executive.\" The Next Platform and Dell Technologies World 2026 materials give chief operating officer and vice chairman, and Forbes and the Goldman Sachs transcript give Michael Dell as CEO. We treat the summary as an error." },
    { claim: "Dell's phone history.", note: "McKinsey's note says Venue phones ran 2010 to 2012. Fortune mentions a 'phablet' dropped after one year. These may refer to different products; we use McKinsey's." },
    { claim: "AI replacing workers.", note: "His 2024 and 2026 statements point in different directions. We quote both and do not claim he has formally changed his view." },
  ],
};

// map keys to indexes, keeping only cited sources
const used = [];
const idx = (k) => {
  if (!S[k]) throw new Error("Unknown source " + k);
  let i = used.indexOf(k);
  if (i < 0) { used.push(k); i = used.length - 1; }
  return i;
};
const fix = (o) => {
  if (Array.isArray(o)) return o.map(fix);
  if (o && typeof o === "object") {
    const out = {};
    for (const [k, v] of Object.entries(o)) out[k] = k === "src" ? v.map(idx) : fix(v);
    return out;
  }
  return o;
};
const fixedChapters = fix(chapters);
const sources = used.map((k) => ({ label: S[k][0], url: S[k][1] }));
const out = { chapters: fixedChapters, lessons, sources, factCheck };

// checks
let words = 0; const wc = (s) => s.trim().split(/\s+/).length;
const per = {};
for (const c of chapters) {
  let w = 0;
  for (const b of c.blocks) {
    if (b.text) w += wc(b.text);
    if (b.t === "note" && wc(b.text) > 14) console.log("LONG NOTE", wc(b.text), b.text);
    if (b.items) for (const it of b.items) w += wc(it.text || (it.value + " " + it.label));
  }
  per[c.id] = w; words += w;
}
const paras = [];
for (const c of chapters) for (const b of c.blocks) if (b.t === "p") { const n = (b.text.match(/[.!?]["')]?(\s|$)/g) || []).length; if (n > 6) paras.push([n, b.text.slice(0, 60)]); }
console.log("words", words, per, "sources", sources.length, "lessons", lessons.length);
if (paras.length) console.log("long paragraphs", paras);
const unused = Object.keys(S).filter((k) => !used.includes(k));
if (unused.length) console.log("unused", unused);
fs.writeFileSync(path, JSON.stringify(out, null, 2), "utf8");
