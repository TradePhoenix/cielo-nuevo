import CitySection from "./CitySection";

// Category order/labels are presentation, not content — city.lifestyleSnapshot
// only supplies { value, detail } per key, keeping data and layout separate.
const CATEGORIES = [
  { key: "pace", label: { en: "Pace Of Life", es: "Ritmo De Vida" } },
  { key: "walkability", label: { en: "Walkability", es: "Caminabilidad" } },
  { key: "internet", label: { en: "Internet Reliability", es: "Confiabilidad De Internet" } },
  { key: "healthcare", label: { en: "Healthcare Access", es: "Acceso A Salud" } },
  { key: "safety", label: { en: "Safety", es: "Seguridad" } },
  { key: "transportation", label: { en: "Getting Around", es: "Movilidad" } },
  { key: "airportAccess", label: { en: "Airport Access", es: "Acceso Al Aeropuerto" } },
  { key: "climate", label: { en: "Climate", es: "Clima" } },
  { key: "community", label: { en: "Community Style", es: "Tipo De Comunidad" } },
];

const TEXT = {
  en: { eyebrow: "Lifestyle Snapshot", title: (name) => `Life in ${name}, at a glance` },
  es: { eyebrow: "Panorama De Vida", title: (name) => `La vida en ${name}, de un vistazo` },
};

export default function LifestyleSnapshot({ city, lang = "en" }) {
  const snapshot = city.lifestyleSnapshot;
  if (!snapshot) return null;
  const t = TEXT[lang] || TEXT.en;

  return (
    <CitySection eyebrow={t.eyebrow} title={t.title(city.name)}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map(({ key, label }) => {
          const entry = snapshot[key];
          if (!entry) return null;
          return (
            <div key={key} className="border border-zinc-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{label[lang] || label.en}</p>
              <p className="mt-2 text-lg font-light tracking-[-0.01em]">{entry.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{entry.detail}</p>
            </div>
          );
        })}
      </div>
    </CitySection>
  );
}
