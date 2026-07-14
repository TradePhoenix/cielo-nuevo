export function formatCurrency(value, currency = "USD") {
  if (typeof value !== "number") return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatBudgetRange(budget) {
  if (!budget) return "—";
  return `${formatCurrency(budget.min, budget.currency)} – ${formatCurrency(budget.max, budget.currency)}/mo`;
}

export function initialsFor(fullName) {
  if (!fullName) return "—";
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}
