import { Link } from "react-router-dom";

// Row order/labels are presentation — each city's own lifestyleSnapshot /
// monthlyBudget already carries the values, keeping data and layout
// separate. Desktop gets a real, scannable table; mobile gets stacked
// per-city cards rather than a cramped horizontally-scrolled table, so
// comparing never requires scrolling in two directions at once.
const ROWS = [
  { key: "cost", label: { en: "Estimated Monthly Cost", es: "Costo Mensual Estimado" }, value: (city) => city.monthlyBudget?.estimatedTotal },
  { key: "pace", label: { en: "Pace Of Life", es: "Ritmo De Vida" }, value: (city) => city.lifestyleSnapshot?.pace?.value },
  { key: "walkability", label: { en: "Walkability", es: "Caminabilidad" }, value: (city) => city.lifestyleSnapshot?.walkability?.value },
  { key: "healthcare", label: { en: "Healthcare Access", es: "Acceso A Salud" }, value: (city) => city.lifestyleSnapshot?.healthcare?.value },
  { key: "internet", label: { en: "Internet Reliability", es: "Confiabilidad De Internet" }, value: (city) => city.lifestyleSnapshot?.internet?.value },
  { key: "airportAccess", label: { en: "Airport Access", es: "Acceso Al Aeropuerto" }, value: (city) => city.lifestyleSnapshot?.airportAccess?.value },
  { key: "climate", label: { en: "Climate", es: "Clima" }, value: (city) => city.lifestyleSnapshot?.climate?.value },
  { key: "community", label: { en: "Community Style", es: "Tipo De Comunidad" }, value: (city) => city.lifestyleSnapshot?.community?.value },
];

const SR_LABEL = { en: "Attribute", es: "Atributo" };

const CITY_LINK_CLASS =
  "text-xl font-light tracking-[-0.01em] text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

// Cities passed in are always the English-flattened merge (cityLookup.js's
// mergeCityRecord spreads content.en onto the top level for every consumer
// that isn't lang-aware) — but the original `content` object survives that
// spread untouched. So when `lang` is Spanish, re-resolve each city's
// lifestyleSnapshot/monthlyBudget against its own `content.es` here, rather
// than touching cityLookup.js's shared default (other non-lang-aware callers
// still need the English flatten to keep working exactly as before).
function localize(city, lang) {
  if (lang !== "es" || !city.content?.es) return city;
  return { ...city, ...city.content.es };
}

export default function CompareYourMatches({ cities, lang = "en" }) {
  if (!cities || cities.length === 0) return null;
  const srLabel = SR_LABEL[lang] || SR_LABEL.en;
  const localizedCities = cities.map((city) => localize(city, lang));

  return (
    <div>
      {/* Desktop: a real, scannable table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-zinc-950">
              <th scope="col" className="py-4 pr-4">
                <span className="sr-only">{srLabel}</span>
              </th>
              {localizedCities.map((city) => (
                <th key={city.id} scope="col" className="px-4 py-4 align-bottom">
                  <Link to={`/your-mexico/${city.id}`} className={CITY_LINK_CLASS}>
                    {city.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key} className="border-b border-zinc-200">
                <th scope="row" className="whitespace-nowrap py-4 pr-4 text-sm font-medium text-zinc-500">
                  {row.label[lang] || row.label.en}
                </th>
                {localizedCities.map((city) => (
                  <td key={city.id} className="px-4 py-4 text-sm text-zinc-800">
                    {row.value(city) || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked per-city cards, no horizontal scroll required */}
      <div className="grid gap-6 md:hidden">
        {localizedCities.map((city) => (
          <div key={city.id} className="border border-zinc-200 bg-white p-6">
            <Link to={`/your-mexico/${city.id}`} className={CITY_LINK_CLASS}>
              {city.name}
            </Link>
            <dl className="mt-4 divide-y divide-zinc-100">
              {ROWS.map((row) => (
                <div key={row.key} className="flex items-start justify-between gap-4 py-2.5">
                  <dt className="text-xs uppercase tracking-[0.15em] text-zinc-500">{row.label[lang] || row.label.en}</dt>
                  <dd className="text-right text-sm text-zinc-800">{row.value(city) || "—"}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
