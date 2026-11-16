import fs from "node:fs";
const path = process.argv[2];
const b = JSON.parse(fs.readFileSync(path, "utf8"));

function walk(o, fn) {
  if (Array.isArray(o)) { o.forEach((v, i) => { if (typeof v === "string") { const r = fn(v); if (r !== v) o[i] = r; } else walk(v, fn); }); }
  else if (o && typeof o === "object") { for (const k of Object.keys(o)) { const v = o[k]; if (typeof v === "string") { const r = fn(v); if (r !== v) o[k] = r; } else walk(v, fn); } }
}
const errs = [];
function R(old, nw) { // replace in book, excluding factCheck and sources
  let n = 0;
  const f = (s) => { if (s.includes(old)) { n++; return s.split(old).join(nw); } return s; };
  for (const k of Object.keys(b)) { if (k === "factCheck" || k === "sources") continue; if (typeof b[k] === "string") b[k] = f(b[k]); else walk(b[k], f); }
  if (!n) errs.push("NO MATCH: " + old.slice(0, 80));
}
const ch = (id) => b.chapters.find((c) => c.id === id);
function D(id, start) { // delete a block by its text start
  const c = ch(id); const i = c.blocks.findIndex((x) => (x.text || "").startsWith(start));
  if (i < 0) return errs.push("DEL NO MATCH: " + start.slice(0, 70));
  c.blocks.splice(i, 1);
}
function S(label, url) { const j = b.sources.findIndex((s) => s.url === url); if (j >= 0) return j; b.sources.push({ label, url }); return b.sources.length - 1; }
function A(snippet, ...idx) { // append citations to the block or item containing snippet
  let n = 0;
  const hit = (x) => { x.src = [...new Set([...(x.src || []), ...idx])]; n++; };
  for (const c of b.chapters) for (const x of c.blocks) {
    if (x.t === "facts" || x.t === "timeline") { for (const it of x.items) if (JSON.stringify(it).includes(snippet)) hit(it); }
    else if (x.src && JSON.stringify(x).includes(snippet)) hit(x);
  }
  if (!n) errs.push("CITE NO MATCH: " + snippet.slice(0, 70));
}
function dropCite(snippet, ...idx) {
  let n = 0;
  for (const c of b.chapters) for (const x of c.blocks) if (x.src && JSON.stringify(x).includes(snippet)) { x.src = x.src.filter((i) => !idx.includes(i)); n++; }
  if (!n) errs.push("DROP NO MATCH: " + snippet.slice(0, 70));
}

// ---------- new sources
const sDM = S("Demis Hassabis, DeepMind blog, \"From unlikely start-up to major scientific organisation\" (5 Dec 2019)", "https://deepmind.google/blog/from-unlikely-start-up-to-major-scientific-organisation-entering-our-tenth-year-at-deepmind/");
const sBI = S("Business Insider, Kif Leswing, quoting Bloomberg Businessweek on Page's Zee.Aero floor (9 Jun 2016)", "https://www.businessinsider.com/google-founder-larry-page-built-man-cave-in-secret-startup-zeeaero-office-2016-6");
const sSlate = S("Slate, Jacob Brogan, on Bloomberg's Zee.Aero report (9 Jun 2016)", "https://slate.com/technology/2016/06/larry-page-funded-flying-car-startup-according-to-bloomberg-report.html");
const sVerge = S("The Verge, Jon Porter, on the $7.5 million Google+ settlement (7 Aug 2020)", "https://www.theverge.com/2020/8/7/21358338/google-plus-security-lapse-settlement-12-dollars-exposed-data");
const sR350 = S("Reuters, Jonathan Stempel, \"Google to pay $350 million to settle shareholders' data privacy lawsuit\" (6 Feb 2024)", "https://www.reuters.com/legal/google-pay-350-million-revolve-shareholders-data-privacy-lawsuit-2024-02-06/");
const sFort = S("Fortune, Beatrice Nolan, on Amazon's and Google's Anthropic stakes (4 Jun 2026)", "https://fortune.com/2026/06/04/amazon-google-billions-anthropic-ipo/");
const sR40 = S("Reuters, \"Google to invest up to $40 billion in AI rival Anthropic\" (24 Apr 2026)", "https://www.reuters.com/business/google-plans-invest-up-40-billion-anthropic-bloomberg-news-reports-2026-04-24/");
const sWay = S("Waymo blog, \"Waymo raises $16 billion investment round\" (2 Feb 2026)", "https://waymo.com/blog/2026/02/waymo-raises-usd16-billion-investment-round");
const sLoon = S("Reuters via MarketScreener, \"Alphabet shuts internet balloon company\" (21 Jan 2021)", "https://uk.marketscreener.com/news/latest/Alphabet-shuts-internet-balloon-company-32256334");
const sFcl = S("Forbes Chile, Spanish edition of Forbes' 2024 Philanthropy Score report (1 Oct 2024)", "https://forbes.cl/lista-forbes/2024-10-01/forbes-philanthropy-score-2024-que-tan-caritativas-son-las-personas-mas-ricas-de-ee-uu");

