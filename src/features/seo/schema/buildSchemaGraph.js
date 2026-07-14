import { buildArticleSchema } from "./articleSchema";
import { buildBreadcrumbSchema } from "./breadcrumbSchema";
import { buildFaqSchema } from "./faqSchema";
import { buildOrganizationSchema } from "./organizationSchema";
import { SITE_URL } from "./schemaConstants";

/**
 * Assembles every schema node relevant to a single guide page into one
 * @graph document — the recommended way to emit multiple related JSON-LD
 * types on one page without duplicating @context per node.
 * @param {import('../types/guide').GuideRecord} guide
 * @param {import('./breadcrumbSchema').BreadcrumbItem[]} breadcrumbs
 * @returns {Object} a single JSON-LD document with "@context" + "@graph"
 */
export function buildSchemaGraph(guide, breadcrumbs = []) {
  const graph = [buildOrganizationSchema(), buildArticleSchema(guide), buildBreadcrumbSchema(breadcrumbs)];

  const faqSchema = buildFaqSchema(guide.faqs);
  if (faqSchema) graph.push(faqSchema);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export { SITE_URL };
