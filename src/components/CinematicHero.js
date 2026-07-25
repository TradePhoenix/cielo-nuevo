import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CinematicHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black text-white">
      
      {/* Background Image */}
      <img
        src="/hero.jpg"
        alt="Path To Mexico"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 mx-auto max-w-7xl px-8"
      >
        <p className="mb-6 uppercase tracking-[0.45em] text-white/70">
          PATH TO MEXICO
        </p>

        <h1 className="max-w-5xl text-6xl font-light leading-[0.9] tracking-[-0.06em] md:text-8xl">
          Some people visit Mexico.
          <br />
          Others build a life here.
        </h1>

        <p className="mt-10 max-w-2xl text-xl leading-relaxed text-white/75">
          Moving to another country isn't simply about changing where you
          live. It's about changing how you live.
        </p>

        <div className="mt-12 flex flex-wrap gap-5">
          <Link
            to="/free-guide"
            className="rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#d8a15f]"
          >
            Start Your Path
          </Link>

          <Link
            to="/guides"
            className="rounded-full border border-white/40 px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
          >
            Explore Guides
          </Link>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70"
      >
        ↓
      </motion.div>
    </section>
  );
}