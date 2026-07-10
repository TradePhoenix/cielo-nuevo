import CitySection from "./CitySection";

// Category order/labels are presentation, not content — city.lifestyleSnapshot
// only supplies { value, detail } per key, keeping data and layout separate.
const CATEGORIES = [
  { key: "pace", label: "Pace Of Life" },
  { key: "walkability", label: "Walkability" },
  { key: "internet", label: "Internet Reliability" },
  { key: "healthcare", label: "Healthcare Access" },
  { key: "airportAccess", label: "Airport Access" },
  { key: "climate", label: "Climate" },
  { key: "community", label: "Community Style" },
];

export default function LifestyleSnapshot({ city }) {
  const snapshot = city.lifestyleSnapshot;
  if (!snapshot) return null;

  return (
    <CitySection eyebrow="Lifestyle Snapshot" title={`Life in ${city.name}, at a glance`}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map(({ key, label }) => {
          const entry = snapshot[key];
          if (!entry) return null;
          return (
            <div key={key} className="border border-zinc-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</p>
              <p className="mt-2 text-lg font-light tracking-[-0.01em]">{entry.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{entry.detail}</p>
            </div>
          );
        })}
      </div>
    </CitySection>
  );
}
