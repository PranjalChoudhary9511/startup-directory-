import fs from "node:fs";
const P = process.argv[2];
const b = JSON.parse(fs.readFileSync(P, "utf8"));
const add = (label, url) => { b.sources.push({ label, url }); return b.sources.length - 1; };
const need = (s, sub) => { if (!s.includes(sub)) throw new Error("missing: " + sub + " IN " + s.slice(0, 120)); };
const B = (c, i) => b.chapters[c].blocks[i];
const setT = (c, i, must, text, src) => { const x = B(c, i); need(x.text, must); x.text = text; if (src) x.src = src; };
const sub = (x, field, from, to) => { need(x[field], from); x[field] = x[field].replace(from, to); };

// sources
b.sources[40] = { label: "NDTV / ANI: Father's trading through verbal commitment my initial lesson on trust (9 Jan 2023)", url: "https://www.ndtv.com/india-news/father-trading-through-verbal-commitment-my-initial-lesson-on-trust-gautam-adani-3675604" };
const ET = add("The Economic Times Panache: Gautam Adani dropped out of college in 1978, regrets not completing college (9 Jan 2023)", "https://economictimes.indiatimes.com/magazines/panache/gautam-adani-dropped-out-of-college-in-1978-to-start-his-phenomenal-career-but-regrets-not-completing-college-education/articleshow/96859920.cms");
const REVOI = add("Revoi: text of Gautam Adani's Palanpur Vidyamandir speech, in Gujarati and English (9 Jan 2023)", "https://www.revoi.in/renowned-industrialist-gautam-adani-visited-his-hometown-palanpur-relived-old-memories/");
const HUM = add("Hum Dekhenge News (Gujarati): report of Gautam Adani's Palanpur speech (9 Jan 2023)", "https://humdekhenge.in/banaskantha-has-a-great-contribution-in-my-formation-gautam-adani/");
const MLEX = add("MLex, Samuel Rubenfeld: No reason to force dismissals in Adani corruption case, US judge says (2 Nov 2026)", "https://www.mlex.com/mlex/articles/2545323/no-reason-to-force-dismissals-in-adani-corruption-case-us-judge-says");

// hook and glance
need(b.hook, "He was freed the next day.");
b.hook = b.hook.replace("gunmen seized Gautam Adani at gunpoint as he drove away from a club in Ahmedabad. He was freed the next day.", "gunmen seized Gautam Adani as he drove away from a club in Ahmedabad. By his own account he was freed the next day.");
need(b.hook, "By his own account");
b.hookSrc = [168, 169, 9, 10];
const gl = Object.fromEntries(b.glance.map((g) => [g.label, g]));
gl["Grew up"].value = "The dry north of Gujarat in Banaskantha: Tharad, then Deesa from age 6 to 11, then Ahmedabad for four years of secondary school";
gl["Grew up"].src = [REVOI, HUM, 4];
need(gl["Source of wealth"].value, "Forbes put him at ==$112.7 billion== on 30 September 2026, as India's richest.");
gl["Source of wealth"].value = gl["Source of wealth"].value.replace("Forbes put him at ==$112.7 billion== on 30 September 2026, as India's richest.", "Forbes's 2026 India list, published on 30 September, put him and his family first at ==$112.7 billion==.");
gl["Source of wealth"].src = [0, 210, 11, 12];
need(gl["Known for"].value, "which the group denied and which India's regulator said in 2025 could not be established");
gl["Known for"].value = gl["Known for"].value.replace("which the group denied and which India's regulator said in 2025 could not be established", "which the group denied, and two of which India's regulator ruled not established in 2025");

// contact
need(b.contact.howToReach, "where the group warns it never asks candidates for money");
b.contact.howToReach = b.contact.howToReach.replace("where the group warns it never asks candidates for money", "where the group warns of fake recruiters who ask candidates to pay");

