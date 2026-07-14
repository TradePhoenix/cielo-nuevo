import { LEAD_SOURCES, PIPELINE_STAGES } from "../data/pipelineStages";

// Aggregations feeding the Analytics page's charts. All pure — leads in,
// chart-ready arrays out — so the lightweight SVG chart components stay
// dumb renderers with no aggregation logic of their own.
export function buildLeadSourceBreakdown(leads) {
  return LEAD_SOURCES.map((source) => ({
    label: source,
    count: leads.filter((lead) => lead.leadSource === source).length,
  })).filter((entry) => entry.count > 0);
}

export function buildStageFunnel(leads) {
  return PIPELINE_STAGES.filter((stage) => stage.id !== "lost").map((stage) => ({
    label: stage.label,
    count: leads.filter((lead) => lead.pipelineStage === stage.id).length,
  }));
}

// Leads created per month, oldest to newest, for the acquisition trend
// sparkline. Buckets by the "YYYY-MM" prefix of createdDate.
export function buildLeadsOverTime(leads) {
  const counts = new Map();
  leads.forEach((lead) => {
    const monthKey = lead.createdDate.slice(0, 7);
    counts.set(monthKey, (counts.get(monthKey) || 0) + 1);
  });

  return Array.from(counts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([monthKey, count]) => {
      const [year, month] = monthKey.split("-");
      const label = new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      return { label, count };
    });
}

export function buildAverageLeadScore(leads) {
  if (leads.length === 0) return 0;
  const total = leads.reduce((sum, lead) => sum + lead.leadScore, 0);
  return Math.round(total / leads.length);
}

export function buildAverageEstimatedValue(leads) {
  const open = leads.filter((lead) => !["completed", "lost"].includes(lead.pipelineStage));
  if (open.length === 0) return 0;
  const total = open.reduce((sum, lead) => sum + (lead.estimatedValue || 0), 0);
  return Math.round(total / open.length);
}
