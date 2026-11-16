const p = (text, ...src) => ({ t: "p", text, src });
const n = (text) => ({ t: "note", text });
const h = (text) => ({ t: "h", text });
const q = (text, who, ...src) => ({ t: "quote", text, who, src });
const ex = (text, ...src) => ({ t: "example", text, src });
const facts = (...items) => ({ t: "facts", items: items.map(([value, label, ...src]) => ({ value, label, src })) });
const tl = (...items) => ({ t: "timeline", items: items.map(([when, text, ...src]) => ({ when, text, src })) });

export const brand = {
  id: "the-brand",
  kicker: "His public face",
  title: "The Man Who Never Says Luxury",
  blocks: [
    p("Here is a strange thing about the world's biggest luxury boss. He does not like the word. “Luxury is not a word I am fond of particularly,” he said in 2026, because it suggests frivolity, superficiality and “all that flashy bling”. He wants people to say “high-quality products”, made by artisans. He admits he has lost that battle, since the whole industry and every analyst use the word anyway.", "wwdlegend", "wwdaward", "legend"),
    p("That is his image in small. Every word, suit and shop window is managed, including the ones that look effortless. WWD says that in Paris circles he is known simply as “B.A.”. Forbes called his appearance “a suit of armor”. The press gave him harsher names, including “the Terminator” and “the wolf in cashmere”, and he has outlived them both.", "wwdaward", "forbes19", "bbg", "founders"),
    n("Pick your own words. If you don't, others will pick them for you."),
    h("Silence as a strategy"),
    p("For decades he has mostly spoken at LVMH's annual meetings and results days. La revue des médias traces his retreat from long interviews to one bad experience. In 2014 he opened his doors and appeared on camera for France 2's Complément d'enquête. LVMH then filed a complaint alleging blackmail against a journalist working on the programme, who denied wrongdoing, and the investigation ended with the case dismissed. After that his appearances shrank.", "wwdletter", "ina"),
    p("So when he did talk, in 2026, it was a calculated choice. The host of Legend, which bills itself as France's top podcast, spent a year and a half getting the interview, first through a WhatsApp call to the group's head of external relations, then by meeting Antoine, then Bernard. Arnault picked a long, friendly format that its host says has never claimed to be journalism. __He skipped the journalists and went straight to the audience, and a young one at that.__", "match26", "legend"),
    q("Ça me laisse complètement froid. Et dans la plupart des cas, je ne regarde même pas.", "Bernard Arnault on press coverage of him, Legend podcast, 2026, as printed by BFM. In English: it leaves me completely cold, and in most cases I don't even look.", "bfm", "legend"),
    p("You should read that with care. Less than three weeks later he published a three-page reply to Le Monde. And a June 2026 article in La revue des médias says he reads and sees everything. The man who says he does not care has spent 40 years caring very much. Saying you don't care is part of the armour.", "wwdletter", "ina", "bfm"),
    n("Notice the gap between what he says and what he does here."),
    h("The product as the headline"),
    p("His best publicity stunts look like small favours. He tells this one himself. In 1995, Madame Chirac rang him two or three days before Princess Diana came to Paris to open a Cézanne show, asking for a gift idea. Dior was working on a new quilted leather bag. He and Sidney Toledano spent half a day on it. Madame Chirac gave it to Diana, who loved it and carried it around the world. It became the Lady Dior.", "legend"),
    p("And at his company's 2026 annual meeting he wore a Louis Vuitton watch with a tiny moving Einstein on the dial, whose eye winks and whose tongue pokes out. Only two were made, he says. He quoted Einstein to the shareholders while wearing it. Even his wrist was doing a job.", "legend", "vogueagm"),
    h("Famous moments"),
    tl(
      ["1995", "Lady Dior goes around the world on Princess Diana's arm.", "legend", "toledano"],
      ["Sep 2012", "Libération's front page: “Casse-toi riche con !” (Get lost, rich idiot).", "wwdbe", "liberation"],
      ["Apr 2019", "€200 million for Notre-Dame, hours after the fire.", "reutersnd", "nytnd"],
      ["Oct 2019", "Opens a Louis Vuitton workshop in Texas beside President Trump.", "whitehouse", "wwdtexas"],
      ["Dec 2022", "Passes Elon Musk to become the world's richest person.", "bbgrich"],
      ["Jun 2023", "Lunch with Musk at the Cheval Blanc Paris, overlooking the Eiffel Tower.", "wwdlunch", "forbeslunch"],
      ["Jan 2025", "Attends Trump's second inauguration in Washington.", "politico"],
      ["Jul 2026", "Rare podcast, then a letter to Le Monde, then his first ever social media post.", "legend", "forbesx"]
    ),
    p("The Musk lunch shows how he stages things. The hotel's three-Michelin-star chef had already left for the summer season in Saint-Tropez. He came back to Paris at Arnault's request to cook it. Maye Musk came too, and Antoine put the photos on Instagram. It said everything without a word: the two richest people on Earth, on LVMH's terrace, eating LVMH's food.", "wwdlunch", "forbeslunch"),
    h("The day he joined X"),
    p("For 77 years he had no social media account of his own. Then Le Monde ran a six-part series in July 2026 on his power, media holdings, tax and family, ending with a piece on rivalry among his children. Le Monde's main shareholder is Xavier Niel, the partner of his daughter Delphine, which made the whole thing very awkward at Paris dinner tables.", "forbesx", "bofx", "chosun"),
    p("His reply, titled “Merci”, went out on 26 July on LVMH's press account. It was funny, and it had a blade in it. He thanked the paper for its “heavy artillery” and apologised to readers for the group's “failure of bodily diversity”, after the series commented on how slim everyone is. He pleaded “guilty” to having talked to five French presidents. The next day he opened @BernardArnault to share it. Elon Musk reposted him.", "wwdletter", "bofx", "chosun"),
    q("My children run Houses, build teams, make decisions, and—sacrilege—call each other on Sundays. What, in an ordinary family, is called a Sunday is called, in ours, an intrigue.", "Bernard Arnault, open letter to Le Monde, July 2026, as quoted by Fortune", "fortunerift"),
    p("Fortune counted 4.5 million views in 24 hours. It was a real lesson in tone, because irony made him look relaxed. It also had limits. WWD noted he never mentioned the speculation over who will succeed him. And he added a remark that says a lot about how he works: he argued that Le Monde had been harsher on him than on the Wertheimer family of Chanel, who declined to take part. “Let that serve as a lesson for your next subjects.”", "fortunerift", "wwdletter"),
    h("Owning the press"),
    p("He is not only a subject of news. LVMH's media arm includes the business daily Les Echos, the popular paper Le Parisien, Investir, Radio Classique and stakes in L'Opinion and Challenges, and he co-founded the VivaTech tech fair. He told a Senate inquiry in 2022 that the media unit was marginal for the group, with €400 million in sales and losses. He has also called owning it a form of philanthropy.", "obssenate", "fortunememo", "legend"),
    q("Si demain « les Echos » défendaient l'économie marxiste, je serais extrêmement gêné.", "Bernard Arnault, French Senate inquiry on media concentration, 2022, as headlined by Le Nouvel Obs. In English: if Les Echos defended Marxist economics tomorrow, I would be extremely embarrassed.", "obssenate"),
    p("LVMH is also among the biggest advertisers in the French print press. That gives him a second lever, and we cover how he has used it in the next chapter. It is one reason his critics say he has too much power, and he points to the Le Monde series itself as proof that he cannot silence anyone.", "ina", "wwdletter"),
    h("How different countries see him"),
    p("In **France** he is admired and resented in the same breath. He is the country's richest person, its great exporter, and a constant target. “En France, quand on réussit un peu, immédiatement on est critiqué,” he says. In France, succeed a little and you are criticised at once. In 2025, 86% of those polled backed the wealth tax he attacked. He also says the group has paid €40 billion to the French state over the years, and he makes the case often.", "legend", "bfm", "telegraphz", "wwdletter"),
    p("In **America** the mood is warmer, and he likes it. Trump praised him in Texas in 2019 as “a visionary” and “an artist, really”. Arnault says he has known Trump since his New York days in the 1980s and calls him a friend. In September 2024 he and Alexandre went to dinner at Trump's Florida home on the very day of the second assassination attempt. Trump, he says, greeted their sympathy with “Two to zero.”", "wwdtexas", "legend", "wwdlegend"),
    n("Same man, two countries. Home is rarely your easiest audience."),
    p("In **China**, what matters most is the customers. He first visited in 1992 and got in early. LVMH has since built its fortune partly on Chinese shoppers, which is why the slowdown there hurts so much. The numbers are in the last chapter.", "bbg", "founders", "q326"),
    h("And in India"),
    p("Indian readers mostly know him through two stories: a rich list, and a rent bill. In 2023 lease papers from Reliance's Jio World Plaza in Mumbai showed Louis Vuitton paying about ==₹40.5 lakh a month== for 7,365 square feet, its biggest store in India. Indian media loved the framing of one billionaire paying rent to another. One headline in 2025 simply read: “This man pays Rs 40 lakh to Mukesh Ambani per month”.", "reutersjio", "fe", "indiacom", "mint"),
    facts(
      ["₹40.5 lakh", "Louis Vuitton's reported monthly rent at Jio World Plaza", "fe", "indiacom"],
      ["30 Mar 2023", "Dior shows its fall line at the Gateway of India", "bl"],
      ["3", "Louis Vuitton stores in India in 2022, two decades after its first", "mint"],
      ["About $5bn", "Euromonitor's 2022 estimate of India's luxury market within five years", "mint"]
    ),
    p("The big moment was Dior's show at the Gateway of India on 30 March 2023, the first time a fashion house had unveiled a new line in the country. Models walked over marigolds. Isha Ambani and Radhika Merchant were among the guests, and Mumbai's Chanakya ateliers were put in the spotlight. Bloomberg pointed out the deeper shift: Indian hands had worked for European luxury for years, largely out of view.", "bl", "ht", "bbgindia"),
    p("India also came up in one of his sharpest complaints about France. In 2013, angry at his treatment at home, he told Le Monde: “Mr Tata is a star in India, like Warren Buffett in the United States.” His point was that those countries celebrate their entrepreneurs, while “in France we condemn wealth”. For a young Indian founder it is worth seeing yourself through his eyes. __From Paris, India looked like a place that loves its builders.__", "arabnews"),
    n("Remember this line the next time someone tells you India hates ambition."),
  ],
};
