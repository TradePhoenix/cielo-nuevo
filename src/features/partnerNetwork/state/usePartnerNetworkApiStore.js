// Partner Network store, database edition — the backend replacement for
// usePartnerNetworkStore.js promised by that file's own scope note ("this
// hook is the only file that needs to change"). It preserves the exact
// mutation interface the admin panels already consume (synchronous optimistic
// updates, add* returning the created record) and adds:
//
//   connection : "loading" | "auth-required" | "not-configured" | "error" | "ready"
//   saveState  : "idle" | "saving" | "saved" | "error"
//   login / logout / refresh / retrySave
//   applications + review/convert operations
//   importLegacy (Phase 1 localStorage → database migration)
//
// Persistence model: state updates apply instantly (the panels are working
// ledgers, not submit-forms); each touched record is queued and flushed to
// the API — debounced for keystroke edits, immediate for create/delete. A
// failed flush keeps the operation queued (nothing is silently dropped),
// surfaces saveState "error", and an expired session flips connection to
// "auth-required" so signing back in resumes the queue.

import { useCallback, useEffect, useRef, useState } from "react";
import { createPartner, createReferral, createAgreement, createEquityPartner } from "../logic/model";
import { AGREEMENT_VERSION } from "../data/agreementTemplate";
import { adminApi, makeUuid } from "../api/adminApi";

const EMPTY = {
  partners: [],
  referrals: [],
  agreements: [],
  equityPartners: [],
  applications: [],
};

// resource key in state -> API resource segment
const RESOURCES = {
  partners: "partners",
  referrals: "referrals",
  agreements: "agreements",
  equityPartners: "equity",
};

const SAVE_DEBOUNCE_MS = 700;

