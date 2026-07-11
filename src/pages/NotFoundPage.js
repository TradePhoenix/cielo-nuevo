import { Link } from "react-router-dom";
import SEO from "../components/SEO";

// Catch-all route (see App.js's <Route path="*">). This app is a
// client-side-only SPA with no server-side rendering, so the actual HTTP
// response for any unmatched path is still whatever the static host returns
// (200, serving index.html) — that's a hosting-layer characteristic, not
// something fixable from inside the React tree without a deployment config
// change. What this page fixes is the part that was actually broken: a
// visitor landing on a bad link previously saw a completely blank page.
export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f4f0e8] px-6 py-24 text-center text-zinc-950 md:px-20">
      <SEO
        title="Page Not Found"
        description="This page doesn't exist — find your way back to Path To Mexico."
        path="/404"
      />

      <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Path To Mexico</p>

      <h1 className="mt-6 max-w-2xl text-5xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
        This page doesn't exist.
      </h1>

      <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-600">
        The link may be outdated, or the address may have been mistyped. Let's get you back on track.
      </p>

      <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
        <Link
          to="/"
          className="bg-zinc-950 px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Return Home
        </Link>
        <Link
          to="/guides"
          className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950"
        >
          Browse The Guides
        </Link>
      </div>
    </main>
  );
}
