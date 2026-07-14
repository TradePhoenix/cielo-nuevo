import { useState } from "react";
import SectionCard from "./SectionCard";
import StatusPill from "./StatusPill";
import { useClientDashboardTheme } from "./ThemeContext";
import { formatCurrency, formatDate } from "../utils/formatters";

export default function InvoiceCard({ invoice }) {
  const { isDark } = useClientDashboardTheme();
  const [justActioned, setJustActioned] = useState(false);

  const mutedText = isDark ? "text-zinc-400" : "text-zinc-600";

  return (
    <SectionCard eyebrow={`Invoice #${invoice.id.replace("inv-", "")}`} title={invoice.description} action={<StatusPill status={invoice.status} />}>
      <p className={`text-2xl font-light tracking-[-0.01em] ${isDark ? "text-white" : "text-zinc-950"}`}>
        {formatCurrency(invoice.amount, invoice.currency)}
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-y-1 text-sm">
        <dt className={mutedText}>Issued</dt>
        <dd className={isDark ? "text-zinc-300" : "text-zinc-700"}>{formatDate(invoice.issuedDate)}</dd>
        <dt className={mutedText}>{invoice.status === "paid" ? "Paid" : "Due"}</dt>
        <dd className={isDark ? "text-zinc-300" : "text-zinc-700"}>
          {formatDate(invoice.status === "paid" ? invoice.paidDate : invoice.dueDate)}
        </dd>
        {invoice.method && (
          <>
            <dt className={mutedText}>Method</dt>
            <dd className={isDark ? "text-zinc-300" : "text-zinc-700"}>{invoice.method}</dd>
          </>
        )}
      </dl>

      <div className="mt-5">
        {invoice.status === "paid" && (
          <button
            type="button"
            onClick={() => setJustActioned(true)}
            className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition hover:border-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
              isDark ? "border-zinc-700 text-white" : "border-zinc-300 text-zinc-950"
            }`}
          >
            {justActioned ? "Receipt Ready ✓" : "View Receipt"}
          </button>
        )}
        {invoice.status === "outstanding" && (
          <button
            type="button"
            onClick={() => setJustActioned(true)}
            disabled={justActioned}
            className="bg-zinc-950 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 disabled:hover:translate-y-0"
          >
            {justActioned ? "Payment Started ✓" : "Pay Now"}
          </button>
        )}
      </div>
    </SectionCard>
  );
}
