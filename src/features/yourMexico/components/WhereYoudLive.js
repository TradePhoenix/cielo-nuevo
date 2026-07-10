import CitySection from "./CitySection";

export default function WhereYoudLive({ city }) {
  const neighborhoods = city.neighborhoods;
  if (!neighborhoods || neighborhoods.length === 0) return null;

  return (
    <CitySection eyebrow="Where You'd Probably Live" title={`A few areas worth knowing in ${city.name}`}>
      <div className="grid gap-6 sm:grid-cols-3">
        {neighborhoods.map((area) => (
          <div key={area.name} className="border border-zinc-200 bg-white p-6">
            <h3 className="text-xl font-light tracking-[-0.01em]">{area.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">{area.description}</p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Best Suited For</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-700">{area.bestFor}</p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Honest Trade-off</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-700">{area.tradeoff}</p>
          </div>
        ))}
      </div>
    </CitySection>
  );
}
