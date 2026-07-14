import { SITE_NAME, SITE_URL } from "./schemaConstants";

/**
 * Static Organization schema — the same on every page, so it's a plain
 * function with no arguments rather than something templates configure.
 * @returns {Object} schema.org Organization JSON-LD node
 */
export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo512.png`,
    },
  };
}
