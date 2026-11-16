// Chapters: the-big-bets, the-fortune
const p = (text, ...s) => ({ t: "p", text, src: s });
const note = (text) => ({ t: "note", text });
const h = (text) => ({ t: "h", text });
const ex = (text, ...s) => ({ t: "example", text, src: s });
const facts = (...items) => ({ t: "facts", items: items.map(([value, label, ...src]) => ({ value, label, src })) });
const timeline = (...items) => ({ t: "timeline", items: items.map(([when, text, ...src]) => ({ when, text, src })) });

const bigBets = {
  id: "the-big-bets",
  kicker: "2002 to 2021",
  title: "Spending Profits Before They Existed",
  blocks: [
    p(`Most companies that nearly die become careful. Amazon did the opposite. Within six years of its first profit, it launched a shipping club that would be expensive at first, a cloud business that outsiders called a distraction and a device that could wreck its own book sales. Here is what those decisions looked like from inside the room.`, "vox", "house", "iexpress"),

    h(`The boathouse`),
    p(`It began with an annoyance. Engineer Charlie Ward loved 1-Click ordering, but it did not work with free shipping, and that irritated him more and more. He wondered aloud whether customers might pay a lump sum each year and never see a shipping charge again. His colleagues paused, wondering if he was crazy, so he wrote it up in half a page and used the employee suggestion box.`, "vox", "seattlePrime"),
    p(`Late in 2004 Bezos took it up. One Friday in December, the team cancelled a meeting with him because the site had crashed for hours. He understood, then told them to come over on Saturday morning anyway. They were sent to the boathouse at his home, which one of them remembers as bigger than his own apartment. Bezos wanted a moat around Amazon's best customers.`, "vox", "seattlePrime"),
    p(`He gave them four weeks. They said six was the minimum. So he moved the date of a quarterly earnings call by about two weeks to fit, which is not a thing CEOs usually do for a side project. The team printed T-shirts saying it would ship in six weeks or less, and left one behind whenever they poached an engineer from another team.`, "vox"),
    ex(`For example: two-day delivery cost $9.48 an order back then, so Prime at $79 paid for itself in nine orders. Amazon weighed $49 and $99 before Bezos chose. An insider later said it was never really about the $79. It was about changing how people thought, so that they stopped shopping around.`, "vox", "qz"),
    note(`An engineer's half-page became a business with 100 million-plus US customers.`),

    h(`The side project nobody understood`),
    p(`AWS started as a cleanup job. Around 2000, Amazon tried to run online shops for other retailers and found its code was a mess, so it split its systems into clean building blocks. Projects still took too long because every team built its own storage and computing. Then, at a 2003 offsite at Bezos's home, a 30-minute exercise on what the company was good at ran long.`, "tc16"),
    p(`The answer surprised them. To survive on thin retail margins, they had become very good at cheap, reliable data centres. Jassy got the job of turning that into a business. By late 2004 a tiny team was in Cape Town, working thousands of miles from headquarters because its leader wanted to go home. It built the computing service almost independently of Seattle.`, "tc16", "tc21", "gwAWS"),
    p(`Observers called it a risky distraction. Bezos remembered them asking what storage had to do with selling books. It launched in 2006, charging by use, so a startup with a credit card could rent what used to require millions of dollars of its own servers. Rivals took years to respond. __Amazon's great advantage was that for years nobody thought a bookshop was serious competition in computing.__`, "house", "tc16", "fortuneAWS"),
    p(`Then Amazon kept quiet about how well it was going. It stayed silent on the unit's numbers until 2015, when it finally reported them. Even then the quarterly operating profit of over $250 million surprised people, at about 17 percent margins, against 2 to 3 percent in retail. By then its lead was already large.`, "gwAWS"),
    facts(
      [`$128.7B`, `AWS sales in 2025`, "q425"],
      [`$45.6B`, `AWS operating profit in 2025, out of $80B company-wide`, "q425"],
      [`$184B`, `AWS annualised revenue run rate, Q3 2026`, "q326"],
      [`39%`, `AWS growth in Q3 2026, its fastest in nearly five years`, "q326"],
    ),

    h(`Kill your own business`),
    p(`In 2004 books were at the heart of Amazon, and Apple was showing with the iPod how fast a media business could move to a device. So Bezos reassigned Steve Kessel, the man running books, and told him his job was to destroy that business. Asked for a deadline, Bezos said he was already late, according to Brad Stone.`, "iexpress", "goodereader"),
    p(`Bezos then did something most leaders would not dare. He priced most e-books at $9.99 at launch, a number one case study traces to Apple's 99-cent songs, not to any margin calculation. The team tested prototypes during a weekend away with him, reading for an hour and then discussing how the device felt in the hand. Kessel told him it would take 18 months. It took three and a half years.`, "iexpress", "commoncogKindle", "kindleAA"),
    note(`He attacked his own best business before anyone else could.`),

    h(`Failing at the right size`),
    p(`Fire Phone was the expensive embarrassment. In October 2014 Amazon took its $170 million charge, and hedge fund manager David Einhorn told investors that Amazon's story was breaking: growth was slowing, and losses were growing. It was the biggest quarterly loss in 14 years. The critics seemed to have a point.`, "fastco", "voxFire"),
    p(`Freed, a key leader on the phone, might have expected to take the blame. According to The New Yorker, Bezos told him he must not lose one minute of sleep over it. Earlier, during a demo of the phone's software, Bezos had asked it for Hotel California. When the song played, he was delighted, and soon asked Freed to build a cloud computer you could talk to. Four months after the phone, Echo arrived.`, "cnbcFail", "gwFlop"),
    p(`Dave Limp, who ran devices, later said that if you had listened to the skeptics you would have cancelled both products. In his 2018 letter Bezos wrote that Amazon's experiments should grow with the company, even to multibillion-dollar failures. He said Fire Phone's lessons and developers sped up Echo and Alexa. __The team that failed was kept, and that is why the next try was possible.__`, "gwFlop", "cnbcLetter"),

    note(`Keep the team after a failure. They just paid for the lesson.`),

    h(`The deals`),
    p(`Amazon also bought what it could not build. The shoe seller Zappos came in 2009, the warehouse robot maker Kiva in 2012 for $775 million, and the game-streaming site Twitch in 2014 at a reported $970 million. PillPack in 2018 pushed it into pharmacy. MGM, the James Bond studio, was agreed in 2021 for $8.45 billion. By then Bezos had already announced he was stepping aside as CEO.`, "forbesMA", "reutersMA", "forbesNext"),
    p(`The biggest was Whole Foods. CEO John Mackey said publicly that it was love at first sight after a blind date in Seattle. The filings tell a tougher story. Amazon offered $41 a share and warned that it would walk away if word leaked or if Whole Foods shopped the deal. Whole Foods asked for $45, and Amazon said $42 was final. Whole Foods took it.`, "smWF", "cnbcWF", "biWF", "pon"),
    ex(`For example: Ring began as Doorbot, a video doorbell pitched on the TV show Shark Tank in 2013. Founder Jamie Siminoff asked for $700,000, was turned down by every Shark but one, refused that offer and ended up in tears, almost out of money. Five years later Amazon bought the company at a reported $1 billion or more.`, "cnbcRing", "biRing", "biRing17", "gwRing"),
    note(`Hundreds of investors rejected Ring. Rejection is data, not a verdict.`),

    h(`Who he beat, and who beat him`),
    p(`The honest scorecard is mixed. Against book chains he won clearly. He ended up running Borders' website from 2001, and Barnes & Noble's attack in court gave way to Amazon's own patent suit against it over 1-Click in 1999. He also built a cloud business years before rivals responded.`, "borders", "wiredBN", "cnn1click", "tc16"),
    p(`But he lost phones to Apple and Samsung, and China to Alibaba and JD.com. India remains unfinished, with Flipkart still ahead on gross sales at last count. In space, SpaceX got its big NASA lander deal first in 2021, Blue Origin winning a $3.4 billion lander contract only in 2023. Walmart bought both Jet.com and Flipkart, and became a stronger rival.`, "guardianFire", "reutersCN", "et", "reutersHLS", "gwQuidsi"),
    p(`Amazon crossed a market value of ==$1 trillion== for the first time in September 2018. In February 2021, Bezos told staff he would hand the CEO job to Jassy that summer and focus on Day One, Earth Fund, Blue Origin and The Washington Post. It ended 27 years in the job, and began the next stage of his working life.`, "forbes1T", "forbesNext", "cnbcProm"),
    timeline(
      [`Feb 2005`, `Prime launches at $79 a year.`, "prPrime"],
      [`Mar 2006`, `AWS launches its storage service. Computing follows in August.`, "fortuneAWS"],
      [`Nov 2007`, `Kindle launches at $399 and sells out in hours.`, "iexpress"],
      [`Nov 2009`, `Zappos deal closes at about $1.2 billion.`, "investo"],
      [`Nov 2014`, `Echo launches, five months after Fire Phone.`, "wiredAlexa", "gwFlop"],
      [`Aug 2017`, `Whole Foods purchase, $13.7 billion, reached with a final bid of $42 a share.`, "investo", "cnbcWF"],
      [`Sep 2018`, `Amazon briefly touches $1 trillion in market value.`, "forbes1T"],
      [`Jul 2021`, `Bezos steps down as CEO and becomes executive chair.`, "cnbcProm"],
    ),
  ],
};

