import { useMemo } from "react";

/**
 * Derives {id, label} TOC entries directly from a guide's sections, so the
 * table of contents can never drift out of sync with the actual headings
 * rendered in the article body.
 * @param {import('../types/guide').GuideSection[]} sections
 * @returns {{id: string, label: string}[]}
 */
export function useTableOfContents(sections = []) {
  return useMemo(
    () => sections.map((section) => ({ id: section.id, label: section.heading })),
    [sections]
  );
}
