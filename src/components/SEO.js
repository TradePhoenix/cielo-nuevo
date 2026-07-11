const SITE_NAME = "Path To Mexico";
const SITE_URL = "https://pathtomexico.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg?v=3`;

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
}) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${path}`;
  const resolvedOgTitle = ogTitle || fullTitle;
  const resolvedOgDescription = ogDescription || description;

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />

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
