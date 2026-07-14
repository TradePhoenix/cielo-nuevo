const STATUS_STYLES = {
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  complete: "bg-emerald-50 text-emerald-700 border-emerald-200",
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  uploaded: "bg-emerald-50 text-emerald-700 border-emerald-200",
  current: "bg-[#f6ead9] text-[#8a5a24] border-[#e2c393]",
  upcoming: "bg-zinc-100 text-zinc-600 border-zinc-200",
  pending: "bg-zinc-100 text-zinc-600 border-zinc-200",
  incomplete: "bg-zinc-100 text-zinc-600 border-zinc-200",
  "due-soon": "bg-amber-50 text-amber-700 border-amber-200",
  expiring: "bg-amber-50 text-amber-700 border-amber-200",
  priority: "bg-rose-50 text-rose-700 border-rose-200",
  missing: "bg-rose-50 text-rose-700 border-rose-200",
  outstanding: "bg-rose-50 text-rose-700 border-rose-200",
};

const STATUS_LABELS = {
  "due-soon": "Due Soon",
};

export default function StatusPill({ status, className = "" }) {
  const style = STATUS_STYLES[status] || "bg-zinc-100 text-zinc-600 border-zinc-200";
  const label = STATUS_LABELS[status] || (status ? status.charAt(0).toUpperCase() + status.slice(1) : "");

  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${style} ${className}`}
    >
      {label}
    </span>
  );
}
