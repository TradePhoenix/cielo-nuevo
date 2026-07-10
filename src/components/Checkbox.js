// A generic, reusable checkbox control — no business logic, purely
// presentational. Used by My Mexico Plan's tasks and the Client
// Dashboard's document checklist; each caller owns its own completion
// state and passes it in.
export default function Checkbox({ checked, onToggle, label }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      aria-label={label}
      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
        checked ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-400 hover:border-zinc-950"
      }`}
    >
      {checked && (
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" aria-hidden="true">
          <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
