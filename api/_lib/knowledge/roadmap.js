// Ask Path knowledge source: the generic relocation roadmap (Explore / Plan
// / Prepare / Arrive / Settle). Imported directly from
// src/data/relocationRoadmap.js — already bilingual, already the site's own
// canonical "here's the shape of the journey" content (reused by
// RelocationRoadmap.js and ContinueYourJourney.js), so no duplication.

import { RELOCATION_ROADMAP_STAGES } from "../../../src/data/relocationRoadmap.js";

export function buildRoadmapRecords() {
  return RELOCATION_ROADMAP_STAGES.map((stage) => ({
    id: `roadmap-${stage.id}`,
    title: { en: stage.title.en, es: stage.title.es },
    category: "roadmap",
    route: stage.action.href,
    lastReviewed: "2026-07-26",
    keywords: ["roadmap", "journey", "next step", stage.id],
    content: { en: stage.description.en, es: stage.description.es },
  }));
}
