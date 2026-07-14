import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import StageBadge from "./StageBadge";
import { formatCurrency } from "../logic/formatters";
import { formatRelativeDate } from "../logic/dateHelpers";

// Desktop table presentation of the Leads List — hidden below `lg`, where
// LeadCard's stacked layout takes over instead. Kept as a real <table> for
// semantics/accessibility rather than a div grid dressed up as one.
export default function LeadsTable({ leads, teamMemberName }) {
  return (
    <div className="hidden overflow-x-auto border border-zinc-200 bg-white lg:block">
      <table className="w-full min-w-[960px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-[0.15em] text-zinc-400">
            <th className="px-5 py-4 font-medium">Lead</th>
            <th className="px-5 py-4 font-medium">Status</th>
            <th className="px-5 py-4 font-medium">Pipeline Stage</th>
            <th className="px-5 py-4 font-medium text-right">Score</th>
            <th className="px-5 py-4 font-medium text-right">Est. Value</th>
            <th className="px-5 py-4 font-medium">Assigned To</th>
            <th className="px-5 py-4 font-medium">Next Follow-Up</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-zinc-100 last:border-b-0 hover:bg-zinc-50">
              <td className="px-5 py-4">
                <Link
                  to={`/developer/crm/leads/${lead.id}`}
                  className="font-medium text-zinc-950 hover:text-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
                >
                  {lead.fullName}
                </Link>
                <p className="text-xs text-zinc-500">{lead.currentCity} → {lead.preferredDestination}</p>
              </td>
              <td className="px-5 py-4"><StatusBadge status={lead.status} /></td>
              <td className="px-5 py-4"><StageBadge stageId={lead.pipelineStage} /></td>
              <td className="px-5 py-4 text-right font-medium text-zinc-950">{lead.leadScore}</td>
              <td className="px-5 py-4 text-right text-zinc-700">{formatCurrency(lead.estimatedValue)}</td>
              <td className="px-5 py-4 text-zinc-700">{teamMemberName(lead.assignedTeamMemberId)}</td>
              <td className="px-5 py-4 text-zinc-700">{formatRelativeDate(lead.nextFollowUpDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
