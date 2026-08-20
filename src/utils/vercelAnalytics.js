// LAUNCH-W1 — Vercel Web Analytics, loaded the dependency-free way.
//
// Web Analytics is already enabled on the Vercel project, which makes the
// collector script available at /_vercel/insights/script.js on every
// deployment — no npm package required. Loading it from here (rather than a
// <script> tag in public/index.html) keeps it production-only, so local
// development never 404s on a route that only exists on Vercel, and Jest
// never sees it. The script is cookieless and records page views plus the
// custom events dispatched through utils/analytics.js.
//
// window.va is the documented queueing shim: calls made before the script
// finishes loading are buffered in window.vaq and replayed by the script.
export const VERCEL_INSIGHTS_SRC = "/_vercel/insights/script.js";

export function initVercelAnalytics({ env = process.env.NODE_ENV, doc = typeof document !== "undefined" ? document : null } = {}) {
  if (env !== "production" || !doc || typeof window === "undefined") return false;
  if (doc.querySelector(`script[src="${VERCEL_INSIGHTS_SRC}"]`)) return true;

  window.va =
    window.va ||
    function va() {
      (window.vaq = window.vaq || []).push(arguments);
    };

  const script = doc.createElement("script");
  script.defer = true;
  script.src = VERCEL_INSIGHTS_SRC;
  doc.head.appendChild(script);
  return true;
}
