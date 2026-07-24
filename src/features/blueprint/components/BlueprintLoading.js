import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DURATION, EASE, useCinematicMotion } from "../../../components/cinematicMotion";

// CX-005 — the brief "interpretation sequence" between the last question
// and results. This is not a real AI call and never claims to be one —
// the recommendation is already a synchronous, deterministic function
// (see recommendationEngine.js) that has finished before this component
// even mounts. The honest, past-tense phrasing below ("we've been
// considering...") gives the moment of arrival room to breathe without
// implying live analysis that isn't happening.
const INTERPRETATION_MESSAGES = [
  "We've been considering what matters most to you.",
  "Your answers point toward a particular rhythm of life.",
  "We think we've found a strong place to begin.",
];

// Brief by design — 3 messages x 650ms is under the ~2s threshold this
// sequence is scoped to, but a skip control is always offered anyway (see
// "Show My Results" below) rather than depending on staying under it.
const MESSAGE_DURATION = 650;
const SKIP_LINK_DELAY = 400;

export default function BlueprintLoading({ onComplete }) {
  const prefersReducedMotion = useCinematicMotion();
  const [messageIndex, setMessageIndex] = useState(0);
  const [skipVisible, setSkipVisible] = useState(false);

  useEffect(() => {
    // No artificial waiting under reduced motion: results are already
    // computed, so there's nothing to wait for — this sequence is
    // atmosphere, not scoring.
    if (prefersReducedMotion) {
      onComplete();
      return undefined;
    }

    const isLastMessage = messageIndex >= INTERPRETATION_MESSAGES.length - 1;
    const timer = setTimeout(() => {
      if (isLastMessage) {
        onComplete();
      } else {
        setMessageIndex((prev) => prev + 1);
      }
    }, MESSAGE_DURATION);
    return () => clearTimeout(timer);
  }, [messageIndex, onComplete, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const skipTimer = setTimeout(() => setSkipVisible(true), SKIP_LINK_DELAY);
    return () => clearTimeout(skipTimer);
  }, [prefersReducedMotion]);

  // Rendered for at most a single frame while the effect above fires —
  // inert and unannounced rather than a flash of content a reduced-motion
  // visitor never asked to see.
  if (prefersReducedMotion) {
    return <div className="min-h-[50vh] bg-[#0b0b0a]" aria-hidden="true" />;
  }

  const progressPercent = ((messageIndex + 1) / INTERPRETATION_MESSAGES.length) * 100;

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center bg-[#0b0b0a] px-6 py-16 text-center text-white">
      <p className="mb-6 text-xs uppercase tracking-[0.4em] text-white/40">
        My Mexico Blueprint
      </p>

      {/*
        One calm status update for assistive tech, not one per message —
        three rapid-fire announcements every ~650ms would interrupt
        themselves before any could be heard. Sighted users get the fuller
        cycling copy below, presented purely visually; screen reader users
        land on the real results heading next via BlueprintApp's existing
        focus-management once this sequence completes.
      */}
      <p role="status" className="sr-only">
        Preparing your Mexico Blueprint results.
      </p>

      <motion.p
        key={messageIndex}
        aria-hidden="true"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.quick, ease: EASE.standard }}
        className="text-xl font-light tracking-[-0.02em] sm:text-2xl"
      >
        {INTERPRETATION_MESSAGES[messageIndex]}
      </motion.p>

      <div className="mt-8 h-px w-24 bg-white/20">
        <div
          className="h-px bg-white transition-all duration-700"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/*
        Never trap a visitor in this sequence — always offer a way through
        it, appearing a beat after the first message so it doesn't read as
        the first thing on screen.
      */}
      {skipVisible && (
        <button
          type="button"
          onClick={onComplete}
          className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 underline underline-offset-4 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0a]"
        >
          Show My Results
        </button>
      )}
    </div>
  );
}
