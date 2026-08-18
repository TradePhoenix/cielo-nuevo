import { motion } from "framer-motion";
import CinematicReveal from "../../../components/CinematicReveal";
import { useCinematicMotion } from "../../../components/cinematicMotion";

// Section 3 — the ceremony, set like a printed ceremony program: a
// sticky editorial introduction on the left, and the possible elements as
// a numbered index with hairline rules on the right. No icons, no glyphs,
// nothing decorative standing in for practice. The "may include,
// depending on the practitioner" framing is a hard requirement.
//
// image slot: ceremonyCopalDetail — close, tactile detail photography
// (copal smoke, hands, flowers, candlelight, altar, textiles) belongs at
// the head of the index column once it exists.
export default function CeremonyElements({ t }) {
  const prefersReducedMotion = useCinematicMotion();

  return (
    <section className="bg-[#f6f1e8] px-6 py-20 md:px-20 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <CinematicReveal className="md:sticky md:top-24 md:self-start">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.label}</p>
          <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl lg:text-6xl">{t.title}</h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-zinc-600">
            {t.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CinematicReveal>

        <div>
          <CinematicReveal>
            <p className="mb-8 max-w-md text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {t.elementsLead}
            </p>
          </CinematicReveal>
          <CinematicReveal stagger className="grid gap-x-12 sm:grid-cols-2">
            {t.elements.map((element, index) => (
              <motion.div
                key={index}
                variants={CinematicReveal.itemVariants(prefersReducedMotion)}
                className="flex items-baseline gap-4 border-b border-zinc-300/80 py-4"
              >
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#e36f4f]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-light tracking-[-0.01em] text-zinc-800">{element}</span>
              </motion.div>
            ))}
          </CinematicReveal>
        </div>
      </div>
    </section>
  );
}
