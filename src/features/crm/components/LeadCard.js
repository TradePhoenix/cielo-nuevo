import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import StageBadge from "./StageBadge";
import { formatCurrency } from "../logic/formatters";
import { formatRelativeDate } from "../logic/dateHelpers";

// Mobile/compact card presentation of a lead — the Leads List's small-screen
// layout (the table is desktop-only) and reused wherever a lead needs a
// scannable summary outside the pipeline board's own denser card.
export default function LeadCard({ lead, teamMemberName }) {
  return (
    <Link
      to={`/developer/crm/leads/${lead.id}`}
      className="block border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-zinc-950 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-medium text-zinc-950">{lead.fullName}</p>
          <p className="text-sm text-zinc-500">{lead.currentCity} → {lead.preferredDestination}</p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StageBadge stageId={lead.pipelineStage} />
        {lead.blueprintCompleted && (
          <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-zinc-500">
            Blueprint complete
          </span>
        )}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
        <dt className="text-zinc-400">Lead score</dt>
        <dd className="text-right font-medium text-zinc-950">{lead.leadScore}</dd>
        <dt className="text-zinc-400">Est. value</dt>
        <dd className="text-right font-medium text-zinc-950">{formatCurrency(lead.estimatedValue)}</dd>
        <dt className="text-zinc-400">Assigned to</dt>
        <dd className="text-right text-zinc-700">{teamMemberName || "Unassigned"}</dd>
        <dt className="text-zinc-400">Next follow-up</dt>
        <dd className="text-right text-zinc-700">{formatRelativeDate(lead.nextFollowUpDate)}</dd>
      </dl>
    </Link>
  );
}
