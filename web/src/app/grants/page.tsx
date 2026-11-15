import type { Metadata } from "next";
import { GrantsDirectory } from "@/components/GrantsDirectory";
import { grants } from "@/lib/content";

export const metadata: Metadata = {
  title: "Grants & schemes",
  description: "Government, state and private startup grants, loans and programmes for Indian founders.",
};

export default function GrantsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Free directory</p>
      <h1 className="mt-2 font-display text-5xl font-extrabold tracking-tight">Grants &amp; schemes</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Central and state schemes plus private programmes for Indian founders. Seed data from the research doc:
        always confirm amounts and deadlines on the official site.
      </p>
      <GrantsDirectory grants={grants} />
    </div>
  );
}