const fortune = {
  id: "the-fortune",
  kicker: "As of 3 November 2026",
  title: "Where the Billions Actually Sit",
  blocks: [
    p(`Forbes puts Jeff Bezos at ==$361.3 billion== as of 2 November 2026, number two in the world. Bloomberg's index, updated on 1 November, says $352 billion. Both ranked him second. The gap between them comes mostly from how you value companies that have no share price. Almost none of it is money in a bank.`, "forbesProfile", "bbgProfile"),
    facts(
      [`About $211B`, `His 879 million Amazon shares at the 30 Oct 2026 close of $240.35, our arithmetic`, "fool26", "secapi"],
      [`$123.5B`, `Bloomberg's value for about 93% of Blue Origin, Oct 2026`, "naira"],
      [`$12.2B`, `Bloomberg's value for his Prometheus stake, Oct 2026`, "naira", "bbgProfile"],
      [`$4.7B`, `Bloomberg's estimate of his cash, Oct 2026`, "naira"],
    ),
    p(`Here is how to rebuild Bloomberg's number. About 879 million Amazon shares at $240.35 gives about $211 billion. Blue Origin adds $123.5 billion, and Prometheus $12.2 billion. Cash adds $4.7 billion. The Washington Post is carried at its $250 million purchase price, and his yacht at $500 million. Add it up and you land at about $352 billion, matching Bloomberg's figure.`, "fool26", "secapi", "naira", "bbgProfile"),
    p(`Forbes values Blue Origin at $130 billion and uses a rounded 8 percent Amazon stake. Bloomberg uses about 8.2 percent and a $140 billion valuation with a 5 percent discount because the shares are hard to sell. Neither is wrong. __Your net worth on a private company is only somebody's estimate, until a buyer actually pays.__`, "forbesProfile", "naira", "bbgProfile"),
    note(`Nearly 40 percent of his fortune is private-company estimates. Not cash.`),
    p(`Watch what happened this autumn. Blue Origin raised its first outside money, about $10 billion, including a reported $2 billion from Bezos himself. Switching to the new price added about $85 billion to Bloomberg's estimate of his wealth in October, with no share sold and no cash received. In a single month the index moved him to number two.`, "cnbcBO", "naira"),
    ex(`For example: Amazon shares move this number too. On the Bloomberg figures, a 1 percent rise in Amazon's price adds about $2 billion to his wealth, and a 1 percent fall removes it. Bloomberg showed him losing $3.05 billion in its last daily update, without him doing anything.`, "bbgProfile", "fool26", "secapi"),

    h(`How the stake shrank and the money grew`),
    p(`At the IPO he owned about 41 percent of Amazon. He now owns about 8.2 percent. Yet that stake went from about $178 million in 1997 to about $211 billion, nearly 1,200 times as much, by our arithmetic. __A small slice of something enormous beats all of something small.__ Founders who fight over every last percent should think about that.`, "s1", "atticus", "bbg17", "bbgProfile", "fool26", "secapi"),
    p(`The sharpest single drop came in 2019. Under the divorce settlement he transferred a quarter of the shares he and MacKenzie held together, about 19.7 million before later splits, leaving her about 4 percent, then worth about $36 billion. His stake had been about 16 percent. The terms let him keep voting control over her shares. In 2025, Amazon's filing still counted about 112 million shares that he could vote but not sell.`, "foxDiv", "forbesProfile", "variety"),
    p(`The rest came from steady selling. Forbes found he sold shares every year from 1998 except 2005, 2006, 2007 and 2011. He sold just under $46 million in 1998, $21 million in 1999 and $29 million in 2000. By mid-2021 he had sold nearly $27 billion in total.`, "forbesSold"),
    facts(
      [`$46M`, `His share sales in 1998, his first year selling`, "forbesSold"],
      [`$27B`, `Total sold by June 2021`, "forbesSold"],
      [`$5.7B`, `Sold in 2025, 25 million shares`, "bbgSold"],
      [`Over $50B`, `Sold since 2002, as of early 2026`, "investing"],
    ),
    p(`Later the numbers grew. He sold about $13.5 billion in 2024, after a pause. In 2025 he sold 25 million shares for about $5.7 billion, starting around his wedding that June, under a pre-set trading plan, which is an arrangement made in advance so that sales do not depend on what an insider knows at the time. Sales since 2002 now top $50 billion.`, "variety", "bbgSold", "investing"),
    p(`Where does the money go? In 2017 he said about $1 billion a year was going to Blue Origin, and he told WIRED that the rocket company's business model was that he sold Amazon stock, and that he could be patient for decades. The Wall Street Journal's estimate of about $30 billion in total investment shows the scale. __Amazon is the engine, and everything else runs on its fuel.__`, "nyt17", "wiredBO", "cnbcBO"),

    h(`The family's bet`),
    p(`The most remarkable return may not be his. Bloomberg calculated in 2018 that his parents' $245,573 could have been worth $30 billion if they had kept every share, one of the great venture investments ever. The share count from the filing, 1,430,244, would be about 343 million shares now after splits, or about $82 billion at $240.35, by our arithmetic.`, "bbgParents", "s1", "splits", "secapi"),
    p(`Treat that figure as a thought experiment. Nobody outside the family knows what they still hold, and they have sold and given away shares. In 2003 they set up the Bezos Family Foundation with proceeds from Amazon stock. Mike Bezos has said only that they had saved a few pennies from years abroad and so could be angels.`, "bbgParents", "insidePhil", "cnbcParents"),
    note(`They didn't understand the internet. They understood their son.`),
    timeline(
      [`May 1997`, `Stake worth about $178 million at the IPO price.`, "bbg17", "s1"],
      [`Mid-1999`, `Net worth tops $9 billion at the bubble's height.`, "cnbcParents"],
      [`2003`, `Newsweek puts his fortune at about $1.7 billion after the crash.`, "newsweek"],
      [`Oct 2017`, `Passes Bill Gates on Bloomberg's index at $88 billion.`, "bbg17"],
      [`Nov 2017`, `Forbes: first to hold $100 billion since Gates in 1999.`, "forbes100"],
      [`Aug 2020`, `Forbes: first person ever worth $200 billion.`, "forbes200"],
      [`Oct 2026`, `Bloomberg: $372 billion after Blue Origin's new valuation.`, "naira"],
      [`2 Nov 2026`, `Forbes: $361.3 billion, number two in the world.`, "forbesProfile"],
    ),
    p(`Today the company he started in a garage is valued at about $2.6 trillion, and its cloud arm alone earns most of its operating profit. It is spending about $220 billion on capital projects in 2026, mostly for AI, and its free cash flow has turned negative for now. __The bet he has always made, spend now and collect later, is still running at a scale he could never have planned.__`, "secapi", "q326"),
  ],
};

module.exports = { bigBets, fortune };
