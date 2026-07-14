/**
 * Derives the props src/components/SEO.js expects directly from a
 * GuideRecord, so a template never has to hand-assemble title/description/
 * path/OG fields itself — one source of truth (the guide record) feeds
 * both the human-facing head tags and the machine-facing schema graph.
 * @param {import('../types/guide').GuideRecord} guide
 * @returns {{title: string, description: string, path: string, ogImage?: string}}
 */
export function buildMetadata(guide) {
  const seo = guide.seo || {};

  return {
    title: seo.title || guide.title,
    description: seo.description || guide.description,
    path: seo.path || `/guides/${guide.slug}`,
    ogTitle: seo.ogTitle || undefined,
    ogDescription: seo.ogDescription || undefined,
    ogImage: seo.ogImage || undefined,
  };
}
