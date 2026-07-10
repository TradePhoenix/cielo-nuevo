export default function QuestionCard({ question, selectedOptionId, onSelect }) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <h2 className="text-2xl font-light leading-tight tracking-[-0.03em] text-zinc-950 sm:text-3xl">
        {question.question}
      </h2>

      {question.helper && (
        <p className="mt-3 text-sm text-zinc-500">{question.helper}</p>
      )}

      <div className="mt-8 flex flex-col gap-3">
        {question.options.map((option) => {
          const isSelected = option.id === selectedOptionId;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={isSelected}
              className={`flex items-center justify-between border px-6 py-5 text-left text-base transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
                isSelected
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-300 bg-white text-zinc-800 hover:border-zinc-950"
              }`}
            >
              <span>{option.label}</span>
              <span
                className={`ml-4 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${
                  isSelected ? "border-white" : "border-zinc-400"
                }`}
              >
                {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-white" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
