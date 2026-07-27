import { useEffect, useRef, useState } from "react";
import { ASK_PATH_COPY } from "../data/copy";
import MessageBubble from "./MessageBubble";
import BlueprintOptIn from "./BlueprintOptIn";
import HandoffForm from "./HandoffForm";
import { trackEvent, ANALYTICS_EVENTS } from "../../../utils/analytics";

export default function AskPathPanel({ conversation, onClose }) {
  const {
    messages,
    language,
    toggleLanguage,
    status,
    error,
    lastMeta,
    sendMessage,
    newConversation,
    blueprintContext,
    acceptBlueprintContext,
    declineBlueprintContext,
    isFull,
  } = conversation;

  const t = ASK_PATH_COPY[language];
  const [draft, setDraft] = useState("");
  const [showBlueprintOptIn, setShowBlueprintOptIn] = useState(false);
  const [showHandoff, setShowHandoff] = useState(false);
  const panelRef = useRef(null);
  const composerRef = useRef(null);
  const listEndRef = useRef(null);

  useEffect(() => {
    composerRef.current?.focus();
  }, []);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  useEffect(() => {
    if (error) trackEvent(ANALYTICS_EVENTS.ASK_PATH_ERROR, { errorType: error.type });
  }, [error]);

  useEffect(() => {
    if (lastMeta?.leadQualification?.level === "high") {
      trackEvent(ANALYTICS_EVENTS.ASK_PATH_QUALIFIED_INTENT_REACHED, { signals: lastMeta.leadQualification.signals });
    }
  }, [lastMeta]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const hasMessages = messages.length > 0;
  const escalation = lastMeta?.escalation;
  const sources = lastMeta?.sources || [];

  function handleSend(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    if (!hasMessages) trackEvent(ANALYTICS_EVENTS.ASK_PATH_CONVERSATION_STARTED);
    sendMessage(draft);
    setDraft("");
  }

  function handlePrompt(prompt) {
    trackEvent(ANALYTICS_EVENTS.ASK_PATH_PROMPT_SELECTED, { promptId: prompt.id });
    if (!hasMessages) trackEvent(ANALYTICS_EVENTS.ASK_PATH_CONVERSATION_STARTED);
    sendMessage(prompt.message);
  }

  function handleClose() {
    onClose();
  }

  const escalationCopy =
    escalation?.reason === "safety_or_medical" || escalation?.reason === "distress"
      ? t.escalationDistress
      : escalation?.reason === "high_value_intent"
      ? t.escalationHighValue
      : escalation?.reason === "professional_coordination"
      ? t.escalationProfessional
      : null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.panelTitle}
      className="fixed inset-0 z-50 flex flex-col bg-white sm:inset-auto sm:bottom-24 sm:left-6 sm:h-[640px] sm:max-h-[80vh] sm:w-[400px] sm:rounded-2xl sm:border sm:border-zinc-200 sm:shadow-2xl"
    >
      <header className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <img src="/brand/logos/ptm-motion-mark-ink.svg" alt="" aria-hidden="true" className="h-6 w-6" />
          <div>
            <p className="text-sm font-semibold text-zinc-950">{t.panelTitle}</p>
            <p className="text-xs text-zinc-500">{t.panelSubtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full border border-zinc-300 px-2.5 py-1 text-xs font-semibold text-zinc-600 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
            aria-label={`Language: ${language === "en" ? "English" : "Español"}`}
          >
            {t.languageToggle}
          </button>
          <button
            type="button"
            onClick={() => {
              newConversation();
              setShowHandoff(false);
            }}
            className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
            aria-label={t.newConversation}
            title={t.newConversation}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 12a9 9 0 1 1 3 6.7M3 21v-6h6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
            aria-label={t.close}
            title={t.close}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {!hasMessages && (
          <div className="mb-4">
            <p className="text-sm leading-relaxed text-zinc-700">{t.welcome}</p>
            <div className="mt-4 flex flex-col gap-2">
              {t.openingPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => handlePrompt(prompt)}
                  className="rounded-full border border-zinc-300 px-4 py-2.5 text-left text-sm text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {messages.map((m, i) => (
            <MessageBubble key={i} role={m.role} content={m.content} />
          ))}
        </div>

        <div aria-live="polite" className="sr-only">
          {status === "streaming" ? t.thinking : ""}
        </div>

        {hasMessages && !showBlueprintOptIn && !blueprintContext && messages.length <= 2 && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => {
                setShowBlueprintOptIn(true);
                trackEvent(ANALYTICS_EVENTS.ASK_PATH_BLUEPRINT_OFFERED);
              }}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950"
            >
              {t.blueprintOptInPrompt}
            </button>
          </div>
        )}

        {showBlueprintOptIn && !blueprintContext && (
          <div className="mt-3">
            <BlueprintOptIn
              t={t}
              trackEvent={trackEvent}
              ANALYTICS_EVENTS={ANALYTICS_EVENTS}
              onAccept={(summary) => {
                acceptBlueprintContext(summary);
                setShowBlueprintOptIn(false);
              }}
              onDecline={() => {
                declineBlueprintContext();
                setShowBlueprintOptIn(false);
              }}
            />
          </div>
        )}

        {sources.length > 0 && (
          <div className="mt-3 rounded-xl border border-zinc-200 bg-[#f6f1e8] p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">{t.sourcesLabel}</p>
            <ul className="mt-2 flex flex-col gap-1">
              {sources.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.route}
                    onClick={() => trackEvent(ANALYTICS_EVENTS.ASK_PATH_SOURCE_CLICKED, { sourceId: s.id, category: s.category })}
                    className="text-sm font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {escalationCopy && (
          <div className="mt-3 rounded-xl border border-[#d8a15f] bg-white p-3">
            <p className="text-sm text-zinc-800">{escalationCopy}</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <a
                href="/mexico-fit-call"
                onClick={() => trackEvent(ANALYTICS_EVENTS.ASK_PATH_FIT_CALL_SELECTED, { reason: escalation.reason })}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-900 underline decoration-[#d8a15f] underline-offset-4"
              >
                {t.fitCallCta}
              </a>
              <button
                type="button"
                onClick={() => {
                  setShowHandoff(true);
                  trackEvent(ANALYTICS_EVENTS.ASK_PATH_HUMAN_HANDOFF_REQUESTED, { reason: escalation.reason });
                }}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600 underline decoration-zinc-300 underline-offset-4"
              >
                {t.handoffButtonLabel}
              </button>
            </div>
          </div>
        )}

        {!showHandoff && hasMessages && !escalationCopy && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => {
                setShowHandoff(true);
                trackEvent(ANALYTICS_EVENTS.ASK_PATH_HUMAN_HANDOFF_REQUESTED, { reason: "manual" });
              }}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950"
            >
              {t.handoffIntro}
            </button>
          </div>
        )}

        {showHandoff && (
          <div className="mt-3">
            <HandoffForm t={t} messages={messages} language={language} />
          </div>
        )}

        {lastMeta?.sensitiveInput?.flagged && (
          <div role="status" className="mt-3 rounded-xl border border-[#d8a15f] bg-[#f6f1e8] p-3 text-xs text-zinc-700">
            {t.sensitiveWarning}
          </div>
        )}

        {error && (
          <div role="alert" className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            <p>
              {error.type === "rate_limited"
                ? t.errorRateLimited(error.retryAfterSeconds)
                : error.type === "unavailable"
                ? t.errorUnavailable
                : t.errorGeneric}
            </p>
          </div>
        )}

        <div ref={listEndRef} />
      </div>

      <div className="border-t border-zinc-200 px-4 py-3">
        <form onSubmit={handleSend} className="flex items-end gap-2">
          <textarea
            ref={composerRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            disabled={status === "streaming" || isFull}
            placeholder={t.composerPlaceholder}
            rows={1}
            aria-label={t.composerPlaceholder}
            className="max-h-24 flex-1 resize-none rounded-xl border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-950 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "streaming" || !draft.trim() || isFull}
            className="rounded-full bg-zinc-950 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 disabled:opacity-50"
          >
            {t.send}
          </button>
        </form>
        <p className="mt-2 text-[11px] leading-snug text-zinc-500">{t.privacyNotice}</p>
      </div>
    </div>
  );
}
