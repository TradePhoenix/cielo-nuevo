# Client Portal Login — Approved Design Reference

**Status: APPROVED DESIGN — NOT PRODUCTION AUTHENTICATION**

Approved 2026‑08‑20. This folder preserves the visually approved sign‑in
experience for the PTM Client Portal so it can be implemented later without
re‑deriving it. Nothing here is wired into the application: there is no
client login route, no client authentication, and no password reset in the
product today (`/dashboard` is an unauthenticated, localStorage‑backed
preview). Implementation is gated on the architecture decisions in §9–§11.

| File | Purpose |
|---|---|
| `mockup.html` | Static, interactive mockup (idle / loading / error / show‑hide states simulated). Open from the repo; assets resolve to `../../../public/`. |
| `approved-desktop.png` | 1440×900 render of the approved state. |
| `approved-mobile.png` | 390×844 full‑page render of the approved state. |

Original review artifact: Claude Code artifact "Path To Mexico Client Portal" (v1, 2026‑08‑20).

---

## 1. Visual tokens (all existing PTM tokens — no new palette)

| Role | Token | Value |
|---|---|---|
| Page / panel ground | `--ptm-limestone` | `#f3eee4` |
| Field background | `--ptm-white` | `#fffdf8` |
| Field border | stone | `#cfc5b2` (hover `#cfc5b2`, focus = ink) |
| Hairlines | — | `rgba(20,33,28,.14)` |
| Ink / primary button | `--ptm-ink` | `#14211c` |
| Secondary ink | — | `#2a3631` |
| Muted text | — | `#6b6f66` / `#8d9089` |
| Restrained metallic (Client Portal tag rule) | brass | `#b08a4f` |
| CTA hover + focus halo | site gold | `#d8a15f` (hover bg; focus `rgba(216,161,95,.28)` 3px halo) |
| Error | — | `#a5482f` on `rgba(165,72,47,.06)` with `.35` border |
| Brand story ground | ink + photo | `public/hero.jpg`, `saturate(.55)`, veil `rgba(20,33,28)` .62 → .38 → .84 |
| Rhythm bars | existing `.ptm-rhythm-line` | clay `#e36f4f` 70px · cenote `#007c83` 34px · sun `#f3be54` 52px · sage `#a8bba6` 18px |

Dark viewer theme: the mockup defines the full inverse set on `:root[data-theme="dark"]` and `prefers-color-scheme: dark` (ground `#1a2420`, field `#202b26`, ink `#f3eee4`). The production app is light‑only today; treat dark as optional.

**Type** — existing brand faces, self‑hosted in `public/brand/fonts`:
- Manrope 400/500/600/700 for UI. Eyebrows: 11px, 600, `letter-spacing: .32em`, uppercase. Field labels: 12px, 600, `.14em`, uppercase. Button: 12.5px, 700, `.24em`, uppercase.
- Newsreader Italic 300 for the brand thesis only: `clamp(34px, 3.5vw, 50px)`, line‑height 1.08, `letter-spacing: -.012em`, `max-width: 17ch` (container 44ch), `text-wrap: balance`.
- "Welcome back": Manrope 400, `clamp(32px, 3vw, 40px)`, `letter-spacing: -.03em`.

## 2. Layout

**Desktop (≥ 901px)** — `grid-template-columns: 11fr 9fr`, `min-height: 100vh`.
- *Left — brand story* (ink ground + veiled hero photo): header (wordmark "PTM Path *to* Mexico" + "CLIENT PORTAL" eyebrow with a 28px brass rule), centered thesis block ("Your move, plans, documents, and next steps — all in one private place." / "A calmer way to organize your move to Mexico." / rhythm bars), bottom three assurances above a 1px `rgba(243,238,228,.18)` rule: **Private by design · Always current · A real person behind it**.
- *Right — sign‑in*: limestone panel, content column `max-width: 400px`, vertically centered. Order: eyebrow "PATH TO MEXICO" → "Welcome back" → "Sign in to continue to your Mexico plan." → form → hairline → "New to Path To Mexico? Get started with your Blueprint" → footer links (Privacy Policy · Terms of Service · © year).

**Mobile (≤ 900px)** — single column. Brand band on top (padding 22/24/30, assurances hidden to avoid a tall blank area), then the sign‑in panel (padding 40/24/56) at full width. No horizontal scroll. Inputs 56px, button 56px full width.

