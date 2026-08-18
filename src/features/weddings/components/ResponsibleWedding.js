import { Link } from "react-router-dom";
import CinematicReveal from "../../../components/CinematicReveal";

// Section 11 — ties Weddings into the site-wide Responsible Relocation
// philosophy (/impact and the guide are the canonical homes of it).
export default function ResponsibleWedding({ t }) {
  return (
    <section className="bg-[#f6f1e8] px-6 py-20 md:px-20 md:py-28">
      <CinematicReveal className="mx-auto max-w-6xl border-t border-zinc-300 pt-12">
        <h2 className="max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.title}</h2>
        <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-zinc-600 sm:text-xl">
          {t.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/impact"
            className="border border-zinc-950 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {t.ctaImpact}
          </Link>
          <Link
            to="/guides/responsible-relocation-in-mexico"
            className="group inline-flex items-center justify-center gap-2 px-4 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {t.ctaGuide}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </CinematicReveal>
    </section>
  );
}
