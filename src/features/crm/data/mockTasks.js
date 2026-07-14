// Mock follow-up tasks for CRM Foundation V1, tied to leads by leadId.
// Anchored around "today" = 2026-07-14 so the Tasks Overview's
// overdue/today/upcoming/completed buckets read as realistic out of the box.
export const MOCK_TASKS = [
  { id: "tk_0001", leadId: "ld_0001", title: "Confirm consultation call agenda", dueDate: "2026-07-15", priority: "High", ownerId: "tm_maria", status: "open" },
  { id: "tk_0002", leadId: "ld_0002", title: "Send Blueprint invite follow-up", dueDate: "2026-07-16", priority: "Medium", ownerId: "tm_daniel", status: "open" },
  { id: "tk_0003", leadId: "ld_0003", title: "Follow up on school placement research", dueDate: "2026-07-14", priority: "High", ownerId: "tm_sophie", status: "open" },
  { id: "tk_0004", leadId: "ld_0004", title: "Chase apostilled bank statements", dueDate: "2026-07-10", priority: "High", ownerId: "tm_maria", status: "open" },
  { id: "tk_0005", leadId: "ld_0004", title: "Confirm consulate appointment slot", dueDate: "2026-07-18", priority: "High", ownerId: "tm_maria", status: "open" },
  { id: "tk_0006", leadId: "ld_0006", title: "Send cost-of-living breakdown follow-up", dueDate: "2026-07-13", priority: "Medium", ownerId: "tm_sophie", status: "open" },
  { id: "tk_0007", leadId: "ld_0008", title: "Check pet health certificate status", dueDate: "2026-07-20", priority: "Medium", ownerId: "tm_carlos", status: "open" },
  { id: "tk_0008", leadId: "ld_0009", title: "Schedule joint call with realty partner", dueDate: "2026-07-14", priority: "Medium", ownerId: "tm_sophie", status: "open" },
  { id: "tk_0009", leadId: "ld_0010", title: "Re-engage after two weeks of silence", dueDate: "2026-07-13", priority: "Low", ownerId: "tm_daniel", status: "open" },
  { id: "tk_0010", leadId: "ld_0011", title: "Check in on in-country paperwork filing", dueDate: "2026-07-22", priority: "Medium", ownerId: "tm_carlos", status: "open" },
  { id: "tk_0011", leadId: "ld_0012", title: "Prep consultation materials", dueDate: "2026-07-16", priority: "Medium", ownerId: "tm_maria", status: "open" },
  { id: "tk_0012", leadId: "ld_0016", title: "Send business registration overview", dueDate: "2026-07-15", priority: "High", ownerId: "tm_sophie", status: "open" },
  { id: "tk_0013", leadId: "ld_0017", title: "Book discovery call", dueDate: "2026-07-14", priority: "Medium", ownerId: "tm_daniel", status: "open" },
  { id: "tk_0014", leadId: "ld_0019", title: "Follow up on consulate appointment confirmation", dueDate: "2026-07-11", priority: "High", ownerId: "tm_maria", status: "open" },
  { id: "tk_0015", leadId: "ld_0020", title: "Confirm international shipment schedule", dueDate: "2026-07-17", priority: "High", ownerId: "tm_ana", status: "open" },
  { id: "tk_0016", leadId: "ld_0023", title: "Resume outreach after school year ends", dueDate: "2026-07-13", priority: "Low", ownerId: "tm_sophie", status: "open" },
  { id: "tk_0017", leadId: "ld_0024", title: "Confirm bank account setup appointment", dueDate: "2026-07-19", priority: "Medium", ownerId: "tm_carlos", status: "open" },
  { id: "tk_0018", leadId: "ld_0026", title: "Prioritize expedited residency filing call", dueDate: "2026-07-14", priority: "High", ownerId: "tm_maria", status: "open" },
  { id: "tk_0019", leadId: "ld_0001", title: "Send welcome packet", dueDate: "2026-06-10", priority: "Medium", ownerId: "tm_maria", status: "done", completedDate: "2026-06-10" },
  { id: "tk_0020", leadId: "ld_0004", title: "Introduce to immigration attorney", dueDate: "2026-06-01", priority: "High", ownerId: "tm_maria", status: "done", completedDate: "2026-06-01" },
  { id: "tk_0021", leadId: "ld_0008", title: "Send full-service package agreement", dueDate: "2026-06-20", priority: "High", ownerId: "tm_carlos", status: "done", completedDate: "2026-06-19" },
  { id: "tk_0022", leadId: "ld_0011", title: "Submit visa application to consulate", dueDate: "2026-04-28", priority: "High", ownerId: "tm_carlos", status: "done", completedDate: "2026-04-27" },
  { id: "tk_0023", leadId: "ld_0015", title: "30-day settling-in check-in", dueDate: "2026-07-02", priority: "Medium", ownerId: "tm_ana", status: "done", completedDate: "2026-07-02" },
  { id: "tk_0024", leadId: "ld_0021", title: "Send testimonial request", dueDate: "2026-05-20", priority: "Low", ownerId: "tm_ana", status: "done", completedDate: "2026-05-18" },
];

export function tasksForLead(leadId) {
  return MOCK_TASKS.filter((task) => task.leadId === leadId);
}