// chapter 0
const c0 = b.chapters[0].blocks;
const b0_10 = B(0, 10), b0_24 = B(0, 24);
need(b0_24.photo.license, "GODL");
setT(0, 11, "Some of his relatives studied at Vidyamandir", B(0, 11).text.replace("Some of his relatives studied at Vidyamandir", "His cousins studied at Vidyamandir"), [40, 44, REVOI]);
setT(0, 12, "no agitations", "As I look back, I have no hesitation in saying that the tough early days I spent here with my parents – and being a part of a society that stood by each other – shaped my early beliefs.", [REVOI]);
setT(0, 15, "Reports differ on her exact name", "His mother, Shantaben, appears less often in the record. At Palanpur he remembered how hard she worked to keep a big joint family in harmony. In an August 2026 address, he credited her quiet example of sacrifice and compassion as something he still follows, and paired it with his father's rule that a promise must always be kept.", [REVOI, 239, 36]);
setT(0, 17, "Exactly how many children", "India Today calls him the seventh of eight children, though other profiles count differently, as our fact-check notes show. What is solid is that two elder brothers shaped Gautam's early path. One was Mahasukhbhai, who would later call him home to run a factory. The other was Vinod.", [221, 5, 48, 3]);
sub(B(0, 19), "text", "In 2023, Scroll called him the mysterious elder brother at the heart of the Adani crisis, after short-seller Hindenburg Research questioned the group.", "In 2023 Scroll profiled him as a mystery figure in the Adani crisis, after short-seller Hindenburg Research questioned the group.");
sub(B(0, 25), "text", "__A picture you carry at fourteen can become a plan at thirty-three, but only if you keep carrying it.__", "__A picture you carry in school can become a plan at thirty-three, but only if you keep carrying it.__");
setT(0, 31, "Adani almost never describes himself at five or at ten", "Be honest about the gaps. That Palanpur speech is the rare time Adani has talked about being a small boy. A 2022 biography by journalist R.N. Bhaskar, published by Penguin, says it covers his early childhood. But we could not check its details against other sources, so you will not find them here.", [REVOI, 54]);
const tl = B(0, 33);
const early = tl.items.find((x) => x.when === "Early years");
early.when = "c. 1968–73";
early.text = "Moves from Tharad to Deesa at six and stays until he is 11, in arid Banaskantha, in a joint family.";
early.src = [REVOI, HUM, 40];
const np1 = { t: "p", text: "He filled in the map himself that day, speaking mostly in Gujarati. He called himself a native of ==Tharad==, with his mother's family in Palanpur. When he was ==six==, the family moved to Deesa, where his father traded in forward deals while an uncle did the same in Palanpur. He stayed in Deesa until he was 11.", src: [REVOI, HUM, ET] };
const np2 = { t: "p", text: "Palanpur was the treat, and he said he came over from Deesa every month. Fifty years later he could still list it all. There was the circus on a ground by the railway crossing, and films with his cousins at a theatre called City Lights. There was marble-stopper soda near Delhi Gate, kachori from Bhikhabhai's handcart, and picnics at Balaram, bathing under a waterfall by the temple.", src: [REVOI, HUM] };
const nn = { t: "note", text: "Kachori carts and circus tents. That is what a billionaire remembers first." };
c0.splice(c0.indexOf(b0_24), 1);
c0.splice(c0.indexOf(b0_10) + 1, 0, np1, np2, nn);

// photos
const ph13 = B(1, 30).photo;
need(ph13.caption, "photographed in 2010");
ph13.caption = "Ahmedabad's main railway station (Kalupur). In 1978 a 16-year-old Adani bought his ticket to Mumbai here.";
ph13.year = null;
const modi = b.photos.find((p) => p.page.includes("Invest_Madhya"));
modi.caption = "Prime Minister Narendra Modi opens the Invest Madhya Pradesh Global Investors Summit, October 2014. Wikimedia Commons files this photo under Gautam Adani and other business leaders at the event.";

// chapter 3
const v3 = B(3, 3);
sub(v3, "howStarted", "A one-man brokerage in Zaveri Bazaar.", "A small brokerage in Zaveri Bazaar. His biographer says he traded in partnership with his maternal cousins, Girish and Prakash.");
sub(v3, "funding", "A broker holds no stock, so the business needed very little capital.", "A pure broker holds little stock, so this kind of business needs little capital.");
v3.src = [45, 5, 40, 217];
sub(B(3, 12), "lesson", "He sold India's favourite cooking oil because the same money earned more in infrastructure.", "He sold India's favourite cooking oil and said the money would go into core infrastructure.");
setT(3, 14, "He kept the land each time", "Salt failed. Power failed once. Each time he came back from another side.");
sub(B(3, 23), "text", "It sold the asset to the family side in 2013 at A$2.051 billion to cut its debt.", "It sold the asset to the family side around 2013 at A$2.051 billion to cut its debt.");

// chapter 4
sub(B(4, 1), "text", "Inside was a cheque for ==₹3 crore== from Adani Exports.", "It held an Adani Exports cheque for ==₹3 crore==.");
setT(4, 19, "Those tried were acquitted", "On the evening of 1 January 1998, according to the police case, gunmen stopped the car carrying Adani and a companion in Ahmedabad and took them away. Police alleged a ransom demand of ==₹15 crore==. Everyone tried was acquitted. We tell that night in full in the personal-life chapter.", [168, 169]);
setT(4, 20, "two frightening hours", "Ten years later came another close call. On 26 November 2008 he was dining at the Taj Mahal Hotel in Mumbai when terrorists attacked, and he stayed trapped inside all night until commandos got the guests out. Neither event slowed the building.", [245, 215, 60]);

