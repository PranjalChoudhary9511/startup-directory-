// One-shot corrections to the merged Mukesh Ambani book, from the merged snapshot.
import fs from "node:fs";
const root = "C:/Users/Pranjal Choudhary/Desktop/start-up derectory/web/";
const dir = root + "research/_scratch/mukesh-ambani-factcheck/";
const bookPath = root + "src/content/billionaires/books/mukesh-ambani.json";
const b = JSON.parse(fs.readFileSync(dir + "book-merged.json", "utf8"));
const NS = JSON.parse(fs.readFileSync(dir + "newsrc.json", "utf8"));
Object.assign(NS, {
  bs126: { label: "Business Standard: Reliance Industries sells US shale block for $126 million (7 Oct 2017)", url: "https://www.business-standard.com/article/companies/reliance-industries-sells-us-shale-block-for-126-million-117100601142_1.html" },
  scroll: { label: "Scroll: The Jio launch was all about Mukesh Ambani (28 Dec 2015)", url: "https://amp.scroll.in/article/778534/scroll_in" },
  btjio: { label: "Business Today: RIL AGM, Mukesh Ambani announces Reliance Jio hiring plans (6 Jun 2013)", url: "https://www.businesstoday.in/story/ril-agm-mukesh-ambani-announces-reliance-jio-hiring-plans/1/195640.html" },
  bs50: { label: "Business Standard / PTI: Reliance Jio crosses 50 million subscriber mark in 83 days (28 Nov 2016)", url: "https://www.business-standard.com/article/pti-stories/jio-crosses-50-million-subscriber-mark-in-83-days-116112801292_1.html" },
});
const keyIdx = {};
const S = (k) => {
  if (keyIdx[k] !== undefined) return keyIdx[k];
  if (!NS[k]) throw new Error("no source " + k);
  b.sources.push(NS[k]);
  return (keyIdx[k] = b.sources.length - 1);
};
const inPlace = (i, k) => { b.sources[i] = NS[k]; keyIdx[k] = i; };
const walkSrc = (fn) => {
  b.hookSrc = fn(b.hookSrc);
  b.glance.forEach((g) => (g.src = fn(g.src)));
  b.contact.channels.forEach((g) => (g.src = fn(g.src)));
  b.contact.socials.forEach((g) => (g.src = fn(g.src)));
  b.chapters.forEach((c) => c.blocks.forEach((x) => {
    if (x.src) x.src = fn(x.src);
    if (x.items) x.items.forEach((it) => (it.src = fn(it.src)));
  }));
};
const swap = (from, to) => walkSrc((a) => [...new Set(a.flatMap((i) => (i === from ? [].concat(to) : [i])))]);
const drop = (i) => walkSrc((a) => { const r = a.filter((x) => x !== i); if (!r.length) throw new Error("dropping last src " + i); return r; });
const B = (c, i) => b.chapters[c].blocks[i];
const rep = (c, i, field, from, to) => {
  const x = B(c, i);
  if (!x[field].includes(from)) throw new Error(`no match ${c}.${i}.${field}: ${from}`);
  x[field] = x[field].replace(from, to);
};
const set = (c, i, field, val) => { if (B(c, i)[field] === undefined) throw new Error(`no field ${c}.${i}.${field}`); B(c, i)[field] = val; };
const src = (c, i, keys) => { B(c, i).src = keys.map((k) => (typeof k === "number" ? k : S(k))); };
const itemSrc = (c, i, j, keys) => { B(c, i).items[j].src = keys.map((k) => (typeof k === "number" ? k : S(k))); };

// ---- sources replaced in place: blocked, dead or moved pages, same facts
inPlace(19, "arab"); inPlace(36, "afpup"); inPlace(58, "hinduaramco"); inPlace(61, "etenergy");
inPlace(75, "hindurcom"); inPlace(79, "ptivoice"); inPlace(84, "bsrights"); inPlace(87, "eastern");
inPlace(89, "toimodi"); inPlace(103, "ndtvotc"); inPlace(128, "fbm"); inPlace(68, "rilnw18");
swap(25, 14); swap(77, 153); swap(80, 161); swap(134, 135); swap(156, 154); swap(162, 168);
drop(22); drop(180);

