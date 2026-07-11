import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "./SEO";

function ArticleLayout({
  category,
  title,
  description,
  children
}) {
  const location = useLocation();

  return (
    <main className="min-h-screen bg-[#f4f0e8] text-zinc-950">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.2em] focus:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        Skip to content
      </a>
      <SEO title={title} description={description} path={location.pathname} />

      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/50 px-4 py-4 backdrop-blur-md md:px-10">
        <Link
          to="/"
          className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/80"
        >
          Path To Mexico
        </Link>

        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.25em] text-white/50">
          <Link to="/">Home</Link>
          <Link to="/guides">Guides</Link>
        </div>
      </nav>

      <header id="main-content" className="bg-[#080807] px-6 pb-20 pt-36 text-white md:px-20 md:pb-28 md:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-5xl"
        >
          <Link
            to="/guides"
            className="mb-10 inline-block text-xs uppercase tracking-[0.28em] text-white/45 transition hover:text-white"
          >
            ← Back To Guides
          </Link>

          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            2026 Guide • {category}
          </p>

          <h1 className="text-5xl font-light leading-[0.98] tracking-[-0.06em] md:text-8xl">
            {title}
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white/60">
            {description}
          </p>
        </motion.div>
      </header>

      <article className="px-6 py-14 md:px-20 md:py-20">
        <div className="mx-auto max-w-4xl">

          {children}

          <div className="mt-14 border border-zinc-300 bg-white p-8 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Thinking About Moving To Mexico?
            </p>

            <h2 className="mx-auto mb-5 max-w-2xl text-3xl font-light tracking-[-0.04em] md:text-5xl">
              You do not have to figure it out alone.
            </h2>

            <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-zinc-600">
              Path To Mexico helps individuals, couples, families, retirees,
              entrepreneurs, and remote workers navigate life in Mexico
              through trusted local resources and honest on-the-ground insight.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/my-mexico-blueprint"
                className="inline-block bg-zinc-950 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#d8a15f]"
              >
                Build My Mexico Blueprint
              </Link>
              <Link
                to="/mexico-fit-call"
                className="inline-block border border-zinc-950 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white"
              >
                Book A Mexico Fit Call
              </Link>
            </div>
          </div>

        </div>
      </article>

      <footer className="border-t border-white/10 bg-zinc-950 px-8 py-14 text-center text-sm text-zinc-500">
        <p className="text-xs uppercase tracking-[0.38em] text-zinc-200">
          PATH TO MEXICO
        </p>

        <p className="mt-6 italic text-zinc-400">
          A different rhythm of life.
        </p>

        <p className="mt-6 text-zinc-600">
          Playa del Carmen • Riviera Maya • Mexico
        </p>
      </footer>

    </main>
  );
}

export default ArticleLayout;