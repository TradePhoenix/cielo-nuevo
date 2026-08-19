// SEO-001 — Route-specific raw-HTML metadata.
//
// This project is a client-side-only React (CRA) SPA: every route serves
// the same static build/index.html until JavaScript hydrates and SEO.js
// injects a per-route <title>/<meta name="description">. A crawler or any
// tool that doesn't execute JS sees identical generic metadata for every
// page (confirmed via raw curl during the Phase 0 audit).
//
// This script runs after `react-scripts build` (wired as `postbuild` in
// package.json — npm's lifecycle runs it automatically, no change to the
// `build` script itself) and writes a static HTML copy of build/index.html
// per route, each with its own <title> and <meta name="description"> baked
// into the raw file. No backend, no database, no framework migration, no
// new package — plain Node `fs`/`path` plus a couple of `import()`s of
// this project's own existing plain-data modules.
//
// Deliberately narrow scope: only <title> and <meta name="description">
// are touched. Canonical/OG/Twitter tags are left exactly as SEO.js
// already renders them client-side — this ticket addresses the verified
// metadata gap only, not full non-JS content rendering.
//
// Single-source-of-truth policy, honestly stated: for the two data-driven
// routes (a destination and a guide-index-style lookup), this script
// imports the same plain-data modules the app itself uses at runtime
// (cityProfiles.js, cityDetails.js) — zero duplication, zero drift risk.
// For the six page-component routes, the title/description already live
// inside a JSX-containing .js file that plain Node can't import without a
// JSX transform (and installing one is out of scope for this ticket), so
// this script extracts the exact literal strings from the source file's
// text via regex instead of hand-copying them. That keeps the page's own
// SEO fields as the only place these strings are *authored* — this script
// never introduces a second, independently-maintained copy — but it is a
// weaker guarantee than a real import: if a future edit reformats one of
// those six fields unrecognizably, extraction fails loudly (see
// assertFound below) rather than silently shipping stale text. See the
// SEO-001 ticket report for the follow-up recommendation to close this
// gap for good (a small shared plain-data module the six pages import
// too).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BUILD_DIR = join(ROOT, "build");
const SITE_NAME = "Path To Mexico";

function assertFound(value, label) {
  if (!value || typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`prerender-meta: failed to extract ${label} — aborting build rather than shipping bad SEO.`);
  }
  return value;
}

