import { motion } from "framer-motion";
import CinematicReveal from "../../../components/CinematicReveal";
import { useCinematicMotion } from "../../../components/cinematicMotion";

// Section 4 — the network, set like the credits of a film rather than a
// directory: the core line as the section's oversized statement, then
// four curated groups of roles. Categories only, never names — no
// practitioner is promised for any given wedding, and no fake profiles
// exist anywhere.
//
// image slot: networkAtWork — candid working photography (a ceremonial
// leader preparing a space, a chef plating, a florist's hands, a
// musician) will eventually replace the typographic-only treatment.
// Never headshot grids.
export default function LocalNetwork({ t }) {
  const prefersReducedMotion = useCinematicMotion();

  return (
    <section className="bg-white px-6 py-20 md:px-20 md:py-32">
      <CinematicReveal className="mx-auto max-w-6xl">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.label}</p>
        <h2 className="max-w-5xl text-4xl font-light leading-[1.02] tracking-[-0.05em] md:text-6xl lg:text-7xl">
          {t.title}
        </h2>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-600 sm:text-xl">{t.text}</p>
      </CinematicReveal>

      <CinematicReveal stagger className="mx-auto mt-16 grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {t.groups.map((group, index) => (
          <motion.div
            key={index}
            variants={CinematicReveal.itemVariants(prefersReducedMotion)}
            className="border-l border-zinc-200 pl-6"
          >
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#e36f4f]">{group.title}</p>
            <ul className="space-y-2.5">
              {group.roles.map((role, roleIndex) => (
                <li key={roleIndex} className="text-[15px] leading-snug text-zinc-700">{role}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </CinematicReveal>

      <CinematicReveal className="mx-auto mt-12 max-w-6xl">
        <p className="max-w-3xl text-sm leading-relaxed text-zinc-500">{t.note}</p>
      </CinematicReveal>
    </section>
  );
}
