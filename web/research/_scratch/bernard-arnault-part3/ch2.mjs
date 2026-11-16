const p = (text, ...src) => ({ t: "p", text, src });
const n = (text) => ({ t: "note", text });
const h = (text) => ({ t: "h", text });
const q = (text, who, ...src) => ({ t: "quote", text, who, src });
const ex = (text, ...src) => ({ t: "example", text, src });

export const mindset = {
  id: "mindset",
  kicker: "What he believes",
  title: "Seven Rules He Won't Bend",
  blocks: [
    p("Arnault has spent most of his life refusing to explain himself. “Why give out information?” he joked in 2026, when a podcast host complained how little is known about him. But across a Harvard interview in 2001, a long podcast in 2026 and a WWD interview that October, the same few ideas keep coming back. Here are seven of them, each with the story behind it.", "bi26", "legend", "hbr", "wwd26"),
    h("1. Make the product. Don't ask the customer."),
    p("Arnault once gave a talk to the young marketing team at Louis Vuitton, and he says the boss of the brand was rather embarrassed afterwards. His message to a room full of marketers was that they should not do marketing. Market studies are for supermarket goods, he told them. At this level, the customer follows the product, and you almost have to teach them how to use it.", "legend", "bi26"),
    q("You must not do marketing. You must create, and it's your products that must impose themselves.", "Bernard Arnault, Legend podcast, 2026, as translated by Business Insider", "bi26", "legend"),
    p("He has been saying this for 25 years. In 2001 he told Harvard Business Review about J'adore, the Dior perfume launched in 1999. People in focus groups said it was fine, just that. It then became, by LVMH's own estimate, one of the top three sellers in the world. Kenzo's Flower did the same. Testers did not know what to make of the bottle or of a poppy, a flower with no scent, yet the Kenzo fragrance group's sales rose 75% in six months.", "hbr"),
    q("That's why you should listen to focus groups with only one ear.", "Bernard Arnault, Harvard Business Review, 2001", "hbr"),
    n("Careful. This works for hit products, not for every start-up. Test your assumptions."),
    h("2. Total freedom in the studio. Total discipline in the factory."),
    p("Two years before that HBR interview, John Galliano sent models down the Dior couture runway in dresses made of newspaper. Most bosses would have stopped him. Arnault did not flinch, and the audience gasped. Dior never planned to sell the paper version. It remade the idea in printed fabric, and that sold well.", "hbr"),
    p("Then walk from the studio to the workshop. There, he says, every motion is planned, and a single purse can involve up to ==1,000 manufacturing tasks==. He compared it to the most modern car plants. __The creative part may be chaos, but the part that makes the money is engineering.__ This is the Polytechnique graduate showing up. He says his schooling taught him rigour and how to simplify a hard problem, and he credits his maths professor Laurent Schwartz for showing how clearly a hard subject can be explained.", "hbr", "wwd26", "legend"),
    q("I don't have alarm bells when it comes to creativity.", "Bernard Arnault, Harvard Business Review, 2001", "hbr"),
    h("3. Think in ten years, not ten weeks."),
    p("“What I have in mind every morning is that the desirability of a brand should be as strong in ten years,” he told Forbes in 2019. When luxury spending was slowing in 2024, he told Bloomberg that what he had in mind was 2030. In April 2026, with the shares down about a quarter that year, he told shareholders that what counts is where the group will be in five years.", "forbes19", "bbg", "founders", "vogueagm", "fuagm"),
    ex("For example: in 1992 he flew to China for the opening of a Louis Vuitton shop in the basement of a Beijing hotel. There were no cars, he recalled, and not even hot water in the hotel. People on the street all wore the same Mao suits. He rang Vuitton's chief and asked if they were sure they would sell anything. The answer was a firm yes. By 2024 China was LVMH's second-biggest country by sales.", "bbg", "founders"),
    p("Long-term thinking also means seeing what friends cannot. When he took control of LVMH, an investor friend told him Louis Vuitton was already at its peak, because you saw the bags everywhere. Arnault's answer was that his friend only saw the bags in smart Paris circles. Vuitton was not yet in China, had very limited distribution in the US, and the whole world market was opening up.", "legend"),
    n("“Everyone already has one” usually means everyone you know has one."),
    h("4. Stay permanently dissatisfied."),
    p("You have already seen this in his meetings. He describes it as a duty. “You must also remain permanently dissatisfied, question yourself constantly, seek out and listen to contradictory views rather than assume you are always right,” he told WWD at 77. He gives the same warning about bosses who think they are always right. Being at the top, he says, is exactly when you need people to argue with you.", "wwd26", "legend"),
    p("It runs in the family. When his grandfather died in June 1959, he put his good school marks into the coffin, because the old man had always watched them so closely. He was ten. His grandmother, franceinfo reports, kept repeating: “Le prix d'excellence, ou rien !” First prize, or nothing. It is not a relaxing way to grow up, and it is hard to separate his success from it.", "legend", "wwdlegend", "finfo"),
    h("5. Treat a giant as if it were a start-up."),
    p("LVMH has about 220,000 employees and he still tells new recruits to think of it as a start-up. He means it mainly as a war on paperwork. Bureaucracy, papers, reports and regulations slow you down, he says, and you cannot go fast if you are buried in documents that usually serve no purpose.", "legend", "wwd26", "wwdletter"),
    q("The idea matters, but anyone can have an idea; what matters most is the execution of that idea.", "Bernard Arnault, to WWD, October 2026", "wwd26"),
    p("He gave a nice example to young founders in the same year. When Facebook started, he said, dozens of others were doing almost the same thing with student directories. Only one team made it work. __The idea got dozens of people started. Execution picked the winner.__", "legend"),
    n("Very important for first-time founders! Ideas are cheap. Doing it well isn't."),
    h("6. If it isn't fun, you won't last."),
    p("At 77, with a fortune counted in the hundreds of billions at its peak, why keep going? His answer is always the same. “Every morning I have fun when I arrive,” he told Bloomberg. In 2026 he said the same in French, adding that working while having fun “permet de travailler beaucoup sans souffrir”: it lets you work a lot without suffering.", "fortune24", "bbg", "legend"),
    p("It is also why he says he would never go into politics. He lacks the patience and the vocation, he says, and politics means compromises in every direction. He prefers what he does, because it is “très amusant”. When he names the first rule for anyone starting a company, it is the same point: be passionate about the field, and want to work in it.", "legend", "bfm"),
    h("7. Expect the banker's call. Then hold on."),
    p("In 1959 his grandfather died, and the banks began to ask whether they should keep lending to the family firm. His father cancelled the family's seaside holiday that summer and stayed behind. Arnault was ten, and he says it stuck with him, even though it never happened to him later. Decades on, this is the advice he gives founders.", "legend"),
    q("Il faut pas se décourager. La première difficulté, la première fois où le banquier vous appelle en vous disant : ouh là là, attention, le crédit est trop important. Il faut, il faut résister.", "Bernard Arnault, Legend podcast, 2026. In English: don't get discouraged the first time the banker rings to say your credit is too high. You have to hold on.", "legend"),
    p("Asked to name the one quality you need to last in business, he laughed: “Je crois qu'il faut être persévérant.” Be persistent. He pairs it with patience, which he told shareholders is always needed in business, and with some honesty about luck. His early adviser Antoine Bernheim used to say the secret was being in the right place at the right time.", "legend", "vogueagm", "wwd26"),
    ex("For example: his team once wrote off a stake in a US tech fund as lost. When the fund was wound up, it simply posted its shares back to investors, and he received a good pile of a little-known company called Google. It paid off handsomely. It was, he laughed, “une bonne affaire dans laquelle on n'est absolument pour rien”: a good deal we had absolutely nothing to do with.", "legend"),
    n("Rare, this. A billionaire admitting that one of his wins was pure luck."),
  ],
};
