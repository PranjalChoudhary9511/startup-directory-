// Chapters: the-big-bets, the-fortune
const { p, q, note, ex, h, facts, tl } = require('./helpers');

const bigBets = {
  id: 'the-big-bets',
  kicker: '2012 to 2023',
  title: 'Buying Back His Own Name',
  blocks: [
    p(`The idea did not start with him. In ==June 2012==, Staley Cates of Southeastern Asset Management, Dell's biggest outside shareholder, asked Michael Dell if he would consider a management buyout. That is when a company's leader joins investors to buy all the shares and take it off the stock market. The next month he met Egon Durban of the buyout firm Silver Lake at a Fortune conference in Aspen. In August, the two talked again in Hawaii, where both had vacation homes.`, 'chan16', 'f16', 'texmo13'),
    p(`He also went to his friend George Roberts of the buyout giant KKR, who said that if the numbers worked, KKR would want in. Then he did the part that protects a founder and everyone else: he called the board's lead independent director, Alex Mandl, and told him. He promised not to hire an adviser without first telling the board. The directors formed a special committee with full power over the process, and he left the room.`, 'chan16'),
    note(`Tell the board first, before the bankers. Process matters when the lawyers come.`),
    p(`This was to be a leveraged buyout, which means buying a company mostly with borrowed money, and repaying it from the company's own cash. The bids came in on 23 October 2012, when the stock was $9.35. Silver Lake offered $11.22 to $12.16 a share, and KKR offered $12 to $13. Then the buyers started to run. KKR left on 3 December, saying it could not get its arms around the risks of the PC business. TPG looked and said no on 23 December.`, 'chan16'),
    p(`Silver Lake raised its bid to $12.70, and the committee said no. It then held out for $13.75. Durban called Mandl and offered $13.25, and when Mandl refused, Durban threatened to walk away. Mandl told him to go ahead. __A good board works for the shareholders, not the founder, and sometimes its job is to tell him no.__`, 'chan16'),
    p(`To break the deadlock, Michael Dell agreed to take less for his own shares than everyone else would get. That let Silver Lake reach ==$13.65== a share for the public, and the deal was signed on 5 February 2013. Microsoft came in with a $2 billion loan. It was a premium of 37 percent over the average price of the previous 90 days. Many shareholders still felt it was far too low.`, 'chan16', 'reuters84', 'sup17'),
    facts([
      ['$3.7B', 'his Dell shares, rolled into the deal', ['smg']],
      ['$750M', 'new cash from him and an affiliate', ['smg', 'chan16']],
      ['$1.4B', 'cash from Silver Lake', ['smg', 'f16']],
      ['$2B', 'loan from Microsoft', ['smg', 'reuters84']],
    ]),
    p(`The rest of the original $24.4 billion came mostly from new borrowing of about $13.75 billion, plus other cash. Next came a "go-shop", a set period of 45 days when the company could look for a better offer. Advisers called about 60 parties. Blackstone bid $14.25 and then quit in April, pointing to a 14 percent fall in PC sales, the steepest ever. HP, the obvious buyer, signed the paperwork but never even opened the data room.`, 'smg', 'chan16'),

    h(`The raider`),
    p(`Then came Carl Icahn. An activist investor buys shares in a company and then publicly pressures it to change, and Icahn was one of the most feared. He bought about 72 million shares from Southeastern at $13.52, built a stake near 9 percent, and promised a $14 buyback funded by $5.2 billion of debt. On Twitter he wrote: "All would be swell at Dell if Michael and the board bid farewell." He said he would replace the board, and Michael Dell with it.`, 'chan16', 'rjul', 'fb13', 'texmo13'),
    p(`It got personal. One spring evening in 2013, Dell walked through Manhattan to Icahn's home for dinner. He walked because he did not want his driver or anyone else to know where he was going. Over a meal that included Mrs. Icahn's meatloaf, he tried to find out whether Icahn had any real plan. At one point, by his own account, he looked at him and said: "I don't think you have a plan." Then he told him that if Icahn won, he would go to Hawaii, lose twenty pounds, and come home to buy Dell back for $8 a share.`, 'fbex', 'inc21', 'ferriss'),
    note(`In a fight, find out if the other side actually has cards.`),
    p(`The worst moment was not the meatloaf. Dell told Tim Ferriss that the board, at one point, asked him not to talk to any of his own management team. "And I'm the CEO of the company," he said. "It was just a short period of time, but it was pretty weird." On 17 July 2013, the committee learned that the shareholders would vote no. The next morning, the meeting opened at the Round Rock headquarters and adjourned within minutes, about 100 million votes short.`, 'ferriss', 'chan16', 'rjul'),
    p(`Here is a detail buried in the court record. On 2 August, the final deal came together at $13.75 plus dividends, worth ==$13.96== a share in total, in exchange for a change in the vote-counting rule. The Delaware court opinion shows who paid for that bump. Michael Dell did, by agreeing to value his own shares at ==$12.51== instead of $13.36. __He paid everyone else more by accepting less himself. Control was worth more to him than the difference.__`, 'chan16', 'raug'),
    q(`Most functioning dictatorships only need to postpone the vote once to win.`, 'Carl Icahn, letter giving up the fight, 9 September 2013', 'cnbcicahn'),
    p(`Three days after that letter, the vote finally passed, with about 57 percent of all shares in favour, about 70 percent of those voting. He then closed the deal on 29 October 2013 and ended up owning 74.9 percent, with Silver Lake holding 25.1 percent. Icahn later phoned him. "It was a hard fight, but you won fair and square," Dell remembers him saying.`, 'chan16', 'rclose', 'inc21', 'ricahn'),

    h(`Did he underpay?`),
    p(`You should hear the other side too. Some shareholders refused the deal and asked a court to set a fair value, a legal process called appraisal. In May 2016, Delaware's Vice Chancellor Travis Laster found the fair value was ==$17.62==, about $4 above the price paid. He said the sale process had been thorough, but that the price had been held down by the way buyout firms value companies, and by the gap between the market's view and Dell's real prospects.`, 'chan16', 'sup17', 'wsgr'),
    p(`In December 2017, the Delaware Supreme Court reversed that. It said the deal price deserved "heavy, if not dispositive weight", meaning it should count heavily or even settle the question. It also noted that the market for Dell's stock had been efficient. So the highest court rejected the higher figure, and even the trial judge had said the process would not support a claim that its leaders broke their duties. But honest experts disagreed for years about whether he bought his company cheaply. The stock's later rise is why that argument stays alive.`, 'sup17', 'rlf17', 'wsgr'),

    note(`Two courts, two answers. Even experts can't agree what a company is worth.`),

    h(`The napkin`),
    p(`Private at last, he turned to the biggest deal in tech. The roots went back to a 2001 alliance with the storage giant EMC, and a failed merger study in 2009. "While I have an above-average appetite for risk, not all participants had the same level," he told Fortune. Less than a year after going private, he phoned EMC's boss, Joe Tucci. "Hey, Joe, maybe we should get the band back together," he recalled saying.`, 'f16'),
    p(`The problem was money. EMC was worth about ==$55 billion== on the market, and Dell was already deep in debt. In April 2015, after a meeting at Dell's home in Austin, EMC executive Harry You flew back to California with Durban. On the plane, You drew an idea on a napkin: a tracking stock. This is a share that follows the fortunes of one business without owning it. EMC shareholders could get paper tied to VMware, knocking billions off the cash needed.`, 'f16', 'fb21b', 'cog'),
    ex(`For example: at a later dinner, the group laughed at the idea of walking into a bank and saying "I want to borrow $50 billion". Then Durban pointed out, in Dell's memoir, that banks could count the VMware shares, worth about $40 billion, even if the tracking stock passed its gains to others. That argument moved much of the debt into safer, cheaper "investment grade" territory, so Dell avoided selling a costly stake to Singapore's Temasek.`, 'cog', 'fp16'),
    p(`Then came the selling. Some banks refused, saying they could not sell that much junk debt. JPMorgan's boss, Jamie Dimon, had to tell EMC's directors in person that the money would be there. The first loan sale in March 2016 raised $9.4 billion. In May, $20 billion of investment-grade bonds sold after demand beat the original $16 billion plan. Later tranches were so popular that they could be cut in size and priced at nearly half the interest rate expected.`, 'fp16'),
    q(`We were looking for every vein of money that was available.`, 'Jim Casey, head of debt capital markets at JPMorgan', 'fp16'),
    p(`On 7 September 2016 the deal closed, at about ==$67 billion==. Dell Technologies had about 140,000 staff and nearly $57 billion of debt. "Go big or go home, baby," he had told a crowd in 2015. Layoffs of about 3,000 were reported. Five days after closing, Dell sold a division for $1.62 billion, and it retired $5.8 billion of debt within months. By 2020 it had paid down $19.5 billion since the merger.`, 'f16', 'tc20', 'fp16'),
    note(`Debt can build an empire. It also puts a clock on everything you do.`),

    h(`The way back, and Icahn again`),
    p(`In July 2018 he moved to return to the stock market, in the strangest way possible: no IPO. Dell would buy back the VMware tracking stock for ==$21.7 billion== in cash and new shares, which would then trade on the New York Stock Exchange. This let him skip grilling by IPO investors over his $52.7 billion debt pile. Who should appear but Carl Icahn, who bought in and accused him and Silver Lake of trying to capture $11 billion of value from the holders.`, 'r18', 'crn18'),
    p(`Dell raised its offer to $120 a share, valuing the stock at ==$23.9 billion==, and signed up big investors holding about 17 percent. Icahn called a further fight "unwinnable" and quit, while taking the credit for the extra money. The shares began trading on 28 December 2018.`, 'd18n', 'r18n', 'crn18', 'q22'),
    p(`The case did not end there. Shareholders sued, claiming the deal had short-changed them, and it was settled for ==$1 billion== in November 2022, a month before trial, so no court ruled on the claim. The Delaware Supreme Court upheld a $266.7 million legal fee from that settlement in August 2024. __When you hold all the power in a deal, expect to defend the price for years afterwards.__`, 'sup24', 'quinn', 'r24'),
    p(`The last act belonged to VMware. Dell spun off its 81 percent stake to its shareholders on 1 November 2021, and collected its share of an $11.5 billion dividend to pay down debt. Since Michael Dell owned so much of Dell, he came out with about 40 percent of VMware directly. In May 2022, Broadcom's boss Hock Tan called him and proposed a $61 billion takeover. Tech stocks were falling. He said yes.`, 'k21', 'r21', 'r22t', 'crn22'),
    facts([
      ['$7.5B', 'his all-in cost of Dell stock and cash, Forbes estimate, 2021', ['fb21a']],
      ['$21.65B', 'his cash and Broadcom stock from VMware, per filing', ['crnvm']],
      ['$12.06B', 'the cash part of that payout', ['crnvm']],
      ['$40B+', 'total gains for him and partners by 2021, Forbes estimate', ['fb21b']],
    ]),
    p(`Forbes called it the deal of the century. In 2013, Dell could be bought for about $25 billion. By August 2021, Forbes valued Dell Technologies at $75 billion, more than four times its value before going private. It counted over $40 billion of gains for him, Silver Lake and co-investors, with his own fortune near $50 billion. Most of that came from borrowed money amplifying a good result, which is exactly how it could have gone the other way. __Leverage turned a good call into a historic one, and a bad call would have been historic too.__`, 'fb21b', 'dpr13'),
    tl([
      ['June 2012', 'Southeastern suggests a buyout.', ['chan16']],
      ['Feb 2013', 'Deal signed at $13.65. Icahn soon appears.', ['chan16']],
      ['Sept 2013', 'Shareholders approve at $13.75 plus dividends.', ['dpr13']],
      ['Oct 2015', 'EMC deal announced at about $67 billion.', ['d15']],
      ['Sept 2016', 'EMC closes. Dell Technologies is born.', ['d16']],
      ['Dec 2018', 'Back on the stock market, without an IPO.', ['q22']],
      ['Nov 2021', 'VMware spun off to shareholders.', ['k21']],
      ['Nov 2023', 'Broadcom completes its purchase of VMware.', ['k26']],
    ]),
  ],
};

