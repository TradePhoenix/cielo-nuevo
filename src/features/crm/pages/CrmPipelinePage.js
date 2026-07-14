import SEO from "../../../components/SEO";
import CrmShell from "../components/CrmShell";
import PipelineColumn from "../components/PipelineColumn";
import LoadingState from "../components/LoadingState";
import { useCrmState } from "../state/useCrmState";
import { PIPELINE_STAGES } from "../data/pipelineStages";

// No drag-and-drop here — CLAUDE.md's ticket explicitly says not to add it
// unless it can be done cleanly with existing dependencies, and this project
// has no drag-and-drop library. Stage changes happen from the Lead Detail
// view instead; this board is a read/scan surface.
export default function CrmPipelinePage() {
  const { leads, teamMembers, isLoading } = useCrmState();
  const teamMemberName = (id) => teamMembers.find((member) => member.id === id)?.name || "Unassigned";

  return (
    <CrmShell>
      <SEO title="CRM Pipeline" path="/developer/crm/pipeline" />
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Internal CRM</p>
      <h1 className="mt-4 text-4xl font-light tracking-[-0.03em] sm:text-5xl">Pipeline</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600">
        Every lead's position in the relocation journey, from first touch to completed move. Open a lead to change its stage.
      </p>

      <div className="mt-8">
        {isLoading ? (
          <LoadingState rows={4} />
        ) : (
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-4">
            {PIPELINE_STAGES.map((stage) => (
              <PipelineColumn
                key={stage.id}
                stage={stage}
                leads={leads.filter((lead) => lead.pipelineStage === stage.id)}
                teamMemberName={teamMemberName}
              />
            ))}
          </div>
        )}
      </div>
    </CrmShell>
  );
}
