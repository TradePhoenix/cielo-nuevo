import { validateAskPathRequest, LIMITS } from "./validation.js";

function baseBody(overrides = {}) {
  return {
    language: "en",
    messages: [{ role: "user", content: "Hi" }],
    ...overrides,
  };
}

describe("validateAskPathRequest", () => {
  test("accepts a well-formed request", () => {
    expect(validateAskPathRequest(baseBody())).toEqual({ valid: true });
  });

  test("rejects a missing body", () => {
    expect(validateAskPathRequest(null).valid).toBe(false);
  });

  test("rejects an invalid language", () => {
    const result = validateAskPathRequest(baseBody({ language: "fr" }));
    expect(result.valid).toBe(false);
    expect(result.code).toBe("invalid_language");
  });

  test("rejects an empty messages array", () => {
    const result = validateAskPathRequest(baseBody({ messages: [] }));
    expect(result.code).toBe("invalid_messages");
  });

  test("rejects too many messages", () => {
    const messages = Array.from({ length: LIMITS.MAX_MESSAGES + 1 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: "hi",
    }));
    messages[messages.length - 1].role = "user";
    const result = validateAskPathRequest(baseBody({ messages }));
    expect(result.code).toBe("too_many_messages");
  });

  test("rejects a message over the per-message character limit", () => {
    const result = validateAskPathRequest(
      baseBody({ messages: [{ role: "user", content: "x".repeat(LIMITS.MAX_MESSAGE_CHARS + 1) }] })
    );
    expect(result.code).toBe("message_too_long");
  });

  test("rejects an invalid role", () => {
    const result = validateAskPathRequest(baseBody({ messages: [{ role: "system", content: "hi" }] }));
    expect(result.code).toBe("invalid_role");
  });

  test("rejects when the last message isn't from the user", () => {
    const result = validateAskPathRequest(
      baseBody({
        messages: [
          { role: "user", content: "hi" },
          { role: "assistant", content: "hello" },
        ],
      })
    );
    expect(result.code).toBe("invalid_turn_order");
  });

  test("rejects an oversized declared payload", () => {
    const result = validateAskPathRequest(baseBody(), { rawBodyLength: LIMITS.MAX_BODY_BYTES + 1 });
    expect(result.code).toBe("payload_too_large");
  });

  test("accepts a well-formed blueprintContext", () => {
    const result = validateAskPathRequest(
      baseBody({ blueprintContext: { archetypeTitle: "The Remote Builder", readinessLabel: "Ready To Move" } })
    );
    expect(result.valid).toBe(true);
  });

  test("rejects a blueprintContext with an unexpected field", () => {
    const result = validateAskPathRequest(baseBody({ blueprintContext: { rawAnswers: { timeline: "asap" } } }));
    expect(result.code).toBe("invalid_blueprint_context");
  });
});
