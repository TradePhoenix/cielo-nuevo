import { PIPELINE_STAGES, ACTIVE_CLIENT_STAGES } from "../data/pipelineStages";
import { isPast } from "./dateHelpers";
import { findLeadsRequiringAttention } from "./leadsRequiringAttention";

const RECENT_ACTIVITY_LIMIT = 8;
const ATTENTION_LIMIT = 6;

// Pure aggregation: (leads, tasks) in, dashboard-ready numbers out. No side
// effects, no fetching — this is the seam a real backend would eventually
// compute server-side instead, same shape either way.
export function buildCrmMetrics(leads, tasks) {
  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.pipelineStage === "new_lead").length;
  const consultationsScheduled = leads.filter((lead) => lead.pipelineStage === "consultation_scheduled").length;
  const activeRelocationClients = leads.filter((lead) => ACTIVE_CLIENT_STAGES.includes(lead.pipelineStage)).length;
  const completedClients = leads.filter((lead) => lead.pipelineStage === "completed").length;
  const lostLeads = leads.filter((lead) => lead.pipelineStage === "lost").length;

  const estimatedPipelineValue = leads
    .filter((lead) => !["completed", "lost"].includes(lead.pipelineStage))
    .reduce((sum, lead) => sum + (lead.estimatedValue || 0), 0);

  const closedLeads = completedClients + lostLeads;
  const conversionRate = closedLeads > 0 ? Math.round((completedClients / closedLeads) * 1000) / 10 : 0;

  const overdueTasks = tasks.filter((task) => task.status === "open" && isPast(task.dueDate));

  const recentActivity = leads
    .flatMap((lead) => lead.activity.map((entry) => ({ ...entry, leadId: lead.id, leadName: lead.fullName })))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, RECENT_ACTIVITY_LIMIT);

  const leadsRequiringAttention = findLeadsRequiringAttention(leads).slice(0, ATTENTION_LIMIT);

  const pipelineStageSummary = PIPELINE_STAGES.map((stage) => {
    const stageLeads = leads.filter((lead) => lead.pipelineStage === stage.id);
    return {
      ...stage,
      count: stageLeads.length,
      value: stageLeads.reduce((sum, lead) => sum + (lead.estimatedValue || 0), 0),
    };
  });

  return {
    totalLeads,
    newLeads,
    consultationsScheduled,
    activeRelocationClients,
    completedClients,
    estimatedPipelineValue,
    conversionRate,
    overdueTasksCount: overdueTasks.length,
    overdueTasks,
    recentActivity,
    leadsRequiringAttention,
    pipelineStageSummary,
  };
}
