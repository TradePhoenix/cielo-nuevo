import { motion } from "framer-motion";
import { entryReveal, entryRevealReduced, useCinematicMotion } from "../../../components/cinematicMotion";

// Full-bleed cinematic intro — reuses the same hero photo and dark-overlay
// language as the homepage hero (src/pages/HomePage.js) so this feels like
// a signature Path To Mexico moment, not a generic quiz landing screen.
//
// CX-005: drives its on-mount fade directly from the shared entryReveal /
// entryRevealReduced variants instead of a hand-rolled transition object —
// this screen is visible immediately on mount (not scroll-triggered), so
// CinematicReveal's own whileInView contract isn't the right fit, but the
// same timing/easing tokens are.
export default function BlueprintIntro({ onStart, totalQuestions }) {
  const prefersReducedMotion = useCinematicMotion();
  const revealVariants = prefersReducedMotion ? entryRevealReduced : entryReveal;

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 text-center text-white">
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="Riviera Maya coastline, Mexico"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={revealVariants}
        className="relative z-10 mx-auto max-w-2xl"
      >
        <p className="mb-6 text-xs uppercase tracking-[0.4em] text-white/60">
          My Mexico Blueprint
        </p>

        <h1 className="text-4xl font-light leading-tight tracking-[-0.04em] sm:text-6xl md:text-7xl">
          Find your path to a life in Mexico.
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
          Every year, thousands of people dream about moving to Mexico. Most never do. This
          blueprint helps you see what your move could actually look like — where you fit,
          what it may cost, and what to do next.
        </p>

        <button
          type="button"
          onClick={onStart}
          className="mt-10 inline-block bg-white px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-950 transition duration-300 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0a]"
        >
          Start Your Blueprint
        </button>

        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-white/50">
          {totalQuestions} Quick Questions &middot; About 2 Minutes
        </p>

        <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-white/50">
          Your answers stay on this device — nothing is sent anywhere until you choose to talk to us.
        </p>
      </motion.div>
    </section>
  );
}
