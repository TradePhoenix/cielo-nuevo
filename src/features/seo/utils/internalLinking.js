/**
 * Resolves a list of guide ids into the subset of full GuideRecords that
 * actually exist in the provided catalog, in the order requested. Keeps
 * "related guide" wiring resilient to a guide being renamed or removed
 * from the catalog without every other guide's relatedGuideIds needing
 * to be edited in lockstep.
 * @param {string[]} ids
 * @param {import('../types/guide').GuideRecord[]} catalog
 * @returns {import('../types/guide').GuideRecord[]}
 */
export function resolveRelatedGuides(ids = [], catalog = []) {
  const byId = new Map(catalog.map((guide) => [guide.id, guide]));
  return ids.map((id) => byId.get(id)).filter(Boolean);
}

/**
 * Same resolution pattern for cities.
 * @param {string[]} ids
 * @param {import('../types/city').CityRecord[]} catalog
 * @returns {import('../types/city').CityRecord[]}
 */
export function resolveRelatedCities(ids = [], catalog = []) {
  const byId = new Map(catalog.map((city) => [city.id, city]));
  return ids.map((id) => byId.get(id)).filter(Boolean);
}

/**
 * Same resolution pattern for services.
 * @param {string[]} ids
 * @param {import('../types/service').ServiceRecord[]} catalog
 * @returns {import('../types/service').ServiceRecord[]}
 */
export function resolveRelatedServices(ids = [], catalog = []) {
  const byId = new Map(catalog.map((service) => [service.id, service]));
  return ids.map((id) => byId.get(id)).filter(Boolean);
}
