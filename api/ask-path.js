// POST /api/ask-path — the only place OPENAI_API_KEY is read. The React
// client never talks to OpenAI directly; it only ever calls this endpoint.
//
// Response protocol: newline-delimited JSON (NDJSON), one object per line —
// { type: "delta", text } for each streamed text chunk, then a single
// { type: "done", sources, escalation, leadQualification, sensitiveInput }
// trailer with everything the UI needs to render source links / CTAs. On a
// validation or upstream failure before any streaming has started, this
// instead returns a single non-streamed JSON error body with a normal HTTP
// status code (400/429/503/500) — see the early-return branches below.
//
// This file is intentionally thin: validation, rate limiting, retrieval,
// guardrails, and the OpenAI call itself all live in api/_lib/, so the
// same pieces are callable outside an HTTP handler (see
// docs/ask-path/ORION_INTEGRATION_CONTRACT.md).

import { validateAskPathRequest } from "./_lib/validation.js";
import { checkRateLimit, getClientIp } from "./_lib/rateLimiter.js";
import { retrieveRelevantRecords } from "./_lib/retrieval.js";
import { buildSystemPrompt, detectSensitiveInput } from "./_lib/guardrails.js";
import { detectEscalationSignal } from "./_lib/escalation.js";
import { scoreLeadQualification } from "./_lib/leadQualification.js";
import { streamAskPathReply } from "./_lib/openaiClient.js";

function sendJson(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json").end(JSON.stringify(body));
}

// The OpenAI SDK's own error messages sometimes echo a masked fragment of
// the API key that was sent (e.g. "sk-inval***...0000") — found during QA
// with a deliberately-invalid test key. That's still a key fragment, so it
// gets stripped before anything is logged, regardless of source.
const API_KEY_FRAGMENT_PATTERN = /\bsk-[A-Za-z0-9*_-]{6,}\b/g;

function redactSecrets(value) {
  if (typeof value !== "string") return value;
  return value.replace(API_KEY_FRAGMENT_PATTERN, "[redacted]");
}

function safeLog(event, fields = {}) {
  // Never log message content — only metadata needed to debug abuse/errors.
  const sanitized = { ...fields };
  if (typeof sanitized.message === "string") sanitized.message = redactSecrets(sanitized.message);
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ event, ...sanitized, ts: new Date().toISOString() }));
}

export default async function handler(req, res) {
  const startedAt = Date.now();

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "method_not_allowed", message: "Use POST." });
  }

  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    res.setHeader("Retry-After", String(rateLimit.retryAfterSeconds));
    return sendJson(res, 429, {
      error: "rate_limited",
      message: "Too many requests — please wait a moment before sending another message.",
      retryAfterSeconds: rateLimit.retryAfterSeconds,
    });
  }

  // req.body is a lazy getter (the platform parses JSON on first access) and
  // throws on malformed JSON — caught here so a bad request body always
  // yields our own clean 400, never a raw platform error/500.
  let body;
  try {
    body = req.body;
  } catch (error) {
    return sendJson(res, 400, { error: "invalid_json", message: "Request body must be valid JSON." });
  }

  const contentLength = Number(req.headers["content-length"] || 0);
  const validation = validateAskPathRequest(body, { rawBodyLength: contentLength });
  if (!validation.valid) {
    return sendJson(res, 400, { error: validation.code, message: validation.message });
  }

  if (!process.env.OPENAI_API_KEY) {
    safeLog("ask_path_missing_api_key");
    return sendJson(res, 503, {
      error: "service_unavailable",
      message: "Ask Path isn't configured yet — please use the Mexico Fit Call or a guide page instead.",
    });
  }

  const { messages, language, blueprintContext } = body;
  const lastUserMessage = messages[messages.length - 1].content;
  const recentContext = messages
    .slice(0, -1)
    .slice(-4)
    .map((m) => m.content)
    .join(" ");

  const sensitiveInput = detectSensitiveInput(lastUserMessage);
  const records = retrieveRelevantRecords({ message: lastUserMessage, recentContext });
  const instructions = buildSystemPrompt({ language, records, blueprintContext });

  res.status(200);
  res.setHeader("Content-Type", "application/x-ndjson");
  res.setHeader("Cache-Control", "no-store");
  if (typeof res.flushHeaders === "function") res.flushHeaders();

  let streamedAny = false;
  let fullReply = "";

  try {
    for await (const event of streamAskPathReply({ instructions, messages, model: undefined })) {
      if (event.type === "delta") {
        streamedAny = true;
        fullReply += event.text;
        res.write(`${JSON.stringify({ type: "delta", text: event.text })}\n`);
      }
    }

    const conversationText = `${messages.map((m) => m.content).join(" ")} ${fullReply}`;
    const escalation = detectEscalationSignal(conversationText);
    const leadQualification = scoreLeadQualification(messages);

    res.write(
      `${JSON.stringify({
        type: "done",
        sources: records.map((r) => ({
          id: r.id,
          title: r.title?.[language] || r.title?.en,
          route: r.route,
          category: r.category,
        })),
        escalation,
        leadQualification,
        sensitiveInput,
      })}\n`
    );
    res.end();
    safeLog("ask_path_completed", { ip, ms: Date.now() - startedAt, recordCount: records.length });
  } catch (error) {
    safeLog("ask_path_error", { ip, ms: Date.now() - startedAt, name: error?.name, message: error?.message });
    if (!streamedAny) {
      // Nothing sent yet beyond headers — still send a clean structured
      // error the client can render as a real error state.
      res.write(
        `${JSON.stringify({
          type: "error",
          error: "upstream_error",
          message: "Ask Path couldn't reach its AI provider just now — please try again in a moment.",
        })}\n`
      );
    } else {
      res.write(
        `${JSON.stringify({ type: "error", error: "stream_interrupted", message: "The response was interrupted — please try again." })}\n`
      );
    }
    res.end();
  }
}
