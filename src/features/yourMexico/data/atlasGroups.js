// CX-008 — Living Destination Atlas: pure data + filtering logic, no React,
// no side effects. Deliberately separate from cityLookup.js (which merges
// CITY_PROFILES/CITY_DETAILS) — this file only ever consumes that already-
// merged city shape, it never reads the raw data sources itself.
//
// REGION_GROUPS is not a new data field on any city — it's a small, fixed
// mapping derived from facts every affected city's own cityDetails.js
// content already states in plain language (Caribbean Sea / Gulf coast /
// inland, no sea breeze). Nothing here asserts a geographic relationship
// that isn't already written into the destination's own published content:
//   - Caribbean Coast: Playa del Carmen, Tulum, Riviera Maya — Quintana Roo's
//     Caribbean side (see e.g. each city's own tagline/heroAlt referencing
//     the Caribbean Sea).
//   - Yucatán Gulf Coast: Progreso, Chicxulub Puerto, Telchac Puerto,
//     Celestún, Sisal, Dzilam de Bravo — all explicitly Gulf-coast towns in
//     their own honestTruth/lifestyleSnapshot text ("Gulf breeze", "Gulf
//     coast climate").
//   - Inland & Culture: Mérida, Santa Elena — the only two destinations on
//     the site that are not coastal at all (Mérida's own cityDetails.js
//     note: "inland... less sea breeze"; Santa Elena's: "no sea breeze at
//     all").
export const REGION_GROUPS = [
  {
    id: "caribbean-coast",
    labelEn: "Caribbean Coast",
    labelEs: "Costa Caribe",
    descriptionEn: "Quintana Roo's Caribbean Sea towns.",
    descriptionEs: "Los pueblos de Quintana Roo sobre el mar Caribe.",
    cityIds: ["playa-del-carmen", "tulum", "riviera-maya"],
  },
  {
    id: "yucatan-gulf-coast",
    labelEn: "Yucatán Gulf Coast",
    labelEs: "Costa del Golfo de Yucatán",
    descriptionEn: "The Gulf towns near Mérida, from established to secluded.",
    descriptionEs: "Los pueblos del Golfo cerca de Mérida, de establecidos a apartados.",
    cityIds: ["progreso", "chicxulub-puerto", "telchac-puerto", "celestun", "sisal", "dzilam-de-bravo"],
  },
  {
    id: "inland-culture",
    labelEn: "Inland & Culture",
    labelEs: "Interior Y Cultura",
    descriptionEn: "Mérida and Santa Elena — inland, cultural, not beach destinations.",
    descriptionEs: "Mérida y Santa Elena — destinos del interior y culturales, no de playa.",
    cityIds: ["merida", "santa-elena"],
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
