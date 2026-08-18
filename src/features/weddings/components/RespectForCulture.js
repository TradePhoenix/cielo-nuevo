import { Link } from "react-router-dom";
import CinematicReveal from "../../../components/CinematicReveal";

// "Respect For The Culture" — same deep green treatment as ImpactPage's
// "This is Maya land" section, deliberately: the two pages share one
// philosophy, and the visual echo is the connection.
export default function RespectForCulture({ t }) {
  return (
    <section className="bg-[#103D33] px-6 py-20 text-white md:px-20 md:py-28">
      <CinematicReveal className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/45">{t.label}</p>
          <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">{t.title}</h2>
          <p className="ptm-editorial mt-6 text-2xl leading-snug text-[#d8a15f] md:text-3xl">{t.quote}</p>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-white/75 md:text-xl">
          {t.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <Link
            to="/impact"
            className="mt-2 inline-block border border-white/30 px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {t.cta}
          </Link>
        </div>
      </CinematicReveal>
    </section>
  );
}
