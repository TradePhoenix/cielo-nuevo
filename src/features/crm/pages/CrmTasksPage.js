import SEO from "../../../components/SEO";
import CrmShell from "../components/CrmShell";
import TaskRow from "../components/TaskRow";
import LoadingState from "../components/LoadingState";
import { useCrmState, CURRENT_USER } from "../state/useCrmState";
import { buildTaskBuckets, sortByPriority } from "../logic/taskBuckets";

const COLUMNS = [
  { key: "overdue", label: "Overdue", tone: "text-rose-700" },
  { key: "dueToday", label: "Due Today", tone: "text-amber-700" },
  { key: "upcoming", label: "Upcoming", tone: "text-zinc-950" },
  { key: "completed", label: "Completed", tone: "text-emerald-700" },
];

export default function CrmTasksPage() {
  const { leads, tasks, teamMembers, isLoading, completeTask, reopenTask } = useCrmState();
  const buckets = buildTaskBuckets(tasks);

  const leadName = (id) => leads.find((lead) => lead.id === id)?.fullName || "Unknown Lead";
  const ownerName = (id) => (id === CURRENT_USER.id ? CURRENT_USER.name : teamMembers.find((member) => member.id === id)?.name || "Unassigned");

  return (
    <CrmShell>
      <SEO title="CRM Tasks" path="/developer/crm/tasks" />
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Internal CRM</p>
      <h1 className="mt-4 text-4xl font-light tracking-[-0.03em] sm:text-5xl">Tasks</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600">
        Every follow-up across the pipeline, grouped by urgency.
      </p>

      <div className="mt-8">
        {isLoading ? (
          <LoadingState rows={4} />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {COLUMNS.map((column) => {
              const columnTasks = column.key === "dueToday" ? sortByPriority(buckets[column.key]) : buckets[column.key];
              return (
                <div key={column.key}>
                  <h2 className={`text-sm font-semibold uppercase tracking-[0.15em] ${column.tone}`}>
                    {column.label} <span className="text-zinc-400">({columnTasks.length})</span>
                  </h2>

                  <div className="mt-4 space-y-3">
                    {columnTasks.length === 0 && <p className="text-sm text-zinc-400">Nothing here.</p>}
                    {columnTasks.map((task) => (
                      <TaskRow
                        key={task.id}
                        task={task}
                        ownerName={ownerName(task.ownerId)}
                        leadName={leadName(task.leadId)}
                        onComplete={completeTask}
                        onReopen={reopenTask}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </CrmShell>
  );
}