// ---------- source metadata
b.sources[3].label = "Forbes: Larry Page real-time profile (viewed 2 Nov 2026)";
b.sources[6].url = "https://about.google/company-info/our-story/";
b.sources[7].url = "https://blog.google/image-library/";
b.sources[7].label = "Google, The Keyword: images and press contact page";
b.sources[8].url = "https://about.google/company-info/contact-google/";
b.sources[27].label += " (paywalled; details also confirmed through Business Insider and Slate)";

// ---------- front matter
R("a midnight idea and a borrowed garage", "a midnight idea and a rented garage");
R("speaking at the European Parliament on 17 June 2009", "at the European Parliament on 17 June 2009");
R("About $238.1 billion, No. 4 in the world (Forbes real-time, 29 October 2026). Source of wealth: Google.", "About $235 billion, No. 3 in the world (Forbes real-time, 2 November 2026). Source of wealth: Google.");
const lives = b.glance.find((g) => g.label === "Lives in");
lives.value = "Miami, Florida, USA, according to Forbes. In late 2025 his family office and several holding companies left California and re-registered in Delaware.";
lives.src = [3, 10, 107];
b.contact.howToReach = "Larry Page almost never gives interviews, and we found no verified personal social media account, so treat any profile or message in his name that promises money, jobs or investment as fake. The only official route that can reach him by name is Alphabet's board mailbox, directors@abc.xyz: Alphabet's 2026 proxy statement says shareholders with genuine questions about Alphabet can write there and ask for the note to be forwarded to a specific director. Journalists should use press@google.com (Google says only press get a reply), and shareholders should use Alphabet Investor Relations; none of these inboxes is for startup pitches, fan mail or job requests. If you are a shareholder and do write, keep it to five lines: who you are, one specific question about Alphabet, and why it matters, with no attachments and no request for money. Do not expect a personal reply.";
const cg = b.contact.channels.find((c) => c.label === "Contact Google page");
cg.value = "about.google/company-info/contact-google";
cg.url = "https://about.google/company-info/contact-google/";

// ---------- origins
R(" He also had lots of ideas about what could be built and how. Before long he had built an electric go-kart.", " He also had lots of ideas about what could be built and how.");
for (const x of ch("origins").blocks) if (x.t === "timeline") { const it = x.items.find((i) => i.when === "1930s"); it.when = "Before Larry"; it.text = "Grandfather works on the Chevy assembly line in Flint and carries an “Alley Oop” hammer, the kind workers made during the sit-down strikes."; }
R("Strikers at the Fisher Body Plant No. 3 during the 1937 Flint sit-down strike.", "Protesters watching the entrance of Fisher Body Plant No. 3 in Flint, Michigan, in 1937.");

