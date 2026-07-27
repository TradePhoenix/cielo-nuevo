import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#14211C] px-8 py-16 text-center">
      <div className="mx-auto max-w-6xl">
        <img
          src="/brand/logos/ptm-primary-horizontal-reverse.svg"
          alt="Path to Mexico"
          className="mx-auto h-9 w-auto"
        />

        <div className="ptm-rhythm-line mx-auto mt-8 justify-center" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <p className="ptm-editorial mt-7 text-lg text-white/70">A different rhythm of life.</p>

        <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-zinc-400">

          <Link to="/">Home</Link>

          <Link to="/your-mexico">Your Mexico</Link>

          <Link to="/guides">Guides</Link>

          <Link to="/free-guide">Free Guide</Link>

          <Link to="/mexico-fit-call">Mexico Fit Call</Link>

          <Link to="/work-with-path-to-mexico">
            Work With Us
          </Link>

        </div>

        <div className="mt-10 text-sm text-zinc-600">
          25 Destinations Across The Yucatán Peninsula
        </div>

        <div className="mt-4 text-xs text-zinc-700">
          © {new Date().getFullYear()} Path To Mexico. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
