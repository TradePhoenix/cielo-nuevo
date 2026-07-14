import { useClientDashboardTheme } from "./ThemeContext";
import { timeAgo } from "../utils/formatters";

export default function ConversationListItem({ conversation, lastMessage, isActive, onSelect }) {
  const { isDark } = useClientDashboardTheme();

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-start gap-3 border-b px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d8a15f] ${
        isDark ? "border-zinc-800" : "border-zinc-200"
      } ${isActive ? (isDark ? "bg-white/5" : "bg-zinc-50") : ""}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d8a15f] text-xs font-semibold text-zinc-950">
        {conversation.initials}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className={`truncate text-sm font-medium ${isDark ? "text-white" : "text-zinc-950"}`}>{conversation.withName}</span>
          <span className={`shrink-0 text-[10px] uppercase tracking-[0.1em] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
            {timeAgo(conversation.updatedAt)}
          </span>
        </span>
        <span className={`block truncate text-xs ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>{conversation.withRole}</span>
        {lastMessage && (
          <span className={`mt-1 block truncate text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{lastMessage}</span>
        )}
      </span>
      {conversation.unreadCount > 0 && (
        <span className="flex h-5 min-w-[1.25rem] shrink-0 items-center justify-center bg-[#d8a15f] px-1 text-[10px] font-semibold text-zinc-950">
          {conversation.unreadCount}
        </span>
      )}
    </button>
  );
}
