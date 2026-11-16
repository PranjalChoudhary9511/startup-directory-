def apply(path, pairs):
    s = open(path, encoding='utf8').read()
    for a, b in pairs:
        assert a in s, a[:70]
        s = s.replace(a, b)
    open(path, 'w', encoding='utf8').write(s)


apply('ch2.js', [
    ("That same year showed how badly a young founder can handle experienced people.", "Around then he also showed how badly a young founder can handle experienced people."),
    ("Reporters at the time questioned whether he could share control at all.", "Some people at the time questioned whether he could share control at all."),
    ("this was a shameful place to end up.", "this was an embarrassing place to end up."),
    ("Worse, it had bought its growth through retail stores that paid it almost nothing.", "Worse, much of that growth came through retail stores, where it was making no money."),
    ("Meredith said he saw a silver lining in the notebook disaster, because it had exposed how weak the company's information systems were. Dell had no way to see profit clearly, and Meredith set about changing that. His order of priority was simple: liquidity first, then profitability, then growth.`, 'f95', 'cfo98', 'sb'),",
     "Meredith said he saw a silver lining in the notebook disaster, because of what it had revealed about the company's information systems. Dell had not yet been breaking down profit by business segment, and it was time to look. Meredith's message was simple: growth had to be balanced with cash in the bank and real profit.`, 'f95', 'cfo98', 'sb', 'encmd'),"),
    ("He gave up authority to keep the company, and that is the opposite of what he did with the Tandy team five years earlier.", "He gave up authority to keep the company, the opposite of what happened with the Tandy team a few years earlier."),
    ("The cure was boring. Dell left retail. It cut its product focus. It began tracking cash and return on invested capital, and tied the pay of its top managers to those numbers.", "The cure was boring. Dell left retail. It began tracking cash and return on invested capital, and tied the pay of its top 500 managers to those numbers."),
    ("['1989', 'Too many old memory chips. Olympic is cancelled.', ['encmd', 'hemi']],", "['1989', 'Too many old memory chips. Olympic is shown, and customers shrug.', ['encmd', 'hemi']],"),
    ("In 1992, Compaq fought back with a PC at just $899,", "In the early 1990s, Compaq fought back with a PC at just $899,"),
    ("That year he also gave the most famous bad answer in tech history.", "That October he also gave one of the most famous bad answers in tech history."),
    ("Dell later said the line was misunderstood: he had refused the question twice, and meant only that he could not imagine running any company but his own. Both of them said they stayed friends.", "Dell later said the line was misunderstood: he had first declined the question, and meant only that he could not imagine running any company but his own. He says the two stayed friends."),
    ("Under the surface, a problem had been growing. Intel was paying Dell large sums to use only Intel chips and not those of its rival AMD. Those payments rose", "Under the surface, a problem had been growing. The Securities and Exchange Commission later alleged that Intel was paying Dell large sums not to use chips from its rival AMD. By the SEC's count, those payments rose"),
    ("Investors were not told. According to the Securities and Exchange Commission, these payments were what let Dell meet Wall Street's targets, not its management and operations. Without them, the SEC said, Dell would have missed its earnings target in every quarter from fiscal 2002 to 2006. When Dell added AMD, Intel cut the payments and profits sank. The SEC says that executives then blamed pricing and component costs when speaking to investors.",
     "The SEC alleged that investors were not told, and that these payments, rather than management and operations, let Dell meet Wall Street's targets. Without them, it said, Dell would have missed its earnings target in every quarter from fiscal 2002 to 2006. When Dell added AMD, Intel cut the payments and profits sank. The SEC said executives then blamed pricing and component costs when speaking to investors."),
    ("He stayed as CEO, with no restrictions on serving.`, 'seclr', 'dsec', 'reuters84'),", "He accepted a court order against future violations and stayed as CEO, with no restrictions on serving.`, 'seclr', 'dsec'),"),
    ("At least 11.8 million computers were at risk, according to a lawsuit that accused it of hiding the defects. Dell disputed the charge and settled in September 2010 on undisclosed terms. Customers faced long waits to reach support, up to 30 minutes on the phone.",
     "At least 11.8 million computers made from 2003 to 2005 were at risk of failing, and one customer's lawsuit accused Dell of hiding the defects. Dell disputed that and settled in September 2010 on undisclosed terms. Meanwhile, customers were waiting 30 minutes to reach a support agent on the phone."),
    ("In 2007, Dell went back into Walmart and other shops, which he had walked out of in 1994.", "In 2007, Dell went back into retail stores, which it had walked out of in 1994."),
    ("cutting 1,900 of 3,000 jobs in Limerick, Ireland, where it had been the country's largest exporter. In October 2009 it closed its North Carolina plant, with 905 jobs lost.", "cutting 1,900 of 3,000 jobs in Limerick, Ireland, a country where it ranked itself the largest exporter. In October 2009 it said it would close its North Carolina plant, with 905 jobs lost."),
    ("It stopped building every PC to order, and began handing manufacturing to contract makers.", "It moved away from building every PC to order, and looked to partners for more of its assembly."),
    ("'nyt07', 'kiosk08', 'chron08', 'cw07'),", "'nyt07', 'kiosk08', 'chron08', 'cw07', 'iw08'),"),
])

