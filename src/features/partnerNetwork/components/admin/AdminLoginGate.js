import { useState } from "react";
import { AdminButton } from "./fields";

// Authentication states for the Partner Network admin. Deliberately
// router-free (testable under the project's Jest constraint) and quiet in
// tone — an internal door, not a marketing surface. The form posts to
// /api/admin/auth via the store's login(); real enforcement is server-side
// on every API call, this component is just the UI for it.

const inputClass =
  "w-full border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-950 focus-visible:ring-2 focus-visible:ring-[#d8a15f]";

function Frame({ children }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-md border border-zinc-200 bg-white p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Path To Mexico · Internal</p>
        {children}
      </div>
    </div>
  );
}

export default function AdminLoginGate({ connection, onLogin, onRetry }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (connection === "loading") {
    return (
      <Frame>
        <h1 className="mt-4 text-2xl font-light tracking-[-0.02em]">Partner Network</h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-500" role="status">
          Loading…
        </p>
      </Frame>
    );
  }

  if (connection === "not-configured") {
    return (
      <Frame>
        <h1 className="mt-4 text-2xl font-light tracking-[-0.02em]">Backend not configured</h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600">
          The PTM database and admin authentication aren't configured in this environment, so the Partner Network
          admin can't load records. Nothing is broken — this is the expected development state.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
          Setup steps live in <span className="font-mono text-xs">docs/data-foundation/SETUP.md</span> (Supabase
          project, environment variables, admin user). Local development also needs the API server:{" "}
          <span className="font-mono text-xs">npm run dev:api</span>.
        </p>
      </Frame>
    );
  }

  if (connection === "error") {
    return (
      <Frame>
        <h1 className="mt-4 text-2xl font-light tracking-[-0.02em]">Something went wrong</h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600">
          The Partner Network records couldn't be loaded. This is usually temporary.
        </p>
        <div className="mt-6">
          <AdminButton onClick={onRetry}>Try Again</AdminButton>
        </div>
      </Frame>
    );
  }

  // auth-required
  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    const result = await onLogin(email.trim(), password);
    if (!result.ok) {
      setError(result.message || "That email and password combination wasn't accepted.");
      setSubmitting(false);
    }
  };

  return (
    <Frame>
      <h1 className="mt-4 text-2xl font-light tracking-[-0.02em]">Partner Network</h1>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">Sign in to access PTM's partner records.</p>
      <form onSubmit={submit} className="mt-6 grid gap-4">
        <label className="block">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Email</span>
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1.5 ${inputClass}`}
          />
        </label>
        <label className="block">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mt-1.5 ${inputClass}`}
          />
        </label>
        {error && (
          <p role="alert" className="text-sm leading-relaxed text-[#b3543f]">
            {error}
          </p>
        )}
        <div className="mt-1">
          <AdminButton type="submit" disabled={submitting}>
            {submitting ? "Signing In…" : "Sign In"}
          </AdminButton>
        </div>
      </form>
    </Frame>
  );
}
