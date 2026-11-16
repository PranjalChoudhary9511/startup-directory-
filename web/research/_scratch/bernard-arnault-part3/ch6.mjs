const p = (text, ...src) => ({ t: "p", text, src });
const n = (text) => ({ t: "note", text });
const h = (text) => ({ t: "h", text });
const q = (text, who, ...src) => ({ t: "quote", text, who, src });
const facts = (...items) => ({ t: "facts", items: items.map(([value, label, ...src]) => ({ value, label, src })) });
const tl = (...items) => ({ t: "timeline", items: items.map(([when, text, ...src]) => ({ when, text, src })) });

export const today = {
  id: "today",
  kicker: "November 2026",
  title: "Seventy-Seven and Buying More",
  blocks: [
    p("On 23 April 2026 Arnault walked on stage at the Carrousel du Louvre for LVMH's annual meeting, wearing his winking Einstein watch. The shares were down about a quarter that year. For the first time, all five of his children spoke to the shareholders. A 25-year-old investor stood up, and Arnault congratulated him on buying the shares. “It's a good time. I do it too, each at our own scale.”", "vogueagm", "yahooagm", "f24agm"),
    p("Then someone asked the obvious question: who comes next? He pointed to the 99% vote the year before, which lets him stay in his roles until he is 85. “So we'll talk about all that again in seven or eight years,” he said. Looking at his children, he added: do they seem very ambitious? Warren Buffett, Bloomberg reported in 2024, once wrote to tell him he was wrong to set the age limit at 80, because it was too low.", "vogueagm", "f24agm", "bofagm", "bbg", "founders"),
    n("He'd be 85 in 2034. He means it."),
    h("Where he stands"),
    facts(
      ["$132bn", "Bloomberg's estimate, #14 in the world, on 1 Nov 2026", "bbgindex"],
      ["$117.4bn", "Forbes's estimate with family, on 1 Oct 2026", "sportune2"],
      ["50.2%", "Family share of LVMH's capital, with 66.4% of the votes, on 30 June 2026", "obsjul", "fortunerift"],
      ["85", "New age limit for chairman and CEO, approved in 2025", "vogueagm", "fortunerift"]
    ),
    p("Those numbers show how far he has fallen, on paper. In December 2022 he was the richest person alive. On 10 September 2026 he dropped out of Bloomberg's top ten, reportedly for the first time since 2017. Bloomberg's index shows his wealth down about ==$61.5 billion== in a year. The shares traded at their lowest since late 2020 after October's sales figures. None of this money has been spent. It is simply the value of his LVMH stake, marked down daily.", "bbgrich", "ndtvtop", "bbgindex", "bafrica", "sportune"),
    p("He is also still chairman and CEO, not a figurehead. Early in 2026 the family crossed 50% of LVMH's capital, partly because he keeps buying, and he says so openly. “When the shares drop a little, as has been the case for some time, I buy more,” he told shareholders. Reports put his purchases in 2025 at about €1.4 billion, at an average price far above where the stock now trades. __Whatever else you think of him, he is backing his view with his own money.__", "vogueagm", "fuagm", "bafrica", "bofagm"),
    q("You just need to be patient. In business, in fact, you always have to be patient.", "Bernard Arnault, to shareholders, April 2026, as reported by Vogue", "vogueagm"),
    h("The business he has now"),
    p("LVMH's 2025 revenue was €80.8 billion, down from €84.7 billion in 2024, with profit from recurring operations of €17.8 billion. For the first nine months of 2026, sales reached €57.1 billion, up 2% on an organic basis. The picture inside is mixed: fashion and leather goods fell 5% in the third quarter on weak Chinese demand, while jewellery and Sephora did well. L'Oréal has passed LVMH as France's largest company by market value.", "letter", "vogueagm", "q326", "q3call", "fusimplify"),
    p("His response follows the old playbook. He sold Marc Jacobs, which closed on 1 September 2026, and sold more of the DFS duty-free assets. He gave Dior to a new designer, Jonathan Anderson, and credited Anderson's first designs for the growth in the second quarter. He talks of paying “very close attention to margins”, while still spending on the things that make people want the brands, such as the new Louis Vuitton stores in Beijing and Seoul.", "q3call", "h126", "letter"),
    n("Sell the side bets. Back the stars. Same move he made in 2002."),
    h("His current bets"),
    p("**Tiffany.** He bought it for nearly $16 billion, and he wants it to be “the world's leading jewellery brand” within five years. “We are not far off, but we are not there yet,” he said in April. **Formula 1.** LVMH signed a ten-year partnership and says it is the sport's first partner. Before the Monaco Grand Prix, Max Verstappen took him round the streets at ==250 km/h==. “Well, Verstappen was driving, so I told myself the risk is limited.”", "fuagm", "letter", "legend", "wwdlegend"),
    p("**AI.** At VivaTech in June 2026 he said he takes part in weekly design sessions using generative AI to develop product ideas. Louis Vuitton designers use it to test colours and materials, and Sephora launched an app inside ChatGPT. **Football.** His children pushed him to buy control of Paris FC in 2024, with Red Bull as a partner. He told them they had to reach the top division, which they did. Next he wants a place in European competition, without it costing too much. The club lost €33.5 million in 2025.", "obsjul", "legend", "bfm", "sportune"),
    p("**Control.** In September 2026 the family proposed folding its holding companies together, so that Christian Dior would become a limited partnership renamed Agache, holding almost all of the family's LVMH stake. Michelin and Hermès use similar structures, which make hostile bids much harder. He would remain its manager, alongside Agache Commandité, the vehicle set up for his children, who hold 20% each. Filings say decisions there need three of the five. It is the Hermès defence, built by the man who once ran into it.", "fusimplify", "obsaug", "fortunerift"),
    n("He lost to Hermès's structure. Now his family uses the same legal form."),
    h("The succession question"),
    p("All five children hold senior jobs: Delphine runs Christian Dior Couture, Antoine runs Christian Dior SE and LVMH's image, Alexandre is deputy CEO of Moët Hennessy, Frédéric runs Loro Piana, and Jean runs Louis Vuitton watches. Four sit on the board. He has named no one. Morningstar's analyst sees Delphine as closest to the top, and thinks a professional outsider is also possible. The best-performing division this year, jewellery and watches, is run by none of them, as Fortune pointed out.", "obsaug", "fusimplify", "fortunerift", "legend"),
    q("On progresse chez LVMH par un système de méritocratie.", "Bernard Arnault, Legend podcast, 2026. In English: at LVMH you move up through merit.", "legend"),
    p("He adds another line: “Ils sont tous encore jeunes, donc tout va bien.” They are all still young, so all is well. The eldest is 51. He says the question is about results, and he clearly does not feel he has to decide. Investors and journalists keep asking. Their worry is that one day the decision will not be his to make, and a family that promises it will never split will be tested.", "legend", "obsaug", "reutersjan"),
    h("How 2026 has felt"),
    tl(
      ["Jan 2026", "Investors tell Reuters that the lack of a succession plan is a growing risk.", "reutersjan"],
      ["Apr 2026", "AGM: five children speak; “seven or eight years” on succession.", "f24agm"],
      ["Jun 2026", "Audrey Millet's critical biography appears, the first in France in over 20 years.", "sudouest"],
      ["Jul 2026", "Legend podcast, then Le Monde's six-part series, then his letter and his first post on X.", "legend", "forbesx"],
      ["Sep 2026", "Drops out of Bloomberg's top ten. Family proposes a single holding company.", "ndtvtop", "fusimplify"],
      ["Oct 2026", "Fashion and leather sales fall 5% in the third quarter. WWD gives him its lifetime achievement honour.", "q326", "bafrica", "wwd26"]
    ),
    p("It has been a strange year: more attacks than ever, and more talking than ever. He joined the Académie des sciences morales et politiques, one of France's old learned bodies. In July he said his foundation would show, from October, a Van Gogh self-portrait with the bandaged ear that he calls the equal of the Mona Lisa, and that its owner is a friend. His critics call him an oligarch. WWD calls him one of the chief architects of modern luxury. He would say he is only getting started.", "obsarmy", "legend", "tribu", "wwdaward"),
    q("Un leader mondial français [...] qui a encore beaucoup de potentiel et qui n'en est qu'au début. Et donc j'ai encore beaucoup d'années pour m'amuser à gérer LVMH [...]", "Bernard Arnault, Legend podcast, 2026. In English: a French world leader with much potential, only at the start. So I still have many years to have fun running LVMH.", "legend"),
    p("Asked how he wants to be remembered, he laughed first: as late as possible, please. Then he named the thing he is proudest of: starting from a struggling firm in Roubaix and creating France's largest listed company and a world leader in its field. It is no longer the largest, as it happens. If you are reading this at 17, you will find out alongside everyone else how the last act goes. So far, he intends to write it himself.", "legend", "wwd26", "fusimplify"),
    n("Seventy-seven. Down tens of billions. Still in the shops on Saturday."),
  ],
};

