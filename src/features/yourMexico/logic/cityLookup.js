// Your Mexico — pure helpers for combining the Blueprint's city profiles
// with this feature's own richer content. No side effects, no state.

import { CITY_PROFILES } from "../../../decisionEngine/data/cityProfiles";
import { CITY_DETAILS } from "../data/cityDetails";

// DEST-003 — the 14 new bilingual destinations nest their deep-content
// fields (monthlyBudget, lifestyleSnapshot, neighborhoods, etc.) inside
// `content.en`/`content.es` rather than at the top level (see
// CityDetailPage.js's own resolveActiveContent for why: it lets that page
// pick either language without any other component needing to know
// bilingual content exists at all). Every OTHER consumer of these merge
// helpers — CompareYourMatches.js, ResultsCityMatch.js, KeepExploring.js,
// and anywhere else that reads e.g. city.monthlyBudget directly — has no
// such lang-awareness and was silently getting `undefined` for every new
// destination as a result. Spreading `content.en` onto the flat merged
// object (English, matching every non-CityDetailPage surface's existing
// English-only convention) fixes that for free, for every consumer, with
// no change needed anywhere else — `city.content` itself is left intact
// alongside the flattened fields, so CityDetailPage.js's own bilingual
// resolution is completely unaffected.
function mergeCityRecord(profile, details) {
  if (!profile || !details) return null;
  const englishContent = details.content ? details.content.en || {} : {};
  return { ...profile, ...details, ...englishContent };
}

// Full record for a single city, or null if the id isn't recognized by
// either data source.
export function getCityById(cityId) {
  const profile = CITY_PROFILES.find((city) => city.id === cityId);
  const details = CITY_DETAILS[cityId];
  return mergeCityRecord(profile, details);
}

// Enriches the Blueprint recommendation's topCityMatches (id, name, teaser,
// guideLink, matchScore, matchReason) with this feature's tagline/heroImage.
export function getMatchesWithDetails(topCityMatches) {
  return (topCityMatches || [])
    .map((match) => {
      const details = CITY_DETAILS[match.id];
      return details ? mergeCityRecord(match, details) : null;
    })
    .filter(Boolean);
}

// All destinations, unranked — the fallback used when a visitor reaches
// Your Mexico without a completed Blueprint (no personalized order exists).
export function getAllCities() {
  return CITY_PROFILES.map((profile) => mergeCityRecord(profile, CITY_DETAILS[profile.id])).filter(
    (city) => city && city.tagline
  );
}

// Every other city besides the one being viewed, preserving whatever order
// `cities` was already in (ranked or unranked).
export function getOtherCities(cities, currentCityId) {
  return (cities || []).filter((city) => city.id !== currentCityId);
}
