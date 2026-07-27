import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "./SEO";
import ContinueYourJourney from "./ContinueYourJourney";
import { useCinematicMotion } from "./cinematicMotion";

const TEXT = {
  en: {
    skipToContent: "Skip to content",
    home: "Home",
    guides: "Guides",
    backToGuides: "← Back To Guides",
    ctaLabel: "Thinking About Moving To Mexico?",
    ctaTitle: "You do not have to figure it out alone.",
    ctaText:
      "Path To Mexico helps individuals, couples, families, retirees, entrepreneurs, and remote workers navigate life in Mexico through trusted local resources and honest on-the-ground insight.",
    ctaBlueprintButton: "Build My Mexico Blueprint",
    ctaFitCallButton: "Book A Mexico Fit Call",
    footerTagline: "A different rhythm of life.",
    footerLine: "25 Destinations Across The Yucatán Peninsula",
  },
  es: {
    skipToContent: "Saltar al contenido",
    home: "Inicio",
    guides: "Guías",
    backToGuides: "← Volver A Guías",
    ctaLabel: "¿Piensas Mudarte A México?",
    ctaTitle: "No tienes que resolverlo solo.",
    ctaText:
      "Path To Mexico ayuda a personas, parejas, familias, jubilados, emprendedores y trabajadores remotos a navegar la vida en México a través de recursos locales de confianza e ideas honestas sobre el terreno.",
    ctaBlueprintButton: "Construir Mi Mexico Blueprint",
    ctaFitCallButton: "Agendar Una Llamada De Compatibilidad",
    footerTagline: "Un ritmo de vida diferente.",
    footerLine: "25 Destinos En La Península De Yucatán",
  },
};

function ArticleLayout({
  category,
  title,
  description,
  children,
  lang = "en",
}) {
  const location = useLocation();
  const prefersReducedMotion = useCinematicMotion();
  const t = TEXT[lang] || TEXT.en;

  return (
    <main className="min-h-screen bg-[#f4f0e8] text-zinc-950">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.2em] focus:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        {t.skipToContent}
      </a>
      <SEO title={title} description={description} path={location.pathname} />

      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/50 px-4 py-4 backdrop-blur-md md:px-10">
        <Link
          to="/"
          aria-label="Path to Mexico — home"
          className="block"
        >
          <img
            src="/brand/logos/ptm-primary-horizontal-reverse.svg"
            alt="Path to Mexico"
            className="h-8 w-auto"
          />
        </Link>

        <div className="flex items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
          <Link to="/">{t.home}</Link>
          <Link to="/guides">{t.guides}</Link>
        </div>
      </nav>

      <header id="main-content" className="bg-[#080807] px-6 pb-20 pt-36 text-white md:px-20 md:pb-28 md:pt-44">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.12 : 0.9 }}
          className="mx-auto max-w-5xl"
        >
          <div className="ptm-rhythm-line mb-8" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <Link
            to="/guides"
            className="mb-10 inline-block text-xs uppercase tracking-[0.28em] text-white/45 transition hover:text-white"
          >
            {t.backToGuides}
          </Link>

          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
            2026 Guide • {category}
          </p>

          <h1 className="text-5xl font-bold leading-[0.98] tracking-[-0.055em] md:text-7xl lg:text-8xl">
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

          <ContinueYourJourney currentHref={location.pathname} lang={lang} />

          <div className="mt-14 border border-zinc-300 bg-white p-8 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
              {t.ctaLabel}
            </p>

            <h2 className="mx-auto mb-5 max-w-2xl text-3xl font-light tracking-[-0.04em] md:text-5xl">
              {t.ctaTitle}
            </h2>

            <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-zinc-600">
              {t.ctaText}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/my-mexico-blueprint"
                className="inline-block bg-zinc-950 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#d8a15f]"
              >
                {t.ctaBlueprintButton}
              </Link>
              <Link
                to="/mexico-fit-call"
                className="inline-block border border-zinc-950 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white"
              >
                {t.ctaFitCallButton}
              </Link>
            </div>
          </div>

        </div>
      </article>

      <footer className="border-t border-white/10 bg-zinc-950 px-8 py-14 text-center text-sm text-zinc-500">
        <img
          src="/brand/logos/ptm-primary-horizontal-reverse.svg"
          alt="Path to Mexico"
          className="mx-auto h-9 w-auto"
        />

        <p className="ptm-editorial mt-6 text-lg text-zinc-400">
          {t.footerTagline}
        </p>

        <p className="mt-6 text-zinc-600">
          {t.footerLine}
        </p>
      </footer>

    </main>
  );
}

export default ArticleLayout;
