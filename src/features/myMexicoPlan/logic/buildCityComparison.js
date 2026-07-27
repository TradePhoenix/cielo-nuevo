// My Mexico Plan — City Comparison Workspace engine. Same discipline as
// buildDecisionBrief.js, buildCostPlanner.js, buildAdaptiveChecklist.js,
// and buildReadinessAssessment.js: a pure function, fixed input, fixed
// output shape, no side effects, no AI, no invented data.
//
// Every field here is selected from data that already exists — nothing
// is computed fresh. matchScore/matchReason/decisionTrace come straight
// from decisionEngine's buildRecommendation() (ENG-012, ENG-016);
// pros/tradeoffs come straight from yourMexico's own CITY_DETAILS
// (already published on every City Detail page and Your Mexico's own
// Compare page). This is the first real consumer of ENG-016's
// decisionTrace field, exactly as that ticket's own comment anticipated:
// "so a future 'Why this city?' UI can read this trace directly instead
// of re-deriving reasoning from scratch."
//
// This is the seam a future AI layer could enrich (e.g. a richer written
// "why this city" narrative per match) without changing the output shape
// or any component that renders it.

const MAX_PRIORITIES = 2;

// PTM Spanish-parity pass: added the `lang` parameter (default "en") for
// this file's own verifyPersonally copy. `pros`/`tradeoffs` come from
// yourMexico's CITY_DETAILS via cityLookup.js's mergeCityRecord(), which
// deliberately flattens `content.en` for every non-CityDetailPage
// consumer (see that file's own comment) — full destination-narrative
// translation is explicitly out of scope for this pass, so those two
// fields stay English here, same as everywhere else that reads them.
//
// matches: yourMexico's getMatchesWithDetails(recommendation.topCityMatches)
// output — already ranked, already merged with CITY_DETAILS.
export function buildCityComparison(matches, lang = "en") {
  const cities = (matches || []).map((city, index) => {
    const strongestPriorities = [...(city.decisionTrace || [])]
      .sort((a, b) => b.contribution - a.contribution)
      .slice(0, MAX_PRIORITIES)
      .map((entry) => entry.explanation);

    return {
      id: city.id,
      name: city.name,
      rank: index + 1,
      isTopMatch: index === 0,
      matchScore: city.matchScore,
      matchReason: city.matchReason,
      strongestPriorities,
      pros: city.pros || [],
      tradeoffs: city.tradeoffs || [],
      cityPageLink: `/your-mexico/${city.id}`,
      guideLink: city.guideLink,
    };
  });

  const verifyPersonally =
    lang === "es"
      ? [
          "Detalles a nivel de colonia, seguridad y costos exactos — son caracterizaciones generales, no anuncios actuales ni garantías.",
          "Tu propia reacción a cada ciudad en persona — una descripción no puede capturar del todo cómo se siente un lugar día a día.",
          "Los detalles específicos de tu presupuesto personal y el tipo de cambio de hoy — consulta el Planificador de Costos arriba para un rango inicial.",
        ]
      : [
          "Neighborhood-level details, safety, and exact costs — these are general characterizations, not current listings or guarantees.",
          "Your own reaction to each city in person — a description can't fully capture how a place feels day to day.",
          "Your personal budget specifics and today's exchange rate — see the Cost Planner above for a starting range.",
        ];

  return {
    topMatchId: cities[0] ? cities[0].id : null,
    cities,
    verifyPersonally,
  };
}