// ---- front matter
b.subtitle = "From the Stanford degree he never finished to a giant refinery in Gujarat and the cheap mobile data that changed India: how Mukesh Ambani grew his father's company into an empire, and the fights and bets along the way.";
b.hook = "Mukesh Ambani is one of the richest people on Earth, worth roughly ==$77–89 billion== in early November 2026, depending on which list you read. Yet he has taken **zero salary** from his own company, Reliance, for six straight years, from 2020-21 to 2025-26. Before that, he capped his own pay at ==₹15 crore a year== for twelve years, from 2008-09 to 2019-20.";
b.hookSrc = [0, 120, 119, 5, 6];
const gl = (label) => { const g = b.glance.find((x) => x.label === label); if (!g) throw new Error(label); return g; };
gl("Education").value = "Bachelor's in chemical engineering, Institute of Chemical Technology (then UDCT), University of Bombay, 1979; then Stanford University, which he left before finishing the MBA (he says 1981; other records say 1980)";
gl("Education").src = [0, 1, 2, 14];
gl("First job").value = "His father's company. He sat on the Reliance board from 1977, at about 20, and around 1980–81 left Stanford to help build Reliance's polyester yarn plant";
gl("First job").src = [1, 2, 14];
gl("Net worth").value = "$88.8 billion, #22 in the world (Forbes real-time list, 2 November 2026). It moves daily: Bloomberg's index had him at $77.3 billion, #24, a day earlier";
gl("Net worth").src = [0, 120];
b.portrait.caption = "Mukesh Ambani at a World Economic Forum event, 2007.";
b.photos[6].caption = "US Secretary of State Marco Rubio tours Reliance Industries' site in Jamnagar, Gujarat, October 2026.";

// ---- contact
b.contact.howToReach = "Mukesh Ambani has no public personal email and, as far as we could find, no personal social media account, so any profile in his name is probably not him and nothing here reaches him directly. Use the door that matches your reason. Shareholders write to the registrar KFin Technologies or to investor.relations@ril.com. Jio customers use Jio Care (198 or 199 from a Jio number, care@jio.com or the official WhatsApp 70007 70007), and companies pitching Jio use business@jio.com. NGOs, schools or community projects use the Reliance Foundation contact form. Other business proposals go to Reliance's corporate office at info@ril.com, not to his name, and do not expect a quick reply. Reliance publishes no general press email on its site and carries a Fraud Alert notice, so never pay anyone who offers a Reliance job, dealership or meeting with the Ambanis. Keep your message to five lines: who you are, the one specific thing you want, why it matters to that Reliance business, and one link.";
b.contact.channels.push(
  { kind: "email", label: "Jio enterprise and business enquiries", value: "business@jio.com", url: "mailto:business@jio.com", whose: "Reliance Jio Infocomm Limited", src: [8] },
  { kind: "email", label: "Jio Platforms investor relations", value: "jpl.investorrelations@jio.com", url: "mailto:jpl.investorrelations@jio.com", whose: "Jio Platforms Limited", src: [8] },
);

// ---- chapter 0
rep(0, 1, "text", "A journalist whose own father worked in Aden remembered him as junior gas-station staff at Besse, the biggest trading company in the colony.", "Years later he told a journalist, whose father had also worked at Besse, the largest firm in Aden, that he began as a small gas-station staff member. A short biography on Anil Ambani's Reliance Group site says he reached Aden in 1949, aged 17, as a dispatch clerk at A. Besse & Co, and later managed its oil-filling station at the port.");
src(0, 1, [16, 19, "rgbio"]);
rep(0, 3, "text", "Decades later, an interviewer asked him how long the family had lived there. His answer was short:", "Decades later, an interviewer asked how many years Dhirubhai did that Shell job. Mukesh's answer was short:");
set(0, 4, "text", "One of Asia's richest men was born abroad, to a petrol-pump worker.");
const t0 = B(0, 41).items[0];
t0.when = "To 1957–58"; t0.text = "Dhirubhai works in Aden, first at a trading firm, then with Shell, starting at a petrol pump. Mukesh dates the Shell job to 1954–57.";

// ---- chapter 1
set(1, 24, "text", "Sixteen or seventeen, and in charge during a raid. Pressure training started early.");

