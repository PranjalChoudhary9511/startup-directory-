import { ArrowRight, NotePencil } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { BrandNotes } from "@/content/stories/notes";
import { alpha, onColor } from "@/content/stories/notes-color";

/** The brand-coloured tab under the video that opens the company's notes. */
export function NotesButton({ slug, company, notes }: { slug: string; company: string; notes: BrandNotes | undefined }) {
  if (!notes) {
    return (
      <span className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full border border-dashed border-line-strong px-4 text-[13px] text-fg3">
        <NotePencil size={15} /> Notes coming soon
      </span>
    );
  }
  const { primary, accent } = notes.palette;
  const on = onColor(primary);
  const face = notes.founder.portrait;
  return (
    <Link
      href={`/stories/${slug}/notes`}
      className="group inline-flex h-12 shrink-0 items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5 transition-transform duration-300 hover:-translate-y-0.5"
      style={{ background: primary, color: on, boxShadow: `0 14px 30px -14px ${alpha(primary, 0.9)}, inset 0 0 0 1px ${alpha(accent, 0.6)}` }}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full" style={{ background: accent, color: onColor(accent) }}>
        {face ? (
          // eslint-disable-next-line @next/next/no-img-element -- Wikimedia Commons portrait (credited on the notes page)
          <img src={face.url} alt="" className="h-full w-full object-cover object-[50%_25%]" referrerPolicy="no-referrer" />
        ) : (
          <NotePencil size={16} weight="bold" />
        )}
      </span>
      <span className="leading-tight">
        <span className="block text-[14px] font-semibold">Read the {company} notes</span>
        <span className="block text-[11px] opacity-75">Founder life map · failures · lessons</span>
      </span>
      <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
