import { motion } from "framer-motion";
import ChapterSection from "./ChapterSection";
import StillFeelRightCheckIn from "./StillFeelRightCheckIn";
import CinematicReveal from "../../../components/CinematicReveal";
import { useCinematicMotion } from "../../../components/cinematicMotion";

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
  const prefersReducedMotion = useCinematicMotion();
  const itemVariants = CinematicReveal.itemVariants(prefersReducedMotion);

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

      {/*
        The three planning horizons reveal in priority order — Now, then
        Coming Up, then Later — via CinematicReveal's stagger mode, so the
        sequence itself reinforces which one matters most right now. All
        three are already interactive/clickable as soon as they mount; the
        stagger only offsets their fade-in, it never gates task checkboxes
        or the "Coming Up" disclosure behind the animation finishing.
      */}
      <CinematicReveal stagger className="space-y-16">
        <motion.div variants={itemVariants}>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Now</p>
          <ChapterSection
            chapter={nowChapter}
            variant="now"
            taskState={taskState}
            onToggleTask={onToggleTask}
            isUrgent={isUrgent}
          />
        </motion.div>

        {nextChapter && (
          <motion.div variants={itemVariants}>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Coming Up</p>
            <ChapterSection
              chapter={nextChapter}
              variant="upcoming"
              taskState={taskState}
              onToggleTask={onToggleTask}
              isUrgent={isUrgent}
            />
          </motion.div>
        )}

        {laterChapters.length > 0 && (
          <motion.div variants={itemVariants}>
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
          </motion.div>
        )}
      </CinematicReveal>
    </div>
  );
}
