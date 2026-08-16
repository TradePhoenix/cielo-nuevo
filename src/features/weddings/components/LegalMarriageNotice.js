import CinematicReveal from "../../../components/CinematicReveal";

// Section 10 — the symbolic/legal distinction as a quiet editorial note:
// a centered, hairline-framed panel, visually subordinate to the
// storytelling around it but fully readable. The content is a hard
// requirement: ceremonies are symbolic/spiritual unless the couple
// separately completes the civil process, and no fixed legal
// requirements are ever quoted.
export default function LegalMarriageNotice({ t }) {
  return (
    <section className="bg-white px-6 py-16 md:py-24">
      <CinematicReveal className="mx-auto max-w-3xl border-y border-zinc-200 py-12 md:py-14">
        <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e36f4f]">
          {t.label}
        </p>
        <h2 className="text-center text-2xl font-light leading-snug tracking-[-0.03em] text-zinc-900 md:text-3xl">
          {t.title}
        </h2>
        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-zinc-600 md:text-base">
          {t.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </CinematicReveal>
    </section>
  );
}
