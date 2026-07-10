import { Link } from "react-router-dom";
import ModuleCard from "./ModuleCard";

// The Dashboard-side entry point into the Document Vault — reads a
// read-only summary computed from the Vault's own storage, the same
// pattern already used for My Mexico Plan's data on this page.
export default function DocumentVaultSummaryModule({ documentVaultSummary }) {
  const { total, complete, remaining, expiringSoon } = documentVaultSummary;

  if (total === 0) {
    return (
      <ModuleCard eyebrow="Document Vault" title="Nothing added yet">
        <p className="text-sm leading-relaxed text-zinc-600">
          Keep passports, residency paperwork, and everything else important in one calm,
          organized place.
        </p>
        <Link
          to="/dashboard/documents"
          className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 underline underline-offset-4 transition hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Add Your First Document
        </Link>
      </ModuleCard>
    );
  }

  const stats = [
    { label: "Complete", value: complete },
    { label: "Remaining", value: remaining },
    { label: "Expiring Soon", value: expiringSoon },
  ];

  return (
    <ModuleCard
      eyebrow="Document Vault"
      title={`${complete} Of ${total} Complete`}
      action={
        <Link
          to="/dashboard/documents"
          className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Open Vault
        </Link>
      }
    >
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl font-light tracking-[-0.01em]">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>
      <Link
        to="/dashboard/documents"
        className="mt-5 inline-flex items-center gap-2 border border-zinc-950 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        Quick Add Document
      </Link>
    </ModuleCard>
  );
}
