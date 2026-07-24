# Path To Mexico — Regional Photography & Visual Identity Manifest

**Status:** Audit and asset specification only. No production component, route, or existing image file was changed to produce this document.
**Companion to:** `docs/design/CINEMATIC_EXPERIENCE_MASTERPLAN.md` — that document's §6 (Regional Visual Identities), §24 (Page-by-Page Audit), and §25 (Regional Treatment) already flagged the photography gap this manifest exists to close in detail. Nothing here contradicts that document; this is its planned "Phase 3" made concrete and actionable.
**Method:** every finding below comes from direct inspection of this repository — `public/`, every `<img>` tag in `src/`, every file that references an image path, and pixel dimensions/format/file size read directly off each file (via `sips`/`file`, not assumed) — not from memory of prior sessions.

---

## 1. Complete Existing Image Asset Inventory

### Photographic assets (the subject of this manifest)

| File | Actual format | Dimensions | Aspect ratio | File size |
|---|---|---|---|---|
| `public/hero.jpg` | JPEG | 2000×1500 | 4:3 | 408 KB |
| `public/kalen.jpg` | JPEG (iPhone 15 Pro Max original, full EXIF incl. GPS) | 2316×3088 | ~3:4 (portrait) | 1.44 MB |
| `public/lifestyle.jpg` | JPEG | 1536×342 | ~4.5:1 (extreme banner crop) | 197 KB |
| `public/sanctuary.jpg` | JPEG | 1536×341 | ~4.5:1 (extreme banner crop) | 189 KB |
| `public/og-image.jpg` | **PNG, mislabeled with a `.jpg` extension** | 1731×909 | ~1.9:1 | 1.65 MB |

That is the entire photographic library for a seven-destination platform: **five files, three of which (`hero.jpg`, `lifestyle.jpg`, `sanctuary.jpg`) are the only imagery used for every destination's card and hero treatment.**

### Icon / favicon assets (inventoried for completeness, not in scope for regional identity work)

| File | Format | Dimensions | Size |
|---|---|---|---|
| `public/favicon.ico` | ICO | 16×16 / 32×32 | 8 KB |
| `public/favicon-16x16.png` | PNG | 16×16 | 146 B |
| `public/favicon-32x32.png` | PNG | 32×32 | 193 B |
| `public/apple-touch-icon.png` | PNG | 180×180 | 901 B |
| `public/logo192.png` | PNG | 192×192 | 970 B |
| `public/logo512.png` | PNG | 512×512 | 3 KB |
| `public/maskable-icon.png` | PNG | 512×512 (safe-zone padded) | 3 KB |
| `public/path-to-mexico-icon.svg` | SVG | vector | 428 B |

These are correctly sized and formatted for their purpose (`manifest.json` PWA icons, `index.html` favicon links) — no action needed.

**Zero images exist anywhere under `src/`** — every photographic asset in the entire codebase lives in `public/` and is referenced by a hardcoded `/filename.jpg` string, never imported as a module.

## 2. Exact Surfaces Where Each Asset Appears

Traced to every live `<img>` tag and every code reference (dead/untracked files excluded, listed separately below).

| Asset | Component | File:line | Context |
|---|---|---|---|
| `hero.jpg` | Homepage hero | `src/pages/HomePage.js:547` | Full-bleed `min-h-[100svh]` hero background, ambient drift, **not lazy-loaded** (correct — LCP element) |
| `hero.jpg` | Blueprint intro | `src/features/blueprint/components/BlueprintIntro.js:20` | Full-bleed `min-h-[100svh]` intro background, **not lazy-loaded** (correct) |
| `hero.jpg` | City Card + City Hero | `CityCard.js:41`, `CityHero.js:18` | `heroImage` for **playa-del-carmen**, **progreso**, **telchac-puerto** — 3 destinations × 2 components = 6 render call-sites |
| `kalen.jpg` | Homepage founder section | `src/pages/HomePage.js:880` | `aspect-[4/5]` crop, lazy-loaded |
| `kalen.jpg` | TrustMoment | `src/features/yourMexico/components/TrustMoment.js:15` | Rendered on `YourMexicoPage`, every `CityDetailPage` (7 destinations), every `MyMexicoPlanPage` (7 destinations) — up to 15 route-level render instances, lazy-loaded |
| `kalen.jpg` | Mexico Fit Call page | `src/pages/MexicoFitCallPage.js:163` | Small 64×64 rounded avatar crop, lazy-loaded |
| `lifestyle.jpg` | City Card + City Hero | same components | `heroImage` for **tulum**, **chicxulub-puerto** — 2 destinations × 2 components = 4 render call-sites |
| `sanctuary.jpg` | City Card + City Hero | same components | `heroImage` for **riviera-maya**, **mérida** — 2 destinations × 2 components = 4 render call-sites |
| `og-image.jpg` | Social preview | `src/components/SEO.js:3`, `public/index.html:46,50` | Default Open Graph / Twitter card image, every page without a per-page override |

