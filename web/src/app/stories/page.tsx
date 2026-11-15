import type { Metadata } from "next";
import { storySectors } from "@/lib/content";

export const metadata: Metadata = { title: "Real Stories" };

export default function StoriesPage() {
  const total = storySectors.reduce((n, s) => n + s.stories.length, 0);
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Real Stories</p>
      <h1 className="mt-2 font-display text-5xl font-extrabold tracking-tight">How real founders did it</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Long-form, verified stories, mistakes included. This is the launch backlog of {total} stories across{" "}
        {storySectors.length} sectors. Each will get its own page.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {storySectors.map((s) => (
          <section key={s.slug} className="rounded-2xl border border-line bg-paper p-5">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-xl font-bold">{s.sector}</h2>
              <span className="font-mono text-xs text-muted">{s.stories.length} STORIES</span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.stories.map((st) => (
                <li
                  key={st.company}
                  className="rounded-lg border border-line bg-canvas px-3 py-1.5 text-sm"
                  title={st.founder ?? undefined}
                >
                  <span className="font-medium">{st.company}</span>
                  {st.founder && <span className="text-muted"> · {st.founder}</span>}
                  {st.failureStudy && (
                    <span className="ml-1.5 rounded bg-stone-200 px-1 font-mono text-[0.62rem] text-stone-600">FAILURE STUDY</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
