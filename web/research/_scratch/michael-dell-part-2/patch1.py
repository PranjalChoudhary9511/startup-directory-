import io
f='ch1.js'; s=open(f,encoding='utf8').read()
R=[
("Earlier denials of a deal made the March 2006 announcement a surprise. Forbes noted it was only Dell's third acquisition ever.","The deal, rumoured for weeks, was announced in March 2006. Forbes noted it was only Dell's third acquisition ever."),
("It also got its first machines using chips from AMD, which matters for the next chapter.","It also brought in machines using AMD chips, which Dell had resisted selling until then. That matters later in this book."),
("The kiosks had become pointless.","Dell said the need for them had declined."),
("By 2021 it had over 15,000 customers. Dell sold it","By 2021 it had more than 15,000 customers. Dell sold it"),
("src: ['r10', 'q22'],","src: ['r10', 'q22', 'boomi8k'],"),
("Dell named former CA chief John Swainson as software head in March 2012 with a mandate to expand. Software was meant to lift profits above those of PCs.","Dell named John Swainson as software chief in March 2012 with a mandate to expand. Software was meant to lift profit margins."),
("plus $750 million cash from him and his firm,","plus $750 million cash from him and an affiliate,"),
("src: ['chan16', 'f16', 'smg', 'dpr13', 'scwx', 'delltl'],","src: ['chan16', 'f16', 'smg', 'dpr13', 'scwx', 'delltl', 'q22'],"),
("Everyone else was breaking up: HP was splitting itself in two. Dell went the other way.","Rivals such as HP were shedding businesses. Dell went the other way."),
("src: ['fp16', 'f16', 'd15', 'd16', 'tc20'],","src: ['fp16', 'f16', 'd15', 'd16', 'tc20', 'r21', 'fb21b'],"),
("src: ['f16', 'r18', 'k21', 'r22b', 'crn22', 'k26', 'fb21a'],","src: ['f16', 'fp16', 'r18', 'k21', 'r22b', 'crn22', 'k26', 'fb21a'],"),
("A software-tools company carved out of EMC and VMware in 2013, with a $105 million investment from General Electric.","A software-tools company carved out of EMC and VMware in 2013, with General Electric buying about 10 percent."),
("src: ['pvtl', 'vmwp', 'tc19', 'k21'],","src: ['pvtl', 'vmwp', 'tc19'],"),
("It merged in January 2023 with BDT & Company, the merchant bank of Warren Buffett's former banker Byron Trott, with about $50 billion in assets combined. Michael Dell chairs the advisory board and does not run the firm.","It merged in January 2023 with BDT & Company, the merchant bank of Byron Trott, known as Warren Buffett's investment banker, with about $50 billion in assets combined. Trott and Gregg Lemkau became co-CEOs, and Michael Dell chairs the advisory board."),
("Dell has sold servers since 1996 and owned the supply chain, customer list and factories needed.","Dell launched its network server line in 1996 and already had the supply chain and customer list needed."),
("CoreWeave was another early customer.","CoreWeave expanded its relationship with Dell that December."),
("In the quarter to July 2026, orders were a record $60.9 billion, with a backlog of $95 billion waiting to be delivered.","In the quarter reported on 1 September 2026, orders were a record $60.9 billion, with a backlog of $95 billion waiting to be delivered."),
("src: ['idch', 't26', 'f24', 'd26fy', 'd26q2', 'qz26'],","src: ['idch', 't26', 'f24', 'dcore', 'd26fy', 'd26q2', 'qz26'],"),
("An office in New York, far from Texas. The Wall Street Journal found the \"quiet\" launch in December 1998, when he was 33.","An office in New York, far from Texas. The Wall Street Journal reported in December 1998 that he had quietly launched it."),
("His own money. The Journal reported $400 million at the start in a later account, and \"resources of $1 billion\" in 1998.","His own money. The Journal reported \"resources of $1 billion\" in 1998, and a later 2019 article put the start at $400 million."),
("He had met co-founder Roger McNamee on his IPO road show in the late 1980s. MSD became one of Silver Lake's early investors when it was raising its first fund.","He had met co-founder Roger McNamee on his IPO road show in the late 1980s, and knew the other founders too. One of MSD's first investments went into Silver Lake's first fund."),
("a stake CRN valued at about $6 billion.","a stake CRN said could bring it about $6 billion."),
("src: ['f16', 'crn22'],","src: ['f16', 'crn22', 'crnoff'],"),
("A much smaller, strategy-led fund restarted in 2012. Dell's venture arm, today called Dell Technologies Capital, led the first institutional round of the security firm Zscaler that same year.","A much smaller, strategy-led Dell fund restarted around 2012. After the EMC merger, EMC's own venture team became Dell Technologies Capital. That team led the first institutional round of the security firm Zscaler in 2012, and says it has invested more than $1.8 billion since."),
]
for a,b in R:
    assert a in s, a[:50]
    s=s.replace(a,b)
open(f,'w',encoding='utf8').write(s)
f='sources.js'; s=open(f,encoding='utf8').read()
add='''  boomi8k: ["Dell Technologies Inc., Form 8-K and press release: Francisco Partners and TPG to Acquire Boomi, May 2021", "https://investors.delltechnologies.com/static-files/07748710-15c8-4d1f-930b-6f1be1933c69"],
  crnoff: ["CRN: It's Official: Broadcom To Acquire VMware For $61B, May 2022", "https://www.crn.com/news/virtualization/it-s-official-broadcom-to-acquire-vmware-for-61-billion"],
  dcore: ["Dell Technologies: CoreWeave and Dell Technologies Extend Relationship to Deliver AI at Scale, 9 December 2024", "https://investors.delltechnologies.com/news-events/press-releases/detail/134/coreweave-and-dell-technologies-extend-relationship-to-deliver-ai-at-scale"],
  pundit:'''
assert '  pundit:' in s
s=s.replace('  pundit:',add,1)
open(f,'w',encoding='utf8').write(s)
print('ok')
