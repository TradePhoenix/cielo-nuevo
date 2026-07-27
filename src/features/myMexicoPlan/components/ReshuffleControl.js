import { useState } from "react";

const UI = {
  en: {
    adjustedCount: (n) => `This plan has been adjusted ${n} ${n === 1 ? "time" : "times"} since you started — that's normal.`,
    confirmText: "This resets \"Now\" to today. Sound right?",
    yesAdjust: "Yes, adjust it",
    cancel: "Cancel",
    trigger: "Life happened — adjust my timeline",
  },
  es: {
    adjustedCount: (n) => `Este plan se ha ajustado ${n} ${n === 1 ? "vez" : "veces"} desde que empezaste — eso es normal.`,
    confirmText: "Esto reinicia \"Ahora\" a hoy. ¿Suena bien?",
    yesAdjust: "Sí, ajústalo",
    cancel: "Cancelar",
    trigger: "Pasaron cosas de la vida — ajustar mi cronograma",
  },
};

// "Life happened" — the honest alternative to a progress bar that quietly
// makes someone feel behind. Adjustments are shown, not hidden, and never
// framed as failure. A lightweight inline confirmation replaces a native
// browser confirm() dialog, which would break the premium feel of the rest
// of the page.
export default function ReshuffleControl({ timelineShifts, onReshuffle, lang = "en" }) {
  const [confirming, setConfirming] = useState(false);
  const ui = UI[lang] || UI.en;

  const handleConfirm = () => {
    onReshuffle();
    setConfirming(false);
  };

  return (
    <div className="mt-10 border-t border-zinc-300 pt-6">
      {timelineShifts.length > 0 && (
        <p className="text-sm text-zinc-500">{ui.adjustedCount(timelineShifts.length)}</p>
      )}

      {confirming ? (
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <p className="text-sm text-zinc-600">{ui.confirmText}</p>
          <button
            type="button"
            onClick={handleConfirm}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 underline underline-offset-4 transition hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {ui.yesAdjust}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 transition hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {ui.cancel}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {ui.trigger}
        </button>
      )}
    </div>
  );
}
