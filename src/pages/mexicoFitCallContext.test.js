import { buildFitCallContext } from "./mexicoFitCallContext";

describe("buildFitCallContext", () => {
  it("resolves a valid city id via the real getCityById lookup", () => {
    const context = buildFitCallContext("tulum");

    expect(context.cityId).toBe("tulum");
    expect(context.cityName).toBe("Tulum");
  });

  it("embeds the city name in the WhatsApp message, URL-encoded", () => {
    const context = buildFitCallContext("tulum");

    expect(context.whatsappUrl).toContain("https://wa.me/16043154625?text=");
    expect(context.whatsappUrl).toContain(encodeURIComponent("about Tulum."));
  });

  it("falls back to a generic message when no city id is given", () => {
    const context = buildFitCallContext(undefined);

    expect(context.cityId).toBeNull();
    expect(context.cityName).toBeNull();
    expect(context.whatsappUrl).toContain(
      encodeURIComponent("Hi Kalen, I found Path To Mexico and would like to book a Mexico Fit Call.")
    );
  });

  it("falls back to a generic message when the city id is unrecognized", () => {
    const context = buildFitCallContext("not-a-real-city");

    expect(context.cityId).toBeNull();
    expect(context.cityName).toBeNull();
    expect(context.whatsappUrl).not.toContain("about");
  });
});
