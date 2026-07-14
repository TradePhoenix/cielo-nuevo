import { useMemo } from "react";
import { resolveRelatedGuides, resolveRelatedCities, resolveRelatedServices } from "../utils/internalLinking";

/**
 * Resolves a guide's related-content id lists against the provided
 * catalogs in one call, so templates don't each re-implement the same
 * three lookups.
 * @param {import('../types/guide').GuideRecord} guide
 * @param {{guides?: import('../types/guide').GuideRecord[], cities?: import('../types/city').CityRecord[], services?: import('../types/service').ServiceRecord[]}} catalogs
 */
export function useRelatedContent(guide, catalogs = {}) {
  const relatedGuideIds = guide?.relatedGuideIds;
  const relatedCityIds = guide?.relatedCityIds;
  const relatedServiceIds = guide?.relatedServiceIds;
  const { guides = [], cities = [], services = [] } = catalogs;

  return useMemo(
    () => ({
      guides: resolveRelatedGuides(relatedGuideIds || [], guides),
      cities: resolveRelatedCities(relatedCityIds || [], cities),
      services: resolveRelatedServices(relatedServiceIds || [], services),
    }),
    [relatedGuideIds, relatedCityIds, relatedServiceIds, guides, cities, services]
  );
}
