import { createSessionToken, verifySessionToken, SESSION_TTL_SECONDS } from "./session.js";

const SECRET = "test-secret-value";

describe("admin session tokens", () => {
  test("round-trips a valid token", () => {
    const token = createSessionToken("Admin@Example.com", SECRET);
    const session = verifySessionToken(token, SECRET);
    expect(session).toEqual({ email: "admin@example.com" });
  });

  test("rejects a tampered payload", () => {
    const token = createSessionToken("admin@example.com", SECRET);
    const [payload, sig] = token.split(".");
    const forged = Buffer.from(
      JSON.stringify({ email: "attacker@evil.com", iat: 0, exp: Math.floor(Date.now() / 1000) + 9999 })
    ).toString("base64url");
    expect(verifySessionToken(`${forged}.${sig}`, SECRET)).toBeNull();
    expect(verifySessionToken(`${payload}.AAAA${sig.slice(4)}`, SECRET)).toBeNull();
  });

  test("rejects a token signed with a different secret", () => {
    const token = createSessionToken("admin@example.com", "other-secret");
    expect(verifySessionToken(token, SECRET)).toBeNull();
  });

  test("rejects an expired token", () => {
    const past = Date.now() - (SESSION_TTL_SECONDS + 10) * 1000;
    const token = createSessionToken("admin@example.com", SECRET, past);
    expect(verifySessionToken(token, SECRET)).toBeNull();
    // …but the same token verifies at issuance time.
    expect(verifySessionToken(token, SECRET, past + 1000)).not.toBeNull();
  });

  test("rejects garbage", () => {
    expect(verifySessionToken("", SECRET)).toBeNull();
    expect(verifySessionToken("abc", SECRET)).toBeNull();
    expect(verifySessionToken("a.b.c", SECRET)).toBeNull();
    expect(verifySessionToken(null, SECRET)).toBeNull();
    expect(verifySessionToken(createSessionToken("a@b.co", SECRET), "")).toBeNull();
  });
});
