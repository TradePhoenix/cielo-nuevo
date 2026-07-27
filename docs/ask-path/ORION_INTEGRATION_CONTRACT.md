# Ask Path ↔ Orion — Future Integration Boundary

**Status: not built.** Nothing in this document is implemented. ASK
PATH-001 deliberately does not connect to Orion — this document exists so
that connection can happen later without rebuilding Ask Path, per the
ticket's MODULARITY AND ORION section. There is no unrestricted public
intelligence endpoint today; `/api/ask-path` is the website's own
narrow-purpose chat endpoint, not a general-purpose service surface.

## Why this is possible without a rebuild

`api/ask-path.js` (the HTTP handler) is intentionally thin. Every piece of
actual intelligence is a plain, side-effect-scoped module under
`api/_lib/`, callable from any Node process — not just from an HTTP
request:

| Module | Responsibility | Orion-reusable as-is? |
|---|---|---|
| `retrieval.js` | Path To Mexico knowledge retrieval | Yes — `retrieveRelevantRecords({message, recentContext})` has no HTTP dependency |
| `guardrails.js` | Safety / professional-advice guardrails, system prompt assembly | Yes — `buildSystemPrompt(...)`, `detectSensitiveInput(...)` |
| `escalation.js` | Human escalation logic | Yes — `detectEscalationSignal(text)` |
| `leadQualification.js` | Lead qualification signals | Yes — `scoreLeadQualification(messages)` |
| `openaiClient.js` | Conversation orchestration (the actual model call) | Yes, if Orion wants Path To Mexico's exact persona/model choice — otherwise Orion likely has its own orchestration and would call the above modules directly and use its own model client |
| `validation.js` / `rateLimiter.js` | Request hygiene | HTTP-boundary-specific; Orion would apply its own equivalents at its own boundary |

None of these modules read `req`/`res` — they take plain data in, return
plain data out (mirroring the Blueprint's own `buildRecommendation(scores,
answers)` seam). Destination-recommendation logic specifically lives one
layer further down, in `src/decisionEngine/logic/recommendationEngine.js`
(pure, already used by both the Blueprint and, via
`readBlueprintSummary.js`, by Ask Path) — Orion could call that directly
too.

## What a real connection would need (not built)

1. **Authentication & permissions** — Orion is a private system; any route
   it calls would need its own service-to-service credential (e.g. a
   signed request or a separate `ORION_SERVICE_KEY`), distinct from the
   public website's rate-limited, unauthenticated `/api/ask-path`. The
   current endpoint must remain narrow-purpose and should **not** be
   reused as Orion's access point without adding real auth.
2. **Requested language** — already a first-class input (`language: "en"
   | "es"` in the request body) — Orion would pass the same field.
3. **User consent** — Ask Path's own privacy model (session-only storage,
   explicit Blueprint opt-in, explicit handoff consent checkbox) would need
   an explicit mapping to whatever consent state Orion tracks per user;
   nothing here should be assumed to satisfy Orion's own consent
   requirements automatically.
4. **Blueprint context** — already shaped as a small, explicit-opt-in
   object (`{archetypeTitle, readinessLabel, budgetTier, topCityNames}`,
   see `validation.js`'s allowed keys) — never raw questionnaire answers.
   Orion should receive the same shape, not richer data, unless a future
   ticket explicitly re-scopes what's shared.
5. **Structured questions & responses** — the NDJSON response already
   separates the model's prose from structured metadata (`sources`,
   `escalation`, `leadQualification`, `sensitiveInput`) — Orion would
   consume the structured fields, not scrape the prose.
6. **Source records** — `sources` in the response are `{id, title, route,
   category}` — enough for Orion to know *what* grounded an answer without
   re-sending the full record content.
7. **Lead qualification signals** — `leadQualification.level` /
   `.signals` / `.turnCount` from `leadQualification.js` are already the
   coarse, privacy-conscious shape described in the ticket (no raw
   conversation text).
8. **Escalation status** — `escalation.shouldEscalate` / `.reason` /
   `.urgent` from `escalation.js`.
9. **Privacy boundaries** — per the ticket, Orion should receive
   **structured, consent-appropriate summaries and signals only** — never
   raw conversation content by default. If a future ticket wants Orion to
   see full transcripts, that is a new, explicit privacy decision, not an
   extension of what's built here.

## Explicitly out of scope for ASK PATH-001

- No Orion-facing route exists.
- No service-to-service auth exists.
- No transcript export exists.
- This document is a boundary description, not a working integration.