const fortune = {
  id: 'the-fortune',
  kicker: '2024 to 3 November 2026',
  title: 'Where the Money Is Now',
  blocks: [
    p(`On 19 June 2024, Michael Dell posted one line on X: "We're building a Dell AI factory with Nvidia to power Grok for xAI." The startup belonged to Elon Musk, who soon clarified that Dell would assemble half of the racks for his supercomputer, and Super Micro the other half. Dell's shares jumped as much as 8 percent that morning. For a 40-year-old PC company, the old skills suddenly mattered again: moving huge volumes of scarce parts, and delivering them to spec.`, 'f24', 'yh24'),
    p(`The numbers came quickly. In late 2024, Dell reported $3.6 billion of AI server orders in a quarter. In February 2025, reports said it was close to a $5 billion deal for xAI, which Dell declined to comment on. In the year to January 2026, it booked ==$64.1 billion== of AI orders and shipped more than $25 billion. In the quarter it reported that September it booked ==$60.9 billion==, close to the whole of the previous year, in just three months.`, 'cnbc25', 'd26fy', 'd26q2', 't26'),
    facts([
      ['$113.5B', 'revenue, year to January 2026 (a record)', ['d26fy']],
      ['$95B', 'AI server backlog, reported 1 September 2026', ['d26q2']],
      ['$192B', 'Dell\'s revenue forecast for the current year, as of 1 September 2026', ['d26q2']],
      ['$74B', 'AI server revenue it expects in the same year', ['qz26']],
    ]),
    p(`Before you get carried away, look at what kind of business this is. Dell does not design the AI chip. It buys Nvidia's and puts together, installs and supports the machines. Its own target for AI servers is only a mid-single-digit operating margin, which means about five cents of profit on each dollar of sales. __This is the same trade Dell has always made: thin margins and enormous volume, with a supply chain nobody else can easily copy.__`, 't26', 'f24'),
    note(`Remember 1989? The memory chip scar is now worth billions.`),

    h(`The wildest year`),
    p(`Then came 2026. Dell's stock began the year at about $128. By 8 September it closed at $533.88, and Michael Dell passed Jeff Bezos on the Forbes list with an estimated $267.7 billion. The next morning he was briefly second in the world, behind only Musk. He had started the year 13th, with $141 billion. His fortune had gone up by well over $100 billion in about eight months, nearly all of it because the market had changed its mind about one stock.`, 'qz26', 'mint26', 'fb0909'),
    p(`It went the other way just as quickly. On 14 October, Barclays cut its rating, arguing that strong enterprise sales were "more of a function of memory costs" than real AI demand, and the stock fell 11 percent. That week Dell lost 23 percent, its biggest weekly fall since returning to the market in 2018. On 30 October it dropped almost 11 percent more after Intel warned of a long PC slump, with Dell's own PC shipments reported down about 25 percent in the third quarter.`, 'cnbc1014', 'wsj1016', 'sa', 'yh1030', 'yh1031'),
    note(`More than $40 billion gone in seven weeks, on paper. Paper moves both ways.`),

    h(`What the $228.5 billion is made of`),
    p(`Forbes put him at ==$228.5 billion== on 2 November 2026, fourth in the world. But here is what most headlines skip. His 2026 proxy statement shows about 265.7 million Dell shares, or 40.9 percent of the company. At the 30 October closing price of $424.30, our arithmetic puts that stake at about ==$113 billion==. That is roughly half of the Forbes number.`, 'fbp', 'proxy26', 'sa'),
    p(`So where is the rest? Forbes says much of his fortune lies in DFO Management, his family's private investment firm, which has stakes in hotels and invests in corporate credit. The biggest single inflow we can trace was VMware: about $21.65 billion in cash and Broadcom shares in 2023, including over 21 million Broadcom shares. We could not confirm how much of that he still holds, and DFO is a private firm. So treat the total as an educated estimate rather than an audited fact.`, 'fbp', 'crnvm', 'dfo'),
    facts([
      ['40.9%', 'his share of Dell\'s common stock, 2026 proxy', ['proxy26']],
      ['About $113B', 'value of that stake at $424.30, 30 Oct 2026 (our arithmetic)', ['proxy26', 'sa']],
      ['About $116B', 'the rest of the Forbes figure, as of 2 Nov 2026 (our arithmetic)', ['fbp', 'proxy26', 'sa']],
      ['$400M', 'what MSD started with in 1998, as later reported', ['wsj19', 'trd']],
    ]),
    p(`The way his stake moved is the real lesson of this book. He owned more than half at the IPO in 1988, and his share fell to about 12 percent by 2004 and 15.4 percent by 2012. Then, when the market said PCs were dying, he bought his way back up to 74.9 percent using mostly debt, and his cost was about $7.5 billion by Forbes' estimate. __He got richest by buying more of his own company at the moment most of the market wanted out.__`, 'hbs', 'idch', 'chan16', 'fb21a'),
    tl([
      ['1991', 'Worth $300 million, age 26.', ['hbs']],
      ['1997', 'Worth $4.3 billion, the richest man in Texas.', ['f97']],
      ['1999', 'Worth over $21 billion, the richest American under 40.', ['hbs']],
      ['2021', 'Worth about $50 billion after the buyout and EMC.', ['fb21b']],
      ['2025', 'Forbes 400 estimate: $97.7 billion.', ['yh1014']],
      ['Jan 2026', 'About $141 billion, world number 13.', ['mint26']],
      ['Sept 2026', 'About $270 billion or more at the peak, world number 2 briefly.', ['fb0909', 'fb0911', 'yh1014']],
      ['2 Nov 2026', '$228.5 billion, world number 4.', ['fbp']],
    ]),
    p(`Two things are worth keeping in mind as you finish this chapter. First, the story is not over: the AI boom could fade, memory shortages could squeeze his PCs, and his backlog depends on customers who are themselves borrowing heavily. Second, he has heard the same funeral speech before. Analysts wrote off Dell in 1993, the market wrote off the PC in 2012, and each time he had a plan that looked crazy until it worked. He could still be wrong this time.`, 'cnbc1014', 'yh1031', 'nyt93n', 'chan16'),
    note(`Numbers will change by the time you read this. The pattern will not.`),
  ],
};

module.exports = { bigBets, fortune };
