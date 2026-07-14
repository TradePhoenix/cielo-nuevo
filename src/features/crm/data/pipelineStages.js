// CRM pipeline stage vocabulary. Order here is the canonical funnel order —
// pipeline board columns, lead detail stage selects, and stage-summary
// charts all iterate PIPELINE_STAGES rather than re-declaring this list.
export const PIPELINE_STAGES = [
  { id: "new_lead", label: "New Lead" },
  { id: "contacted", label: "Contacted" },
  { id: "consultation_scheduled", label: "Consultation Scheduled" },
  { id: "qualified", label: "Qualified" },
  { id: "documents_pending", label: "Documents Pending" },
  { id: "partner_introduced", label: "Partner Introduced" },
  { id: "residency_started", label: "Residency Started" },
  { id: "move_in_progress", label: "Move In Progress" },
  { id: "moved", label: "Moved" },
  { id: "completed", label: "Completed" },
  { id: "lost", label: "Lost" },
];

export const PIPELINE_STAGE_MAP = Object.fromEntries(
  PIPELINE_STAGES.map((stage) => [stage.id, stage])
);

export function stageLabel(stageId) {
  return PIPELINE_STAGE_MAP[stageId] ? PIPELINE_STAGE_MAP[stageId].label : stageId;
}

// Stages that count as an "active relocation client" for dashboard metrics —
// the lead has moved past sales qualification into active service delivery.
export const ACTIVE_CLIENT_STAGES = [
  "residency_started",
  "move_in_progress",
  "moved",
];

export const LEAD_STATUSES = ["New", "Active", "Nurturing", "On Hold", "Client", "Lost"];

export const LEAD_SOURCES = [
  "My Mexico Blueprint",
  "Mexico Fit Call",
  "Free Guide Download",
  "Organic Search",
  "Instagram",
  "Facebook Ads",
  "Google Ads",
  "YouTube",
  "Referral",
  "Word of Mouth",
];

export const LEAD_TAGS = [
  "Retiree",
  "Remote Worker",
  "Family",
  "Digital Nomad",
  "High Budget",
  "Urgent Timeline",
  "Pet Owner",
  "First-Time Visitor",
  "Spanish Speaker",
  "Investor",
  "Referral Source",
];

// Preferred destinations kept aligned with the decision engine's actual
// city coverage (src/decisionEngine/data/cityProfiles.js) rather than a
// generic Mexico-wide list — "Undecided" covers leads still exploring.
export const PREFERRED_DESTINATIONS = [
  "Playa del Carmen",
  "Tulum",
  "Riviera Maya",
  "Undecided",
];

export const TASK_PRIORITIES = ["High", "Medium", "Low"];
