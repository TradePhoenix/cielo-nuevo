const STORAGE_KEY = "pathToMexico.conversionEvents.v1";
const MAX_STORED_EVENTS = 200;

// Conversion-tracking seam: every call site only needs an event name plus a
// plain object of properties. Swapping this for a real analytics provider
// (GA4, Meta Pixel, etc.) later means changing only this file.
export function trackEvent(name, properties = {}) {
  const event = { name, properties, timestamp: new Date().toISOString() };

  if (process.env.NODE_ENV !== "test") {
    console.log("[trackEvent]", event);
  }

  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    stored.push(event);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored.slice(-MAX_STORED_EVENTS)));
  } catch {
    // Best-effort only — storage being unavailable should never break the page.
  }
}
