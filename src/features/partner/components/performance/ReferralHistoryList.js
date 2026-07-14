import SectionCard from "../SectionCard";
import EmptyState from "../EmptyState";
import { ReferralProgressBadge } from "../Badges";
import { formatDate } from "../../utils/formatters";

export default function ReferralHistoryList({ history }) {
  return (
    <SectionCard eyebrow="History" title="Referral History">
      {history.length === 0 ? (
        <EmptyState title="No completed referrals yet" />
      ) : (
        <ul className="divide-y divide-zinc-200">
          {history.map((entry) => (
            <li key={entry.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-zinc-950">{entry.clientName}</p>
                <p className="text-sm text-zinc-500">{entry.serviceRequested}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-xs text-zinc-500">{formatDate(entry.completedAt)}</p>
                <ReferralProgressBadge status={entry.outcome} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
