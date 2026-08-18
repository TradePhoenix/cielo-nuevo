import CinematicReveal from "../../../components/CinematicReveal";

// V2 (jungle-only model) — replaces the former multi-venue collage
// (WeddingLocations.js). There is no venue choice anymore: one private
// jungle setting in the Tulum area, presented typographically over a
// deep-jungle tonal field. The privacy note is a hard requirement — no
// precise location, no implication of public access.
//
// image slot: jungleCeremonySetting — once authorized photography of the
// actual land exists (canopy, cleared ceremonial ground, fire circle at
// dusk, candlelit paths), it replaces the tonal field as a full-bleed
// backdrop under the same darkened treatment. Do not stand in generic
// stock jungle for the real place.
export default function JungleSetting({ t }) {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0a] px-6 py-24 text-white md:px-20 md:py-36">
      {/* Deep-jungle tonal field: near-black greens with a faint canopy
          light from above — designed, not a placeholder box. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#101f18] via-[#0b1410] to-[#0b0b0a]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(120,160,120,0.14),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <CinematicReveal>
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">{t.label}</p>
          <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.title}</h2>
        </CinematicReveal>

        <CinematicReveal className="ml-auto mt-14 max-w-2xl md:mt-20">
          <div className="space-y-6 border-l border-[#e36f4f]/40 pl-6 text-lg leading-relaxed text-white/75 md:pl-10 md:text-xl">
            {t.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CinematicReveal>

        <CinematicReveal className="mt-14 border-t border-white/15 pt-8 md:mt-20">
          <p className="max-w-2xl text-sm leading-relaxed text-white/50">{t.note}</p>
        </CinematicReveal>
      </div>
    </section>
  );
}
