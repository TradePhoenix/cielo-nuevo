import { initials, formatRelativeTime } from "../../utils/formatters";

export default function ConversationList({ conversations, selectedId, onSelect }) {
  return (
    <ul className="divide-y divide-zinc-200 border border-zinc-200 bg-white">
      {conversations.map((conversation) => {
        const isSelected = conversation.id === selectedId;
        return (
          <li key={conversation.id}>
            <button
              type="button"
              onClick={() => onSelect(conversation.id)}
              aria-current={isSelected}
              className={`flex w-full items-start gap-3 px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d8a15f] ${
                isSelected ? "bg-[#f6f1e8]" : "hover:bg-zinc-50"
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-[11px] font-semibold text-white">
                {initials(conversation.withName)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium text-zinc-950">{conversation.withName}</span>
                  <span className="shrink-0 text-xs text-zinc-500">{formatRelativeTime(conversation.lastMessageAt)}</span>
                </span>
                <span className="mt-0.5 block truncate text-sm text-zinc-500">
                  {conversation.isTyping ? "Typing…" : conversation.lastMessagePreview}
                </span>
              </span>
              {conversation.unreadCount > 0 && (
                <span className="mt-1 inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#d8a15f] px-1.5 text-[11px] font-bold text-zinc-950">
                  {conversation.unreadCount}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
