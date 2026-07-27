// Ask Path knowledge source: destination profiles.
//
// Deliberately reads the site's own existing data (CITY_PROFILES,
// CITY_DETAILS) rather than duplicating destination facts into a second,
// hand-maintained copy — a new destination or a corrected budget figure
// added to those files is picked up here automatically, with no Ask-Path-
// specific update required. This is the "easy to update" requirement from
// the knowledge-system spec.
//
// Two schema generations coexist in CITY_DETAILS (see that file): the
// original 11 destinations store fields flatly (English only, `tagline`
// bilingual); the 14 DEST-003 destinations nest the same fields under
// `content.en` / `content.es`, fully bilingual. This mapper normalizes both
// into one record shape rather than picking one and silently ignoring the
// other.

import { CITY_PROFILES } from "../../../src/decisionEngine/data/cityProfiles.js";
import { CITY_DETAILS } from "../../../src/features/yourMexico/data/cityDetails.js";

function englishBody(detail) {
  if (!detail) return null;
  return detail.content?.en || detail;
}

function spanishBody(detail) {
  if (!detail) return null;
  return detail.content?.es || null; // no bilingual fallback for the flat/legacy schema — see header comment
}

function summarize(body) {
  if (!body) return null;
  const parts = [];
  if (body.whyThisFeelsLikeYou?.intro) parts.push(body.whyThisFeelsLikeYou.intro);
  if (body.lifestyleSnapshot) {
    const s = body.lifestyleSnapshot;
    const bits = [s.pace?.value, s.internet?.value, s.healthcare?.value, s.climate?.value, s.airportAccess?.value]
      .filter(Boolean)
      .join("; ");
    if (bits) parts.push(`Lifestyle snapshot: ${bits}.`);
  }
  if (body.monthlyBudget?.estimatedTotal) {
    parts.push(
      `Estimated monthly budget: ${body.monthlyBudget.estimatedTotal}` +
        (body.monthlyBudget.note ? ` (${body.monthlyBudget.note})` : "") +
        "."
    );
  }
  if (body.honestTruth?.points?.length) {
    parts.push(`Honest trade-offs: ${body.honestTruth.points.join(" ")}`);
  }
  if (body.pros?.length) parts.push(`Strengths: ${body.pros.join("; ")}.`);
  if (body.tradeoffs?.length) parts.push(`Trade-offs: ${body.tradeoffs.join("; ")}.`);
  return parts.join(" ");
}

export function buildDestinationRecords() {
  return CITY_PROFILES.map((profile) => {
    const detail = CITY_DETAILS[profile.id];
    const en = summarize(englishBody(detail));
    const es = summarize(spanishBody(detail));

    return {
      id: `destination-${profile.id}`,
      title: { en: profile.name, es: profile.name },
      category: "destination",
      route: profile.guideLink,
      lastReviewed: "2026-07-26",
      keywords: [profile.name, ...profile.tags],
      content: {
        en: [profile.teaser, en].filter(Boolean).join(" ") || profile.teaser,
        es: detail?.tagline?.es ? [detail.tagline.es, es].filter(Boolean).join(" ") : null,
      },
    };
  });
}
