// PTM Client Delivery Operating System — launch fix #5.
//
// Internal operator SOPs for the three live services (Fit Call $99,
// Personalized Roadmap $499, Guided Landing custom-quote) plus the
// supporting standards. This is version-controlled operational content
// rendered on the internal Developer Dashboard.
//
// Rules encoded here (guarded by deliverySops.test.js):
// - No fixed Guided Landing price, ever.
// - No legal/immigration/tax/medical/financial guarantees.
// - Client-facing workflows end with a NEXT ACTION + NEXT-ACTION DATE.
// - Undecided business policies are marked "BUSINESS DECISION REQUIRED",
//   never silently invented.
// - No client PII: these are procedures, not records.
//
// The Fit Call duration (60 minutes) comes from the live Calendly events
// verified in launch fix #2 — do not change it here without changing the
// events.

export const NEXT_ACTION_RULE =
  "Every client interaction ends by recording a NEXT ACTION and NEXT-ACTION DATE in the CRM. No active client is ever left without one.";

export const DELIVERY_BOUNDARY =
  "Path To Mexico provides premium relocation guidance, coordination, trusted connections, and practical support. It is not an immigration law firm, tax practice, medical provider, investment adviser, real-estate brokerage, or emergency service — wherever specialized or regulated advice is required, engage the appropriate qualified professional.";

