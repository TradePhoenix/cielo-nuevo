# ENG-003 Postmortem — Critical Launch Fixes

**Status:** Shipped and verified in production. Tagged `v0.1.0`.
**Commits:** `ecb187e` → `ac3658e` (4 commits, on top of `126a52f`).

---

## Objectives

Fix the three critical functional failures identified in the ENG-002 Flagship Experience Audit:

1. Guide article body content was invisible on all guide pages.
2. Mobile navigation did not reliably expose the site's primary routes.
3. Every route shared one static page title/description/canonical — no per-route SEO metadata existed.

Scope was explicitly limited to these three areas: no redesign, no new features, no unrelated refactors.

---

## Root Causes Discovered

### 1. Guide article rendering
`src/components/ArticleSection.js` accepted a `children` prop but never rendered it. All 20 affected guide pages pass real body content as JSX children between `<ArticleSection title="...">` tags — every paragraph was silently dropped from output, leaving guides as a bare list of section headings with no body text.

### 2. Mobile navigation
The original ENG-002 finding — "no mobile navigation exists at all" — was **incomplete and overstated**. A full mobile menu (toggle trigger, full-screen numbered-index overlay, scroll lock, all 8 links) already existed and was committed; the ENG-002 audit script only checked links inside the `<nav>` element and missed the working overlay rendered as a sibling outside it.

The real, narrower bugs, found via live interaction testing:
- No `Escape`-to-close handler, no dialog semantics (`role`, `aria-modal`, accessible label).
- No focus management on open/close.
- A deeper root cause behind the focus bug: the overlay's closed state used Tailwind's `invisible` class (`visibility: hidden`), which makes an element permanently unfocusable via `.focus()` until the CSS transition finishes applying `visible`. This intermittently broke focus-on-first-open and **consistently** broke it on every second-or-later open — a real, reproducible defect, not a timing coincidence.
- Native browser click-to-focus on the trigger/close buttons was also fighting the programmatic focus move immediately after.

**Correction also discovered mid-ticket:** the other two items from the pre-existing (unexecuted, per ENG-002) Sprint 1A mobile plan — the WhatsApp button fading near the contact form, and the nav adapting from transparent-dark to solid-light on scroll — turned out to **already be fully implemented** in `HomePage.js` (`nearContact` and `scrolled` state, each with their own `IntersectionObserver`, including the WhatsApp button correctly suppressing itself while the mobile menu is open). ENG-002's characterization of the whole Sprint 1A plan as "unexecuted" was wrong for 2 of its 3 items.

### 3. Per-route SEO metadata
No per-route metadata existed anywhere; every route inherited `public/index.html`'s static tags. Fixing this surfaced two further defects not part of the original diagnosis:
- `public/index.html`'s static `<meta name="description">` and `<link rel="canonical">` were never removed after adding the new per-route `SEO` component, so the new component's values were being added *alongside* the static ones rather than replacing them. Duplicate `<meta>`/`<link>` tags don't dedupe the way `<title>` does, so the stale static tag silently won for anything reading DOM order — description and canonical were effectively still broken until this was caught in QA.
- 17 guide pages passed a prop called `subtitle` to `<ArticleLayout>`, which only accepts `{ category, title, description, children }`. This silently dropped both their hero intro paragraph (a pre-existing, unrelated visual bug, live all along) and, once `SEO.js` existed, their meta description.

---

## Fixes Implemented

1. **`ArticleSection.js`** — added `children` to the destructured props and rendered it in a wrapper styled to match the page's existing typographic convention (no new visual language invented).
2. **`HomePage.js`** — added `Escape`-to-close, focus-into-panel-on-open/focus-to-trigger-on-close (via `requestAnimationFrame`), `role="dialog"`/`aria-modal`/`aria-label` on the overlay, `onMouseDown={preventDefault}` on the Open/Close buttons, and removed the `invisible`/`visible` CSS toggle in favor of opacity + `pointer-events-none` + `aria-hidden` + the already-existing `tabIndex` toggling.
3. **`src/components/SEO.js`** (new) — a small component rendering `<title>`/`<meta>`/`<link>` directly as JSX, relying on React 19's native hoisting into `<head>` (confirmed working cleanly against this CRA/`react-scripts 5` build — no `react-helmet` dependency added).
4. **`ArticleLayout.js`** — wired `SEO` centrally using each guide's existing `title`/`description` props and `useLocation()` for the canonical path, covering all `ArticleLayout`-based guides with zero per-page edits.
5. **19 other page files** — direct `<SEO>` wiring for every other real route (home, guides index, Your Mexico + city detail pages with per-city dynamic metadata, compare, Blueprint, Dashboard, Document Vault, My Mexico Plan, Mexico Fit Call, Work With Path To Mexico, Free Guide, Privacy Policy, Terms of Service, Developer Dashboard, and the 2 guide pages that bypass `ArticleLayout`).
6. **`public/index.html`** — removed the static `<meta name="description">` and `<link rel="canonical">` that were silently blocking the per-route values; kept a static fallback `<title>` and the route-invariant OG/Twitter image tags (useful for non-JS-executing social-preview crawlers).
7. **17 guide pages** — renamed `subtitle=` → `description=` on their `<ArticleLayout>` call (mechanical, uniform, verified-safe).

