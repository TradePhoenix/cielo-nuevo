import { renderHook, act, waitFor } from "@testing-library/react";
import { usePartnerNetworkApiStore } from "./usePartnerNetworkApiStore";

// Router-free hook test (per the project's Jest constraint). The fetch layer
// is mocked; everything above it — connection states, optimistic updates,
// the save outbox, auth expiry — runs for real.

const EMPTY_LEDGER = { partners: [], referrals: [], agreements: [], equityPartners: [], applications: [] };

function jsonResponse(status, body) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });
}

let fetchMock;

beforeEach(() => {
  fetchMock = jest.fn();
  global.fetch = fetchMock;
});

afterEach(() => {
  delete global.fetch;
});

function mockRoutes(routes) {
  fetchMock.mockImplementation((url, options = {}) => {
    const method = options.method || "GET";
    for (const route of routes) {
      if (url.startsWith(route.url) && method === route.method) {
        return route.reply(options);
      }
    }
    return jsonResponse(404, { error: "unmatched", message: `no mock for ${method} ${url}` });
  });
}

const sessionOk = { url: "/api/admin/auth", method: "GET", reply: () => jsonResponse(200, { authenticated: true, email: "kalen@pathtomexico.com" }) };
const ledgerOk = { url: "/api/admin/ledger", method: "GET", reply: () => jsonResponse(200, EMPTY_LEDGER) };

test("reaches ready with an authenticated session and a ledger", async () => {
  mockRoutes([sessionOk, ledgerOk]);
  const { result } = renderHook(() => usePartnerNetworkApiStore());
  expect(result.current.connection).toBe("loading");
  await waitFor(() => expect(result.current.connection).toBe("ready"));
  expect(result.current.adminEmail).toBe("kalen@pathtomexico.com");
});

test("shows auth-required when the session is unauthenticated", async () => {
  mockRoutes([
    { url: "/api/admin/auth", method: "GET", reply: () => jsonResponse(200, { authenticated: false, reason: "auth_required" }) },
  ]);
  const { result } = renderHook(() => usePartnerNetworkApiStore());
  await waitFor(() => expect(result.current.connection).toBe("auth-required"));
});

test("shows not-configured when the backend reports it or the API is unreachable", async () => {
  mockRoutes([
    { url: "/api/admin/auth", method: "GET", reply: () => jsonResponse(200, { authenticated: false, reason: "backend_not_configured" }) },
  ]);
  const first = renderHook(() => usePartnerNetworkApiStore());
  await waitFor(() => expect(first.result.current.connection).toBe("not-configured"));

  fetchMock.mockImplementation(() => Promise.reject(new TypeError("Failed to fetch")));
  const second = renderHook(() => usePartnerNetworkApiStore());
  await waitFor(() => expect(second.result.current.connection).toBe("not-configured"));
});

test("login failure surfaces the message; success loads the ledger", async () => {
  let authenticated = false;
  mockRoutes([
    { url: "/api/admin/auth", method: "GET", reply: () => jsonResponse(200, { authenticated: false, reason: "auth_required" }) },
    {
      url: "/api/admin/auth",
      method: "POST",
      reply: (options) => {
        const body = JSON.parse(options.body);
        if (body.password === "right") {
          authenticated = true;
          return jsonResponse(200, { ok: true, email: body.email });
        }
        return jsonResponse(401, { error: "invalid_credentials", message: "Nope." });
      },
    },
    ledgerOk,
  ]);
  const { result } = renderHook(() => usePartnerNetworkApiStore());
  await waitFor(() => expect(result.current.connection).toBe("auth-required"));

  let outcome;
  await act(async () => {
    outcome = await result.current.login("kalen@pathtomexico.com", "wrong");
  });
  expect(outcome.ok).toBe(false);
  expect(result.current.connection).toBe("auth-required");

  await act(async () => {
    outcome = await result.current.login("kalen@pathtomexico.com", "right");
  });
  expect(outcome.ok).toBe(true);
  expect(authenticated).toBe(true);
  await waitFor(() => expect(result.current.connection).toBe("ready"));
});

test("addPartner is optimistic and POSTs the record with a client uuid", async () => {
  const posts = [];
  mockRoutes([
    sessionOk,
    ledgerOk,
    {
      url: "/api/admin/partners",
      method: "POST",
      reply: (options) => {
        posts.push(JSON.parse(options.body));
        return jsonResponse(200, JSON.parse(options.body));
      },
    },
  ]);
  const { result } = renderHook(() => usePartnerNetworkApiStore());
  await waitFor(() => expect(result.current.connection).toBe("ready"));

  let created;
  act(() => {
    created = result.current.addPartner();
  });
  expect(result.current.partners).toHaveLength(1);
  expect(created.id).toMatch(/^[0-9a-f-]{36}$/);
  await waitFor(() => expect(posts).toHaveLength(1));
  expect(posts[0].id).toBe(created.id);
  await waitFor(() => expect(result.current.saveState).toBe("saved"));
});

test("keystroke edits debounce into one PUT with the latest record", async () => {
  jest.useFakeTimers();
  const puts = [];
  mockRoutes([
    sessionOk,
    { url: "/api/admin/ledger", method: "GET", reply: () => jsonResponse(200, { ...EMPTY_LEDGER, partners: [{ id: "3f0b8a1e-5c2d-4e7f-8a9b-1c2d3e4f5a6b", legalName: "", terms: {} }] }) },
    {
      url: "/api/admin/partners",
      method: "PUT",
      reply: (options) => {
        puts.push(JSON.parse(options.body));
        return jsonResponse(200, JSON.parse(options.body));
      },
    },
  ]);
  const { result } = renderHook(() => usePartnerNetworkApiStore());
  await act(async () => {
    await Promise.resolve();
  });
  await act(async () => {
    await Promise.resolve();
  });
  expect(result.current.connection).toBe("ready");

  const id = "3f0b8a1e-5c2d-4e7f-8a9b-1c2d3e4f5a6b";
  act(() => {
    result.current.updatePartner(id, { legalName: "C" });
    result.current.updatePartner(id, { legalName: "Ca" });
    result.current.updatePartner(id, { legalName: "Casas MX" });
  });
  expect(result.current.saveState).toBe("saving");
  expect(puts).toHaveLength(0);
  await act(async () => {
    jest.advanceTimersByTime(800);
    await Promise.resolve();
  });
  await act(async () => {
    await Promise.resolve();
  });
  expect(puts).toHaveLength(1);
  expect(puts[0].legalName).toBe("Casas MX");
  jest.useRealTimers();
});

test("a 401 mid-save flips to auth-required and keeps the record queued", async () => {
  mockRoutes([
    sessionOk,
    ledgerOk,
    { url: "/api/admin/partners", method: "POST", reply: () => jsonResponse(401, { error: "auth_required", message: "Sign in." }) },
  ]);
  const { result } = renderHook(() => usePartnerNetworkApiStore());
  await waitFor(() => expect(result.current.connection).toBe("ready"));
  act(() => {
    result.current.addPartner();
  });
  await waitFor(() => expect(result.current.saveState).toBe("error"));
  await waitFor(() => expect(result.current.connection).toBe("auth-required"));
  expect(result.current.partners).toHaveLength(1); // optimistic record retained
});
