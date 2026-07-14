import { REFERRAL_STAGES } from "./statusConfig";

// Groups the flat referral list into board columns, in the fixed order
// REFERRAL_STAGES defines — used by ReferralBoard so column order never
// depends on data insertion order.
export function groupReferralsByStage(referrals) {
  return REFERRAL_STAGES.map((stage) => ({
    stage: stage.id,
    label: stage.label,
    referrals: referrals.filter((referral) => referral.stage === stage.id),
  }));
}
