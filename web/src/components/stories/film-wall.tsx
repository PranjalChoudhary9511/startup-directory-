import Image from "next/image";
import { thumb } from "@/content/stories/labels";

/** Two rows of real film thumbnails drifting in opposite directions on a tilted 3D plane. */
export function FilmWall({ ids }: { ids: string[] }) {
  if (ids.length < 6) return null;
  const half = Math.ceil(ids.length / 2);
  const rows = [ids.slice(0, half), ids.slice(half)];
  return (
    <div className="film-wall" aria-hidden>
      <div className="film-plane">
        {rows.map((row, r) => (
          <div key={r} className="marquee">
            <div className={`marquee-track ${r ? "is-reverse" : ""}`} style={{ "--marquee-duration": r ? "140s" : "120s" } as React.CSSProperties}>
              {[0, 1].map((copy) => (
                <div key={copy} className="marquee-sequence">
                  {row.map((id) => (
                    <span key={id + copy} className="film-frame">
                      <Image src={thumb(id)} alt="" fill sizes="240px" className="object-cover" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
