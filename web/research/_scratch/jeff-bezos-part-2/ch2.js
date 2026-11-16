// Chapters: the-first-money, near-death
const p = (text, ...s) => ({ t: "p", text, src: s });
const note = (text) => ({ t: "note", text });
const h = (text) => ({ t: "h", text });
const ex = (text, ...s) => ({ t: "example", text, src: s });
const facts = (...items) => ({ t: "facts", items: items.map(([value, label, ...src]) => ({ value, label, src })) });
const timeline = (...items) => ({ t: "timeline", items: items.map(([when, text, ...src]) => ({ when, text, src })) });

const firstMoney = {
  id: "the-first-money",
  kicker: "1994 to 1997",
  title: "Fifty Meetings for a Million",
  blocks: [
    h(`The money ladder`),
    p(`Forget the legend for a minute and read the filing. Amazon's 1997 registration statement, the document a company must file before selling shares to the public, lists every early money move. In July 1994 Bezos bought 10.2 million shares for ==$10,000==. That is about a tenth of a cent per share.`, "s1"),
    p(`He then lent the company $15,000, $29,000 and $40,000, with no interest, and it paid him back. He also personally guaranteed its bank merchant accounts and its company credit cards. So if Amazon failed, the bills would have come to him. He was not just the founder. In those first months he was the bank.`, "s1"),
    facts(
      [`$10,000`, `Bezos's own money for 10.2 million founder shares, July 1994`, "s1"],
      [`$245,573`, `From his parents in two purchases, Feb and July 1995`, "s1", "bbgParents"],
      [`About $1M`, `From around 20 angels, 1995 and early 1996`, "biSeed", "biAlberg"],
      [`$8M`, `From Kleiner Perkins, June 1996`, "s1", "gwAlberg"],
    ),
    p(`The family money did not arrive as one big cheque. The filing shows Miguel Bezos buying 582,528 shares in February 1995. In July, a family trust led by his mother Jacklyn bought 847,716 shares. Both paid $0.1717 a share, and the two purchases add up to $245,573. His brother and sister each bought 30,000 shares in May 1996 at $0.3333.`, "s1", "bbgParents"),
    note(`Filings beat folklore. Always read the boring document.`),
    p(`Then he went looking for strangers, and that was brutal. Bezos told Congress that it took more than 50 meetings to raise $1 million, and that the most common question was what the internet was. Investors put in about $50,000 each for a little under 1 percent. Together they got about 20 percent of the company.`, "house", "biSeed"),
    p(`Tom Alberg, a former McCaw Cellular executive, was one who said yes. He remembered a friend walking away because Bezos priced the company at $6 million before the new money. Bezos would not budge, and the raise dragged on through nearly all of 1995. Brad Stone's account has another backer talking him down to $5 million. The filing shows Alberg paying $0.3333 a share for 150,000 shares, which is $50,000.`, "gwAlberg", "biAlberg", "commoncog", "s1"),
    ex(`For example: in 2016 Bezos worked out what those small early cheques could have become. A $50,000 stake held to that date, if never diluted, would have been worth about $3.5 billion, a return of 70,000 times. In practice, later rounds dilute early investors, meaning each share becomes a smaller slice as new shares are sold.`, "biSeed"),

    h(`The garage`),
    p(`The first home was a rented three-bedroom house in Bellevue, with desks built from Home Depot doors in the garage. The servers needed so much power that he and MacKenzie could not run a hair dryer or a vacuum without blowing a fuse. Early meetings were held at a local Barnes & Noble, which was the company they planned to beat.`, "historylink", "garage", "biFacts"),
    p(`The site opened on 16 July 1995. A bell rang for every order, and staff crowded round to check it was not somebody's mother. Within days it was too annoying, so they switched it off. Orders hit $12,000 in the first week and $14,000 in the second, and by the end of the first month they had come from all 50 states and 45 countries.`, "historylink", "shoptalk", "garage"),
    ex(`For example: one customer in Bulgaria had internet access but no credit card. He mailed cash, hidden inside a floppy disk, and explained that customs inspectors stole money but could not read English. Inside were two crisp $100 bills. Bezos told this story himself in 2010.`, "shoptalk"),
    p(`They had no real warehouse then. Everyone spent the second half of the day packing books on their knees on a cement floor. Bezos suggested kneepads. Someone more experienced suggested packing tables, and output rose by 20 percent. Amazon did not stock most books at first; it ordered them from distributors, and Ingram supplied 59 percent of its purchases in 1996.`, "shoptalk", "historylink", "s1"),
    note(`He thought kneepads. Someone else said tables. Listen to the floor.`),

    h(`Two venture firms and a choice`),
    p(`Sales went from $511,000 in 1995 to $15.7 million in 1996. Venture capitalists, the professional investors who fund risky startups in exchange for shares, began to call. General Atlantic proposed a complicated price tied to whether and when Amazon went public. Kleiner Perkins offered a simple $60 million valuation. Bezos took the simple one.`, "s1", "gwAlberg"),
    p(`The filing gives the exact deal: 569,396 preferred shares at $14.05, or ==$8 million==, signed on 21 June 1996. Preferred shares are a special class that turned into six ordinary shares each at the IPO, so Kleiner really paid about $2.34 per ordinary share. That was seven times Alberg's price from six months earlier. John Doerr joined the board.`, "s1", "gwAlberg"),
    p(`Here is the detail almost nobody mentions. As part of that deal, Bezos gave Amazon the right to buy back 612,000 of his own shares at a tenth of a cent each if his job ended in certain circumstances. That right faded over 36 months. __Even the founder was put on a vesting schedule, which means earning your shares by staying.__ The filing ties it directly to the Kleiner round.`, "s1"),
    note(`Founders: expect this clause. Read it, and do not take it personally.`),
    p(`The money changed the mood. Staff grew from 11 to 151 during 1996, and a new slogan went on the T-shirts: Get Big Fast. Early engineer Greg Linden remembered designing for four times the current load and hitting it within months. Bezos's logic was that Barnes & Noble would come online eventually, and Amazon had to be big enough by then.`, "s1", "linden", "britannica"),
    p(`He did not get rich on salary. The filing lists his pay as $64,333, with no bonus and no options. The company's total losses so far were $6 million. The risk section even admits that it depended heavily on Bezos and held no key-person life insurance, a policy that pays out if a vital leader dies.`, "s1"),

    note(`He owned nearly half the company and paid himself $64,333.`),

    h(`Going public`),
    p(`An IPO, or initial public offering, is when a private company first sells shares to anyone on a stock exchange. Amazon filed in March 1997, assuming a price of $13 a share and 2.5 million shares. By 15 May it sold 3 million shares at ==$18== and raised $54 million, at a market value of about $438 million.`, "s1", "biAlberg", "atticus"),
    p(`The filing said Bezos would own about 43 percent, and his family another 10 percent, on the first draft of the deal. The bigger final deal brought his share to about 41 percent. His 9.885 million shares were worth roughly $178 million at the offer price. Kleiner's $8 million had turned into about $61.5 million on paper in 11 months.`, "s1", "bbg17", "atticus"),
    p(`The Scott Cook detail is worth noticing too. Cook, the co-founder of Intuit, and Patricia Stonesifer, a former senior Microsoft executive, each paid $100,000 for preferred shares in early 1997, joined the board and received stock options. Bezos was collecting people who had already built big things.`, "s1", "atticus"),
    p(`Barnes & Noble, the giant of the trade, answered with lawyers. Days before the IPO it sued over the slogan Earth's Biggest Bookstore. Amazon countersued, and in October the two settled with no damages paid and no liability admitted. A barnesandnoble.com employee later told WIRED that suing Amazon just was not cool. Analysts branded the company Amazon.toast all the same.`, "bnSettle", "wiredBN", "house", "atticus"),
    ex(`For example: one $18 share from the IPO became 240 shares after four splits, in 1998, twice in 1999 and in 2022. A split cuts a share into more pieces without changing the total value. At the 30 October 2026 closing price of $240.35, that single share is worth about ==$57,684==, by our arithmetic.`, "splits", "secapi"),
    timeline(
      [`Jul 1994`, `Bezos buys his founder shares for $10,000 and lends the company money.`, "s1"],
      [`Feb 1995`, `His father buys in. His mother's trust follows in July.`, "s1"],
      [`Jul 1995`, `The site opens. First week: $12,000 in orders.`, "historylink"],
      [`Dec 1995`, `Tom Alberg invests $50,000 as the angel round closes.`, "s1", "biAlberg"],
      [`Jun 1996`, `Kleiner Perkins invests $8 million. John Doerr joins the board.`, "s1"],
      [`May 1997`, `IPO at $18 raises $54 million.`, "biAlberg"],
      [`Oct 1997`, `Barnes & Noble lawsuit settled. Neither side pays.`, "bnSettle"],
    ),
  ],
};

