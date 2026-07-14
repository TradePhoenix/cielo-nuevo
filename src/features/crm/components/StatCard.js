// Dashboard/analytics metric tile. `tone` only ever nudges the value's
// color for a handful of semantically-loaded metrics (overdue, conversion) —
// the gold accent is deliberately never used here, since CLAUDE.md reserves
// gold for primary CTA hover states only.
const TONE_STYLES = {
  default: "text-zinc-950",
  warning: "text-amber-700",
  positive: "text-emerald-700",
};

export default function StatCard({ label, value, sublabel, tone = "default" }) {
  return (
    <div className="border border-zinc-200 bg-white p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className={`mt-3 text-3xl font-light tracking-[-0.02em] ${TONE_STYLES[tone]}`}>{value}</p>
      {sublabel && <p className="mt-2 text-sm text-zinc-500">{sublabel}</p>}
    </div>
  );
}
