import { Play } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { collectionMeta, runtime, thumb, type StoryCard as Card } from "@/content/stories/labels";
import { WatchedTick } from "./watched";

/** Clean film card: thumbnail, company, one-line hook, quiet meta line. */
export function StoryCard({ s, n, size = "md" }: { s: Card; n?: number; size?: "md" | "lg" }) {
  const c = collectionMeta(s.collection);
  const time = runtime(s.lead.minutes);
  return (
    <Link href={`/stories/${s.slug}`} className="story-card group block">
      <div className="story-thumb relative aspect-video overflow-hidden rounded-[14px] bg-[#111]">
        <Image
          src={thumb(s.lead.youtubeId)}
          alt=""
          fill
          sizes={size === "lg" ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 300px, 80vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
        {n !== undefined && (
          <span className="absolute top-3 left-3 rounded-full bg-white/92 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.08em] text-[#1d1d1d] backdrop-blur">
            EP {String(n).padStart(2, "0")}
          </span>
        )}
        <span className="absolute top-3 right-3">
          <WatchedTick slug={s.slug} />
        </span>
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 font-mono text-[10.5px] text-white/90">
          {time && <span className="rounded-md bg-black/55 px-1.5 py-0.5 backdrop-blur">{time}</span>}
          {s.lead.language === "hi" && <span className="rounded-md bg-black/55 px-1.5 py-0.5 backdrop-blur">HINDI</span>}
        </span>
        <span className="absolute right-3 bottom-3 grid h-10 w-10 scale-90 place-items-center rounded-full bg-white text-[#1d1d1d] opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          <Play size={15} weight="fill" />
        </span>
      </div>
      <div className="mt-3 px-0.5">
        <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.08em] text-fg3 uppercase">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.tint }} />
          {s.sector || c.title}
        </p>
        <h3 className={`accent-display mt-1 leading-tight text-fg1 ${size === "lg" ? "text-[26px]" : "text-[19px]"}`}>{s.company}</h3>
        <p className={`mt-1 leading-snug text-fg2 ${size === "lg" ? "text-[15px]" : "line-clamp-2 text-[13.5px]"}`}>{s.hook}</p>
        <p className="mt-2 truncate text-[11.5px] text-fg3">
          {s.lead.channel}
          {s.films > 1 && ` · ${s.films} films`}
        </p>
      </div>
    </Link>
  );
}
