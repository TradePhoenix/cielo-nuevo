import ChapterSection from "./ChapterSection";
import StillFeelRightCheckIn from "./StillFeelRightCheckIn";

// The organizing device that makes this a plan instead of a checklist:
// the whole 365-day horizon is always visible, but only "Now" is ever
// shown at full weight. Nothing here can overwhelm because nothing here
// dumps the whole mountain at once.
export default function NowNextLater({
  chapters,
  currentChapterIndex,
  taskState,
  onToggleTask,
  isUrgent,
  cityId,
  checkInResponses,
  onRespondToCheckIn,
}) {
  const previousChapter = currentChapterIndex > 0 ? chapters[currentChapterIndex - 1] : null;
  const nowChapter = chapters[currentChapterIndex];
  const nextChapter = chapters[currentChapterIndex + 1] || null;
  const laterChapters = chapters.slice(currentChapterIndex + 2);

  return (
    <div className="mt-16 space-y-16">
      {previousChapter && (
        <div>
          {previousChapter.closingLine && (
            <p className="border-l-2 border-zinc-300 pl-4 text-sm italic leading-relaxed text-zinc-500">
              {previousChapter.closingLine}
            </p>
          )}
          <StillFeelRightCheckIn
            chapterTitle={isUrgent ? previousChapter.title : previousChapter.phaseLabel}
            cityId={cityId}
            response={checkInResponses[previousChapter.id]}
            onRespond={(response) => onRespondToCheckIn(previousChapter.id, response)}
          />
        </div>
      )}

      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Now</p>
        <ChapterSection
          chapter={nowChapter}
          variant="now"
          taskState={taskState}
          onToggleTask={onToggleTask}
          isUrgent={isUrgent}
        />
      </div>

      {nextChapter && (
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Coming Up</p>
          <ChapterSection
            chapter={nextChapter}
            variant="upcoming"
            taskState={taskState}
            onToggleTask={onToggleTask}
            isUrgent={isUrgent}
          />
        </div>
      )}

      {laterChapters.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Later</p>
          <div className="mt-4 divide-y divide-zinc-200 border border-zinc-200">
            {laterChapters.map((chapter) => (
              <ChapterSection
                key={chapter.id}
                chapter={chapter}
                variant="later"
                taskState={taskState}
                onToggleTask={onToggleTask}
                isUrgent={isUrgent}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
