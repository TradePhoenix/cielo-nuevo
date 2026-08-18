import { useRef, useState } from "react";
import { AdminButton, AdminSection } from "./fields";
import { STORAGE_KEY } from "../../state/usePartnerNetworkStore";

// One-time migration of the Phase 1 browser-local ledger into the database.
// Two sources: this browser's localStorage (the original working ledger) or
// an exported ptm-partner-network-*.json file. Always previews (dry run)
// before committing; never deletes or modifies the local data it reads —
// after a successful import the database is the source of truth and the
// local copy simply becomes a stale backup.

function readLocalLedger() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.partners)) return null;
    return parsed;
  } catch (error) {
    return null;
  }
}

function SummaryLine({ label, stats }) {
  const parts = [`${stats.imported} to import`];
  if (stats.duplicates) parts.push(`${stats.duplicates} already in the database`);
  if (stats.invalid) parts.push(`${stats.invalid} invalid`);
  if (stats.unmatchedPartner) parts.push(`${stats.unmatchedPartner} without a matching partner`);
  return (
    <li className="text-sm text-zinc-700">
      <span className="font-medium text-zinc-950">{label}:</span> {parts.join(" · ")}
    </li>
  );
}

export default function MigrationPanel({ store, onClose }) {
  const fileInputRef = useRef(null);
  const [payload, setPayload] = useState(null);
  const [sourceLabel, setSourceLabel] = useState("");
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const loadPreview = async (nextPayload, label) => {
    setBusy(true);
    setError("");
    setResult(null);
    const response = await store.importLegacy(nextPayload, { dryRun: true });
    setBusy(false);
    if (!response.ok) {
      setError(response.message || "Couldn't preview this import.");
      return;
    }
    setPayload(nextPayload);
    setSourceLabel(label);
    setPreview(response.data.summary);
  };

  const useThisBrowser = () => {
    const local = readLocalLedger();
    if (!local) {
      setError("No Phase 1 Partner Network records were found in this browser.");
      return;
    }
    loadPreview(local, "this browser's saved records");
  };

  const useFile = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.partners)) {
          setError("That file doesn't look like a Partner Network export.");
          return;
        }
        loadPreview(parsed, `“${file.name}”`);
      } catch (readError) {
        setError("Couldn't read that file as JSON.");
      }
    };
    reader.readAsText(file);
  };

  const commit = async () => {
    if (!payload) return;
    setBusy(true);
    setError("");
    const response = await store.importLegacy(payload, { dryRun: false });
    setBusy(false);
    if (!response.ok) {
      setError(response.message || "The import failed — no local data was changed.");
      return;
    }
    setPreview(null);
    setPayload(null);
    setResult(response.data.summary);
  };

  return (
    <AdminSection
      title="Migrate Phase 1 Records"
      badge={
        <AdminButton tone="quiet" onClick={onClose}>
          Close
        </AdminButton>
      }
    >
      <p className="text-sm leading-relaxed text-zinc-600">
        Partner Network started as a browser-local ledger. Import those records into the database here — from this
        browser or from an exported JSON backup. Importing never deletes local data; duplicates already in the
        database are skipped automatically.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <AdminButton tone="quiet" onClick={useThisBrowser} disabled={busy}>
          Read This Browser's Records
        </AdminButton>
        <AdminButton tone="quiet" onClick={() => fileInputRef.current?.click()} disabled={busy}>
          Choose Export File…
        </AdminButton>
        <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={useFile} />
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-[#b3543f]">
          {error}
        </p>
      )}

      {busy && (
        <p role="status" className="mt-4 text-sm text-zinc-500">
          Working…
        </p>
      )}

      {preview && !busy && (
        <div className="mt-5 border border-zinc-200 bg-[#f6f1e8] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Preview — from {sourceLabel}
          </p>
          <ul className="mt-2 space-y-1">
            <SummaryLine label="Partners" stats={preview.partners} />
            <SummaryLine label="Referrals" stats={preview.referrals} />
            <SummaryLine label="Agreements" stats={preview.agreements} />
            <SummaryLine label="Equity records" stats={preview.equityPartners} />
          </ul>
          {preview.issues.length > 0 && (
            <ul className="mt-3 space-y-1 border-t border-zinc-200 pt-3">
              {preview.issues.map((issue, i) => (
                <li key={i} className="text-xs text-zinc-500">
                  {issue}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4">
            <AdminButton onClick={commit} disabled={busy}>
              Import These Records
            </AdminButton>
          </div>
        </div>
      )}

      {result && !busy && (
        <div className="mt-5 border border-zinc-200 bg-[#eef3ec] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2f5d3a]">Import complete</p>
          <ul className="mt-2 space-y-1">
            <SummaryLine label="Partners" stats={result.partners} />
            <SummaryLine label="Referrals" stats={result.referrals} />
            <SummaryLine label="Agreements" stats={result.agreements} />
            <SummaryLine label="Equity records" stats={result.equityPartners} />
          </ul>
          <p className="mt-3 text-xs text-zinc-600">
            The database is now the source of truth. Your browser copy was not modified — keep it (or an export) as a
            backup until you've verified everything above.
          </p>
        </div>
      )}
    </AdminSection>
  );
}