**Confirmed zero image usage** on: Guides index, every guide article page (`ArticleLayout`/`ArticleSection`/`GuideCard` — none render an `<img>` anywhere), Blueprint results screen, every My Mexico Plan module (`DecisionBrief`, `ChapterTracker`, `NowNextLater`, `CostPlanner`, etc.), Compare page, and the Homepage itself has **no per-destination cards at all** — the homepage footer only lists city names as plain text (`"Playa del Carmen • Tulum • Riviera Maya • Mérida • Mexico"`), never as photography.

**Dead/untracked files that reference images but render nothing live** (excluded from the counts above, listed for completeness): `src/App.backup-before-guides.js` (unimported) and `src/components/CinematicHero.js` (untracked, unused, explicitly protected — see standing project rules). Neither should be edited as part of this or any future CX ticket.

## 3. Duplicated or Overused Images

This is the manifest's central finding:

- **`hero.jpg`** appears on **8 distinct render call-sites**: the Homepage hero, the Blueprint intro, and as the `heroImage` for 3 unrelated destinations (Playa del Carmen, Progreso, Telchac Puerto) across both `CityCard` and `CityHero`. A visitor who sees the Homepage hero, opens the Blueprint, and then looks at three different "unique" destination pages sees **the same photograph five separate times** in one session.
- **`lifestyle.jpg`** and **`sanctuary.jpg`** each cover 2 unrelated destinations (4 render call-sites each).
- **`kalen.jpg`** — a 1.44 MB, un-stripped-EXIF, full-resolution iPhone photo — renders on **up to 17 distinct routes** (Homepage, `/your-mexico`, all 7 `/your-mexico/:cityId`, all 7 `/my-mexico-plan/:cityId`, `/mexico-fit-call`). It is by far the single most-loaded asset in the app relative to its actual page count, despite never appearing larger than a portrait card or a 64px avatar.
- **Net result:** 3 of the app's 5 photographic assets are responsible for **100% of all destination imagery across 7 supposedly-distinct places.** No destination has a single photograph that isn't shared with at least one, and in most cases two, other destinations.

## 4. Geographically Inaccurate Imagery

This is the most consequential finding for CX-006/CX-007:

- **`sanctuary.jpg` is assigned to Mérida.** Per this repository's own prior documentation (CX-MASTERPLAN §25, DEST-001 commit history), this photo is a covered terrace/pool scene — resort-adjacent imagery. Mérida is an inland colonial city; this asset communicates the opposite of what Mérida needs to communicate (colonial architecture, limestone, courtyards) and instead reads as generic resort/Caribbean.
- **`hero.jpg` is assigned to both Progreso and Telchac Puerto.** This is the Homepage's own Caribbean aerial coastline photo (turquoise water, dense jungle-fringed shore) — visually a Riviera Maya/Caribbean profile, not a Gulf Coast one (which should read as grayer-green water, flatter horizon, sparser vegetation). Progreso and Telchac Puerto are both Gulf Coast towns; using the site's flagship *Caribbean* hero photo for them directly contradicts this ticket's own standing instruction: **"Do not make the Yucatán Gulf Coast look like Tulum."**
- **`lifestyle.jpg` is assigned to Chicxulub Puerto.** This photo (a jungle-to-beach path, originally representing Tulum's boho-jungle character) carries the same Caribbean-vegetation problem as above, applied to a quiet Gulf Coast residential town whose actual landscape is sparser coastal scrub, not jungle canopy.
- **Riviera Maya and Playa del Carmen and Tulum's own assignments are directionally correct** (they're all genuinely Caribbean-corridor towns, and the photos were originally shot/selected with that corridor in mind) — the inaccuracy problem is concentrated entirely in the 4 DEST-001 destinations, exactly where the site's own code comments already admit it (`cityDetails.js:8-11,336`).

**Standing rule this manifest exists to enforce:** a region's photography must match its actual geography. Caribbean turquoise water and dense jungle canopy are correct only for Playa del Carmen, Tulum, and Riviera Maya. Gulf Coast grayer-green water, flatter horizons, colonial limestone, and sparser coastal vegetation are required for Mérida, Progreso, Chicxulub Puerto, and Telchac Puerto — and none of the current assets provide it.

## 5. Placeholder Imagery

Every one of the 4 DEST-001 `heroImage` assignments is a **documented, code-commented placeholder** — `cityDetails.js`'s own comment (line 336) states plainly that none of the three existing stock photos are an appropriate match and that real photography is a "pure data swap later." This manifest is that "later."

