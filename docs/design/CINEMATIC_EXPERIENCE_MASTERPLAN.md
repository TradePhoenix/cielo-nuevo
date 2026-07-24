# Path To Mexico — Cinematic Experience Masterplan

**Status:** Living standard. Documentation only — no components, packages, or effects were changed to produce this document.
**Supersedes:** the informal CX-001/CX-002/CX-003 commit-message documentation (still valid history, now consolidated here).
**Owner:** ChatGPT (CTO/Product Architect) sets direction and approves CX ticket scope; Claude Code implements against this standard and proposes amendments here when reality and plan diverge.

## How to use this document

This is an engineering and product standard, not a mood board. Every section states a rule, the current state of the codebase against that rule, and — where the rule isn't met yet — what closes the gap. When a future CX ticket is scoped, its author should be able to point at a section number here and say "this ticket implements §10" rather than re-litigating the philosophy each time.

The single test for any proposed motion, effect, or visual change, at any point in this document or in any future ticket:

> **Does this make someone feel calmer, more confident, and more excited about beginning a new life in Mexico?**

If the honest answer is "no" or "not sure," the effect doesn't ship, no matter how impressive it looks in isolation.

---

## 0. Current-State Method

This document was produced by direct repository inspection, not by re-reading old ticket summaries. Specifically inspected for this masterplan: `src/components/cinematicMotion.js`, `CinematicReveal.js`, `CinematicHero.js`, `RouteLoadingFallback.js`; `src/pages/HomePage.js` in full; `src/features/blueprint/` (`BlueprintApp.js`, `BlueprintIntro.js`, `BlueprintLoading.js`, and every `Results*` component); `src/features/yourMexico/` in full (`CityCard.js`, `CityHero.js`, `CitySection.js`, `CompareYourMatches.js`, `CityDetailPage.js`, `YourMexicoPage.js`, `ComparePage.js`); `src/features/myMexicoPlan/` in full; `src/components/ArticleLayout.js` / `ArticleSection.js` / `GuidesPage.js`; `src/App.js`'s route-transition wrapper; `public/` for the complete image asset inventory; `CLAUDE.md`, `README.md`, and `ENG-003-POSTMORTEM.md` for prior product/engineering history. No `docs/` directory or prior design-system document existed before this one.

---

## 1. Emotional North Star

Path To Mexico is not selling a vacation. It's helping someone make one of the biggest decisions of their life feel survivable, then exciting. Every visual and motion decision serves exactly one of three emotional jobs:

1. **Reduce uncertainty** — clarity, orientation, "I understand what this is and what happens next."
2. **Build confidence** — competence, trust, "this organization knows what it's doing and is being straight with me."
3. **Open possibility** — warmth, atmosphere, "I can picture myself there."

A motion effect that doesn't visibly serve one of these three jobs is decoration, and decoration is explicitly out of scope everywhere in this system (see §22).

## 2. Motion Philosophy

**The interface should feel alive, not animated.** A visitor should never consciously notice "there's an animation running" — they should notice a place feeling calm, considered, and a little more real than a flat webpage has any right to feel. The tell for "alive" vs. "animated": if you can screenshot two frames a few seconds apart and they look almost identical except for one subtle, slow shift, that's alive. If two frames look meaningfully different because something is visibly moving, that's animated, and it's wrong.

