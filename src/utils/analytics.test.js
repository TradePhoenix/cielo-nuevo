import { trackEvent, ANALYTICS_EVENTS } from "./analytics";

describe("trackEvent", () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    jest.restoreAllMocks();
  });

  it("does not throw when called with just a name", () => {
    expect(() => trackEvent(ANALYTICS_EVENTS.PRICING_VIEWED)).not.toThrow();
  });

  it("does not throw when called with a name and payload", () => {
    expect(() =>
      trackEvent(ANALYTICS_EVENTS.FIT_CALL_CTA_CLICKED, { source: "atlas", cityId: "tulum" })
    ).not.toThrow();
  });

  it("logs to the console outside production", () => {
    process.env.NODE_ENV = "test";
    const debugSpy = jest.spyOn(console, "debug").mockImplementation(() => {});

    trackEvent(ANALYTICS_EVENTS.SERVICES_CTA_CLICKED, { source: "fit_call_bar" });

    expect(debugSpy).toHaveBeenCalledWith(
      "[analytics]",
      ANALYTICS_EVENTS.SERVICES_CTA_CLICKED,
      { source: "fit_call_bar" }
    );
  });

  it("does not log to the console in production", () => {
    process.env.NODE_ENV = "production";
    const debugSpy = jest.spyOn(console, "debug").mockImplementation(() => {});

    trackEvent(ANALYTICS_EVENTS.SERVICE_TIER_CTA_CLICKED, { tier: "Mexico Fit Call" });

    expect(debugSpy).not.toHaveBeenCalled();
  });
});

describe("ANALYTICS_EVENTS", () => {
  it("exposes a fixed, stable event vocabulary", () => {
    expect(ANALYTICS_EVENTS).toEqual({
      PRICING_VIEWED: "pricing_viewed",
      FIT_CALL_CTA_CLICKED: "fit_call_cta_clicked",
      SERVICES_CTA_CLICKED: "services_cta_clicked",
      SERVICE_TIER_CTA_CLICKED: "service_tier_cta_clicked",
      // ASK PATH-001 — additive events, see src/utils/analytics.js
      ASK_PATH_OPENED: "ask_path_opened",
      ASK_PATH_CONVERSATION_STARTED: "ask_path_conversation_started",
      ASK_PATH_PROMPT_SELECTED: "ask_path_prompt_selected",
      ASK_PATH_SOURCE_CLICKED: "ask_path_source_clicked",
      ASK_PATH_BLUEPRINT_OFFERED: "ask_path_blueprint_offered",
      ASK_PATH_BLUEPRINT_ACCEPTED: "ask_path_blueprint_accepted",
      ASK_PATH_BLUEPRINT_DECLINED: "ask_path_blueprint_declined",
      ASK_PATH_HUMAN_HANDOFF_REQUESTED: "ask_path_human_handoff_requested",
      ASK_PATH_FIT_CALL_SELECTED: "ask_path_fit_call_selected",
      ASK_PATH_QUALIFIED_INTENT_REACHED: "ask_path_qualified_intent_reached",
      ASK_PATH_ERROR: "ask_path_error",
      PARTNER_APPLY_CTA_CLICKED: "partner_apply_cta_clicked",
      PARTNER_APPLICATION_SUBMITTED: "partner_application_submitted",
    });
  });
});
