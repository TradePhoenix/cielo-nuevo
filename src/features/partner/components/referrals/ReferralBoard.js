import ReferralCard from "./ReferralCard";
import { groupReferralsByStage } from "../../utils/referralUtils";

export default function ReferralBoard({ referrals, onUpdateProgressStatus }) {
  const columns = groupReferralsByStage(referrals);

  return (
    <div className="mt-6 flex gap-5 overflow-x-auto pb-4">
      {columns.map((column) => (
        <div key={column.stage} className="flex w-72 shrink-0 flex-col gap-4">
          <div className="flex items-center justify-between border-b border-zinc-300 pb-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950">{column.label}</h2>
            <span className="text-xs text-zinc-500">{column.referrals.length}</span>
          </div>

          {column.referrals.length === 0 ? (
            <p className="text-xs text-zinc-400">No referrals</p>
          ) : (
            <div className="flex flex-col gap-4">
              {column.referrals.map((referral) => (
                <ReferralCard key={referral.id} referral={referral} onUpdateProgressStatus={onUpdateProgressStatus} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
