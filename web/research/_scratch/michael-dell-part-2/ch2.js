// Chapters: near-death, scale
const { p, q, note, ex, h, facts, tl } = require('./helpers');

const nearDeath = {
  id: 'near-death',
  kicker: '1987 to 1995',
  title: 'Three Times It Nearly Broke',
  blocks: [
    p(`The third week of October 1987 should have killed the deal. Dell had hired Goldman Sachs and was raising money through a private placement, which means selling shares quietly to a small group of big investors rather than to the public. On ==19 October==, known as Black Monday, the US stock market lost more than a fifth of its value in one day. In his memoir, as read aloud on a podcast, Dell says his president Lee Walker came into his office convinced the deal was finished. He says he was busy taking apart a competitor's computer.`, 'founders'),
    p(`The deal survived. Dell claims it was the only one of hundreds of financings under way that day to make it through, and we could only check that claim against his own account. What the Harvard case confirms is that the placement closed in the wake of the crash and raised more than ==$21 million==. Investors were looking at a company doubling every year. __Numbers that strong can get a deal through a panic that scares everyone else away.__`, 'founders', 'hbs'),
    note(`Market crashing? He was opening a rival's PC. Focus is a superpower.`),
    p(`Next came the IPO. An IPO, or initial public offering, is when a company first sells its shares to the public on a stock exchange. In ==June 1988==, Dell sold shares at $8.50 each, raising about $30 million and valuing the whole company at about $85 million. He was 23, and he still owned more than half of the company. He now had a public share price, public critics and a quarterly report card.`, 'delltl', 'reuters84', 'hbs'),
    p(`Around then he also showed how badly a young founder can handle experienced people. Dell had hired a group of marketing executives from Tandy, a bigger PC maker, and they quickly lifted gross margins from 23 to 31 percent. Then came fights over ad budgets and the size of the sales force. By early 1988 most of the Tandy group had resigned or been forced out. Some people at the time questioned whether he could share control at all.`, 'idch', 'hbs'),

    h(`Break one: the warehouse`),
    p(`The IPO cash was gone fast. Dell spent it on factory capacity and warehouse space, because it had been struggling to meet demand. Then it overestimated demand in the last quarter of 1988, and suddenly had no cash and warehouses full of unsold computers. For a company built on making machines only after an order came in, this was an embarrassing place to end up. It had also announced a clone of IBM's new PS/2 machine long before it was ready, and then could not deliver it on time.`, 'idch'),

    h(`Break two: the memory chips`),
    p(`In 1989 he made the mistake he still talks about. The industry was moving from one type of memory chip to a newer one, and Dell had loaded up on the older kind and designed its products around them. It was left holding chips it could not use or easily sell, and it had to raise prices to cover the loss. Add the Olympic write-off and the result was brutal: profits fell 65 percent to ==$5 million==, even though sales had doubled.`, 'encmd', 'idch', 'ferriss'),
    q(`Failure is always an ingredient of success.`, 'Michael Dell, The Tim Ferriss Show, 2021', 'ferriss'),
    p(`This is where the famous Dell supply chain really came from. In his own words, it grew out of "a horrible mistake we made in managing our supply chain", one that nearly took the company out of business. After that, Dell asked suppliers to hold parts close by and deliver them only when needed. __The thing he is most praised for began as a scar.__`, 'ferriss', 'encmd', 'mendel'),
    ex(`For example: Dell later explained the maths of stock with a single sum. A typical rival held about 30 days of stock, plus another 40 days sitting with dealers. Dell held 12. That is a 58-day gap, and in 58 days, Dell said, parts prices fall about 6 percent. So on every machine, Dell paid the newer, lower price and its rival paid the older, higher one.`, 'sb'),
    note(`Very important for hardware founders. Stock loses value every single day.`),

    h(`Break three: the summer of 1993`),
    p(`Then growth nearly finished the job. "We went right from 890 million to 2.1 billion in one year," Dell remembers. "And everything started to fall apart." The company did not have the systems, the people or the capital for that size. Worse, much of that growth came through retail stores, where it was making no money.`, 'ferriss', 'mendel'),
    p(`The attacks came from outside too. On 20 November 1992, Kidder Peabody analyst David Korus questioned how Dell accounted for its currency trading, and suggested it might be flattering profits. Dell's officials heatedly denied that, and the stock fell $3.75 in a day. Dell itself went to the Securities and Exchange Commission about unusual trading in its shares. In February 1993, it withdrew a planned sale of four million shares, and its stock dropped nearly 17 percent in a day.`, 'wsjabs', 'nyt93f'),
    p(`By August 1993 the numbers were out: a net loss of ==$75.7 million== in one quarter, its first since going public. The chief financial officer had resigned. Every new notebook line was scrapped. The stock had fallen from $49 in January to $16 by July. By November, short sellers held about 30 percent of the shares in public hands. A short seller borrows shares and sells them, betting that the price will fall so they can buy them back cheaper.`, 'wsjabs', 'f95', 'nyt93n'),
    q(`I felt a gradual panicking.`, 'Michael Dell, to Fortune, about 1993', 'f95'),
    facts([
      ['$890M to $2.1B', 'sales jump in one year, as he remembers it', ['ferriss']],
      ['$49 to $16', 'share price, January to July 1993', ['f95']],
      ['$75.7M', 'net loss in the quarter to 1 August 1993', ['wsjabs']],
      ['About 30%', 'of public shares sold short, November 1993', ['nyt93n']],
    ]),
    p(`He had a harder time at night than the numbers show. "It's hard to not think about all the people you're responsible for," he told Tim Ferriss, thinking of employees who had moved their families to Austin. He was 28. And he has admitted the real danger: "we were running out of capital".`, 'ferriss'),

    h(`The airport`),
    p(`The turning point is a scene in Heathrow Airport. Dell was hurrying through it with Tom Meredith, his new chief financial officer from Sun Microsystems, to catch a plane to Ireland. Meredith said he saw a silver lining in the notebook disaster, because of what it had revealed about the company's information systems. Dell had not yet been breaking down profit by business segment, and it was time to look. Meredith's message was simple: growth had to be balanced with cash in the bank and real profit.`, 'f95', 'cfo98', 'sb', 'encmd'),
    q(`Any one strength used to excess becomes a weakness.`, 'Tom Meredith, Dell CFO', 'sb'),
    p(`Then Dell did something few 28-year-old founders manage: he went and got adults. With help from his board and a search firm, he recruited Mort Topfer, a 23-year Motorola veteran, as vice chairman. Fortune's headline two years later put it bluntly, saying a bunch of old guys got Michael Dell to grow up. __He gave up authority to keep the company, the opposite of what happened with the Tandy team a few years earlier.__`, 'sb', 'f95', 'idch'),
    p(`The cure was boring. Dell left retail. It began tracking cash and return on invested capital, and tied the pay of its top 500 managers to those numbers. It also leaned into a lovely quirk of direct selling: customers often paid Dell before Dell paid its suppliers, so growth could produce cash instead of eating it. In 1995, profits came in at ==$149 million== after the 1994 loss of $36 million.`, 'sb', 'cfo98', 'idch'),
    tl([
      ['Oct 1987', 'Private placement survives Black Monday, raising over $21 million.', ['hbs', 'founders']],
      ['June 1988', 'IPO at $8.50 a share. He is 23.', ['delltl', 'reuters84']],
      ['Late 1988', 'Demand overestimated. Cash gone, warehouses full.', ['idch']],
      ['1989', 'Too many old memory chips. Olympic is shown, and customers shrug.', ['encmd', 'hemi']],
      ['Nov 1992', 'Kidder Peabody questions the currency trading accounting. Dell denies it.', ['wsjabs']],
      ['Aug 1993', 'First quarterly loss since the IPO: $75.7 million.', ['wsjabs']],
      ['1994', 'Dell leaves retail stores, and the Latitude XP launches.', ['mendel', 'bw95']],
      ['1995', 'Profit of $149 million. Fortune writes his "resurrection".', ['idch', 'f95']],
    ]),
    note(`Grow fast, but ask every month: how many weeks of cash do we have?`),
  ],
};

