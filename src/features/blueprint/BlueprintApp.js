import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BlueprintIntro from "./components/BlueprintIntro";
import QuestionCard from "./components/QuestionCard";
import ProgressBar from "./components/ProgressBar";
import BlueprintLoading from "./components/BlueprintLoading";
import ResultsSummary from "./components/ResultsSummary";
import ResultsCityMatch from "./components/ResultsCityMatch";
import ResultsRoadmap from "./components/ResultsRoadmap";
import ResultsCTA from "./components/ResultsCTA";
import { useBlueprintState } from "./state/useBlueprintState";
import { useCinematicMotion } from "../../components/cinematicMotion";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

// Cascading reveal for the results screen — the score appears first, then
// city matches, then the roadmap, then the CTA, so results feel like a
// build rather than one flat block popping in after the loading sequence.
// CX-003: both variants degrade under reduced motion — no stagger delay
// (every item appears together) and opacity-only, no y-offset.
function getResultsStagger(prefersReducedMotion) {
  return {
    hidden: {},
    show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15, delayChildren: prefersReducedMotion ? 0 : 0.1 } },
  };
}

function getResultsItem(prefersReducedMotion) {
  if (prefersReducedMotion) {
    return { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.12 } } };
  }
  return {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };
}

// Orchestrates the full step machine: intro -> question -> loading -> results.
export default function BlueprintApp() {
  const {
    screen,
    questionIndex,
    answers,
    totalQuestions,
    currentQuestion,
    isCurrentAnswered,
    recommendation,
    startQuestionnaire,
    selectAnswer,
    goNext,
    goPrevious,
    completeLoading,
    restart,
  } = useBlueprintState();

  const resultsRef = useRef(null);
  const prefersReducedMotion = useCinematicMotion();
  const resultsStagger = getResultsStagger(prefersReducedMotion);
  const resultsItem = getResultsItem(prefersReducedMotion);

  // Moves focus to the results region as soon as it appears, so screen
  // reader users land there directly instead of needing to re-explore the page.
  useEffect(() => {
    if (screen === "results" && resultsRef.current) {
      resultsRef.current.focus();
    }
  }, [screen]);

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <Link
        to="/"
        className={`fixed left-4 top-4 z-50 bg-white/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-950 shadow-sm transition hover:bg-white ${FOCUS_RING} sm:left-6 sm:top-6`}
      >
        Path To Mexico
      </Link>

      {screen === "intro" && (
        <BlueprintIntro onStart={startQuestionnaire} totalQuestions={totalQuestions} />
      )}

      {screen === "question" && currentQuestion && (
        <div className="px-6 py-16 sm:py-24">
          <ProgressBar current={questionIndex + 1} total={totalQuestions} />

          <motion.div
            key={currentQuestion.id}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.12 : 0.4 }}
          >
            <QuestionCard
              question={currentQuestion}
              selectedOptionId={answers[currentQuestion.id]}
              onSelect={(optionId) => selectAnswer(currentQuestion.id, optionId)}
            />
          </motion.div>

          <div className="mx-auto mt-10 flex w-full max-w-xl items-center justify-between gap-4">
            <button
              type="button"
              onClick={goPrevious}
              className={`border border-zinc-300 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 transition duration-300 hover:bg-zinc-950 hover:text-white ${FOCUS_RING}`}
            >
              Back
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!isCurrentAnswered}
              className={`px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition duration-300 ${FOCUS_RING} ${
                isCurrentAnswered
                  ? "bg-zinc-950 text-white hover:bg-[#d8a15f]"
                  : "cursor-not-allowed bg-zinc-300 text-zinc-500"
              }`}
            >
              {questionIndex === totalQuestions - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      )}

      {screen === "loading" && <BlueprintLoading onComplete={completeLoading} />}

      {screen === "results" && recommendation && (
        <motion.div
          ref={resultsRef}
          tabIndex={-1}
          initial="hidden"
          animate="show"
          variants={resultsStagger}
          className="mx-auto max-w-3xl px-6 py-16 outline-none sm:py-24"
          aria-label="Your Mexico Blueprint results"
        >
          <motion.div variants={resultsItem}>
            <ResultsSummary recommendation={recommendation} />
          </motion.div>

          <motion.div variants={resultsItem}>
            <ResultsCityMatch cityMatches={recommendation.topCityMatches} />
          </motion.div>

          <motion.div variants={resultsItem}>
            <ResultsRoadmap roadmapSteps={recommendation.roadmapSteps} />
          </motion.div>

          <motion.div variants={resultsItem}>
            <ResultsCTA
              cta={recommendation.cta}
              readinessScore={recommendation.readinessScore}
              archetypeTitle={recommendation.archetype.title}
            />
          </motion.div>

          <motion.div variants={resultsItem} className="mt-10 text-center">
            <button
              type="button"
              onClick={restart}
              className={`text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 ${FOCUS_RING}`}
            >
              Retake The Blueprint
            </button>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
