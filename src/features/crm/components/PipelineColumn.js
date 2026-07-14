import PipelineLeadCard from "./PipelineLeadCard";
import { formatCurrency } from "../logic/formatters";

export default function PipelineColumn({ stage, leads, teamMemberName }) {
  const totalValue = leads.reduce((sum, lead) => sum + (lead.estimatedValue || 0), 0);

  return (
    <div className="flex w-72 shrink-0 flex-col bg-zinc-100/60">
      <div className="border-b border-zinc-200 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-700">{stage.label}</p>
        <p className="mt-1 text-xs text-zinc-400">
          {leads.length} lead{leads.length === 1 ? "" : "s"} · {formatCurrency(totalValue)}
        </p>
      </div>

      <div className="flex flex-col gap-3 p-3">
        {leads.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-zinc-400">No leads in this stage.</p>
        ) : (
          leads.map((lead) => (
            <PipelineLeadCard key={lead.id} lead={lead} teamMemberName={teamMemberName(lead.assignedTeamMemberId)} />
          ))
        )}
      </div>
    </div>
  );
}
