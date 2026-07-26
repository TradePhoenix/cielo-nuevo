import CitySection from "./CitySection";

const TEXT = {
  en: {
    eyebrow: "Real Estate & Housing",
    title: (name) => `Housing in ${name}`,
    disclaimer:
      "General information only, not legal or real estate advice — confirm current ownership rules, zoning, and title status with a qualified Mexican notary or attorney before any purchase.",
  },
  es: {
    eyebrow: "Bienes Raíces Y Vivienda",
    title: (name) => `Vivienda en ${name}`,
    disclaimer:
      "Información general únicamente, no es asesoría legal ni inmobiliaria — confirma las reglas de propiedad vigentes, la zonificación y el estatus del título con un notario o abogado mexicano calificado antes de cualquier compra.",
  },
};

// DEST-003 — housing/real-estate context, kept deliberately separate from
// monthlyBudget (which already covers renting) — this section is about the
// broader housing landscape: what property types exist, how ownership
// actually works for foreigners here, and what to verify before assuming
// anything. No prices beyond what monthlyBudget.housing already states;
// this section never repeats or invents a number of its own.
export default function RealEstateContext({ city, lang = "en" }) {
  const realEstate = city.realEstate;
  if (!realEstate) return null;
  const t = TEXT[lang] || TEXT.en;

  return (
    <CitySection eyebrow={t.eyebrow} title={t.title(city.name)}>
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
        <p className="mt-6 text-xs leading-relaxed text-zinc-400">{t.disclaimer}</p>
      </div>
    </CitySection>
  );
}
