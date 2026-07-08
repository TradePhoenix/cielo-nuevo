import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 px-8 py-16 text-center">
      <div className="mx-auto max-w-6xl">

        <p className="text-xs uppercase tracking-[0.4em] text-zinc-300">
          PATH TO MEXICO
        </p>

        <p className="mt-5 text-zinc-500 italic">
          Some people visit. Others build a life.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-zinc-400">

          <Link to="/">Home</Link>

          <Link to="/guides">Guides</Link>

          <Link to="/free-guide">Free Guide</Link>

          <Link to="/mexico-fit-call">Mexico Fit Call</Link>

          <Link to="/work-with-path-to-mexico">
            Work With Us
          </Link>

        </div>

        <div className="mt-10 text-sm text-zinc-600">
          Playa del Carmen • Tulum • Riviera Maya • Mexico
        </div>

        <div className="mt-4 text-xs text-zinc-700">
          © {new Date().getFullYear()} Path To Mexico. All rights reserved.
        </div>

      </div>
    </footer>
  );
}