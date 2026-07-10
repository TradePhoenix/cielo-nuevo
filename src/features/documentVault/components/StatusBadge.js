import { DOCUMENT_STATUSES } from "../data/statuses";

// A small, reusable status pill. Monochrome by design — no new colors
// introduced, consistent with the rest of the product's restrained palette.
const STYLES = {
  needed: "border border-zinc-300 text-zinc-500",
  inProgress: "border border-zinc-950 text-zinc-950",
  complete: "bg-zinc-950 text-white",
};

export default function StatusBadge({ status }) {
  const label = DOCUMENT_STATUSES.find((s) => s.id === status)?.label || status;
  return (
    <span
      className={`flex-shrink-0 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] ${
        STYLES[status] || STYLES.needed
      }`}
    >
      {label}
    </span>
  );
}
