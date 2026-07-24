import { motion } from "framer-motion";
import { entryReveal, entryRevealReduced, useCinematicMotion, REVEAL_STAGGER } from "./cinematicMotion";

// CX-002's reusable cinematic section-reveal pattern — wrap a section (or
// a grid of cards) in this instead of re-deriving the whileInView +
// reduced-motion contract every time. See cinematicMotion.js's "CX-002
// ADDITIONS" comment for the full rationale.
//
// Two modes:
//   <CinematicReveal>...</CinematicReveal>            — single element,
//     fades/rises in as one unit once it scrolls into view.
//   <CinematicReveal stagger>{items.map(...)}</CinematicReveal> — an
//     immediate grid/row of children. Each child must itself be a
//     `motion.*` element with `variants={itemVariants}` — see
//     CinematicReveal.itemVariants below. Framer Motion propagates this
//     wrapper's "hidden"/"show" state to those children automatically; the
//     children don't need their own `initial`/`whileInView`.
//
// CX-005: `skipReveal` (default false, every existing call site
// unaffected) renders content already in its final "show" state instead
// of animating from "hidden" — for content that was already seen in a
// previous visit (e.g. the Blueprint results screen on a page refresh),
// where replaying the entry animation would read as a repeated, fake
// "theatrical" reveal rather than the honest one-time discovery it's meant
// to be.
export default function CinematicReveal({ children, stagger = false, skipReveal = false, className }) {
  const prefersReducedMotion = useCinematicMotion();

  const variants = stagger
    ? { hidden: {}, show: { transition: { staggerChildren: prefersReducedMotion ? 0 : REVEAL_STAGGER } } }
    : prefersReducedMotion
    ? entryRevealReduced
    : entryReveal;

  if (skipReveal) {
    return (
      <motion.div initial="show" animate="show" variants={variants} className={className}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// The variants a stagger child should pass to its own `variants` prop.
// Exported as a function (not a hook) so it can be computed once in the
// parent alongside its own useCinematicMotion() call, rather than every
// child re-subscribing to the same media query independently.
CinematicReveal.itemVariants = function itemVariants(prefersReducedMotion) {
  return prefersReducedMotion ? entryRevealReduced : entryReveal;
};
