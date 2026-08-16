import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../../components/SEO";
import { usePartnerNetworkStore, STORAGE_KEY } from "../state/usePartnerNetworkStore";
import PartnersPanel from "../components/admin/PartnersPanel";
import ReferralsPanel from "../components/admin/ReferralsPanel";
import EquityPanel from "../components/admin/EquityPanel";
import { AdminButton } from "../components/admin/fields";

// Internal Partner Network admin — the same access model as the existing
// /dashboard and /developer-dashboard internal surfaces: an unlinked,
// robots-disallowed route with NO auth (none exists in this project, by
// standing architecture decision). Privately entered records live only in
// this browser's localStorage — they are never transmitted anywhere and are
// not present in the site bundle, so visitors who find this URL see an empty
// ledger, not PTM's data. Export/Import below is the backup story: browser
// storage can be lost to a cache clear, so the working ledger should be
// exported to a file regularly.
const TABS = ["Partners", "Referrals", "Equity & Strategic"];

export default function PartnerNetworkAdminPage() {
  const store = usePartnerNetworkStore();
  const [tab, setTab] = useState(0);
  const fileInputRef = useRef(null);

  const exportRecords = () => {
    const raw = window.localStorage.getItem(STORAGE_KEY) || "{}";
    const blob = new Blob([raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ptm-partner-network-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importRecords = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.partners)) {
          window.alert("That file doesn't look like a Partner Network export.");
          return;
        }
        if (window.confirm("Replace the records in this browser with the imported file?")) {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          window.location.reload();
        }
      } catch (error) {
        window.alert("Couldn't read that file as JSON.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <SEO title="Partner Network Admin" path="/partner-network/admin" />

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
          <div className="flex gap-2">
            <AdminButton tone="quiet" onClick={exportRecords}>
              Export Records
            </AdminButton>
            <AdminButton tone="quiet" onClick={() => fileInputRef.current?.click()}>
              Import
            </AdminButton>
            <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={importRecords} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 sm:py-10">
        <div className="print:hidden">
          <h1 className="text-3xl font-light tracking-[-0.03em] sm:text-4xl">Partner Network</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
            Onboarding, agreements, referral tracking, and compliance for PTM's professional partners. Records are
            stored privately in this browser — export regularly to keep a backup.
          </p>

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
                {i === 0 && store.partners.length > 0 ? ` (${store.partners.length})` : ""}
                {i === 1 && store.referrals.length > 0 ? ` (${store.referrals.length})` : ""}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {tab === 0 && <PartnersPanel store={store} />}
          {tab === 1 && <ReferralsPanel store={store} />}
          {tab === 2 && <EquityPanel store={store} />}
        </div>
      </div>
    </main>
  );
}
