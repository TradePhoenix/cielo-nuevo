// Pure function: condenses a conversation into a short text summary for the
// human-handoff form, so Kalen gets a useful digest instead of needing to
// re-read the whole transcript. Deliberately just the user's own turns —
// the assistant's phrasing isn't what he needs to catch up quickly.
const MAX_SUMMARY_CHARS = 600;

export function buildHandoffSummary(messages = []) {
  const userTurns = messages.filter((m) => m.role === "user").map((m) => m.content.trim());
  if (userTurns.length === 0) return "";

  const joined = userTurns.join(" • ");
  if (joined.length <= MAX_SUMMARY_CHARS) return joined;
  return `${joined.slice(0, MAX_SUMMARY_CHARS - 1)}…`;
}
