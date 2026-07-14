const STATUS_STYLES = {
  New: "bg-zinc-100 text-zinc-700",
  Active: "bg-emerald-50 text-emerald-700",
  Nurturing: "bg-amber-50 text-amber-700",
  "On Hold": "bg-zinc-100 text-zinc-500",
  Client: "bg-zinc-950 text-white",
  Lost: "bg-rose-50 text-rose-700",
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || "bg-zinc-100 text-zinc-700";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${style}`}>
      {status}
    </span>
  );
}
