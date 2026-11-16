// Chapter: every-company
const p = (text, ...s) => ({ t: "p", text, src: s });
const note = (text) => ({ t: "note", text });
const h = (text) => ({ t: "h", text });
const ex = (text, ...s) => ({ t: "example", text, src: s });
const v = (name, years, outcome, o, ...s) => ({ t: "venture", name, years, outcome, ...o, src: s });

module.exports = {
  id: "every-company",
  kicker: "Every venture, win or lose",
  title: "Every Company He Ever Started",
  blocks: [
    p(`Most biographies give you two names: Amazon and Blue Origin. The real list is longer and much funnier. It starts with a summer camp that signed up six children. It runs through a news service that a bank killed before it began. It includes a phone that sold so badly it was cut to 99 cents, and a health-care company built with Warren Buffett that closed within about three years.`, "biLife", "tnw", "voxFire", "cnbcHaven"),
    p(`Read this chapter as a scorecard. Each entry shows the idea, the choice behind it, where the first money came from, what happened and what to copy. __Count the failures as you go, because the wins only make sense next to them.__`),
    note(`Twenty-odd ventures. Count how many you had already heard of.`),

    h(`Before Amazon`),
    v(`The DREAM Institute`, `High-school summer (early 1980s)`, `shut`, {
      idea: `A 10-day summer camp for younger children, meant to make them think and read widely. The required reading included Dune, The Lord of the Rings, Gulliver's Travels and Stranger in a Strange Land.`,
      decision: `He had spent a teenage summer working at McDonald's and disliked it. The next summer, instead of finding another job, he and his girlfriend created their own product.`,
      howStarted: `Two teenagers, a reading list and a price. Six children signed up.`,
      funding: `No investors. Parents paid $600 per child. Six children at $600 is $3,600 at most, by our arithmetic.`,
      whatHappened: `It was a tiny one-off, and we found no record of it continuing. Then he left for Princeton. Its real value is what it shows: a teenager who would rather charge for an idea than wait for a wage.`,
      lesson: `Charge real money for your first idea, even if only six people pay. A price tells you more than a compliment.`,
    }, "biLife", "biEarly"),

    v(`Worldwatch, the news service with Halsey Minor`, `About 1990`, `failed`, {
      idea: `Take several news feeds, sort them by topic and send each banker only the stories that matched their work. Think of a personal news feed, delivered by fax or email, long before most people had a feed at all.`,
      decision: `Bezos was so taken with it that he nearly quit his job at Bankers Trust. Minor had worked at Merrill Lynch, and the pitch to the bank was simple: bankers would value a filter.`,
      howStarted: `Two young men in New York and a partnership, with Merrill Lynch as the planned first customer and backer.`,
      funding: `Merrill was going to put up $750,000, Minor recalled. Forbes reported in 1998 that the bank first approved the project and then pulled the plug. Merrill had lost money in 1990.`,
      whatHappened: `They tried to work out how to raise the money elsewhere. On a phone call, they agreed they could not, and went their separate ways. Minor, crushed, later founded CNET. By 1998 his stake in it was valued at $184 million. Bezos moved on, and four years later he was driving to Seattle.`,
      lesson: `Do not build a startup on one backer's promise. And keep your failures in perspective: both men recovered very well from this one.`,
    }, "tnw", "forbes98", "biLife"),

    h(`The engine`),
    p(`Everything else in this chapter depends on the next entry. Amazon's shares pay for the rockets, and his Amazon wealth bought the newspaper. Amazon's cash paid for most of the other experiments. So we give it the longest entry, and later chapters tell its story scene by scene.`, "nyt17", "ghco"),
    v(`Amazon.com`, `1994 to today`, `public`, {
      idea: `An online bookstore with millions of titles, something no physical shop could hold. The internet was growing fast, and he reckoned a store with unlimited shelves could only exist there.`,
      decision: `He made the call, he says, with his heart more than his head, because he expected to regret not trying more than he would regret failing. He avoided Silicon Valley partly because of the sales tax he would have had to charge California shoppers. He then chose Kleiner Perkins over General Atlantic for his venture money.`,
      howStarted: `A garage at a rented three-bedroom house in Bellevue, near Seattle, with desks made from Home Depot doors. Shel Kaphan, the first employee, built the site. It opened on ==16 July 1995== and took $12,000 in orders in its first week. By the end of the first month it had sold to all 50 US states and 45 countries.`,
      funding: `$10,000 of his own for 10.2 million shares, plus $84,000 in interest-free loans he made to the company. Then $245,573 from his parents, about $1 million from around 20 angels, $8 million from Kleiner Perkins and $54 million from the 1997 stock market listing.`,
      whatHappened: `Sales went from $511,000 in 1995 to $15.7 million in 1996, and to ==$716.9 billion== in 2025, with $80 billion in operating profit. It came close to a cash crisis around 2000 and 2001, as the near-death chapter shows. Bezos stepped down as CEO in July 2021 and is now executive chair. Andy Jassy runs it.`,
      lesson: `Pick a narrow first product inside a market that is growing wildly. Books were the door. The everything store came later.`,
    }, "house", "historylink", "garage", "s1", "gwAlberg", "biAlberg", "q425", "cnbcProm", "forbesProfile"),
    note(`$10,000 in 1994. $716.9 billion in sales in 2025. Same company.`),

    h(`The first big failures`),
    v(`Amazon Auctions and zShops, later Marketplace`, `1999 to today`, `pivoted`, {
      idea: `Let other people sell through Amazon. Auctions copied eBay. zShops let small shops sell at fixed prices. Marketplace put outside sellers on the same page as Amazon's own stock.`,
      decision: `eBay was the threat. Fortune noted that Amazon launched auctions two days after eBay announced a share sale. The bigger choice came later. Amazon decided to let rival sellers compete directly beside its own products, even when that took a sale from itself.`,
      howStarted: `Auctions launched in March 1999 and zShops that autumn.`,
      funding: `Amazon's own cash and borrowings. No separate investors.`,
      whatHappened: `By Bezos's own telling, almost nobody came to Auctions and zShops did little better. The third attempt worked. In 2017 outside sellers passed half of all items sold. By the third quarter of 2026 they were ==61 percent== of units, and seller services brought in $172.2 billion in 2025.`,
      lesson: `A failed product may be the right idea in the wrong shape. Change the form before you throw out the idea.`,
    }, "yahooFail", "fortune99", "secapi", "atticus"),
    { t: "quote", text: `I think seven people came, if you count my parents and siblings.`, who: `Jeff Bezos on Amazon Auctions, 2014 letter to shareholders`, src: ["yahooFail"] },
    note(`Today this brings in over $172 billion a year. Seven people. Read that twice.`),

    v(`The dot-com stakes: Pets.com, Kozmo, drugstore.com, HomeGrocer, living.com and more`, `1998 to 2001`, `failed`, {
      idea: `Buy big pieces of other online shops. Amazon would get a share of each new category without building it, and those shops would pay Amazon to promote them.`,
      decision: `Amazon believed the internet was a land rush: grab ground now, make it pay later. In 1999 Fortune counted 46 percent of Drugstore.com, 35 percent of HomeGrocer, 54 percent of Pets.com and 49 percent of Gear.com. Amazon announced a major move about every six weeks that year.`,
      howStarted: `Bezos and his team made these investments in rapid succession during the boom. Partners also agreed to pay fees, such as $105 million over three years from drugstore.com and $145 million over five years from living.com.`,
      funding: `Amazon's stock and the billions it had borrowed. About $57.8 million went into Pets.com, $62.5 million into HomeGrocer and $60 million for 32 percent of Kozmo.`,
      whatHappened: `The bust wiped most of it out. Pets.com closed in November 2000, sacking about 255 of its 320 staff, with $147 million in cumulative losses. Living.com went bankrupt and Kozmo shut in 2001. Amazon recorded $305 million in investment losses in 2000. It kept selling the Pets.com sock puppet at $19.99 even after the company had folded, 100 times the price of a Pets.com share.`,
      lesson: `Owning part of a business does not fix its economics. Check whether each order makes money before you buy in.`,
    }, "fortune99", "eweek", "nytPets", "latPets", "forbesSock", "atticus", "sec8k"),

    ex(`For example: Amazon's most consequential small deal of 1998 had an Indian team behind it. Junglee was started in 1996 by Rakesh Mathur and Stanford PhD students, including Anand Rajaraman, Venky Harinarayan and Ashish Gupta. Four of its five founders were of Indian origin. Its software compared prices across websites. Amazon paid about 1.6 million shares. Then Ram Shriram, who was with Junglee at the sale, took Bezos to meet two students named Larry Page and Sergey Brin.`, "forbesJunglee", "etJunglee", "fiJunglee", "pr98", "wired98", "atd"),

    v(`Personal investing and Bezos Expeditions`, `1998 to today`, `running`, {
      idea: `Put his own money into young companies and science projects, separate from Amazon. Bezos Expeditions is the name of the vehicle he uses.`,
      decision: `The first famous cheque went to Google in 1998. Asked why, he told author Ken Auletta that he simply fell in love with the two founders. His official list of holdings now includes many AI and robotics firms.`,
      howStarted: `A meeting in a Menlo Park garage in 1998, arranged by Shriram. Bezos was one of only a few early angels.`,
      funding: `His own money. The Google cheque was reported at $250,000, at four cents a share by Auletta's account.`,
      whatHappened: `That cheque became about 3.3 million Google shares at the 2004 IPO. An Amazon spokesman declined to say what he did with them. The official site now lists Airbnb, Uber, Twitter, Workday, Stack Overflow, Remitly, Perplexity, Figure and Physical Intelligence among others. He also backed Cambrian Ventures, the fund of Junglee's Rajaraman and Harinarayan.`,
      lesson: `Your first success opens doors you did not know about. Stay close to the smart people you meet on the way, because the next deal usually comes through them.`,
    }, "atd", "expeditions", "gwPortfolio", "fiJunglee"),

    h(`The rocket`),
    v(`Blue Origin`, `2000 to today`, `running`, {
      idea: `Make getting to space far cheaper by reusing rockets, so that one day heavy industry can move off Earth. He says the point is to protect the planet, and he has wanted this since high school.`,
      decision: `In 1999 he and novelist Neal Stephenson saw the rocket film October Sky and went for coffee. Bezos said he had long wanted a space company, and Stephenson asked why he did not start one that day. The team first explored alternatives to chemical rockets, then decided that conventional rockets, reused, were the right road.`,
      howStarted: `Blue Operations LLC, in a former envelope factory in south Seattle. Stephenson says he was the only employee for a little while. Early members included inventor Danny Hillis, science historian George Dyson and Amazon's general counsel. Workers would tell neighbours only that they did scientific research.`,
      funding: `Bezos alone for 26 years, with small NASA awards of $3.7 million and $22 million along the way. In 2017 he said he was selling about $1 billion of Amazon stock a year to pay for it. The Wall Street Journal, cited by CNBC, puts the total near ==$30 billion==.`,
      whatHappened: `First test hop in November 2006, reaching 285 feet. A vehicle lost in August 2011. First rocket to land after reaching space in November 2015. Bezos flew in July 2021. New Glenn reached orbit in January 2025. In May 2026 a rocket blew up on the pad during a test, and SpaceNews says the rebuilt pad should be ready by the first half of December. That autumn, outside investors came in for the first time at a reported $140 billion.`,
      lesson: `A very long project needs a money machine behind it. He built the machine first, then fed the dream from it.`,
    }, "wiredBO", "wapoBO", "stephenson", "ars", "newsweek", "nyt17", "space", "nyt11", "bo2011", "cnbcBO", "reutersNG", "cnnBO", "spacenews", "earthFund"),

    h(`The bets made with Amazon's money`),
    v(`Amazon Prime`, `2005 to today`, `running`, {
      idea: `Pay once a year and get free two-day delivery on everything. All you can eat, for shipping.`,
      decision: `Engineer Charlie Ward first raised the idea of a yearly fee. Bezos added speed to it. The team weighed $49 and $99 before he settled on $79, big enough to matter but small enough to try. Some senior people pushed back hard and told the team it should not let him do this.`,
      howStarted: `A small secret team, code-named Futurama, built it in about six weeks over the 2004 holidays.`,
      funding: `Amazon's own cash flow. Bezos told customers it would be expensive for Amazon in the short term.`,
      whatHappened: `Launched on 2 February 2005. Tens of thousands signed up in the first month. The price rose to $99 in 2014. Video streaming was added later as a free extra. Subscription services, which include Prime fees, brought in $49.6 billion in 2025.`,
      lesson: `Sell the habit, not the product. Once someone has paid up front, they stop comparing prices elsewhere.`,
    }, "vox", "seattlePrime", "prPrime", "qz", "secapi"),

    v(`Amazon Web Services`, `2006 to today`, `running`, {
      idea: `Rent out computing power and storage over the internet, by the hour, so that anyone could run software without buying servers.`,
      decision: `At a 2003 executive offsite at Bezos's home, his team asked what Amazon was truly good at. Running reliable, cheap data centres came out of that exercise. Fortune calls the decision to sell this to outsiders the turning point, one that could easily have gone the other way.`,
      howStarted: `Andy Jassy wrote the plan, which reportedly went through 31 drafts. Chris Pinkham, who wanted to go home to South Africa, set up a team in Cape Town that built the computing service. By late 2004 a small office of about 14 people was working on it.`,
      funding: `Amazon's own cash. There was no outside round and no separate company.`,
      whatHappened: `Storage launched in March 2006 and computing that August. Amazon hid the numbers until 2015. In 2025 AWS earned $128.7 billion in sales and $45.6 billion in operating profit. By the third quarter of 2026 it made ==63 percent== of Amazon's operating profit on about 23 percent of its sales.`,
      lesson: `List what you had to get good at to survive. One of those painful skills may be a bigger business than the one you are in.`,
    }, "tc16", "tc21", "fortuneAWS", "gwAWS", "q425", "q326", "secapi"),

    v(`Kindle and Lab126`, `2004 to today`, `running`, {
      idea: `A reading device with a built-in wireless link that could fetch a book in under a minute, so Amazon would own digital books before Apple or Google could.`,
      decision: `In 2004 Bezos took Steve Kessel off the job of running books, which Kessel thought was the best job in the world, and told him to act as if his goal was to put everyone selling physical books out of work. Bezos insisted one person could not run both the old and the new business.`,
      howStarted: `A secret hardware lab called Lab126 in Silicon Valley, led by Palm veteran Gregg Zehr. Amazon had never built hardware. The code name, Fiona, came from a Neal Stephenson novel.`,
      funding: `Amazon's own cash. Kessel first estimated 18 months and a small team. It took three and a half years and far more people.`,
      whatHappened: `Launched on 19 November 2007 at $399, with 90,000 books, most new titles and bestsellers at $9.99. The first stock sold out in about five and a half hours, and Amazon ran out again the next Christmas.`,
      lesson: `If your business will be disrupted, do it yourself first. And give the new team a boss who has no old business to protect.`,
    }, "iexpress", "publunch", "kindleAA", "goodereader", "commoncogKindle"),

    h(`Abroad: one retreat, one fight`),
    v(`Amazon China (Joyo)`, `2004 to 2019`, `shut`, {
      idea: `Enter the world's most populous market by buying a local online book and media seller.`,
      decision: `Amazon chose to buy rather than build, paying $75 million for Joyo in 2004. Its largest shareholder at the time was Lei Jun, who later founded Xiaomi.`,
      howStarted: `It kept the Joyo business and later rebranded it under the Amazon name.`,
      funding: `Amazon's own cash.`,
      whatHappened: `It held about 15 percent of the market around 2011 and 2012, and under 1 percent by 2019. Alibaba's Tmall and JD.com controlled 82 percent by then. Amazon closed its China marketplace on 18 July 2019, keeping cross-border sales, Kindle and cloud computing.`,
      lesson: `A global brand does not beat local habits. Payment, delivery and marketing have to fit the country, or a local rival will fit it for you.`,
    }, "reutersCN", "cnbcCN", "technode"),

    v(`Amazon India`, `2012 to today`, `running`, {
      idea: `After China, do not lose the last big e-commerce market. Enter India as a marketplace, with Amazon handling the warehousing and delivery for local sellers.`,
      decision: `Indian rules barred foreign-owned online retailers from selling their own stock directly, so Amazon had to use the marketplace model. It sent Amit Agarwal, from Bezos's senior team in Seattle, to lead. It revived the old Junglee name first as a price-comparison site in February 2012.`,
      howStarted: `Amazon.in opened in June 2013 with about 100 sellers, selling only books, films and TV shows, from a warehouse near Mumbai. Flipkart, founded by two former Amazon employees, had a six-year head start.`,
      funding: `Amazon's cash. In July 2014, one day after Flipkart announced a $1 billion raise, Bezos announced $2 billion for India. Amazon spent it in under two years and added $3 billion in 2016.`,
      whatHappened: `Amazon reached 100 million customers by 2018, with annual losses of up to about $1 billion, but still trailed the Flipkart group on gross sales. Walmart bought Flipkart in 2018. Bernstein estimated Amazon had invested around $6.5 billion, with India still unprofitable as of 2023.`,
      lesson: `Money can buy you speed in a price war, but not automatically first place. Your rival can find a bigger backer too.`,
    }, "bbcIN", "wharton", "reutersIN", "mint", "et", "bbcFlip"),
    note(`Flipkart's founders trained at Amazon. Then they made Bezos spend billions.`),

    h(`Bought, not built`),
    v(`Zappos`, `Bought 2009`, `running`, {
      idea: `The top online shoe seller, famous for customer service and an unusual company culture.`,
      decision: `Bezos visited in 2005 and was told no at any price, by Tony Hsieh's account. Four years later the recession had tightened credit, and Hsieh writes that his board wanted a sale and that he feared being replaced. Amazon agreed to preserve Zappos's independence and culture, and that made a deal possible.`,
      howStarted: `Amazon came back after waiting four years. Zappos was by then doing over $1 billion in gross sales and had leaned on a $100 million credit line for stock.`,
      funding: `About 10 million Amazon shares, plus $40 million in cash and restricted stock for staff. It was worth about $1.2 billion by closing because Amazon's stock rose.`,
      whatHappened: `Zappos still runs as a separate brand. Hsieh's essay remains a warning about how investors can force a founder's hand when credit runs out.`,
      lesson: `Founders: outside money gives outsiders a vote. Buyers: keep what makes the target special, and be ready to wait years.`,
    }, "inc", "biHsieh", "investo", "cnbcQuidsi"),

    v(`Quidsi (Diapers.com)`, `Bought 2010, shut 2017`, `shut`, {
      idea: `Marc Lore and Vinit Bharara started Diapers.com in New Jersey in 2005, an online shop built around what new parents buy again and again.`,
      decision: `Amazon slashed its own diaper prices while Quidsi was growing, which squeezed its margins and made investors shy. Brad Stone's book reports that Bezos threatened to take big losses and drive prices towards zero. Quidsi talked to Walmart, and Amazon won the bidding war.`,
      howStarted: `Quidsi was a going business. Amazon bought it in November 2010.`,
      funding: `$545 million from Amazon. The founders had raised money from venture investors, who grew reluctant during the price war.`,
      whatHappened: `Amazon said it could never make the unit profitable, and closed the Quidsi sites in 2017, laying off 263 people. Lore left, built Jet.com and sold it to Walmart for $3.3 billion. The mistakes chapter covers the questions lawmakers later asked about it.`,
      lesson: `If a giant can match your whole product, a price lead will not save you. Build something it cannot copy just by spending.`,
    }, "gwQuidsi", "cnbcQuidsi", "voxQuidsi"),

    v(`The Washington Post`, `Bought 2013`, `running`, {
      idea: `Buy a famous, struggling newspaper personally, give it time and money, and help it find a national digital audience.`,
      decision: `The Graham family had owned it for 80 years. Revenue had fallen for seven years straight, and publisher Katharine Weymouth warned of a possible $40 million loss in 2013. Bankers at Allen & Co. connected the sides, and Graham and Bezos met at the Sun Valley conference in July and quickly agreed. He told staff he could offer financial runway.`,
      howStarted: `A $250 million cash purchase through a company of his own, not Amazon. He kept the senior editors in place.`,
      funding: `His own money. Reuters noted that the price was about four times what comparable newspaper deals suggested.`,
      whatHappened: `The paper had profitable years around the first Trump term. Then it lost $77 million in 2023 and about $100 million in 2024. In February 2026 it cut about a third of its staff. The mistakes chapter tells the wider story.`,
      lesson: `Patient money still needs a working business model. Runway only helps if the plane can eventually fly.`,
    }, "ghco", "wapoSale", "poynter", "reutersWP", "ny26", "reutersWP26", "nyt26"),

    h(`The phone and the voice`),
    v(`Fire Phone`, `2014 to 2015`, `failed`, {
      idea: `An Amazon smartphone with a 3D-like display, face-tracking cameras and a free year of Prime.`,
      decision: `Bezos defended it as a bold bet and said a phone would take many tries. Amazon chose an exclusive deal with one US carrier, AT&T, and launched just before Apple's new iPhones.`,
      howStarted: `An internal devices team that grew to as many as 1,000 people, with Ian Freed a key leader.`,
      funding: `Amazon's own money, reported at over $100 million for the team, plus the charge below.`,
      whatHappened: `The $199 price fell to 99 cents with a two-year contract. An estimate put early sales at only 35,000. Amazon took a ==$170 million== charge in October 2014 and stopped selling it by September 2015. That same October, Amazon reported its biggest quarterly loss in 14 years.`,
      lesson: `Do not enter a crowded market with a feature nobody asked for. But do keep the people and the code, because the next bet may need them.`,
    }, "voxFire", "guardianFire", "fastco", "cnbcFail"),

    v(`Echo and Alexa`, `2011 to today`, `running`, {
      idea: `A speaker you talk to, with its brain in Amazon's cloud. Bezos's stated dream was the talking computer from Star Trek.`,
      decision: `He sketched it himself on a whiteboard in early 2011. He wanted it to cost $20. He picked his technical adviser Greg Hart to lead it, even though Hart said he had no hardware experience. Bezos chose the name, after the ancient library of Alexandria.`,
      howStarted: `A team that grew past 200 people with a budget above $50 million, per The New Yorker. Fire Phone people and lessons fed into it.`,
      funding: `Amazon's own cash.`,
      whatHappened: `Launched quietly on 6 November 2014 with a press release and a short video, not a big stage show. It created a whole category, and Amazon spoke of hundreds of millions of devices by 2020. It also cost a fortune: The Wall Street Journal reported tens of billions lost across the devices unit.`,
      lesson: `A hit product can still be a poor business. Ask how it will make money before you ship a hundred million.`,
    }, "wiredAlexa", "verge", "cnbcFail", "gwFlop"),

    h(`The graveyard`),
    p(`Fire Phone gets the headlines, but the small failures teach you more about how the place ran. People could pitch an idea and build it with very little second-guessing. Most of these experiments quietly died. Bloomberg listed 37 projects killed after Jassy took over in 2021, projects it described as dreamed up during the Bezos era.`, "kill"),
    v(`The small flops: WebPay, Wallet, Local, Local Register, Destinations, Dash, Restaurants, Halo`, `2007 to 2023`, `shut`, {
      idea: `Quick tests, each aimed at a rival's turf: PayPal and Square in payments, Groupon in local deals, Expedia in travel, the delivery apps in restaurant food. Dash was a physical button that reordered one household item. Halo was a health-tracking band.`,
      decision: `Amazon's rule was to try, measure and move on. Bezos has argued that failure and invention are twins, and that a large company should run proportionately large experiments.`,
      howStarted: `Small internal teams. Destinations launched in April 2015. Wallet lasted about six months. Restaurants began in 2015 and reached 20 US cities plus London.`,
      funding: `Amazon's own budget in every case, with amounts rarely made public.`,
      whatHappened: `WebPay closed in 2014 after seven years. Destinations stopped within six months, in October 2015. Local closed that December. Local Register ended in February 2016. Dash buttons stopped in 2019, and Restaurants closed in June 2019. Halo stopped working in August 2023, with Amazon refunding recent buyers.`,
      lesson: `Run cheap experiments, kill them quickly, and make sure the failures are small enough that you can afford many.`,
    }, "fool17", "street", "yahooFail", "biFailed", "halo", "kill", "startuptalky"),

    v(`Whole Foods Market`, `Bought 2017`, `running`, {
      idea: `Buy a real-world, upmarket grocery chain with more than 460 stores to push into fresh food.`,
      decision: `Activist investor Jana Partners took a stake of nearly 9 percent in April 2017 and pressed for change. Whole Foods looked for a friendly buyer. Amazon offered $41 a share, Whole Foods asked for $45, and Amazon named $42 as its best and final price.`,
      howStarted: `CEO John Mackey and three executives flew to Seattle for what he called a blind date, arranged through mutual friends. Seven suitors circled in all, and Amazon came close to walking away.`,
      funding: `$13.7 billion, its largest deal ever.`,
      whatHappened: `By January 2026 Amazon reported over 40 percent sales growth and more than 550 stores, with 100-plus new stores planned.`,
      lesson: `When you cannot build the skill fast, buy it. Then know your walk-away price, and name it out loud.`,
    }, "cnbcWF", "biWF", "smWF", "goClose", "seattleGo", "forbesMA", "reutersGo26"),

    v(`Amazon Go and Amazon Fresh stores`, `2016 to 2026`, `shut`, {
      idea: `Shops with no checkout line. You scanned your phone, cameras and sensors watched what you took, and your account was charged when you left. Fresh stores later brought the idea to full supermarkets.`,
      decision: `Amazon wanted a store format of its own to change physical shopping, not just to own Whole Foods.`,
      howStarted: `A 1,800-square-foot shop in Seattle, open to staff from 5 December 2016 and to the public on 22 January 2018.`,
      funding: `Amazon's own budget. It did not disclose the cost.`,
      whatHappened: `In January 2026 Amazon said it had not created a distinctive experience with an economic model that could scale. It closed Go and Fresh stores within days, except in California, where they stayed open longer to meet state rules, and is converting some to Whole Foods. Fresh continues online.`,
      lesson: `Clever technology is not a business model. If the shop does not earn its costs, shoppers' amazement will not save it.`,
    }, "reutersGo", "seattleGo", "goClose", "apGo", "reutersGo26"),

    v(`Haven`, `2018 to 2021`, `shut`, {
      idea: `Three giants, Amazon, Berkshire Hathaway and JPMorgan Chase, jointly tackle employee health-care costs.`,
      decision: `The 2018 announcement was so bold that health-care shares fell. Surgeon and writer Atul Gawande was picked to lead it.`,
      howStarted: `A nonprofit based in Boston, which had 57 staff at the end.`,
      funding: `The three founding companies. The amount has not been disclosed.`,
      whatHappened: `Gawande stepped back in May 2020. Each parent kept running its own projects with its own staff, which left Haven little to do. It closed at the end of February 2021. Bloomberg reported little evidence of new approaches.`,
      lesson: `A partnership of giants needs one clear owner. If everyone also runs their own version, the joint project will die.`,
    }, "cnbcHaven", "globeHaven", "yahooFail"),

    v(`Amazon Care`, `2019 to 2022`, `shut`, {
      idea: `App-based medical care with video visits and nurses who came to your home, first for Amazon staff in Seattle, then for other employers.`,
      decision: `Test on your own employees first, then sell the service to other companies.`,
      howStarted: `A pilot for Amazon staff around Seattle in 2019.`,
      funding: `Amazon's own budget.`,
      whatHappened: `Few businesses signed up. Amazon said it was not a complete enough offering and ended it on 31 December 2022, cutting 159 jobs, while 236 more went at the contracted clinic. About a month earlier it had agreed to buy One Medical for $3.9 billion.`,
      lesson: `Your own employees are a captive audience. Real customers, who can say no, are the real test.`,
    }, "apCare", "cnbcCare", "kill", "cnbcOM"),

    h(`His own money, his own causes`),
    v(`Bezos Day One Fund and Bezos Earth Fund`, `2018 and 2020 to today`, `running`, {
      idea: `Two giving vehicles. Day One funds groups helping homeless families and runs free preschools. Earth Fund gives grants to fight climate change and protect nature.`,
      decision: `He announced Day One in September 2018, a year after asking for ideas in public, and Earth Fund in February 2020. Each has one defined mission, and Earth Fund has a hard deadline.`,
      howStarted: `Day One's first Bezos Academy preschool opened in Des Moines, Washington, in October 2020. Earth Fund's first $791 million in grants went to 16 groups in November 2020.`,
      funding: `His own money: a $2 billion commitment to Day One and $10 billion to Earth Fund, to be fully given out by 2030.`,
      whatHappened: `Forbes says Earth Fund had granted $2.4 billion as of its latest update. His giving has drawn criticism and praise, covered in the personal-life chapter.`,
      lesson: `Give a cause a deadline and a number. A public target forces you to act.`,
    }, "cnbcDay1", "earthFund", "cnnFacts", "forbesProfile", "forbesNext", "insidePhil"),

    v(`The 10,000-Year Clock and the Apollo engines`, `Clock: ongoing. Engines: 2010 to 2013`, `running`, {
      idea: `Two strange projects with no profit in them. One is a giant clock meant to run for 10,000 years, designed by Danny Hillis, to make people think in long time spans. The other was to raise Apollo rocket engines from the sea floor.`,
      decision: `Neither was meant to earn money. Hillis was an early colleague at Blue Origin, and Bezos has dreamed of space since he was five.`,
      howStarted: `The clock is being built inside a mountain on his Texas land. For the engines, he assembled deep-sea explorers, including some who had searched for the Titanic.`,
      funding: `His own money: a reported $42 million for the clock. The engine recovery was privately funded through Bezos Expeditions.`,
      whatHappened: `After three weeks at sea in March 2013, his team lifted parts of two F-1 engines from more than 4 kilometres down. They stayed NASA's property, and restored parts are on show at Seattle's Museum of Flight.`,
      lesson: `Keep something in your life that pays nothing. It is a good test of what you really care about.`,
    }, "wiredBO", "cnbcDay1", "bbcF1", "museum", "cnnFacts", "ars"),

    v(`Prometheus`, `2025 to today`, `running`, {
      idea: `AI for the physical economy: tools to speed up how engineers design and make real things. He calls the goal an artificial general engineer.`,
      decision: `He had worked on it since late 2024, and it became the first CEO job he had taken since leaving that role at Amazon in 2021. He says it now takes the bulk of his time, and says it has nothing to do with robotics.`,
      howStarted: `About 150 people by mid-2026 across San Francisco, London and Zurich, hired from places like OpenAI, Google DeepMind and Nvidia. His co-CEO is Vik Bajaj, who co-founded Alphabet's Verily.`,
      funding: `$6.2 billion at launch in November 2025, with Bezos putting in capital. Then a $12 billion second round at a $41 billion valuation in June 2026. Bloomberg assumes he supplied about $5.6 billion of the first round and $2 billion of the second.`,
      whatHappened: `Bezos says it is premature to disclose what it has achieved, though he calls the progress remarkable. Bloomberg values his stake at about $12 billion.`,
      lesson: `Past success lets you skip the hard part of fundraising, not the hard part of building. Judge this one only when it ships.`,
    }, "cnbcProm", "bbgProfile", "naira"),

    p(`Two more long bets are still running inside Amazon. Zoox, the self-driving startup bought in 2020 for a reported $1 billion or more, now charges for robotaxi rides in Las Vegas and operates in 12 US cities. Amazon Leo, its satellite internet network, is due to begin first service later this year. Neither has yet proved it can make money.`, "reutersMA", "q326"),
    p(`Add it all up and a pattern appears. The ideas that lasted were ones where Amazon owned a hard skill, like logistics, cloud computing or a loyal customer base. __The flops were mostly attempts to enter someone else's market with nothing special to offer.__`),
    note(`Before your next idea, ask what unfair skill you already have.`),
  ],
};
