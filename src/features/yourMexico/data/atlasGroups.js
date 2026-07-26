// CX-008 — Living Destination Atlas: pure data + filtering logic, no React,
// no side effects. Deliberately separate from cityLookup.js (which merges
// CITY_PROFILES/CITY_DETAILS) — this file only ever consumes that already-
// merged city shape, it never reads the raw data sources itself.
//
// DEST-003 — REGION_GROUPS rewritten from 3 groups (11 destinations) to the
// locked 4-region taxonomy (25 destinations). This supersedes the old
// Caribbean Coast / Yucatán Gulf Coast / Inland & Culture scheme entirely —
// those ids no longer exist. Every one of the original 11 destinations is
// reassigned below; none are dropped, and this is a *region* reassignment
// only — Blueprint tags/matching (cityProfiles.js) are untouched.
//
// Still not a new data field on any city — a small, fixed, hand-maintained
// mapping, same as before, following the same "already stated in the
// destination's own content" methodology:
//   - Riviera Maya & Caribbean: the Quintana Roo Caribbean coast, from the
//     original three through the six DEST-003 additions (Puerto Morelos,
//     Cozumel, Bacalar, Mahahual, Akumal, Cancún).
//   - Yucatán Interior: inland, non-coastal, cultural destinations — Mérida
//     and Santa Elena plus DEST-003's Valladolid, Izamal, Tekax, Tizimín.
//   - Gulf Coast: the established, accessible Yucatán Gulf towns — Progreso,
//     Chicxulub Puerto, Telchac Puerto and Sisal (all explicitly describe
//     "real infrastructure"/"easy trip to Mérida" in their own content) plus
//     DEST-003's Chelem and Chuburná Puerto, both on the same corridor.
//   - Hidden Gems: the remote, nature-first, off-the-main-corridor towns —
//     Celestún and Dzilam de Bravo (both already describe themselves as
//     "the most remote"/"unhurried" in their own honestTruth text) move here
//     from the old Gulf Coast grouping, joined by DEST-003's El Cuyo and
//     Río Lagartos.
export const REGION_GROUPS = [
  {
    id: "riviera-maya-caribbean",
    labelEn: "Riviera Maya & Caribbean",
    labelEs: "Riviera Maya Y Caribe",
    descriptionEn: "Quintana Roo's Caribbean Sea coast, from established beach towns to a quiet island and a lagoon town inland.",
    descriptionEs: "La costa caribeña de Quintana Roo, desde pueblos de playa establecidos hasta una isla tranquila y un pueblo de laguna en el interior.",
    cityIds: [
      "playa-del-carmen",
      "tulum",
      "riviera-maya",
      "puerto-morelos",
      "cozumel",
      "bacalar",
      "mahahual",
      "akumal",
      "cancun",
    ],
  },
  {
    id: "yucatan-interior",
    labelEn: "Yucatán Interior",
    labelEs: "Interior De Yucatán",
    descriptionEn: "Inland colonial cities and villages built around culture, not beaches.",
    descriptionEs: "Ciudades y pueblos coloniales del interior, construidos alrededor de la cultura, no de la playa.",
    cityIds: ["merida", "santa-elena", "valladolid", "izamal", "tekax", "tizimin"],
  },
  {
    id: "gulf-coast",
    labelEn: "Gulf Coast",
    labelEs: "Costa Del Golfo",
    descriptionEn: "The established, accessible Gulf towns near Mérida.",
    descriptionEs: "Los pueblos establecidos y accesibles del Golfo cerca de Mérida.",
    cityIds: ["progreso", "chicxulub-puerto", "telchac-puerto", "sisal", "chelem", "chuburna-puerto"],
  },
  {
    id: "hidden-gems",
    labelEn: "Hidden Gems",
    labelEs: "Joyas Escondidas",
    descriptionEn: "Remote, nature-first towns off the main coastal corridor.",
    descriptionEs: "Pueblos remotos y centrados en la naturaleza, fuera del corredor costero principal.",
    cityIds: ["celestun", "dzilam-de-bravo", "el-cuyo", "rio-lagartos"],
  },
];

// Every id below is a real tag already present in decisionEngine's
// CITY_PROFILES (see cityProfiles.js) and already used by the Blueprint's
// own matching engine — this is a display relabeling of that same
// vocabulary for a destination-facing badge, not a new classification.
// Kept small and intentional, matching the six the ticket itself names.
export const LIFESTYLE_FILTERS = [
  { id: "beach", tag: "beach", labelEn: "Coastal", labelEs: "Costero" },
  { id: "urban", tag: "urban", labelEn: "City Energy", labelEs: "Energía Urbana" },
  { id: "natureFirst", tag: "natureFirst", labelEn: "Nature & Wildlife", labelEs: "Naturaleza Y Vida Silvestre" },
  { id: "heritage", tag: "heritage", labelEn: "Heritage & Culture", labelEs: "Patrimonio Y Cultura" },
  { id: "quiet", tag: "quiet", labelEn: "Quiet Living", labelEs: "Vida Tranquila" },
  { id: "remoteWork", tag: "remoteWork", labelEn: "Remote-Work Ready", labelEs: "Lista Para Trabajo Remoto" },
];

const CITY_TO_REGION = REGION_GROUPS.reduce((map, group) => {
  group.cityIds.forEach((cityId) => {
    map[cityId] = group.id;
  });
  return map;
}, {});

export function getRegionIdForCity(cityId) {
  return CITY_TO_REGION[cityId] || null;
}

export function getRegionGroup(regionId) {
  return REGION_GROUPS.find((group) => group.id === regionId) || null;
}

// cities: the already-merged city objects (getAllCities() shape — each has
// its own `tags` from CITY_PROFILES). regionId: a REGION_GROUPS id, or
// "all"/null for no region filter. lifestyleIds: array of LIFESTYLE_FILTERS
// ids the visitor has toggled on — a city must match every one selected
// (AND combination), matching the ticket's "filters must combine
// predictably" requirement.
export function filterAtlasCities(cities, { regionId, lifestyleIds } = {}) {
  const activeLifestyleTags = (lifestyleIds || [])
    .map((id) => LIFESTYLE_FILTERS.find((filter) => filter.id === id))
    .filter(Boolean)
    .map((filter) => filter.tag);

  return (cities || []).filter((city) => {
    if (regionId && regionId !== "all" && getRegionIdForCity(city.id) !== regionId) {
      return false;
    }
    if (activeLifestyleTags.length > 0) {
      const cityTags = city.tags || [];
      const matchesAll = activeLifestyleTags.every((tag) => cityTags.includes(tag));
      if (!matchesAll) return false;
    }
    return true;
  });
}

// Places the visitor's own Blueprint matches first (in their existing
// ranked order), then every remaining city in its original order — a
// stable reorder, never a re-score. matchedIds: ordered array of city ids
// already ranked by the real recommendation engine (recommendationEngine.js
// via useTopMatches()) — this function never computes a score itself.
export function prioritizeAtlasCities(cities, matchedIds) {
  if (!matchedIds || matchedIds.length === 0) return cities;
  const matchedSet = new Set(matchedIds);
  const byId = new Map(cities.map((city) => [city.id, city]));

  const prioritized = matchedIds.map((id) => byId.get(id)).filter(Boolean);
  const rest = cities.filter((city) => !matchedSet.has(city.id));
  return [...prioritized, ...rest];
}