apply('ch3.js', [
    ("note(`Tell the board first, before the bankers. It later saved him in court.`),", "note(`Tell the board first, before the bankers. Process matters when the lawyers come.`),"),
    ("__Founders forget this, but the people working for your investors can say no to you, and sometimes they should.__", "__A good board works for the shareholders, not the founder, and sometimes its job is to tell him no.__"),
    ("The rest of the original $24.4 billion came mostly from new borrowing of about $13.75 billion, plus Dell's own cash.", "The rest of the original $24.4 billion came mostly from new borrowing of about $13.75 billion, plus other cash."),
    ("and Icahn was the most feared of them all.", "and Icahn was one of the most feared."),
    ("Dell walked through Manhattan to Icahn's apartment for dinner.", "Dell walked through Manhattan to Icahn's home for dinner."),
    ("Then he joked that if Icahn won, he would go to Hawaii, lose twenty pounds, and come back to buy Dell for $8 a share.", "Then he told him that if Icahn won, he would go to Hawaii, lose twenty pounds, and come home to buy Dell back for $8 a share."),
    ("Here is the part almost nobody knows. On 2 August,", "Here is a detail buried in the court record. On 2 August,"),
    ("The Delaware court record shows who paid for that bump. Michael Dell did,", "The Delaware court opinion shows who paid for that bump. Michael Dell did,"),
    ("__He paid everyone else more by accepting less himself, because control was the prize and the price was the toll.__", "__He paid everyone else more by accepting less himself. Control was worth more to him than the difference.__"),
    ("A week after that letter, the vote finally passed,", "Three days after that letter, the vote finally passed,"),
    ("He said the sale process had been good but the price had been held down by the way buyout firms value companies, and by the gap between the market's view and Dell's real prospects.`, 'chan16', 'sup17'),",
     "He said the sale process had been thorough, but that the price had been held down by the way buyout firms value companies, and by the gap between the market's view and Dell's real prospects.`, 'chan16', 'sup17', 'wsgr'),"),
    ("So the highest court rejected the higher figure, and he was never found to have broken the rules. But honest experts disagreed for years about whether he bought his company cheaply. The stock's later rise is why that argument stays alive.`, 'sup17', 'rlf17'),",
     "So the highest court rejected the higher figure, and even the trial judge had said the process would not support a claim that its leaders broke their duties. But honest experts disagreed for years about whether he bought his company cheaply. The stock's later rise is why that argument stays alive.`, 'sup17', 'rlf17', 'wsgr'),"),
    ("The shares began trading on 28 December 2018. The case did not end there. A shareholder lawsuit over the deal was settled for ==$1 billion== in November 2022, just before trial. The Delaware Supreme Court upheld a $266.7 million legal fee from that settlement in August 2024.`, 'd18n', 'r18n', 'crn18', 'q22', 'sup24', 'quinn', 'r24'),",
     "The shares began trading on 28 December 2018.`, 'd18n', 'r18n', 'crn18', 'q22'),\n    p(`The case did not end there. Shareholders sued, claiming the deal had short-changed them, and it was settled for ==$1 billion== in November 2022, a month before trial, so no court ruled on the claim. The Delaware Supreme Court upheld a $266.7 million legal fee from that settlement in August 2024. __When you hold all the power in a deal, expect to defend the price for years afterwards.__`, 'sup24', 'quinn', 'r24'),"),
    ("By August 2021, the remaining company was worth $75 billion, and Forbes counted over $40 billion of gains for him, Silver Lake and co-investors, with his own fortune near $50 billion.", "By August 2021, Forbes valued Dell Technologies at $75 billion, more than four times its value before going private. It counted over $40 billion of gains for him, Silver Lake and co-investors, with his own fortune near $50 billion."),
    ("His fortune had gone up by well over $100 billion in about eight months, without any new company or product launch from him personally.", "His fortune had gone up by well over $100 billion in about eight months, nearly all of it because the market had changed its mind about one stock."),
    ("['About $115B', 'the rest of the Forbes figure, as of 2 Nov 2026 (our arithmetic)', ['fbp', 'proxy26', 'sa']],", "['About $116B', 'the rest of the Forbes figure, as of 2 Nov 2026 (our arithmetic)', ['fbp', 'proxy26', 'sa']],"),
    ("We could not confirm how much of that he still holds, and DFO does not publish its accounts.", "We could not confirm how much of that he still holds, and DFO is a private firm."),
    ("__He got richest by buying more of his own company at the exact moment everyone else wanted out.__", "__He got richest by buying more of his own company at the moment most of the market wanted out.__"),
    ("['Oct 2025', 'Forbes 400 estimate: $97.7 billion.', ['yh1014']],", "['2025', 'Forbes 400 estimate: $97.7 billion.', ['yh1014']],"),
])

apply('factcheck.js', [
    ("The $113 billion stake value and the roughly $115 billion remainder", "The $113 billion stake value and the roughly $116 billion remainder"),
    ('The text says he "was never found to have broken the rules", which relies on the Chancery finding that the process was sound and on Icahn\'s and Southeastern\'s withdrawal of their appraisal demands. Writers should treat the fairness of the price as debated, as we do.',
     "The text says the trial judge found the process would not support a claim that the company's leaders broke their duties, relying on Wilson Sonsini's summary of the 2016 opinion. Writers should treat the fairness of the price as debated, as we do."),
])

apply('sources.js', [
    ('  pundit:', '  wsgr: ["Wilson Sonsini: Delaware Supreme Court Issues Important Opinion in Dell Appraisal Case, 15 December 2017", "https://www.wsgr.com/en/insights/delaware-supreme-court-issues-important-opinion-in-dell-appraisal-case.html"],\n  iw08: ["InfoWorld: Dell ironing out kinks in supply chain, executive says, 3 April 2008", "https://www.infoworld.com/article/2166973/dell-ironing-out-kinks-in-supply-chain-executive-says.html"],\n  pundit:'),
])
print('patched')
