import { useCallback, useEffect, useState } from "react";
import { adminApi } from "../../api/adminApi";
import AdminLoginGate from "./AdminLoginGate";

// LAUNCH-W1 — server-session gate for internal surfaces that don't own a
// data store of their own (the Developer Dashboard). The Partner Network
// admin already gates itself through usePartnerNetworkApiStore; this is the
// same door, reduced to: ask /api/admin/auth whether a valid admin session
// cookie is present, and render children only when it is. Hiding markup
// client-side is not authentication — the thing that makes this real is
// that the session is minted and verified server-side (api/_lib/auth) and
// every data endpoint re-checks it. This component merely keeps the
// dashboard from rendering at all for anyone without that session.
export default function AdminSessionGate({ children }) {
  const [connection, setConnection] = useState("loading");
  const [email, setEmail] = useState("");

  const check = useCallback(async () => {
    setConnection("loading");
    const session = await adminApi.session();
    if (session.ok && session.data.authenticated) {
      setEmail(session.data.email || "");
      setConnection("ready");
    } else if (session.ok && session.data.reason === "backend_not_configured") {
      setConnection("not-configured");
    } else if (session.ok) {
      setConnection("auth-required");
    } else {
      setConnection("not-configured");
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  const login = useCallback(async (loginEmail, password) => {
    const result = await adminApi.login(loginEmail, password);
    if (result.ok) {
      setEmail(result.data.email || loginEmail);
      setConnection("ready");
      return { ok: true };
    }
    return { ok: false, error: result.error, message: result.message };
  }, []);

  const logout = useCallback(async () => {
    await adminApi.logout();
    setEmail("");
    setConnection("auth-required");
  }, []);

  if (connection !== "ready") {
    return <AdminLoginGate connection={connection} onLogin={login} onRetry={check} />;
  }

  return typeof children === "function" ? children({ email, logout }) : children;
}
