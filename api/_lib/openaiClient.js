// Thin wrapper around the official OpenAI SDK's Responses API. Nothing
// Path-To-Mexico-specific lives here on purpose — persona, grounding, and
// guardrails are assembled by guardrails.js and passed in as `instructions`,
// so this module stays a reusable "call the model, stream deltas, enforce a
// timeout and an output-token ceiling" primitive.

import OpenAI from "openai";

export const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-5.6-terra";
const REQUEST_TIMEOUT_MS = 20000;
const MAX_OUTPUT_TOKENS = 700; // conservative ceiling — cost control, not a quality target

let client = null;
function getClient() {
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: REQUEST_TIMEOUT_MS });
  }
  return client;
}

// `messages` is [{role: 'user'|'assistant', content: string}, ...] — the
// system/persona layer is passed separately as `instructions`, matching the
// Responses API's own separation of concerns rather than folding it into a
// synthetic "system" message.
export async function* streamAskPathReply({ instructions, messages, model = DEFAULT_MODEL }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const stream = await getClient().responses.create(
      {
        model,
        instructions,
        input: messages.map((m) => ({ role: m.role, content: m.content })),
        max_output_tokens: MAX_OUTPUT_TOKENS,
        stream: true,
      },
      { signal: controller.signal }
    );

    for await (const event of stream) {
      if (event.type === "response.output_text.delta" && event.delta) {
        yield { type: "delta", text: event.delta };
      } else if (event.type === "response.completed") {
        yield { type: "done" };
      } else if (event.type === "error") {
        throw new Error(event.message || "OpenAI response stream reported an error.");
      } else if (event.type === "response.failed") {
        throw new Error(event.response?.error?.message || "OpenAI response failed.");
      }
    }
  } finally {
    clearTimeout(timeout);
  }
}
