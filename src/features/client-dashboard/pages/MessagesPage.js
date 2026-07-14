import { useEffect, useRef, useState } from "react";
import ClientDashboardLayout from "../components/ClientDashboardLayout";
import PageHeader from "../components/PageHeader";
import ConversationListItem from "../components/ConversationListItem";
import MessageBubble from "../components/MessageBubble";
import NavIcon from "../components/NavIcon";
import { useClientDashboardTheme } from "../components/ThemeContext";
import { useMessagesStateContext } from "../components/MessagesStateContext";
import SEO from "../../../components/SEO";

function MessagesContent() {
  const { isDark } = useClientDashboardTheme();
  const { conversations, getThread, markRead, sendMessage, typingConversationId } = useMessagesStateContext();
  const [selectedId, setSelectedId] = useState(conversations[0]?.id || null);
  const [draft, setDraft] = useState("");
  const headingRef = useRef(null);
  const threadEndRef = useRef(null);

  useEffect(() => {
    if (headingRef.current) headingRef.current.focus();
  }, []);

  useEffect(() => {
    if (selectedId) markRead(selectedId);
  }, [selectedId, markRead]);

  const thread = selectedId ? getThread(selectedId) : [];

  useEffect(() => {
    if (threadEndRef.current) threadEndRef.current.scrollIntoView({ block: "nearest" });
  }, [thread.length, typingConversationId]);

  const selectedConversation = conversations.find((conversation) => conversation.id === selectedId);
  const isTyping = typingConversationId === selectedId;

  const handleSend = (event) => {
    event.preventDefault();
    if (!draft.trim() || !selectedId) return;
    sendMessage(selectedId, draft);
    setDraft("");
  };

  return (
    <div className="mx-auto max-w-5xl">
      <SEO title="Messages" description="Message your concierge and partners directly, in one place." path="/client-dashboard/messages" />
      <PageHeader
        eyebrow="Messages"
        title="Talk to your team, directly."
        description="Every conversation with your concierge and partners, kept in one thread."
        headingRef={headingRef}
      />

      <div className={`mt-10 grid grid-cols-1 border lg:grid-cols-[19rem_1fr] ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>
        <div className={`${selectedId ? "hidden lg:block" : "block"} max-h-[32rem] overflow-y-auto lg:border-r ${isDark ? "lg:border-zinc-800" : "lg:border-zinc-200"}`}>
          {conversations.map((conversation) => {
            const conversationThread = getThread(conversation.id);
            const lastMessage = conversationThread[conversationThread.length - 1];
            return (
              <ConversationListItem
                key={conversation.id}
                conversation={conversation}
                lastMessage={lastMessage ? lastMessage.text : ""}
                isActive={conversation.id === selectedId}
                onSelect={() => setSelectedId(conversation.id)}
              />
            );
          })}
        </div>

        <div className={`${selectedId ? "flex" : "hidden lg:flex"} h-[32rem] flex-col`}>
          {selectedConversation ? (
            <>
              <div className={`flex items-center gap-3 border-b px-5 py-4 ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="p-1 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
                  aria-label="Back to conversations"
                >
                  <NavIcon name="close" className="h-4 w-4" />
                </button>
                <div>
                  <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-zinc-950"}`}>{selectedConversation.withName}</p>
                  <p className={`text-xs ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>{selectedConversation.withRole}</p>
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                {thread.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                {isTyping && (
                  <p className={`text-xs italic ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>{selectedConversation.withName} is typing…</p>
                )}
                <div ref={threadEndRef} />
              </div>

              <form onSubmit={handleSend} className={`flex items-center gap-3 border-t px-5 py-4 ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>
                <label htmlFor="compose-message" className="sr-only">
                  Write a message
                </label>
                <input
                  id="compose-message"
                  type="text"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Write a message…"
                  className={`flex-1 border px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] ${
                    isDark ? "border-zinc-700 bg-zinc-900 text-white placeholder:text-zinc-500" : "border-zinc-300 bg-white text-zinc-950 placeholder:text-zinc-400"
                  }`}
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="bg-zinc-950 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-zinc-950"
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className={`text-sm ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>Select a conversation to view messages.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Routed /client-dashboard/messages
export default function MessagesPage() {
  return (
    <ClientDashboardLayout>
      <MessagesContent />
    </ClientDashboardLayout>
  );
}