| City | Current placeholder | Correct treatment |
|---|---|---|
| Mérida | `sanctuary.jpg` (resort/pool) | Replace entirely — see §Mérida below |
| Progreso | `hero.jpg` (Caribbean aerial) | Replace entirely — see §Progreso below |
| Chicxulub Puerto | `lifestyle.jpg` (Caribbean jungle path) | Replace entirely — see §Chicxulub Puerto below |
| Telchac Puerto | `hero.jpg` (Caribbean aerial, same file as Progreso) | Replace entirely — see §Telchac Puerto below |

## 6. Missing Images

Beyond the 4 misassigned `heroImage` values, the following don't exist **at all**, for any destination, anywhere in the app:

- A **distinct destination-card crop**, separate from the full hero image. Today `CityCard` and `CityHero` both read the exact same `city.heroImage` field and just apply different CSS `aspect-` containers to the same master file via `object-cover` — there is no dedicated, purpose-shot card image anywhere.
- A **supporting lifestyle image** per destination (a second photo showing daily life, distinct from the hero) — every destination has exactly one photo, reused for both its grid card and its full-bleed detail-page hero.
- An **environmental detail image** per destination (texture/atmosphere shot — architectural detail, a market stall, a shaded doorway, etc.) — this doesn't exist for any destination.
- **Any imagery at all** on: Homepage destination cards (none exist as a surface), Guides (index or articles), Blueprint results, My Mexico Plan (any module).
- A **technically correct `og-image`** — the current file is a PNG mislabeled as `.jpg`.

## 7. Current Dimensions, Aspect Ratios, Formats, and File Sizes

Already itemized in full in §1's table. Summary of the technical problems specifically:

