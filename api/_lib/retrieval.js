// Deterministic local retrieval — no vector store, no embeddings API call.
// Scores every knowledge record against the visitor's latest message (plus
// a little recent conversation context) using plain keyword overlap, and
// returns the top few matches. Simple on purpose: the knowledge base is a
// few dozen records, not a corpus that needs approximate search, and a
// deterministic scorer is trivial to unit test and reason about (see
// api/_lib/retrieval.test.js).

import { getKnowledgeRecords } from "./knowledge/index.js";

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "is", "are", "was", "were",
  "i", "you", "it", "my", "me", "we", "do", "does", "did", "how", "what", "where", "when",
  "el", "la", "los", "las", "de", "en", "y", "o", "un", "una", "es", "son", "yo", "mi", "que",
  "cómo", "como", "dónde", "donde", "cuándo", "cuando", "qué",
]);

function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip combining accents so "México"/"Mexico" match the same token
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOPWORDS.has(word));
}

function recordHaystack(record) {
  const bits = [
    record.title?.en,
    record.title?.es,
    record.content?.en,
    record.content?.es,
    ...(record.keywords || []),
  ].filter(Boolean);
  return tokenize(bits.join(" "));
}

function scoreRecord(record, queryTokens) {
  const haystack = recordHaystack(record);
  if (haystack.length === 0 || queryTokens.length === 0) return 0;
  const haystackSet = new Set(haystack);
  let score = 0;
  for (const token of queryTokens) {
    if (haystackSet.has(token)) score += 1;
    // Loose substring match too (e.g. "merida" query vs "mérida" title
    // already normalized above; this also catches simple plurals like
    // "guides"/"guide").
    else if (haystack.some((h) => h.includes(token) || token.includes(h))) score += 0.5;
  }
  return score;
}

// `recentContext` is a short string of the last user/assistant turns,
// weighted lower than the current message — keeps a multi-turn
// conversation ("tell me more about that") retrieving sensibly without
// letting old topics dominate a genuinely new question.
export function retrieveRelevantRecords({ message, recentContext = "", maxResults = 5, minScore = 1 }) {
  const records = getKnowledgeRecords();
  const queryTokens = tokenize(message);
  const contextTokens = tokenize(recentContext);

  const scored = records
    .map((record) => ({
      record,
      score: scoreRecord(record, queryTokens) + scoreRecord(record, contextTokens) * 0.3,
    }))
    .filter((entry) => entry.score >= minScore)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, maxResults).map((entry) => entry.record);
}
