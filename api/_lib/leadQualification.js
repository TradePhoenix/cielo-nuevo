// Deterministic lead-qualification scoring — a coarse signal for "how
// engaged/ready is this visitor," used to decide when the UI can surface a
// more assertive next-step CTA and to fill the "lead qualification
// signals" field of the structured handoff summary. Not a gate: Ask Path
// never blocks answering questions based on this score.

const TIMEFRAME_PATTERN = /\b(next month|this year|6 months|12 months|asap|soon|already booked|flight booked)\b/i;
const BUDGET_PATTERN = /\$[\d,]+|\b(budget|presupuesto)\b/i;
const DESTINATION_PATTERN = /\b(tulum|playa del carmen|m[eé]rida|progreso|cozumel|bacalar|cancun|canc[uú]n|valladolid|yucat[aá]n|riviera maya)\b/i;
const READY_LANGUAGE_PATTERN = /\b(ready|committed|decided|moving forward|list[oa]|decidid[oa])\b/i;

export function scoreLeadQualification(messages = []) {
  const userText = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" \n ");

  const signals = [];
  if (TIMEFRAME_PATTERN.test(userText)) signals.push("stated_timeframe");
  if (BUDGET_PATTERN.test(userText)) signals.push("mentioned_budget");
  if (DESTINATION_PATTERN.test(userText)) signals.push("named_destination");
  if (READY_LANGUAGE_PATTERN.test(userText)) signals.push("ready_language");

  const turnCount = messages.filter((m) => m.role === "user").length;
  if (turnCount >= 4) signals.push("sustained_engagement");

  let level = "low";
  if (signals.length >= 3) level = "high";
  else if (signals.length >= 1) level = "medium";

  return { level, signals, turnCount };
}