## 3. Form & inputs

- `<label for>` on every field; `Email` (`type=email`, `inputmode=email`, `autocomplete="username"`, `autocapitalize=none`, `spellcheck=false`) and `Password` (`autocomplete="current-password"`).
- Fields 56px tall, 16px type (prevents iOS zoom), 1px stone border, 2px radius. Hover: border `#cfc5b2`. Focus: border ink + 3px gold halo. Invalid: border error + `aria-invalid="true"`.
- "Forgot password?" sits on the password label row, right‑aligned, muted with a hairline underline.
- Primary button: ink ground, limestone text, 58px (56 mobile), full width. Hover: gold ground, ink text, `translateY(-1px)`. Active: no lift. Disabled: `opacity .88`, `cursor: progress`.

## 4. Show / hide password

A text button inside the field ("SHOW" ⇄ "HIDE", 11px/600/`.14em`), 44×44 minimum target, `aria-controls="password"`, `aria-pressed`, `aria-label` "Show password"/"Hide password". Toggling flips `type` between `password` and `text` and returns focus to the field. Password input uses `letter-spacing: .12em` for masked dots only.

## 5. Loading state

On submit: button `disabled` + `aria-busy="true"`, label "SIGNING IN…", a 6px pulsing dot (animation disabled under `prefers-reduced-motion`). Duplicate submissions are blocked while disabled. Fields stay enabled and filled.

## 6. Error state

Inline alert above the button: `role="alert"`, `aria-live="assertive"`, icon + text, error palette (§1). Copy:
- Wrong credentials → **"Incorrect email or password."**
- Any other failure (network, rate limit, provider error) → **"We couldn't sign you in. Please try again."**
Never surface raw Supabase / backend messages; log the real error server‑side.

## 7. Ask Path placement

Retained, de‑emphasized. Desktop: the existing launcher pill, bottom‑left, ivory with hairline border (no competing color). Mobile: the floating pill is hidden and replaced by an inline link under the alternate actions — "Need help signing in? **Ask Path**" — so it can never cover the Sign In button.

## 8. Accessibility

Logical tab order (email → forgot → password → show/hide → sign in → links); visible `:focus-visible` ring (2px gold, 3px offset) on every interactive element; ≥ 4.5:1 text contrast on both grounds; reduced‑motion safe (rhythm bars, button lift, loading pulse); live region for errors; `<html lang>` must follow the page language (EN/ES parity required in implementation — mockup is EN only).

## 9. Supabase Auth dependency

Client sign‑in requires **Supabase Auth (email + password) for clients**, which the project does not use today. Server‑side only, following the existing admin pattern (`api/_lib/auth/*`, `api/admin/auth.js`): the browser posts to a PTM API route; the service‑role key never reaches the client; the session is an httpOnly, signed cookie. Required before build:
- Client user model (a client row / profile linked to `auth.users`; how a client is provisioned — invite vs. self‑signup, see §10).
- Email delivery for reset/invite (Supabase SMTP or project provider).
- Rate limiting on login and reset (reuse `api/_lib/windowRateLimiter.js`).

## 10. Required password‑reset flow

"Forgot password?" must not ship without it. Minimum: request form (email only, always returns the same neutral success message), Supabase `resetPasswordForEmail` from the server route, reset page that accepts the recovery token and sets a new password, then returns to `/client/login`. Copy tone as §6.

## 11. `/client/login` and protected `/dashboard` architecture

Proposed (decision pending — product/CTO call):
- Route `/client/login` (this design). Authenticated visitors are redirected to `/dashboard`.
- `/dashboard` and `/dashboard/documents` become protected: a `ClientSessionGate` (mirror of `AdminSessionGate` from PR #17) asks `GET /api/client/auth`; unauthenticated → `/client/login?next=…`.
- Dashboard data moves from localStorage to per‑user rows (schema migration, scoped RLS or service‑role access via API) — the largest piece of work and the reason this is not a UI‑only change.
- Keep `/partner-network/admin` auth entirely separate (different allowlist, different cookie name).
- `noindex` on `/client/login` and all client routes; add them to the internal‑route guards in `prerenderMeta.test.js`.

## 12. What this is not

No secrets, credentials, or personal data. No change to application files. No deployment. Do not link this mockup from the site.