export const SOP_DOCS = [
  {
    id: "fit-call",
    title: "Mexico Fit Call — $99",
    summary: "Pre-call prep, the 60-minute consultative structure, notes, honest outcomes, and follow-up.",
    sections: [
      {
        heading: "A · Pre-Call Preparation (10 minutes, day before or morning of)",
        items: [
          "Open the lead in the CRM: confirm name, current location, lead source, stage, and any prior correspondence.",
          "Review Blueprint responses if the lead came through My Mexico Blueprint: readiness score, archetype, top destinations, stated answers.",
          "Note destination interests, relocation timeline, and budget/service interest wherever already provided — never make the client repeat what PTM already knows.",
          "Write down the 2–3 questions this specific person most likely needs answered.",
          "Confirm the booking (time, timezone, conferencing link) and have the notes template open before joining.",
        ],
      },
      {
        heading: "B · Call Structure (60 minutes — matches the live Calendly events)",
        items: [
          "1. Welcome and context — who PTM is, how the hour works, what they'll leave with (≈5 min).",
          "2. Why Mexico, why now — their motivation in their own words (≈5 min).",
          "3. Current situation — household, work, location, what's already decided (≈5 min).",
          "4. Destination fit — interests vs. realities; compare honestly, cons included (≈10 min).",
          "5. Timeline — realistic sequencing of decisions (≈5 min).",
          "6. Housing — rent-first guidance, areas, expectations (≈5 min).",
          "7. Residency and logistics considerations — general pathways only; qualified professionals for specifics (≈5 min).",
          "8. Healthcare — practical landscape, never diagnostic or insurance advice (≈5 min).",
          "9. Finances, banking, and money logistics — what to expect, not financial advice (≈5 min).",
          "10. Transportation, lifestyle, and community fit — daily-life reality check (≈5 min).",
          "11. Concerns, risks, and priorities — name what's uncertain out loud (≈3 min).",
          "12. Recommended next steps — concrete, whether or not they buy anything; name the appropriate PTM service only if one genuinely fits (≈2 min).",
          "Tone rule: this is a consultative conversation, not a scripted sales call. It must be worth $99 even if the client never spends another dollar.",
        ],
      },
      {
        heading: "C · Notes Template (complete during or immediately after)",
        items: [
          "Goals · Priorities · Destination preferences · Timing",
          "Constraints (family, work, health, pets, finances as volunteered)",
          "Budget / service fit · Important concerns",
          "Professionals or connections potentially needed",
          "Recommendations given · Commitments PTM made · Commitments client made",
          "NEXT ACTION and NEXT-ACTION DATE",
        ],
      },
      {
        heading: "D · Close — Honest Outcomes",
        items: [
          "No further service needed — say so plainly; leave them with their next steps.",
          "Follow-up / nurture — set the follow-up date before ending the call.",
          "Personalized Roadmap appropriate — explain what it would cover for them specifically.",
          "Guided Landing discussion appropriate — outline the custom-scope conversation.",
          "External professional referral needed — follow the Partner Coordination SOP.",
          "Not a good PTM fit — say so respectfully; never push every client toward the next product.",
        ],
      },
      {
        heading: "E · Follow-Up (same day)",
        items: [
          "Update the CRM: stage (Fit Call Completed), notes, last-contact date.",
          "Record the NEXT ACTION and NEXT-ACTION DATE.",
          "Send every resource promised on the call.",
          "If the Roadmap fits: send the /relocation-roadmap link with one personal sentence about why.",
          "If Guided Landing fits: propose the scoping conversation.",
          "If a follow-up was promised, schedule it now — not 'soon'.",
        ],
      },
    ],
  },
  {
    id: "roadmap",
    title: "Personalized Roadmap — $499",
    summary: "Qualification, intake that reuses what PTM already knows, sourced research, the canonical document structure, QC, and delivery.",
    sections: [
      {
        heading: "A · Qualification — when the Roadmap fits",
        items: [
          "Fits: serious movers who need structured direction; multiple decisions needing sequencing; people wanting personalized research before committing to concierge execution.",
          "May NOT fit: still purely dreaming (guides + Blueprint serve better); needs hands-on execution now (Guided Landing conversation instead); needs primarily regulated professional advice (refer first); expectations a $499 document cannot honestly meet — say so.",
        ],
      },
      {
        heading: "B · Intake",
        items: [
          "Start from what PTM already has: Blueprint answers, Fit Call notes, CRM record. Confirm rather than re-ask.",
          "Capture only what the plan genuinely needs: personal/family context · preferred destinations · move timing · residency situation · housing preferences · monthly lifestyle budget · practical (non-diagnostic) healthcare needs · transportation plans · pets if relevant · work/business situation · banking and logistics concerns · priorities · non-negotiables · biggest uncertainties · support required.",
          "Do not collect unnecessary sensitive data (no medical records, no full financial statements, no document numbers).",
        ],
      },
      {
        heading: "C · Research Workflow",
        items: [
          "Label every factual recommendation by its basis: OFFICIAL SOURCE · PROFESSIONAL ADVICE REQUIRED · PTM EXPERIENCE/CONTEXT · PARTNER/PROVIDER INFORMATION · CLIENT PREFERENCE.",
          "For legal, immigration, tax, healthcare, banking, or regulatory topics: verify against a current authoritative source before delivery, and still route specifics to a qualified professional.",
          "Never fabricate certainty. An honest 'this varies — confirm with X' beats a confident guess.",
        ],
      },
      {
        heading: "D · Canonical Roadmap Structure (adapt; drop irrelevant sections)",
        items: [
          "1. Executive overview · 2. Client priorities · 3. Recommended destination direction · 4. Timeline",
          "5. Residency/legal considerations · 6. Housing strategy · 7. Healthcare planning · 8. Banking/money logistics",
          "9. Transportation · 10. Moving/belongings · 11. Community & lifestyle integration · 12. Trusted professional connections where appropriate",
          "13. Risk & uncertainty register · 14. First 30 days · 15. 30–90 days · 16. Longer-term priorities",
          "17. Action checklist · 18. Sources & professional follow-up",
        ],
      },
      {
        heading: "E · Quality Control (before every delivery)",
        items: [
          "Client name and details correct throughout.",
          "No stale critical information; time-sensitive items re-verified.",
          "No unsupported professional claims; boundaries language intact.",
          "Recommendations actually match the client's stated priorities.",
          "External providers correctly represented (vetted vs. known vs. informational).",
          "Every link works · no invented pricing · uncertainties disclosed honestly.",
          "Language (English/Spanish) matches the client's preference · every commitment is realistic.",
        ],
      },
      {
        heading: "F · Delivery",
        items: [
          "Deliver the document with a short personal walkthrough note (or call, client's preference).",
          "Update the CRM: stage (Roadmap Purchased → delivery recorded in notes), last contact.",
          "Record the NEXT ACTION and NEXT-ACTION DATE (default: follow-up conversation within a defined window).",
          "Offer Guided Landing only where the plan itself shows hands-on coordination would genuinely help.",
          "Turnaround target: BUSINESS DECISION REQUIRED — do not promise a delivery window until Kalen sets one.",
          "Revision policy: BUSINESS DECISION REQUIRED — do not promise revisions until Kalen defines the entitlement.",
        ],
      },
    ],
  },
  {
    id: "guided-landing",
    title: "Guided Landing / Concierge — Custom Quote",
    summary: "Qualification, the scope-of-work menu, the quote workflow, and per-engagement boundaries. Never a fixed price.",
    sections: [
      {
        heading: "A · Qualification",
        items: [
          "Confirm the client actually needs hands-on coordination — not just reassurance (Fit Call) or direction (Roadmap).",
          "Signals: compressed timeline, family complexity, remote purchase/rental decisions, limited Spanish, low tolerance for logistics, willingness to invest in support.",
          "Every engagement begins from a Fit Call or equivalent qualification conversation.",
        ],
      },
      {
        heading: "B · Scope-of-Work Menu (select per client; nothing is automatic)",
        items: [
          "Relocation planning · Housing coordination · Professional introductions",
          "Residency/legal professional coordination · Healthcare connections · Insurance connections",
          "Banking/logistics guidance · Vehicle-purchase connection · Moving/customs coordination",
          "Airport/arrival planning · Local orientation · Settling-in logistics · Partner coordination · After-arrival support",
          "PTM coordinates and connects — it never performs regulated professional services itself.",
        ],
      },
      {
        heading: "C · Custom Quote Workflow",
        items: [
          "Fit Call / qualification → needs assessment → proposed scope → explicit exclusions → custom quote → client approval → delivery.",
          "The quote is always per-client. There is no fixed Guided Landing price and none may ever be published, encoded, or implied.",
          "External-provider costs are always separate from PTM's fee and are stated as the provider's, not PTM's.",
        ],
      },
      {
        heading: "D · Per-Engagement Boundaries (every engagement documents these)",
        items: [
          "Included tasks · Excluded tasks · External-provider costs · Client responsibilities",
          "Response expectations: BUSINESS DECISION REQUIRED — do not promise response times until Kalen sets them.",
          "Emergency limitations: PTM is not an emergency service (see Escalation SOP).",
          "Professional-service boundaries per the delivery principle.",
          "Start and end conditions for the engagement.",
          "Cancellation/refund terms: BUSINESS DECISION REQUIRED.",
          "Each interaction during delivery ends with a NEXT ACTION and NEXT-ACTION DATE in the CRM.",
        ],
      },
    ],
  },
  {
    id: "communication",
    title: "Client Communication Standard",
    summary: "Channels, boundaries, documentation discipline, and bilingual support.",
    sections: [
      {
        heading: "Standard",
        items: [
          "Response expectations: acknowledge within a reasonable business window; exact committed response times are BUSINESS DECISION REQUIRED — never promise 24/7 availability.",
          "WhatsApp: fine for quick coordination and rapport. Any important decision, commitment, or scope change made there must be restated in the client's record / a written summary — never buried only in casual chat.",
          "Email: for documents, summaries of decisions, deliverables, and anything the client may need to re-read.",
          "Scheduled calls: for anything consequential — decisions, scope, concerns.",
          "Urgent vs. non-urgent: genuine urgency (safety, same-day logistics) gets priority; everything else follows the normal rhythm. Emergencies go to local emergency services, not PTM (see Escalation).",
          "After-hours: boundaries are respected in both directions; set expectations early.",
          "Bilingual: serve the client in English or Spanish, matching their preference consistently.",
          "Tone: warm, direct, honest — including when the honest answer is 'I don't know yet, and here's how we'll find out.'",
        ],
      },
    ],
  },
  {
    id: "partner-coordination",
    title: "Partner Coordination",
    summary: "How a referral or introduction to an external professional happens, and what gets recorded.",
    sections: [
      {
        heading: "Before Any Referral",
        items: [
          "Confirm the provider's current contact information — never refer into a dead number.",
          "Confirm the service category actually matches the client's need.",
          "Classify the relationship honestly: VETTED (worked with, verified) · KNOWN (real relationship, not formally verified) · INFORMATIONAL (aware of, no relationship). Tell the client which it is.",
          "Disclose any referral relationship or compensation when applicable.",
          "Never promise a third party's performance, pricing, or outcome.",
        ],
      },
      {
        heading: "Record in the Client's CRM Notes",
        items: [
          "Provider · Reason for referral · Date · Introduction status (offered / made / declined)",
          "Client feedback once available · Any issue or escalation",
          "If quality or safety concerns arise about a provider: stop referring, document facts, and review the relationship (see Escalation).",
          "No signed partnership may be claimed unless one actually exists in writing.",
        ],
      },
    ],
  },
  {
    id: "escalation",
    title: "Escalation & Safety",
    summary: "What PTM does when a situation exceeds guidance — emergencies, regulated advice, disputes, scope creep.",
    sections: [
      {
        heading: "Escalation Paths",
        items: [
          "IMMEDIATE EMERGENCY: PTM is not an emergency service. Direct the client to local emergency services (911 in Mexico) and, where relevant, their embassy or consulate. Follow up after, but never position PTM as the responder.",
          "Legal / immigration: escalate to qualified counsel or an accredited immigration professional. PTM may coordinate, never advise on specifics.",
          "Medical: escalate to a qualified healthcare provider. PTM connects, never diagnoses or recommends treatment.",
          "Tax / financial: escalate to a qualified cross-border professional.",
          "Client–provider dispute: document facts only; make no unsupported accusations; escalate internally to Kalen; consider suspending referrals to that provider while reviewing.",
          "Distress or safety concern about a client: prioritize the human being; connect to appropriate local resources; document.",
        ],
      },
      {
        heading: "Scope Creep",
        items: [
          "When a request lands outside the engagement, classify it before acting: already included · requires new scope · requires an additional quote · belongs with another professional.",
          "Say which one it is, kindly and clearly, before doing the work.",
        ],
      },
    ],
  },
  {
    id: "completion-aftercare",
    title: "Completion & Aftercare",
    summary: "How an engagement ends: closure, follow-up, and staying in relationship.",
    sections: [
      {
        heading: "At Completion",
        items: [
          "Walk through completed items against the agreed scope; confirm together.",
          "Name unresolved items honestly and where they go next (client, provider, future engagement).",
          "Provide final next steps in writing.",
          "Update the CRM: stage (Follow-Up / Nurture, or Closed / Not Now as appropriate), notes, last contact.",
          "Set a follow-up NEXT ACTION and NEXT-ACTION DATE where appropriate (aftercare duration: BUSINESS DECISION REQUIRED).",
          "Request feedback in a low-pressure way.",
          "Follow the Testimonial & Review SOP only when the outcome genuinely earned it.",
          "Ask for referrals only where the relationship supports it — never as a script.",
        ],
      },
    ],
  },
  {
    id: "testimonials",
    title: "Testimonial & Review Requests",
    summary: "Internal consent-first process. The Roni Bridger and Devon O'Tool decisions are settled — do not reopen them.",
    sections: [
      {
        heading: "Process",
        items: [
          "Trigger only after a genuine successful outcome — never mid-engagement, never under pressure, never as a favor exchange.",
          "Ask once, warmly; accept 'no' without follow-up pressure.",
          "Track for every request: date requested · platform requested · permission for website use · exact approved wording · permission for name/photo where applicable.",
          "The published text is the client's approved words. Never polish a client's words into a claim they did not make without their explicit approval of the final text.",
          "A testimonial with no consent record does not get published — this is the standing rule that removed earlier unattributed quotes.",
          "Existing decisions are settled: Roni Bridger (client testimonial, approved verbatim) and Devon O'Tool (professional endorsement, one L, never labeled a client story) stay exactly as they are.",
        ],
      },
    ],
  },
];

