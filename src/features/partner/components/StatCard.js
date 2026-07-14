export default function StatCard({ label, value, hint }) {
  return (
    <div className="border border-zinc-200 bg-white p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-light tracking-[-0.01em] text-zinc-950">{value}</p>
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}
