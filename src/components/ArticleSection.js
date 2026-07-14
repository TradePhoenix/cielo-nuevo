import { motion } from "framer-motion";
import { useCinematicMotion } from "./cinematicMotion";

// CX-003: retrofitted for reduced-motion — this whileInView reveal is
// reused by ~20 guide article pages via ArticleLayout.js, so fixing it
// here fixes reduced-motion for all of them at once.
export default function SectionHeader({
  label,
  title,
  text,
  children,
  light = false,
  center = false,
  className = "",
}) {
  const prefersReducedMotion = useCinematicMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.12 : 0.8 }}
      viewport={{ once: true }}
      className={`${center ? "mx-auto text-center" : ""} max-w-6xl ${className}`}
    >
      {label && (
        <p
          className={`mb-6 text-xs uppercase tracking-[0.35em] ${
            light ? "text-white/40" : "text-zinc-500"
          }`}
        >
          {label}
        </p>
      )}

      {title && (
        <h2
          className={`max-w-5xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl ${
            center ? "mx-auto" : ""
          } ${light ? "text-white" : "text-zinc-950"}`}
        >
          {title}
        </h2>
      )}

      {text && (
        <p
          className={`mt-8 max-w-3xl text-lg leading-relaxed sm:text-xl ${
            center ? "mx-auto" : ""
          } ${light ? "text-white/65" : "text-zinc-600"}`}
        >
          {text}
        </p>
      )}

      {children && (
        <div
          className={`mt-8 space-y-5 text-lg leading-relaxed ${
            light ? "text-white/70" : "text-zinc-700"
          }`}
        >
          {children}
        </div>
      )}
    </motion.div>
  );
}