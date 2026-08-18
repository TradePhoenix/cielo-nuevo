// Server-only Supabase access. The service-role key lives exclusively here —
// it is never sent to the browser and never appears under src/ (same rule as
// OPENAI_API_KEY in openaiClient.js). All tables have RLS enabled with no
// policies, so this service client is the only thing that can read or write
// them.

import { createClient } from "@supabase/supabase-js";

let cachedClient = null;

export function isDatabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function isAuthConfigured() {
  return Boolean(
    isDatabaseConfigured() && process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_EMAILS
  );
}

export function getSupabase() {
  if (!isDatabaseConfigured()) return null;
  if (!cachedClient) {
    cachedClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cachedClient;
}

// Test seam: lets Jest inject a fake client without real credentials.
export function __setSupabaseForTests(client) {
  cachedClient = client;
}

export function adminEmailAllowlist() {
  return String(process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdminEmail(email) {
  if (!email) return false;
  return adminEmailAllowlist().includes(String(email).trim().toLowerCase());
}
