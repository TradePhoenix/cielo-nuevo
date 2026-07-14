import { useCallback, useEffect, useRef, useState } from "react";
import { CONVERSATIONS, MESSAGE_THREADS } from "../mock/mockMessages";
import { readState, writeState } from "../utils/storage";

const STORAGE_KEY = "pathToMexico.clientDashboard.messages.v1";
const STORAGE_VERSION = 1;

const AUTO_REPLIES = [
  "Got it, thank you for the update!",
  "Thanks for letting us know — we'll follow up shortly.",
  "Perfect, noted. Anything else you need from us?",
];

function loadExtra() {
  return readState(STORAGE_KEY, STORAGE_VERSION, { threads: {}, readIds: [] });
}

// Local-state-only messaging: every conversation starts from the seeded
// mock thread, and anything the client sends (plus the mock auto-reply) is
// layered on top and persisted so a refresh doesn't lose the thread.
export function useMessagesState() {
  const [{ threads: extraThreads, readIds }, setExtra] = useState(loadExtra);
  const [typingConversationId, setTypingConversationId] = useState(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    writeState(STORAGE_KEY, STORAGE_VERSION, { threads: extraThreads, readIds });
  }, [extraThreads, readIds]);

  useEffect(() => () => clearTimeout(typingTimeoutRef.current), []);

  const conversations = CONVERSATIONS.map((conversation) => ({
    ...conversation,
    unreadCount: readIds.includes(conversation.id) ? 0 : conversation.unreadCount,
  }));

  const getThread = useCallback(
    (conversationId) => [...(MESSAGE_THREADS[conversationId] || []), ...(extraThreads[conversationId] || [])],
    [extraThreads]
  );

  const markRead = useCallback((conversationId) => {
    setExtra((prev) => (prev.readIds.includes(conversationId) ? prev : { ...prev, readIds: [...prev.readIds, conversationId] }));
  }, []);

  const sendMessage = useCallback((conversationId, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const clientMessage = { id: `local-${Date.now()}`, sender: "client", text: trimmed, timestamp: new Date().toISOString() };

    setExtra((prev) => ({
      ...prev,
      threads: { ...prev.threads, [conversationId]: [...(prev.threads[conversationId] || []), clientMessage] },
    }));

    setTypingConversationId(conversationId);
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      const replyMessage = { id: `local-reply-${Date.now()}`, sender: "team", text: reply, timestamp: new Date().toISOString() };
      setExtra((prev) => ({
        ...prev,
        threads: { ...prev.threads, [conversationId]: [...(prev.threads[conversationId] || []), replyMessage] },
      }));
      setTypingConversationId(null);
    }, 1800);
  }, []);

  return { conversations, getThread, markRead, sendMessage, typingConversationId };
}
