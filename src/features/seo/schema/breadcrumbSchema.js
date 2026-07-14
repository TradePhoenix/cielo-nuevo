import { SITE_URL } from "./schemaConstants";

/**
 * @typedef {Object} BreadcrumbItem
 * @property {string} label
 * @property {string} path   - route path, e.g. "/guides"
 */

/**
 * @param {BreadcrumbItem[]} crumbs
 * @returns {Object} schema.org BreadcrumbList JSON-LD node
 */
export function buildBreadcrumbSchema(crumbs = []) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}