---

## QA Performed

- `npm run build` — clean at every stage (~6 times across the fix/re-test cycle as bugs were found and corrected).
- Guide regression across all 21 real guide routes (20 originally scoped + the 2 that bypass `ArticleLayout`): substantial, correct rendered body content confirmed for every one; zero console errors, zero failed requests.
- Metadata verification across 38 real routes: 38/38 unique titles, 37/38 unique correct descriptions/canonicals (`/developer-dashboard` intentionally undescribed — internal tool, out of scope).
- Mobile nav interaction testing at exactly 320px, 390px, and 430px: trigger visibility, dialog open/close via `aria-hidden`, all 8 links present, focus management on **both** first-open and reopen (the scenario that was actually broken), tab order, `Escape` behavior and focus return, Close-button behavior, no horizontal overflow, no off-screen link clipping.
- A QA methodology correction worth recording: an initial full-page Playwright screenshot of a fixed guide article looked identical to the original bug (a large blank gap). This was a **screenshot-capture artifact**, not a regression — `ArticleSection` uses framer-motion's `whileInView` (pre-existing, unrelated to this fix), and a stitched full-page capture doesn't reliably trigger `IntersectionObserver`-based fade-ins the way real incremental scrolling does. Confirmed via a real-scroll simulation that all content renders correctly for actual users.
- **Production verification**, post-deploy: confirmed the git push triggered an automatic Vercel deployment (build log confirmed cloning the exact pushed commit), confirmed `pathtomexico.com` returns HTTP 200, re-ran the guide-content check, mobile-menu check (including the reopen scenario), and metadata check directly against production — all clean, zero console errors, zero failed requests.

---

## Lessons Learned

1. **A live interaction test beats a DOM-structure assumption.** The original ENG-002 mobile-nav finding was wrong not because the auditor didn't check, but because it checked the wrong scope (`<nav>` only, missing a sibling overlay). The fix: when a "critical" finding drives a ticket, re-verify live before treating the original diagnosis as ground truth for scoping — which is exactly what happened here, and it changed Task 2 from "build a mobile menu" to "harden an existing one," a much smaller and more accurate scope.
2. **CSS `visibility` is a real accessibility trap, not just a styling detail.** Gating an element's focusability behind a `visibility: hidden` → `visible` CSS transition creates a race that can pass ad hoc manual testing (a human clicking slowly) while failing rapid/programmatic interaction and intermittently failing real users too. Prefer opacity + `pointer-events` + `aria-hidden` + `tabIndex` for interactive overlays; don't rely on `visibility` for anything that needs to become focusable.
3. **Fixing one thing can silently depend on removing another.** The SEO component was correctly built and correctly wired, but did nothing for `description`/`canonical` until the stale static tags in `index.html` were removed — duplicate DOM elements don't resolve the way a duplicate `<title>` does. Any future work touching document metadata should check for existing static tags first, not just add new dynamic ones alongside them.
4. **A "typo" prop name (`subtitle` vs `description`) can hide for a long time when the failure mode is silent.** React doesn't warn about extra unrecognized props passed to a component; a silently-dropped prop produces a blank paragraph, not an error. This bug had apparently been live since before this engagement started, affecting 17 pages' hero copy, and was only surfaced because this ticket's QA specifically checked whether `description` was populated for the *unrelated* reason of verifying meta tags. Worth a broader one-time audit for other silently-dropped props elsewhere in the codebase (not undertaken here — out of scope for ENG-003).
5. **Re-verify old audit findings before building against them.** Two of the three Sprint 1A mobile-polish items assumed "unexecuted" in ENG-002 were in fact already fully built. Treat any inherited backlog item as a hypothesis to confirm, not a fact to build from, especially across sessions/audits separated in time.