// ---- chapter 3 ventures
set(3, 3, "funding", "Reliance was already a listed company (its 1977 share sale was oversubscribed about seven times), so the money for projects like this came largely from the public: Mukesh has said Reliance raised money from the market until the middle of 1985 and again in 1989.");
src(3, 3, [14, 21]);
rep(3, 6, "text", "A big petrochemicals complex at Hazira in Gujarat came on stream around 1991–92, making the building blocks for polyester.", "A big plant at Hazira in Gujarat was commissioned in 1991, making Reliance one of the world's largest integrated producers of polyester.");
src(3, 6, [21]);
rep(3, 7, "howStarted", "The refinery started in 1999 with a capacity of 18 million tonnes of crude a year.", "The refinery was commissioned in July 1999 with a capacity of 27 million tonnes of crude a year.");
rep(3, 7, "funding", "(other reports put the whole project at about $6 billion)", "(Reuters called the whole complex a $6 billion project in 2006)");
rep(3, 7, "funding", "that would not be repaid for 100 years, paying 10.25% interest a year", "that ran for 100 years and yielded 10.25% a year");
rep(3, 7, "whatHappened", "Together they can process about 1.24 million barrels a day across more than 7,500 acres, with their own 2,880 MW power plant and ports.", "Reliance now gives the combined capacity as 1.4 million barrels a day at a single site, spread over more than 7,500 acres, with its own 2,880 MW power plant.");
src(3, 7, [26, 27, 2, "ogjjam", "mopng", "reutersjam"]);
src(3, 8, [26]);
rep(3, 8, "text", "the family planted about 102,000 mango trees on the land", "Forbes reported that Dhirubhai Ambani had 102,000 mango trees planted on the land");
rep(3, 8, "text", "Forbes said that was more than", "Forbes said that surpassed");
set(3, 9, "text", "A 100-year bond. Read that twice.");
set(3, 10, "funding", "Reliance said it had already invested Rs 11,000 crore by launch day, with Rs 25,000 crore planned. That cash came from a group built on polyester, petrochemicals and refining.");
rep(3, 10, "whatHappened", "After Jio's later price war, RCom stopped voice calls in 2017 and filed for bankruptcy in February 2019, with debt of about Rs 50,000 crore. Mukesh had no role in that decline.", "Under pressure from Jio's later price war, RCom stopped voice calls in December 2017 and went to the bankruptcy court in February 2019, with debt of about Rs 46,000 crore. Mukesh no longer ran it, though his Jio was part of the pressure.");
src(3, 10, [30, 31, 85, 32, 33, 75, 79, "btrcom"]);
set(3, 12, "idea", "Indian Petrochemicals Corporation Ltd (IPCL) was India's second largest petrochemicals company, partly owned by the government and a direct rival. Buying control would remove a competitor and add plants.");
set(3, 12, "decision", "When the government offered a 26% stake and management control in its 2002 privatisation drive, Reliance bid Rs 231 a share. Rival bids were Rs 128 and Rs 110.");
set(3, 12, "howStarted", "Reliance paid about Rs 1,491 crore for the 26%, took charge of the board and made an open offer to public shareholders, later reaching 46%.");
set(3, 12, "funding", "Frontline estimated the total cost at about Rs 2,641 crore including the open offer. Critics warned that the deal gave Reliance near-monopoly power in petrochemicals.");
set(3, 12, "whatHappened", "In the 2005 split IPCL went to Mukesh along with Reliance Industries. The two boards approved merging it into Reliance in March 2007.");
set(3, 12, "years", "2002–2007");
src(3, 12, ["pibipcl", "rilipcl", "frontlineipcl", 33]);
set(3, 13, "name", "KG-D6 D1 and D3 gas fields");
rep(3, 13, "funding", "(BP bought its 30% for about $7.2 billion)", "(BP's 30% came through a $7.2 billion deal in 2011 covering 23 Reliance blocks, not just this one)");
rep(3, 13, "whatHappened", "As of late 2025, the tribunal's award was still awaited.", "We found no report of an award by 2 November 2026. The block itself lives on: three newer fields started between 2020 and 2023 and averaged 24.8 mmscmd in April–June 2026.");
src(3, 13, [26, 55, "ogjbp", "etkg", "bpmj"]);
set(3, 15, "text", "Promised 80. Five years on, under 10. Forecasts are not facts.");
rep(3, 16, "howStarted", "RPL listed on the stock market in 2006 at Rs 60 a share.", "RPL's 2006 public issue raised about Rs 2,700 crore at Rs 60 a share and was oversubscribed over 50 times.");
src(3, 16, [26, 27, "etrpl", 160, 66]);
rep(3, 17, "whatHappened", "The 2010 targets were missed by years. But it kept going, bought brands such as Hamleys (2019, about 68 million pounds), Netmeds, Urban Ladder, Zivame, Just Dial and Metro Cash and Carry India, and in 2025–26", "The 2010 target was missed by years: turnover reached about $26.3 billion only in 2021–22. But it kept going, bought businesses such as Hamleys (2019, about 68 million pounds), Netmeds, Just Dial and Metro Cash and Carry India, and in 2025–26");
src(3, 17, [34, 35, 36, 37, 38, 46, 47, 71, "rilhamleys", "tcnetmeds", "btacq", "rilmetro"]);
set(3, 19, "funding", "Reliance's own money at first. In 2020 BP paid $1 billion for 49% of the fuel business, leaving Reliance 51% of the venture, called Jio-bp.");
set(3, 19, "whatHappened", "Jio-bp had 1,656 fuel outlets by September 2023 and has aimed for up to 5,500, still below the 6,000 Mukesh planned in 2006.");
src(3, 19, [26, "bpjio", "care"]);
src(3, 20, ["independent", 65]);
set(3, 21, "whatHappened", "Reliance raised its offer to about $13.5 billion in January 2010 and about $14.5 billion in February. In March LyondellBasell's board said no and filed its own restructuring plan, backed by Apollo, Ares and Len Blavatnik's Access Industries. Reliance then said it would not raise the bid again, saying market conditions did not justify it.");
src(3, 21, [53, 54, "chemanager"]);
rep(3, 22, "decision", "Reliance bought minority stakes in joint ventures", "Reliance bought stakes in joint ventures");
set(3, 22, "howStarted", "In 2010 it paid $1.7 billion for 40% of Atlas Energy's Marcellus acreage in Pennsylvania (later run by Chevron), $1.3 billion for 45% of Pioneer's Eagle Ford acreage in Texas and $392 million for 60% of a Marcellus venture with Carrizo. It also paid $46 million for 49.9% of an Eagle Ford pipeline venture, later putting in another $208 million.");
set(3, 22, "funding", "Reliance paid for the stakes and kept putting in more to run them: one report later put the total at $8.2 billion over the decade.");
rep(3, 22, "whatHappened", "But it sold the Marcellus assets bought for $392 million for $126 million in 2017", "But it sold the Carrizo stake bought for $392 million for $126 million in 2017");
src(3, 22, [52, 157, 159, "telegraphshale"]);
set(3, 26, "howStarted", "Reliance funded a trust, the Independent Media Trust, which channelled money into Network18 and TV18 in 2012, effectively worth Rs 4,000 crore to Network18. As part of the deal Network18 bought stakes in the ETV regional channels.");
set(3, 26, "funding", "Reliance Industries' money through the trust, of which it is the sole beneficiary.");
set(3, 26, "whatHappened", "In May 2014 Reliance said it would take control of Network18 and TV18, and founder Raghav Bahl quit as managing director. The trust completed the takeover in July 2014. Viacom18 later became the base for the much bigger Disney deal in 2024.");
src(3, 26, [68, "mintnw18", 69, "disney"]);
src(3, 27, [56, 57, 58, "bsaramco"]);
rep(3, 30, "whatHappened", "told Future to put the deal on hold in October 2020", "told Future to put the deal on hold in 2020");
src(3, 30, [59, 60, "toifuture", "weekfuture"]);
rep(3, 31, "whatHappened", "By the August 2025 AGM his son Anant described the Jamnagar site as the world's largest new-energy complex, still being built.", "By the August 2025 AGM the Jamnagar site was being billed as the world's largest such complex, still being built, and his son Anant was presenting it to shareholders.");
src(3, 31, [61, 62, "reutersfaradion", 63, 0]);
rep(3, 31, "howStarted", "both in 2021", "both announced in 2021");
set(3, 32, "funding", "Reliance's own cash.");
src(3, 32, ["blcampa"]);
set(3, 33, "howStarted", "It was demerged in July 2023, taking cash and investments from Reliance, and agreed a 50:50 asset-management joint venture with the US fund giant BlackRock.");
src(3, 33, [70, "bse", "blackrock", 0]);
src(3, 34, [64, 65, "disney", "reutersdisney"]);
rep(3, 34, "whatHappened", "so Reliance controls about 63%", "so Reliance and its affiliates hold about 63%");

