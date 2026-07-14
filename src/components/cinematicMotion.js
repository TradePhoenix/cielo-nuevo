// Path Cinematic Motion System (CX-001) — the shared vocabulary every
// future "living" section of the site should draw from, rather than each
// section inventing its own timing, easing, or ambient-motion rules.
//
// ============================================================================
// 1. MOTION PRINCIPLES
// ============================================================================
// - Apple-like restraint: motion clarifies hierarchy and state, never
//   decorates for its own sake. If removing an animation loses nothing,
//   remove it.
// - A24-like atmosphere: mood over spectacle. Slow, held moments read as
//   more premium than fast, busy ones.
// - National Geographic sense of place: the subject (Mexico, the life
//   being considered) stays the star. Motion should make a photo feel like
//   a window, not a widget.
// - Airbnb warmth: motion should feel human and inviting, never clinical
//   or corporate.
// - Path To Mexico authenticity: nothing invented. Motion never implies a
//   live camera, real-time weather, or generated content that isn't real.
// - Every motion decision answers one question: does this increase wonder,
//   clarity, or emotional connection? If not, it doesn't ship.
//
// ============================================================================
// 2. SHARED TIMING & EASING TOKENS
// ============================================================================
// One small, closed set, reused everywhere — a page with five different
// easing curves reads as noisy even if no single animation is "too much."
//
//   DURATION.instant  120ms  — focus rings, color/opacity micro-feedback
//   DURATION.quick     300ms  — hover lifts, button states
//   DURATION.entry      800ms  — on-load / on-scroll reveals (matches the
//                                 site's existing whileInView convention —
//                                 see ArticleSection.js / HomePage.js's
//                                 local SectionHeader, both already 0.8s)
//   DURATION.ambient  10000ms — one full breath of ambient/idle motion
//                                 (see HEARTBEAT below)
//
//   EASE.standard  cubic-bezier(0.22, 1, 0.36, 1) — confident deceleration,
//                  already the hero's own entry curve (heroFadeUp in
//                  HomePage.js); adopted here as the system default so new
//                  cinematic work matches the one curve visitors already
//                  experience on first paint.
//   EASE.ambient   "easeInOut" — for slow, breathing, reversible motion;
//                  a decelerating curve looks wrong on something that's
//                  meant to loop forever.
//
// ============================================================================
// 3. THE HEARTBEAT
// ============================================================================
// One coordinated ambient rhythm, not N independent animations. Every
// living-environment effect (image drift, light movement, atmospheric
// overlays) shares HEARTBEAT.duration and HEARTBEAT.ease. Individual
// elements offset by a small stagger (HEARTBEAT.stagger × index) so a row
// of cards breathes like a group of related things, not a synchronized
// loop that reads as mechanical. The stagger is deliberately not a clean
// fraction of the duration (2.4s against a 10s cycle) so it never
// re-synchronizes into visible unison.
//
// ============================================================================
// 4. ENTRY / HOVER / SCROLL / PAGE-TRANSITION BEHAVIOR
// ============================================================================
// - Entry: opacity 0->1 + y 24->0, DURATION.entry, EASE.standard,
//   triggered once via whileInView (viewport: { once: true }) — identical
//   contract to the site's existing reveal pattern, so new cinematic
//   sections don't introduce a second "reveal language."
// - Hover: DURATION.quick, transform-only (translate/scale), never
//   triggers layout. Disabled outright on touch (no hover event to fire).
// - Focus: instant, WCAG-conscious — the site's existing gold
//   focus-visible ring, never replaced or weakened by cinematic styling.
// - Scroll: whileInView only; no scroll-linked/scrubbed animation in
//   CX-001 (scroll-linked motion is a heavier technique with real jank
//   risk — deliberately deferred, see roadmap).
// - Page transition: out of scope for CX-001 (RouteLoadingFallback.js
//   already covers the loading gap; a true route-to-route transition is a
//   CX-002+ decision, not a motion-token concern).
//
// ============================================================================
// 5. LIVING-ENVIRONMENT EFFECTS (this ticket's prototype surface)
// ============================================================================
// - Image drift: a near-imperceptible continuous scale (1.0 -> ~1.035),
//   HEARTBEAT duration, mirror repeat. Never pans/crops in a way that
//   could read as a live camera.
// - Light movement: a soft, low-opacity radial gradient overlay drifting
//   position slowly — reads as ambient light shifting, not weather.
// - Depth: a restrained hover-only translate + scale (no permanent tilt,
//   no cursor-tracking parallax in CX-001 — flagged for CX-002).
// - Atmospheric overlay: a static-opacity color wash that only shifts
//   subtly on hover, keeping text/contrast stable at all times.
// - Environmental detail: deliberately not used in CX-001 (no birds,
//   particles, weather — see constraints).
//
// ============================================================================
// 6. REDUCED-MOTION BEHAVIOR
// ============================================================================
// useCinematicMotion() below wraps framer-motion's own useReducedMotion().
// When true: every looping/ambient effect (drift, light movement) is
// disabled outright — not slowed, removed. Entry reveals degrade to a
// simple opacity fade with no y-offset. Hover/focus feedback is preserved
// (state changes are informative, not decorative) but loses easing/
// duration — it's instant. This is the first real prefers-reduced-motion
// implementation in this codebase; see audit findings for what currently
// has zero reduced-motion handling.
//
// ============================================================================
// 7. MOBILE DEGRADATION STRATEGY
// ============================================================================
// Continuous ambient motion (drift, light movement) is desktop/tablet only
// (Tailwind `md:` and up). Touch devices have no hover to reveal depth
// effects anyway, and a phone has no benefit from an infinite background
// animation running while held — only battery cost. Mobile keeps: entry
// fade, tap/focus feedback, static (non-animated) imagery. This is a CSS
// media-query decision, not a JS viewport check, so there's no layout
// thrash or hydration mismatch risk.
//
// ============================================================================
// 8. PERFORMANCE BUDGET
// ============================================================================
// - Animate only `transform` and `opacity` — never `width`/`height`/`top`/
//   `left`/`box-shadow` (layout or paint cost, not compositor-only).
// - No more than one continuous/looping animation family active per
//   viewport section at a time (a row of cards shares one drift + one
//   light-movement definition, not N independent ones).
// - No animation should force a re-render of React state on every frame —
//   CSS/Framer's own transform animations run off the main thread;
//   nothing here uses setInterval/rAF-driven state.
// - Images stay at their existing, already-optimized sizes (190-420KB);
//   CX-001 introduces zero new image assets.
//
// ============================================================================
// 9. WHEN MOTION MUST NOT BE USED
// ============================================================================
// - Never on body copy that's still being read (no drift/motion behind
//   paragraph text).
// - Never on form inputs, error/validation states, or anything where
//   stillness communicates trust.
// - Never in print (`print:` variants already zero out motion sitewide).
// - Never as the only signal of a state change (motion supplements, never
//   replaces, a text/color/icon change).
// - Never if it could be mistaken for live data — no real-time weather,
//   no "current conditions," nothing suggesting a live feed.
//
// ============================================================================
// 10. REUSABLE ARCHITECTURE
// ============================================================================
// Every future cinematic section should import from this one file rather
// than redefining durations/easings locally. `useCinematicMotion()` is the
// single entry point a component needs: it returns whether reduced motion
// should be honored, plus the token set to use accordingly.

