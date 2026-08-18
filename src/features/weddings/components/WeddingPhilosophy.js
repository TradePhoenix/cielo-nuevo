import CinematicReveal from "../../../components/CinematicReveal";

// Section 2 — the manifesto moment. Pure typography directly after the
// hero photograph: an oversized two-part statement, an offset supporting
// column, and the "We start with the feeling" line as a closing serif
// statement above a hairline. Deliberately no imagery here — the contrast
// with the hero is the rhythm.
export default function WeddingPhilosophy({ t }) {
  return (
    <section id="experience" className="bg-white px-6 py-24 md:px-20 md:py-36">
      <div className="mx-auto max-w-6xl">
        <CinematicReveal>
          <p className="mb-8 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.label}</p>
          <h2 className="max-w-5xl text-4xl font-light leading-[1.04] tracking-[-0.04em] md:text-6xl lg:text-7xl">
            {t.titleLead}{" "}
            <span className="ptm-editorial block mt-3 text-[#103D33]">{t.titleAccent}</span>
          </h2>
        </CinematicReveal>

        <CinematicReveal className="ml-auto mt-14 max-w-2xl md:mt-20">
          <div className="space-y-6 border-l border-zinc-200 pl-6 text-lg leading-relaxed text-zinc-600 sm:text-xl md:pl-10">
            {t.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CinematicReveal>

        <CinematicReveal className="mt-16 border-t border-zinc-200 pt-12 md:mt-24">
          <p className="ptm-editorial max-w-4xl text-3xl leading-tight tracking-[-0.02em] text-zinc-900 md:text-5xl">
            {t.pull}
          </p>
        </CinematicReveal>
      </div>
    </section>
  );
}
