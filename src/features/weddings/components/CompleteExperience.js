import { motion } from "framer-motion";
import CinematicReveal from "../../../components/CinematicReveal";
import { useCinematicMotion } from "../../../components/cinematicMotion";

// Section 8 — the full orchestration as a five-stage progression
// (Ceremony → Table → Story → Stay → Beyond) instead of a bullet cloud.
// Desktop reads as one continuous strip divided by hairlines; mobile is a
// deliberate horizontal snap-scroll moment with the next stage peeking.
// Every service stays phrased as coordinated through trusted partners,
// never as something PTM owns.
export default function CompleteExperience({ t }) {
  const prefersReducedMotion = useCinematicMotion();

  return (
    <section className="bg-[#efe7d8] py-20 md:py-32">
      <CinematicReveal className="mx-auto max-w-6xl px-6 md:px-8">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.label}</p>
        <h2 className="max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">{t.title}</h2>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-600 sm:text-xl">{t.text}</p>
      </CinematicReveal>

      <div className="mx-auto mt-14 max-w-6xl md:px-8">
        <CinematicReveal
          stagger
          className="flex snap-x snap-mandatory gap-px overflow-x-auto border-y border-zinc-300 bg-zinc-300 lg:overflow-visible"
        >
          {t.stages.map((stage) => (
            <motion.div
              key={stage.number}
              variants={CinematicReveal.itemVariants(prefersReducedMotion)}
              className="min-w-[76%] snap-start bg-[#efe7d8] p-7 sm:min-w-[46%] lg:min-w-0 lg:flex-1"
            >
              <p className="mb-6 text-[11px] font-semibold tracking-[0.3em] text-[#e36f4f]">{stage.number}</p>
              <h3 className="ptm-editorial mb-6 text-2xl tracking-[-0.02em] text-zinc-900 md:text-3xl">{stage.title}</h3>
              <ul className="space-y-2.5">
                {stage.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm leading-relaxed text-zinc-600">{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </CinematicReveal>
      </div>

      <CinematicReveal className="mx-auto mt-10 max-w-6xl px-6 md:px-8">
        <p className="max-w-3xl text-sm leading-relaxed text-zinc-500">{t.note}</p>
      </CinematicReveal>
    </section>
  );
}
