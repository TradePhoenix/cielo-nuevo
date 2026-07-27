// Ask Path — conversation state. Session-only by design (sessionStorage,
// not localStorage): the ticket requires conversation history to live only
// for the current browser session, with no cross-session memory without
// consent. Language, messages, and the (opt-in only) Blueprint context all
// live here; the actual network call is the only side effect.

import { useState, useCallback, useEffect, useRef } from "react";
import { parseNdjsonStream } from "../logic/parseNdjsonStream";

const STORAGE_KEY = "pathToMexico.askPath.v1";
// Mirrors api/_lib/validation.js's LIMITS.MAX_MESSAGES — kept in sync
// manually since the client bundle can't import a Node-only api/ file.
// This copy is only a UX nicety (disabling the composer early); the real
// enforcement is server-side.
export const MAX_MESSAGES = 24;

function detectInitialLanguage() {
  if (typeof navigator !== "undefined" && typeof navigator.language === "string" && navigator.language.toLowerCase().startsWith("es")) {
    return "es";
  }
  return "en";
}

function loadInitial() {
  const defaults = { messages: [], language: detectInitialLanguage() };
  if (typeof window === "undefined") return defaults;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return {
      messages: Array.isArray(parsed.messages) ? parsed.messages : [],
      language: parsed.language === "es" || parsed.language === "en" ? parsed.language : defaults.language,
    };
  } catch (error) {
    return defaults;
  }
}

export function useAskPathConversation() {
  const [{ messages, language }, setState] = useState(loadInitial);
  const [status, setStatus] = useState("idle"); // idle | streaming | error
  const [error, setError] = useState(null);
  const [lastMeta, setLastMeta] = useState(null);
  const [blueprintContext, setBlueprintContext] = useState(null);
  const messagesRef = useRef(messages);
  const languageRef = useRef(language);
  messagesRef.current = messages;
  languageRef.current = language;

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, language }));
  }, [messages, language]);

  const setLanguage = useCallback((lang) => setState((s) => ({ ...s, language: lang })), []);
  const toggleLanguage = useCallback(
    () => setState((s) => ({ ...s, language: s.language === "en" ? "es" : "en" })),
    []
  );

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text || "").trim();
      if (!trimmed || status === "streaming" || messagesRef.current.length >= MAX_MESSAGES) return;

      const userMessage = { role: "user", content: trimmed };
      const requestMessages = [...messagesRef.current, userMessage];

      setState((s) => ({ ...s, messages: [...requestMessages, { role: "assistant", content: "" }] }));
      setStatus("streaming");
      setError(null);

      try {
        const response = await fetch("/api/ask-path", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: requestMessages, language: languageRef.current, blueprintContext }),
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          if (response.status === 429) {
            setError({ type: "rate_limited", retryAfterSeconds: body.retryAfterSeconds || 30 });
          } else if (response.status === 503) {
            setError({ type: "unavailable" });
          } else {
            setError({ type: "generic" });
          }
          setStatus("error");
          setState((s) => ({ ...s, messages: s.messages.slice(0, -1) }));
          return;
        }

        let assistantText = "";
        for await (const event of parseNdjsonStream(response)) {
          if (event.type === "delta") {
            assistantText += event.text;
            const textSoFar = assistantText;
            setState((s) => {
              const updated = [...s.messages];
              updated[updated.length - 1] = { role: "assistant", content: textSoFar };
              return { ...s, messages: updated };
            });
          } else if (event.type === "done") {
            setLastMeta({
              sources: event.sources || [],
              escalation: event.escalation || null,
              leadQualification: event.leadQualification || null,
              sensitiveInput: event.sensitiveInput || null,
            });
          } else if (event.type === "error") {
            setError({ type: "generic" });
            setStatus("error");
          }
        }
        setStatus((current) => (current === "error" ? current : "idle"));
      } catch (err) {
        setError({ type: "generic" });
        setStatus("error");
      }
    },
    [status, blueprintContext]
  );

  const newConversation = useCallback(() => {
    setState((s) => ({ ...s, messages: [] }));
    setLastMeta(null);
    setError(null);
    setStatus("idle");
  }, []);

  const acceptBlueprintContext = useCallback((summary) => setBlueprintContext(summary), []);
  const declineBlueprintContext = useCallback(() => setBlueprintContext(null), []);

  return {
    messages,
    language,
    setLanguage,
    toggleLanguage,
    status,
    error,
    lastMeta,
    sendMessage,
    newConversation,
    blueprintContext,
    acceptBlueprintContext,
    declineBlueprintContext,
    isFull: messages.length >= MAX_MESSAGES,
  };
}
