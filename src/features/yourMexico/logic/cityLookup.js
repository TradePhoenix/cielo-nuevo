// Your Mexico — pure helpers for combining the Blueprint's city profiles
// with this feature's own richer content. No side effects, no state.

import { CITY_PROFILES } from "../../blueprint/data/cityProfiles";
import { CITY_DETAILS } from "../data/cityDetails";

// Full record for a single city, or null if the id isn't recognized by
// either data source.
export function getCityById(cityId) {
  const profile = CITY_PROFILES.find((city) => city.id === cityId);
  const details = CITY_DETAILS[cityId];
  if (!profile || !details) return null;
  return { ...profile, ...details };
}

// Enriches the Blueprint recommendation's topCityMatches (id, name, teaser,
// guideLink, matchScore, matchReason) with this feature's tagline/heroImage.
export function getMatchesWithDetails(topCityMatches) {
  return (topCityMatches || [])
    .map((match) => {
      const details = CITY_DETAILS[match.id];
      return details ? { ...match, ...details } : null;
    })
    .filter(Boolean);
}

// All three cities, unranked — the fallback used when a visitor reaches
// Your Mexico without a completed Blueprint (no personalized order exists).
export function getAllCities() {
  return CITY_PROFILES.map((profile) => ({ ...profile, ...CITY_DETAILS[profile.id] })).filter(
    (city) => city.tagline
  );
}

// Every other city besides the one being viewed, preserving whatever order
// `cities` was already in (ranked or unranked).
export function getOtherCities(cities, currentCityId) {
  return (cities || []).filter((city) => city.id !== currentCityId);
}
