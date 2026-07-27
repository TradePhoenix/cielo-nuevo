// Ask Path knowledge source: guide summaries.
//
// MVP scope is "carefully curated bilingual guide SUMMARIES," explicitly not
// full guide bodies (see docs/ask-path/PHASE_2.md — full guide-body
// ingestion is deferred, partly because src/components/ArticleSection.js
// has a standing, pre-existing bug where a guide article's body children
// never render, and partly because the 27 guide bodies live as JSX in
// individual page components, not as reusable data). Rather than write new
// summary prose duplicating src/data/guides.js's own bilingual index
// descriptions, this imports that file directly — it's already
// editorially-curated bilingual copy used across the site (GuidesPage,
// Smart Guide Journey), so re-authoring separate "summaries" would just be
// a second, driftable copy of the same facts.

import { GUIDES } from "../../../src/data/guides.js";

export function buildGuideSummaryRecords() {
  return GUIDES.map((guide) => ({
    id: `guide-${guide.href}`,
    title: { en: guide.title.en, es: guide.title.es },
    category: "guide-summary",
    route: guide.href,
    lastReviewed: "2026-07-26",
    keywords: [guide.category?.en, guide.category?.es].filter(Boolean),
    content: { en: guide.description.en, es: guide.description.es },
  }));
}
