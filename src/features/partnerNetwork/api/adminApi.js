// Thin client for the authenticated Partner Network API (/api/admin/*).
// Router-free and fetch-only so it stays testable under the project's Jest
// constraint. Every call resolves (never throws) to a normalized result:
//   { ok: true, status, data }
//   { ok: false, status, error, message }
// where `error` is the server's machine-readable code, or "network_error" /
// "invalid_response" when the API couldn't be reached or didn't return JSON
// (e.g. `npm start` without the local API server running).

async function request(path, { method = "GET", body } = {}) {
  let response;
  try {
    response = await fetch(path, {
      method,
      credentials: "same-origin",
      headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    return { ok: false, status: 0, error: "network_error", message: "Couldn't reach the PTM API." };
  }
  let data = null;
  try {
    data = await response.json();
  } catch (error) {
    return {
      ok: false,
      status: response.status,
      error: "invalid_response",
      message: "The PTM API returned an unexpected response.",
    };
  }
  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: data?.error || "request_failed",
      message: data?.message || "The request failed.",
    };
  }
  return { ok: true, status: response.status, data };
}

export const adminApi = {
  session: () => request("/api/admin/auth"),
  login: (email, password) => request("/api/admin/auth", { method: "POST", body: { action: "login", email, password } }),
  logout: () => request("/api/admin/auth", { method: "POST", body: { action: "logout" } }),
  fetchLedger: () => request("/api/admin/ledger"),
  saveRecord: (resource, record, { isNew = false } = {}) =>
    request(`/api/admin/${resource}`, { method: isNew ? "POST" : "PUT", body: record }),
  deleteRecord: (resource, id) =>
    request(`/api/admin/${resource}?id=${encodeURIComponent(id)}`, { method: "DELETE" }),
  reviewApplication: (id, patch) =>
    request(`/api/admin/applications?id=${encodeURIComponent(id)}`, { method: "PUT", body: patch }),
  convertApplication: (id) =>
    request("/api/admin/applications", { method: "POST", body: { action: "convert", id } }),
  importLegacy: (payload, { dryRun = true } = {}) =>
    request("/api/admin/import", { method: "POST", body: { payload, dryRun } }),
};

export function makeUuid() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // RFC-4122-shaped fallback for older environments (uniqueness, not crypto).
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
