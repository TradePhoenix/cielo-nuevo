const SITE_NAME = "Path To Mexico";
// LAUNCH-W1: www is the canonical host — the apex 308-redirects to it at
// the Vercel domain layer, so every canonical/og:url must say www or
// crawlers see a canonical that immediately redirects.
const SITE_URL = "https://www.pathtomexico.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/hero.jpg?v=4`;

// Per-route document metadata. Relies on React 19 rendering <title>/<meta>/
// <link> anywhere in the tree and hoisting them into <head> automatically —
// no react-helmet dependency needed. The last-rendered <title> in document
// order wins, so this always overrides public/index.html's static defaults
// on any route that renders this component.
export default function SEO({
  title,
  description,
  path = "",
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${path}`;
  const resolvedOgTitle = ogTitle || fullTitle;
  const resolvedOgDescription = ogDescription || description;

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {/* Internal/admin surfaces and the 404 shell must never be indexed;
          a noindex page also gets no canonical (it would only point search
          engines at a URL we are asking them to forget). */}
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={resolvedOgTitle} />
      {resolvedOgDescription && <meta property="og:description" content={resolvedOgDescription} />}
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={resolvedOgTitle} />
      {resolvedOgDescription && <meta name="twitter:description" content={resolvedOgDescription} />}
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}
