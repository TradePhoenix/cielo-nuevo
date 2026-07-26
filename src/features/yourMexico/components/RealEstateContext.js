import CitySection from "./CitySection";

// DEST-003 — housing/real-estate context, kept deliberately separate from
// monthlyBudget (which already covers renting) — this section is about the
// broader housing landscape: what property types exist, how ownership
// actually works for foreigners here, and what to verify before assuming
// anything. No prices beyond what monthlyBudget.housing already states;
// this section never repeats or invents a number of its own.
export default function RealEstateContext({ city }) {
  const realEstate = city.realEstate;
  if (!realEstate) return null;

  return (
    <CitySection eyebrow="Real Estate & Housing" title={`Housing in ${city.name}`}>
      <div className="border border-zinc-200 bg-white p-8 sm:p-10">
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-700">{realEstate.overview}</p>
        {realEstate.considerations && realEstate.considerations.length > 0 && (
          <ul className="mt-6 space-y-4">
            {realEstate.considerations.map((point) => (
              <li key={point} className="flex gap-3 text-base leading-relaxed text-zinc-600">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-400" />
                {point}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6 text-xs leading-relaxed text-zinc-400">
          General information only, not legal or real estate advice — confirm current ownership rules,
          zoning, and title status with a qualified Mexican notary or attorney before any purchase.
        </p>
      </div>
    </CitySection>
  );
}
