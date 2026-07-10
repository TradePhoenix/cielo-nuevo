import { useState } from "react";

// "Life happened" — the honest alternative to a progress bar that quietly
// makes someone feel behind. Adjustments are shown, not hidden, and never
// framed as failure. A lightweight inline confirmation replaces a native
// browser confirm() dialog, which would break the premium feel of the rest
// of the page.
export default function ReshuffleControl({ timelineShifts, onReshuffle }) {
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = () => {
    onReshuffle();
    setConfirming(false);
  };

  return (
    <div className="mt-10 border-t border-zinc-300 pt-6">
      {timelineShifts.length > 0 && (
        <p className="text-sm text-zinc-500">
          This plan has been adjusted {timelineShifts.length} {timelineShifts.length === 1 ? "time" : "times"} since
          you started — that's normal.
        </p>
      )}

      {confirming ? (
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <p className="text-sm text-zinc-600">This resets "Now" to today. Sound right?</p>
          <button
            type="button"
            onClick={handleConfirm}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 underline underline-offset-4 transition hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            Yes, adjust it
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 transition hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Life happened — adjust my timeline
        </button>
      )}
    </div>
  );
}