// ---------- every-company
R("The Flyer appeared in 2017 and could carry one person up to about 20 miles.", "A demo video came out in 2017, and the Flyer shown in 2018 could carry one person up to about 20 miles.");
A("His own fortune. Bloomberg reported he had spent over $100 million", sBI, sSlate);
R("In February 2026 Waymo raised $16 billion at a value of $126 billion.", "In February 2026 Waymo raised $16 billion at a value of $126 billion, the biggest number in this whole list of moonshots.");
A("Waymo raised $16 billion", sWay);
A("The Information reported that Page had ordered the team cut in half", 230);
A("Each balloon cost tens of thousands of dollars", sLoon);
R("Google patched it in March 2018 and did not report it publicly until October. Consumer Google+ was wound down in 2019, and a user lawsuit settled for $7.5 million.", "Google patched it in March 2018 and did not report it publicly until October. A second bug, disclosed that December, touched up to 52.5 million users. Consumer Google+ was wound down in 2019. A user lawsuit settled for $7.5 million, with Google denying wrongdoing, and in 2024 Google agreed to pay $350 million to settle a shareholder suit over the delay in disclosing the bug.");
A("A second bug, disclosed that December", 226, sVerge, sR350);
R("Founded in London in 2012 by Hassabis, Shane Legg and Mustafa Suleyman. Google bought it about two years later, when few outsiders had heard of it.", "Founded in London in 2010 by Hassabis, Shane Legg and Mustafa Suleyman. Google bought it in January 2014, when few outsiders had heard of it.");
A("Founded in London in 2010 by Hassabis", sDM);
R("But the bets stayed costly: in 2025 Other Bets made $1.54 billion in revenue and lost $16.8 billion. That was under 0.5% of Alphabet's sales.", "But the bets stayed costly: in 2025 Other Bets brought in $1.54 billion, under 0.5% of Alphabet's sales, and lost $7.5 billion.");
A("lost $7.5 billion", 1);
for (const x of ch("every-company").blocks) if (x.t === "facts") for (const it of x.items) if (it.value === "$16.8B") { it.value = "$7.5B"; it.src = [1]; }

// ---------- first-money
R("Excite no longer exists. Google still does.", "CNBC now calls Excite “now-defunct”. Google is still here.");
R("One day in July 2001, aged 28, he decided that all of Google's project managers had to go. He thought a layer of non-engineers was slowing down the brilliant people he had hired. He also suspected they were steering engineers away from projects he cared about, like scanning the world's books.", "One day in July 2001, aged 28, he decided that all of Google's project managers had to go, and he announced it in front of about 130 engineers. Google's HR head, Stacy Sullivan, told him the plan was nuts. So did Eric Schmidt and his coach, Bill Campbell.");
D("first-money", "Business Insider's account says Google's HR head");
R("It did not last. More than 100 people ended up reporting to one overwhelmed head of engineering. Google's managers were moved or rehired, and the founders quietly gave up on the idea. It is a story of a smart person being badly wrong, and __the most useful thing about it is that he reversed it.__", "It did not last, and the founders quietly gave up on the idea. The full scene is in the chapter on how he runs things. It is a story of a smart person being badly wrong, and __the most useful thing about it is that he reversed it.__");
R("There was also an inquiry into shares and options it had issued to employees without registering them. It ended up buying back almost 23 million options.", "There was also an inquiry into shares and options it had issued to employees without registering them. After the IPO it began buying back 23.4 million of those shares, along with options, a repurchase its filing put at up to $25.9 million.");
A("began buying back 23.4 million", 39);

// ---------- big bets
R("In March 2014 each shareholder received one new Class C share for each share they held.", "Everyone holding shares on 27 March 2014 received one new Class C share for each share they held.");

