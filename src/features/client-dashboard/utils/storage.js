// Tiny shared localStorage helper — every client-dashboard hook persists a
// small versioned slice of state the same way the rest of the product does
// (see useBlueprintState, usePlanState, useDashboardState). A version bump
// discards incompatible old saved shapes rather than migrating them.
export function readState(key, version, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed.version !== version) return fallback;
    return parsed.data;
  } catch (error) {
    return fallback;
  }
}

export function writeState(key, version, data) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify({ version, data }));
}
