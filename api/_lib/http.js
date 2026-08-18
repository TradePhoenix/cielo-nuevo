// Shared HTTP plumbing for PTM's serverless functions. Every response body a
// public or admin caller can see goes through sendJson/sendError so database
// internals, stack traces, and environment details never leak (see
// ask-path.js's safeLog for the same discipline on the logging side).

export function sendJson(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json").end(JSON.stringify(body));
}

export function sendError(res, status, error, message) {
  sendJson(res, status, { error, message });
}

// Uniform 500 for unexpected failures: log the real error server-side only.
export function sendServerError(res, context, err) {
  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify({
      event: "api_server_error",
      context,
      name: err?.name,
      message: err?.message,
      ts: new Date().toISOString(),
    })
  );
  sendError(res, 500, "server_error", "Something went wrong on our side. Please try again.");
}

// req.body is a lazy getter on Vercel that throws on malformed JSON.
export function readJsonBody(req) {
  try {
    const body = req.body;
    if (!body || typeof body !== "object" || Array.isArray(body)) return { ok: false };
    return { ok: true, body };
  } catch (error) {
    return { ok: false };
  }
}

export function methodNotAllowed(res, allowed) {
  res.setHeader("Allow", allowed.join(", "));
  sendError(res, 405, "method_not_allowed", `Use ${allowed.join(" or ")}.`);
}

export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}
