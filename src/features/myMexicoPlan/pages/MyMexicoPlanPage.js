import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import YourMexicoShell from "../../yourMexico/components/YourMexicoShell";
import PlanRecovery from "../components/PlanRecovery";
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
import ConciergeWorkspace from "../components/ConciergeWorkspace";
import RelocationTimeline from "../components/RelocationTimeline";
import TrustedPartnerWorkspace from "../components/TrustedPartnerWorkspace";
import { usePlanState } from "../state/usePlanState";
import { PROLOGUE } from "../data/chapters";
import { useBlueprintAnswers } from "../../../decisionEngine/hooks/useBlueprintAnswers";
import { buildRecommendation } from "../../../decisionEngine/logic/recommendationEngine";
import { buildDecisionBrief } from "../logic/buildDecisionBrief";
import { buildCostPlanner } from "../logic/buildCostPlanner";
import { buildAdaptiveChecklist } from "../logic/buildAdaptiveChecklist";
import { buildReadinessAssessment } from "../logic/buildReadinessAssessment";
import { buildCityComparison } from "../logic/buildCityComparison";
import { buildConciergeWorkspace } from "../logic/buildConciergeWorkspace";
import { buildRelocationTimeline } from "../logic/buildRelocationTimeline";
import { buildTrustedPartnerWorkspace } from "../logic/buildTrustedPartnerWorkspace";
import { getMatchesWithDetails } from "../../yourMexico/logic/cityLookup";
import { resolveText } from "../../blueprint/data/questions";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../../../utils/language";

const PAGE_CONTENT = {
  en: {
    backLabel: "Back To Your Mexico",
    toggle: "ES",
    printHeaderBrand: "Path To Mexico",
    printTitle: (cityName) => `My Mexico Plan — ${cityName}`,
    printArchetype: "Archetype:",
    printReadiness: "Readiness:",
    printGenerated: "Generated:",
    eyebrow: (cityName) => `My Mexico Plan · ${cityName}`,
    heroTitle: (anchorPhrase) => `You told us this is about ${anchorPhrase}.`,
    heroText: "Here's how the next year gets you there.",
    importantNotes: "Important Notes",
    disclaimer:
      "This plan is a snapshot based on your own Blueprint answers as of the date above — retake the Blueprint anytime for an updated version. Path To Mexico provides relocation guidance, local insight, and trusted introductions. We are not a law firm, immigration agency, tax advisor, financial advisor, or real estate brokerage. Legal, immigration, tax, financial, and real estate services are provided by independent qualified professionals where appropriate.",
    fitCallMessage: (cityName) => `Refine your ${cityName} plan with a real person.`,
    dateLocale: "en-US",
  },
  es: {
    backLabel: "Volver A Your Mexico",
    toggle: "EN",
    printHeaderBrand: "Path To Mexico",
    printTitle: (cityName) => `My Mexico Plan — ${cityName}`,
    printArchetype: "Arquetipo:",
    printReadiness: "Preparación:",
    printGenerated: "Generado:",
    eyebrow: (cityName) => `My Mexico Plan · ${cityName}`,
    heroTitle: (anchorPhrase) => `Nos dijiste que esto se trata de ${anchorPhrase}.`,
    heroText: "Así es como el próximo año te lleva ahí.",
    importantNotes: "Notas Importantes",
    disclaimer:
      "Este plan es una foto basada en tus propias respuestas del Blueprint a la fecha de arriba — vuelve a hacer el Blueprint cuando quieras para una versión actualizada. Path To Mexico ofrece orientación de reubicación, conocimiento local y conexiones de confianza. No somos un despacho legal, una agencia de inmigración, un asesor fiscal, un asesor financiero ni una correduría inmobiliaria. Los servicios legales, de inmigración, fiscales, financieros e inmobiliarios los brindan profesionales calificados e independientes cuando corresponde.",
    fitCallMessage: (cityName) => `Perfecciona tu plan para ${cityName} con una persona real.`,
    dateLocale: "es-MX",
  },
};

