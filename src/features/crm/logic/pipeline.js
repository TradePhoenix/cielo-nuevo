// PTM launch CRM — pipeline math. All pure functions; `todayISO` is passed
// in (YYYY-MM-DD) so tests and the overdue/today buckets are deterministic.
import { CRM_STAGES, CRM_STAGE_MAP } from "../data/crmConstants";

export function isActiveLead(lead) {
  return CRM_STAGE_MAP[lead.stage]?.kind === "active";
}

export function isClosedLead(lead) {
  return CRM_STAGE_MAP[lead.stage]?.kind === "closed";
}

function leadValue(lead) {
  return typeof lead.estimatedValue === "number" && lead.estimatedValue > 0
    ? lead.estimatedValue
    : 0;
}

// Per-stage {stage, count, value} in canonical funnel order.
export function stageSummary(leads) {
  return CRM_STAGES.map((stage) => {
    const inStage = leads.filter((lead) => lead.stage === stage.id);
    return {
      stage,
      count: inStage.length,
      value: inStage.reduce((sum, lead) => sum + leadValue(lead), 0),
    };
  });
}

export function totalPipelineValue(leads) {
  return leads.filter(isActiveLead).reduce((sum, lead) => sum + leadValue(lead), 0);
}

// How urgently a lead needs attention:
//   "overdue"   — active, next-action date before today
//   "today"     — active, next-action date is today
//   "missing"   — active, but no next action or no date
//   "scheduled" — active with a future next action
//   null        — closed leads never demand attention
export function classifyAttention(lead, todayISO) {
  if (!isActiveLead(lead)) return null;
  const hasAction = Boolean(String(lead.nextAction || "").trim());
  const date = lead.nextActionDate || "";
  if (!hasAction || !date) return "missing";
  if (date < todayISO) return "overdue";
  if (date === todayISO) return "today";
  return "scheduled";
}

const ATTENTION_RANK = { overdue: 0, today: 1, missing: 2 };

// Leads demanding attention, most urgent first (overdue by oldest date,
// then today, then active leads with no next action).
export function needsAttention(leads, todayISO) {
  return leads
    .map((lead) => ({ lead, attention: classifyAttention(lead, todayISO) }))
    .filter(({ attention }) => attention && attention !== "scheduled")
    .sort((a, b) => {
      const rank = ATTENTION_RANK[a.attention] - ATTENTION_RANK[b.attention];
      if (rank !== 0) return rank;
      return (a.lead.nextActionDate || "9999").localeCompare(b.lead.nextActionDate || "9999");
    });
}

export function crmMetrics(leads, todayISO) {
  const active = leads.filter(isActiveLead);
  const attention = needsAttention(leads, todayISO);
  return {
    activeLeads: active.length,
    newLeads: leads.filter((l) => l.stage === "new-lead").length,
    fitCallsBooked: leads.filter((l) => l.stage === "fit-call-booked").length,
    roadmapsOffered: leads.filter((l) => l.stage === "roadmap-offered").length,
    activeClients: leads.filter((l) => l.stage === "active-client").length,
    overdue: attention.filter((a) => a.attention === "overdue").length,
    dueToday: attention.filter((a) => a.attention === "today").length,
    missingNextAction: attention.filter((a) => a.attention === "missing").length,
    pipelineValue: totalPipelineValue(leads),
  };
}

// Practical filtering: stage, source, attention bucket, active/closed.
// "all" (or falsy) skips that filter.
export function filterLeads(leads, { stage, source, attention, activity } = {}, todayISO) {
  return leads.filter((lead) => {
    if (stage && stage !== "all" && lead.stage !== stage) return false;
    if (source && source !== "all" && lead.source !== source) return false;
    if (activity === "active" && !isActiveLead(lead)) return false;
    if (activity === "closed" && !isClosedLead(lead)) return false;
    if (attention && attention !== "all") {
      if (classifyAttention(lead, todayISO) !== attention) return false;
    }
    return true;
  });
}

// Default table order: most urgent next action first, dateless active
// leads next, closed leads last, each group newest-updated first.
export function sortLeadsForTable(leads, todayISO) {
  return [...leads].sort((a, b) => {
    const aClosed = isClosedLead(a) ? 1 : 0;
    const bClosed = isClosedLead(b) ? 1 : 0;
    if (aClosed !== bClosed) return aClosed - bClosed;
    const aDate = a.nextActionDate || "9999-12-31";
    const bDate = b.nextActionDate || "9999-12-31";
    if (aDate !== bDate) return aDate.localeCompare(bDate);
    return (b.updatedAt || "").localeCompare(a.updatedAt || "");
  });
}
