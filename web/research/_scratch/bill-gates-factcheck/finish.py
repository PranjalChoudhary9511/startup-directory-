import json,sys
sys.stdout.reconfigure(encoding='utf-8',errors='replace')
P='../../../src/content/billionaires/books/bill-gates.json'
b=json.load(open(P,encoding='utf8'))
# small wording fix
for x in b['chapters'][5]['blocks']:
    if x['t']=='p' and x['text'].startswith('The company was starving'):
        x['text']="The company was starving, and one history says it was on the verge of bankruptcy until one of its own programmers, Bob Greenberg, lent it money. The same history says Gates's own father, a lawyer, argued the key point. __Everything now rested on one line in the contract.__"
b['factCheck']['method']=("Four writers working in parallel drafted this book from sources they opened in October and November 2026, and a separate checker then re-read it claim by claim against pages the checker opened itself, which led to corrections such as a spliced Harvard quote, Gates's age at his first contract and the number of states that sued Microsoft. "
 "Photo licences, authors and captions were checked through the Wikimedia Commons API, and every contact and social link was checked against the page that publishes it; the Instagram account is confirmed by the platform's verified badge and GeekWire rather than a Gates Foundation link. "
 "Some pages blocked direct reading or were paywalled, so these were read only in part or not reopened by the checker: several New York Times, Wall Street Journal, Reuters, AP, Bloomberg, Financial Times and Toronto Star articles, Barron's and Nasdaq, and the full House transcript, which was checked through GeekWire, CBS, CNN and CNBC reports; their claims were kept only where they matched other sources or a readable extract. "
 "Paul Allen's book Idea Man could not be opened, so claims that rested on it alone were removed, and his account comes from his Vanity Fair adaptation.")
# prune uncited sources and remap
used=set()
def walk(v):
    if isinstance(v,list):
        for x in v: walk(x)
    elif isinstance(v,dict):
        for k,x in v.items():
            if k in('src','hookSrc') and isinstance(x,list): used.update(x)
            else: walk(x)
walk({k:v for k,v in b.items() if k!='sources'})
keep=sorted(used); M={o:n for n,o in enumerate(keep)}
dropped=[b['sources'][i]['url'] for i in range(len(b['sources'])) if i not in used]
def remap(v):
    if isinstance(v,list): return [remap(x) for x in v]
    if isinstance(v,dict):
        return {k:([M[i] for i in x] if k in('src','hookSrc') and isinstance(x,list) else remap(x)) for k,x in v.items()}
    return v
src=b['sources']
nb=remap({k:v for k,v in b.items() if k!='sources'})
nb['sources']=[src[i] for i in keep]
order=['slug','name','verifiedAt','title','subtitle','hook','hookSrc','portrait','photos','glance','contact','chapters','lessons','sources','factCheck']
out={k:nb[k] for k in order if k in nb}
json.dump(out,open(P,'w',encoding='utf8',newline='\n'),ensure_ascii=False,indent=2)
open(P,'a',encoding='utf8',newline='\n').write('\n')
print('sources',len(src),'->',len(keep));print('\n'.join(dropped))