// ---- chapter 4
src(4, 0, [14]);
src(4, 4, [21]);
rep(4, 6, "text", "a $100 million bond in the US that will only be repaid after 100 years, paying 10.25% a year", "a $100 million, 100-year bond in the US, yielding 10.25% a year");
const f = B(4, 10).items[1];
f.value = "27 mt a year"; f.label = "Jamnagar's crude capacity when commissioned, July 1999"; f.src = [S("ogjjam"), S("mopng")];
rep(4, 14, "text", "The same year, Reliance took control of the state-owned rival IPCL.", "In 2002 Reliance also took control of the state-backed rival IPCL.");
src(4, 14, [0, 30, 31, "pibipcl"]);
rep(4, 16, "text", "The group was then worth about $23 billion in revenue, equal to more than 3% of India's economy.", "The group then had about $23 billion in revenue, equal to more than 3% of India's economy.");
itemSrc(4, 19, 0, [21]);
B(4, 19).items[2].when = "1991"; B(4, 19).items[2].text = "Hazira plant commissioned."; itemSrc(4, 19, 2, [21]);

// ---- chapter 5
rep(5, 1, "text", "Together the two refineries can now handle about 1.24 million barrels a day, among the largest refining sites in the world.", "Reliance now gives their combined capacity as 1.4 million barrels a day, at what it calls the refining hub of the world.");
src(5, 1, [27, 2, "mopng"]);
src(5, 3, [35, 36, "bbcup"]);
set(5, 4, "text", "Reliance pulled back across the state. Business Today reported in December 2007 that it had shut all 44 Fresh outlets there and put 158 leased properties on hold, with close to Rs 3,000 crore already sunk into back-end systems. Another report put job cuts near 1,000. Vendors had already vandalised stores in Ranchi that May. __It was a lesson that being big does not make you welcome.__ Reliance kept retail going elsewhere and quietly rebuilt over the next decade.");
src(5, 4, [37, 38, "rediffranchi"]);
rep(5, 7, "text", "BP later paid about $7.2 billion for a 30% share.", "In 2011 BP agreed to pay $7.2 billion for 30% of 23 Reliance blocks, this one included.");
src(5, 7, [26, 55, "ogjbp"]);
set(5, 9, "text", "Reliance says the problem was unexpected sand and water, not mistakes, and that government officials sat on the committee that approved every dollar. The government says Reliance drilled far fewer wells than promised. In the arbitration it now seeks more than $30 billion, according to one report based on unnamed sources. Hearings ended in November 2025, and we found no report of an award by 2 November 2026. Newer fields in the same block have since kept the gas flowing, at about 25 million cubic metres a day in mid-2026.");
src(5, 9, [55, "etkg"]);
rep(5, 17, "text", "while a part involving Reliance itself remained before the court.", "while a part involving Reliance itself remained before the court. The final result for Reliance came in May 2026, and we tell it in What Not to Copy.");
src(5, 16, [160, 161]);
set(5, 18, "text", "Cleared personally, after 17 years. Legal fights are slow and costly.");
rep(5, 21, "text", "It renamed Infotel as Reliance Jio Infocomm in 2013, switched its own staff onto the network in December 2015, and kept pouring in money from Jamnagar and from loans.", "It renamed Infotel as Reliance Jio Infocomm, unveiled the service to its own staff in December 2015, and kept pouring in money.");
src(5, 21, ["btjio", "scroll", 43]);