export const DURATION = {
  instant: 0.12,
  quick: 0.3,
  entry: 0.8,
  ambient: 10,
};

export const EASE = {
  standard: [0.22, 1, 0.36, 1],
  ambient: "easeInOut",
};

export const HEARTBEAT = {
  duration: DURATION.ambient,
  ease: EASE.ambient,
  stagger: 2.4,
};

// Framer Motion variants for the standard whileInView entry reveal — the
// one entrance language every cinematic section should share.
export const entryReveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.entry, ease: EASE.standard } },
};

export const entryRevealReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.instant } },
};

// A slow, mirrored scale "breath" for ambient image drift, offset per
// element by HEARTBEAT.stagger so a row of cards doesn't move in unison.
export function ambientDrift(index = 0) {
  return {
    scale: [1, 1.035, 1],
    transition: {
      duration: HEARTBEAT.duration,
      ease: HEARTBEAT.ease,
      repeat: Infinity,
      repeatType: "mirror",
      delay: index * HEARTBEAT.stagger,
    },
  };
}

// ============================================================================
// CX-002 ADDITIONS — cinematic depth & page flow
// ============================================================================
//
// Reusable section-reveal pattern: see CinematicReveal.js. It wraps
// entryReveal/entryRevealReduced (single element) or REVEAL_STAGGER
// (immediate grid of children) so no section re-derives the reduced-motion
// branch itself. Applied to the highest-value Homepage sections that
// previously had no entrance treatment at all (the Blueprint teaser, and
// the Services/Work/Testimonials card grids, whose SectionHeader already
// faded in while the cards beneath it appeared instantly — an
// inconsistency flagged in CX-001's own roadmap).
//
// REVEAL_STAGGER (0.12s) is deliberately much quicker than HEARTBEAT.stagger
// (2.4s) — entrance choreography and ambient idle rhythm are different
// concerns with different appropriate cadences. A row of cards should
// reveal itself briskly; ambient breathing should feel unhurried.
//
// Pointer depth (Homepage hero only, per this ticket's "one approved
// surface" scope): a small, transform-only translate driven by cursor
// position, applied to a dedicated wrapper layer that sits *outside* the
// CX-001 ambient-drift wrapper — never the same element, so the two
// transforms compose instead of fighting (same rule as CX-001's ambient
// vs. hover layering). Gated on `(hover: hover) and (pointer: fine)`,
// checked once on mount, not on every pointer event — this is the correct
// signal for "has a real cursor," stronger than a width breakpoint, since
// a touch-capable laptop with a mouse attached should still get it, and a
// wide-viewport tablet in landscape should not. Resets to POINTER_DEPTH.rest
// on pointer-leave via the same tween, so it can never get stuck offset.
export const POINTER_DEPTH = {
  maxOffset: 10,
  rest: { x: 0, y: 0 },
  transition: { duration: DURATION.quick, ease: EASE.standard },
};

// Route transitions: a single opacity-only fade-in, keyed on the top-level
// path segment (not the full pathname) so navigating between two pages
// that share one dynamic-segment route (e.g. /your-mexico/:cityId,
// /my-mexico-plan/:cityId) never forces those stateful feature pages to
// remount on their own internal param changes — only genuine cross-section
// navigation gets the transition. No exit animation and no AnimatePresence
// — mount-triggered initial/animate only, so a navigation is never held up
// waiting for a previous page to finish leaving. This runs *after*
// RouteLoadingFallback resolves (Suspense fully replaces its subtree while
// a lazy chunk loads), never alongside it.
export const ROUTE_TRANSITION = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export function routeTransitionDuration(prefersReducedMotion) {
  return prefersReducedMotion ? DURATION.instant : DURATION.quick;
}

// The stagger amount for CinematicReveal's `stagger` mode — see
// CinematicReveal.js.
export const REVEAL_STAGGER = 0.12;

// import { useReducedMotion } from "framer-motion" directly in components —
// this thin wrapper exists so every cinematic component asks the same
// question the same way, and so the "what do we do when true" policy (see
// section 6 above) lives in one place if it ever needs to change.
export { useReducedMotion as useCinematicMotion } from "framer-motion";
