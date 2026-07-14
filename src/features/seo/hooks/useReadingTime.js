import { useMemo } from "react";
import { estimateReadingTime } from "../utils/readingTime";

/**
 * Memoized reading-time estimate for a guide's sections.
 * @param {import('../types/guide').GuideSection[]} sections
 * @returns {number} whole minutes
 */
export function useReadingTime(sections) {
  return useMemo(() => estimateReadingTime(sections), [sections]);
}
