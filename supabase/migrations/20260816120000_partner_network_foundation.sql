-- Partner Network data foundation — first durable schema for PTM operational
-- records (DATA-001). Replaces the browser-localStorage ledger shipped in
-- Partner Network Phase 1 (PR #8).
--
-- Access model: the browser NEVER talks to this database. Every read/write
-- goes through PTM's own Vercel serverless functions (api/admin/*, api/public/*)
-- using the service-role key, which bypasses RLS. RLS is still enabled on
-- every table with NO policies as defense in depth: if the anon or
-- authenticated key ever leaks into a client bundle, it can read and write
-- nothing.
--
-- Naming: snake_case columns; the API layer maps to/from the camelCase
-- Phase 1 entity shapes (src/features/partnerNetwork/logic/model.js), which
-- remain the request/response contract so the admin UI is unchanged.

-- ---------------------------------------------------------------------------
-- updated_at maintenance

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- partners — one row per professional partner (referral network).
-- credentials / compliance / vetting keep their Phase 1 object shapes as
-- jsonb: they are admin-edited working notes, not relational data.

create table public.partners (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,                          -- Phase 1 "ptr-…" id, set on import for dedupe
  source_application_id uuid,                     -- backfilled FK to partner_applications (added below)

  legal_name text not null default '',
  trading_name text not null default '',
  contact_person text not null default '',
  email text not null default '',
  phone text not null default '',
  whatsapp text not null default '',
  website text not null default '',
  address text not null default '',
  city text not null default '',
  state text not null default '',
  country text not null default 'Mexico',
  rfc_tax_id text not null default '',

  category text not null default 'other',
  status text not null default 'Applicant'
    check (status in ('Applicant','Under Review','Approved','Active','Paused','Suspended','Terminated')),

  services_description text not null default '',
  areas_served text not null default '',
  languages text not null default '',
  years_in_business text not null default '',

  credentials jsonb not null default '{}'::jsonb, -- {licenseNumber, licenseType, issuingAuthority, realEstateRegistration, otherCredentials, expirationDate, documents[]}
  compliance jsonb not null default '{}'::jsonb,  -- boolean map keyed by COMPLIANCE_FLAGS id
  vetting jsonb not null default '{}'::jsonb,     -- {scores{}, overall, trustTest, interviewNotes, reviewedAt, reviewedBy}

  internal_notes text not null default '',
  last_activity_at timestamptz not null default now(),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index partners_status_idx on public.partners (status);
create index partners_category_idx on public.partners (category);

create trigger partners_set_updated_at
  before update on public.partners
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- partner_commercial_terms — PRIVATE. One row per partner.
-- referral_protection_days is the canonical protection window; the admin UI
-- edits it in months and the API layer converts (months * 30).

create table public.partner_commercial_terms (
  partner_id uuid primary key references public.partners (id) on delete cascade,

  compensation_type text not null default ''
    check (compensation_type in ('', 'percentage','fixed','reciprocal','tiered','strategic')),
  ptm_percentage numeric check (ptm_percentage is null or (ptm_percentage >= 0 and ptm_percentage <= 100)),
  ptm_fixed_amount numeric check (ptm_fixed_amount is null or ptm_fixed_amount >= 0),
  partner_percentage numeric check (partner_percentage is null or (partner_percentage >= 0 and partner_percentage <= 100)),
  partner_fixed_amount numeric check (partner_fixed_amount is null or partner_fixed_amount >= 0),
  currency text not null default 'USD' check (currency in ('USD','MXN','CAD','EUR')),
  payment_due_days integer check (payment_due_days is null or (payment_due_days >= 0 and payment_due_days <= 365)),
  referral_protection_days integer check (referral_protection_days is null or (referral_protection_days >= 0 and referral_protection_days <= 3660)),
  exclusivity text not null default 'Non-exclusive'
    check (exclusivity in ('Non-exclusive','Exclusive in category','Exclusive in region','Exclusive in category + region')),
  special_conditions text not null default '',
  internal_notes text not null default '',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger partner_commercial_terms_set_updated_at
  before update on public.partner_commercial_terms
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- partner_agreements — agreement lifecycle records. The typed-acceptance
-- record here is documentation of an acceptance event, NOT a certified
-- e-signature; the provider/provider_ref pair is the seam for a real
-- e-signature provider later.

create table public.partner_agreements (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  partner_id uuid not null references public.partners (id) on delete cascade,

  agreement_version text not null default '1.0',
  provider text not null default 'internal',
  provider_ref text not null default '',
  status text not null default 'Draft'
    check (status in ('Draft','Sent','Viewed','Accepted','PTM Approved','Active','Expired','Terminated')),

  accepted boolean not null default false,
  accepted_legal_name text not null default '',
  representative_name text not null default '',
  accepted_at timestamptz,
  acceptance_user_agent text not null default '',
  acceptance_ip text not null default '',

  ptm_approved boolean not null default false,
  ptm_approved_by text not null default '',
  ptm_approved_at timestamptz,

  active_from timestamptz,
  expires_at date,
  terminated_at timestamptz,
  notes text not null default '',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index partner_agreements_partner_idx on public.partner_agreements (partner_id);

create trigger partner_agreements_set_updated_at
  before update on public.partner_agreements
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- referrals — the non-circumvention ledger. protection_expires_at is
-- recomputed by the API layer from the partner's terms whenever the referral
-- is created or its partner/date changes.

create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  partner_id uuid references public.partners (id) on delete cascade,

  client_name text not null default '',
  client_contact text not null default '',
  direction text not null default 'PTM → Partner'
    check (direction in ('PTM → Partner','Partner → PTM')),
  date_introduced date,
  service_category text not null default '',
  service text not null default '',
  status text not null default 'Introduced'
    check (status in ('Introduced','Contacted','Consultation','In Progress','Converted','Lost','Cancelled')),
  protection_expires_at date,

  deal_value numeric check (deal_value is null or deal_value >= 0),
  currency text not null default 'USD' check (currency in ('USD','MXN','CAD','EUR')),
  ptm_referral_fee numeric check (ptm_referral_fee is null or ptm_referral_fee >= 0),
  partner_referral_fee numeric check (partner_referral_fee is null or partner_referral_fee >= 0),
  payment_status text not null default 'None'
    check (payment_status in ('None','Pending','Earned','Invoiced','Paid','Refunded')),
  notes text not null default '',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index referrals_partner_idx on public.referrals (partner_id);
create index referrals_status_idx on public.referrals (status);

create trigger referrals_set_updated_at
  before update on public.referrals
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- equity_partner_records — internal recordkeeping ONLY. Nothing in this
-- table creates, changes, or evidences legal share ownership; formal
-- ownership remains subject to Mexican corporate and notarial documents.

create table public.equity_partner_records (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,

  legal_name text not null default '',
  ownership_percentage numeric check (ownership_percentage is null or (ownership_percentage >= 0 and ownership_percentage <= 100)),
  role text not null default 'Equity Partner'
    check (role in ('Founder','Equity Partner','Strategic Equity Partner','Advisor')),
  ownership_status text not null default 'Recorded internally'
    check (ownership_status in ('Recorded internally','Pending corporate documents','Formalized (notarized)')),
  shareholder_agreement_status text not null default 'Not Started'
    check (shareholder_agreement_status in ('Not Started','Drafting','Under Review','Signed','Notarized / Filed')),
  corporate_docs_status text not null default 'Not Started'
    check (corporate_docs_status in ('Not Started','Drafting','Under Review','Signed','Notarized / Filed')),
  vesting_summary text not null default '',
  notes text not null default '',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger equity_partner_records_set_updated_at
  before update on public.equity_partner_records
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- partner_applications — public submissions from /partner-with-ptm/apply.
-- The public API inserts ONLY these whitelisted applicant fields; commercial
-- terms, statuses beyond 'New', and internal notes can never be injected from
-- the public form. Review happens in the authenticated admin.

create table public.partner_applications (
  id uuid primary key default gen_random_uuid(),

  legal_name text not null,
  trading_name text not null default '',
  contact_person text not null,
  email text not null,
  phone text not null,
  whatsapp text not null default '',
  website text not null default '',
  address text not null default '',
  city text not null,
  state text not null default '',
  country text not null default 'Mexico',
  rfc_tax_id text not null default '',
  category text not null,
  category_other text not null default '',
  services_description text not null,
  areas_served text not null,
  languages text not null,
  years_in_business text not null default '',
  license_number text not null default '',
  real_estate_registration text not null default '',
  other_credentials text not null default '',
  credential_expiration text not null default '',

  language text not null default 'en' check (language in ('en','es')),
  consent boolean not null default false,

  status text not null default 'New'
    check (status in ('New','In Review','Converted','Rejected')),
  internal_notes text not null default '',
  reviewed_at timestamptz,
  converted_partner_id uuid references public.partners (id) on delete set null,

  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index partner_applications_status_idx on public.partner_applications (status);

create trigger partner_applications_set_updated_at
  before update on public.partner_applications
  for each row execute function public.set_updated_at();

alter table public.partners
  add constraint partners_source_application_fk
  foreign key (source_application_id) references public.partner_applications (id) on delete set null;

-- ---------------------------------------------------------------------------
-- blueprint_leads — durable copy of Blueprint lead-capture submissions
-- (Formspree remains the email notification channel). Schema seam for the
-- broader lead/client foundation; Ask Path handoffs and future Client/Case
-- entities will reference leads rather than reinventing them.

create table public.blueprint_leads (
  id uuid primary key default gen_random_uuid(),

  first_name text not null,
  email text not null,
  language text not null default 'en' check (language in ('en','es')),
  session_id text not null default '',
  readiness_score numeric check (readiness_score is null or (readiness_score >= 0 and readiness_score <= 100)),
  archetype text not null default '',
  top_destinations text not null default '',
  answers jsonb not null default '{}'::jsonb,
  source text not null default 'blueprint-v2',
  consent boolean not null default false,

  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index blueprint_leads_email_idx on public.blueprint_leads (email);

-- ---------------------------------------------------------------------------
-- Row Level Security: enabled everywhere, zero policies. Only the
-- service-role key (server-side functions) can touch these tables. The anon
-- and authenticated roles are additionally stripped of table privileges so
-- even a future permissive-policy mistake exposes nothing by default.

alter table public.partners enable row level security;
alter table public.partner_commercial_terms enable row level security;
alter table public.partner_agreements enable row level security;
alter table public.referrals enable row level security;
alter table public.equity_partner_records enable row level security;
alter table public.partner_applications enable row level security;
alter table public.blueprint_leads enable row level security;

revoke all on public.partners from anon, authenticated;
revoke all on public.partner_commercial_terms from anon, authenticated;
revoke all on public.partner_agreements from anon, authenticated;
revoke all on public.referrals from anon, authenticated;
revoke all on public.equity_partner_records from anon, authenticated;
revoke all on public.partner_applications from anon, authenticated;
revoke all on public.blueprint_leads from anon, authenticated;
