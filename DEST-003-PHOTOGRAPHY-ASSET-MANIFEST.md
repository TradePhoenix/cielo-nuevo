# DEST-003 — Photography Asset Manifest

## Status

None of the 14 new destinations below have dedicated photography yet. Each currently renders `DestinationImageFallback.js` — a solid, non-photographic gradient panel styled with the site's existing design tokens, showing the destination name and "Photography Coming Soon." This is deliberate, not a bug: reusing any of the site's existing generic images (`hero.jpg`, `lifestyle.jpg`, `sanctuary.jpg`) would have meant showing real, recognizable photography of one specific existing place (e.g. Playa del Carmen) under an unrelated destination's name — exactly what this ticket's photography rules prohibit ("do not imply that a generic image depicts a specific town"). The fallback panel carries no such risk, never 404s, and never causes layout shift, since it fills the same aspect-ratio box a real photo would.

This does not block the destination build. Every page, card, route, and platform surface for these 14 destinations is fully functional today with the fallback in place.

## What's needed, per destination

Same production standard already established for the 11 existing destinations (see `path-to-mexico-yucatan-asset-pack/README.md` for the precedent — "AI-generated editorial concepts... geographically grounded but should not be presented as documentary photographs of a specific property, street address, or guaranteed view"):

- 2 crops per destination: desktop hero and shared mobile/card crop
- 2 delivery formats per crop: WebP plus JPEG fallback (4 files per destination)
- Delivered into `public/regions/<city-id>/` following the exact existing naming convention: `<city-id>-hero-desktop.webp`, `<city-id>-hero-desktop.jpg`, `<city-id>-hero-mobile.webp`, `<city-id>-hero-mobile.jpg`
- Once delivered, add a `heroImages: { desktop: {webp, jpg}, mobile: {webp, jpg} }` field to that destination's entry in `src/features/yourMexico/data/cityDetails.js` (see any of the 11 existing entries for the exact shape) — no other code change is needed; `CityHero.js`/`CityCard.js` already prefer `heroImages` over the fallback automatically.
- `heroAlt.en`/`heroAlt.es` are already written for all 14 (see each entry's top-level `heroAlt` field) and are ready to use as-is once real photography exists.

## Destinations needing photography (14)

| Destination | Region | Visual identity to capture |
| --- | --- | --- |
| Puerto Morelos | Riviera Maya & Caribbean | Small fishing pier, leaning lighthouse, protected reef just offshore, low-rise town |
| Cozumel | Riviera Maya & Caribbean | Island waterfront, dive-boat culture, calmer residential side away from the cruise pier |
| Bacalar | Riviera Maya & Caribbean | The multi-toned "seven-color" lagoon, small low-rise lakeside town |
| Mahahual | Riviera Maya & Caribbean | Undeveloped Costa Maya beach, quiet malecón, reef break |
| Akumal | Riviera Maya & Caribbean | Calm protected bay, sea turtles near shore, small low-density community |
| Cancún | Riviera Maya & Caribbean | El Centro (downtown), residential streets — explicitly NOT the Hotel Zone/resort strip |
| Valladolid | Yucatán Interior | Colonial plaza and cathedral, colorful colonial streets, nearby cenote |
| Izamal | Yucatán Interior | The "Yellow City" — uniform yellow colonial buildings, Franciscan convent, Kinich Kakmó pyramid |
| Tekax | Yucatán Interior | Working agricultural town, ordinary Yucatecan streets, ranching/farming context |
| Tizimín | Yucatán Interior | Practical regional hub, colonial church, market town character |
| Chelem | Gulf Coast | Quiet residential Gulf beach, small-scale, west of Progreso |
| Chuburná Puerto | Gulf Coast | Working fishing port, mangrove-adjacent Gulf coastline, modest homes |
| El Cuyo | Hidden Gems | Undeveloped northern beach, kitesurfing conditions, small growing village |
| Río Lagartos | Hidden Gems | Flamingo-filled estuary, working fishing village, biosphere reserve edge |

## Also needed (not per-destination)

- **4 regional page hero images** — one per region (Riviera Maya & Caribbean, Yucatán Interior, Gulf Coast, Hidden Gems) — see `src/features/yourMexico/pages/RegionPage.js`, which currently uses the same `DestinationImageFallback`-style treatment at the regional level.
- **1 guide hero image** for "The Complete Guide to Living in the Yucatán Peninsula" (`src/pages/YucatanPeninsulaGuidePage.js`), following `ArticleLayout.js`'s existing hero pattern.

## Do not

- Do not substitute any existing destination's real photography for a new one, even temporarily — this misrepresents a specific real place as a different one.
- Do not present AI-generated or stock imagery as documentary photographs of a specific property, street, or guaranteed view, per the existing asset pack's own precedent and this ticket's explicit rule.
