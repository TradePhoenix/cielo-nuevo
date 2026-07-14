import { formatDisplayDate } from "../utils/formatDate";

/**
 * @param {string} [updatedAt] - ISO date string
 */
export default function LastUpdated({ updatedAt }) {
  const display = formatDisplayDate(updatedAt);
  if (!display) return null;

  return (
    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
      Updated <time dateTime={updatedAt}>{display}</time>
    </p>
  );
}