// ---------- fortune
ch("the-fortune").title = "About $235 Billion, on Paper";
R("Forbes estimated his net worth at ==$232.7 billion== on 1 November 2026, third in the world.", "Forbes's real-time list put his net worth at about ==$235 billion== on 2 November 2026, third in the world.");
R("That is about $220 billion, out of Forbes's $232.7 billion.", "That is about $220 billion, out of Forbes's roughly $235 billion.");
for (const x of ch("the-fortune").blocks) if (x.t === "timeline") { const it = x.items.find((i) => i.when === "1 Nov 2026"); it.when = "2 Nov 2026"; it.text = "About $235 billion, third in the world (Forbes)."; }
R("He went from $301.7 billion to $232.7 billion in about three and a half months without doing anything.", "He went from about $301.7 billion in mid-July to about $235 billion in early November without doing anything.");
R("So he must own at least another 389 million or so Class C shares.", "So he should own at least another 389 million or so Class C shares. That is our inference, because the filing does not list them.");
R("Google can still appeal. The EU also fined", "Google says it will appeal. The EU also fined");
A("Google says it will appeal. The EU also fined", 202);
R("In 2023 Google put an initial $300 million into the AI company Anthropic, later growing that to $13.3 billion, with up to $30 billion more committed.", "In 2023 Google put an initial $300 million into the AI company Anthropic. By 2026 it had put in far more, with $10 billion more in April 2026 and up to $30 billion to follow if Anthropic hits its targets.");
A("In 2023 Google put an initial $300 million", sFort, sR40);
R("Alphabet booked $98 billion of net gains in that quarter, mainly from unrealised rises in shares it holds.", "Alphabet booked about $99 billion of gains on its investments in that quarter, much of it unrealised, meaning the shares had risen in value but had not been sold.");
A("about $99 billion of gains", 163);
R("The vote is on 3 November 2026, the day after this page was checked, and a late-October poll showed the measure trailing. We do not know the result.", "The vote is on 3 November 2026, the day this page was finished, and a late-October poll showed the measure trailing, with half of likely voters against and 42% in favour. We do not yet know the result.");

// ---------- how they work
const hw = ch("how-they-work");
const i80 = hw.blocks.findIndex((x) => (x.text || "").startsWith("When he took the CEO job back in 2011"));
hw.blocks[i80].text = "When he took the CEO job back in 2011, Bloomberg Businessweek reported, he treated it like an engineering puzzle. He worked ==80-hour weeks==, read business leadership books by the pile, and studied people he admired, such as the coach Bill Campbell and the investor Warren Buffett.";
hw.blocks[i80].src = [180];
hw.blocks.splice(i80 + 1, 0, { t: "p", text: "By 2014 Fortune found him going to meetings with only his phone, no laptop. He did this on purpose. He wanted to feel what users felt as the world moved to mobile, and he asked engineers to try a phone-only day each week too.", src: [181] });
R("Sundar Pichai interviewed at Google on 1 April 2004, just after Page had stopped personally interviewing candidates.", "Sundar Pichai joined Google in 2004, just after Page had stopped personally interviewing candidates.");
R("When Veach pointed out that not all countries use credit cards, Page suggested that in Uzbekistan Google could take payment in goats. Veach gently suggested starting with Visa and MasterCard.", "The goats in Uzbekistan were one of those ideas. Veach gently suggested starting with Visa and MasterCard.");
D("how-they-work", "Boss has a weird idea? Test it before you laugh.");

// ---------- mindset
D("mindset", "Even if you fail at your ambitious thing, it's very hard to fail completely.");
R("A whispered argument by a fire pit ended a decade-long friendship.", "A whispered fire-pit argument helped end a decade-long friendship.");
R("We only have Musk's side and other people's memories of that night; we found no public account from Page.", "We only have Musk's side and other people's memories of that night; we found no public account from Page. Isaacson's biography dates the same clash to 2013, and we follow the Times here.");
A("Isaacson's biography dates the same clash", 95);

// ---------- personal life: Forbes reprint
A("Forbes gives him a philanthropy score of 1", sFcl);
A("To be fair, Forbes itself warned", sFcl);

// ---------- brand: drop repeated quotes
D("the-brand", "Google is not a conventional company. We do not intend to become one.");
D("the-brand", "offering advice and love, but not daily nagging!");

