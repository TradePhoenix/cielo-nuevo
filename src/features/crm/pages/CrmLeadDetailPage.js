import { Link, useParams } from "react-router-dom";
import SEO from "../../../components/SEO";
import CrmShell from "../components/CrmShell";
import StatusBadge from "../components/StatusBadge";
import StageBadge from "../components/StageBadge";
import TagEditor from "../components/TagEditor";
import NotesPanel from "../components/NotesPanel";
import ActivityTimeline from "../components/ActivityTimeline";
import TaskForm from "../components/TaskForm";
import TaskRow from "../components/TaskRow";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import { useCrmState, CURRENT_USER } from "../state/useCrmState";
import { formatCurrency, formatBudgetRange } from "../logic/formatters";
import { formatDate } from "../logic/dateHelpers";
import { PIPELINE_STAGES, LEAD_STATUSES } from "../data/pipelineStages";

const selectClasses =
  "border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]";

const DOCUMENT_STATUS_LABEL = { received: "Received", pending: "Pending", needs_review: "Needs Review" };

export default function CrmLeadDetailPage() {
  const { leadId } = useParams();
  const {
    leads,
    tasks,
    teamMembers,
    partners,
    isLoading,
    addNote,
    changeStage,
    changeStatus,
    updateTags,
    addTask,
    completeTask,
    reopenTask,
  } = useCrmState();

  if (isLoading) {
    return (
      <CrmShell>
        <LoadingState rows={5} />
      </CrmShell>
    );
  }

  const lead = leads.find((entry) => entry.id === leadId);

  if (!lead) {
    return (
      <CrmShell>
        <SEO title="Lead Not Found" path={`/developer/crm/leads/${leadId}`} />
        <EmptyState
          title="This lead doesn't exist."
          description="It may have been removed, or the link is out of date."
        />
        <Link to="/developer/crm/leads" className="mt-6 inline-block text-sm font-semibold uppercase tracking-[0.15em] text-zinc-950 hover:text-[#d8a15f]">
          ← Back to Leads
        </Link>
      </CrmShell>
    );
  }

  const leadTasks = tasks.filter((task) => task.leadId === lead.id);
  const assignedMember = teamMembers.find((member) => member.id === lead.assignedTeamMemberId);
  const assignedPartners = partners.filter((partner) => lead.assignedPartnerIds.includes(partner.id));
  const resolveAuthorName = (authorId) =>
    authorId === CURRENT_USER.id ? CURRENT_USER.name : teamMembers.find((member) => member.id === authorId)?.name || "Unknown";
  const ownerName = (id) => (id === CURRENT_USER.id ? CURRENT_USER.name : teamMembers.find((member) => member.id === id)?.name || "Unassigned");

  return (
    <CrmShell>
      <SEO title={`${lead.fullName} — CRM`} path={`/developer/crm/leads/${lead.id}`} />

      <Link to="/developer/crm/leads" className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-950">
        ← Back to Leads
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-light tracking-[-0.03em] sm:text-5xl">{lead.fullName}</h1>
          <p className="mt-2 text-lg text-zinc-600">{lead.currentCity} → {lead.preferredDestination}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={lead.status} />
          <StageBadge stageId={lead.pipelineStage} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="border border-zinc-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Lead Score</p>
          <p className="mt-2 text-2xl font-light">{lead.leadScore}</p>
        </div>
        <div className="border border-zinc-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Est. Value</p>
          <p className="mt-2 text-2xl font-light">{formatCurrency(lead.estimatedValue)}</p>
        </div>
        <div className="border border-zinc-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Assigned To</p>
          <p className="mt-2 text-lg font-light">{assignedMember ? assignedMember.name : "Unassigned"}</p>
        </div>
        <div className="border border-zinc-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Blueprint</p>
          <p className="mt-2 text-lg font-light">{lead.blueprintCompleted ? "Completed" : "Not started"}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="border border-zinc-200 bg-white p-6">
            <h2 className="text-xl font-medium text-zinc-950">Contact Information</h2>
            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
              <div><dt className="text-zinc-400">Email</dt><dd className="text-zinc-800">{lead.email}</dd></div>
              <div><dt className="text-zinc-400">Phone</dt><dd className="text-zinc-800">{lead.phone}</dd></div>
              <div><dt className="text-zinc-400">WhatsApp</dt><dd className="text-zinc-800">{lead.whatsapp}</dd></div>
              <div><dt className="text-zinc-400">Country</dt><dd className="text-zinc-800">{lead.country}</dd></div>
              <div><dt className="text-zinc-400">Current City</dt><dd className="text-zinc-800">{lead.currentCity}</dd></div>
              <div><dt className="text-zinc-400">Occupation</dt><dd className="text-zinc-800">{lead.occupation}</dd></div>
              <div><dt className="text-zinc-400">Lead Source</dt><dd className="text-zinc-800">{lead.leadSource}</dd></div>
              <div><dt className="text-zinc-400">Household Size</dt><dd className="text-zinc-800">{lead.householdSize}</dd></div>
            </dl>
          </section>

          <section className="border border-zinc-200 bg-white p-6">
            <h2 className="text-xl font-medium text-zinc-950">Relocation Profile</h2>
            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
              <div><dt className="text-zinc-400">Preferred Destination</dt><dd className="text-zinc-800">{lead.preferredDestination}</dd></div>
              <div><dt className="text-zinc-400">Desired Move Date</dt><dd className="text-zinc-800">{formatDate(lead.desiredMoveDate)}</dd></div>
              <div><dt className="text-zinc-400">Budget</dt><dd className="text-zinc-800">{formatBudgetRange(lead.budget)}</dd></div>
              <div><dt className="text-zinc-400">Created</dt><dd className="text-zinc-800">{formatDate(lead.createdDate)}</dd></div>
              <div><dt className="text-zinc-400">Last Contact</dt><dd className="text-zinc-800">{formatDate(lead.lastContactDate)}</dd></div>
              <div><dt className="text-zinc-400">Next Follow-Up</dt><dd className="text-zinc-800">{formatDate(lead.nextFollowUpDate)}</dd></div>
            </dl>
          </section>

          {lead.blueprintCompleted && lead.blueprintSummary && (
            <section className="border border-zinc-200 bg-white p-6">
              <h2 className="text-xl font-medium text-zinc-950">Blueprint Summary</h2>
              <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 text-sm">
                <div><dt className="text-zinc-400">Readiness</dt><dd className="text-zinc-800">{lead.blueprintSummary.readinessLabel}</dd></div>
                <div><dt className="text-zinc-400">Top City Match</dt><dd className="text-zinc-800">{lead.blueprintSummary.topCity}</dd></div>
                <div><dt className="text-zinc-400">Completed</dt><dd className="text-zinc-800">{formatDate(lead.blueprintSummary.completedDate)}</dd></div>
              </dl>
            </section>
          )}

          <section className="border border-zinc-200 bg-white p-6">
            <h2 className="text-xl font-medium text-zinc-950">Document Summary</h2>
            {lead.documents.length === 0 ? (
              <p className="mt-3 text-sm text-zinc-400">No documents on file yet.</p>
            ) : (
              <ul className="mt-4 divide-y divide-zinc-100">
                {lead.documents.map((doc) => (
                  <li key={doc.id} className="flex items-center justify-between py-2 text-sm">
                    <span className="text-zinc-700">{doc.name}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">
                      {DOCUMENT_STATUS_LABEL[doc.status] || doc.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="border border-zinc-200 bg-white p-6">
            <h2 className="text-xl font-medium text-zinc-950">Follow-Up Tasks</h2>
            <div className="mt-4">
              <TaskForm onAddTask={(taskInput) => addTask(lead.id, taskInput)} />
            </div>
            <div className="mt-4 space-y-3">
              {leadTasks.length === 0 && <p className="text-sm text-zinc-400">No tasks yet for this lead.</p>}
              {leadTasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  ownerName={ownerName(task.ownerId)}
                  showLead={false}
                  onComplete={completeTask}
                  onReopen={reopenTask}
                />
              ))}
            </div>
          </section>

          <section className="border border-zinc-200 bg-white p-6">
            <h2 className="text-xl font-medium text-zinc-950">Activity Timeline</h2>
            <div className="mt-4">
              <ActivityTimeline activity={lead.activity} />
            </div>
          </section>

          <section className="border border-zinc-200 bg-white p-6">
            <h2 className="text-xl font-medium text-zinc-950">Internal Notes</h2>
            <div className="mt-4">
              <NotesPanel notes={lead.notes} onAddNote={(text) => addNote(lead.id, text)} resolveAuthorName={resolveAuthorName} />
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-medium text-zinc-950">Pipeline Stage</h2>
            <select
              value={lead.pipelineStage}
              onChange={(event) => {
                const stage = PIPELINE_STAGES.find((entry) => entry.id === event.target.value);
                changeStage(lead.id, stage.id, stage.label);
              }}
              aria-label="Change pipeline stage"
              className={`mt-3 w-full ${selectClasses}`}
            >
              {PIPELINE_STAGES.map((stage) => (
                <option key={stage.id} value={stage.id}>{stage.label}</option>
              ))}
            </select>
          </section>

          <section className="border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-medium text-zinc-950">Lead Status</h2>
            <select
              value={lead.status}
              onChange={(event) => changeStatus(lead.id, event.target.value)}
              aria-label="Change lead status"
              className={`mt-3 w-full ${selectClasses}`}
            >
              {LEAD_STATUSES.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </section>

          <section className="border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-medium text-zinc-950">Tags</h2>
            <div className="mt-3">
              <TagEditor tags={lead.tags} onChange={(tags) => updateTags(lead.id, tags)} />
            </div>
          </section>

          <section className="border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-medium text-zinc-950">Assigned Partners</h2>
            {assignedPartners.length === 0 ? (
              <p className="mt-3 text-sm text-zinc-400">No partners introduced yet.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {assignedPartners.map((partner) => (
                  <li key={partner.id} className="text-sm">
                    <p className="font-medium text-zinc-800">{partner.name}</p>
                    <p className="text-xs text-zinc-500">{partner.category} · {partner.city}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-medium text-zinc-950">Recommended Services</h2>
            {lead.recommendedServices.length === 0 ? (
              <p className="mt-3 text-sm text-zinc-400">No recommendations yet.</p>
            ) : (
              <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-zinc-700">
                {lead.recommendedServices.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </CrmShell>
  );
}
