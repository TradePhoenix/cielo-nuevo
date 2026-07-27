// Strict request validation for the Ask Path chat endpoint. Runs before any
// retrieval, guardrail-prompt assembly, or OpenAI call, so a malformed or
// oversized request never reaches the model at all.

export const LIMITS = {
  MAX_MESSAGES: 24, // ~12 user/assistant turns
  MAX_MESSAGE_CHARS: 4000,
  MAX_TOTAL_CHARS: 24000, // sum of all message content in one request
  MAX_BODY_BYTES: 40000, // raw JSON payload ceiling
};

const ALLOWED_ROLES = new Set(["user", "assistant"]);
const ALLOWED_LANGUAGES = new Set(["en", "es"]);

function fail(code, message) {
  return { valid: false, code, message };
}

export function validateAskPathRequest(body, { rawBodyLength = 0 } = {}) {
  if (rawBodyLength > LIMITS.MAX_BODY_BYTES) {
    return fail("payload_too_large", "Request payload exceeds the allowed size.");
  }

  if (!body || typeof body !== "object") {
    return fail("invalid_body", "Request body must be a JSON object.");
  }

  const { messages, language, blueprintContext } = body;

  if (!ALLOWED_LANGUAGES.has(language)) {
    return fail("invalid_language", "language must be \"en\" or \"es\".");
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return fail("invalid_messages", "messages must be a non-empty array.");
  }

  if (messages.length > LIMITS.MAX_MESSAGES) {
    return fail("too_many_messages", `Conversation exceeds the maximum of ${LIMITS.MAX_MESSAGES} messages — start a new conversation.`);
  }

  let totalChars = 0;
  for (const m of messages) {
    if (!m || typeof m !== "object") return fail("invalid_messages", "Every message must be an object.");
    if (!ALLOWED_ROLES.has(m.role)) return fail("invalid_role", "Message role must be \"user\" or \"assistant\".");
    if (typeof m.content !== "string" || m.content.trim().length === 0) {
      return fail("invalid_content", "Message content must be a non-empty string.");
    }
    if (m.content.length > LIMITS.MAX_MESSAGE_CHARS) {
      return fail("message_too_long", `A single message exceeds the ${LIMITS.MAX_MESSAGE_CHARS}-character limit.`);
    }
    totalChars += m.content.length;
  }

  if (totalChars > LIMITS.MAX_TOTAL_CHARS) {
    return fail("conversation_too_long", "Conversation is too long — start a new conversation.");
  }

  if (messages[messages.length - 1].role !== "user") {
    return fail("invalid_turn_order", "The last message must be from the user.");
  }

  // blueprintContext is optional and, per the explicit opt-in requirement,
  // only ever a small derived-lifestyle-preferences summary — never raw
  // answers. Reject anything shaped differently rather than silently
  // passing unexpected fields through to the prompt.
  if (blueprintContext !== undefined && blueprintContext !== null) {
    if (typeof blueprintContext !== "object" || Array.isArray(blueprintContext)) {
      return fail("invalid_blueprint_context", "blueprintContext must be an object.");
    }
    const allowedKeys = new Set(["archetypeTitle", "readinessLabel", "topCityNames", "budgetTier"]);
    for (const key of Object.keys(blueprintContext)) {
      if (!allowedKeys.has(key)) return fail("invalid_blueprint_context", `Unexpected blueprintContext field: ${key}`);
    }
  }

  return { valid: true };
}