// ---------- what went wrong
R("Neronha said he had no plans to charge Page or other executives, though he said they were not off limits. Wired reported", "Wired reported");
dropCite("Wired reported that Google denied the allegation", 233);
A("Be careful with that quote.", 233);
R("Bloomberg's report also noted that his health might have played a part in his retreat, without saying it was the reason for that day. Either way, __an empty chair becomes the only story when you are the one missing.__ Your critics will happily speak for you.", "__An empty chair becomes the only story when you are the one missing.__ Your critics will happily speak for you.");
D("what-went-wrong", "Google is a monopolist, and it has acted as one to maintain its monopoly");

// ---------- today
R("A $68 billion wobble", "A $66 billion wobble");
for (const x of ch("today").blocks) if (x.t === "facts") for (const it of x.items) if (it.value === "$232.7B") { it.value = "About $235B"; it.label = "Forbes net worth, 2 November 2026: No. 3 in the world"; }
R("By mid-October Forbes had him around $288 billion. Then on 29 October", "On 20 October Fortune put him at $292 billion. Then on 29 October");
A("On 20 October Fortune put him at $292 billion", 255);
dropCite("On 20 October Fortune put him at $292 billion", 249);
D("today", "$31 billion gone in one morning. He was still No. 3.");
R("California voters decide on 3 November 2026, the day after this chapter was checked, so look up the result.", "California voters decide on 3 November 2026, the day this chapter was finished, so look up the result.");

// ---------- factCheck
b.factCheck.method = "Four writers researched this book in parallel, one on the profile and contact card and three on the chapters, working from filings, court papers, Page's own speeches and letters, and established press. An independent fact-checker then re-read the book against sources it opened itself: it downloaded about 200 source pages, machine-matched every quotation against the cited text, checked the numbers against the SEC filings, read the contact details in the filings and on Google's pages, and confirmed every photo's author and licence through the Commons API, correcting or removing what failed (for example the Other Bets loss, which now follows the 10-K rather than a press figure). Some sites block automated readers, including Reuters, NYT, Bloomberg, Forbes articles, FT, AP and Ars Technica, so those pages were read through a search tool's page reader, often only the opening section; details further down were accepted only where a second source confirmed them, and anything left unconfirmed was removed. Forbes figures move daily and are dated, and California's 3 November 2026 vote on Proposition 40 had no result when this check closed.";
const d = b.factCheck.disputed;
const del = (start) => { const i = d.findIndex((x) => x.claim.startsWith(start)); if (i < 0) errs.push("DISPUTE NO MATCH " + start); else d.splice(i, 1); };
del("Page's Forbes rank on 29 Oct 2026");
const nw = d.find((x) => x.claim === "Page's net worth and rank");
nw.note = "Forbes figures move daily: $300.9B (late April 2026), $301.7B (15 July, per Business Today citing Forbes), $292B per Fortune (20 Oct), a $31B fall on 29 Oct, No. 4 that morning, No. 3 by 30 Oct, $232.7B on 1 Nov, and between $234.9B and $235.5B when we viewed the profile on 2 Nov. We use about $235B and No. 3, dated 2 Nov.";
d.push({ claim: "Other Bets' 2025 operating loss", note: "CNBC (March 2026) reported $16.8 billion. Alphabet's 2025 Form 10-K says $7.5 billion, including a $2.1 billion compensation charge. We use the 10-K." });
d.push({ claim: "When DeepMind was founded", note: "Reuters in 2014 said 2012, citing the company's website. Demis Hassabis himself wrote in 2019 that he founded it in 2010, and DeepMind's own history page says the same. We use 2010." });
d.push({ claim: "Alphabet's investment gains in Q2 2026", note: "Fortune and MediaPost report $99 billion of realised and unrealised equity gains, adding $77.1 billion after tax. Value Add Pulse puts the combined paper gain from SpaceX and Anthropic at about $98 billion. We use about $99 billion." });
d.push({ claim: "Value of Alphabet's Anthropic stake", note: "Value Add Pulse relays Bloomberg's figure of about $124 billion for about 14%. Fortune (June 2026) worked out about $135 billion at a $965 billion valuation. The stake is private, so both are estimates; the text gives Bloomberg's." });

if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
fs.writeFileSync(path, JSON.stringify(b, null, 2) + "\n");
console.log("ok; sources", b.sources.length);
