import { Link } from "react-router-dom";

// The feature that answers the audit's "no dignified not-yet" gap: an
// honest check-in at a real chapter transition, where "I'm having second
// thoughts" is treated as a legitimate answer, not funnel leakage to
// smooth over.
const RESPONSE_COPY = {
  en: {
    keepGoing: "Good — onward.",
    needMoreTime: "That's a completely legitimate answer. Use “Life happened” below whenever you're ready — nothing here is on a clock but your own.",
    secondThoughts: "That's worth taking seriously, not pushing past. It might help to revisit the honest trade-offs for your city before deciding anything.",
  },
  es: {
    keepGoing: "Bien — sigamos adelante.",
    needMoreTime: "Esa es una respuesta completamente legítima. Usa \"Pasaron cosas de la vida\" abajo cuando estés listo — aquí nada corre contra un reloj más que el tuyo propio.",
    secondThoughts: "Vale la pena tomar eso en serio, no ignorarlo. Podría ayudarte revisar los pros y contras honestos de tu ciudad antes de decidir algo.",
  },
};

const UI = {
  en: {
    prompt: (chapterTitle) => `Does ${chapterTitle} still feel right?`,
    keepGoing: "Yes, keep going",
    needMoreTime: "I need more time",
    secondThoughts: "I'm having second thoughts",
    revisit: "Revisit The Honest Truth",
  },
  es: {
    prompt: (chapterTitle) => `¿"${chapterTitle}" todavía se siente bien?`,
    keepGoing: "Sí, seguir adelante",
    needMoreTime: "Necesito más tiempo",
    secondThoughts: "Tengo dudas",
    revisit: "Revisar La Verdad Honesta",
  },
};

export default function StillFeelRightCheckIn({ chapterTitle, cityId, response, onRespond, lang = "en" }) {
  const responseCopy = RESPONSE_COPY[lang] || RESPONSE_COPY.en;
  const ui = UI[lang] || UI.en;

  if (response) {
    return (
      <div className="mt-10 border border-zinc-200 bg-white p-6">
        <p className="text-sm leading-relaxed text-zinc-600">{responseCopy[response]}</p>
        {response === "secondThoughts" && (
          <Link
            to={`/your-mexico/${cityId}`}
            className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {ui.revisit}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="mt-10 border border-zinc-200 bg-white p-6">
      <p className="text-base font-medium text-zinc-950">{ui.prompt(chapterTitle)}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onRespond("keepGoing")}
          className="border border-zinc-950 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {ui.keepGoing}
        </button>
        <button
          type="button"
          onClick={() => onRespond("needMoreTime")}
          className="border border-zinc-300 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {ui.needMoreTime}
        </button>
        <button
          type="button"
          onClick={() => onRespond("secondThoughts")}
          className="border border-zinc-300 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {ui.secondThoughts}
        </button>
      </div>
    </div>
  );
}
