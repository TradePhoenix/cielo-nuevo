import { useEffect, useMemo, useRef } from "react";
import ClientDashboardLayout from "../components/ClientDashboardLayout";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import StatCard from "../components/StatCard";
import DocumentCard from "../components/DocumentCard";
import { useDocumentVaultState } from "../hooks/useDocumentVaultState";
import { DOCUMENT_CATEGORIES } from "../mock/mockDocuments";
import SEO from "../../../components/SEO";

function DocumentVaultContent() {
  const headingRef = useRef(null);
  useEffect(() => {
    if (headingRef.current) headingRef.current.focus();
  }, []);

  const { documents, uploadDocument } = useDocumentVaultState();

  const summary = useMemo(() => {
    const uploaded = documents.filter((doc) => doc.status === "uploaded").length;
    const missing = documents.filter((doc) => doc.status === "missing").length;
    const expiring = documents.filter((doc) => doc.status === "expiring").length;
    return { uploaded, missing, expiring };
  }, [documents]);

  const categoryName = (categoryId) => DOCUMENT_CATEGORIES.find((category) => category.id === categoryId)?.name || "Other";

  return (
    <div className="mx-auto max-w-5xl">
      <SEO
        title="Document Vault"
        description="Every document your move needs, organized in one calm, secure place."
        path="/client-dashboard/documents"
      />
      <PageHeader
        eyebrow="Document Vault"
        title="Everything important, organized in one place."
        description="Upload, review, and replace the documents your move needs — nothing forgotten, nothing scattered across email threads."
        headingRef={headingRef}
      />

      <SectionCard className="mt-10 max-w-lg">
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Uploaded" value={summary.uploaded} />
          <StatCard label="Missing" value={summary.missing} />
          <StatCard label="Expiring" value={summary.expiring} />
        </div>
      </SectionCard>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            categoryName={categoryName(document.categoryId)}
            onUpload={(file) => uploadDocument(document.id, file)}
          />
        ))}
      </div>
    </div>
  );
}

// Routed /client-dashboard/documents — a Client Dashboard V2 document
// vault, distinct from the existing /dashboard/documents feature (which
// is driven by the marketing-side Blueprint flow). Mock storage only.
export default function DocumentVaultPage() {
  return (
    <ClientDashboardLayout>
      <DocumentVaultContent />
    </ClientDashboardLayout>
  );
}
