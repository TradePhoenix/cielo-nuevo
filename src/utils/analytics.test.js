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
    });
  });
});
