import { formatDate } from "../logic/dateHelpers";

const TYPE_LABELS = {
  blueprint_completed: "Blueprint",
  email: "Email",
  call: "Call",
  form_submission: "Form",
  partner_intro: "Partner Intro",
  status_change: "Status Change",
  stage_change: "Stage Change",
  milestone: "Milestone",
  referral: "Referral",
  note: "Note",
};

export default function ActivityTimeline({ activity }) {
  const sorted = [...activity].sort((a, b) => b.date.localeCompare(a.date));

  if (sorted.length === 0) {
    return <p className="text-sm text-zinc-400">No activity recorded yet.</p>;
  }

  return (
    <ol className="space-y-4">
      {sorted.map((entry) => (
        <li key={entry.id} className="flex gap-3">
          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
          <div>
            <p className="text-sm text-zinc-700">{entry.description}</p>
            <p className="mt-0.5 text-xs uppercase tracking-[0.1em] text-zinc-400">
              {TYPE_LABELS[entry.type] || entry.type} · {formatDate(entry.date)}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
