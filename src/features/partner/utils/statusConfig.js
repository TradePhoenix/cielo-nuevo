// Central label/tone lookup for every status vocabulary in the portal, so
// a badge always renders the same word + color no matter which screen
// it's on. `tone` maps to a small fixed set of Tailwind class strings in
// StatusBadge/PriorityBadge rather than each config entry hardcoding
// classes, keeping the visual language (cream/zinc/gold, no stoplight
// red-green) consistent with the rest of the site.

export const REFERRAL_STAGES = [
  { id: "incoming", label: "Incoming" },
  { id: "accepted", label: "Accepted" },
  { id: "pending", label: "Pending" },
  { id: "waiting_documents", label: "Waiting For Documents" },
  { id: "completed", label: "Completed" },
  { id: "declined", label: "Declined" },
];

export const REFERRAL_PROGRESS_STATUSES = [
  { id: "waiting_on_client", label: "Waiting For Client", tone: "neutral" },
  { id: "waiting_on_documents", label: "Waiting For Documents", tone: "neutral" },
  { id: "in_progress", label: "In Progress", tone: "gold" },
  { id: "completed", label: "Completed", tone: "dark" },
  { id: "needs_attention", label: "Needs Attention", tone: "urgent" },
  { id: "completed_successfully", label: "Completed Successfully", tone: "dark" },
];

export const CLIENT_STATUSES = [
  { id: "active", label: "Active", tone: "gold" },
  { id: "on_hold", label: "On Hold", tone: "neutral" },
  { id: "completed", label: "Completed", tone: "dark" },
];

export const PRIORITY_LEVELS = [
  { id: "low", label: "Low", tone: "neutral" },
  { id: "medium", label: "Medium", tone: "gold" },
  { id: "high", label: "High", tone: "dark" },
  { id: "urgent", label: "Urgent", tone: "urgent" },
];

export const NOTIFICATION_TYPES = [
  { id: "new_referral", label: "New Referral" },
  { id: "upcoming_appointment", label: "Upcoming Appointment" },
  { id: "missing_documents", label: "Missing Documents" },
  { id: "unread_message", label: "Unread Message" },
  { id: "reminder", label: "Reminder" },
];

function findIn(list, id) {
  return list.find((entry) => entry.id === id) || { id, label: id, tone: "neutral" };
}

export const referralStageConfig = (id) => findIn(REFERRAL_STAGES, id);
export const referralProgressConfig = (id) => findIn(REFERRAL_PROGRESS_STATUSES, id);
export const clientStatusConfig = (id) => findIn(CLIENT_STATUSES, id);
export const priorityConfig = (id) => findIn(PRIORITY_LEVELS, id);
export const notificationTypeConfig = (id) => findIn(NOTIFICATION_TYPES, id);
