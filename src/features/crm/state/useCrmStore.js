// PTM launch CRM — lead store. Modeled on useBlueprintState.js: local
// state persisted to a versioned localStorage key, no backend.
//
// PERSISTENCE HONESTY: records live in THIS browser profile only. That is
// a deliberate interim choice (documented in the launch scorecard): it
// keeps real lead PII off the publicly-reachable /developer-dashboard
// route — a visitor who finds the URL sees an empty CRM, never Kalen's
// data — but it also means clearing browser storage loses the pipeline.
// Export/Import below is the backup path until a server-side store (which
// first requires auth on this route + a storage-provider decision) exists.
// The store starts EMPTY — no seed/mock/fixture records, ever.
import { useState, useEffect, useCallback } from "react";
import { createLead, applyLeadUpdate, isValidLeadArray } from "../logic/leadModel";

export const CRM_STORAGE_KEY = "pathToMexico.crm.v2";
const STORAGE_VERSION = 2;

function loadInitialLeads() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CRM_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (parsed.version !== STORAGE_VERSION) return [];
    return isValidLeadArray(parsed.leads) ? parsed.leads : [];
  } catch (error) {
    return [];
  }
}

export function useCrmStore() {
  const [leads, setLeads] = useState(loadInitialLeads);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        CRM_STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, leads })
      );
    } catch (error) {
      // Storage full/unavailable: keep the in-memory session usable.
    }
  }, [leads]);

  const addLead = useCallback((input) => {
    const lead = createLead(input);
    setLeads((prev) => [lead, ...prev]);
    return lead;
  }, []);

  const updateLead = useCallback((id, patch) => {
    setLeads((prev) => prev.map((lead) => (lead.id === id ? applyLeadUpdate(lead, patch) : lead)));
  }, []);

  const removeLead = useCallback((id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  }, []);

  const exportJson = useCallback(() => {
    return JSON.stringify({ version: STORAGE_VERSION, exportedAt: new Date().toISOString(), leads }, null, 2);
  }, [leads]);

  // Replaces the current book of leads with a previously exported backup.
  // Returns an error string, or null on success.
  const importJson = useCallback((text) => {
    try {
      const parsed = JSON.parse(text);
      if (!isValidLeadArray(parsed.leads)) return "Not a valid PTM CRM export file.";
      setLeads(parsed.leads);
      return null;
    } catch (error) {
      return "Could not read that file as JSON.";
    }
  }, []);

  return { leads, addLead, updateLead, removeLead, exportJson, importJson };
}