// Unresolved business-policy decisions surfaced by the SOPs. These are
// Kalen's to make — the SOPs reference them but never invent them.
export const KALEN_DECISIONS = [
  {
    decision: "Fit Call cancellation / refund policy",
    why: "Clients pay $99 up front through Calendly; today nothing tells them (or PTM) what happens on a cancel or no-show.",
    recommendedDefault: "Free reschedule any time; full refund if cancelled ≥24h before; no-shows may rebook once.",
    risk: "Too generous invites no-shows; too strict damages trust at the first paid touchpoint.",
  },
  {
    decision: "Roadmap payment mechanism",
    why: "The $499 tier has a page and a qualification path but no way to actually take payment.",
    recommendedDefault: "A paid Calendly 'Roadmap Intake' event on the same rails as the $99 call — no new provider needed.",
    risk: "Calendly couples payment to a meeting; a payment-link provider is cleaner long-term but needs a provider decision.",
  },
  {
    decision: "Roadmap turnaround target",
    why: "Clients paying $499 will ask when they get it; the SOP currently forbids promising a window.",
    recommendedDefault: "Commit internally to 10 business days from completed intake; tell clients 'within two weeks' once proven achievable.",
    risk: "Overpromising breaks trust at the highest-signal moment; no target at all reads as unprofessional.",
  },
  {
    decision: "Roadmap revision policy",
    why: "Undefined revision entitlement invites either endless free rework or client disappointment.",
    recommendedDefault: "One clarification round within 14 days of delivery; material scope changes are a new engagement.",
    risk: "Unlimited revisions destroy the unit economics; zero feels stingy at this price.",
  },
  {
    decision: "Guided Landing response expectations",
    why: "Concierge clients need to know how fast PTM responds; the SOP forbids inventing this.",
    recommendedDefault: "Same-business-day acknowledgment, next-business-day substantive reply, explicit no-24/7 language.",
    risk: "Silence lets clients assume 24/7; overcommitting makes one busy week a breach of trust.",
  },
  {
    decision: "Guided Landing cancellation / refund terms",
    why: "A custom engagement with real money needs defined exit terms before the first client signs.",
    recommendedDefault: "Pro-rated by completed scope items, with a defined non-refundable planning component.",
    risk: "Undefined terms turn any mid-engagement cancellation into an ugly negotiation.",
  },
  {
    decision: "Aftercare duration",
    why: "The Completion SOP sets a follow-up but not how long PTM stays actively available post-engagement.",
    recommendedDefault: "30 days of light-touch aftercare included, then Follow-Up / Nurture cadence.",
    risk: "Open-ended aftercare becomes unpaid concierge work; none feels abandoning.",
  },
  {
    decision: "Included vs. additional-cost concierge tasks",
    why: "Scope-creep classification needs a baseline of what a Guided Landing quote inherently covers.",
    recommendedDefault: "Coordination and introductions included; in-person accompaniment and out-of-area travel quoted separately.",
    risk: "Without the baseline, every engagement renegotiates from scratch.",
  },
];