const scale = {
  id: 'scale',
  kicker: '1995 to 2012',
  title: 'King of PCs, Then Not',
  blocks: [
    p(`What followed was one of the great runs in stock market history. Dell Computer was the best-performing American stock of the 1990s, up ==87,000 percent== by one Harvard count. Austin was never the same. At one point Dell's stock was said to have created 2,700 millionaires, nicknamed "Dellionaires", including secretaries. In 1991, Michael Dell was worth $300 million. By the end of the decade he was worth over $21 billion, the richest American under 40.`, 'mit01', 'hbs', 'texmo13s'),
    facts([
      ['87,000%', 'rise in Dell\'s stock during the 1990s', ['hbs']],
      ['$25.3B', 'sales in 2000, up from $546M in 1991', ['hbs']],
      ['2,700', 'reported "Dellionaires" at one point', ['texmo13s']],
    ]),
    h(`How he beat Compaq`),
    p(`His main early rival was Compaq, a fellow Texan that built expensive, high-quality machines. In the early 1990s, Compaq fought back with a PC at just $899, and Dell slashed prices by up to $1,400 to keep its share. Dell could do this because its operating costs were 18 percent of revenue, against Compaq's 36 percent. Compaq also sued Dell over its advertising and eventually won. But in a price war, the company with the lowest costs can stay in longest.`, 'idch'),
    ex(`For example: when the world PC market had its worst slump yet in 2000 and 2001, most makers cut back. Dell started a price war. Rivals were slow to respond, and by 2001 Dell was number one in the world with a 13 percent share. It also made its first big layoffs, cutting 5,700 jobs, while still earning $1.78 billion.`, 'idch'),
    p(`Compaq's end shows how hard this market was. It disappeared into HP in 2002, and the merged giant took the top spot for a while before Dell got it back. Selling the most PCs turned out to be a dangerous prize, and __a lead built only on low cost lasts until someone else lowers their costs.__`, 'reuters84', 'idch', 'cw06'),

    h(`Steve Jobs at the door`),
    p(`Here is a strange secret from this era, which Dell told only in 2021. In 1993, Steve Jobs visited Dell's house in Texas several times trying to sell him on the NeXT operating system. Dell said no, because there was too little software and too little customer interest. In 1997, back at Apple, Jobs tried again and showed him a Dell desktop running Mac OS. "Why don't you license the Mac OS?" Jobs asked, in Dell's telling.`, 'ai21'),
    p(`Dell was interested and offered a licence fee on every PC sold with Mac OS. Jobs worried that this would eat into Mac sales, so he countered: put Mac OS and Windows on every Dell, and pay Apple on all of them. Dell refused to pay Apple for customers who used only Windows. That October he also gave one of the most famous bad answers in tech history.`, 'ai21', 'mw21'),
    q(`What would I do? I'd shut it down and give the money back to the shareholders.`, 'Michael Dell, asked in October 1997 what he would do with Apple', 'cnn11'),
    p(`In January 2006, Apple's market value passed Dell's, $72.13 billion to $71.97 billion. Market value means the share price times all the shares, and it is the market's price tag for the whole company. Dell later said the line was misunderstood: he had first declined the question, and meant only that he could not imagine running any company but his own. He says the two stayed friends.`, 'mw21', 'tc11', 'ai21'),
    note(`Never mock a rival in public. Apple's market value passed Dell's in 2006.`),

    h(`Intel's secret money`),
    p(`In July 2004 he handed the CEO job to Kevin Rollins, who had shared an office with him in a "two-in-a-box" arrangement, and stayed on as chairman. Under the surface, a problem had been growing. The Securities and Exchange Commission later alleged that Intel was paying Dell large sums not to use chips from its rival AMD. By the SEC's count, those payments rose from 10 percent of Dell's operating income in fiscal 2003 to 38 percent in fiscal 2006, and peaked at ==76 percent== in one quarter of fiscal 2007.`, 'idch', 'iw07', 'seclr'),
    p(`The SEC alleged that investors were not told, and that these payments, rather than management and operations, let Dell meet Wall Street's targets. Without them, it said, Dell would have missed its earnings target in every quarter from fiscal 2002 to 2006. When Dell added AMD, Intel cut the payments and profits sank. The SEC said executives then blamed pricing and component costs when speaking to investors.`, 'seclr', 'bbc10'),
    q(`for 3 qtrs now, Intel money has made the qtr. A bad way to run the railroad.`, 'Kevin Rollins, internal email to Michael Dell, 2004, quoted by the SEC', 'seclr'),
    p(`In July 2010 it was settled. The company paid a ==$100 million== penalty, and Michael Dell and Rollins paid $4 million each, without admitting or denying the charges. The details matter: Dell's own statement says Michael Dell's settlement covered disclosure about Intel only, not the separate accounting fraud charges, and only claims that do not require fraudulent intent. He accepted a court order against future violations and stayed as CEO, with no restrictions on serving.`, 'seclr', 'dsec'),
    note(`Ask where your profit really comes from. Then tell your investors the truth.`),

    h(`The bad years`),
    p(`Everything went wrong together. In October 2005, Dell warned of weak sales and took a charge of about $450 million, largely over faulty capacitors in desktops. At least 11.8 million computers made from 2003 to 2005 were at risk of failing, and one customer's lawsuit accused Dell of hiding the defects. Dell disputed that and settled in September 2010 on undisclosed terms. Meanwhile, customers were waiting 30 minutes to reach a support agent on the phone.`, 'f05m', 'ht10', 'time06'),
    p(`In August 2006 came the recall of about ==4.1 million== laptop batteries with Sony-made cells, because they could overheat. The US safety regulator called it the largest electronics recall it had handled. That same quarter, HP passed Dell as the world's biggest PC seller, by 16.3 percent to 16.1 percent in Gartner's count. By the end of the year it was not close, with HP at 17 to 18 percent and Dell at 14 to 15.`, 'bn06', 'ew06', 'nyt07', 'cw06', 'cnbc07'),
    p(`On 31 January 2007, Rollins left and Michael Dell took the CEO job back. Two days later he wrote to staff that results were "disappointing" and "unacceptable", and named a new foe: "bureaucracy, which costs us money and slows us down." He cut the number of managers reporting to him, and ended that year's bonuses. Then he did something harder, and began taking apart his own creed.`, 'iw07', 'iwmemo'),
    q(`The direct model has been a revolution, but is not a religion.`, 'Michael Dell, memo to staff, 25 April 2007', 'cw07'),
    p(`__He dropped the idea that made him famous once the numbers proved it had stopped working.__ In 2007, Dell went back into retail stores, which it had walked out of in 1994. By early 2008 it was in over 10,000 retail outlets. It moved away from building every PC to order, and looked to partners for more of its assembly. In India and other emerging markets, it opened plants of its own.`, 'nyt07', 'kiosk08', 'chron08', 'cw07', 'iw08'),
    p(`The human cost was real. Dell promised to cut 10 percent of its workforce, about 8,800 people. It closed its Austin desktop plant, with about 900 jobs lost. In January 2009, it moved European manufacturing to Poland, cutting 1,900 of 3,000 jobs in Limerick, Ireland, a country where it ranked itself the largest exporter. In October 2009 it said it would close its North Carolina plant, with 905 jobs lost.`, 'chron08', 'r09l', 'r09n'),

    h(`The rise of Lenovo and the fall of the stock`),
    p(`It was not enough. Lenovo and HP kept taking PC share, and then the iPhone and iPad made people ask if anyone needed a PC at all. A court later summed up the three threats he saw on his return: cheap PC makers like Lenovo, smartphones and tablets, and cloud storage from companies like Amazon. His answer was the shopping spree you read about in the last chapter.`, 'sup17', 'chan16'),
    p(`Wall Street did not buy it. Inside the company, a January 2011 analysis valued the shares at $22 to $27. On the market they sold for about $14. During the first half of 2012, they fell from about $18 to about $12, and that October they hit $9.66. Dell complained that the market just did not get it. __That gap, between what he thought his company was worth and what strangers would pay, would become the biggest opportunity of his life.__`, 'chan16'),
    tl([
      ['1996', 'Online sales start. Servers launch.', ['idch', 'kraemer']],
      ['2001', 'Dell becomes number one worldwide.', ['delltl', 'idch']],
      ['July 2004', 'Rollins becomes CEO. Michael Dell stays chairman.', ['idch']],
      ['Oct 2005', 'About $450 million charge, largely for faulty capacitors.', ['f05m']],
      ['Aug 2006', 'About 4.1 million batteries recalled.', ['bn06']],
      ['Jan 2007', 'Michael Dell returns as CEO.', ['iw07']],
      ['2007', 'Back into retail stores, after 13 years out.', ['nyt07']],
      ['July 2010', 'SEC settlement: $100 million for Dell, $4 million for him.', ['seclr']],
    ]),
  ],
};

module.exports = { nearDeath, scale };
