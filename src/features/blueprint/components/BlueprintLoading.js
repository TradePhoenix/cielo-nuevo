import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LOADING_MESSAGES = [
  "Analyzing your answers...",
  "Matching you to the right cities...",
  "Building your 90-day roadmap...",
  "Finalizing your blueprint...",
];

const MESSAGE_DURATION = 900;

// A staged, self-timed sequence — not a real AI call. Calls onComplete once
// the last message has had its turn on screen.
export default function BlueprintLoading({ onComplete }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const isLastMessage = messageIndex >= LOADING_MESSAGES.length - 1;

    const timer = setTimeout(() => {
      if (isLastMessage) {
        onComplete();
      } else {
        setMessageIndex((prev) => prev + 1);
      }
    }, MESSAGE_DURATION);

    return () => clearTimeout(timer);
  }, [messageIndex, onComplete]);

  const progressPercent = ((messageIndex + 1) / LOADING_MESSAGES.length) * 100;

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center bg-[#0b0b0a] px-6 py-16 text-center text-white">
      <p className="mb-6 text-xs uppercase tracking-[0.4em] text-white/40">
        My Mexico Blueprint
      </p>

      <div aria-live="polite" aria-atomic="true">
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xl font-light tracking-[-0.02em] sm:text-2xl"
        >
          {LOADING_MESSAGES[messageIndex]}
        </motion.p>
      </div>

      <div className="mt-8 h-px w-24 bg-white/20">
        <div
          className="h-px bg-white transition-all duration-700"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
