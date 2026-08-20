import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../../components/SEO";
import { usePartnerNetworkApiStore } from "../state/usePartnerNetworkApiStore";
import AdminLoginGate from "../components/admin/AdminLoginGate";
import ApplicationsPanel from "../components/admin/ApplicationsPanel";
import PartnersPanel from "../components/admin/PartnersPanel";
import ReferralsPanel from "../components/admin/ReferralsPanel";
import EquityPanel from "../components/admin/EquityPanel";
import MigrationPanel from "../components/admin/MigrationPanel";
import { AdminButton } from "../components/admin/fields";

// Partner Network admin — now a real authenticated surface (DATA-001).
// Access is enforced server-side: every /api/admin/* call validates the
// httpOnly session cookie, so this page renders private records only after
// sign-in. Records live in the PTM database (Supabase Postgres); the old
// browser-localStorage ledger is importable once via the Migration panel and
// is never modified by this page.
const TABS = ["Applications", "Partners", "Referrals", "Equity & Strategic"];

function SaveIndicator({ saveState, onRetry }) {
  if (saveState === "idle") return null;
  if (saveState === "error") {
    return (
      <span className="flex items-center gap-2 text-xs text-[#b3543f]">
        Save failed
        <AdminButton tone="quiet" onClick={onRetry}>
          Retry
        </AdminButton>
      </span>
    );
  }
  return (
    <span className="text-xs text-zinc-400" role="status">
      {saveState === "saving" ? "Saving…" : "Saved"}
    </span>
  );
}

export default function PartnerNetworkAdminPage() {
  const store = usePartnerNetworkApiStore();
  const [tab, setTab] = useState(1); // default to Partners; Applications keeps its queue badge visible
  const [showMigration, setShowMigration] = useState(false);

  const exportRecords = () => {
    const snapshot = {
      exportedAt: new Date().toISOString(),
      source: "ptm-database",
      partners: store.partners,
      referrals: store.referrals,
      agreements: store.agreements,
      equityPartners: store.equityPartners,
      applications: store.applications,
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ptm-partner-network-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const newApplications = store.applications.filter((a) => a.status === "New").length;

  if (store.connection !== "ready") {
    return (
      <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
        <SEO title="Partner Network Admin" path="/partner-network/admin" noindex />
        <AdminLoginGate connection={store.connection} onLogin={store.login} onRetry={store.refresh} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <SEO title="Partner Network Admin" path="/partner-network/admin" noindex />

      <div className="border-b border-zinc-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <div className="flex items-baseline gap-4">
            <Link
              to="/developer-dashboard"
              className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-700 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
            >
              Path To Mexico
            </Link>
            <span className="text-xs uppercase tracking-[0.16em] text-zinc-400">Partner Network · Internal</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <SaveIndicator saveState={store.saveState} onRetry={store.retrySave} />
            <AdminButton tone="quiet" onClick={exportRecords}>
              Export Records
            </AdminButton>
            <AdminButton tone="quiet" onClick={() => setShowMigration((v) => !v)}>
              Migrate Phase 1 Data
            </AdminButton>
            <AdminButton tone="quiet" onClick={store.logout}>
              Sign Out{store.adminEmail ? ` (${store.adminEmail})` : ""}
            </AdminButton>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 sm:py-10">
        <div className="print:hidden">
          <h1 className="text-3xl font-light tracking-[-0.03em] sm:text-4xl">Partner Network</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
            Onboarding, agreements, referral tracking, and compliance for PTM's professional partners. Records are
            stored securely in the PTM database and require an admin sign-in.
          </p>

          {showMigration && (
            <div className="mt-6">
              <MigrationPanel store={store} onClose={() => setShowMigration(false)} />
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-2 border-b border-zinc-200 pb-px" role="tablist" aria-label="Partner Network sections">
            {TABS.map((label, i) => (
              <button
                key={label}
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] ${
                  tab === i
                    ? "border border-zinc-200 border-b-white bg-white text-zinc-950"
                    : "text-zinc-500 hover:text-zinc-950"
                }`}
              >
                {label}
                {i === 0 && newApplications > 0 ? ` (${newApplications} new)` : ""}
                {i === 1 && store.partners.length > 0 ? ` (${store.partners.length})` : ""}
                {i === 2 && store.referrals.length > 0 ? ` (${store.referrals.length})` : ""}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {tab === 0 && <ApplicationsPanel store={store} />}
          {tab === 1 && <PartnersPanel store={store} />}
          {tab === 2 && <ReferralsPanel store={store} />}
          {tab === 3 && <EquityPanel store={store} />}
        </div>
      </div>
    </main>
  );
}