- **`lifestyle.jpg` and `sanctuary.jpg` are ~4.5:1 extreme banner crops (1536×342 / 1536×341), not standard photographs.** When `object-cover`'d into `CityHero`'s desktop container (`sm:h-[60vh] sm:min-h-[420px]`, which on a 1440px-wide viewport can be 700-900px tall), the browser must scale a 341px-tall source image up several hundred percent to fill it — producing visible softness/blur on exactly the surface meant to be each destination's most cinematic moment. This is a real, currently-shipping quality defect, not just a content-accuracy one.
- **`og-image.jpg` is a PNG using a lossless format for a 1731×909 photograph**, producing a 1.65 MB file — roughly 4× the size a well-compressed JPEG or WebP at the same dimensions would need, for an asset that's fetched by every social-media crawler and link-preview bot hitting the site.
- **`kalen.jpg` ships at full 2316×3088 iPhone-original resolution** (1.44 MB) to every device, despite never being displayed larger than a portrait card, and carries full EXIF data including GPS coordinates — a privacy leak (the photo's shoot location is embedded in the file every visitor downloads) as well as unnecessary weight.

## 8. Required Desktop, Tablet, and Mobile Crops

Every destination-facing image needs to serve **three deliberately different crops**, not one file stretched by CSS:

| Use | Aspect ratio | Target render size | Notes |
|---|---|---|---|
| City Hero (desktop/tablet) | 16:9 landscape (or wider, up to ~2:1) | up to ~1600×900 | Matches `CityHero`'s `sm:h-[60vh]` treatment without needing 4×+ upscale |
| City Hero (mobile) | 4:3 portrait-leaning | ~800×600 | Matches `CityHero`'s existing `aspect-[4/3]` mobile container |
| City Card (all breakpoints) | 4:3 | ~800×600 | Matches `CityCard`'s existing `aspect-[4/3]` container exactly — this can share a crop with the mobile hero size above |
| Supporting lifestyle image | 4:5 portrait or 3:2 landscape (component-dependent, not yet built) | ~1000×1250 or ~1200×800 | For a future second-image surface (My Mexico Plan / expanded City Detail) |
| Environmental detail | 1:1 or 4:5 | ~800×800 or ~800×1000 | For a future texture/atmosphere surface |
| Homepage hero (if regionalized later) | full-bleed, `min-h-[100svh]` | up to ~2400×1600 | Only relevant if a future ticket regionalizes the Homepage hero itself — out of scope here |

**None of the current assets meet the two most-used sizes (City Hero desktop, City Card) at native resolution without upscaling** — this is the direct cause of §7's blur problem.

## 9. Recommended WebP/AVIF Strategy

Zero next-gen formats exist in the project today — everything is JPEG or (mistakenly) PNG. Recommended approach, scoped to stay inside CLAUDE.md's "no new npm packages" constraint (this is a build-time asset-preparation step, not a runtime dependency):

- Ship every new photographic asset as **WebP as the primary format**, with a **JPEG fallback** via the native `<picture>` element:
  ```html
  <picture>
    <source srcset="/regions/merida/merida-hero-desktop.webp" type="image/webp" />
    <img src="/regions/merida/merida-hero-desktop.jpg" alt="…" />
  </picture>
  ```
- **AVIF is not recommended for this project at this time.** It compresses better than WebP but encode time and tooling maturity are worse, and WebP already has full support across every browser this site needs to serve (Safari has supported WebP since 14; Path To Mexico has no legacy-browser requirement on record). Revisit AVIF only if a future audit shows WebP isn't hitting the performance budget in §12.
- Every crop from §8 gets generated in both formats at the point the source photography is prepared (see §17 workflow) — this is a one-time export step per image, not an ongoing build pipeline change, since **CRA/react-scripts 5 has no built-in image-optimization pipeline** (confirmed: no `next/image`-equivalent exists in this stack) and adding one is an architecture decision outside this ticket's scope.

## 10. Lazy-Loading and Preload Requirements

Current behavior (confirmed by direct inspection, not assumption):

| Surface | Current `loading` attribute | Correct? |
|---|---|---|
| Homepage hero (`hero.jpg`) | none (eager) | ✅ correct — LCP element |
| Blueprint intro (`hero.jpg`) | none (eager) | ✅ correct — LCP element |
| City Hero (`city.heroImage`) | none (eager) | ✅ correct — LCP element for that route |
| City Card grid (`city.heroImage`) | `lazy` | ✅ correct — below-fold in most viewports |
| Homepage founder (`kalen.jpg`) | `lazy` | ✅ correct — below-fold |
| TrustMoment (`kalen.jpg`) | `lazy` | ✅ correct — below-fold |
| Mexico Fit Call avatar (`kalen.jpg`) | `lazy` | ✅ correct — below-fold |

**The existing lazy-loading discipline is already correct everywhere it's used** — this is not a gap. The actual gaps are:

- **No `fetchpriority="high"` on any LCP image** (Homepage hero, Blueprint intro, City Hero) — a one-attribute addition (`fetchpriority="high"` alongside the existing eager `loading` default) that measurably improves LCP timing on real-world connections, and is zero-risk to add.
- **No `<link rel="preload">` for the Homepage hero image** in `public/index.html` — since the Homepage hero is almost always the very first LCP candidate a visitor sees, a static `<link rel="preload" as="image" href="/hero.jpg" fetchpriority="high">` (or its regional-hero equivalent, if the Homepage hero is ever regionalized) would let the browser start the fetch before React even hydrates.
- **No `sizes`/`srcset` anywhere** — see §11.

## 11. Alt Text Requirements

Every live `<img>` today has *some* alt text — none are missing outright — but quality is inconsistent:

- `CityCard`/`CityHero`: `alt={city.name}` — functional but minimal (just "Mérida", not descriptive of the photo itself). **Acceptable for a card thumbnail** (the adjacent heading already names the city; redundant elaboration would be noise) but **should be upgraded for the hero placement** to actually describe the scene once real photography exists, since the hero is often the visitor's first visual impression of the place.
- `HomePage.js` hero: `"Riviera Maya relocation lifestyle"` — descriptive and correct.
- `kalen.jpg` usages: `"Kalen Enns, founder of Path To Mexico"` — correct and consistent everywhere it's used.

**Standing requirement for every new regional asset (see per-destination specs below):** alt text must describe the actual photographed scene (architecture, light, setting), never a generic "beautiful Mexico beach" phrase, and must be provided in **both English and Spanish** — this site has a genuine EN/ES toggle (`GuidesPage.js`'s pattern, and Homepage's own `content.en`/`content.es` split) and image alt text should follow the same convention going forward wherever a component already branches on language; components that don't yet branch on language (`CityCard`, `CityHero`) are out of scope to convert as part of this ticket, but the **alt text copy itself** should still be drafted in both languages now so a future integration ticket doesn't have to write it from scratch.

## 12. Performance Budgets

Extending the Cinematic Masterplan's own §20 (which set general motion performance rules but didn't set image-weight numbers) with concrete targets for this asset system:

- **Per-image budget:** no single photographic asset should exceed **250 KB** at its largest served crop (desktop hero), and **120 KB** at card/mobile crop sizes. `kalen.jpg` today (1.44 MB) exceeds this by roughly 6×; `og-image.jpg` (1.65 MB) by roughly 7×.
- **Total page weight from images:** a City Detail page should not exceed **~600 KB** of combined image weight across hero + any supporting/detail images, even before WebP compression gains are counted.
- **LCP target:** no regression from whatever the current Homepage/City Detail LCP timing is today — every change in §17's workflow (WebP, correct crop dimensions, `fetchpriority`) should *improve* LCP, never hold it flat or regress it. No formal Lighthouse baseline exists yet in this repository; establishing one is recommended as a CX-007 prerequisite (see §23).
- **No layout shift:** every new `<img>`/`<picture>` must render inside the same `aspect-[...]` container discipline already established by `CityCard`/`CityHero` — this is already the codebase's convention and should simply continue, not change.

## 13. Exact Replacement Filenames and Paths

