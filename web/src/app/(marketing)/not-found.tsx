import Link from "next/link";

// notFound() inside the marketing pages: the layout already renders the header.
export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-5 py-24 text-center">
      <div>
        <p className="mono-eyebrow">404</p>
        <h1 className="accent-display mt-3 text-3xl">Page not found.</h1>
        <p className="mt-4 text-[14px] text-fg2">This page doesn&apos;t exist (yet). Try the stories, or start with the first track.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/stories" className="btn-primary is-sm">See the stories</Link>
          <Link href="/" className="btn-secondary !h-10 !px-4">Home</Link>
        </div>
      </div>
    </div>
  );
}