export function usePartnerNetworkApiStore() {
  const [connection, setConnection] = useState("loading");
  const [adminEmail, setAdminEmail] = useState("");
  const [state, setState] = useState(EMPTY);
  const [saveState, setSaveState] = useState("idle");

  // stateRef mirrors state SYNCHRONOUSLY (React re-renders lag behind, and
  // the outbox can flush before a re-render happens). Every state change must
  // go through applyState so ref and state never diverge.
  const stateRef = useRef(state);
  const applyState = useCallback((updater) => {
    stateRef.current = typeof updater === "function" ? updater(stateRef.current) : updater;
    setState(stateRef.current);
  }, []);

  // key `${collection}:${id}` -> { collection, id, method } (order preserved)
  const pendingRef = useRef(new Map());
  const flushTimerRef = useRef(null);
  const isFlushingRef = useRef(false);
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
    };
  }, []);

  const loadLedger = useCallback(async () => {
    const result = await adminApi.fetchLedger();
    if (!mountedRef.current) return;
    if (result.ok) {
      applyState({ ...EMPTY, ...result.data });
      setConnection("ready");
      return;
    }
    if (result.status === 401) setConnection("auth-required");
    else if (result.error === "backend_not_configured" || result.error === "network_error" || result.error === "invalid_response")
      setConnection("not-configured");
    else setConnection("error");
  }, [applyState]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const session = await adminApi.session();
      if (cancelled || !mountedRef.current) return;
      if (session.ok && session.data.authenticated) {
        setAdminEmail(session.data.email || "");
        await loadLedger();
      } else if (session.ok && session.data.reason === "backend_not_configured") {
        setConnection("not-configured");
      } else if (session.ok) {
        setConnection("auth-required");
      } else {
        setConnection("not-configured");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadLedger]);

  // --- outbox --------------------------------------------------------------

  const flush = useCallback(async () => {
    if (isFlushingRef.current) return;
    isFlushingRef.current = true;
    try {
      while (pendingRef.current.size > 0) {
        const [key, op] = pendingRef.current.entries().next().value;
        pendingRef.current.delete(key);
        let result;
        if (op.method === "DELETE") {
          result = await adminApi.deleteRecord(RESOURCES[op.collection], op.id);
        } else if (op.collection === "applications") {
          const record = stateRef.current.applications.find((a) => a.id === op.id);
          if (!record) continue;
          result = await adminApi.reviewApplication(op.id, {
            status: record.status,
            internalNotes: record.internalNotes,
          });
        } else {
          const record = stateRef.current[op.collection]?.find((r) => r.id === op.id);
          if (!record) continue; // deleted while queued
          result = await adminApi.saveRecord(RESOURCES[op.collection], record, { isNew: op.method === "POST" });
        }
        if (!result.ok) {
          // Requeue at the front so nothing is lost, then surface the failure.
          pendingRef.current = new Map([[key, op], ...pendingRef.current]);
          if (mountedRef.current) {
            setSaveState("error");
            if (result.status === 401) setConnection("auth-required");
          }
          return;
        }
      }
      if (mountedRef.current) setSaveState("saved");
    } finally {
      isFlushingRef.current = false;
    }
  }, []);

  const enqueue = useCallback(
    (collection, id, method, { immediate = false } = {}) => {
      const key = `${collection}:${id}`;
      const existing = pendingRef.current.get(key);
      // A queued POST followed by edits stays a POST (the record hasn't been
      // created server-side yet); a DELETE supersedes everything else.
      const nextMethod =
        method === "DELETE" ? "DELETE" : existing?.method === "POST" ? "POST" : method;
      pendingRef.current.delete(key);
      pendingRef.current.set(key, { collection, id, method: nextMethod });
      setSaveState("saving");
      if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
      if (immediate) {
        flush();
      } else {
        flushTimerRef.current = setTimeout(flush, SAVE_DEBOUNCE_MS);
      }
    },
    [flush]
  );

  const retrySave = useCallback(() => {
    if (pendingRef.current.size > 0) {
      setSaveState("saving");
      flush();
    }
  }, [flush]);

  // --- auth ----------------------------------------------------------------

  const login = useCallback(
    async (email, password) => {
      const result = await adminApi.login(email, password);
      if (result.ok) {
        setAdminEmail(result.data.email || email);
        setConnection("loading");
        await loadLedger();
        // A session that expired mid-edit may have queued work — resume it.
        if (pendingRef.current.size > 0) flush();
        return { ok: true };
      }
      return { ok: false, error: result.error, message: result.message };
    },
    [loadLedger, flush]
  );

  const logout = useCallback(async () => {
    await adminApi.logout();
    pendingRef.current.clear();
    applyState(EMPTY);
    setAdminEmail("");
    setSaveState("idle");
    setConnection("auth-required");
  }, [applyState]);

  const refresh = useCallback(() => {
    setConnection("loading");
    return loadLedger();
  }, [loadLedger]);

  // --- shared mutation helpers --------------------------------------------

  const touch = (record) => ({ ...record, updatedAt: new Date().toISOString() });

  const addRecord = useCallback(
    (collection, record) => {
      applyState((prev) => ({ ...prev, [collection]: [record, ...prev[collection]] }));
      enqueue(collection, record.id, "POST", { immediate: true });
      return record;
    },
    [applyState, enqueue]
  );

  const patchRecord = useCallback(
    (collection, id, patch, extra = {}) => {
      applyState((prev) => ({
        ...prev,
        [collection]: prev[collection].map((r) => (r.id === id ? touch({ ...r, ...patch, ...extra }) : r)),
      }));
      enqueue(collection, id, "PUT");
    },
    [applyState, enqueue]
  );

  const removeRecord = useCallback(
    (collection, id, alsoRemove = {}) => {
      applyState((prev) => {
        const next = { ...prev, [collection]: prev[collection].filter((r) => r.id !== id) };
        for (const [otherCollection, matcher] of Object.entries(alsoRemove)) {
          next[otherCollection] = prev[otherCollection].filter((r) => !matcher(r));
        }
        return next;
      });
      // Cascades are server-side (FK on delete cascade); local removal of
      // children just mirrors what the database will do.
      enqueue(collection, id, "DELETE", { immediate: true });
    },
    [applyState, enqueue]
  );

  // --- Partners ------------------------------------------------------------

  const addPartner = useCallback(
    (overrides = {}) => addRecord("partners", createPartner({ id: makeUuid(), ...overrides })),
    [addRecord]
  );

  const updatePartner = useCallback(
    (id, patch) => patchRecord("partners", id, patch, { lastActivityAt: new Date().toISOString() }),
    [patchRecord]
  );

  const deletePartner = useCallback(
    (id) =>
      removeRecord("partners", id, {
        agreements: (a) => a.partnerId === id,
        referrals: (r) => r.partnerId === id,
      }),
    [removeRecord]
  );

  // --- Referrals -----------------------------------------------------------

  const addReferral = useCallback(
    (overrides = {}) => addRecord("referrals", createReferral({ id: makeUuid(), ...overrides })),
    [addRecord]
  );
  const updateReferral = useCallback((id, patch) => patchRecord("referrals", id, patch), [patchRecord]);
  const deleteReferral = useCallback((id) => removeRecord("referrals", id), [removeRecord]);

  // --- Agreements ----------------------------------------------------------

  const addAgreement = useCallback(
    (partnerId) =>
      addRecord("agreements", createAgreement(partnerId, AGREEMENT_VERSION, { id: makeUuid() })),
    [addRecord]
  );
  const updateAgreement = useCallback((id, patch) => patchRecord("agreements", id, patch), [patchRecord]);
  const deleteAgreement = useCallback((id) => removeRecord("agreements", id), [removeRecord]);

  // --- Equity --------------------------------------------------------------

  const addEquityPartner = useCallback(
    (overrides = {}) => {
      const record = createEquityPartner({ id: makeUuid(), ...overrides });
      applyState((prev) => ({ ...prev, equityPartners: [...prev.equityPartners, record] }));
      enqueue("equityPartners", record.id, "POST", { immediate: true });
      return record;
    },
    [applyState, enqueue]
  );
  const updateEquityPartner = useCallback((id, patch) => patchRecord("equityPartners", id, patch), [patchRecord]);
  const deleteEquityPartner = useCallback((id) => removeRecord("equityPartners", id), [removeRecord]);

  // --- Applications --------------------------------------------------------

  const updateApplication = useCallback((id, patch) => patchRecord("applications", id, patch), [patchRecord]);

  const convertApplication = useCallback(
    async (id) => {
      const result = await adminApi.convertApplication(id);
      if (!result.ok) return { ok: false, message: result.message };
      applyState((prev) => ({
        ...prev,
        applications: prev.applications.map((a) => (a.id === id ? result.data.application : a)),
        partners: result.data.partner ? [result.data.partner, ...prev.partners] : prev.partners,
      }));
      return { ok: true, partner: result.data.partner };
    },
    [applyState]
  );

  // --- Legacy migration ----------------------------------------------------

  const importLegacy = useCallback(
    async (payload, { dryRun = true } = {}) => {
      const result = await adminApi.importLegacy(payload, { dryRun });
      if (result.ok && !dryRun) await loadLedger();
      return result;
    },
    [loadLedger]
  );

  return {
    ...state,
    connection,
    adminEmail,
    saveState,
    hasPendingSaves: pendingRef.current.size > 0,
    login,
    logout,
    refresh,
    retrySave,
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
    updateApplication,
    convertApplication,
    importLegacy,
  };
}
