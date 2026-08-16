import { useCallback, useEffect, useState } from "react";
import {
  createPartner,
  createReferral,
  createAgreement,
  createEquityPartner,
} from "../logic/model";
import { AGREEMENT_VERSION } from "../data/agreementTemplate";

// Partner Network Phase 1 store — the same versioned-localStorage idiom as
// every other feature (see useBlueprintState.js / useDocumentVaultState.js).
// IMPORTANT SCOPE NOTE: with no backend in this project, these records live
// only in the browser where they were entered. That makes the admin surface a
// private working ledger on Kalen's own machine — nothing here is transmitted
// anywhere. When a real backend is scoped (Phase 2 decision), this hook is
// the only file that needs to change: the entity shapes in logic/model.js are
// already the API contract.
export const STORAGE_KEY = "pathToMexico.partnerNetwork.v1";
const STORAGE_VERSION = 1;

const EMPTY = {
  partners: [],
  referrals: [],
  agreements: [],
  equityPartners: [],
};

function loadInitialState() {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    // Same policy as the Blueprint store: an incompatible saved shape is
    // discarded, never migrated.
    if (parsed.version !== STORAGE_VERSION) return EMPTY;
    return {
      partners: Array.isArray(parsed.partners) ? parsed.partners : [],
      referrals: Array.isArray(parsed.referrals) ? parsed.referrals : [],
      agreements: Array.isArray(parsed.agreements) ? parsed.agreements : [],
      equityPartners: Array.isArray(parsed.equityPartners) ? parsed.equityPartners : [],
    };
  } catch (error) {
    return EMPTY;
  }
}

export function usePartnerNetworkStore() {
  const [state, setState] = useState(loadInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, ...state })
      );
    } catch (error) {
      // Quota/private-mode failure — records simply won't persist.
    }
  }, [state]);

  const touch = (record) => ({ ...record, updatedAt: new Date().toISOString() });

  // --- Partners -----------------------------------------------------------
  const addPartner = useCallback((overrides = {}) => {
    const partner = createPartner(overrides);
    setState((prev) => ({ ...prev, partners: [partner, ...prev.partners] }));
    return partner;
  }, []);

  const updatePartner = useCallback((id, patch) => {
    setState((prev) => ({
      ...prev,
      partners: prev.partners.map((p) =>
        p.id === id ? touch({ ...p, ...patch, lastActivityAt: new Date().toISOString() }) : p
      ),
    }));
  }, []);

  const deletePartner = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      partners: prev.partners.filter((p) => p.id !== id),
      agreements: prev.agreements.filter((a) => a.partnerId !== id),
      referrals: prev.referrals.filter((r) => r.partnerId !== id),
    }));
  }, []);

  // --- Referrals ----------------------------------------------------------
  const addReferral = useCallback((overrides = {}) => {
    const referral = createReferral(overrides);
    setState((prev) => ({ ...prev, referrals: [referral, ...prev.referrals] }));
    return referral;
  }, []);

  const updateReferral = useCallback((id, patch) => {
    setState((prev) => ({
      ...prev,
      referrals: prev.referrals.map((r) => (r.id === id ? touch({ ...r, ...patch }) : r)),
    }));
  }, []);

  const deleteReferral = useCallback((id) => {
    setState((prev) => ({ ...prev, referrals: prev.referrals.filter((r) => r.id !== id) }));
  }, []);

  // --- Agreements ---------------------------------------------------------
  const addAgreement = useCallback((partnerId) => {
    const agreement = createAgreement(partnerId, AGREEMENT_VERSION);
    setState((prev) => ({ ...prev, agreements: [agreement, ...prev.agreements] }));
    return agreement;
  }, []);

  const updateAgreement = useCallback((id, patch) => {
    setState((prev) => ({
      ...prev,
      agreements: prev.agreements.map((a) => (a.id === id ? touch({ ...a, ...patch }) : a)),
    }));
  }, []);

  const deleteAgreement = useCallback((id) => {
    setState((prev) => ({ ...prev, agreements: prev.agreements.filter((a) => a.id !== id) }));
  }, []);

  // --- Equity / strategic ownership records -------------------------------
  const addEquityPartner = useCallback((overrides = {}) => {
    const record = createEquityPartner(overrides);
    setState((prev) => ({ ...prev, equityPartners: [...prev.equityPartners, record] }));
    return record;
  }, []);

  const updateEquityPartner = useCallback((id, patch) => {
    setState((prev) => ({
      ...prev,
      equityPartners: prev.equityPartners.map((e) => (e.id === id ? touch({ ...e, ...patch }) : e)),
    }));
  }, []);

  const deleteEquityPartner = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      equityPartners: prev.equityPartners.filter((e) => e.id !== id),
    }));
  }, []);

  return {
    ...state,
    addPartner,
    updatePartner,
    deletePartner,
    addReferral,
    updateReferral,
    deleteReferral,
    addAgreement,
    updateAgreement,
    deleteAgreement,
    addEquityPartner,
    updateEquityPartner,
    deleteEquityPartner,
  };
}
