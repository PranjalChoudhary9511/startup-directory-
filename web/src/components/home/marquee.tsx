import { MARQUEE_HEADING, MARQUEE_ROWS, type MarqueeItem } from "@/content/marquee";

const STYLE: Record<MarqueeItem["style"], string> = {
  plain: "text-[13px] font-medium",
  serif: "font-serif text-[23px] leading-none",
  bold: "text-[21px] font-extrabold tracking-[-0.04em]",
  mono: "font-mono text-[17px] font-semibold tracking-[-0.03em]",
  italic: "text-[20px] font-bold italic tracking-[-0.03em]",
  caps: "text-[17px] font-semibold tracking-[0.18em]",
};

function Item({ item }: { item: MarqueeItem }) {
  return (
    <span className="flex h-11 shrink-0 items-center gap-2.5 px-4">
      {item.mark && (
        <span
          aria-hidden
          className="grid h-[22px] w-[22px] place-items-center rounded-[6px] text-[12px] font-bold text-white"
          style={{ background: item.color ?? "#272727" }}
        >
          {item.mark}
        </span>
      )}
      <span className={`whitespace-nowrap ${STYLE[item.style]}`} style={item.mark ? undefined : { color: item.color ?? "#272727" }}>
        {item.name}
      </span>
    </span>
  );
}

export function LogoMarquee() {
  return (
    <section className="pt-10 pb-12 md:pt-12 md:pb-16" aria-labelledby="marquee-title">
      <h2 id="marquee-title" className="text-center font-mono text-[12px] font-medium tracking-[0.16em] text-fg2 uppercase">
        {MARQUEE_HEADING}
      </h2>
      <div className="mt-6 flex flex-col gap-3">
        {MARQUEE_ROWS.map((row, r) => (
          <div key={r} className="marquee">
            <div
              className={`marquee-track ${row.reverse ? "is-reverse" : ""}`}
              style={{ "--marquee-duration": row.duration } as React.CSSProperties}
            >
              {/* Two identical sequences make the -50% loop seamless. */}
              {[0, 1].map((copy) => (
                <div key={copy} className="marquee-sequence" aria-hidden={copy === 1 || undefined}>
                  {row.items.map((item) => <Item key={item.name} item={item} />)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
