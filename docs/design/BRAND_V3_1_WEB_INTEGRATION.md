# Path to Mexico — Brand v3.1 Web Integration

This document is the implementation reference for the Path to Mexico website.
It translates the approved V3.1 identity into reusable product rules without
changing the platform's existing information architecture or feature logic.

## Core idea

- Brand idea: **Move into more.**
- Primary line: **A Different Rhythm of Life.**
- Promise: **We make the move feel possible — and the life feel yours.**
- Invitation: **Find your Mexico.**
- Voice: clear enough to trust; alive enough to want.

## Design tokens

| Role | Token | Value |
|---|---|---|
| Primary text / dark field | `--ptm-ink` | `#14211C` |
| Deep brand green | `--ptm-jungle` | `#103D33` |
| Main warm background | `--ptm-limestone` | `#F3EEE4` |
| Clean surface | `--ptm-white` | `#FFFDF8` |
| Primary action / digital accent | `--ptm-cenote` | `#007C83` |
| Human energy accent | `--ptm-clay` | `#E36F4F` |
| Optimistic highlight | `--ptm-sun` | `#F3BE54` |
| Supporting green | `--ptm-sage` | `#A8BBA6` |
| Atmospheric blue | `--ptm-sky` | `#BFDDE0` |
| Soft section field | `--ptm-mist` | `#E5EFEC` |

The website should remain limestone-led. Ink and jungle create depth; cenote
drives actions; clay and sun create pulse. Accent colours should not compete
within the same component.

## Typography

- Primary: Manrope, self-hosted from `src/assets/fonts/`
- Editorial accent: Newsreader Italic
- Use Manrope for navigation, headings, body copy, forms, product UI and data.
- Use Newsreader only for short emotional lines. Never use it for long body
  copy, navigation, buttons, labels or operational interfaces.
- Headlines should feel compact, direct and contemporary. Avoid the old
  oversized classical-serif treatment.

## Identity assets

Production logos live in `public/brand/logos/`.

- Light backgrounds: `ptm-primary-horizontal-ink.svg`
- Dark or photographic backgrounds: `ptm-primary-horizontal-reverse.svg`
- Small branded moments: `ptm-motion-mark-ink.svg`
- Favicons: `ptm-favicon.svg` and `ptm-favicon-micro.svg`

Never recreate the wordmark with live type. Never redraw, stretch, recolour or
add effects to the logo.

## Graphic pulse

The four-colour rhythm line is the signature graphic device. It can introduce a
hero, section, footer or key transition. Use it once per major visual moment,
not as decoration on every card.

## Components

- Buttons use a 4px radius, compact uppercase labels and a single clear action
  colour.
- Cards use 4–8px radii, strong spacing and restrained shadows.
- Dark sections use Ink or Jungle, not pure black.
- Light sections alternate Limestone, White and Mist.
- Headings carry the energy. Supporting layouts stay calm.
- Motion should be slow, responsive and easy to ignore. Respect
  `prefers-reduced-motion`.

## Photography

Prioritize real Mexico: architecture, streets, water, food, work, friendship,
local partners and everyday movement. Images should feel contemporary and
editorial rather than staged, touristy or overly tranquil.

AI-generated people may be used as internal art-direction references only.
They must not be presented as real clients, partners, testimonials or
documentary proof.

## Language

Any new visitor-facing copy added to a bilingual surface must ship with English
and Spanish at the same time. Existing structural translation tests must remain
green.

## Change rule

Future work applies this system. A genuine identity change should be documented
as a new version instead of being improvised inside an individual page.
