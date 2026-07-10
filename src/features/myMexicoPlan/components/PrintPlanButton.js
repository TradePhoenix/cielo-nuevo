// The plan as a real, ownable artifact — a native browser print, not a new
// dependency. Screen-only chrome (nav, CTAs, interactive controls) is
// hidden via `print:hidden` at the call sites so what prints is the plan
// itself, not the app around it.
export default function PrintPlanButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-2 border border-zinc-300 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
    >
      Print Or Save My Plan
    </button>
  );
}
