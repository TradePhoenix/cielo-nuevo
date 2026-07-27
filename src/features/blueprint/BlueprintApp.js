import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BlueprintIntro from "./components/BlueprintIntro";
import QuestionCard from "./components/QuestionCard";
import ProgressBar from "./components/ProgressBar";
import BlueprintLoading from "./components/BlueprintLoading";
import ResultsDiscovery from "./components/ResultsDiscovery";
import ResultsSummary from "./components/ResultsSummary";
import ResultsCityMatch from "./components/ResultsCityMatch";
import ResultsRoadmap from "./components/ResultsRoadmap";
import ResultsCTA from "./components/ResultsCTA";
import CinematicReveal from "../../components/CinematicReveal";
import { useBlueprintState } from "./state/useBlueprintState";
import { DURATION, EASE, useCinematicMotion } from "../../components/cinematicMotion";
import { BLUEPRINT_UI } from "./data/uiCopy";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../../utils/language";
import SEO from "../../components/SEO";

const SEO_CONTENT = {
  en: { title: "My Mexico Blueprint", description: "Answer a few quick questions and get your personalized city matches, readiness score, and 30/60/90-day roadmap for moving to Mexico." },
  es: { title: "My Mexico Blueprint", description: "Responde unas preguntas rápidas y obtén tus coincidencias de ciudad personalizadas, tu puntaje de preparación y tu hoja de ruta de 30/60/90 días para mudarte a México." },
};

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2";

// Orchestrates the full step machine: intro -> question -> loading -> results.
//
// PTM Spanish-parity pass: owns `lang` state (persisted via the shared
// language helper) and threads it down to every child — including into
// useBlueprintState(lang), so the recommendation itself (built by
// recommendationEngine.js) resolves its text in the visitor's language.
export default function BlueprintApp() {
  const [lang, setLangState] = useState(getStoredLanguage);
  const setLang = (next) => {
    setLangState(next);
    setStoredLanguage(next);
  };
  useHtmlLang(lang);
  const ui = BLUEPRINT_UI[lang];

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
    skipResultsReveal,
  } = useBlueprintState(lang);

  const resultsRef = useRef(null);
  const prefersReducedMotion = useCinematicMotion();

  // Moves focus to the results region as soon as it appears, so screen
  // reader users land there directly instead of needing to re-explore the
  // page. Fires identically whether results just arrived live or were
  // loaded directly from a previous session — only the *visual* reveal
  // (see skipResultsReveal below) differs between those two cases.
  useEffect(() => {
    if (screen === "results" && resultsRef.current) {
      resultsRef.current.focus();
    }
  }, [screen]);

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <SEO title={SEO_CONTENT[lang].title} description={SEO_CONTENT[lang].description} path="/my-mexico-blueprint" />
      <Link
        to="/"
        className={`fixed left-4 top-4 z-50 bg-white/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-950 shadow-sm transition hover:bg-white ${FOCUS_RING} sm:left-6 sm:top-6`}
      >
        {ui.backLink}
      </Link>

      <button
        type="button"
        onClick={() => setLang(lang === "en" ? "es" : "en")}
        className={`fixed right-4 top-4 z-50 border border-zinc-300 bg-white/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700 shadow-sm transition hover:bg-zinc-950 hover:text-white ${FOCUS_RING} sm:right-6 sm:top-6`}
      >
        {lang === "en" ? "ES" : "EN"}
      </button>

      {screen === "intro" && (
        <BlueprintIntro onStart={startQuestionnaire} totalQuestions={totalQuestions} lang={lang} />
      )}

      {screen === "question" && currentQuestion && (
        <div className="px-6 py-16 sm:py-24">
          <ProgressBar current={questionIndex + 1} total={totalQuestions} lang={lang} />

          <motion.div
            key={currentQuestion.id}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? DURATION.instant : DURATION.quick, ease: EASE.standard }}
          >
            <QuestionCard
              question={currentQuestion}
              selectedOptionId={answers[currentQuestion.id]}
              onSelect={(optionId) => selectAnswer(currentQuestion.id, optionId)}
              lang={lang}
            />
          </motion.div>

          <div className="mx-auto mt-10 flex w-full max-w-xl items-center justify-between gap-4">
            <button
              type="button"
              onClick={goPrevious}
              className={`border border-zinc-300 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 transition duration-300 hover:bg-zinc-950 hover:text-white ${FOCUS_RING}`}
            >
              {ui.question.back}
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
              {questionIndex === totalQuestions - 1 ? ui.question.finish : ui.question.next}
            </button>
          </div>
        </div>
      )}

      {screen === "loading" && <BlueprintLoading onComplete={completeLoading} lang={lang} />}

      {screen === "results" && recommendation && (
        <div
          ref={resultsRef}
          tabIndex={-1}
          className="mx-auto max-w-3xl px-6 py-16 outline-none sm:py-24"
          aria-label="Your Mexico Blueprint results"
        >
          {/*
            CX-005 — reveal order: primary destination, then the
            personalized reason + supporting fit factors (both inside
            ResultsDiscovery), then supplementary readiness context, then
            secondary destinations, then the 90-day roadmap, then the
            closing CTA. Each section owns its own CinematicReveal instead
            of one hand-tuned local stagger (the previous
            getResultsStagger/getResultsItem), so it reveals as the
            visitor actually scrolls to it rather than as one fixed-timed
            cascade — closer to "discovered" than "announced." skipReveal
            renders everything already-settled for a visitor returning to
            results they've already seen (a refresh), so nothing replays
            as a repeated theatrical reveal.
          */}
          <CinematicReveal skipReveal={skipResultsReveal}>
            <ResultsDiscovery topMatch={recommendation.topCityMatches[0]} lang={lang} />
          </CinematicReveal>

          <CinematicReveal skipReveal={skipResultsReveal}>
            <ResultsSummary recommendation={recommendation} lang={lang} />
          </CinematicReveal>

          <CinematicReveal skipReveal={skipResultsReveal}>
            <ResultsCityMatch cityMatches={recommendation.topCityMatches.slice(1)} lang={lang} />
          </CinematicReveal>

          <CinematicReveal skipReveal={skipResultsReveal}>
            <ResultsRoadmap
              roadmapSteps={recommendation.roadmapSteps}
              topCityId={recommendation.topCityMatches[0]?.id}
              lang={lang}
            />
          </CinematicReveal>

          <CinematicReveal skipReveal={skipResultsReveal}>
            <ResultsCTA
              cta={recommendation.cta}
              readinessScore={recommendation.readinessScore}
              archetypeTitle={recommendation.archetype.title}
              topCityId={recommendation.topCityMatches[0]?.id}
              lang={lang}
            />
          </CinematicReveal>

          <CinematicReveal skipReveal={skipResultsReveal} className="mt-10 text-center">
            <button
              type="button"
              onClick={restart}
              className={`text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950 ${FOCUS_RING}`}
            >
              {ui.retake}
            </button>
          </CinematicReveal>
        </div>
      )}
    </main>
  );
}
