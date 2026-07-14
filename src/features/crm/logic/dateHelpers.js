// Shared date math for the CRM. Dates throughout the feature are plain
// "YYYY-MM-DD" strings (matching every other feature's data files), parsed
// here as local midnight so day-based comparisons (overdue/today/upcoming)
// never drift on timezone offsets the way `new Date("YYYY-MM-DD")` can.
export function parseDateOnly(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function daysBetween(dateString, referenceDate = startOfToday()) {
  const target = parseDateOnly(dateString);
  if (!target) return null;
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((target.getTime() - referenceDate.getTime()) / msPerDay);
}

export function isPast(dateString, referenceDate = startOfToday()) {
  const diff = daysBetween(dateString, referenceDate);
  return diff !== null && diff < 0;
}

export function isToday(dateString, referenceDate = startOfToday()) {
  return daysBetween(dateString, referenceDate) === 0;
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(dateString) {
  if (!dateString) return "—";
  const date = parseDateOnly(dateString);
  if (!date) return "—";
  return `${MONTH_LABELS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatRelativeDate(dateString, referenceDate = startOfToday()) {
  if (!dateString) return "—";
  const diff = daysBetween(dateString, referenceDate);
  if (diff === null) return "—";
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff > 1 && diff <= 7) return `In ${diff} days`;
  if (diff < -1 && diff >= -7) return `${Math.abs(diff)} days ago`;
  return formatDate(dateString);
}