---

## Files Changed (39 total across 4 commits)

- `src/components/ArticleSection.js`
- `src/pages/HomePage.js`
- `src/components/SEO.js` (new)
- `src/components/ArticleLayout.js`
- `public/index.html`
- `src/pages/GuidesPage.js`, `MexicoFitCallPage.js`, `WorkWithPathToMexicoPage.js`, `FreeGuidePage.js`, `PrivacyPolicyPage.js`, `TermsOfServicePage.js`, `DeveloperDashboardPage.js`, `MyMexicoBlueprintPage.js`, `TemporaryResidencyPage.js`, `HealthcareInMexicoForCanadiansPage.js`
- `src/features/yourMexico/pages/YourMexicoPage.js`, `CityDetailPage.js`, `ComparePage.js`
- `src/features/dashboard/pages/DashboardPage.js`
- `src/features/documentVault/pages/DocumentVaultPage.js`
- `src/features/myMexicoPlan/pages/MyMexicoPlanSetupPage.js`, `MyMexicoPlanPage.js`
- 17 guide pages (`subtitle`→`description` fix): `BankingInMexicoAsAForeignerPage.js`, `BringingPetsToMexicoPage.js`, `CanadaToMexicoRelocationPage.js`, `GroceryCostsInMexicoPage.js`, `HowMuchMoneyDoYouNeedToMoveToMexicoPage.js`, `InternetAndRemoteWorkInMexicoPage.js`, `MexicoRelocationChecklistPage.js`, `MexicoResidencySupportPage.js`, `MovingToPlayaDelCarmenPage.js`, `MovingToRivieraMayaPage.js`, `MovingToTulumPage.js`, `RemoteWorkersMovingToMexicoPage.js`, `RentingVsBuyingInMexicoPage.js`, `RetiringInMexicoPage.js`, `SafetyInMexicoPage.js`, `TulumVsPlayaDelCarmenPage.js`, `UsToMexicoRelocationPage.js`

Total diff: 39 files changed, 243 insertions(+), 38 deletions(-).

---

## Commit Hashes

| Hash | Message |
|---|---|
| `ecb187ec8054fe47929963890fdc5c112addac1d` | fix: render guide article body content |
| `35c2ead2e40f190cfa0eaa0e8a5ffe606ed2235d` | fix: harden mobile navigation accessibility |
| `10fa12ba93baf0f8c2f65b4e8e0333667a1fea6f` | feat: add per-route SEO metadata |
| `ac3658e1643f8c8b537cef142a6b4e665c23334c` | fix: correct description prop typo across guide pages |

Tagged `v0.1.0` at `ac3658e`, pushed to `origin`.

---

## Remaining Known Issues

- None from ENG-003's own scope — all three tasks verified working in production.
- Pre-existing, out of scope for this ticket, still open: `ArticleSection.js`'s internal function is still named `SectionHeader` (a leftover naming collision with the unused, empty `SectionHeader.js`) — cosmetic, zero behavioral impact, explicitly declined as out of scope per your decision.
- Pre-existing, out of scope: two stale duplicate Vercel projects (`cielo-nuevo` and `cielo-nuevo-react`) still both exist at the dashboard level; only the local `.vercel/project.json` link was corrected, not the dashboard itself.
- Everything else from the ENG-002 audit not covered by ENG-003's three-task scope remains open (see Recommendations below).

---

## Recommendations for Future Engineering Work

1. Delete or archive the stale `cielo-nuevo-react` Vercel project at the dashboard level (not scriptable via this session's CLI access) to remove the recurring mislink risk on fresh clones.
2. Do a one-time repo-wide sweep for other silently-dropped/misnamed props (the `subtitle`/`description` class of bug) — React's lack of a runtime warning for unrecognized props means these can hide indefinitely.
3. Consider adding a lightweight PropTypes or TypeScript migration path for shared components (`ArticleLayout`, `SEO`, `ArticleSection`) specifically to catch this class of bug going forward, without taking on a full TypeScript migration as a precondition.
4. Get Lighthouse actually runnable in this environment (currently blocked by an unrelated local npm cache corruption) so future tickets can cite real performance/accessibility scores instead of manual spot checks.
5. See the ENG-004 candidate list below for the next concrete, scoped pieces of work.