// ---- chapter 6
rep(6, 0, "text", "Commercial service began days later.", "Commercial service began on 5 September.");
rep(6, 0, "text", "In the first month about 16 million people signed up.", "In its first month Jio claimed about 16 million subscribers, though many were probably second SIMs.");
src(6, 0, [41, "bsjio16"]);
src(6, 1, [41, "bs50"]);
src(6, 6, [75, 79]);
src(6, 12, [44, "rilfb"]);
rep(6, 13, "text", "It was India's largest ever.", "Reliance said it was India's biggest ever.");
src(6, 13, [44, 84]);
rep(6, 23, "text", "and in 2025 the US cited India's Russian oil purchases when it put an extra 25% tariff on Indian goods.", "and in 2025 the US cited India's Russian oil purchases when it put an extra 25% tariff on Indian goods. Then the US sanctioned Rosneft, and on 20 November 2025 Reliance stopped Russian crude for its export refinery. In January 2026 the research group found Jamnagar received no seaborne Russian oil at all.");
src(6, 23, [72, "hindurussia", "blcrea"]);
set(6, 24, "text", "Cheap crude is a great margin, until geopolitics takes it away.");
rep(6, 27, "text", "On 28 October 2026 the shares opened at Rs 1,358, 21.36% above the issue price.", "On 28 October 2026 the shares opened at Rs 1,358, 21.36% above the issue price, and closed the day at Rs 1,417.50.");
src(6, 27, [49, 50, "afp"]);
const f28 = B(6, 28).items[2];
f28.label = "Jio Platforms market value at the open, about $131bn; about $137bn by the close (28 Oct 2026)"; f28.src = [49, 50, S("afp")];
set(6, 29, "text", "Here is the wow detail. By the end of listing day Jio Platforms alone was worth about $137 billion, which made it India's second most valuable company. Only its own parent, Reliance Industries, was bigger. At the opening prices Jio was worth more than three-quarters of Reliance's value, about Rs 12.5 lakh crore against Rs 16.19 lakh crore. Reliance only bought its way into this business in 2010.");
src(6, 29, [49, "afp"]);
set(6, 30, "text", "Bought in 2010. Worth about $137 billion by its first close.");
set(6, 32, "text", "Mukesh's wealth is mostly his family's controlling stake in Reliance Industries, where promoter entities control just over half. When Forbes profiled him in 2006, he was 49 and worth about $8.5 billion. On 2 November 2026, Forbes' real-time list put him at $88.8 billion, the 22nd richest person in the world.");
src(6, 32, [119, 174, 26, 0]);

