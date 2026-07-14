import { Link } from "react-router-dom";
import SectionCard from "../SectionCard";
import EmptyState from "../EmptyState";
import { notificationTypeConfig } from "../../utils/statusConfig";
import { formatRelativeTime } from "../../utils/formatters";

export default function NotificationsPreviewPanel({ notifications }) {
  const preview = notifications.slice(0, 4);

  return (
    <SectionCard
      eyebrow="Notifications"
      title="What Needs Attention"
      action={
        <Link
          to="/partner/notifications"
          className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          View All
        </Link>
      }
    >
      {preview.length === 0 ? (
        <EmptyState title="You're all caught up" />
      ) : (
        <ul className="divide-y divide-zinc-200">
          {preview.map((notification) => (
            <li key={notification.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
              {!notification.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d8a15f]" />}
              <div className={notification.read ? "ml-[18px]" : ""}>
                <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                  {notificationTypeConfig(notification.type).label}
                </p>
                <p className="mt-0.5 text-sm font-medium text-zinc-950">{notification.title}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{formatRelativeTime(notification.createdAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
