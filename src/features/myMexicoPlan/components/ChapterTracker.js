import CinematicReveal from "../../../components/CinematicReveal";

// A quiet, narrative progress indicator — which chapter a visitor is in,
// never a percentage or a badge count. Past chapters read as complete,
// the current one is emphasized, future ones stay visible but dim.
export default function ChapterTracker({ chapters, currentChapterIndex, isUrgent }) {
  return (
    <CinematicReveal>
      <ol className="flex flex-wrap gap-x-6 gap-y-3">
        {chapters.map((chapter, index) => {
          const isPast = index < currentChapterIndex;
          const isCurrent = index === currentChapterIndex;

          return (
            <li key={chapter.id} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${
                  isCurrent ? "bg-zinc-950" : isPast ? "bg-zinc-400" : "bg-zinc-300"
                }`}
              />
              <span
                className={`text-xs uppercase tracking-[0.15em] ${
                  isCurrent ? "font-semibold text-zinc-950" : "text-zinc-400"
                }`}
              >
                {isUrgent ? chapter.title : chapter.phaseLabel}
              </span>
            </li>
          );
        })}
      </ol>
    </CinematicReveal>
  );
}
