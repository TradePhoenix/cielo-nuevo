/**
 * Formats an ISO date string ("2026-06-30") for display, e.g. "June 30, 2026".
 * Returns null for missing/invalid input so callers can conditionally render.
 * @param {string} [isoDate]
 * @returns {string|null}
 */
export function formatDisplayDate(isoDate) {
  if (!isoDate) return null;
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
