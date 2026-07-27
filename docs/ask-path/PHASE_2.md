# Ask Path — Remaining Phase 2 Work

Everything below is explicitly deferred, per Kalen's approved-decisions
message for ASK PATH-001. None of it is built.

1. **Full guide-body ingestion.** Only guide index summaries are indexed
   today (see `docs/ask-path/KNOWLEDGE_SOURCES.md`). Indexing the 27
   guides' full article bodies would require either restructuring guide
   content into data (a bigger content-architecture decision) or manually
   curating longer per-guide summaries. (Note: `ArticleSection.js` was
   previously believed to have a body-rendering bug blocking this —
   verified during the PTM Spanish-parity pass that it renders correctly;
   see the correction in `KNOWLEDGE_SOURCES.md`. That was never the real
   blocker.)
3. **Durable, distributed rate limiting.** `api/_lib/rateLimiter.js` is
   in-memory and per-instance — a real ceiling on abuse needs an external
   store (e.g. Upstash Redis), which is new infrastructure and was
   explicitly not approved for this MVP.
4. **A moderation-model safety layer.** Current guardrails are system-prompt
   discipline plus a deterministic regex-based sensitive-input detector.
   Adding OpenAI's moderation endpoint (or similar) as a second layer is a
   reasonable next step but wasn't part of the approved MVP scope.
5. **Orion connection.** See `ORION_INTEGRATION_CONTRACT.md` — the boundary
   is documented, nothing is wired up.
6. **FAQ / services content deduplication.** `api/_lib/knowledge/faq.js`
   and `services.js` hand-copy content that lives inline in `HomePage.js`
   and `MexicoFitCallPage.js`. Extracting that into shared data modules
   (the same pattern `src/data/guides.js` already established) would
   remove the drift risk, but touches those page files, which is out of
   this ticket's scope.
7. **Bilingual parity for the original 11 destinations.** Only their
   `tagline` is verified-bilingual in `cityDetails.js`; the rest of their
   detail content is English-only, unlike the 14 DEST-003 destinations.
   Not something Ask Path can fix — it's a pre-existing content gap in the
   site's own data.
8. **A real analytics provider.** `trackEvent()` remains the existing
   console-only no-op in production (see `src/utils/analytics.js`'s
   original CONV-001 comment) — Ask Path's events use the same interface
   and are ready for a provider whenever one is chosen, but none is wired
   up by this ticket.