// ---- chapter 7
set(7, 6, "text", "In 2013 the Times of India reported that he was not on the board and held ==no formal designation==, yet called the shots on retail and telecom. He was a director at Reliance Retail and Jio by 2020, and Bloomberg reported that a meeting with him often signalled final approval on a deal. In a rare public talk, he played it all down.");
src(7, 6, [89, 90]);
rep(7, 32, "text", " Modi could be rough too: The Economic Times described him dealing with vendors “often in an aggressive language” and growling at anyone who crossed the boss.", "");
src(7, 32, [97, 92]);

// ---- chapter 9
rep(9, 12, "text", "as an outright payment and not a loan, though Reuters said the nature of the backing was unclear.", "as an outright payment and not a loan, though the company's own statement gave no details of the help.");
src(9, 12, [110, 111]);
rep(9, 25, "text", "though Bloomberg's wealth index lists his Mumbai residential property at just ==$410 million==", "though Bloomberg's wealth index values his Mumbai home far lower, at about ==$410 million==");
rep(9, 27, "text", "or under 0.1% of a fortune of about $80 billion today", "or under 0.1% of a fortune of $80 billion or so today");
src(9, 28, [23, 124, 21]);

// ---- chapter 10
rep(10, 11, "text", "Then they asked why he had not moved in, and the New York Times reported that he and his spokesman declined to discuss it.", "Then they asked why he had not moved in. In 2011 the New York Times reported that the family hosted guests there but went back to Sea Wind afterwards.");
rep(10, 15, "text", "Critics, including Delhi Chief Minister Arvind Kejriwal, attacked the campaign sharply.", "The ads became a political row.");
rep(10, 16, "text", "and Reuters reported posters welcoming the Prime Minister lining the road to the venue of Anant's 2024 wedding", "and in 2024 a Reuters headline said the family's wedding spectacle had got political with Modi posters");
set(10, 12, "text", B(10, 12).text);
B(10, 24).items[3].text = "Tells the story of “the internet in our house sucks” to London's business elite.";

// ---- chapter 11
rep(11, 7, "text", "Within months, thousands of vegetable sellers vandalised three Reliance Fresh stores in eastern India.", "That May, petty traders and vegetable vendors vandalised three Reliance Fresh stores in Ranchi. PTI counted around 200 people, and AFP said thousands.");
src(11, 7, [105, "rediffranchi", 36]);
rep(11, 8, "text", "Goenka has noted many professionals coming and going. ", "Goenka has noted many professionals coming and going. ");
rep(11, 12, "text", "The ministry raised a ==$2.81 billion== demand, which Reliance calls unsustainable.", "The ministry raised a ==$2.81 billion== demand, which Reliance is contesting.");
src(11, 12, [154, 155]);
rep(11, 15, "text", "By 2016 it had put in about ==$8.2 billion== across its ventures.", "One report says it put about ==$8.2 billion== into these assets over the decade.");
rep(11, 15, "text", "and Reliance took a Rs 3,261 crore impairment.", "and Reliance had already taken a Rs 3,261 crore impairment charge on shale in 2015–16.");
src(11, 15, [157, "bs126", "telegraphshale", 159]);
rep(11, 16, "text", "No public number gives a total loss, so we will not invent one.", "One report put the shale arms' impairments at Rs 15,691 crore, but no public number gives a total loss, so we will not invent one.");
src(11, 16, [52, 159, "telegraphshale", 91]);
src(11, 18, [160, 161, 168]);
rep(11, 22, "text", "and Reuters sources said valuation was the sticking point as the world moved away from fossil fuels.", "and a Reuters report cited sources saying valuation was a sticking point.");
src(11, 22, [58, 169, 170]);
src(11, 27, [43, 96]);