export const lessons = [
  { title: "Go and see for yourself.", text: "Arnault still walks through his stores on Saturday mornings at 77, and sends notes about chairs and salespeople's shoes. He learned it at five or six, on building sites with his grandfather. You will not find these things in a spreadsheet, so go to where your customer actually is." },
  { title: "Never get comfortable with good news.", text: "Bloomberg reported that the worst way to start a meeting with him is to say that sales are robust. He calls it staying permanently dissatisfied. Celebrate for an hour, then ask what could be better." },
  { title: "Love the product more than the pitch.", text: "He told Louis Vuitton's own marketing team not to do marketing, and J'adore became a global hit after focus groups called it merely fine. Listen to your testers with one ear, as he says. But remember he could afford the misses, so keep your bets small while you are young." },
  { title: "Give talent freedom, and give the process rules.", text: "Galliano could make dresses out of newspaper, while a single purse could have 1,000 planned steps in the workshop. Be loose where ideas are born and strict where money is made. Most young companies do this exactly backwards." },
  { title: "Think in ten-year chunks.", text: "In 1992 he visited a China with no cars on the street and no hot water in his hotel, and Vuitton opened a store there anyway. It later became LVMH's second-biggest country. Ask where your market will be in 2036, not next quarter." },
  { title: "Expect the banker's call, and hold on.", text: "When his grandfather died in 1959, the banks got nervous and his father cancelled the family holiday to stay and defend the firm. Arnault's advice to founders today is not to panic at the first scary call. Persistence, he says, is the one quality you need." },
  { title: "Execute. Ideas are cheap.", text: "He reminds founders that dozens of teams had something like Facebook, and only one made it work. He tries to run a giant like a start-up by fighting paperwork. Spend your energy on doing the thing, not on protecting your idea." },
  { title: "Choose people, then keep them.", text: "Michael Burke came as an intern and was still with him more than four decades later. Sidney Toledano got a call at 9 a.m. on his first day, and stayed for 30 years. Loyalty compounds like money, and lying is the one thing Arnault says he won't forgive." },
  { title: "Be careful what you promise.", text: "He promised to keep 10,000 Boussac jobs, by his own account, and admits he did not. Forty years later people still bring it up, and he is still answering. Promise only what you can deliver, even when a promise would help you win the deal." },
  { title: "Secrets get out, so plan for it.", text: "He was told his Belgian citizenship request would stay discreet, and it ended up on a front page as “Get lost, rich idiot”. He says he underestimated the impact, and it took him years to shake off. Before any clever move, ask how it would look as a headline." },
  { title: "Answer your critics. Don't watch them.", text: "A film mocked him, and his company ended up paying €10 million to close a spying probe, while a consultant was convicted and has appealed. In 2026 he answered Le Monde with a funny letter that drew 4.5 million views in a day. One approach cost years of bad press. The other cost three pages." },
  { title: "Check your whole supply chain.", text: "Italian courts put the makers of Dior bags and Loro Piana jackets under supervision for failing to police their suppliers, and released both early once they fixed their controls. If you sell quality, you own every step, including the ones you outsource. Visit your suppliers before a prosecutor does." },
  { title: "Control what matters.", text: "He beat rivals by buying stakes they didn't see coming, then lost to the Hermès family because they had locked up voting control. Today his family holds 50% of LVMH's capital and about two-thirds of the votes. Know exactly who owns what in your company, and understand it before you need it." },
  { title: "Do something you'd do for free.", text: "“Every morning I have fun when I arrive,” he says, and he stops for 20-minute piano breaks at work. Enjoying it is how he works so hard without suffering, he says. If you dread Monday at 25, you will not last until 77." },
  { title: "Decide who comes after you, or decide that you won't.", text: "He has spent years building structures to keep the empire together, yet still says “seven or eight years” when asked who is next. Investors call that a growing risk. Even if you are 20, build something that doesn't need you to be there, because that is what makes it worth owning." },
];
