# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Path To Mexico V2 — Product Vision

Path To Mexico is not just a relocation website. It is becoming a premium global relocation platform for people considering life in Mexico — combining editorial guidance, trusted local connections, and AI-assisted planning tools with high-touch human support.

**My Mexico Blueprint is the first realization of that vision.** It's a frontend-only, deterministic questionnaire → readiness score → city matches → 30/60/90-day roadmap experience, built and shipped across Sprints 1–8 (see Current Architecture below). It intentionally does **not** call a real AI model yet — it was architected so a real backend/AI call can replace its scoring logic later without touching any UI, but that swap is a future decision, not a current plan.

Target audience is global, not Canada-only: Canada, United States, Germany, Argentina, Europe, Asia-Pacific, and beyond. Canada can remain a strong content/referral segment without the site *feeling* Canada-only.

**Core product rule:** every feature, page, and component should reduce uncertainty and help the visitor understand their next best step. If a change doesn't make the visitor's next step clearer, reconsider it.

## Roles

- **ChatGPT** — CTO / Product Architect / UX Strategy. Sets direction, scopes sprints, makes product and architecture calls.
- **Claude Code** — Senior Software Engineer. Implements exactly what's scoped, verifies it works, reports back clearly. Does not make unscoped product or architecture decisions — surfaces them as questions instead.

## Development Workflow

Every sprint in this project follows the same loop. Don't skip steps or collapse them together:

1. **Scoped sprint** — the task arrives with an explicit goal and explicit file scope (which files to create/edit, which to leave alone).
2. **Implement** — make exactly the changes scoped. Nothing more.
3. **`npm run build`** — must pass clean before moving on. Report the output, not a paraphrase of it.
4. **Restart the dev server fresh** — kill whatever's on port 3000 and start a new one before QA. A long-running dev server can carry stale HMR state across many edits, which has previously produced misleading test results (see QA Expectations). Don't trust an old session.
5. **Playwright QA** — drive the actual app (a headless script in the session's scratchpad, never committed) through the affected flow, not just a visual glance.
6. **Screenshots** — desktop (1440×900) and mobile (390×844) for any visually-affecting change.
7. **Report** — files changed, build status, test status, screenshots, and any remaining/visual concerns. Plainly, not optimistically.
8. **Wait for approval** — before starting the next sprint or expanding scope beyond what was asked.

## Approval Rules

Do not do any of the following without it being explicitly asked for in the current scope:

- **No new npm packages.** If one would genuinely help, name it and the tradeoff as a decision point instead of installing it.
- **No backend, database, auth, Stripe, or external API calls.** The Blueprint is frontend-only by deliberate architecture decision (see Current Architecture) — this is not a placeholder to quietly fill in.
- **No unrelated file edits.** Touch only the files named in scope, even when another file seems like the obvious next step. Say so explicitly and wait instead of doing it silently.
- **No homepage or navigation changes unless they're the scoped task.** (Sprint 8 added a Blueprint entry point to the homepage — that was scoped explicitly; don't take it as license to keep adjusting homepage/nav in later sprints.)
- **No architecture decisions.** Swapping the deterministic recommendation engine for a real AI call, adding a backend, restructuring the feature folder layout, etc. are ChatGPT/product calls, not something to decide mid-implementation.
- Also still standing: no deleting pages/routes, no renaming public assets, no deployment config changes, no committing or pushing to git, no retrying an identical rejected edit without first re-examining what might be wrong.

## Current Architecture

**Stack:** Create React App (react-scripts 5) + React Router + Tailwind CSS. Deployed to Vercel, live at pathtomexico.com. No backend anywhere in the project — lead capture goes through Formspree.

**My Mexico Blueprint** — the flagship V2 feature, fully shipped:

```
src/features/blueprint/
  data/          questions.js, cityProfiles.js, copy.js       — pure data, no logic
  logic/         scoringEngine.js, recommendationEngine.js    — pure functions, no side effects
  state/         useBlueprintState.js                         — step machine + localStorage
  components/    BlueprintIntro, QuestionCard, ProgressBar,
                 BlueprintLoading, ResultsSummary,
                 ResultsCityMatch, ResultsRoadmap, ResultsCTA
  BlueprintApp.js  — orchestrator: intro -> question(0..5) -> loading -> results
```

