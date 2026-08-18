import { motion } from "framer-motion";
import CinematicReveal from "../../../components/CinematicReveal";
import { useCinematicMotion } from "../../../components/cinematicMotion";

// Section 7 — the seven experience types as an editorial index rather
// than a card wall: serif name on the left, one quiet line on the right,
// hairlines between. Communicates breadth without reading mass-market.
export default function ExperienceTypes({ t }) {
  const prefersReducedMotion = useCinematicMotion();

  return (
    <section className="bg-white px-6 py-20 md:px-20 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.65fr_1.35fr] md:gap-20">
        <CinematicReveal className="md:sticky md:top-24 md:self-start">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.label}</p>
          <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">{t.title}</h2>
        </CinematicReveal>

        <CinematicReveal stagger className="border-t border-zinc-200">
          {t.cards.map(([title, text], index) => (
            <motion.div
              key={index}
              variants={CinematicReveal.itemVariants(prefersReducedMotion)}
              className="group grid gap-2 border-b border-zinc-200 py-7 sm:grid-cols-[0.9fr_1.1fr] sm:items-baseline sm:gap-8"
            >
              <h3 className="ptm-editorial text-2xl tracking-[-0.02em] text-zinc-900 transition-transform duration-500 group-hover:translate-x-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 md:text-3xl">
                {title}
              </h3>
              <p className="leading-relaxed text-zinc-600">{text}</p>
            </motion.div>
          ))}
        </CinematicReveal>
      </div>
    </section>
  );
}
