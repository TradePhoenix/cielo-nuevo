/**
 * Renders a label -> value map (a guide or city's quickFacts) as a grid of
 * stat tiles.
 * @param {Object} facts
 */
export default function QuickFacts({ facts = {} }) {
  const entries = Object.entries(facts);
  if (!entries.length) return null;

  return (
    <div className="grid gap-px overflow-hidden border border-zinc-300 bg-zinc-300 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map(([label, value]) => (
        <div key={label} className="bg-white p-6">
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-zinc-500">{label}</p>
          <p className="text-lg font-light tracking-[-0.02em] text-zinc-950">{value}</p>
        </div>
      ))}
    </div>
  );
}
