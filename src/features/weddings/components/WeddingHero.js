import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCinematicMotion } from "../../../components/cinematicMotion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } },
};

const fadeUpReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};

// Full-bleed cinematic hero. The Tulum region hero (jungle shade +
// limestone, no archaeological site in frame — deliberate, so nothing
// implies ceremonies at protected ruins) is the only above-the-fold image
// on the page; everything below lazy-loads.
//
// image slot: weddingHeroJungle — the definitive future hero is an
// intimate couple in jungle/cenote environment, natural light, editorial
// composition, headline room on the left third. Until that shoot exists,
// the Tulum street carries the section honestly.
export default function WeddingHero({ t, lang, onToggleLang, toggleLabel, onPrimaryCta }) {
  const prefersReducedMotion = useCinematicMotion();
  const itemVariants = prefersReducedMotion ? fadeUpReduced : fadeUp;

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0b0b0a] text-white">
      {/* Slow settle-in on the photograph itself — a single 2.8s scale,
          skipped entirely under reduced motion. */}
      <motion.div
        initial={prefersReducedMotion ? { scale: 1 } : { scale: 1.07 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <picture>
          <source media="(max-width: 767px)" type="image/webp" srcSet="/regions/tulum/tulum-hero-mobile.webp" />
          <source media="(max-width: 767px)" srcSet="/regions/tulum/tulum-hero-mobile.jpg" />
          <source type="image/webp" srcSet="/regions/tulum/tulum-hero-desktop.webp" />
          <img
            src="/regions/tulum/tulum-hero-desktop.jpg"
            alt={t.imageAlt}
            className="h-full w-full object-cover"
          />
        </picture>
      </motion.div>
      {/* Layered editorial overlay: darkness gathers to the left third
          where the type lives, and along the base — the right side of the
          photograph stays open and breathing. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b0b0a]/75 via-[#0b0b0a]/30 to-[#0b0b0a]/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0a]/85 via-transparent to-[#0b0b0a]/30"
      />
      {/* Mobile-only scrim: the mobile crop has a bright limestone arch at
          center where the subtitle sits — desktop needs no extra darkness. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0b0b0a]/35 md:hidden" />

      <div className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" aria-label="Path To Mexico — home" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2">
          <img src="/brand/logos/ptm-primary-horizontal-reverse.svg" alt="Path To Mexico" className="h-7 w-auto sm:h-8" />
        </Link>
        <button
          type="button"
          onClick={onToggleLang}
          className="border border-white/30 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {toggleLabel}
        </button>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={prefersReducedMotion ? {} : stagger}
        className="relative z-10 mt-auto px-6 pb-10 pt-24 md:px-12 md:pb-20"
      >
        <div className="mx-auto max-w-7xl">
          <motion.p variants={itemVariants} className="mb-5 text-[11px] uppercase tracking-[0.45em] text-white/70 md:mb-7">
            {t.eyebrow}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="max-w-5xl text-[3rem] font-light leading-[0.92] tracking-[-0.05em] sm:text-7xl md:text-8xl lg:text-[7.5rem]"
          >
            {t.title}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="ptm-editorial mt-5 max-w-3xl text-2xl leading-snug text-[#d8a15f] sm:text-3xl md:mt-7 md:text-[2.6rem]"
          >
            {t.subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-6 max-w-xl space-y-3 text-[15px] leading-relaxed text-white/75 md:mt-9 md:space-y-4 md:text-lg">
            {t.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-9 md:mt-11">
            <Link
              to="/weddings/inquire"
              onClick={onPrimaryCta}
              className="bg-white px-9 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
            >
              {t.ctaPrimary}
            </Link>
            <a
              href="#experience"
              className="group inline-flex items-center gap-3 border-b border-white/30 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/85 transition hover:border-[#d8a15f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
            >
              {t.ctaSecondary}
              <span aria-hidden="true" className="text-[#d8a15f] transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Editorial photo caption — quiet, factual, bottom-right. */}
      <p className="pointer-events-none absolute bottom-5 right-6 z-10 hidden text-[10px] uppercase tracking-[0.3em] text-white/35 md:right-12 md:block">
        {t.caption}
      </p>
    </section>
  );
}
