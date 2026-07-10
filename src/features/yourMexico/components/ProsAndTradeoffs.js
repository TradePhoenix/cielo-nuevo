import CitySection from "./CitySection";

// The structured counterpart to The Honest Truth — short, comparison-ready
// bullets rather than narrative sentences. Stays within the site's
// monochrome palette (darker dot = pro, lighter dot = trade-off) rather
// than introducing a new green/red semantic accent.
export default function ProsAndTradeoffs({ city }) {
  const pros = city.pros;
  const tradeoffs = city.tradeoffs;
  if (!pros || !tradeoffs) return null;

  return (
    <CitySection eyebrow="Pros And Trade-offs" title={`${city.name}, weighed`}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="border border-zinc-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Pros</p>
          <ul className="mt-4 space-y-3">
            {pros.map((pro) => (
              <li key={pro} className="flex gap-3 text-sm leading-relaxed text-zinc-700">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-950" />
                {pro}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-zinc-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Trade-offs</p>
          <ul className="mt-4 space-y-3">
            {tradeoffs.map((tradeoff) => (
              <li key={tradeoff} className="flex gap-3 text-sm leading-relaxed text-zinc-700">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-300" />
                {tradeoff}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CitySection>
  );
}
