import { Link } from "react-router-dom";
import SEO from "../../../components/SEO";
import CrmShell from "../components/CrmShell";
import StatCard from "../components/StatCard";
import LoadingState from "../components/LoadingState";
import ActivityTimeline from "../components/ActivityTimeline";
import StageBadge from "../components/StageBadge";
import { useCrmState } from "../state/useCrmState";
import { buildCrmMetrics } from "../logic/buildCrmMetrics";
import { formatCurrency } from "../logic/formatters";

export default function CrmDashboardPage() {
  const { leads, tasks, isLoading } = useCrmState();
  const metrics = buildCrmMetrics(leads, tasks);

  return (
    <CrmShell>
      <SEO title="CRM Dashboard" path="/developer/crm" />
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Internal CRM</p>
      <h1 className="mt-4 text-4xl font-light tracking-[-0.03em] sm:text-5xl">Dashboard</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600">
        A live snapshot of every lead, client, and follow-up moving through Path To Mexico.
      </p>

      {isLoading ? (
        <div className="mt-10">
          <LoadingState rows={4} />
        </div>
      ) : (
        <div className="mt-10 space-y-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <StatCard label="Total Leads" value={metrics.totalLeads} />
            <StatCard label="New Leads" value={metrics.newLeads} />
            <StatCard label="Consultations Scheduled" value={metrics.consultationsScheduled} />
            <StatCard label="Active Relocation Clients" value={metrics.activeRelocationClients} />
            <StatCard label="Completed Clients" value={metrics.completedClients} tone="positive" />
            <StatCard label="Estimated Pipeline Value" value={formatCurrency(metrics.estimatedPipelineValue)} />
            <StatCard label="Conversion Rate" value={`${metrics.conversionRate}%`} tone="positive" />
            <StatCard
              label="Overdue Tasks"
              value={metrics.overdueTasksCount}
              tone={metrics.overdueTasksCount > 0 ? "warning" : "default"}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="border border-zinc-200 bg-white p-6 lg:col-span-2">
              <h2 className="text-xl font-medium text-zinc-950">Leads Requiring Attention</h2>
              <p className="mt-1 text-sm text-zinc-500">Overdue follow-ups and high-score leads gone quiet.</p>

              <ul className="mt-5 space-y-3">
                {metrics.leadsRequiringAttention.length === 0 && (
                  <li className="text-sm text-zinc-400">Nothing needs attention right now.</li>
                )}
                {metrics.leadsRequiringAttention.map(({ lead, reasons }) => (
                  <li key={lead.id} className="flex items-start justify-between gap-4 border border-zinc-100 p-4">
                    <div>
                      <Link
                        to={`/developer/crm/leads/${lead.id}`}
                        className="font-medium text-zinc-950 hover:text-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
                      >
                        {lead.fullName}
                      </Link>
                      <p className="mt-1 text-xs text-zinc-500">{reasons.join(" · ")}</p>
                    </div>
                    <StageBadge stageId={lead.pipelineStage} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-zinc-200 bg-white p-6">
              <h2 className="text-xl font-medium text-zinc-950">Pipeline Stage Summary</h2>
              <ul className="mt-5 space-y-3">
                {metrics.pipelineStageSummary.map((stage) => (
                  <li key={stage.id} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600">{stage.label}</span>
                    <span className="font-medium text-zinc-950">{stage.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border border-zinc-200 bg-white p-6">
            <h2 className="text-xl font-medium text-zinc-950">Recent Activity</h2>
            <div className="mt-5">
              <ActivityTimeline
                activity={metrics.recentActivity.map((entry) => ({
                  ...entry,
                  description: `${entry.leadName}: ${entry.description}`,
                }))}
              />
            </div>
          </div>
        </div>
      )}
    </CrmShell>
  );
}
