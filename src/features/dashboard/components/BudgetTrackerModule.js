import ModuleCard from "./ModuleCard";

// Row order/labels are presentation — the city's own monthlyBudget data
// (yourMexico/data/cityDetails.js) only supplies the figures, same
// separation already used by Your Mexico's own WhatLifeCosts component.
const LINE_ITEMS = [
  { key: "housing", label: "Housing" },
  { key: "groceries", label: "Groceries" },
  { key: "dining", label: "Dining Out" },
  { key: "transportation", label: "Transportation" },
  { key: "utilities", label: "Utilities" },
  { key: "internet", label: "Coworking / Internet" },
];

export default function BudgetTrackerModule({ city }) {
  if (!city || !city.monthlyBudget) {
    return (
      <ModuleCard eyebrow="Budget Tracker" title="No plan yet">
        <p className="text-sm leading-relaxed text-zinc-600">Build your Mexico Plan to see your target budget.</p>
      </ModuleCard>
    );
  }

  const budget = city.monthlyBudget;

  return (
    <ModuleCard eyebrow={`Budget Tracker · ${city.name}`} title={budget.estimatedTotal}>
      <dl className="divide-y divide-zinc-100">
        {LINE_ITEMS.map(
          ({ key, label }) =>
            budget[key] && (
              <div key={key} className="flex items-center justify-between py-2 text-sm">
                <dt className="text-zinc-600">{label}</dt>
                <dd className="font-medium tabular-nums text-zinc-950">{budget[key]}</dd>
              </div>
            )
        )}
      </dl>
      <p className="mt-4 text-xs uppercase tracking-[0.15em] text-zinc-400">
        Your Target Range — Not Live Spend Tracking
      </p>
    </ModuleCard>
  );
}
