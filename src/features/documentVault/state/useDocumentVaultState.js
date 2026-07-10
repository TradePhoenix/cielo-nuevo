// Document Vault — owns the client's document records. Persistence
// mirrors every other feature's pattern exactly: a single versioned
// localStorage key, discarded rather than migrated if the shape ever
// changes. No backend, no file storage — metadata only, by design.

import { useState, useEffect, useCallback } from "react";

// Exported so the Dashboard can read the same saved documents read-only,
// without duplicating this literal or its shape — same pattern as
// myMexicoPlan's own exported STORAGE_KEY.
export const STORAGE_KEY = "pathToMexico.documentVault.v1";
const STORAGE_VERSION = 1;

function loadDocuments() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (parsed.version !== STORAGE_VERSION) return [];
    return parsed.documents || [];
  } catch (error) {
    return [];
  }
}

export function useDocumentVaultState() {
  const [documents, setDocuments] = useState(loadDocuments);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, documents }));
  }, [documents]);

  const addDocument = useCallback((draft) => {
    const now = new Date().toISOString();
    const newDocument = { id: `doc-${Date.now()}`, createdAt: now, updatedAt: now, ...draft };
    setDocuments((prev) => [newDocument, ...prev]);
  }, []);

  const updateDocument = useCallback((id, updates) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, ...updates, updatedAt: new Date().toISOString() } : doc))
    );
  }, []);

  const deleteDocument = useCallback((id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  }, []);

  const markComplete = useCallback(
    (id) => {
      updateDocument(id, { status: "complete" });
    },
    [updateDocument]
  );

  return { documents, addDocument, updateDocument, deleteDocument, markComplete };
}
