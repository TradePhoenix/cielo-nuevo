import { useEffect, useRef, useState } from "react";
import DashboardShell from "../../dashboard/components/DashboardShell";
import DocumentCard from "../components/DocumentCard";
import DocumentForm from "../components/DocumentForm";
import DocumentFilters from "../components/DocumentFilters";
import { useDocumentVaultState } from "../state/useDocumentVaultState";
import { computeVaultSummary, filterDocuments, sortDocumentsByExpiry } from "../logic/documentFilters";

const EMPTY_FILTERS = { search: "", category: "all", status: "all" };

// Routed /dashboard/documents — the Document Vault. One calm, organized
// place for everything that matters: passports, residency paperwork,
// insurance, and everything else worth not forgetting.
export default function DocumentVaultPage() {
  const { documents, addDocument, updateDocument, deleteDocument, markComplete } = useDocumentVaultState();
  const [showAddForm, setShowAddForm] = useState(documents.length === 0);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sortByExpiry, setSortByExpiry] = useState(false);

  // Route-entry focus management, same pattern as the Dashboard itself.
  const headingRef = useRef(null);
  useEffect(() => {
    if (headingRef.current) headingRef.current.focus();
  }, []);

  const summary = computeVaultSummary(documents);

  let visibleDocuments = filterDocuments(documents, filters);
  if (sortByExpiry) {
    visibleDocuments = sortDocumentsByExpiry(visibleDocuments);
  }

  const filtersActive = filters.search.trim() !== "" || filters.category !== "all" || filters.status !== "all";

  const handleAdd = (draft) => {
    addDocument(draft);
    setShowAddForm(false);
  };

  return (
    <DashboardShell backTo="/dashboard" backLabel="Back To Dashboard">
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Document Vault</p>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] outline-none sm:text-5xl"
      >
        Everything important, organized in one calm place.
      </h1>
      <p className="mt-3 max-w-xl text-lg leading-relaxed text-zinc-600">
        Passports, residency paperwork, insurance, and everything else worth keeping track of —
        all in one place, nothing forgotten.
      </p>

      <div className="mt-8 grid max-w-md grid-cols-3 gap-4 border border-zinc-200 bg-white p-6">
        <div>
          <p className="text-2xl font-light tracking-[-0.01em]">{summary.complete}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-500">Complete</p>
        </div>
        <div>
          <p className="text-2xl font-light tracking-[-0.01em]">{summary.remaining}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-500">Remaining</p>
        </div>
        <div>
          <p className="text-2xl font-light tracking-[-0.01em]">{summary.expiringSoon}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-500">Expiring Soon</p>
        </div>
      </div>

      <div className="mt-10">
        {showAddForm ? (
          <DocumentForm
            submitLabel="Add Document"
            onSubmit={handleAdd}
            onCancel={documents.length > 0 ? () => setShowAddForm(false) : undefined}
          />
        ) : (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 bg-zinc-950 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            + Add Document
          </button>
        )}
      </div>

      {documents.length > 0 && (
        <>
          <div className="mt-8">
            <DocumentFilters
              search={filters.search}
              onSearchChange={(search) => setFilters((prev) => ({ ...prev, search }))}
              category={filters.category}
              onCategoryChange={(category) => setFilters((prev) => ({ ...prev, category }))}
              status={filters.status}
              onStatusChange={(status) => setFilters((prev) => ({ ...prev, status }))}
              sortByExpiry={sortByExpiry}
              onToggleSort={() => setSortByExpiry((prev) => !prev)}
            />
          </div>

          {visibleDocuments.length > 0 ? (
            <div className="mt-6 grid gap-4">
              {visibleDocuments.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  onUpdate={updateDocument}
                  onDelete={deleteDocument}
                  onMarkComplete={markComplete}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 border border-zinc-200 bg-white p-8 text-center">
              <p className="text-sm text-zinc-600">No documents match your filters.</p>
              {filtersActive && (
                <button
                  type="button"
                  onClick={() => {
                    setFilters(EMPTY_FILTERS);
                    setSortByExpiry(false);
                  }}
                  className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-950 underline underline-offset-4 transition hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </>
      )}
    </DashboardShell>
  );
}
