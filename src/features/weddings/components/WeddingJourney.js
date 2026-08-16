import { motion } from "framer-motion";
import CinematicReveal from "../../../components/CinematicReveal";
import { useCinematicMotion } from "../../../components/cinematicMotion";

// Section 9 — the example journey as a cinematic vertical timeline:
// oversized serif day numerals against a hairline rail, generous vertical
// air between days, and Day 03 — the ceremony — carrying the strongest
// emphasis (gold numeral, larger title, its own framed field). Explicitly
// a rhythm, not a package.
//
// image slots: journeyArrivalDusk, journeySailDay, journeyCeremonySunset,
// journeyMorningAfter — one atmospheric lifestyle frame per day can slot
// beside each entry once wedding photography exists.
export default function WeddingJourney({ t }) {
  const prefersReducedMotion = useCinematicMotion();
  const ceremonyIndex = 2;

  return (
    <section className="bg-[#0b0b0a] px-6 py-20 text-white md:px-20 md:py-32">
      <CinematicReveal className="mx-auto max-w-6xl">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">{t.label}</p>
        <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">{t.title}</h2>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60">{t.intro}</p>
      </CinematicReveal>

      <div className="mx-auto mt-16 max-w-6xl border-l border-white/15 md:mt-20">
        {t.days.map((day, index) => {
          const isCeremony = index === ceremonyIndex;
          return (
            <CinematicReveal key={day.number} className="relative">
              <div
                className={`grid gap-4 py-12 pl-8 md:grid-cols-[220px_1fr] md:gap-12 md:py-16 md:pl-14 ${
                  isCeremony ? "bg-white/[0.04]" : ""
                }`}
              >
                <p
                  aria-hidden="true"
                  className={`ptm-editorial text-6xl leading-none md:text-8xl ${
                    isCeremony ? "text-[#d8a15f]" : "text-white/20"
                  }`}
                >
                  {day.number}
                </p>
                <div>
                  <h3
                    className={`font-light tracking-[-0.03em] ${
                      isCeremony ? "text-3xl text-white md:text-5xl" : "text-2xl text-white/90 md:text-3xl"
                    }`}
                  >
                    {day.name}
                  </h3>
                  <div className={`mt-5 space-y-2 ${isCeremony ? "max-w-xl" : "max-w-lg"}`}>
                    {day.lines.map((line, lineIndex) => (
                      <motion.p
                        key={lineIndex}
                        variants={CinematicReveal.itemVariants(prefersReducedMotion)}
                        className={`leading-relaxed ${isCeremony ? "text-lg text-white/75" : "text-white/55"}`}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </div>
            </CinematicReveal>
          );
        })}
      </div>
    </section>
  );
}