// ---- chapter 12
rep(12, 0, "text", "Before walking up to speak, Akash, the 35-year-old managing director of Jio Platforms, touches his parents' feet.", "Before walking up to speak, Akash, the managing director of Jio Platforms, touches his parents' feet.");
set(12, 1, "text", "Isha reminded the room that Reliance's 1977 IPO raised Rs 2.82 crore. Jio's raised around ==Rs 30,213 crore==, the largest in India's history. Akash said the issue filled in 95 minutes and drew over Rs 7.5 lakh crore of demand. Shares offered at Rs 1,119 closed the first day at Rs 1,417.50, and Jio became India's second most valuable listed company, behind only its parent.");
src(12, 1, [139, 178, 87, "afp", "rediffpti"]);
src(12, 0, [87, 178, "rediffpti"]);
set(12, 16, "text", "On 2 November 2026 Forbes' real-time list put him at ==$88.8 billion, ranked 22nd in the world,== after a one-day swing of about $8.5 billion. A day earlier Bloomberg had him at $77.3 billion and 24th, down about $27 billion from a year ago. The numbers jump around: on the morning after the listing, Forbes showed him at $79.9 billion and among the day's biggest wealth losers. The Forbes India list, published in late September and counting family fortunes, placed Gautam Adani's family first at $112.7 billion and his second at $86.3 billion.");
rep(12, 17, "text", "Why does a record IPO not make him richer overnight?", "Why does a record IPO not simply make him richer overnight?");
rep(12, 21, "text", "The gas disputes are unresolved.", "The gas disputes are unresolved.");

// ---- runs too close to a source's wording
rep(0, 31, "text", "Either one drink and one snack, or two snacks and no drink.", "Either a drink and a snack, or two snacks and nothing to drink.");
rep(7, 8, "text", "who sold a stake in his cargo airline to Reliance in 2010", "whose cargo airline took on Reliance as a shareholder in 2010");
rep(8, 3, "text", "what is the most critical need for India's development, and how can it be met at scale over a long arc of time?", "which need matters most for India's development, and how can it be served at scale over many years?");

// ---- remove non-free photos (highest index first)
b.chapters[0].blocks.splice(12, 1); // GODL-India stamp
b.chapters[0].blocks.splice(2, 1); // "no known restrictions" Flickr Commons image, not a free licence
const coop = b.chapters[0].blocks.find((x) => x.t === "photo" && /Cooperage/.test(x.photo.caption));
coop.photo.caption = "The Cooperage football ground in south Mumbai. As a boy, Mukesh was taken to watch matches here.";
coop.photo.year = null;

// ---- fact check notes
b.factCheck.disputed = JSON.parse(fs.readFileSync(dir + "disputed.json", "utf8"));
b.factCheck.method = fs.readFileSync(dir + "method.txt", "utf8").trim();

// ---- prune unused sources and renumber
const used = new Set();
walkSrc((a) => { a.forEach((i) => used.add(i)); return a; });
const map = {};
const kept = [];
b.sources.forEach((s, i) => { if (used.has(i)) { map[i] = kept.length; kept.push(s); } });
walkSrc((a) => a.map((i) => map[i]));
b.sources = kept;
delete b.verifiedAt;
fs.writeFileSync(bookPath, JSON.stringify(b, null, 2));
console.log("sources", kept.length);
const long = [];
b.chapters.forEach((c, ci) => c.blocks.forEach((x, i) => { if (x.t === "note" && x.text.trim().split(/\s+/).length > 14) long.push(`${ci}.${i} ${x.text}`); }));
console.log("long notes", long);
