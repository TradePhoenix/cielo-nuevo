# PTM Data Foundation — Setup (DATA-001)

The Partner Network admin (`/partner-network/admin`) and the partner
application pipeline persist to a Supabase Postgres database, accessed only
by the Vercel serverless functions under `api/`. The browser never talks to
Supabase directly, and no Supabase key ever ships in the React bundle.

Until the steps below are completed, the site degrades gracefully:

- `/partner-with-ptm/apply` falls back to the original Formspree email-only delivery.
- The Blueprint database copy of leads is skipped (Formspree still delivers).
- `/partner-network/admin` shows an explicit "Backend not configured" state.

## 1. Create the Supabase project

1. Create a project at [supabase.com](https://supabase.com) (Free tier is fine to start; region: pick the closest to most admin use, e.g. `us-east-1`).
2. Note two values from **Project Settings → API**:
   - **Project URL** → `SUPABASE_URL`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (treat like a root password — server-side only, never in the browser, never in git)

## 2. Run the migration

Open **SQL Editor** in the Supabase dashboard and run the contents of:

```
supabase/migrations/20260816120000_partner_network_foundation.sql
```

(Or, with the Supabase CLI: `supabase link --project-ref <ref>` then `supabase db push`.)

This creates `partners`, `partner_commercial_terms`, `partner_agreements`,
`referrals`, `equity_partner_records`, `partner_applications`, and
`blueprint_leads`, all with Row Level Security enabled and **no** policies —
only the service-role key (i.e. our API) can touch them.

## 3. Create the admin user

1. Supabase dashboard → **Authentication → Users → Add user**.
2. Use the admin email (e.g. `pathtomexico@gmail.com`) and a strong password; check "Auto confirm user".
3. Put the same email in the `ADMIN_EMAILS` environment variable. Only allowlisted emails can sign in, even if other users exist.

Password resets happen in the Supabase dashboard (Authentication → Users → … → Send password recovery / update password).

## 4. Environment variables

Set these in **Vercel → Project → Settings → Environment Variables**
(Production, and Preview if desired), and in a local `.env.local` for
development. Names only — see `.env.example` for descriptions:

| Variable | Server-only? | Purpose |
|---|---|---|
| `SUPABASE_URL` | yes | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | yes — highly sensitive | Database access from api/ functions |
| `ADMIN_SESSION_SECRET` | yes | Signs admin session cookies. Generate: `openssl rand -base64 48`. Rotating signs everyone out. |
| `ADMIN_EMAILS` | yes | Comma-separated admin allowlist |
| `OPENAI_API_KEY`, `OPENAI_MODEL` | yes | Pre-existing (Ask Path) |

There are **no** `REACT_APP_*` variables; nothing here is exposed to the browser.

## 5. Local development

```
# Terminal 1 — API functions on :3001 (reads .env.local)
npm run dev:api

# Terminal 2 — React app on :3000 (CRA proxies /api/* to :3001)
npm start
```

Without `.env.local` credentials, the API responds with explicit
"backend not configured" states — nothing crashes.

Tests: `npm run test:api` (server) and `npm test` (React) run fully offline;
they never contact Supabase.

## 6. Migrating the Phase 1 browser ledger

After deploying and signing in to `/partner-network/admin`:

1. Open the admin **in the browser that holds the Phase 1 records**.
2. Click **Migrate Phase 1 Data** → **Read This Browser's Records** (or **Choose Export File…** for a `ptm-partner-network-*.json` backup).
3. Review the preview (counts of new / duplicate / invalid records), then **Import These Records**.

The import never modifies or deletes the browser copy; duplicates (by legacy
id, or same legal name + email) are skipped, so running it twice is safe.
After a successful import the **database is the source of truth** — the
localStorage copy is just a stale backup.

## 7. Backups

Supabase Free includes daily backups with limited retention; the admin's
**Export Records** button also downloads a full JSON snapshot of the database
ledger at any time. For belt-and-braces, `pg_dump` works against the
project's connection string (Project Settings → Database).
