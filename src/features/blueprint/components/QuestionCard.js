import { resolveText, normalizeAnswer } from "../data/questions";
import { BLUEPRINT_UI } from "../data/uiCopy";

// Renders one question. Single-select shows a radio-style round indicator;
// multi-select shows a square check indicator, a live selection count, and
// tolerates taps beyond maxSelections (the state hook ignores them; the
// count line tells the visitor why nothing changed).
export default function QuestionCard({ question, selectedValue, onSelect, lang = "en" }) {
  const ui = BLUEPRINT_UI[lang];
  const isMulti = question.type === "multi-select";
  const selectedIds = normalizeAnswer(selectedValue);
  const atCap = Boolean(question.maxSelections) && selectedIds.length >= question.maxSelections;

  return (
    <div className="mx-auto w-full max-w-xl">
      <h2 className="text-2xl font-light leading-tight tracking-[-0.03em] text-zinc-950 sm:text-3xl">
        {resolveText(question.question, lang)}
      </h2>

      {question.helper && resolveText(question.helper, lang) && (
        <p className="mt-3 text-sm text-zinc-500">{resolveText(question.helper, lang)}</p>
      )}

      {isMulti && (
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400" aria-live="polite">
          {question.maxSelections
            ? ui.question.multiCount(selectedIds.length, question.maxSelections)
            : ui.question.multiFree(selectedIds.length)}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3">
        {question.options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          const isBlocked = isMulti && atCap && !isSelected;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={isSelected}
              className={`flex items-center justify-between border px-6 py-5 text-left text-base transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
                isSelected
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : isBlocked
                    ? "border-zinc-200 bg-white text-zinc-400"
                    : "border-zinc-300 bg-white text-zinc-800 hover:border-zinc-950"
              }`}
            >
              <span>{resolveText(option.label, lang)}</span>
              <span
                className={`ml-4 flex h-5 w-5 flex-shrink-0 items-center justify-center border ${
                  isMulti ? "rounded-[4px]" : "rounded-full"
                } ${isSelected ? "border-white" : "border-zinc-400"}`}
              >
                {isSelected &&
                  (isMulti ? (
                    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                      <path d="M2 6.5 5 9.5 10 3" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  ))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
