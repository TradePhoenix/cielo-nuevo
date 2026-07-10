import CitySection from "./CitySection";

// Line-item order/labels are presentation — city.monthlyBudget only supplies
// the figures (plus an optional `note`), keeping data and layout separate.
const LINE_ITEMS = [
  { key: "housing", label: "Housing" },
  { key: "groceries", label: "Groceries" },
  { key: "dining", label: "Dining Out" },
  { key: "transportation", label: "Transportation" },
  { key: "utilities", label: "Utilities" },
  { key: "internet", label: "Coworking / Internet" },
];

export default function WhatLifeCosts({ city }) {
  const budget = city.monthlyBudget;
  if (!budget) return null;

  return (
    <CitySection eyebrow="What Life Costs" title={`A realistic monthly budget in ${city.name}`}>
      <div className="border border-zinc-200 bg-white p-8 sm:p-10">
        <dl className="divide-y divide-zinc-200">
          {LINE_ITEMS.map(({ key, label }) => {
            const value = budget[key];
            if (!value) return null;
            return (
              <div key={key} className="flex items-center justify-between gap-4 py-3">
                <dt className="text-sm text-zinc-600">{label}</dt>
                <dd className="text-sm font-semibold tabular-nums text-zinc-950">{value}</dd>
              </div>
            );
          })}
        </dl>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-zinc-950 pt-4">
          <p className="text-sm font-semibold uppercase tracking-[0.15em]">Estimated Monthly Total</p>
          <p className="text-xl font-light tabular-nums tracking-[-0.01em]">{budget.estimatedTotal}</p>
        </div>

        {budget.note && <p className="mt-6 text-sm leading-relaxed text-zinc-600">{budget.note}</p>}

        <p className="mt-6 text-xs uppercase tracking-[0.15em] text-zinc-400">
          Estimates only — actual costs vary by lifestyle, season, and exchange rate.
        </p>
      </div>
    </CitySection>
  );
}
