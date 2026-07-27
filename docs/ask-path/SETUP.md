# Ask Path — Setup

## What this is

Ask Path is a bilingual AI relocation concierge. The React widget
(`src/features/askPath/`) talks only to one endpoint, `POST /api/ask-path`
— a Vercel serverless function (`api/ask-path.js`) that is the only place
`OPENAI_API_KEY` is ever read. The key never reaches the browser bundle.

## Local development

1. Copy `.env.example` to `.env.local`:
   ```
   cp .env.example .env.local
   ```
2. Fill in `OPENAI_API_KEY` in `.env.local` (already gitignored — never commit it).
3. `react-scripts start` alone will **not** serve `/api/*` — it's a plain
   CRA dev server with no knowledge of Vercel functions. To exercise Ask
   Path locally you need the Vercel CLI's local emulator:
   ```
   vercel dev
   ```
   This serves both the React app and `/api/ask-path` together, reading
   `.env.local` (or your shell environment) for `OPENAI_API_KEY`. The
   project is already linked (`.vercel/project.json`), so no `vercel login`
   / `vercel link` should be required on a machine that's already
   authenticated.
4. Without `OPENAI_API_KEY` set at all, Ask Path still boots — it responds
   with a clear "not configured yet" message (HTTP 503) instead of
   crashing. This is intentional (see TESTING → "Missing API key" in the
   original ticket).

## Production (Vercel)

Set the same two variables in the Vercel project's **Settings → Environment
Variables**, scoped to Preview and/or Production as appropriate:

| Variable | Required | Notes |
|---|---|---|
| `OPENAI_API_KEY` | Yes | Server-side only. Never add a `REACT_APP_` prefixed copy of this. |
| `OPENAI_MODEL` | No | Defaults to `gpt-5.6-terra` if unset (see `api/_lib/openaiClient.js`). |

No other configuration is required — `vercel.json` in the repo root sets
`api/ask-path.js`'s `maxDuration` to 30s; everything else (rate limiting,
validation, retrieval) is self-contained in `api/_lib/`.

## Where things live

```
api/ask-path.js            the one HTTP entry point (POST only)
api/_lib/                  reusable service layer — see ORION_INTEGRATION_CONTRACT.md
  validation.js             request shape/size limits
  rateLimiter.js             best-effort in-memory per-IP limiting
  retrieval.js                deterministic keyword-based knowledge retrieval
  guardrails.js               sensitive-input detection + system prompt
  escalation.js                deterministic "should this reach Kalen?" signal
  leadQualification.js         deterministic engagement/lead scoring
  openaiClient.js              thin OpenAI Responses API streaming wrapper
  knowledge/                   source records — see KNOWLEDGE_SOURCES.md

src/features/askPath/       the React widget
  components/                launcher, panel, message bubbles, opt-ins, handoff form
  state/useAskPathConversation.js   sessionStorage-backed conversation state
  logic/                     stream parsing, handoff summary, Blueprint opt-in reader
  data/copy.js                 EN/ES interface copy (not knowledge — see above)
```
