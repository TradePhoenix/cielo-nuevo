// Launch countdown logic for the internal Launch Command Center.
// All date math happens in America/Cancun local time (no DST since 2015,
// fixed UTC-5) so the countdown flips at midnight Cancun time regardless
// of where the dashboard is opened.

export const LAUNCH_TIME_ZONE = "America/Cancun";

export const LAUNCH_DATE = { year: 2026, month: 10, day: 1 };

// Returns { year, month, day } for `date` as observed in America/Cancun.
export function getCancunDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: LAUNCH_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

// Whole calendar days from `date` (Cancun-local) until October 1, 2026.
// 0 on launch day; negative after launch.
export function daysUntilLaunch(date = new Date()) {
  const today = getCancunDateParts(date);
  const todayUTC = Date.UTC(today.year, today.month - 1, today.day);
  const launchUTC = Date.UTC(
    LAUNCH_DATE.year,
    LAUNCH_DATE.month - 1,
    LAUNCH_DATE.day
  );
  return Math.round((launchUTC - todayUTC) / 86400000);
}

// Display state for the countdown: counting down, launch day, or launched.
// Never returns a negative day count.
export function getCountdownDisplay(date = new Date()) {
  const days = daysUntilLaunch(date);
  if (days > 0) return { mode: "countdown", days, label: String(days) };
  if (days === 0) return { mode: "launch-day", days: 0, label: "LAUNCH DAY" };
  return { mode: "launched", days: 0, label: "LAUNCHED" };
}

export const MILESTONES = [
  { t: 45, title: "T-45", detail: "Core operations proven" },
  { t: 30, title: "T-30", detail: "Revenue flow + CRM + client delivery functioning" },
  { t: 21, title: "T-21", detail: "Client acquisition engine active" },
  { t: 14, title: "T-14", detail: "Full production QA + launch rehearsal" },
  { t: 7, title: "T-7", detail: "Only launch-blocking corrections permitted" },
  { t: 1, title: "T-1", detail: "Final verification" },
  { t: 0, title: "OCT 1", detail: "LAUNCH" },
];

// Marks each milestone relative to today: "past", "current" (the next
// milestone coming up, or today's), or "upcoming".
export function getMilestoneStates(date = new Date()) {
  const days = daysUntilLaunch(date);
  const nextIndex = MILESTONES.findIndex((m) => m.t <= days);
  return MILESTONES.map((m, i) => ({
    ...m,
    state:
      m.t > days ? "past" : i === nextIndex ? "current" : "upcoming",
  }));
}
