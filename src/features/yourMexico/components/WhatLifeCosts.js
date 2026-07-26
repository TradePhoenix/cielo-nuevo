import CitySection from "./CitySection";

// Line-item order/labels are presentation — city.monthlyBudget only supplies
// the figures (plus an optional `note`), keeping data and layout separate.
const LINE_ITEMS = [
  { key: "housing", label: { en: "Housing", es: "Vivienda" } },
  { key: "groceries", label: { en: "Groceries", es: "Supermercado" } },
  { key: "dining", label: { en: "Dining Out", es: "Comer Fuera" } },
  { key: "transportation", label: { en: "Transportation", es: "Transporte" } },
  { key: "utilities", label: { en: "Utilities", es: "Servicios" } },
  { key: "internet", label: { en: "Coworking / Internet", es: "Coworking / Internet" } },
];

const TEXT = {
  en: {
    eyebrow: "What Life Costs",
    title: (name) => `A realistic monthly budget in ${name}`,
    total: "Estimated Monthly Total",
    disclaimer: "Estimates only — actual costs vary by lifestyle, season, and exchange rate.",
  },
  es: {
    eyebrow: "Lo Que Cuesta La Vida",
    title: (name) => `Un presupuesto mensual realista en ${name}`,
    total: "Total Mensual Estimado",
    disclaimer: "Solo estimaciones — los costos reales varían según el estilo de vida, la temporada y el tipo de cambio.",
  },
};

export default function WhatLifeCosts({ city, lang = "en" }) {
  const budget = city.monthlyBudget;
  if (!budget) return null;
  const t = TEXT[lang] || TEXT.en;

  return (
    <CitySection eyebrow={t.eyebrow} title={t.title(city.name)}>
      <div className="border border-zinc-200 bg-white p-8 sm:p-10">
        <dl className="divide-y divide-zinc-200">
          {LINE_ITEMS.map(({ key, label }) => {
            const value = budget[key];
            if (!value) return null;
            return (
              <div key={key} className="flex items-center justify-between gap-4 py-3">
                <dt className="text-sm text-zinc-600">{label[lang] || label.en}</dt>
                <dd className="text-sm font-semibold tabular-nums text-zinc-950">{value}</dd>
              </div>
            );
          })}
        </dl>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-zinc-950 pt-4">
          <p className="text-sm font-semibold uppercase tracking-[0.15em]">{t.total}</p>
          <p className="text-xl font-light tabular-nums tracking-[-0.01em]">{budget.estimatedTotal}</p>
        </div>

        {budget.note && <p className="mt-6 text-sm leading-relaxed text-zinc-600">{budget.note}</p>}

        <p className="mt-6 text-xs uppercase tracking-[0.15em] text-zinc-400">{t.disclaimer}</p>
      </div>
    </CitySection>
  );
}
