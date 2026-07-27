import { detectEscalationSignal } from "./escalation.js";

describe("detectEscalationSignal", () => {
  test("flags a safety/medical emergency as urgent", () => {
    const result = detectEscalationSignal("I was just robbed and need to go to the hospital");
    expect(result.shouldEscalate).toBe(true);
    expect(result.reason).toBe("safety_or_medical");
    expect(result.urgent).toBe(true);
  });

  test("flags distress language as urgent", () => {
    const result = detectEscalationSignal("I'm scared and don't know what to do, this feels like an emergency");
    expect(result.shouldEscalate).toBe(true);
    expect(result.reason).toBe("distress");
    expect(result.urgent).toBe(true);
  });

  test("flags high-value intent as non-urgent", () => {
    const result = detectEscalationSignal("I'm ready to book a Fit Call, when can we talk?");
    expect(result.shouldEscalate).toBe(true);
    expect(result.reason).toBe("high_value_intent");
    expect(result.urgent).toBe(false);
  });

  test("flags a request to coordinate with a professional", () => {
    const result = detectEscalationSignal("Should I talk to a notario about this property?");
    expect(result.shouldEscalate).toBe(true);
    expect(result.reason).toBe("professional_coordination");
  });

  test("does not escalate an ordinary exploratory question", () => {
    const result = detectEscalationSignal("What's the weather like in Tulum in October?");
    expect(result.shouldEscalate).toBe(false);
    expect(result.reason).toBeNull();
  });

  test("works in Spanish", () => {
    const result = detectEscalationSignal("Estoy en pánico, esto es una emergencia");
    expect(result.shouldEscalate).toBe(true);
    expect(result.reason).toBe("distress");
  });
});
