const SITE_URL = "https://pathtomexico.com";

/**
 * Converts a list of GuideRecords into the same {loc, changefreq, priority}
 * shape used by public/sitemap.xml's hand-written entries, so a future
 * build step can append generated guide URLs to that file (or replace it
 * outright) without inventing a new sitemap entry shape. Deliberately does
 * NOT write to public/sitemap.xml itself — wiring a generator into the
 * build is a separate, explicit decision.
 * @param {import('../types/guide').GuideRecord[]} guides
 * @returns {{loc: string, changefreq: string, priority: string}[]}
 */
export function buildSitemapEntries(guides = []) {
  return guides.map((guide) => ({
    loc: `${SITE_URL}${guide.seo?.path || `/guides/${guide.slug}`}`,
    changefreq: "monthly",
    priority: "0.8",
  }));
}

/**
 * Serializes sitemap entries into a valid <urlset> XML document.
 * @param {{loc: string, changefreq: string, priority: string}[]} entries
 * @returns {string}
 */
export function serializeSitemapXml(entries = []) {
  const urls = entries
    .map(
      (entry) =>
        `  <url>\n    <loc>${entry.loc}</loc>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
