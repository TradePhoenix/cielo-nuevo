// Search + filter + sort for the Leads List. Pure function: leads + a
// filters object in, a new filtered/sorted array out — no state, so the
// Leads page can wire it directly to whatever local filter state it holds.
export const LEAD_SORT_OPTIONS = [
  { id: "score_desc", label: "Lead score (high to low)" },
  { id: "last_contact_desc", label: "Last contact (most recent)" },
  { id: "follow_up_asc", label: "Next follow-up (soonest)" },
  { id: "value_desc", label: "Estimated value (high to low)" },
  { id: "name_asc", label: "Name (A–Z)" },
];

function matchesSearch(lead, query) {
  if (!query) return true;
  const haystack = [
    lead.fullName,
    lead.email,
    lead.phone,
    lead.currentCity,
    lead.preferredDestination,
    lead.country,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export function filterSortLeads(leads, { search = "", status = "all", stage = "all", source = "all", sortBy = "score_desc" } = {}) {
  const filtered = leads.filter((lead) => {
    if (!matchesSearch(lead, search)) return false;
    if (status !== "all" && lead.status !== status) return false;
    if (stage !== "all" && lead.pipelineStage !== stage) return false;
    if (source !== "all" && lead.leadSource !== source) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "last_contact_desc":
        return (b.lastContactDate || "").localeCompare(a.lastContactDate || "");
      case "follow_up_asc":
        if (!a.nextFollowUpDate) return 1;
        if (!b.nextFollowUpDate) return -1;
        return a.nextFollowUpDate.localeCompare(b.nextFollowUpDate);
      case "value_desc":
        return (b.estimatedValue || 0) - (a.estimatedValue || 0);
      case "name_asc":
        return a.fullName.localeCompare(b.fullName);
      case "score_desc":
      default:
        return b.leadScore - a.leadScore;
    }
  });

  return sorted;
}
