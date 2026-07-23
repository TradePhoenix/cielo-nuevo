// Smart Guide Journey — maps every existing guide to one of the five
// Relocation Roadmap stages (src/data/relocationRoadmap.js) and derives
// "continue reading" recommendations from that mapping alone. Deliberately
// rule-based rather than hand-curated per guide: recommendations always
// prefer other guides in the same stage first, then the closest adjacent
// stages. This keeps sequencing entirely data-driven — reassigning a
// guide's stage below is the only edit ever needed; getGuideJourney()
// itself never needs to change.
//
// getGuideJourney() is a pure function (no side effects, no React) with a
// fixed { stage, recommendations } output shape, so a future caller
// (ContinueYourJourney.js) can pass a different, AI-personalized result in
// its place — e.g. ranked by a visitor's actual Blueprint answers — without
// any change to this file or to the component that renders it.

import { GUIDES } from "./guides";
import { RELOCATION_ROADMAP_STAGES } from "./relocationRoadmap";

const STAGE_ORDER = RELOCATION_ROADMAP_STAGES.map((stage) => stage.id);

export const GUIDE_STAGE_MAP = {
  "/guides/cost-of-living-playa-del-carmen": "plan",
  "/guides/temporary-residency-mexico": "prepare",
  "/guides/healthcare-in-mexico-for-canadians": "prepare",
  "/guides/best-areas-to-live-in-playa-del-carmen": "plan",
  "/guides/renting-vs-buying-in-mexico": "settle",
  "/guides/bringing-pets-to-mexico": "prepare",
  "/guides/banking-in-mexico-as-a-foreigner": "prepare",
  "/guides/internet-and-remote-work-in-mexico": "arrive",
  "/guides/tulum-vs-playa-del-carmen": "explore",
  "/guides/how-much-money-do-you-need-to-move-to-mexico": "explore",
  "/guides/safety-in-mexico": "arrive",
  "/guides/grocery-costs-in-mexico": "arrive",
  "/guides/moving-to-playa-del-carmen": "plan",
  "/guides/moving-to-tulum": "plan",
  "/guides/moving-to-riviera-maya": "plan",
  "/guides/moving-to-merida": "plan",
  "/guides/moving-to-progreso": "plan",
  "/guides/moving-to-chicxulub-puerto": "plan",
  "/guides/moving-to-telchac-puerto": "plan",
  "/guides/canada-to-mexico-relocation": "explore",
  "/guides/us-to-mexico-relocation": "explore",
  "/guides/mexico-residency-support": "settle",
  "/guides/retiring-in-mexico": "explore",
  "/guides/remote-workers-moving-to-mexico": "explore",
  "/guides/mexico-relocation-checklist": "prepare",
};

// Stage ids ordered by closeness to `stageId`, current stage first, then
// nearest neighbors, preferring a step forward through the journey over a
// step back on ties. Used to fill recommendations from adjacent stages
// when a guide's own stage doesn't have enough other guides in it.
function stageIdsByDistance(stageId) {
  const originIndex = STAGE_ORDER.indexOf(stageId);
  return STAGE_ORDER.map((id, index) => ({
    id,
    distance: Math.abs(index - originIndex),
    isForward: index >= originIndex,
  }))
    .sort((a, b) => a.distance - b.distance || (a.isForward === b.isForward ? 0 : a.isForward ? -1 : 1))
    .map((entry) => entry.id);
}

// currentHref: the guide's own route (must match a `href` in guides.js).
// Returns { stage: null, recommendations: [] } for any href not present in
// GUIDE_STAGE_MAP, so callers can safely render nothing rather than guess.
export function getGuideJourney(currentHref, count = 3) {
  const stageId = GUIDE_STAGE_MAP[currentHref];
  const stage = RELOCATION_ROADMAP_STAGES.find((entry) => entry.id === stageId) || null;
  if (!stage) return { stage: null, recommendations: [] };

  const recommendations = [];
  for (const candidateStageId of stageIdsByDistance(stageId)) {
    const candidates = GUIDES.filter(
      (guide) => guide.href !== currentHref && GUIDE_STAGE_MAP[guide.href] === candidateStageId
    );
    for (const candidate of candidates) {
      if (recommendations.length >= count) break;
      recommendations.push(candidate);
    }
    if (recommendations.length >= count) break;
  }

  return { stage, recommendations };
}
