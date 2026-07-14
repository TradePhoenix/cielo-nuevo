import SEO from "../../../components/SEO";
import CrmShell from "../components/CrmShell";
import StatCard from "../components/StatCard";
import BarChart from "../components/charts/BarChart";
import Sparkline from "../components/charts/Sparkline";
import LoadingState from "../components/LoadingState";
import { useCrmState } from "../state/useCrmState";
import { buildCrmMetrics } from "../logic/buildCrmMetrics";
import {
  buildLeadSourceBreakdown,
  buildStageFunnel,
  buildLeadsOverTime,
  buildAverageLeadScore,
  buildAverageEstimatedValue,
} from "../logic/buildAnalytics";
import { formatCurrency } from "../logic/formatters";

export default function CrmAnalyticsPage() {
  const { leads, tasks, isLoading } = useCrmState();
  const metrics = buildCrmMetrics(leads, tasks);

  return (
    <CrmShell>
      <SEO title="CRM Analytics" path="/developer/crm/analytics" />
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Internal CRM</p>
      <h1 className="mt-4 text-4xl font-light tracking-[-0.03em] sm:text-5xl">Analytics</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600">
        How leads move through the pipeline, where they come from, and what they're worth.
      </p>

      <div className="mt-8">
        {isLoading ? (
          <LoadingState rows={4} />
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard label="Conversion Rate" value={`${metrics.conversionRate}%`} tone="positive" />
              <StatCard label="Avg. Lead Score" value={buildAverageLeadScore(leads)} />
              <StatCard label="Avg. Open Deal Value" value={formatCurrency(buildAverageEstimatedValue(leads))} />
              <StatCard label="Est. Pipeline Value" value={formatCurrency(metrics.estimatedPipelineValue)} />
            </div>

            <div className="border border-zinc-200 bg-white p-6">
              <h2 className="text-xl font-medium text-zinc-950">Leads Created Per Month</h2>
              <div className="mt-6">
                <Sparkline data={buildLeadsOverTime(leads)} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="border border-zinc-200 bg-white p-6">
                <h2 className="text-xl font-medium text-zinc-950">Pipeline Funnel</h2>
                <div className="mt-6">
                  <BarChart data={buildStageFunnel(leads)} />
                </div>
              </div>

              <div className="border border-zinc-200 bg-white p-6">
                <h2 className="text-xl font-medium text-zinc-950">Lead Source Breakdown</h2>
                <div className="mt-6">
                  <BarChart data={buildLeadSourceBreakdown(leads)} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CrmShell>
  );
}
