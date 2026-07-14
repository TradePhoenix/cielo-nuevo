import { useEffect, useMemo, useRef } from "react";
import ClientDashboardLayout from "../components/ClientDashboardLayout";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import StatCard from "../components/StatCard";
import InvoiceCard from "../components/InvoiceCard";
import { INVOICES } from "../mock/mockPayments";
import { formatCurrency } from "../utils/formatters";
import SEO from "../../../components/SEO";

function PaymentsContent() {
  const headingRef = useRef(null);
  useEffect(() => {
    if (headingRef.current) headingRef.current.focus();
  }, []);

  const totals = useMemo(() => {
    const sum = (status) => INVOICES.filter((invoice) => invoice.status === status).reduce((acc, invoice) => acc + invoice.amount, 0);
    return { paid: sum("paid"), outstanding: sum("outstanding"), upcoming: sum("upcoming") };
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      <SEO title="Payments" description="Every invoice for your move — paid, outstanding, and upcoming." path="/client-dashboard/payments" />
      <PageHeader
        eyebrow="Payments"
        title="Every invoice, clearly accounted for."
        description="Paid, outstanding, and upcoming — with receipts for anything already settled."
        headingRef={headingRef}
      />

      <SectionCard className="mt-10 max-w-lg">
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Paid" value={formatCurrency(totals.paid)} />
          <StatCard label="Outstanding" value={formatCurrency(totals.outstanding)} />
          <StatCard label="Upcoming" value={formatCurrency(totals.upcoming)} />
        </div>
      </SectionCard>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {INVOICES.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
    </div>
  );
}

// Routed /client-dashboard/payments
export default function PaymentsPage() {
  return (
    <ClientDashboardLayout>
      <PaymentsContent />
    </ClientDashboardLayout>
  );
}