Four things motion is allowed to do (from CX-001's original charter, still correct):
- **Guide** — direct attention to what matters next (entry reveals, focus states).
- **Reveal** — make content feel discovered rather than dumped (scroll-triggered reveals).
- **Breathe** — a living environment, not a static photograph (ambient drift, light movement).
- **Communicate arrival** — mark the moment of transition between two states as intentional, not a hard cut (route transitions, results reveals).

Nothing here is animation for its own sake. "It looks cool" is not a reason to ship an effect.

## 3. Motion Timing, Easing, and Duration Rules

Already implemented and correct in `src/components/cinematicMotion.js` — this section formalizes what's there, it doesn't propose new tokens.

| Token | Value | Use |
|---|---|---|
| `DURATION.instant` | 0.12s | Reduced-motion fallback duration for everything; focus/color micro-feedback |
| `DURATION.quick` | 0.3s | Hover lifts, button states, route-transition fade |
| `DURATION.entry` | 0.8s | On-load / on-scroll reveals (the site's one shared entrance language) |
| `DURATION.ambient` | 10s | One full "breath" of ambient/idle motion |
| `EASE.standard` | `cubic-bezier(0.22, 1, 0.36, 1)` | All entry/exit motion — confident deceleration, matches the hero's own original curve |
| `EASE.ambient` | `easeInOut` | All slow, looping, reversible motion |
| `HEARTBEAT.stagger` | 2.4s | Offset between ambient elements in a group, so they never re-synchronize into visible unison |
| `REVEAL_STAGGER` | 0.12s | Offset between entry-reveal siblings in a grid — a different, much quicker cadence than the ambient heartbeat, because entrance choreography and idle atmosphere are different concerns |

**Rule:** no new duration or easing value is introduced without adding it to this table first. A one-off `transition: { duration: 0.45 }` scattered in a component is a code-review-blocking smell, not a style choice.

## 4. When Interfaces Move, and When They Remain Still

**Move:**
- On first entry into the viewport (once, via `whileInView`).
- On hover/focus, for interactive elements only, transform/opacity only.
- Ambient, continuous, and *only* on hero-scale photography, desktop/tablet only, `prefers-reduced-motion`-gated.
- On route transitions (a single opacity fade, see §9).
- On a genuine state change (loading → loaded, closed → open).

**Stay still:**
- Body copy, at all times, always. No drift, no parallax, no fade-while-reading.
- Form inputs, validation states, error messages. Stillness signals trustworthiness here.
- Anything already fully visible in the current viewport that isn't changing state — don't retrigger.
- Every route on mobile, for continuous/ambient effects (see §17).
- Under `prefers-reduced-motion: reduce` (see §18).
- Navigation chrome, except the deliberate, functional scroll-aware color transition already in `HomePage.js`.

## 5. Light and Time-of-Day System

**Classification: Future experimental concept.** Nothing like this exists in the codebase today. The only "light" effect implemented is CX-001/CX-003's `cinematic-light` keyframe — a fixed, slow-drifting soft radial gradient, identical regardless of the visitor's actual local time or the destination's real climate.

If this is pursued in a future CX ticket, the guardrails now, before any code is written:
- **Never claim to be real.** A "light system" must never imply live weather, a live camera, or the visitor's actual local time — this is explicitly forbidden by every CX ticket's constraints and by DEST-001's own regional honesty requirements. It's an *aesthetic* time-of-day (e.g., a hero photo reads "golden hour" because that's when it was shot, not because it's currently golden hour anywhere).
- **Photography-driven, not simulated.** With only three stock photos in the entire asset library (see §25), a "system" here means categorizing whatever real photography exists by its actual lighting condition and choosing overlay treatment to match what's already true in the photo — not generating a day/night cycle over static images.
- **One overlay language, reused.** Reuse the existing `cinematic-light` gold-radial-gradient technique; do not invent a second gradient/overlay system. If a cooler, dawn-toned variant is wanted for a specific region, it should be a new *token* (see §3) applied through the same mechanism, not a new component.

**Recommendation:** do not build this until real, region-specific photography exists (see §25's photography gap). Building a "time of day system" on top of three recycled stock photos would produce something that looks arbitrary rather than intentional — the opposite of this system's purpose.

## 6. Regional Visual Identities

**Classification: Existing but inconsistent** (data/copy is fully regional and distinct; imagery is not, for a structural reason — see below).

DEST-001 established two visually distinct corridors in copy, tags, and Blueprint signals:
- **Riviera Maya corridor** (Playa del Carmen, Tulum, Riviera Maya): Caribbean turquoise water, dense jungle-to-beach transitions, built-up beach-town energy.
- **Mérida & the Yucatán Coast corridor** (Mérida, Progreso, Chicxulub Puerto, Telchac Puerto): colonial limestone architecture inland, open Gulf coastline (grayer-green water, wider horizons, lower development) along the coast.

The copy is already fully differentiated (see each destination's `cityDetails.js` entry and guide article). **The photography is not** — there are only three stock photos site-wide (`hero.jpg`, `lifestyle.jpg`, `sanctuary.jpg`), and DEST-001 explicitly documented reusing them across both corridors, including using `sanctuary.jpg` (a covered terrace/pool scene) as a placeholder for Mérida's colonial architecture because no accurate asset exists. This is the single highest-leverage content gap in the entire system — see §24 and the roadmap.

**Rule going forward:** a region's tag combination, copy voice, and visual treatment must all tell the same story. Right now the Yucatán Coast corridor's *copy* says "this is not Tulum," but its *imagery* (borrowed Caribbean stock photography) doesn't yet back that up. Closing this gap is real photography, not more motion engineering.

## 7. Nature and Atmospheric Effects

**Classification: Existing, narrow, and correctly restrained.**

Implemented today: `cinematic-drift` (a near-imperceptible 1.0→1.035 image scale) and `cinematic-light` (a soft, slow-drifting radial gradient), both CSS keyframes, both `motion-safe:` + `md:`-gated. That's the entire nature/atmosphere vocabulary in the codebase as of CX-003/DEST-001.

**Nature is atmosphere, not decoration** — this principle is already respected structurally: CX-001 through CX-003 explicitly ruled out birds, waves, weather, particles, canvas, and WebGL, and every subsequent ticket has held that line. Nothing in this masterplan proposes reversing it.

The one gap: atmospheric effects today are region-agnostic — the same drift/glow treatment runs on a Riviera Maya beach photo and a Yucatán Gulf coast photo. §25 proposes tuning the *existing* two effects' parameters (never new effect types) per region once real photography exists to tune them against.

## 8. Spatial Depth, Layers, Glass, Shadows, and Focus

**Classification: Existing but narrow.**

- **Depth:** CX-002 added one pointer-tracking depth effect, on the Homepage hero only, desktop-only, max 10px translate. No other surface has depth treatment. This was a deliberate "one approved surface" scope limit in CX-002, not a technical ceiling.
- **Glass/blur:** the scroll-aware nav uses `backdrop-blur-md` — the only frosted-glass treatment in the app. No card, modal, or overlay uses glassmorphism elsewhere.
- **Shadows:** minimal and functional — `shadow-sm`/`shadow-lg` on hover states, never decorative drop-shadows on static content. Correct; keep it this way. Heavy shadow work reads as generic SaaS, which CLAUDE.md already explicitly rules out sitewide.
- **Focus states:** the branded gold `focus-visible:ring-2 ring-[#d8a15f]` pattern is the single most consistent piece of the entire visual system — it appears correctly on essentially every interactive element built since Sprint 5A. The one known, already-documented gap: plain navigation and card links across most of the site fall back to the browser's default blue outline instead of the branded ring (flagged in ENG-022's audit, never fixed — still true today). This is a **High severity, not yet scheduled** consistency gap, not a CX-motion concern, but it lives in the same visual-polish territory and belongs in this document.

## 9. Scroll and Discovery Behavior

**Classification: Existing and consistent, narrow scope by design.**

The entire scroll vocabulary is `whileInView` (once-only, no scroll-scrubbing, no parallax-on-scroll). This has been a deliberate, repeated decision across CX-001 through CX-003: scroll-linked/scrubbed animation is explicitly deferred every single ticket, because it's a materially heavier technique with real jank risk on lower-end mobile devices, and nothing in the current experience needs it to communicate its point.

`CinematicReveal.js` is the one reusable primitive for this (see §23) and is used consistently across Homepage, City Detail (via `CitySection.js`), and nowhere else yet (Blueprint results use their own local, equivalent stagger implementation — see §13; My Mexico Plan has none at all — see §15).

**Recommendation:** do not introduce scroll-scrubbed motion until there's a specific surface where `whileInView`'s all-or-nothing reveal genuinely can't communicate the intended moment (a real candidate: the Blueprint results reveal already *feels* like it wants a more continuous build — see §13). Even then, treat it as a new, carefully-scoped primitive, not a sitewide upgrade.

## 10. Destination-Card Behavior

**Classification: Existing and verified** (`CityCard.js`).

Standard, established in CX-001 and unchanged since:
1. Entry reveal via `whileInView`, `entryReveal`/`entryRevealReduced`.
2. Ambient drift lives on a dedicated wrapper *around* the `<img>`, never the image itself.
3. A separate `cinematic-light` overlay sits over the photo only, never the caption/text below it.
4. Hover applies its own, independent `scale-105` directly to the `<img>` — composing with, never fighting, the ambient wrapper's transform.
5. `index`-based `HEARTBEAT.stagger` offset so a row of cards breathes as a group, not in mechanical unison.
6. Both ambient effects `motion-safe:` + `md:`-gated.

This is the **reference implementation** for every other "photo + ambient + hover" surface in the app (`CityHero.js` and the Homepage hero both directly copy this pattern). Any future card-shaped surface (a future Mérida-region destination card row, a future partner/professional card, etc.) should extend this component or its exact pattern, not invent a new one.

## 11. City Hero Behavior

**Classification: Existing and verified** (`CityHero.js`, extended in CX-003 and reused unmodified for all 7 destinations in DEST-001).

Identical ambient-drift + light-movement treatment to the Homepage hero and `CityCard.js` (§10), applied to the full-bleed City Detail hero image. Same layering discipline (drift wrapper separate from any interactive transform), same gating. Verified working correctly for all 7 current destinations, including the 4 added in DEST-001, in production.

**Gap, not a defect:** `CityHero.js` has no pointer-depth treatment (CX-002 scoped pointer depth to exactly one surface, the Homepage hero). Extending it here is a legitimate, low-risk future ticket — see the roadmap.

## 12. Maps and Geographic Storytelling

**Classification: Missing.**

No map library, map component, or geographic visualization exists anywhere in this codebase. Confirmed by direct grep across every CX and DEST ticket: zero references to Leaflet, Mapbox, Google Maps, or any `<canvas>`/SVG-based map. "Nearby places" and regional relationships (e.g., "Progreso is a short, well-traveled drive from Mérida") are communicated entirely through prose in `cityDetails.js` and the guide articles.

This is **not a gap to rush to fill.** Every CX ticket to date has held the line on "no unnecessary dependencies" and "no one-off components unless the architecture genuinely requires them" — and a real interactive map is exactly the kind of addition that needs deliberate, separate product scoping (a real map library is a genuine new dependency, with real performance/accessibility/mobile cost), not something to bolt onto a motion-system ticket. DEST-001 explicitly confirmed and preserved this boundary.

**If ever pursued:** it should be scoped as its own ticket family (not CX-, a new "GEO-" or similar prefix), justified by an actual product need (e.g., visualizing all 7 destinations' relative locations at once), and evaluated against the *existing* text-based pattern first — a well-written paragraph describing "a short, direct drive along one coastal highway" may simply be the right, honest, low-maintenance answer permanently, since precise travel times aren't sourced data anyway (see DEST-001's own truth constraints).

## 13. Blueprint Completion and Results Reveal

**Classification: Existing and verified, but architecturally isolated.**

`BlueprintApp.js`'s results screen already has the most sophisticated motion in the entire app: a staggered cascade (score → city matches → roadmap → CTA) via locally-defined `resultsStagger`/`resultsItem` variants, retrofitted for reduced-motion in CX-003. `BlueprintLoading.js` adds a staged, self-timed message sequence with a progress line — genuinely well-crafted, and arguably the closest thing this app has to "AI guidance" pacing today (see §14) even though it's fully deterministic, not AI-driven.

**The gap:** these variants are locally defined in `BlueprintApp.js`, not pulled from `cinematicMotion.js`. They're *functionally* equivalent to `entryReveal`/`REVEAL_STAGGER` (same shape, very close values — 0.6s vs. the system's 0.8s, 0.15s stagger vs. the system's 0.12s) but were never consolidated into the shared system, because CX-003 deliberately chose not to touch already-tuned, working Blueprint values without a clear reason to. That's still the right call — Blueprint's own pacing may be intentionally distinct from the general reveal cadence, given the emotional weight of "this is your result" — but it should be an *explicit* choice, not an accident of two systems evolving in parallel. Recommendation: a future ticket should either (a) formally adopt these values as a named `BLUEPRINT_REVEAL` token pair alongside the others in §3, documenting that Blueprint results intentionally use a slightly slower, more deliberate cadence than general content reveals, or (b) migrate them to the shared tokens if no one can articulate why they should differ. Either outcome is fine; the accident of never deciding is the actual problem.

## 14. AI Guidance Moments

**Classification: Missing — and this is a real, product-level fact, not a bug.**

Per `CLAUDE.md`: *"[The Blueprint] intentionally does not call a real AI model yet — it was architected so a real backend/AI call can replace its scoring logic later without touching any UI, but that swap is a future decision, not a current plan."* There is no AI anywhere in this product today. `recommendationEngine.js` is a pure, deterministic, tag-matching function.

This matters enormously for this masterplan's guardrail — **"AI should feel like a trusted guide, not a chatbot"** — because right now there is no AI experience to hold to that standard. What exists instead, and does the emotional job well, is `BlueprintLoading.js`'s staged message sequence ("Analyzing your answers... Matching you to the right cities... Building your 90-day roadmap...") — deterministic copy standing in for the *feeling* of guided analysis, and it already succeeds at feeling like a calm, competent guide rather than a spinner.

**Recommendation:** treat `BlueprintLoading.js`'s pacing and tone as the reference for what "AI as trusted guide" should feel like *whenever* a real AI/backend call is introduced (a separate, future, non-CX product decision per `CLAUDE.md`). Do not build any new "AI guidance" UI ahead of that actual product decision — this would be building a costume for a feature that doesn't exist, which is precisely the kind of premature architecture this project's standing rules (`CLAUDE.md`'s "No architecture decisions" for Claude Code) already forbid.

## 15. My Mexico Plan Emotional Journey

**Classification: Missing — the single largest, most surprising gap found by this audit.**

Direct grep confirms: **zero** `framer-motion` imports, zero `whileInView`, zero `motion.` usage anywhere in `src/features/myMexicoPlan/` — across every component (`DecisionBrief`, `CostPlanner`, `AdaptiveChecklist`, `ReadinessAssessment`, `ConciergeWorkspace`, `RelocationTimeline`, `TrustedPartnerWorkspace`, `ChapterTracker`, `NowNextLater`, `TaskCard`, and every other My Mexico Plan component). Every one of these sections has been built, shipped, and QA'd (ENG-012 through ENG-021) entirely without CX-001/002/003 ever touching them — not because they were excluded on purpose, but because no CX ticket's scope has reached this feature yet.

This is genuinely the highest-value, highest-leverage target for a future CX ticket, for a specific reason: My Mexico Plan is the single most emotionally significant screen in the product. It's where "you're considering this" becomes "here is your actual 365-day plan" — readiness score, city match, cost planner, task-by-task roadmap. Every one of those numbers and cards currently just *appears*, with a hard cut, exactly the flat-webpage feeling this whole masterplan exists to move away from.

**Recommended treatment (not yet implemented, proposed for CX-004+):**
- `DecisionBrief` (the readiness-score-at-a-glance section) is the natural first target — a single, dignified `CinematicReveal` on load, echoing the Blueprint results reveal's cascade feeling (§13), so a visitor's plan feels like it's being *assembled* for them, not dumped.
- `ChapterTracker` and `NowNextLater`'s chapter-by-chapter task cards are a natural fit for `CinematicReveal`'s existing `stagger` mode — identical pattern already proven on Homepage and City Detail, zero new primitive needed.
- `TaskCard`'s own checkbox-completion interaction (marking a task done) currently has no motion feedback at all — a small, tasteful confirmation (opacity/checkmark, not a burst or confetti) would materially improve the "I'm making progress" feeling this whole feature exists to create, without violating "no motion on forms" (a checkbox toggle is a discrete state change, not a text-entry field).
- Do **not** add ambient drift/light-movement anywhere in My Mexico Plan — there is no hero-scale photography here, and applying photo-ambient treatment to data-dense, text-heavy cards would violate §4's "stay still" rule for body copy and information density.

## 16. Sound Philosophy for Future Use

**Classification: Missing, and should stay that way by default.**

Zero audio exists anywhere in the product today — no ambient sound, no UI sound effects, no autoplay video/audio of any kind. This is correct and should remain the default.

**If sound is ever considered** (not scoped, not recommended for any near-term CX ticket): it must be strictly opt-in (a visitor-initiated toggle, never autoplay, never on by default), must never be required to understand any content or complete any action, must respect the same restraint principle as visual motion (ambient/atmospheric only, never a "ding" or notification-style sound effect on interactions), and must be trivially and instantly mutable/dismissible. Given this product's calm, premium, "not a theme park" positioning, the honest recommendation is that sound is more likely to *undermine* the brand than support it, and should require a strong, explicit product reason before any engineering time is spent on it.

## 17. Mobile Behavior

**Classification: Existing and consistent.**

The mobile degradation strategy has been identical and correctly applied since CX-001: continuous/ambient effects (drift, light movement, pointer depth) are gated `md:` and up via Tailwind responsive variants — pure CSS, no JS viewport detection, no risk of hydration mismatch. Mobile receives: entry reveals (full-strength, since these are one-shot and cheap), hover/tap feedback, and fully static imagery otherwise. Pointer-depth specifically is additionally gated on `(hover: hover) and (pointer: fine)` via `matchMedia`, checked once on mount — the correct signal for "has a real cursor," deliberately stronger than a width breakpoint (so a touch-capable wide-viewport device doesn't incorrectly get pointer-tracking).

Verified via computed-style checks (not assumption) in every CX ticket's QA: `animation-name: none` on mobile viewports, across every surface that has ambient motion, every single time.

## 18. Reduced-Motion Behavior

**Classification: Existing and comprehensive as of CX-003, with one intentionally-scoped remaining gap.**

As of CX-003, `prefers-reduced-motion: reduce` has been retrofitted across every pre-CX-001 motion usage found in the codebase: `RouteLoadingFallback`'s pulse, `ArticleSection.js` (~20 guide pages), `ArticleLayout.js`'s header, `GuidesPage.js`'s header, `HomePage.js`'s own local `SectionHeader` (a genuine bug caught mid-ticket — see CX-003's commit history), `BlueprintIntro.js`, and `BlueprintApp.js`'s per-question fade and results stagger. Combined with CX-001/002's ground-up reduced-motion design, every animated surface in the app *except* My Mexico Plan (§15, because it has no motion to begin with) now degrades correctly.

**Policy, formalized:**
- Ambient/continuous effects: disabled outright, not slowed. Pure CSS via `motion-safe:` — the browser's own media query, zero JS needed.
- One-shot entry reveals: degrade to opacity-only, no y-offset, `DURATION.instant`.
- Staggers: `staggerChildren`/`delayChildren` drop to 0 — every item appears together instead of cascading.
- Route transitions: duration drops to `DURATION.instant`.
- Hover/focus feedback is **never** removed under reduced motion — it's informative (a state change), not decorative, and removing it would be an accessibility regression, not an accessibility improvement.

**Verification standard for every future CX ticket:** reduced-motion checks must assert *computed* `animation-name`/`opacity`, not assume from reading the code — this project's QA history (documented across ENG-022, CX-001–003) shows repeated false positives from insufficient settle-wait timing in automated checks, always resolved by re-verifying with proper wait/settle logic, never by finding a real bug from a "looks right" assumption.

## 19. Accessibility Requirements

Non-negotiable, per every prior CX ticket's explicit constraints and this masterplan's own standing principle:
- WCAG-conscious contrast at all times — no ambient/atmospheric overlay may ever reduce text-background contrast below an accessible threshold. The existing pattern (light-movement overlays sitting *beneath* existing dark gradient overlays in the DOM, never in front of text) is the correct, proven technique — keep using it, never invert the layering.
- The branded gold `focus-visible` ring (§8) must be present on every new interactive element; never removed or weakened by a cinematic treatment.
- No motion may be the *sole* signal of a state change — always paired with a text/color/icon change.
- Every image needs real `alt` text (already the sitewide standard; DEST-001 confirmed this holds for all 4 new destinations).
- Reduced-motion is a first-class requirement for every new CX ticket, not a follow-up pass (§18).

## 20. Performance Budgets

- Animate `transform` and `opacity` only — never properties that trigger layout or paint (`width`, `height`, `top`, `left`, `box-shadow`).
- No more than one continuous/looping animation *family* active per viewport section at a time (a row of cards shares one drift definition and one light-movement definition, not N independent ones — already the established pattern).
- No animation may force a React re-render on every frame — every continuous effect in the system today is CSS-driven (`@keyframes` + Tailwind `animate-[]`), not `requestAnimationFrame`/`setInterval`-driven state. This should remain a hard rule: the moment a "smooth" effect requires per-frame React state updates, it's the wrong implementation technique for this codebase.
- No effect should measurably delay Largest Contentful Paint or interaction readiness — verified per-ticket by confirming builds stay clean and dev-server smoke tests show no regression; a formal Lighthouse/perf budget number has not yet been established (see roadmap).
- Zero new image assets and zero new animation libraries have been introduced across CX-001 through DEST-001 — this has held perfectly to date and should continue to be treated as a hard constraint, not a preference.

## 21. Implementation Guardrails

Reiterating and consolidating what every CX and DEST ticket has already enforced:
- No new dependencies, ever, without an explicit, separate product decision (not a CX ticket's call to make).
- No redesign — CX tickets extend the existing visual language, they don't propose a new one.
- No broad refactors — the smallest practical number of files, every time.
- `CinematicHero.js` stays untouched unless a future ticket can *prove* it's the correct foundation and explains why before changing it (it has not been proven so in three audits; see §23).
- Every new animated component reuses `cinematicMotion.js`'s tokens and `CinematicReveal.js`'s pattern — a new component redefining its own duration/easing constants is a defect, not a stylistic choice.
- Protected product logic (Blueprint scoring, Decision Engine, My Mexico Plan data, costs, tasks, ownership, partner logic, persistence) is never touched by a CX ticket. Motion tickets touch presentation only.

## 22. Rules Preventing Effects From Becoming Gimmicky

- **The two-frame test** (§2): if a screenshot taken a few seconds apart from another looks meaningfully different rather than subtly different, the effect is too strong.
- **No effect ships without a stated emotional job** (§1) — "reduce uncertainty," "build confidence," or "open possibility." "It looks impressive" is not one of the three.
- **One bold moment, not many small ones.** The system consistently spends its "boldness budget" in one place per surface (the hero) and keeps everything else quiet — this is a direct application of the site's own established design principle (see `CLAUDE.md`'s UX Principles) and should continue to govern every future CX ticket's scope.
- **No novelty for novelty's sake.** Springy/bouncy easing, exaggerated tilt, particle effects, and anything that reads as "an app trying to seem fun" are permanently out of scope — this product's brand is calm and premium, not playful.
- **A region's environmental identity comes from real photography and honest copy, not from motion tricks.** Motion cannot manufacture a distinct sense of place that the underlying asset doesn't have (§6, §25) — adding more drift/glow to a borrowed Caribbean stock photo does not make it read as Mérida.

## 23. Reusable Cinematic Primitives and Components

The complete, current inventory — every future CX ticket should extend these, not create parallel ones:

| File | Purpose | Status |
|---|---|---|
| `src/components/cinematicMotion.js` | Shared tokens: `DURATION`, `EASE`, `HEARTBEAT`, `entryReveal`/`entryRevealReduced`, `ambientDrift()`, `POINTER_DEPTH`, `ROUTE_TRANSITION`, `routeTransitionDuration()`, `REVEAL_STAGGER`, `useCinematicMotion` (thin wrapper over Framer Motion's `useReducedMotion`) | **Verified, canonical.** The one file every other primitive imports from. |
| `src/components/CinematicReveal.js` | The reusable section-reveal component — single-element or `stagger` mode, reduced-motion aware internally | **Verified, canonical.** Used on Homepage (10 sections) and City Detail (via `CitySection.js`, cascading to ~10 sub-components). Not yet used in Blueprint (§13) or My Mexico Plan (§15). |
| `index.css`'s `cinematic-drift` / `cinematic-light` `@keyframes` | The ambient image-breath and light-movement effects, applied via Tailwind `motion-safe:md:animate-[...]` | **Verified, canonical.** Used identically on the Homepage hero, `CityCard.js`, and `CityHero.js` — proven three times over. |
| `src/components/RouteLoadingFallback.js` | Suspense fallback for lazy-loaded routes; delayed appearance, reduced-motion-gated pulse | **Verified.** Not itself a "cinematic" primitive in the motion-language sense, but part of the same system's perceived-performance discipline. |
| `src/components/CinematicHero.js` | An early, unused, untracked exploration of a full-bleed hero treatment | **Explicitly not part of the system.** Audited three separate times (CX-001, CX-002, CX-003) and rejected as a foundation each time: different visual language (`rounded-full` buttons vs. the sitewide sharp-rectangle standard), no focus-visible states, an unguarded infinite scroll-indicator loop, and it duplicates rather than extends the live, more complete `HomePage.js` hero (missing scroll-aware nav, mobile menu, WhatsApp collision-avoidance, EN/ES support). Recommendation: either formally delete it (a product decision, not a CX one) or leave it as clearly-marked dead reference material — but never treat its existence as implying the system needs a "second hero component." |

**No component in `src/features/myMexicoPlan/` implements any of these primitives yet** (§15) — this is the system's biggest extension opportunity, not a defect in the primitives themselves.

## 24. Page-by-Page Experience Audit

| Surface | Classification | Notes |
|---|---|---|
| Homepage hero | **Existing and verified** | Entry stagger, ambient drift + light, pointer depth (desktop), scroll-aware nav — the most complete single surface in the app. |
| Homepage — Blueprint teaser, Services, Work, Testimonials sections | **Existing and verified** | `CinematicReveal` (single + stagger modes), added CX-002. |
| Homepage — Process, Network, Trust, FAQ, Founder/About, Who This Is For | **Existing and verified** | `CinematicReveal`, added CX-003. |
| Homepage — final contact form + disclaimer + footer | **Existing, intentionally still** | No motion by design — forms stay still (§4); disclaimer/footer are low-value reveal targets, correctly skipped in CX-003. |
| Blueprint intro | **Existing and verified** | Full-bleed hero-language reuse, reduced-motion fixed in CX-003. No ambient drift (§13 — never extended here, arguably a reasonable future candidate since it reuses `/hero.jpg`). |
| Blueprint questions | **Existing and verified** | Per-question fade, reduced-motion fixed in CX-003. |
| Blueprint loading | **Existing and verified, notably well-crafted** | Staged message sequence + progress line; the closest thing to "AI guidance" pacing in the product today (§14). |
| Blueprint results | **Existing and verified, architecturally isolated** | Cascading stagger reveal, reduced-motion fixed in CX-003; uses locally-defined variants instead of the shared token system (§13). |
| Guides index | **Existing and verified** | Header fade, reduced-motion fixed in CX-003. Guide card grid itself has no entry reveal — a small, low-risk future candidate. |
| Guide articles (all ~24, including the 4 DEST-001 additions) | **Existing and verified** | `ArticleLayout`/`ArticleSection`, reduced-motion fixed in CX-003 (fixes all pages at once via 2 shared files). |
| Your Mexico overview | **Existing and verified** | `CityCard` grid with full ambient/reveal treatment (§10), scales to all 7 destinations with zero code changes (verified in DEST-001). |
| City Detail pages (all 7) | **Existing and verified** | `CityHero` (§11) + `CinematicReveal`-cascaded story sections via `CitySection.js` (§9). |
| Compare | **Existing, intentionally still** | A data table — correctly has no motion; comparison tables are a "stay still" surface (§4), not an oversight. |
| My Mexico Plan (all sections) | **Missing** | Zero motion anywhere (§15) — the system's single largest opportunity. |
| Route transitions (app-wide) | **Existing and verified** | Opacity-only fade, keyed on top-level path segment, never conflicts with `RouteLoadingFallback` (§9, CX-002). |
| Navigation (desktop nav, mobile menu) | **Existing and verified** | Scroll-aware color transition, full-screen mobile menu — functional, not "cinematic" in this system's sense, and correctly so; nav chrome should stay legible and predictable, not atmospheric. |
| Dashboard / Document Vault | **Not audited by this document** | Out of scope for CX-001 through CX-003 and this masterplan; flagged for a future audit pass, not assumed to be either fine or broken. |
| Light/time-of-day system | **Future experimental concept** | See §5 — do not build ahead of real regional photography. |
| Maps | **Missing, deliberately not prioritized** | See §12. |
| Sound | **Missing, should stay that way** | See §16. |

## 25. Regional Treatment

Applies §6's principle concretely, per destination. All five below currently share the *same three stock photos* and the *same two ambient effects* — the differentiation described here is the **target state**, not yet fully realized, gated on real photography (see roadmap).

### Riviera Maya (Playa del Carmen, Tulum, Riviera Maya)
Already-established visual language: Caribbean turquoise water, dense green jungle-to-beach transitions, warm golden light, built-up beach-town energy for Playa specifically, more boho/wellness stillness for Tulum, quieter residential jungle feel for Riviera Maya proper. This is the system's original, best-realized visual identity — the reference standard the Yucatán corridor should match in quality, not in content.

### Mérida
**Target identity:** limestone architecture, shaded courtyards, filtered tropical light through colonnades, warm stone tones, architectural stillness, cultural depth. **Current reality:** uses `sanctuary.jpg` (a resort terrace/pool scene) as an explicitly-documented placeholder — the closest available match among three photos that were all shot for a different regional story. This is the single most visually misrepresented destination in the app today. No amount of motion tuning fixes this; it needs real photography of Centro Histórico, Paseo de Montejo, or a genuine courtyard interior.

### Progreso
**Target identity:** open horizon, flatter Gulf light (grayer-green water, wider skies than the Caribbean's saturated turquoise), a steady onshore breeze implied through composition, broader/more social coastal energy than the quieter towns further down the coast. **Current reality:** uses `hero.jpg` (a Caribbean aerial coastline shot) — directionally reasonable (it is at least a coastline), but the water color and vegetation density read as Caribbean, not Gulf. A real Progreso malecón photograph would be the highest-value single asset addition for this corridor.

### Chicxulub Puerto
**Target identity:** quiet shoreline, residential stillness, soft natural movement, calm beach mornings — visually a quieter, lower-energy variation on Progreso's palette, not a different climate or coastline entirely. **Current reality:** uses `lifestyle.jpg` (a jungle-to-beach path shot originally representing Tulum) — the closest available match for "quiet residential coastal," but still carries Caribbean jungle vegetation that doesn't match the Gulf coast's actual, sparser scrubland/dune landscape.

### Telchac Puerto
**Target identity:** pale, open Gulf atmosphere, spaciousness, intimacy, a sense of discovery rather than arrival — the most understated, least "postcard" visual treatment of any destination in the app, deliberately, since the copy itself (see DEST-001's guide article) explicitly warns against marketing this place as exclusive or aspirational. **Current reality:** uses `hero.jpg` again (shared with Progreso) — the least differentiated of the four new destinations visually, which is actually the more urgent gap precisely *because* the copy works so hard to make this place feel distinct while the imagery currently can't back it up.

**The standing rule, restated from the ticket brief and now formal system policy:** do not make Mérida or the Gulf Coast resemble Tulum. Every choice above is oriented around Gulf-coast-specific, inland-colonial-specific visual language, explicitly not reusing "Caribbean" as a stand-in for "coastal." The current implementation's photo reuse is a documented, flagged limitation — not an endorsement of Caribbean visual language for this corridor.

## 26. Phased Implementation Roadmap

**Phase 1 — Foundation (complete).** CX-001: motion system + tokens + first prototype (Homepage hero, `CityCard`). CX-002: section reveals + pointer depth + route transitions. CX-003: sitewide reduced-motion retrofit + City Detail extension. DEST-001: proved the data/content architecture scales to 7 destinations with zero motion-system changes required.

**Phase 2 — Close the emotional gaps (recommended next, see CX-004 below).** My Mexico Plan is completely unanimated (§15) despite being the single most emotionally significant screen in the product. This is the highest-leverage remaining surface, and doesn't require any new primitive — it's applying `CinematicReveal` (already built, already proven twice) to a feature that simply hasn't been reached yet.

**Phase 3 — Regional photography.** Not a CX engineering ticket — a content/product decision (commissioning or licensing real Mérida, Progreso, Chicxulub Puerto, and Telchac Puerto photography). Everything in §6 and §25 is gated on this. Recommend flagging to the founder now, since it's the long-lead-time item in this roadmap and every visual refinement after Phase 2 depends on it.

**Phase 4 — Refinement, once Phase 3 lands.** Region-tuned ambient effect parameters (§7), the light/time-of-day system (§5) if still wanted, `CityHero` pointer depth (§11), Blueprint results migrated to formal shared tokens (§13), Guides index card-grid reveal.

**Not scheduled, evaluate only if a specific product need arises:** maps (§12), sound (§16), scroll-scrubbed/parallax motion beyond the current `whileInView` model (§9).

## 27. CX Ticket Numbers, Dependencies, and Acceptance Criteria

| Ticket | Depends on | Summary |
|---|---|---|
| CX-001 | — | Motion system foundation; prototype on hero + `CityCard`. **Shipped.** |
| CX-002 | CX-001 | Section reveals, hero pointer depth, route transitions. **Shipped.** |
| CX-003 | CX-001, CX-002 | Sitewide reduced-motion retrofit; City Detail extension. **Shipped.** |
| DEST-001 | CX-001–003 (reused `CityCard`/`CityHero`/`CinematicReveal` unmodified) | 4 new destinations; proved the system's scalability. **Shipped.** |
| **CX-004** | CX-001–003, `CinematicReveal.js` | My Mexico Plan emotional journey. **Recommended next — see below.** |
| CX-005 (proposed, not yet scoped) | CX-004 | Blueprint results migrated to formal shared tokens; Guides index card reveal; `CityHero` pointer depth. |
| Photography initiative (not a CX ticket) | — | Real Mérida/Gulf Coast photography — long-lead, product-owned, blocks §6/§25/Phase 4. |

---

## Closing Summary

### 1. Current-state findings
The motion system is real, consistently applied, and genuinely well-engineered where it exists: one shared token file, one shared reveal component, two ambient CSS effects reused identically across three independent surfaces, a comprehensive and verified reduced-motion policy, and a scalability proof (DEST-001 added 4 destinations with zero motion-system code changes). The gaps are not quality gaps — they're **coverage** gaps: My Mexico Plan has no motion at all, and the Yucatán Coast corridor's copy has outpaced its photography.

### 2. Highest-leverage inconsistencies
1. **My Mexico Plan is completely unanimated** (§15) — the most emotionally significant screen in the product, untouched by three motion tickets.
2. **Yucatán Coast photography doesn't match its copy** (§6, §25) — Mérida in particular is visually misrepresented by a resort-pool placeholder image.
3. **Blueprint's results/question motion is architecturally isolated** from the shared token system (§13) — working correctly, but an unexplained fork that should become an explicit decision.
4. **Sitewide focus-ring inconsistency** (§8) — branded on primary CTAs, default-browser everywhere else — a pre-existing, already-documented (ENG-022) gap that sits adjacent to this system without being part of it.

### 3. Reusable system recommendations
Keep exactly two primitives as the system's spine — `cinematicMotion.js` (tokens) and `CinematicReveal.js` (the reveal pattern) — and resist adding a third without a genuinely new use case. The `cinematic-drift`/`cinematic-light` CSS keyframe pair has now proven itself on three independent surfaces (hero, `CityCard`, `CityHero`); treat it as the permanent, canonical "living photograph" technique rather than inventing a new ambient effect per surface.

### 4. Prioritized CX roadmap
CX-004 (My Mexico Plan) → photography initiative (product-owned, parallel track) → CX-005 (Blueprint token consolidation + remaining small gaps) → Phase 4 regional refinement, gated on photography landing.

### 5. Exact recommended scope for CX-004
**CX-004 — My Mexico Plan Emotional Journey.**
1. Audit (already done by this document, §15 — no re-audit needed, just execution).
2. Apply `CinematicReveal` (single-element mode) to `DecisionBrief`'s readiness-score reveal on load.
3. Apply `CinematicReveal` (`stagger` mode) to `ChapterTracker`/`NowNextLater`'s task card grids — identical pattern to Homepage/City Detail, zero new primitive required.
4. Add a small, tasteful completion-state transition to `TaskCard`'s checkbox toggle (opacity/checkmark only — no burst, no confetti, no springy motion).
5. Do not add ambient drift/light-movement anywhere in this feature (no hero-scale photography present; would violate the "stay still on body copy/data-dense surfaces" rule, §4).
6. Full reduced-motion retrofit as a first-class requirement, not a follow-up (§18) — this is a green-field surface, so there's no excuse for shipping it without reduced-motion support from day one, unlike the retrofit work CX-003 had to do after the fact.
7. Protected: no changes to scoring, tasks, costs, ownership, timeline, or partner logic — presentation only, exactly like every prior CX ticket.

### 6. Acceptance criteria for CX-004
- `DecisionBrief`, `ChapterTracker`, and `NowNextLater` all use `CinematicReveal` (imported, not reimplemented locally).
- Computed-style verification (not visual assumption) that every new reveal resolves to full opacity/position on both fast and throttled connections.
- Computed-style verification that every new effect is inert under `prefers-reduced-motion: reduce`.
- Zero changes to any file under `src/features/myMexicoPlan/logic/` or `src/features/myMexicoPlan/data/` (motion touches components only).
- Full regression pass on the existing My Mexico Plan QA suite (the 3 established Blueprint test profiles, desktop + mobile, all 8 existing plan modules) — zero drift.
- Clean build, zero console errors, zero failed requests, zero layout shift — the standard bar every prior CX ticket has already met.
- `TaskCard`'s completion-state transition verified not to interfere with the existing shared `taskState` mechanism (toggling a task must still update every other view of that same task instantly, exactly as it does today with zero motion).

### 7. Risks and dependencies
- **Risk:** My Mexico Plan's components are more data-dense and state-heavy than any prior CX surface (live task-completion state, multiple interdependent sections reading from the same `usePlanState` hook). The main risk isn't the motion itself — it's ensuring `CinematicReveal`'s `once: true` viewport trigger doesn't produce a stale/stuck visual state when a section's underlying data changes after its initial reveal (e.g., toggling a task after the section has already revealed). This needs explicit QA attention CX-004 doesn't currently have precedent for, since Homepage/City Detail content is comparatively static after its own reveal.
- **Dependency:** none on the photography initiative — CX-004 is fully executable with the current asset library, since My Mexico Plan has no hero-scale photography to begin with.
- **Dependency:** the photography initiative (Phase 3) is founder/product-owned, not an engineering ticket, and has no committed timeline as of this document. Phase 4 of the roadmap cannot proceed meaningfully until it does; this masterplan does not assume a date.
- **Risk:** without the photography initiative, continuing to ship "regional identity" work at the copy/data layer (as DEST-001 did, well) while the imagery lags further behind risks the visual and written experience feeling *increasingly* inconsistent with each new destination added, not less. This is worth surfacing to the founder as a sequencing question, not just a someday-nice-to-have.
