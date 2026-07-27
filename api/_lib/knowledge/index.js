// Ask Path knowledge index — the single place that assembles every source
// record Ask Path can ground an answer in. See
// docs/ask-path/KNOWLEDGE_SOURCES.md for exactly what's indexed, what isn't
// (full guide bodies — Phase 2), and the bilingual-coverage caveats per
// category.
//
// Deliberately NOT a database or vector store: this is a small, in-memory
// array assembled fresh per cold start, scored deterministically per
// request in retrieval.js. Adding a new source category is one new file
// here plus one line below.

import { buildDestinationRecords } from "./destinations.js";
import { buildFaqRecords } from "./faq.js";
import { buildServiceRecords } from "./services.js";
import { buildPlanningToolRecords } from "./planningTools.js";
import { buildGuideSummaryRecords } from "./guides.js";
import { buildRoadmapRecords } from "./roadmap.js";

let cachedRecords = null;

export function getKnowledgeRecords() {
  if (cachedRecords) return cachedRecords;

  cachedRecords = [
    ...buildDestinationRecords(),
    ...buildFaqRecords(),
    ...buildServiceRecords(),
    ...buildPlanningToolRecords(),
    ...buildGuideSummaryRecords(),
    ...buildRoadmapRecords(),
  ];

  return cachedRecords;
}
