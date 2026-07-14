// CRM data access layer — the seam a real backend (Supabase/Postgres) would
// replace later. Every read the CRM feature needs goes through one of these
// functions rather than importing mockLeads/mockTasks/teamMembers/partners
// directly from components — so swapping the mock arrays below for real
// network calls only ever touches this one file.
//
// Deliberately synchronous, same as the rest of the site's deterministic
// features (see decisionEngine/logic/recommendationEngine.js) — there is no
// backend yet, so there is nothing to await. A real swap would make these
// async and the one hook that calls them (useCrmState) would gain loading
// states at that point; nothing else in the feature needs to change shape.
import { MOCK_LEADS } from "./mockLeads";
import { MOCK_TASKS } from "./mockTasks";
import { TEAM_MEMBERS } from "./teamMembers";
import { PARTNERS } from "./partners";

export function fetchLeads() {
  return MOCK_LEADS.map((lead) => ({ ...lead }));
}

export function fetchTasks() {
  return MOCK_TASKS.map((task) => ({ ...task }));
}

export function fetchTeamMembers() {
  return TEAM_MEMBERS.map((member) => ({ ...member }));
}

export function fetchPartners() {
  return PARTNERS.map((partner) => ({ ...partner }));
}
