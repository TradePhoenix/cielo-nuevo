import { PriorityBadge } from "../Badges";
import { REFERRAL_PROGRESS_STATUSES } from "../../utils/statusConfig";
import { formatDate } from "../../utils/formatters";

// Status Updates control: a partner can push a new progress status from
// here regardless of which board column the referral currently sits in
// (stage and progressStatus are independent — see referral shape in
// ../../types). Mock-only: updateProgressStatus writes to the portal
// store, which persists it to localStorage, nothing hits a server.
export default function ReferralCard({ referral, onUpdateProgressStatus }) {
  return (
    <article className="w-72 shrink-0 border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-medium text-zinc-950">{referral.clientName}</h3>
        <PriorityBadge priority={referral.priority} />
      </div>
      <p className="mt-1 text-sm text-zinc-600">{referral.serviceRequested}</p>

      <dl className="mt-4 space-y-1.5 text-xs text-zinc-500">
        <div className="flex justify-between">
          <dt>Assigned</dt>
          <dd className="text-zinc-950">{formatDate(referral.assignedDate)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Expected Completion</dt>
          <dd className="text-zinc-950">{formatDate(referral.expectedCompletion)}</dd>
        </div>
      </dl>

      <label className="mt-4 flex flex-col gap-1 text-xs uppercase tracking-[0.15em] text-zinc-500">
        Status Update
        <select
          value={referral.progressStatus}
          onChange={(event) => onUpdateProgressStatus(referral.id, event.target.value)}
          className="border border-zinc-300 bg-white px-2.5 py-2 text-sm normal-case tracking-normal text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {REFERRAL_PROGRESS_STATUSES.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </article>
  );
}
