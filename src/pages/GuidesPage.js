import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import RelocationRoadmap from "../components/RelocationRoadmap";
import { GUIDES as guides } from "../data/guides";

const content = {
  en: {
    nav: {
      home: "Home",
      guides: "Guides",
      contact: "Contact",
      toggle: "ES",
    },
    label: "Relocation Guides",
    title: "Practical clarity for building a life in Mexico.",
    intro:
      "Real-world guides for people exploring relocation, residency, healthcare, housing, cost of living, and the smaller details that make Mexico feel possible.",
    featuredLabel: "Start Here",
    featuredTitle: "Not sure where to begin?",
    featuredText:
      "Start with the relocation checklist, then use the guides below to go deeper into costs, residency, healthcare, housing, and daily life.",
    read: "Read Guide →",
    ctaTitle: "Want guidance for your specific situation?",
    ctaText:
      "The guides are a strong starting point. A Mexico Fit Call helps you apply the information to your real timeline, budget, lifestyle, and relocation questions.",
    ctaButton: "Book A Mexico Fit Call",
    ctaButtonSecondary: "Build My Mexico Blueprint",
    footerLine: "A different rhythm of life.",
    footer: "Playa del Carmen • Tulum • Riviera Maya • Mexico",
  },
  es: {
    nav: {
      home: "Inicio",
      guides: "Guías",
      contact: "Contacto",
      toggle: "EN",
    },
    label: "Guías De Reubicación",
    title: "Claridad práctica para construir una vida en México.",
    intro:
      "Guías reales para personas que exploran reubicación, residencia, salud, vivienda, costo de vida y los detalles que hacen que México se sienta posible.",
    featuredLabel: "Empieza Aquí",
    featuredTitle: "¿No sabes por dónde comenzar?",
    featuredText:
      "Empieza con la checklist de reubicación y luego usa las guías para profundizar en costos, residencia, salud, vivienda y vida diaria.",
    read: "Leer Guía →",
    ctaTitle: "¿Quieres guía para tu situación específica?",
    ctaText:
      "Las guías son un buen primer paso. Una Mexico Fit Call te ayuda a aplicar la información a tu tiempo, presupuesto, estilo de vida y preguntas reales.",
    ctaButton: "Reservar Llamada",
    ctaButtonSecondary: "Build My Mexico Blueprint",
    footerLine: "Un ritmo de vida diferente.",
    footer: "Playa del Carmen • Tulum • Riviera Maya • México",
  },
};

function GuidesPage() {
  const [lang, setLang] = useState("en");
  const t = content[lang];

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <SEO
        title="Relocation Guides"
        description="Practical, honest guides on cost of living, residency, healthcare, and daily life for people considering a move to Mexico."
        path="/guides"
      />
      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-zinc-200 bg-[#f6f1e8]/85 px-4 py-4 backdrop-blur-md md:px-10">
        <Link
          to="/"
          className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-950 sm:text-xs"
        >
          Path To Mexico
        </Link>

        <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
          <Link to="/" className="transition hover:text-zinc-950">
            {t.nav.home}
          </Link>

          <Link to="/guides" className="transition hover:text-zinc-950">
            {t.nav.guides}
          </Link>

          <a href="/#contact" className="transition hover:text-zinc-950">
            {t.nav.contact}
          </a>

          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="border border-zinc-300 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700 transition hover:bg-zinc-950 hover:text-white"
          >
            {t.nav.toggle}
          </button>
        </div>
      </nav>

      <section className="px-6 pb-20 pt-36 md:px-20 md:pb-28 md:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-6xl"
        >
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">
            {t.label}
          </p>

          <h1 className="max-w-5xl text-5xl font-light leading-tight tracking-[-0.06em] md:text-8xl">
            {t.title}
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-600 sm:text-xl">
            {t.intro}
          </p>

          <div className="mt-14 grid gap-8 border-y border-zinc-300 py-10 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.35em] text-zinc-500">
                {t.featuredLabel}
              </p>

              <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
                {t.featuredTitle}
              </h2>
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-7 text-lg leading-relaxed text-zinc-600">
                {t.featuredText}
              </p>

              <Link
                to="/guides/mexico-relocation-checklist"
                className="w-fit border border-zinc-950 px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white"
              >
                {t.read}
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-px bg-zinc-300 md:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.title}
                to={guide.href}
                className="flex min-h-[340px] flex-col justify-between bg-[#f6f1e8] p-7 transition hover:bg-white"
              >
                <div>
                  <p className="mb-8 text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    {guide.category}
                  </p>

                  <h2 className="mb-6 text-3xl font-light leading-tight tracking-[-0.04em]">
                    {guide.title}
                  </h2>

                  <p className="leading-relaxed text-zinc-600">
                    {guide.description}
                  </p>
                </div>

                <p className="mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-950">
                  {t.read}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="border-t border-zinc-300">
        <RelocationRoadmap
          eyebrow="Guides By Stage"
          title="Every guide fits somewhere in your journey."
        />
      </div>

      <section className="bg-[#0b0b0a] px-6 py-24 text-center text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            Path To Mexico
          </p>

          <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            {t.ctaTitle}
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65">
            {t.ctaText}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/my-mexico-blueprint"
              className="inline-block bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
            >
              {t.ctaButtonSecondary}
            </Link>
            <Link
              to="/mexico-fit-call"
              className="inline-block border border-white/30 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950"
            >
              {t.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-zinc-950 px-8 py-14 text-center text-sm text-zinc-500">
        <p className="text-xs uppercase tracking-[0.38em] text-zinc-200">
          PATH TO MEXICO
        </p>
        <p className="mt-6 italic text-zinc-400">{t.footerLine}</p>
        <p className="mt-6 text-zinc-600">{t.footer}</p>
      </footer>
    </main>
  );
}

export default GuidesPage;