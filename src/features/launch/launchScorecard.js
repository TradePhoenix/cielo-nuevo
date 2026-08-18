// October 1, 2026 launch scorecard — data for the internal Launch Command
// Center on /developer-dashboard.
//
// Scores are EVIDENCE-BASED, set by the 2026-08-16 launch-readiness audit
// (ticket: october-launch-command-center). They are a manual snapshot, not a
// computed metric — update them only when a finding is actually closed or a
// new audit runs. Do not inflate.
//
// Status meaning:
//   BLOCKED  — has at least one open P0 (launch-blocking) finding
//   AT RISK  — no P0, but open P1s / score well below its October 1 threshold
//   ON TRACK — trending to threshold with known, scheduled work
//   READY    — at or above its October 1 threshold with no open P0/P1

export const AUDIT_DATE = "August 16, 2026";

// Updated as launch fixes ship: #1 lead-capture hardening closed 4 P1s,
// #2 booking verification closed 1 P1 and shrank the booking P0 to one
// account-side task, #3 minimal CRM closed the CRM P0, #4 revenue-funnel
// activation closed the unsellable-tiers P0 (payment proof still open).
export const FINDING_COUNTS = { p0: 3, p1: 9, p2: 11, p3: 8 };

// weight: contribution to overall readiness (sums to 100).
// score: current 0–100. required: October 1 threshold.
// blockers: open P0 findings attributed to this gate.
export const GATES = [
  {
    id: "lead-capture",
    name: "Lead Capture",
    weight: 15,
    // Fix #1 shipped: failure UI, metadata, honeypots, Blueprint gate
    // softened — delivery to Kalen's inbox is the remaining unknown.
    score: 75,
    required: 90,
    status: "BLOCKED",
    blockers: 1,
    nextAction:
      "Prove delivery: verify Formspree form xdabqdyq reaches Kalen's inbox and review submission history for missed leads.",
  },
  {
    id: "booking-calendar",
    name: "Booking & Calendar",
    weight: 12,
    // Fix #2 shipped: both events verified live with $99 shown, copy
    // contradiction removed, URLs pinned by tests. Payment capture and
    // calendar/reminder settings remain account-side.
    score: 85,
    required: 90,
    status: "BLOCKED",
    blockers: 1,
    nextAction:
      "Complete one real test checkout per language in Calendly (then refund) and run the Google Calendar / reminder verification checklist.",
  },
  {
    id: "revenue-funnel",
    name: "Revenue Funnel",
    weight: 15,
    // Fix #4 shipped: dedicated /relocation-roadmap ($499 visible) and
    // /guided-landing (custom quote) pages, ladder aligned site-wide,
    // qualification-first CTAs. Remaining P0 is account-side payment
    // proof; Roadmap direct purchase awaits a provider decision.
    score: 60,
    required: 85,
    status: "BLOCKED",
    blockers: 1,
    nextAction:
      "Prove the $99 Fit Call checkout end-to-end in Calendly, then decide the $499 Roadmap payment mechanism (Calendly event vs. provider).",
  },
  {
    id: "crm",
    name: "CRM / Lead Management",
    weight: 10,
    // Fix #3 shipped: 9-stage pipeline, full lead model, needs-attention
    // view, metrics, manual entry, JSON backup — but records persist only
    // in this browser and website leads still enter manually.
    score: 55,
    required: 80,
    status: "AT RISK",
    blockers: 0,
    nextAction:
      "Move CRM storage server-side behind auth and wire automatic Formspree/Blueprint lead intake — today the pipeline lives in one browser with manual entry plus JSON backups.",
  },
  {
    id: "website-qa",
    name: "Website / Product QA",
    weight: 10,
    score: 75,
    required: 90,
    status: "ON TRACK",
    blockers: 0,
    nextAction:
      "Full EN/ES desktop + mobile QA pass over the live production site; fix soft-404 status and sitemap gaps.",
  },
  {
    id: "trust-conversion",
    name: "Trust & Conversion",
    weight: 8,
    score: 55,
    required: 85,
    status: "AT RISK",
    blockers: 0,
    nextAction:
      "Fix the Blueprint 'vetted professionals' claim and add footer Privacy/Terms links (the Fit Call booking copy is fixed).",
  },
  {
    id: "client-delivery",
    name: "Client Delivery",
    weight: 12,
    score: 15,
    required: 80,
    status: "BLOCKED",
    blockers: 1,
    nextAction:
      "Write the Fit Call script + follow-up template and define the $499 Roadmap deliverable — no delivery SOPs exist today.",
  },
  {
    id: "partner-readiness",
    name: "Partner Readiness",
    weight: 5,
    score: 25,
    required: 60,
    status: "AT RISK",
    blockers: 0,
    nextAction:
      "Record the real working contacts (healthcare, real estate, property mgmt, vehicle) behind Roni's testimonial as the first partner roster.",
  },
  {
    id: "client-acquisition",
    name: "Client Acquisition",
    weight: 8,
    score: 20,
    required: 70,
    status: "AT RISK",
    blockers: 0,
    nextAction:
      "Choose an analytics provider (trackEvent is a production no-op) and add UTM/lead-source capture to all four forms.",
  },
  {
    id: "business-technical",
    name: "Business / Technical",
    weight: 5,
    score: 55,
    required: 85,
    status: "AT RISK",
    blockers: 0,
    nextAction:
      "Update the privacy policy for Ask Path → OpenAI processing and add refund/cancellation terms for the paid Fit Call.",
  },
];

// Weighted overall readiness, rounded to a whole percent.
export function getOverallReadiness(gates = GATES) {
  const totalWeight = gates.reduce((sum, g) => sum + g.weight, 0);
  const weighted = gates.reduce((sum, g) => sum + g.score * g.weight, 0);
  return totalWeight === 0 ? 0 : Math.round(weighted / totalWeight);
}

export const NEXT_CRITICAL_ACTION = {
  severity: "P0",
  gate: "Lead Capture",
  owner: "Kalen",
  action:
    "Log into Formspree and prove lead delivery: confirm form xdabqdyq notifies a monitored inbox, send a live test through all four site forms (homepage contact, Free Guide, Blueprint, Ask Path handoff), and review submission history for leads that may already have been missed.",
  why: "Every lead path on the site terminates in this single unverified inbox. Until delivery is proven, every other launch workstream is building on an unknown.",
};
