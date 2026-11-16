import { readFileSync, writeFileSync } from "node:fs";
const edits = {
  "ch1.mjs": [
    ["on a 21-year-old trainee officer from", "on a young trainee officer from"],
    ["Now 77, he still does it, and he says it has nothing to do with vanity. “And you don't feel", "Now 77, he still does it. “And you don't feel"],
    ["And he plays tennis four hours a week, which he treats as seriously as a board meeting.", "And he plays tennis four hours a week, “avec une certaine intensité”, with a certain intensity."],
    ["He admits the plan often loses to the calendar.", "He admits it does not always work."],
    ["When he wanted a designer to see what Japanese teenagers wore at night, he did not give a brief. He simply said: “Go look.”", "When he wanted a designer to see what Japanese teenagers wore at night, he did not tell him what to copy. He simply said: “Go look.”"],
    ["He also takes bets that others find odd. When Pharrell Williams, a music producer, became Louis Vuitton's men's creative director, fashion critics were sceptical. Pharrell, who presented his first concept to Arnault and the brand's CEO, described what came next: there were no directives.", "His group also takes bets that others find odd. When Louis Vuitton's chief picked Pharrell Williams, a music producer, as men's creative director, many had expected a young fashion-school graduate. Pharrell, who presented his first concept to Arnault and the brand's CEO, described what came next: there were no directives."],
    ["He was an intern in 1981. Still there in 2026. Read that twice.", "He started as an intern. Forty-five years later, he's still there."],
  ],
  "ch2.mjs": [
    ["China later became LVMH's second-biggest country by sales.\", \"bbg\"", "By 2024 China was LVMH's second-biggest country by sales.\", \"bbg\""],
    ["On the day of his grandfather's funeral in 1959 he slipped his good school marks into the coffin, because the old man had always watched them so closely. He was ten. His grandmother's house had a saying that the franceinfo series records: first prize, or nothing. It is not a relaxing way to grow up, and it is hard to separate his success from it.", "When his grandfather died in June 1959, he put his good school marks into the coffin, because the old man had always watched them so closely. He was ten. His grandmother, franceinfo reports, kept repeating: “Le prix d'excellence, ou rien !” First prize, or nothing. It is not a relaxing way to grow up, and it is hard to separate his success from it."],
    [" In a letter in 2026 he said the group earns 75% of its revenue outside Europe, so it cannot afford to think only about France.\", \"legend\", \"wwd26\", \"wwdletter\"", "\", \"legend\", \"wwd26\", \"wwdletter\""],
    ["His answer has not changed in years. “Every morning", "His answer is always the same. “Every morning"],
    ["“Il faut pas se décourager. La première fois où", "“Il faut pas se décourager. La première difficulté, la première fois où"],
    ["Il faut pas se décourager. La première fois où le banquier vous appelle en vous disant : ouh là là, attention, le crédit est trop important. Il faut résister.", "Il faut pas se décourager. La première difficulté, la première fois où le banquier vous appelle en vous disant : ouh là là, attention, le crédit est trop important. Il faut, il faut résister."],
    ["Asked to name the one quality you need to last in business, he thought briefly and laughed:", "Asked to name the one quality you need to last in business, he laughed:"],
    ["“Une bonne affaire dans laquelle on n'est absolument pour rien,” he laughed: a good deal we had absolutely nothing to do with.", "It was, he laughed, “une bonne affaire dans laquelle on n'est absolument pour rien”: a good deal we had absolutely nothing to do with."],
  ],
  "ch3.mjs": [
    ["he talked only about what he played on the piano.\", \"presse\", \"vogue26\", \"gala\"", "they talked about the piano, and what he played.\", \"presse\", \"vogue26\", \"gala\", \"marieclaire\""],
    ["Since then he has gone for a check-up every six months, partly because he plays such intense tennis. He does not smoke. It is one of the only times he has spoken publicly about fear, and he kept it short:", "He now has a check-up every six months, partly because he plays such intense tennis. He does not smoke. He kept the rest short:"],
    ["played the first part of Chopin's Second Sonata for one of the greatest Chopin players alive.", "played the first part of Chopin's Second Sonata in front of one of the great pianists of his time."],
    ["He recalls his son spotting the head of Mediapart on board, who had been criticising his flights.", "He recalls his son spotting the head of Mediapart on board, whose site, the son said, kept attacking his flights."],
    ["delivered free to French hospitals. That was simple goodwill, and few people argued with it. His bigger gifts draw more fire. When Notre-Dame burned, he and François Pinault's family raced to outbid each other, and the New York Times reported that the spectacle fed anger over inequality during the Yellow Vest protests.", "delivered free to French hospitals. His bigger gifts draw more fire. When Notre-Dame burned, he followed the Pinault family's €100 million pledge with €200 million a few hours later, and the New York Times reported that the spectacle of billionaires trying to top each other fed anger over inequality during the Yellow Vest protests."],
  ],
  "ch4.mjs": [
    ["The press in the 1980s gave him harsher names,", "The press gave him harsher names,"],
    ["The host of Legend, France's biggest podcast, spent", "The host of Legend, which bills itself as France's top podcast, spent"],
    ["q(\"Ce qu'on écrit sur moi, je m'en fous complètement.\", \"Bernard Arnault, Legend podcast, 2026. In English: what people write about me, I couldn't care less.\", \"bfm\", \"legend\")", "q(\"Ça me laisse complètement froid. Et dans la plupart des cas, je ne regarde même pas.\", \"Bernard Arnault on press coverage of him, Legend podcast, 2026, as printed by BFM. In English: it leaves me completely cold, and in most cases I don't even look.\", \"bfm\", \"legend\")"],
    ["You should read that with care. Three weeks later he published", "You should read that with care. Less than three weeks later he published"],
    ["Le Monde had been harsher on him than on the Wertheimer family of Chanel, who declined to take part.", "he argued that Le Monde had been harsher on him than on the Wertheimer family of Chanel, who declined to take part."],
    ["and also why he points out that he could not stop six pages of Le Monde.", "and he points to the Le Monde series itself as proof that he cannot silence anyone."],
    ["which is why the slowdown there hurts so much. He has spoken less about China in public lately, and the numbers do the talking in the last chapter.", "which is why the slowdown there hurts so much. The numbers are in the last chapter."],
    ["Yet he also says the group has paid", "He also says the group has paid"],
  ],
  "ch5.mjs": [
    ["We have tried to be exact about what was proved, what was settled and what was only alleged. He has never been charged in any of the cases below that involve LVMH's conduct.\", \"reuters24\", \"f2425\"", "We have tried to be exact about what was proved, what was settled and what was only alleged. He was never charged in the spying case, and the settlements below did not admit guilt.\", \"reuters24\", \"f2425\", \"chipip\""],
    ["The French press called him the Terminator, and reported cuts ran far beyond his figure.", "The French press called him the Terminator."],
    ["In 2014, a peace deal forced LVMH to hand its Hermès shares to its own shareholders. So he made a large gain on paper, and he still did not get Hermès. __The family he tried to out-manoeuvre came out with stronger defences, and he came out with a reputation.__\", \"hsf\", \"lvmhhermes\"", "Under a 2014 peace deal, LVMH handed its Hermès shares to its own shareholders. So he made a large gain, and he still did not get Hermès. __The family he tried to out-manoeuvre came out with stronger defences, and he came out with a reputation.__\", \"hsf\", \"lvmhhermes\", \"fashionlaw\""],
    ["Libération ran him on the front page holding a suitcase under the words", "Libération ran him on the front page under the words"],
    ["He also dropped the row with Libération and resumed normal relations.", "He also ultimately resumed normal relations with Libération."],
    ["The group feared Ruffin would disrupt its shareholder meeting, and his newspaper Fakir was infiltrated and watched for nearly three years.\", \"reuters21\", \"f2421\", \"m2021\", \"ina\", \"wwdletter\"", "A Paris court later found Squarcini complicit in the illegal surveillance of Ruffin and his paper Fakir, as they planned to disrupt an LVMH shareholder meeting.\", \"reuters21\", \"f2421\", \"m2021\", \"reuters25\""],
    ["and his appeals failed. In November 2025", "and his appeals failed. In November 2025"],
    ["\"f2421\", \"m2021\", \"reuters21\", \"huma\", \"chipip\"", "\"f2421\", \"m2021\", \"reuters21\", \"wwdappeal\", \"huma\", \"chipip\""],
    ["La revue des médias says the Squarcini affair helped create a climate of fear around covering the group.", "A reporter quoted by La revue des médias says the Squarcini affair helped create a climate of fear around covering the group."],
    ["He says he hates the idea of a product that isn't honest. The court said his brands had failed to look down their own supply chain.\", \"reutersdior2\", \"reuterslp2\", \"agcm\", \"reuterslp\"", "Even so, the Milan court's finding on Loro Piana was that it had failed to adequately control its own supply chain.\", \"reutersdior2\", \"reuterslp2\", \"agcm\", \"boflp\""],
    ["In 2001 he told Harvard no one could “manage” John Galliano.", "In 2001 Harvard Business Review, summing up his view, wrote that you don't “manage” John Galliano."],
    ["But polls showed 86% of the French public in favour of the tax, and a personal attack made an economist more famous.", "But polls showed 86% of the French public in favour of the tax, and a personal attack handed the economist a bigger platform."],
    ["But every founder should know that keeping heirs competing is great for you, and not necessarily for the company after you.", "But every founder should know that leaving this question open may suit you, and not necessarily the company after you."],
  ],
  "ch6.mjs": [
    ["[\"$117.4bn\", \"Forbes's estimate with family, on 1 Oct 2026\", \"sportune\", \"bafrica\"]", "[\"$117.4bn\", \"Forbes's estimate with family, on 1 Oct 2026\", \"sportune2\"]"],
    ["He talks of “paying very close attention to margins”. And he says the money goes back into the products, stores and experiences that make people want them, such as the giant Louis Vuitton stores in Beijing and Seoul.", "He talks of paying “very close attention to margins”, while still spending on the things that make people want the brands, such as the new Louis Vuitton stores in Beijing and Seoul."],
    ["Next he wants Europe, “without it costing too much”.", "Next he wants a place in European competition, without it costing too much."],
    ["He lost to the Hermès family's structure. Then he copied it. Smart.", "He lost to Hermès's structure. Now his family uses the same legal form."],
    ["Note the second line, which he adds with a slight smile: “Ils", "He adds another line: “Ils"],
    ["[\"Oct 2026\", \"Third-quarter sales disappoint. WWD gives him its lifetime achievement honour.\", \"q326\", \"wwd26\"]", "[\"Oct 2026\", \"Fashion and leather sales fall 5% in the third quarter. WWD gives him its lifetime achievement honour.\", \"q326\", \"bafrica\", \"wwd26\"]"],
    ["His foundation has been getting ready to show a Van Gogh self-portrait with the bandaged ear that he calls the equal of the Mona Lisa, which he says he secured because its owner is a friend.", "In July he said his foundation would show, from October, a Van Gogh self-portrait with the bandaged ear that he calls the equal of the Mona Lisa, and that its owner is a friend."],
    ["q(\"Un leader mondial français [...] qui a encore beaucoup de potentiel et qui n'en est qu'au début. Et donc j'ai encore beaucoup d'années pour m'amuser à gérer LVMH.\"", "q(\"Un leader mondial français [...] qui a encore beaucoup de potentiel et qui n'en est qu'au début. Et donc j'ai encore beaucoup d'années pour m'amuser à gérer LVMH [...]\""],
    ["Italian courts found serious failures in the supply chains behind Dior bags and Loro Piana jackets, both since cleared after fixing their controls.", "Italian courts put the makers of Dior bags and Loro Piana jackets under supervision for failing to police their suppliers, and released both early once they fixed their controls."],
    ["A film mocked him, and his company ended up paying €10 million to close a spying probe, while its consultant was convicted. In 2026 the same man answered Le Monde with a funny letter, and 4.5 million people read it in a day. One approach cost him years of bad press. The other cost him a stamp.", "A film mocked him, and his company ended up paying €10 million to close a spying probe, while a consultant was convicted and has appealed. In 2026 he answered Le Monde with a funny letter that drew 4.5 million views in a day. One approach cost years of bad press. The other cost three pages."],
    ["Read your cap table carefully, and understand it before you need it.", "Know exactly who owns what in your company, and understand it before you need it."],
  ],
  "sources.mjs": [
    ["  reuterscar: [", "  fashionlaw: [\"The Fashion Law, “Hermès vs. LVMH: The Timeline Behind a Takeover Attempt” (14 Jul 2017)\", \"https://www.thefashionlaw.com/hermes-vs-lvmh-a-timeline-of-the-drama/\"],\n  wwdappeal: [\"WWD, Miles Socha, “Paris Court Rebuffs Appeal of LVMH Settlement” (31 May 2022)\", \"https://wwd.com/fashion-news/fashion-scoops/paris-court-appeal-lvmh-settlement-1235191844/\"],\n  sportune2: [\"Sportune / 20 Minutes, Emmanuel Bernard, “Bernard Arnault perd 3 milliards en une seule journée selon Forbes” (2 Oct 2026)\", \"https://sportune.20minutes.fr/sport-business/football/paris-fc-bernard-arnault-perd-3-milliards-en-une-seule-journee-selon-forbes-412918\"],\n  marieclaire: [\"Marie Claire, Sarah Duverger, on Hélène Mercier-Arnault's account of meeting Bernard Arnault (23 Feb 2026)\", \"https://www.marieclaire.fr/le-romantisme-par-excellence-la-pianiste-helene-mercier-arnault-raconte-sa-rencontre-avec-bernard-arnault,1509675.asp\"],\n  reuterscar: ["],
  ],
  "fc.mjs": [
    ["(and part 1's profile gives $117.4bn at #17 on 1 Nov 2026)", "(and the profile fragment of this book gives $117.4bn at #17 on 1 Nov 2026)"],
  ],
};
for (const [file, list] of Object.entries(edits)) {
  const path = new URL(file, import.meta.url);
  let s = readFileSync(path, "utf8");
  for (const [a, b] of list) {
    if (a === b) continue;
    if (!s.includes(a)) { console.log("MISS", file, a.slice(0, 70)); continue; }
    s = s.replace(a, b);
  }
  writeFileSync(path, s, "utf8");
}
