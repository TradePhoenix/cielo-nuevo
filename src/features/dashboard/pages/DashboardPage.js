import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DashboardShell from "../components/DashboardShell";
import WelcomeModule from "../components/WelcomeModule";
import ProgressOverviewModule from "../components/ProgressOverviewModule";
import PlanProgressModule from "../components/PlanProgressModule";
import QuickActionsModule from "../components/QuickActionsModule";
import BlueprintSummaryModule from "../components/BlueprintSummaryModule";
import MyCitiesModule from "../components/MyCitiesModule";
import UpcomingTasksModule from "../components/UpcomingTasksModule";
import TimelineModule from "../components/TimelineModule";
import BudgetTrackerModule from "../components/BudgetTrackerModule";
import RecommendedGuidesModule from "../components/RecommendedGuidesModule";
import ResidencyProgressModule from "../components/ResidencyProgressModule";
import DocumentVaultSummaryModule from "../components/DocumentVaultSummaryModule";
import NotesModule from "../components/NotesModule";
import ConnectorRecommendationsModule from "../components/ConnectorRecommendationsModule";
import UpcomingAppointmentsModule from "../components/UpcomingAppointmentsModule";
import { useDashboardState } from "../state/useDashboardState";

// Routed /dashboard — the logged-in client experience. No auth yet: this
// route reads the same local Blueprint/Your Mexico/Plan data every other
// feature already reads, and isn't linked from any marketing surface.
export default function DashboardPage() {
  const {
    hasCompletedBlueprint,
    matches,
    plan,
    planCity,
    currentChapterIndex,
    summary,
    documentVaultSummary,
    notes,
    addNote,
    deleteNote,
  } = useDashboardState();

  // Route-entry focus management, same pattern as Blueprint's own results
  // screen: move focus to the main heading on arrival so keyboard and
  // screen-reader users land here directly, not at the top of the page
  // chrome. Runs once on mount, covering whichever heading below actually
  // renders (fallback or the full dashboard).
  const headingRef = useRef(null);
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, []);

  if (!hasCompletedBlueprint || !summary) {
    return (
      <DashboardShell>
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Client Dashboard</p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] outline-none sm:text-5xl"
        >
          Complete your Blueprint to preview your dashboard.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
          Your dashboard is built from your Blueprint answers, the cities you've explored, and
          your Mexico Plan. Start there, and this will be waiting for you.
        </p>
        <Link
          to="/my-mexico-blueprint"
          className="mt-8 inline-flex items-center gap-2 bg-zinc-950 px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Start Your Blueprint
        </Link>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Client Dashboard</p>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] outline-none sm:text-5xl"
      >
        Everything about your move, in one place.
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-6">
        <WelcomeModule readiness={summary.readiness} />
        <ProgressOverviewModule
          summary={summary}
          documentsChecked={documentVaultSummary.complete}
          documentsTotal={documentVaultSummary.total}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PlanProgressModule planProgress={summary.planProgress} />
          </div>
          <QuickActionsModule planCityId={summary.planProgress ? summary.planProgress.cityId : null} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <BlueprintSummaryModule readiness={summary.readiness} />
          <div className="lg:col-span-2">
            <MyCitiesModule matches={matches} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <UpcomingTasksModule upcomingTasks={summary.upcomingTasks} planProgress={summary.planProgress} />
          <div className="lg:col-span-2">
            <TimelineModule plan={plan} currentChapterIndex={currentChapterIndex} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <BudgetTrackerModule city={planCity} />
          <RecommendedGuidesModule recommendedGuides={summary.recommendedGuides} />
          <ResidencyProgressModule residencyStage={summary.residencyStage} hasPlan={Boolean(summary.planProgress)} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DocumentVaultSummaryModule documentVaultSummary={documentVaultSummary} />
          <NotesModule notes={notes} onAddNote={addNote} onDeleteNote={deleteNote} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ConnectorRecommendationsModule />
          </div>
          <UpcomingAppointmentsModule />
        </div>
      </div>
    </DashboardShell>
  );
}