// chapter 6
setT(6, 3, "everything else is secondary", "For me, the interest of my investors is paramount and everything is secondary.", [278, 234]);
setT(6, 5, "Five weeks", "Third richest to outside the top 25. Debt makes things fast.");
setT(6, 19, "The judge asked Adani in court", "In 2026 the American case turned. By May, Adani had settled the SEC case, without admitting wrongdoing, for $6 million, with $12 million from Sagar. The Justice Department, now under the Trump administration, asked to drop the charges with prejudice, which means they cannot be brought again. CBS News, citing sources, reported that his lawyer raised a $10 billion US investment in a meeting with officials. The judge ordered Adani to swear an affidavit on it. He said there was no deal, while accepting that his lawyers had proposed the investment as part of a possible resolution, and the US Attorney in Brooklyn had rejected that idea in writing.", [204, 205, 206, 32, 199, 198]);
setT(6, 21, "still running at the time of our last reading", "So how should you read this? No jury ever heard the evidence, and no court decided whether bribes were paid. Adani is free of the charges and did not admit guilt. On 3 September 2026 the same judge refused to drop the case against the five other accused, because the government had not given enough evidence for its reasons. The Justice Department went to an appeals court on 28 September, and the judge filed a brief opposing it in late October, so that fight was still running in early November.", [208, 199, 198, MLEX]);

// chapter 7
const p70 = B(7, 0);
need(p70.text, "==$77.7 billion== on 1 November 2026");
p70.text = p70.text
  .replace("Forbes's real-time page for him showed ==$77.7 billion== on 1 November 2026.", "Forbes's real-time page for him showed ==$79.2 billion== on 2 November 2026, ranked 26th in the world.")
  .replace("Its India's Richest list, measured on 30 September, gave", "Its India's Richest list, published on 30 September and using 11 September prices, gave")
  .replace("Bloomberg's index had him at ==$109 billion== on 31 October, ranked 18th in the world.", "Bloomberg's index, updated on 1 November, had him at ==$109 billion==, ranked 18th.");
p70.src = [209, 0, 210, 292, 73, 211];
B(7, 2).items.forEach((it) => { need(it.label, "31 Oct 2026"); it.label = it.label.replace("31 Oct 2026", "1 Nov 2026"); });
sub(B(7, 3), "text", "The pieces add up to more than the headline $109 billion, which suggests Bloomberg subtracts something like debts, in a breakdown we could not read in full.", "All the pieces add up to about $120.7 billion. Bloomberg then takes off $11.75 billion of liabilities to reach its $109 billion, and it leaves out the offshore family companies, for lack of public disclosure.");
const t721 = B(7, 21).items.find((x) => x.when === "Oct 2026");
t721.when = "Nov 2026";

// chapter 8
sub(B(8, 12), "text", "that in 2022 he took his son Karan to task in front of other executives over an unexpected $11 million quarterly loss at ACC.", "that in 2022 he scolded his son Karan before other executives over an unexpected $11 million quarterly loss at ACC.");
setT(8, 19, "Meanwhile, nobody", "Sinha joined ten years later as a director of Adani Ports. Back when the port was only a plan, nobody, it seemed, wanted to risk joining an unknown Ahmedabad firm. That was why the job had gone to his childhood friend Malay Mahadevia, then fresh from a dentistry degree. The Economic Times called Mahadevia, in many ways, Adani's alter ego. He is still listed on the group's leadership page, as a director of airports and healthcare.", [223, 227]);
sub(B(8, 21), "text", "Vineet Jain, a CEO at Adani Power in 2012, remembered", "Vneet Jaain, a CEO at Adani Power in 2012 (spelled Vineet Jain in that report), remembered");
sub(B(8, 22), "text", "adding that there is a risk in recruiting from a completely different industry.", "adding that hiring from a totally different field carries a risk.");
sub(B(8, 25), "text", "Jain told the Economic Times", "Jaain told the Economic Times");
need(B(8, 26).who, "Vineet Jain");
B(8, 26).who = B(8, 26).who.replace("Vineet Jain", "Vneet Jaain");

// chapter 10
sub(B(10, 1), "text", "He is the seventh of eight children.", "India Today calls him the seventh of eight children.");
sub(B(10, 11), "text", "Business Today's account from that month says", "Business Today's account, published within weeks, says");

// lessons
const L3 = b.lessons.find((l) => l.title === "Get to the point.");
need(L3.text, "Vineet Jain's advice");
L3.text = L3.text.replace("Vineet Jain's advice", "Vneet Jaain's advice");

fs.writeFileSync(P, JSON.stringify(b, null, 2) + "\n", "utf8");
console.log("ok", b.sources.length, { ET, REVOI, HUM, MLEX });
