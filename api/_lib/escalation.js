// Deterministic escalation-signal detection — decides when Ask Path should
// surface a "talk to a human" prompt. Computed from the raw conversation
// text ourselves rather than asked of the model, so it's a signal we can
// trust and unit test, not something an adversarial or confused model
// response could suppress or fabricate.

const DISTRESS_PATTERNS = [
  /\b(scared|terrified|panic(king)?|emergency|urgent(ly)?|desperate|losing (my )?mind)\b/i,
  /\b(asustad[oa]|aterrad[oa]|p[aá]nico|emergencia|urgente|desesperad[oa])\b/i,
];

const SAFETY_OR_MEDICAL_PATTERNS = [
  /\b(hospital|ambulance|assault|robbed|attacked|injured|overdose)\b/i,
  /\b(hospital|ambulancia|asalt[oa]|atacad[oa]|herid[oa])\b/i,
];

const HIGH_VALUE_PATTERNS = [
  /\b(ready to (move|book|commit)|book (a|the) (call|fit call)|talk to kalen|speak (with|to) (a|the) founder|sign(ed)? up|when can we talk)\b/i,
  /\b(list[oa] para (mudarme|reservar)|hablar con kalen|agendar (la|una) llamada)\b/i,
];

const PROFESSIONAL_COORDINATION_PATTERNS = [
  /\b(lawyer|attorney|notario|accountant|tax advisor|immigration consultant|real estate broker)\b/i,
];

function matchesAny(patterns, text) {
  return patterns.some((p) => p.test(text));
}

export function detectEscalationSignal(text) {
  const value = text || "";

  if (matchesAny(SAFETY_OR_MEDICAL_PATTERNS, value)) {
    return { shouldEscalate: true, reason: "safety_or_medical", urgent: true };
  }
  if (matchesAny(DISTRESS_PATTERNS, value)) {
    return { shouldEscalate: true, reason: "distress", urgent: true };
  }
  if (matchesAny(HIGH_VALUE_PATTERNS, value)) {
    return { shouldEscalate: true, reason: "high_value_intent", urgent: false };
  }
  if (matchesAny(PROFESSIONAL_COORDINATION_PATTERNS, value)) {
    return { shouldEscalate: true, reason: "professional_coordination", urgent: false };
  }
  return { shouldEscalate: false, reason: null, urgent: false };
}
