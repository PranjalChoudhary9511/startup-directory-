"use client";

import { ArrowRight, Check } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { CAUSES, type GraveCard } from "@/content/graveyard/labels";
import type { CauseKey } from "@/content/graveyard/schema";

function toggle(s: Set<number>, i: number) {
  const next = new Set(s);
  if (!next.delete(i)) next.add(i);
  return next;
}

/* ───────── On an autopsy: "would this flag fire in your startup?" ───────── */

export function RedFlags({ flags, name }: { flags: string[]; name: string }) {
  const [on, setOn] = useState<Set<number>>(new Set());
  const n = on.size;
  return (
    <div>
      <ul className="space-y-2">
        {flags.map((f, i) => (
          <li key={i}>
            <button
              type="button"
              role="checkbox"
              aria-checked={on.has(i)}
              onClick={() => setOn((s) => toggle(s, i))}
              className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-hover"
            >
              <span className="au-check">{on.has(i) && <Check size={13} weight="bold" />}</span>
              <span className="text-[15px] leading-snug">{f}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 min-h-[24px] px-3 text-[14px] text-fg2" aria-live="polite">
        {n === 0
          ? "Answer honestly for your own startup: tick every yes. Nobody sees this but you."
          : n === 1
            ? `One flag. ${name} had all of them. Fix this one while it's small.`
            : `${n} of ${flags.length} flags. ${name} had them too. Pick the cheapest one to fix this week.`}
      </p>
    </div>
  );
}

/* ───────── At dawn: a 2-minute pre-mortem for the reader's own startup ───────── */

const QUESTIONS: { q: string; cause: CauseKey }[] = [
  { q: "We lose money on each order, and plan to fix it “once we scale”.", cause: "unit-economics" },
  { q: "We have under 12 months of cash, and we spend more every month.", cause: "burn" },
  { q: "Fewer than 10 strangers have paid us, or promised to.", cause: "no-market" },
  { q: "People love it, but we don't know how it will make money.", cause: "business-model" },
  { q: "We're opening new cities or products before the first one works.", cause: "over-expansion" },
  { q: "One person decides everything, and nobody checks the numbers.", cause: "governance" },
  { q: "Our pitch numbers are “a little optimistic”.", cause: "fraud" },
  { q: "A much bigger company could copy us in six months.", cause: "competition" },
  { q: "Our business depends on a rule, licence or law that could change.", cause: "regulation" },
  { q: "The product works in the demo, but not every time in real life.", cause: "tech" },
  { q: "We need the next funding round to survive, and haven't started raising.", cause: "funding-dried" },
  { q: "We've changed direction more than twice this year.", cause: "focus" },
];

export function PreMortem({ graves }: { graves: Pick<GraveCard, "slug" | "name" | "cause" | "causes" | "died">[] }) {
  const [yes, setYes] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);
  const risks = QUESTIONS.filter((_, i) => yes.has(i)).map((x) => ({
    ...x,
    who: graves.filter((g) => g.cause === x.cause),
  }));

  return (
    <div className="gy-quiz-card p-6 sm:p-9">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mono-eyebrow">Pre-mortem · 2 minutes</p>
          <h3 className="mt-2 text-[24px] leading-tight font-semibold tracking-[-0.02em]">Which of these are true for you?</h3>
        </div>
        <span className="font-mono text-[11px] text-fg3">{yes.size} ticked</span>
      </div>

      <ul className="mt-6 grid gap-2 md:grid-cols-2">
        {QUESTIONS.map((x, i) => (
          <li key={i}>
            <button
              type="button"
              role="checkbox"
              aria-checked={yes.has(i)}
              onClick={() => (setDone(false), setYes((s) => toggle(s, i)))}
              className="flex h-full w-full items-start gap-3 rounded-xl border border-divider px-3.5 py-3 text-left text-[14px] leading-snug transition-colors hover:bg-hover aria-checked:border-[#f6cfca] aria-checked:bg-[#fdf3f1]"
            >
              <span className="au-check">{yes.has(i) && <Check size={13} weight="bold" />}</span>
              {x.q}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" className="btn-primary is-sm" onClick={() => setDone(true)}>
          Show my risks <ArrowRight size={14} />
        </button>
        {yes.size > 0 && (
          <button type="button" className="text-[13px] text-fg2 hover:text-fg1" onClick={() => (setYes(new Set()), setDone(false))}>
            Reset
          </button>
        )}
      </div>

      {done && (
        <div className="mt-8 border-t border-divider pt-6" aria-live="polite">
          {risks.length === 0 ? (
            <p className="text-[15px] leading-relaxed">
              <b>Nothing ticked.</b> Either you&apos;re in great shape, or you were kind to yourself. Ask your co-founder to answer the same twelve, then compare.
            </p>
          ) : (
            <>
              <p className="text-[15px] leading-relaxed">
                <b>
                  {risks.length} warning sign{risks.length > 1 ? "s" : ""}.
                </b>{" "}
                Every one of them is fixable today. The companies below found out too late. Read how it ended for them, then change the ending for you.
              </p>
              <ul className="mt-5 space-y-4">
                {risks.map((r) => (
                  <li key={r.cause} className="rounded-xl bg-chip px-4 py-3.5">
                    <p className="text-[14.5px] font-semibold">{CAUSES[r.cause].label}</p>
                    <p className="text-[13px] text-fg2">{CAUSES[r.cause].line}</p>
                    {r.who.length > 0 && (
                      <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[13px]">
                        <span className="text-fg3">Died of it:</span>
                        {r.who.slice(0, 5).map((g) => (
                          <Link key={g.slug} href={`/graveyard/${g.slug}`} className="underline decoration-line-strong underline-offset-2 hover:decoration-fg1">
                            {g.name} ({g.died})
                          </Link>
                        ))}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