const nearDeath = {
  id: "near-death",
  kicker: "1998 to 2002",
  title: "One Word: Ouch",
  blocks: [
    h(`Borrowing billions`),
    p(`Once it was public, Amazon discovered that Wall Street would lend it almost anything. In 1998 CFO Joy Covey raised $326 million in junk bonds, the first such issue by an internet company, with no payments due for five years. Junk bonds are loans to risky companies at high interest. This one yielded 10 percent.`, "forbes99"),
    p(`Then came January 1999. Amazon asked for $500 million in convertible bonds and got ==$1.25 billion== the same day, because lenders kept offering. A convertible bond is a loan that the lender can swap for shares if the stock rises enough, in this case at about $156. So Amazon was paying 4.75 percent, and it did not even say what the money was for.`, "wiredDebt", "forbes99"),
    p(`It spent fast. In 1998 and 1999 it put $429 million into warehouses and systems, and by late 1999 it reportedly had 70 to 80 percent more capacity than it needed. Its chief accounting officer warned Bezos that at this rate it would not be profitable for decades. In May 1999, Barron's ran a cover story calling the company Amazon.bomb.`, "commoncog", "house"),
    note(`Easy money is the most dangerous kind. It hides your mistakes.`),
    p(`Then came the decision that saved the company, and Bezos did not make it alone. New CFO Warren Jenson, who arrived in September 1999, feared suppliers might demand faster payment if confidence cracked. Advised by Morgan Stanley's Ruth Porat, he went to Europe in February 2000 and sold about $672 million of convertible bonds at nearly 7 percent. It was an expensive deal.`, "commoncog", "atticus"),
    p(`The Nasdaq peaked on 10 March, about a month later. Brad Stone reported that the deal could not have gone through just three weeks later, and that without that cushion Amazon would almost certainly have faced insolvency, meaning it could not pay its debts. __The best time to raise money is when you do not need it, because the door can shut without warning.__`, "commoncog"),
    ex(`For example: here is why cash mattered so much. A customer paid Amazon for a book immediately, but Amazon paid the supplier up to about 90 days later. So growth actually pumped cash into the company. If suppliers got nervous and demanded quicker payment, that pump would run in reverse, and fast.`, "commoncog"),

    h(`The analyst who said it would die`),
    p(`On 22 June 2000 a young Lehman Brothers bond analyst named Ravi Suria published a report that spread everywhere. He called Amazon's credit extremely weak and deteriorating, and said it would run out of cash within four quarters unless it pulled another financing rabbit from its hat. Its 4.75 percent bonds fell from about $75 to $58 in days, and the stock dropped about 20 percent in one day.`, "wiredSuria", "newyorker02", "commoncog"),
    p(`Bezos hit back on stage at PC Expo in New York days later. He told a crowd of nearly 1,000 that the analyst had not even called the company, and that Amazon had a billion dollars in cash. Behind the scenes, he, Jenson and treasurer Russ Grandinetti flew around reassuring suppliers. If the suppliers had panicked, the prediction could have come true by itself.`, "wiredBlast", "commoncog"),
    p(`Suria kept going. In February 2001 he warned of a creditor squeeze in the second half of the year. His numbers were real: Amazon's working capital, its short-term assets minus short-term debts, had fallen to $386 million from over $700 million. Its shareholders' equity had gone to negative $967 million. Amazon's spokesman called it a silly report and said Suria had already missed his first prediction by $1.1 billion.`, "lehman", "latSuria", "newyorker02"),
    facts(
      [`$116 to $6`, `Amazon's share price, peak to trough, 1999 to 2001, as Bezos told Congress`, "house"],
      [`$1.41B`, `Net loss in 2000, after $720M in 1999`, "lehman"],
      [`Nearly $3B`, `Total losses from founding to the end of 2001`, "house"],
      [`1,300`, `Jobs cut in January 2001, 15 percent of staff`, "abc01", "latSuria"],
    ),
    p(`Bezos opened his letter to shareholders for 2000 with one word: Ouch. His own fortune shrank with the stock, from over $9 billion in mid-1999 to about $1.7 billion by 2003. Pundits thought Amazon was going out of business. But he also argued that the company was stronger than ever, and that a falling share price was not a failing business.`, "house", "cnbcParents", "newsweek", "atticus"),
    note(`The stock fell over 90 percent. He kept shipping. Separate price from business.`),

    h(`The cuts and the coffee`),
    p(`Survival needed real pain. In January 2001 Amazon cut 1,300 jobs, closed a warehouse in McDonough, Georgia, shut a Seattle customer service centre, and took a charge of over $150 million. It also stopped selling items that lost money. Bezos had resisted running to Wall Street's expectations, but the bust forced his hand.`, "abc01", "latSuria", "commoncog"),
    p(`It also rented out what it had built. In August 2000 it signed a 10-year deal to run the online toy store for Toysrus.com, handling the site, fulfilment and customer service. Borders followed in 2001, and Internet News reported $125 million coming in from Toys R Us after one Christmas. That excess warehouse space had started earning. In July 2001 AOL put ==$100 million== into Amazon shares.`, "toys", "borders", "aol", "commoncog"),
    p(`That same year Bezos had coffee with Jim Sinegal, the founder of Costco, at a Starbucks inside a Barnes & Noble. He had come to talk about buying goods wholesale. Sinegal instead explained how Costco kept prices so low that members saw the value every time they walked in. Days later, Stone reports, Bezos called a meeting on Amazon's incoherent pricing. To be fair, Bezos has never publicly credited that coffee.`, "sinegal"),
    p(`That summer Amazon cut book, music and video prices by up to 30 percent, while its cost cuts paid for it. Then, on 22 January 2002, came results that almost nobody had predicted. Sales for the last quarter of 2001 were $1.12 billion, its first billion-dollar quarter. Net profit was ==$5 million==, or one cent a share.`, "sinegal", "q401", "latProfit", "bbcProfit"),
    note(`One cent per share. Seven years in. Celebrate your small wins.`),
    p(`In the same announcement he introduced Super Saver Shipping, free on orders over $99, as an everyday offer and not a promotion. He had just scraped into profit, and he gave the money straight back to customers. Bezos said there were two kinds of retailer, those working to raise prices and those working to lower them, and that Amazon had chosen the second.`, "q401"),
    p(`So was Suria wrong? He was wrong about the outcome, and by then he had left for a hedge fund. But Commoncog's case study makes a fair point: he had correctly spotted a real weakness, and the company survived partly because of a bond sale that closed just in time. Stone called it a mix of conviction, improvisation and luck. __Never let a good outcome convince you there was no danger.__`, "newyorker02", "commoncog"),
    timeline(
      [`Late 1998`, `$326 million junk bond, the first from an internet company.`, "forbes99"],
      [`Jan 1999`, `$1.25 billion convertible, raised from a $500 million ask.`, "wiredDebt"],
      [`May 1999`, `Barron's prints Amazon.bomb.`, "house"],
      [`Feb 2000`, `About $672 million raised in Europe, weeks before the crash.`, "commoncog"],
      [`Jun 2000`, `Lehman warns Amazon will run out of cash.`, "wiredSuria"],
      [`Jan 2001`, `1,300 jobs cut.`, "abc01"],
      [`Jul 2001`, `AOL invests $100 million.`, "aol"],
      [`Jan 2002`, `First profit: $5 million. Free shipping over $99.`, "q401", "bbcProfit"],
    ),
  ],
};

module.exports = { firstMoney, nearDeath };
