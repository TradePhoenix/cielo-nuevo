// DEST-003 — lightweight client-side search, no new dependency. Matches
// against destination name, region label, lifestyle tags (readable label,
// via LIFESTYLE_FILTERS' own vocabulary — never a raw tag id the visitor
// never typed), and teaser copy — covering the ticket's required "name,
// region, lifestyle fit, and common client priorities" without inventing a
// second content source. Pure function, no side effects, directly testable.
import { getRegionIdForCity, getRegionGroup, LIFESTYLE_FILTERS } from "./atlasGroups";

function collectSearchableText(city) {
  const region = getRegionGroup(getRegionIdForCity(city.id));
  const lifestyleLabels = LIFESTYLE_FILTERS.filter((filter) => (city.tags || []).includes(filter.tag)).map(
    (filter) => filter.labelEn
  );

  // PTM Spanish-parity pass: city.teaser became `{ en, es }` (see
  // decisionEngine/data/cityProfiles.js) — include both variants so
  // searching in either language still matches teaser copy, the same way
  // region labels already cover both languages below.
  const teaserEn = typeof city.teaser === "string" ? city.teaser : city.teaser?.en;
  const teaserEs = typeof city.teaser === "string" ? null : city.teaser?.es;

  return [city.name, teaserEn, teaserEs, region?.labelEn, region?.labelEs, ...lifestyleLabels]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function searchDestinations(cities, query) {
  const trimmed = (query || "").trim().toLowerCase();
  if (!trimmed) return cities;

  return (cities || []).filter((city) => collectSearchableText(city).includes(trimmed));
}