Routed at `/my-mexico-blueprint` (`src/pages/MyMexicoBlueprintPage.js`) and linked from the homepage (a dark CTA section directly beneath the hero — added Sprint 8). **No backend, no auth, no database, no API calls** — the entire feature runs client-side. Progress and answers persist to `localStorage` under `pathToMexico.blueprint.v1` (versioned; a version bump discards incompatible old saved shapes rather than migrating them).

The recommendation is fully **deterministic** — `recommendationEngine.js`'s `buildRecommendation(scores, answers)` takes plain data in, returns plain data out, no side effects. This is the deliberate seam for a future real AI/backend call (see Product Vision above); nothing else in the codebase should assume that swap has happened.

Feature-level polish already shipped: a cinematic full-bleed intro reusing the homepage's own hero photo (`/public/hero.jpg`) and gradient language (Sprint 6); a staggered results reveal, readiness meter, ranked/badged city-match cards, a scannable 30/60/90 roadmap, and a personalized final CTA (Sprint 7); focus-visible rings in the site's gold accent, `aria-live` on the loading sequence, and focus management on the results reveal (Sprint 5A).

**Rest of the site (pre-dates the Blueprint, still true):**

- Routing is one flat `<Routes>` list in `src/App.js` — no nested layouts, no route config file.
- Two generations of design components coexist: legacy inline-style pages (`HomePage.js`, `GuidesPage.js`, etc., which hand-roll their own nav/hero/footer) vs. newer shared components (`src/components/Button.js`, `PageHero.js`, `ServiceCard.js`, `GuideCard.js`, `CTASection.js`) that aren't adopted by any page yet.
- Guide article pages use `ArticleLayout.js` + `ArticleSection.js`. ⚠️ **Known unfixed bug:** `ArticleSection.js`'s default export doesn't render its `children` prop, so every guide page's body paragraphs are silently dropped from render output. `SectionHeader.js` is empty.
- `HomePage.js`'s hero (`<section id="home">`) is a cinematic redesign: merged eyebrow line, independently-tuned mobile/desktop spacing, staggered on-load reveal, scroll-aware nav (transparent over the hero, solid once scrolled), full-screen numbered serif mobile menu.
- `scripts/add_article.py` scaffolds new guides but its `GuidesPage.js`-patching step is stale and silently no-ops — verify manually.
- `GuidesPage.js` has its own local EN/ES toggle; no shared i18n library exists.
- Forms use `@formspree/react` directly against hardcoded form IDs.
- `src/App.backup-before-guides.js`, `src/App.broken-backup.js`, `src/pages/GuidesPage.broken-backup.js` are dead, unimported files.
- `public/phoenix-wave-bot/` is gitignored — an unrelated project that briefly lived there.

**Design tokens actually in use** — reuse these, don't invent new ones: cream `#f6f1e8` (light sections), near-black `#0b0b0a`/`zinc-950` (dark sections), gold `#d8a15f` (hover state on primary CTAs *only* — not a general accent), `zinc-600`/`zinc-500` (body text), `zinc-300`/`zinc-200` (borders). Headings render in Cormorant Garamond automatically via global CSS; body text is Inter. The site's "eyebrow" label treatment is `text-xs uppercase tracking-[0.2em]`–`tracking-[0.4em]`, used everywhere.

## UX Principles

Every screen — existing site and Blueprint alike — should feel:

- **Premium** — restraint over decoration; large confident typography; generous spacing.
- **Cinematic** — photography and motion used deliberately, not as gimmicks.
- **Calm** — no clutter, no urgency-manufacturing, no neon AI tropes.
- **Emotionally intelligent** — copy that meets the visitor where they are (see the Blueprint's readiness labels for the pattern: validate first, then bridge toward the next step).
- **Conversion-focused** — every screen should have a clear, un-competing next action. Not zero CTAs, not five equally-weighted ones.
- **Not generic SaaS** — no default quiz-app or dashboard aesthetics. If it could be any company's product with the logo swapped, it's wrong.

## QA Expectations

- **Build must pass.** `npm run build` clean, every time, before anything is reported as done.
- **Desktop and mobile must both be tested** — 1440×900 and 390×844, minimum. Not one and an assumption about the other.
- **Screenshots accompany any visual change.** Not optional, not "available on request."
- **Every report includes:** files changed, build status, test status (what was actually driven and confirmed, not just "it builds"), and any remaining or visual concerns — stated plainly, including when something is uncertain or only partially verified.
