import { Link } from "react-router-dom";

// The Client Dashboard's own shell — deliberately not YourMexicoShell.
// That shell is built for a linear, single-scroll marketing journey; a
// dashboard of independent modules needs a different structural pattern:
// a slim, persistent top bar rather than a per-screen back link, with the
// module grid as the real content below it. No sidebar — this is one page
// of modules, not a multi-page app, so a full collapsing sidebar would be
// complexity this doesn't need yet.
export default function DashboardShell({ children, backTo = "/", backLabel = "Back To Site" }) {
  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            Path To Mexico
          </Link>
          <Link
            to={backTo}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {backLabel}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">{children}</div>
    </main>
  );
}
