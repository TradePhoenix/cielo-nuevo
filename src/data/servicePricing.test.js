// Launch fix #4 — canonical service pricing pins. The offer ladder is:
// Free (guides/Blueprint) -> $99 Fit Call -> $499 Roadmap -> custom-quote
// Guided Landing. These tests keep every price literal honest and make it
// impossible to silently publish a fixed Guided Landing price.
import { FIT_CALL_PRICE, ROADMAP_PRICE, GUIDED_LANDING_PRICING } from "./trustContent";

test("the offer ladder prices are exact", () => {
  expect(FIT_CALL_PRICE).toBe("$99 USD");
  expect(ROADMAP_PRICE).toBe("$499 USD");
});

test("Guided Landing has no published dollar amount in either language", () => {
  expect(GUIDED_LANDING_PRICING.en).toBe("Custom Quote");
  expect(GUIDED_LANDING_PRICING.es).toBe("Cotización Personalizada");
  Object.values(GUIDED_LANDING_PRICING).forEach((value) => {
    expect(value).not.toMatch(/\$|\d/);
  });
});
