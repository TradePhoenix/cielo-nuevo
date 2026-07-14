// Internal team roster leads and tasks are assigned to. Mock data for CRM
// Foundation V1 — a real backend would replace this with a `staff`/`users`
// table looked up by id.
export const TEAM_MEMBERS = [
  { id: "tm_maria", name: "Maria Torres", initials: "MT", role: "Senior Relocation Advisor" },
  { id: "tm_daniel", name: "Daniel Reyes", initials: "DR", role: "Relocation Advisor" },
  { id: "tm_sophie", name: "Sophie Laurent", initials: "SL", role: "Relocation Advisor" },
  { id: "tm_carlos", name: "Carlos Mendoza", initials: "CM", role: "Partner Success Lead" },
  { id: "tm_ana", name: "Ana Beltran", initials: "AB", role: "Client Success Manager" },
];

export function teamMemberById(id) {
  return TEAM_MEMBERS.find((member) => member.id === id) || null;
}
