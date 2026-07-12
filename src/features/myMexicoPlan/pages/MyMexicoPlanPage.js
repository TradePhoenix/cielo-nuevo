import { useEffect, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import YourMexicoShell from "../../yourMexico/components/YourMexicoShell";
import TrustMoment from "../../yourMexico/components/TrustMoment";
import FitCallBar from "../../yourMexico/components/FitCallBar";
import SEO from "../../../components/SEO";
import ChapterTracker from "../components/ChapterTracker";
import NowNextLater from "../components/NowNextLater";
import ReshuffleControl from "../components/ReshuffleControl";
import PrintPlanButton from "../components/PrintPlanButton";
import DecisionBrief from "../components/DecisionBrief";
import CostPlanner from "../components/CostPlanner";
import AdaptiveChecklist from "../components/AdaptiveChecklist";
import ReadinessAssessment from "../components/ReadinessAssessment";
import CityComparisonWorkspace from "../components/CityComparisonWorkspace";
import { usePlanState } from "../state/usePlanState";
import { PROLOGUE } from "../data/chapters";
import { useBlueprintAnswers } from "../../../decisionEngine/hooks/useBlueprintAnswers";
import { buildRecommendation } from "../../../decisionEngine/logic/recommendationEngine";
import { buildDecisionBrief } from "../logic/buildDecisionBrief";
import { buildCostPlanner } from "../logic/buildCostPlanner";
import { buildAdaptiveChecklist } from "../logic/buildAdaptiveChecklist";
import { buildReadinessAssessment } from "../logic/buildReadinessAssessment";
import { buildCityComparison } from "../logic/buildCityComparison";
import { getMatchesWithDetails } from "../../yourMexico/logic/cityLookup";

// Routed /my-mexico-plan/:cityId — the plan itself. One continuous
// document, not a multi-screen app: Now/Coming Up/Later, the honest
// reshuffle control, a trust moment, and the standing Fit Call CTA all
// live on this single page.
export default function MyMexicoPlanPage() {
  const { cityId } = useParams();
  const {
    hasCompletedBlueprint,
    city,
    plan,
    taskState,
    toggleTask,
    currentChapterIndex,
    anchorPhrase,
    timelineShifts,
    reshuffleTimeline,
    checkInResponses,
    respondToCheckIn,
  } = usePlanState(cityId);

  const { answers, scores } = useBlueprintAnswers();
  const recommendation = useMemo(() => buildRecommendation(scores, answers), [scores, answers]);
  const decisionBrief = useMemo(
    () =>
      plan
        ? buildDecisionBrief({ recommendation, answers, scores, city, plan, currentChapterIndex, taskState })
        : null,
    [recommendation, answers, scores, city, plan, currentChapterIndex, taskState]
  );
  const costPlanner = useMemo(
    () => (plan ? buildCostPlanner({ answers, scores, city }) : null),
    [answers, scores, city, plan]
  );
  const adaptiveChecklist = useMemo(
    () => (plan ? buildAdaptiveChecklist({ plan, recommendation, scores, taskState }) : null),
    [plan, recommendation, scores, taskState]
  );
  const readinessAssessment = useMemo(
    () => (plan ? buildReadinessAssessment({ answers, recommendation, plan, taskState }) : null),
    [answers, recommendation, plan, taskState]
  );
  const topMatches = useMemo(
    () => getMatchesWithDetails(recommendation.topCityMatches),
    [recommendation]
  );
  const cityComparison = useMemo(() => buildCityComparison(topMatches), [topMatches]);

  // The "Coming Up" chapter uses a native <details> disclosure, closed by
  // default on screen. A CSS override of that closed-state hiding isn't
  // reliable across browsers (it's implemented via internal shadow DOM),
  // so instead: force every <details> open right before printing, and
  // restore whatever state the visitor actually had on screen afterward.
  useEffect(() => {
    const previouslyOpen = new WeakMap();

    const handleBeforePrint = () => {
      document.querySelectorAll("details").forEach((el) => {
        previouslyOpen.set(el, el.open);
        el.open = true;
      });
    };

    const handleAfterPrint = () => {
      document.querySelectorAll("details").forEach((el) => {
        if (previouslyOpen.has(el)) {
          el.open = previouslyOpen.get(el);
        }
      });
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  if (!hasCompletedBlueprint || !city || !plan) {
    return <Navigate to="/my-mexico-plan" replace />;
  }

  return (
    <YourMexicoShell backTo="/your-mexico" backLabel="Back To Your Mexico">
      <SEO
        title={`My Mexico Plan — ${city.name}`}
        description={`Your 365-day relocation roadmap for ${city.name}, built from your Blueprint answers.`}
        path={`/my-mexico-plan/${cityId}`}
      />
      {/*
        Print/export only — the on-screen header below is print:hidden
        together with its interactive controls, which would otherwise leave
        a printed page with no Path To Mexico branding or plan context at
        all. This is the standalone document header for the printed/saved
        version: title, city, archetype, readiness, and a generation date,
        all pulled from data already computed above — nothing new is
        invented here.
      */}
      <div className="hidden print:block mb-8 border-b-2 border-zinc-950 pb-6">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Path To Mexico</p>
        <p className="mt-2 text-2xl font-light tracking-[-0.02em]">My Mexico Plan — {city.name}</p>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-zinc-600">
          <span>
            <strong className="text-zinc-950">Archetype:</strong> {recommendation.archetype.title}
          </span>
          <span>
            <strong className="text-zinc-950">Readiness:</strong> {recommendation.readinessScore}/100 &middot;{" "}
            {recommendation.readinessLabel.label}
          </span>
          <span>
            <strong className="text-zinc-950">Generated:</strong>{" "}
            {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">My Mexico Plan &middot; {city.name}</p>
        </div>
        <PrintPlanButton />
      </div>

      <h1 className="mt-3 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
        You told us this is about {anchorPhrase}.
      </h1>
      <p className="mt-3 max-w-xl text-lg leading-relaxed text-zinc-600">
        Here's how the next year gets you there.
      </p>

      <p className="mt-6 max-w-2xl border-l-2 border-zinc-300 pl-4 text-base italic leading-relaxed text-zinc-500">
        {PROLOGUE.framing}
      </p>

      {decisionBrief && <DecisionBrief brief={decisionBrief} />}

      {cityComparison.cities.length > 0 && (
        <CityComparisonWorkspace comparison={cityComparison} matches={topMatches} />
      )}

      {readinessAssessment && (
        <ReadinessAssessment assessment={readinessAssessment} taskState={taskState} onToggleTask={toggleTask} />
      )}

      {costPlanner && <CostPlanner planner={costPlanner} />}

      {adaptiveChecklist && (
        <AdaptiveChecklist checklist={adaptiveChecklist} taskState={taskState} onToggleTask={toggleTask} />
      )}

      <div className="mt-8">
        <ChapterTracker chapters={plan.chapters} currentChapterIndex={currentChapterIndex} isUrgent={plan.isUrgent} />
      </div>

      <NowNextLater
        chapters={plan.chapters}
        currentChapterIndex={currentChapterIndex}
        taskState={taskState}
        onToggleTask={toggleTask}
        isUrgent={plan.isUrgent}
        cityId={city.id}
        checkInResponses={checkInResponses}
        onRespondToCheckIn={respondToCheckIn}
      />

      <div className="break-inside-avoid mt-10 border-t border-zinc-300 pt-6">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">Important Notes</p>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600">
          This plan is a snapshot based on your own Blueprint answers as of the date above — retake
          the Blueprint anytime for an updated version. Path To Mexico provides relocation guidance,
          local insight, and trusted introductions. We are not a law firm, immigration agency, tax
          advisor, financial advisor, or real estate brokerage. Legal, immigration, tax, financial,
          and real estate services are provided by independent qualified professionals where
          appropriate.
        </p>
      </div>

      <div className="print:hidden">
        <ReshuffleControl timelineShifts={timelineShifts} onReshuffle={reshuffleTimeline} />
        <TrustMoment />
        <FitCallBar cityName={city.name} message={`Refine your ${city.name} plan with a real person.`} />
      </div>
    </YourMexicoShell>
  );
}
