import { useEffect, useState } from "react";
import SEO from "../../../components/SEO";
import PartnerPortalShell from "../components/PartnerPortalShell";
import ConversationList from "../components/messages/ConversationList";
import MessageThread from "../components/messages/MessageThread";
import ComposeBox from "../components/messages/ComposeBox";
import { usePartnerPortalStore } from "../hooks/usePartnerPortalStore";

// Two-pane on desktop (list + thread both visible); a single pane that
// toggles between list and thread on mobile, since there isn't room for
// both — selecting a conversation marks it read immediately, matching how
// a real messaging inbox behaves the moment a thread is opened.
export default function PartnerMessagesPage() {
  const { partner, conversations, messages, sendMessage, markConversationRead, unreadNotificationCount } =
    usePartnerPortalStore();
  const [selectedId, setSelectedId] = useState(conversations[0]?.id ?? null);

  useEffect(() => {
    if (selectedId) markConversationRead(selectedId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const selectedConversation = conversations.find((conversation) => conversation.id === selectedId) || null;
  const threadMessages = selectedId ? messages[selectedId] || [] : [];

  return (
    <PartnerPortalShell partner={partner} unreadNotificationCount={unreadNotificationCount}>
      <SEO title="Messages" description="Message clients and the Path To Mexico team directly." path="/partner/messages" />

      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Messages</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
        Your conversations.
      </h1>

      <div className="mt-8 grid grid-cols-1 border border-zinc-200 md:grid-cols-[320px_1fr]">
        <div className={selectedId ? "hidden md:block" : "block"}>
          <ConversationList conversations={conversations} selectedId={selectedId} onSelect={setSelectedId} />
        </div>

        <div className={`flex h-[32rem] flex-col border-zinc-200 md:border-l ${selectedId ? "flex" : "hidden md:flex"}`}>
          {selectedConversation ? (
            <>
              <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-5 py-4">
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 hover:text-zinc-950 md:hidden"
                >
                  &larr; Back
                </button>
                <div className="text-right md:text-left">
                  <p className="text-sm font-medium text-zinc-950">{selectedConversation.withName}</p>
                  <p className="text-xs text-zinc-500">{selectedConversation.withRole}</p>
                </div>
              </div>
              <MessageThread conversation={selectedConversation} messages={threadMessages} />
              <ComposeBox onSend={(body) => sendMessage(selectedConversation.id, body)} />
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-8 text-sm text-zinc-500">
              Select a conversation to view messages.
            </div>
          )}
        </div>
      </div>
    </PartnerPortalShell>
  );
}
