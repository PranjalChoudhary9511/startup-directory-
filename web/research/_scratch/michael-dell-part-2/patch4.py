def apply(path, pairs):
    s = open(path, encoding='utf8').read()
    for a, b in pairs:
        assert a in s, a[:70]
        s = s.replace(a, b)
    open(path, 'w', encoding='utf8').write(s)


apply('factcheck.js', [
    ("Early finance comes from Harvard Business School case 9-801-363, read in full as a PDF, and the International Directory of Company Histories. First-person material comes from the Tim Ferriss transcript, read in full, and Michael Dell's Hemispheres article. Quotes from those sources were copied from the page text.",
     "Early finance comes from Harvard Business School case 9-801-363, downloaded as a PDF and read in the relevant passages, and the International Directory of Company Histories. First-person material comes from the relevant passages of the Tim Ferriss transcript, whose quotes were machine-checked against the page text, and from excerpts of Michael Dell's Hemispheres article."),
    ("Reddit, forums and social posts were not used as evidence.",
     "Reddit, forums and social posts were not used as evidence. The research tools ran out before a last round of checks, so three things need a recheck: the battery-recall ranking below, the wording of Fortune's 1995 Heathrow passage, of which we saw only part, and the Forbes and Reuters excerpts."),
    ("{ claim: `Battery recall size.`, note: `Most reports say 4.1 million batteries; InfoWorld says 4.2 million. We use about 4.1 million.",
     "{ claim: `Battery recall size and rank.`, note: `Most reports say 4.1 million batteries; InfoWorld says 4.2 million. We use about 4.1 million. The statement that the US safety regulator called it the largest electronics recall it had handled comes from search summaries of August 2006 reports; the BetaNews and eWeek pages refused automated reading, so a fact-checker should confirm it on the regulator's site."),
])
apply('ch2.js', [
    ("'bn06', 'nyt07', 'cw06', 'cnbc07'),", "'bn06', 'ew06', 'nyt07', 'cw06', 'cnbc07'),"),
])
apply('sources.js', [
    ('  pundit:', '  ew06: ["eWeek: Dell to Recall Millions of Laptop Batteries, August 2006", "https://www.eweek.com/pc-hardware/dell-to-recall-millions-of-laptop-batteries/"],\n  pundit:'),
])
print('patched')