// Mirrors SEO.js's exact title-suffix rule: only append " | Path To Mexico"
// if the title doesn't already contain the site name.
function fullTitle(title) {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

function extractField(source, fieldName, fileLabel) {
  // Matches:  seoTitle: "...",   or   seoTitle:\n      "...",
  const re = new RegExp(`${fieldName}:\\s*\\n?\\s*"([^"]+)"`);
  const match = source.match(re);
  return assertFound(match && match[1], `${fieldName} in ${fileLabel}`);
}

function extractJsxAttr(source, attrName, tagHint, fileLabel) {
  const re = new RegExp(`${attrName}="([^"]+)"`);
  const match = source.match(re);
  return assertFound(match && match[1], `${attrName} attribute (${tagHint}) in ${fileLabel}`);
}

function readSource(relPath) {
  return readFileSync(join(ROOT, relPath), "utf-8");
}

async function buildRoutes() {
  const routes = [];

  // 1. Homepage — first (EN) occurrence of seoTitle/seoDescription.
  {
    const src = readSource("src/pages/HomePage.js");
    routes.push({
      path: "/",
      title: extractField(src, "seoTitle", "HomePage.js"),
      description: extractField(src, "seoDescription", "HomePage.js"),
    });
  }

  // 2. Mexico Blueprint — literal props directly on <SEO>, not a content object.
  {
    const src = readSource("src/pages/MyMexicoBlueprintPage.js");
    routes.push({
      path: "/my-mexico-blueprint",
      title: extractJsxAttr(src, "title", "<SEO>", "MyMexicoBlueprintPage.js"),
      description: extractJsxAttr(src, "description", "<SEO>", "MyMexicoBlueprintPage.js"),
    });
  }

  // 3. Mexico Fit Call
  {
    const src = readSource("src/pages/MexicoFitCallPage.js");
    routes.push({
      path: "/mexico-fit-call",
      title: extractField(src, "seoTitle", "MexicoFitCallPage.js"),
      description: extractField(src, "seoDescription", "MexicoFitCallPage.js"),
    });
  }

  // 4. Work With Path To Mexico
  {
    const src = readSource("src/pages/WorkWithPathToMexicoPage.js");
    routes.push({
      path: "/work-with-path-to-mexico",
      title: extractField(src, "seoTitle", "WorkWithPathToMexicoPage.js"),
      description: extractField(src, "seoDescription", "WorkWithPathToMexicoPage.js"),
    });
  }

  // 5. Impact / Responsible Relocation
  {
    const src = readSource("src/pages/ImpactPage.js");
    routes.push({
      path: "/impact",
      title: extractField(src, "seoTitle", "ImpactPage.js"),
      description: extractField(src, "seoDescription", "ImpactPage.js"),
    });
  }

  // 6. Free Guide
  {
    const src = readSource("src/pages/FreeGuidePage.js");
    routes.push({
      path: "/free-guide",
      title: extractField(src, "seoTitle", "FreeGuidePage.js"),
      description: extractField(src, "seoDescription", "FreeGuidePage.js"),
    });
  }

  // 7. Representative destination — real import of the same plain-data
  // modules CityDetailPage.js uses at runtime (cityLookup logic mirrored
  // here directly: no JSX in either source file, so a real import is safe
  // and this stays genuinely single-source, zero duplication).
  {
    const { CITY_PROFILES } = await import(join(ROOT, "src/decisionEngine/data/cityProfiles.js"));
    const { CITY_DETAILS } = await import(join(ROOT, "src/features/yourMexico/data/cityDetails.js"));
    const cityId = "tulum";
    const profile = CITY_PROFILES.find((c) => c.id === cityId);
    const details = CITY_DETAILS[cityId];
    if (!profile || !details) {
      throw new Error(`prerender-meta: destination "${cityId}" not found in CITY_PROFILES/CITY_DETAILS — aborting.`);
    }
    const tagline = details.tagline && (typeof details.tagline === "string" ? details.tagline : details.tagline.en);
    routes.push({
      path: `/your-mexico/${cityId}`,
      title: assertFound(`${profile.name} — Your Mexico`, "destination title"),
      description: assertFound(tagline, `tagline.en for ${cityId}`),
    });
  }

  // 8. Weddings + wedding inquiry — both pages' SEO strings are authored
  // once in the weddings copy module (EN block first, so the first match
  // is the EN value, mirroring the HomePage.js extraction above).
  {
    const src = readSource("src/features/weddings/data/copy.js");
    routes.push({
      path: "/weddings",
      title: extractField(src, "seoTitle", "weddings/data/copy.js"),
      description: extractField(src, "seoDescription", "weddings/data/copy.js"),
    });
    routes.push({
      path: "/weddings/inquire",
      title: extractField(src, "inquirySeoTitle", "weddings/data/copy.js"),
      description: extractField(src, "inquirySeoDescription", "weddings/data/copy.js"),
    });
  }

  // 9. Representative guide — literal props directly on <ArticleLayout>.
  {
    const src = readSource("src/pages/MovingToTulumPage.js");
    routes.push({
      path: "/guides/moving-to-tulum",
      title: extractJsxAttr(src, "title", "<ArticleLayout>", "MovingToTulumPage.js"),
      description: extractJsxAttr(src, "description", "<ArticleLayout>", "MovingToTulumPage.js"),
    });
  }

  return routes;
}

function outputPathFor(routePath) {
  if (routePath === "/") return join(BUILD_DIR, "index.html");
  const trimmed = routePath.replace(/^\/+/, "");
  return join(BUILD_DIR, trimmed, "index.html");
}

function injectMeta(html, title, description) {
  const withTitle = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  // The base template has no <meta name="description"> at all today —
  // insert one right after <title> rather than assuming one exists to replace.
  if (/<meta name="description"/.test(withTitle)) {
    return withTitle.replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${escapeHtml(description)}"/>`
    );
  }
  return withTitle.replace(
    /(<title>[^<]*<\/title>)/,
    `$1<meta name="description" content="${escapeHtml(description)}"/>`
  );
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function main() {
  const baseIndexPath = join(BUILD_DIR, "index.html");
  if (!existsSync(baseIndexPath)) {
    throw new Error(`prerender-meta: ${baseIndexPath} not found — run \`react-scripts build\` first.`);
  }
  const baseHtml = readFileSync(baseIndexPath, "utf-8");

  const routes = await buildRoutes();

  for (const route of routes) {
    const title = fullTitle(route.title);
    const html = injectMeta(baseHtml, title, route.description);
    const outPath = outputPathFor(route.path);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf-8");
    console.log(`prerender-meta: wrote ${outPath.replace(ROOT + "/", "")} — "${title}"`);
  }

  console.log(`prerender-meta: done — ${routes.length} routes.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
