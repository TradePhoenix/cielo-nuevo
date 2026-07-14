import { Link } from "react-router-dom";
import { formatCurrency } from "../logic/formatters";
import { formatRelativeDate } from "../logic/dateHelpers";

// Compact card for the Pipeline Board's columns — denser than LeadCard
// since a column can hold many cards at once.
export default function PipelineLeadCard({ lead, teamMemberName }) {
  return (
    <Link
      to={`/developer/crm/leads/${lead.id}`}
      className="block border border-zinc-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-zinc-950 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
    >
      <p className="font-medium text-zinc-950">{lead.fullName}</p>
      <p className="mt-0.5 text-xs text-zinc-500">{lead.preferredDestination}</p>

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="font-medium text-zinc-700">{formatCurrency(lead.estimatedValue)}</span>
        <span className="text-zinc-400">Score {lead.leadScore}</span>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
        <span>{teamMemberName}</span>
        <span>{formatRelativeDate(lead.nextFollowUpDate)}</span>
      </div>
    </Link>
  );
}