// Routed /my-mexico-plan/:cityId — the plan itself. One continuous
// document, not a multi-screen app: Now/Coming Up/Later, the honest
// reshuffle control, a trust moment, and the standing Fit Call CTA all
// live on this single page.
//
// PTM Spanish-parity pass: owns `lang` state (persisted via the shared
// language helper) and threads it into usePlanState(cityId, lang),
// buildRecommendation(scores, answers, lang), every build*() call below,
// and every component.
export default function MyMexicoPlanPage() {
  const { cityId } = useParams();
  const [lang, setLangState] = useState(getStoredLanguage);
  const setLang = (next) => {
    setLangState(next);
    setStoredLanguage(next);
  };
  useHtmlLang(lang);
  const t = PAGE_CONTENT[lang];

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
  } = usePlanState(cityId, lang);

  const { answers, scores } = useBlueprintAnswers();
  // ENG-023: scores is null whenever no completed Blueprint session exists
  // (missing, malformed, or outdated localStorage — useBlueprintAnswers()
  // already collapses all of those to this same safe null). buildRecommendation
  // dereferences scores.readinessMax unconditionally, so calling it with a
  // null scores previously crashed the whole page before the recovery check
  // below ever ran. Every downstream consumer of `recommendation` is either
  // already gated behind `plan` (null in the same circumstances) or reads
  // `recommendation` directly and must tolerate null itself (see `topMatches`).
  const recommendation = useMemo(
    () => (scores ? buildRecommendation(scores, answers, lang) : null),
    [scores, answers, lang]
  );
  const decisionBrief = useMemo(
    () =>
      plan
        ? buildDecisionBrief({ recommendation, answers, scores, city, plan, currentChapterIndex, taskState }, lang)
        : null,
    [recommendation, answers, scores, city, plan, currentChapterIndex, taskState, lang]
  );
  const costPlanner = useMemo(
    () => (plan ? buildCostPlanner({ answers, scores, city }, lang) : null),
    [answers, scores, city, plan, lang]
  );
  const adaptiveChecklist = useMemo(
    () => (plan ? buildAdaptiveChecklist({ plan, recommendation, scores, taskState }) : null),
    [plan, recommendation, scores, taskState]
  );
  const readinessAssessment = useMemo(
    () => (plan ? buildReadinessAssessment({ answers, recommendation, plan, taskState }, lang) : null),
    [answers, recommendation, plan, taskState, lang]
  );
  const topMatches = useMemo(
    () => (recommendation ? getMatchesWithDetails(recommendation.topCityMatches) : []),
    [recommendation]
  );
  const cityComparison = useMemo(() => buildCityComparison(topMatches, lang), [topMatches, lang]);
  const conciergeWorkspace = useMemo(
    () => (plan ? buildConciergeWorkspace({ plan, adaptiveChecklist, readinessAssessment }, lang) : null),
    [plan, adaptiveChecklist, readinessAssessment, lang]
  );
  const relocationTimeline = useMemo(
    () => (plan ? buildRelocationTimeline({ plan, recommendation, answers, taskState }, lang) : null),
    [plan, recommendation, answers, taskState, lang]
  );
  const trustedPartnerWorkspace = useMemo(
    () => (plan ? buildTrustedPartnerWorkspace({ plan, scores }, lang) : null),
    [plan, scores, lang]
  );

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

  // ENG-023: two distinct recovery states rather than one blind redirect —
  // an unrecognized city id in the URL is a different problem (and a
  // different message) than a real city with no completed Blueprint yet.
  // `city` comes from usePlanState's getCityById(cityId) lookup; `plan` is
  // null whenever either condition holds, so checking `!city` first keeps
  // the more fundamental problem in front.
  if (!city) {
    return <PlanRecovery variant="invalid-city" cityId={cityId} lang={lang} />;
  }

  if (!hasCompletedBlueprint || !plan) {
    return <PlanRecovery variant="no-blueprint" cityId={cityId} lang={lang} />;
  }

  return (
    <YourMexicoShell backTo="/your-mexico" backLabel={t.backLabel} lang={lang}>
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
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">{t.printHeaderBrand}</p>
        <p className="mt-2 text-2xl font-light tracking-[-0.02em]">{t.printTitle(city.name)}</p>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-zinc-600">
          <span>
            <strong className="text-zinc-950">{t.printArchetype}</strong> {recommendation.archetype.title}
          </span>
          <span>
            <strong className="text-zinc-950">{t.printReadiness}</strong> {recommendation.readinessScore}/100 &middot;{" "}
            {recommendation.readinessLabel.label}
          </span>
          <span>
            <strong className="text-zinc-950">{t.printGenerated}</strong>{" "}
            {new Date().toLocaleDateString(t.dateLocale, { year: "numeric", month: "long", day: "numeric" })}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{t.eyebrow(city.name)}</p>
        </div>
        <div className="print:hidden flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="border border-zinc-300 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {t.toggle}
          </button>
          <PrintPlanButton lang={lang} />
        </div>
      </div>

      <h1 className="mt-3 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
        {t.heroTitle(anchorPhrase)}
      </h1>
      <p className="mt-3 max-w-xl text-lg leading-relaxed text-zinc-600">{t.heroText}</p>

      <p className="mt-6 max-w-2xl border-l-2 border-zinc-300 pl-4 text-base italic leading-relaxed text-zinc-500">
        {resolveText(PROLOGUE.framing, lang)}
      </p>

      {decisionBrief && <DecisionBrief brief={decisionBrief} lang={lang} />}

      {cityComparison.cities.length > 0 && (
        <CityComparisonWorkspace comparison={cityComparison} matches={topMatches} lang={lang} />
      )}

      {readinessAssessment && (
        <ReadinessAssessment assessment={readinessAssessment} taskState={taskState} onToggleTask={toggleTask} lang={lang} />
      )}

      {costPlanner && <CostPlanner planner={costPlanner} lang={lang} />}

      {adaptiveChecklist && (
        <AdaptiveChecklist checklist={adaptiveChecklist} taskState={taskState} onToggleTask={toggleTask} lang={lang} />
      )}

      {conciergeWorkspace && (
        <ConciergeWorkspace workspace={conciergeWorkspace} taskState={taskState} onToggleTask={toggleTask} lang={lang} />
      )}

      {relocationTimeline && (
        <RelocationTimeline timeline={relocationTimeline} taskState={taskState} onToggleTask={toggleTask} lang={lang} />
      )}

      {trustedPartnerWorkspace && <TrustedPartnerWorkspace workspace={trustedPartnerWorkspace} lang={lang} />}

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
        lang={lang}
      />

      <div className="break-inside-avoid mt-10 border-t border-zinc-300 pt-6">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">{t.importantNotes}</p>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600">{t.disclaimer}</p>
      </div>

      <div className="print:hidden">
        <ReshuffleControl timelineShifts={timelineShifts} onReshuffle={reshuffleTimeline} lang={lang} />
        <TrustMoment lang={lang} />
        <FitCallBar
          cityName={city.name}
          cityId={city.id}
          message={t.fitCallMessage(city.name)}
          source="my_mexico_plan"
          lang={lang}
        />
      </div>
    </YourMexicoShell>
  );
}
