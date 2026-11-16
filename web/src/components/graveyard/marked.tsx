import { marks } from "@/content/graveyard/labels";

/** Renders "**phrase**" as a highlighter stroke that sweeps in as it scrolls into view. */
export function Marked({ text }: { text: string }) {
  return (
    <>
      {marks(text).map((m, i) =>
        m.hi ? (
          <mark key={i} className="au-mark">
            {m.t}
          </mark>
        ) : (
          m.t
        ),
      )}
    </>
  );
}