New assets live under a dedicated `public/regions/<city-id>/` directory per destination (mirrors the `city.id` values already used throughout the data layer — `cityProfiles.js`, `cityDetails.js`, routes — so the mapping from data to asset path is self-evident and greppable). Exact filenames specified per destination below; the full flat list is repeated in §21's minimum asset pack.

---

## Per-Destination Visual Identity Specifications

Shared structure for all seven. **"Must not appear" lists are binding constraints for both photography briefs and any future AI-generation prompt** — violating them recreates exactly the geographic-inaccuracy problem this manifest exists to fix.

---

### Playa del Carmen

- **Emotional tone:** energetic, social, convenient — beach life without giving anything up.
- **Lighting:** bright midday-to-golden-hour Caribbean sun, high saturation.
- **Architecture:** low-rise beach-town commercial strip, Quinta Avenida-style pedestrian street energy — not high-rise resort towers.
- **Landscape:** turquoise Caribbean water, white sand, palm-lined walkable streets.
- **Human presence:** yes — this is the one destination where light, candid human presence (a couple walking, someone on a bike) is appropriate, since "social/walkable" is the core identity; never posed/stock-model looking.
- **Must not appear:** golf resorts, cruise-ship terminals, all-inclusive resort branding, generic infinity pools.
- **Photography/generation brief:** "A walkable beach-town street in Playa del Carmen at golden hour — low-rise shops and cafés, palm trees, turquoise Caribbean water visible at the street's end, a few real pedestrians, warm natural light, no visible logos or resort signage."
- **Aspect ratios:** hero 16:9 (desktop) / 4:3 (mobile), card 4:3, lifestyle 3:2, detail 1:1.
- **Filenames:** `public/regions/playa-del-carmen/playa-del-carmen-hero-desktop.webp` (+ `.jpg` fallback), `-hero-mobile.webp/.jpg`, `-card.webp/.jpg`, `-lifestyle.webp/.jpg`, `-detail.webp/.jpg`.
- **Alt (EN):** "A palm-lined pedestrian street in Playa del Carmen at golden hour, shops on either side and the Caribbean Sea visible ahead."
- **Alt (ES):** "Una calle peatonal bordeada de palmeras en Playa del Carmen al atardecer, tiendas a ambos lados y el Mar Caribe visible al frente."

### Tulum

- **Emotional tone:** slower, boho, wellness-forward, quietly premium.
- **Lighting:** soft, diffused, early-morning or late-afternoon — never harsh midday.
- **Architecture:** thatched-roof (palapa) structures, natural materials, minimal/organic design language.
- **Landscape:** jungle-to-beach transition, limestone cenote-adjacent terrain where relevant, quieter stretches of beach than Playa.
- **Human presence:** minimal to none — Tulum's identity is stillness, not social energy.
- **Must not appear:** nightclub/rooftop-party imagery, overtly luxury-resort infinity pools, anything that reads as "influencer content."
- **Photography/generation brief:** "A quiet stretch of Tulum beach at early morning, jungle vegetation meeting white sand, a natural palapa structure in soft frame, muted golden light, no people, calm water."
- **Aspect ratios:** same set as Playa del Carmen.
- **Filenames:** `public/regions/tulum/tulum-hero-desktop.webp/.jpg`, `-hero-mobile`, `-card`, `-lifestyle`, `-detail` (same webp+jpg pairing convention throughout — not repeated per destination below).
- **Alt (EN):** "A quiet stretch of Tulum beach at sunrise, jungle meeting white sand with a palapa structure in soft morning light."
- **Alt (ES):** "Un tramo tranquilo de playa en Tulum al amanecer, la selva encontrándose con la arena blanca y una palapa bajo luz suave."

### Riviera Maya

- **Emotional tone:** quieter, more affordable, everyday-life realism rather than postcard tourism.
- **Lighting:** natural daylight, unfiltered, honest — this destination's whole identity is "less produced than the postcards."
- **Architecture:** residential neighborhood streets, modest single-story homes, not resort corridors.
- **Landscape:** the broader region beyond the tourist center — could include quieter beach access points, but should also represent inland/residential settings, not exclusively beachfront.
- **Human presence:** acceptable in small, everyday-life amounts (someone walking a dog, a family on a porch) — reinforces "family-friendly, real life," never posed.
- **Must not appear:** anything that looks like a resort brochure; this destination's entire value proposition is *not* being the postcard.
- **Photography/generation brief:** "A quiet residential street in the Riviera Maya region, modest homes, mature trees, natural midday light, ordinary daily life, no tourist infrastructure visible."
- **Aspect ratios:** standard set.
- **Alt (EN):** "A quiet residential street in the Riviera Maya, modest homes and mature trees under natural daylight."
- **Alt (ES):** "Una calle residencial tranquila en la Riviera Maya, casas modestas y árboles maduros bajo luz natural."

