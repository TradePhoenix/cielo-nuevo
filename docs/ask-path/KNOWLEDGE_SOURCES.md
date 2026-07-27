# Ask Path — Knowledge Sources

Everything Ask Path can state as fact comes from `api/_lib/knowledge/`,
assembled by `api/_lib/knowledge/index.js` and scored per-request by
`api/_lib/retrieval.js` (deterministic keyword overlap — no vector store,
no embeddings API call, per the ticket's "don't add infrastructure to
appear sophisticated" instruction).

## What's indexed, and where it comes from

| File | Category | Source | Duplication? |
|---|---|---|---|
| `destinations.js` | `destination` | **Imported directly** from `src/decisionEngine/data/cityProfiles.js` + `src/features/yourMexico/data/cityDetails.js` | No — reads the site's live data |
| `faq.js` | `faq` | **Hand-copied** from `src/pages/HomePage.js`'s inline FAQ arrays (16 Q&A, EN/ES) | Yes, intentional — see below |
| `services.js` | `services` / `fitcall` | **Hand-copied** from `src/pages/HomePage.js` (service tiers/pricing) and `src/pages/MexicoFitCallPage.js` (how booking actually works) | Yes, intentional |
| `planningTools.js` | `planning-tool` | **Hand-authored**, verified against each feature's own routing/behavior (Blueprint, Your Mexico, My Mexico Plan, Dashboard) | N/A — no single canonical copy existed to import |
| `guides.js` | `guide-summary` | **Imported directly** from `src/data/guides.js` | No |
| `roadmap.js` | `roadmap` | **Imported directly** from `src/data/relocationRoadmap.js` | No |

**Why some are imported and some are hand-copied:** `cityProfiles.js`,
`cityDetails.js`, `guides.js`, and `relocationRoadmap.js` are already
shared data modules with `export const` — the knowledge index reads them
directly, so a future correction (a fixed budget figure, a new
destination) is picked up automatically, no Ask-Path-specific update
needed. The FAQ and services/pricing copy, by contrast, live as inline
literals inside `HomePage.js` / `MexicoFitCallPage.js`, not shared
modules — extracting them into shared files would mean editing those
pages, which is out of this ticket's scope (see CLAUDE.md: no unrelated
file edits, no homepage changes unless scoped). **This means the FAQ and
services/pricing knowledge is a second, hand-maintained copy of that
page content, and can drift if the homepage copy changes without a
matching update here.** Recommended Phase 2 cleanup: extract
`HomePage.js`'s FAQ array into a shared `src/data/faq.js` the same way
`guides.js` was already extracted from `GuidesPage.js` — a product/scope
decision, not made here.

## Explicitly NOT indexed: full guide bodies (Phase 2)

Per the approved MVP scope, **only the 27 guides' index-card
titles/descriptions/categories are indexed** (imported from
`src/data/guides.js`) — not the guide articles' full body text. Two
reasons, both pre-existing and unrelated to this ticket:

1. The 27 guide bodies are hand-written JSX inside individual page
   components (`src/pages/MovingToTulumPage.js` etc.), not structured data
   — there's no clean way to import them the way `guides.js` is imported.
2. Doing so for all 27 guides is a real content-curation effort (writing
   or extracting accurate, current summaries per guide), not a quick
   technical step — deferred on effort/scope grounds, not a blocker.

**Correction (2026-07-27):** CLAUDE.md documents `ArticleSection.js` as
having a standing bug where a guide article's body `children` never
render, and this file previously repeated that claim as a second reason
guide bodies weren't indexed. Verified directly against the current
`src/components/ArticleSection.js` (during the PTM Spanish-parity ticket)
and against a live guide page's rendered DOM (`/guides/moving-to-tulum`):
the component does render `children` (see its lines 56–64), and the
guide body text is genuinely present in the rendered page. That bug does
not reproduce in the current codebase — CLAUDE.md's note on this point
appears to be stale documentation, not a live defect. It is not the
reason guide bodies are out of MVP scope; reason 2 above is.

Ask Path will therefore answer guide-related questions using the same
short editorial summary already shown on `/guides`, and link to the guide
page itself — never claim knowledge of the guide's full body content
beyond that summary.

## Bilingual coverage caveats

- `destinations.js`: the 14 DEST-003 destinations (Puerto Morelos, Cozumel,
  Bacalar, etc.) have fully bilingual content in `cityDetails.js`
  (`content.en` / `content.es`). The original 11 destinations
  (Playa del Carmen, Tulum, Mérida, etc.) only have a bilingual `tagline`
  — the rest of their detail content (budget notes, honest trade-offs,
  lifestyle snapshot) is English-only in the source data. This is a real,
  pre-existing schema inconsistency in `cityDetails.js`, not something
  this ticket introduced or silently resolved — see that file's own
  header comment.
- `planningTools.js`'s Dashboard/Document Vault record has no Spanish
  version (`es: null`) — hand-authored and not worth inventing Spanish
  copy for a feature that isn't promoted from any marketing page.
- `services.js`'s Mexico Fit Call process record (`fit-call-what-it-is`)
  is English-only — the live `MexicoFitCallPage.js` has no Spanish version
  to copy from.

**How Ask Path handles English-only source content in a Spanish
conversation:** the system prompt (`api/_lib/guardrails.js`) instructs the
model to always respond in the visitor's chosen language while staying
strictly faithful to the retrieved source content's facts — it does not
require every fact to have a separately-authored Spanish source string.
Bilingual fields (tagline, FAQ, service tiers, guide titles/descriptions,
roadmap stages) are used verbatim in the visitor's language when
available; English-only fields are provided as-is and the model
translates/rephrases them faithfully. This is standard practice for a
retrieval-grounded assistant and was a deliberate design choice, not an
oversight — but it does mean Spanish-language answers about the original
11 destinations' finer details (exact trade-off phrasing, etc.) are
model-translated rather than pulled from a human-reviewed Spanish source.

## Conflicting sources

No two records in the index currently assert contradictory facts about
the same thing. If that ever happens as the knowledge base grows, the
system prompt explicitly instructs the model to surface the conflict to
the visitor rather than silently picking one version (see
`SCOPE_AND_SAFETY` in `guardrails.js`) — this is a standing instruction,
not something that needed to trigger during this build.

## Updating the knowledge base

- New destination / guide / roadmap stage: add it to the existing site
  data file (`cityProfiles.js`, `cityDetails.js`, `guides.js`,
  `relocationRoadmap.js`) as normal — it appears in Ask Path automatically,
  no Ask-Path-specific change needed.
- New FAQ or pricing change: update **both** the page copy (`HomePage.js`
  etc.) **and** the matching hand-copied record in `api/_lib/knowledge/`.
- New category entirely: add a `build*Records()` function in a new file
  under `api/_lib/knowledge/`, then one import + one array-spread line in
  `index.js`.
