import EmptyState from "../EmptyState";
import { notificationTypeConfig } from "../../utils/statusConfig";
import { formatRelativeTime } from "../../utils/formatters";

// Each notification type gets a short monogram rather than an icon —
// avoids pulling in an icon library for a handful of glyphs, and reads
// clearly at this size against the eyebrow-label type treatment already
// used everywhere else in the portal.
const TYPE_MONOGRAMS = {
  new_referral: "NR",
  upcoming_appointment: "AP",
  missing_documents: "DC",
  unread_message: "MS",
  reminder: "RM",
};

export default function NotificationList({ notifications, onMarkRead }) {
  if (notifications.length === 0) {
    return <EmptyState title="You're all caught up" description="New notifications will appear here." />;
  }

  return (
    <ul className="divide-y divide-zinc-200 border border-zinc-200 bg-white">
      {notifications.map((notification) => (
        <li key={notification.id}>
          <button
            type="button"
            onClick={() => onMarkRead(notification.id)}
            className={`flex w-full items-start gap-4 px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d8a15f] ${
              notification.read ? "hover:bg-zinc-50" : "bg-[#f6f1e8] hover:bg-[#f0e8d8]"
            }`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-zinc-950 text-[10px] font-bold uppercase tracking-[0.05em] text-zinc-950">
              {TYPE_MONOGRAMS[notification.type]}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                  {notificationTypeConfig(notification.type).label}
                </span>
                <span className="shrink-0 text-xs text-zinc-500">{formatRelativeTime(notification.createdAt)}</span>
              </span>
              <span className="mt-1 block text-sm font-medium text-zinc-950">{notification.title}</span>
              <span className="mt-0.5 block text-sm text-zinc-600">{notification.body}</span>
            </span>
            {!notification.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d8a15f]" />}
          </button>
        </li>
      ))}
    </ul>
  );
}
