import { initVercelAnalytics, VERCEL_INSIGHTS_SRC } from "./vercelAnalytics";

describe("initVercelAnalytics", () => {
  afterEach(() => {
    document.head.innerHTML = "";
    delete window.va;
    delete window.vaq;
  });

  it("does nothing outside production", () => {
    expect(initVercelAnalytics({ env: "development" })).toBe(false);
    expect(initVercelAnalytics({ env: "test" })).toBe(false);
    expect(document.querySelector("script")).toBeNull();
    expect(window.va).toBeUndefined();
  });

  it("installs the queue shim and the insights script once in production", () => {
    expect(initVercelAnalytics({ env: "production" })).toBe(true);
    expect(initVercelAnalytics({ env: "production" })).toBe(true);
    const scripts = document.querySelectorAll(`script[src="${VERCEL_INSIGHTS_SRC}"]`);
    expect(scripts).toHaveLength(1);
    expect(scripts[0].defer).toBe(true);
    window.va("event", { name: "x" });
    expect(window.vaq).toHaveLength(1);
  });
});
