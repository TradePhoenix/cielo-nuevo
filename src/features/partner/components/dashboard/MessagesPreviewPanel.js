import { Link } from "react-router-dom";
import SectionCard from "../SectionCard";
import { formatRelativeTime } from "../../utils/formatters";

export default function MessagesPreviewPanel({ conversations }) {
  const preview = conversations.slice(0, 3);

  return (
    <SectionCard
      eyebrow="Messages"
      title="Recent Conversations"
      action={
        <Link
          to="/partner/messages"
          className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          View All
        </Link>
      }
    >
      <ul className="divide-y divide-zinc-200">
        {preview.map((conversation) => (
          <li key={conversation.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-950">{conversation.withName}</p>
              <p className="mt-0.5 truncate text-sm text-zinc-500">{conversation.lastMessagePreview}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <p className="text-xs text-zinc-500">{formatRelativeTime(conversation.lastMessageAt)}</p>
              {conversation.unreadCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d8a15f] px-1.5 text-[11px] font-bold text-zinc-950">
                  {conversation.unreadCount}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
