import { isPast, daysBetween } from "./dateHelpers";

const CLOSED_STAGES = ["completed", "lost"];
const STALE_CONTACT_THRESHOLD_DAYS = 10;
const HOT_SCORE_THRESHOLD = 70;

// Flags leads that need a human to look at them, each with a short reason —
// surfaced on the CRM Dashboard so nothing warm goes quiet by accident.
// A lead can be flagged for either (or both) of:
//   - an overdue next-follow-up date
//   - a high lead score that's gone stale (no contact in 10+ days)
export function findLeadsRequiringAttention(leads) {
  const flagged = [];

  leads.forEach((lead) => {
    if (CLOSED_STAGES.includes(lead.pipelineStage)) return;

    const reasons = [];

    if (lead.nextFollowUpDate && isPast(lead.nextFollowUpDate)) {
      const overdueDays = Math.abs(daysBetween(lead.nextFollowUpDate));
      reasons.push(`Follow-up overdue by ${overdueDays} day${overdueDays === 1 ? "" : "s"}`);
    }

    if (lead.leadScore >= HOT_SCORE_THRESHOLD) {
      const sinceContact = lead.lastContactDate ? Math.abs(daysBetween(lead.lastContactDate)) : null;
      if (sinceContact !== null && sinceContact >= STALE_CONTACT_THRESHOLD_DAYS) {
        reasons.push(`High-score lead, no contact in ${sinceContact} days`);
      }
    }

    if (reasons.length > 0) {
      flagged.push({ lead, reasons });
    }
  });

  return flagged.sort((a, b) => b.lead.leadScore - a.lead.leadScore);
}