### Mérida

**Critical standard (per ticket): must communicate colonial architecture, limestone, courtyards, filtered tropical light, and cultural depth — not resorts or Caribbean beaches.**

- **Emotional tone:** cultural depth, permanence, quiet civic pride — a real city with centuries of history, not a beach town.
- **Lighting:** filtered, dappled tropical light through courtyard trees or colonnades — warmer and more architectural than beach-direct sun.
- **Architecture:** colonial limestone facades, Paseo de Montejo-style mansions, interior courtyards, colonnaded walkways, pastel-painted stucco.
- **Landscape:** urban/inland — no ocean in frame at all. Mérida's coast (Progreso) is a separate destination; conflating them is exactly the error this manifest corrects.
- **Human presence:** optional, small-scale if present (someone in a doorway, a cyclist on a colonial street) — never crowds, never posed tourists.
- **Must not appear:** any beach, any pool, any resort signage, any Caribbean-turquoise water, palm-heavy jungle vegetation (Mérida's landscaping is drier, more arid-adjacent than the coastal corridor).
- **Photography/generation brief:** "A colonial limestone courtyard in Mérida, Yucatán — pastel-painted stucco walls, filtered dappled light through a courtyard tree, colonnaded walkway, warm architectural stillness, no ocean, no people or a single figure in a doorway at most, shot in the honest documentary style of real Centro Histórico architecture, not a staged resort."
- **Aspect ratios:** standard set — the hero crop especially should favor the courtyard/facade's natural vertical or square proportions over a forced horizontal crop, since colonial architecture reads better slightly taller than the beach destinations' wide horizon shots.
- **Alt (EN):** "A colonial limestone courtyard in Mérida's Centro Histórico, dappled light through overhanging trees and pastel stucco walls."
- **Alt (ES):** "Un patio colonial de piedra caliza en el Centro Histórico de Mérida, luz moteada entre los árboles y muros de estuco en tonos pastel."

### Progreso

**Critical standard (per ticket): must communicate an open Gulf horizon, broad beach, pier/coastal energy, and connection to Mérida.**

- **Emotional tone:** established, social, accessible — the Gulf Coast's most developed beach town, but still distinctly Gulf, not Caribbean.
- **Lighting:** flatter, cooler-toned coastal light than the Caribbean corridor — wide open sky, less saturated water color.
- **Architecture:** the malecón (waterfront promenade), the long historic pier (one of the longest in the world — a legitimate, real, non-fabricated landmark worth referencing directly in a generation prompt since it's factually real), low-rise beach-town buildings.
- **Landscape:** wide, flat Gulf horizon, grayer-green water (not Caribbean turquoise), broad sandy beach, open sky dominating the frame.
- **Human presence:** yes, appropriate in moderate amounts — Progreso's identity includes real social/beach-town energy, especially on weekends when Mérida residents visit.
- **Must not appear:** turquoise Caribbean water, dense jungle vegetation, anything that could be mistaken for Playa del Carmen or Tulum.
- **Photography/generation brief:** "The Progreso malecón and pier on Mexico's Gulf Coast — a wide, flat horizon, grayer-green Gulf water (not turquoise), a broad sandy beach, the long historic pier extending into open water, open sky dominating the composition, natural coastal light, a few real beachgoers, low-rise buildings along the waterfront."
- **Aspect ratios:** standard set, with the hero crop favoring extra-wide horizon emphasis (a 16:9 or wider desktop crop suits this destination especially well).
- **Alt (EN):** "The Progreso malecón and pier on the Gulf Coast, a wide flat horizon and grayer Gulf water under open sky."
- **Alt (ES):** "El malecón y muelle de Progreso en la Costa del Golfo, un horizonte amplio y aguas grisáceas del Golfo bajo un cielo abierto."

### Chicxulub Puerto

**Critical standard (per ticket): must communicate quiet residential coastline and calm everyday beach living.**

- **Emotional tone:** understated, residential, calm — quieter than Progreso, still social in a low-key neighborhood way, not secluded like Telchac.
- **Lighting:** soft, even coastal daylight — calm mornings, nothing dramatic.
- **Architecture:** modest single-story beach houses, residential coastal streets, no commercial strip energy.
- **Landscape:** narrower beach than Progreso, Gulf water, sparser coastal vegetation (dune grass and scrub, not jungle).
- **Human presence:** minimal — a resident on a porch or a quiet morning walk, never a crowd.
- **Must not appear:** jungle canopy, turquoise water, resort infrastructure, crowds, anything with Progreso's more built-up commercial energy.
- **Photography/generation brief:** "A quiet residential street in Chicxulub Puerto on the Gulf Coast, modest single-story beach houses, sparse coastal dune vegetation, calm grayer-green Gulf water visible at the street's end, soft even morning light, no people or one distant figure at most."
- **Aspect ratios:** standard set.
- **Alt (EN):** "A quiet residential street in Chicxulub Puerto, modest beach houses and calm Gulf water under soft morning light."
- **Alt (ES):** "Una calle residencial tranquila en Chicxulub Puerto, casas de playa modestas y aguas tranquilas del Golfo bajo luz suave de la mañana."

### Telchac Puerto

**Critical standard (per ticket): must communicate pale Gulf light, spaciousness, intimacy, nature, and a slower rhythm.**

- **Emotional tone:** the most understated, least "postcard" destination in the entire platform, deliberately — per this site's own guide copy (DEST-001), Telchac Puerto's marketing must never oversell exclusivity or aspiration it can't honestly back up. The photography must match that restraint exactly.
- **Lighting:** pale, soft, almost washed-out Gulf light — the palest and most spacious-feeling of all seven destinations.
- **Architecture:** minimal to none in frame — this destination's identity is space and nature, not built environment.
- **Landscape:** wide open, sparse, natural — dune grass, open beach, a sense of genuine emptiness/seclusion (in the honest, spacious sense, never staged as "exclusive luxury").
- **Human presence:** none, or a single distant figure at most — the emptiness itself is the point.
- **Must not appear:** any building that reads as upscale/resort, any crowd, any Caribbean color palette, anything that visually oversells "exclusivity" the way the ticket explicitly warns against.
- **Photography/generation brief:** "An open, sparsely vegetated stretch of Gulf Coast beach near Telchac Puerto — pale, soft, almost washed-out natural light, wide empty horizon, dune grass in the foreground, genuine spaciousness and quiet, no buildings, no people, an honest and unstaged sense of seclusion rather than staged luxury."
- **Aspect ratios:** standard set, with the hero crop favoring maximum horizontal openness (widest available crop) to reinforce spaciousness.
- **Alt (EN):** "An open, sparsely vegetated stretch of Gulf Coast beach near Telchac Puerto under pale, soft natural light."
- **Alt (ES):** "Un tramo abierto y poco vegetado de playa en la Costa del Golfo cerca de Telchac Puerto, bajo una luz natural pálida y suave."

---

## Closing Summary

### 1. Complete asset inventory

Five photographic assets (`hero.jpg`, `kalen.jpg`, `lifestyle.jpg`, `sanctuary.jpg`, `og-image.jpg`) serve the entire platform's destination imagery, founder/trust imagery, and social-preview imagery combined. Seven correctly-sized icon files handle favicons/PWA needs and need no changes. Zero images exist under `src/`; zero images exist for Guides, Blueprint results, My Mexico Plan, or any Homepage destination surface (none of the latter exists as a surface at all).

### 2. Highest-leverage inconsistencies

1. **Mérida is visually represented by a resort/pool photo** — the single most severe geographic misrepresentation in the platform.
2. **Progreso and Telchac Puerto both use the site's flagship Caribbean hero photo** — directly violating "don't make the Gulf Coast look like Tulum," and using the *identical* file for two different destinations.
3. **`lifestyle.jpg` and `sanctuary.jpg` are 341-342px-tall source images** stretched several hundred percent into 700-900px-tall hero containers — a real, currently-shipping visual-quality defect independent of content accuracy.
4. **`kalen.jpg` loads at 1.44 MB with embedded GPS EXIF data on up to 17 routes** for a photo never displayed larger than a portrait card.
5. **`og-image.jpg` is a mislabeled PNG** costing ~4× the file size a correctly-encoded format would need.

### 3. Reusable system recommendations

- Adopt `public/regions/<city-id>/<city-id>-<purpose>.{webp,jpg}` as the permanent asset path convention — self-documenting against the data layer's own `city.id` values.
- Adopt the desktop/mobile/card three-crop discipline in §8 as the standard for every future destination added to the platform (the same way DEST-001 proved the *data* architecture scales to new cities with zero code changes, this asset convention should let new destinations' *photography* slot in the same way).
- Adopt WebP-with-JPEG-fallback via `<picture>` as the default markup pattern the moment any new regional asset ships — do not introduce a third format or a build-time image pipeline without a separate, explicit architecture decision.

### 4. Exact minimum viable asset pack

The smallest set of new files that closes every geographic-accuracy violation identified in §4, without yet building the "supporting lifestyle" or "environmental detail" surfaces (§6, correctly deferred — no component exists to display them yet, so producing them now would be premature per this project's own "don't build ahead of a real surface" discipline):

**28 files** (7 destinations × 2 crops [hero-desktop, hero-mobile/card — mobile hero and card share one crop per §8] × 2 formats [webp, jpg]):

```
public/regions/playa-del-carmen/playa-del-carmen-hero-desktop.{webp,jpg}
public/regions/playa-del-carmen/playa-del-carmen-hero-mobile.{webp,jpg}
public/regions/tulum/tulum-hero-desktop.{webp,jpg}
public/regions/tulum/tulum-hero-mobile.{webp,jpg}
public/regions/riviera-maya/riviera-maya-hero-desktop.{webp,jpg}
public/regions/riviera-maya/riviera-maya-hero-mobile.{webp,jpg}
public/regions/merida/merida-hero-desktop.{webp,jpg}
public/regions/merida/merida-hero-mobile.{webp,jpg}
public/regions/progreso/progreso-hero-desktop.{webp,jpg}
public/regions/progreso/progreso-hero-mobile.{webp,jpg}
public/regions/chicxulub-puerto/chicxulub-puerto-hero-desktop.{webp,jpg}
public/regions/chicxulub-puerto/chicxulub-puerto-hero-mobile.{webp,jpg}
public/regions/telchac-puerto/telchac-puerto-hero-desktop.{webp,jpg}
public/regions/telchac-puerto/telchac-puerto-hero-mobile.{webp,jpg}
```

The existing `-hero-mobile` crop doubles as the `CityCard` grid image (both already target the same 4:3 aspect ratio per §8), so this pack fully replaces every current `heroImage` value across both `CityCard` and `CityHero` for all 7 destinations with zero placeholder reuse remaining.

**Highest-priority subset within this pack, if photography must be produced in stages:** Mérida and Progreso first (the two most severe misrepresentations per §2), then Telchac Puerto and Chicxulub Puerto, then a lower-priority pass improving the already-directionally-correct Playa del Carmen/Tulum/Riviera Maya assets (real photography would still beat the current stretched/shared crops even where geography isn't wrong).

### 5. Generation-ready prompts for every missing asset

Provided in full for all 7 destinations in the per-destination sections above (one photography/generation brief each, ready to hand to a photographer or an AI image tool as-is). Each brief already encodes its destination's "must not appear" constraints directly into the prompt language, so a generated or commissioned image can be checked against its own brief rather than against a separate rulebook.

### 6. File preparation and optimization workflow

1. Source or generate each image per its brief above, at the highest resolution available.
2. Strip all EXIF metadata (GPS in particular — `kalen.jpg`'s current GPS leak should also be remediated the next time that file is touched, even though it's outside this ticket's minimum pack).
3. Crop to the exact aspect ratios in §8 (desktop hero, mobile hero/card) — never rely on `object-cover` to compensate for a wrong-aspect source the way `lifestyle.jpg`/`sanctuary.jpg` currently do.
4. Export WebP at quality ~80 and JPEG at quality ~82-85 as the fallback — target the per-image budgets in §12 (250 KB hero, 120 KB card/mobile).
5. Name and place each file exactly per §13/§21's convention — no ad hoc filenames.
6. Write EN/ES alt text per the per-destination specs above (already drafted; a future integration ticket just wires them in).
7. Verify each new asset visually against its own "must not appear" list before it's approved for integration.

### 7. Recommended CX-007 integration scope

CX-007 — **Regional Photography Integration** — should be scoped narrowly to:

- Wire the 28-file minimum asset pack (§4 above) into `cityDetails.js`'s `heroImage` field (replacing the 4 placeholder values and upgrading the 3 already-correct ones), and into `CityCard`/`CityHero` via a `<picture>` WebP/JPEG-fallback pattern.
- Add `fetchpriority="high"` to every LCP-candidate image identified in §10.
- Fix `og-image.jpg`'s format mismatch (re-export as a correctly-encoded file, same filename to avoid touching `SEO.js`/`index.html`'s references, or update both if the extension changes).
- **Not in CX-007's scope:** supporting-lifestyle or environmental-detail imagery (no component exists yet to display them — building the images before the surface would be the same "premature architecture" mistake CLAUDE.md already warns against), Homepage destination cards (no such surface exists — would be a product decision, not an asset-integration one), Guides/My Mexico Plan imagery (same reasoning).

### Acceptance criteria for CX-007 (visual integration)

- All 7 destinations render their own correctly-matched, geographically-accurate hero and card imagery — zero shared files between unrelated destinations.
- Every new image ships as WebP with a JPEG fallback via `<picture>`, at or under the per-crop budgets in §12.
- Zero layout shift introduced (existing `aspect-[...]` container discipline preserved exactly).
- Zero regression to the CX-001–005 motion system — ambient drift/light-movement effects continue to work identically on the new files (same wrapper-div layering rule, unchanged).
- Alt text present in the language the surrounding component already renders in; EN/ES pairs available for every asset regardless of whether the consuming component currently branches on language.
- `og-image.jpg` fetches as a real JPEG (or is renamed to match its real format) and is under 250 KB.
- Full desktop/tablet/mobile QA per this project's standing discipline, plus a visual pass confirming no destination "looks like Tulum" that shouldn't.
