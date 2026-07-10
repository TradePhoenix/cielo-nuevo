import { Link } from "react-router-dom";

// The feature that answers the audit's "no dignified not-yet" gap: an
// honest check-in at a real chapter transition, where "I'm having second
// thoughts" is treated as a legitimate answer, not funnel leakage to
// smooth over.
const RESPONSE_COPY = {
  keepGoing: "Good — onward.",
  needMoreTime:
    "That's a completely legitimate answer. Use “Life happened” below whenever you're ready — nothing here is on a clock but your own.",
  secondThoughts:
    "That's worth taking seriously, not pushing past. It might help to revisit the honest trade-offs for your city before deciding anything.",
};

export default function StillFeelRightCheckIn({ chapterTitle, cityId, response, onRespond }) {
  if (response) {
    return (
      <div className="mt-10 border border-zinc-200 bg-white p-6">
        <p className="text-sm leading-relaxed text-zinc-600">{RESPONSE_COPY[response]}</p>
        {response === "secondThoughts" && (
          <Link
            to={`/your-mexico/${cityId}`}
            className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            Revisit The Honest Truth
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="mt-10 border border-zinc-200 bg-white p-6">
      <p className="text-base font-medium text-zinc-950">Does {chapterTitle} still feel right?</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onRespond("keepGoing")}
          className="border border-zinc-950 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Yes, keep going
        </button>
        <button
          type="button"
          onClick={() => onRespond("needMoreTime")}
          className="border border-zinc-300 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          I need more time
        </button>
        <button
          type="button"
          onClick={() => onRespond("secondThoughts")}
          className="border border-zinc-300 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          I'm having second thoughts
        </button>
      </div>
    </div>
  );
}
