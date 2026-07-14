import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ClientDashboardLayout from "../components/ClientDashboardLayout";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import ProgressBar from "../components/ProgressBar";
import StatusPill from "../components/StatusPill";
import { useClientDashboardTheme } from "../components/ThemeContext";
import { useProfileState } from "../hooks/useProfileState";
import { TIMELINE_STAGES } from "../mock/mockTimeline";
import { RECENT_ACTIVITY, QUICK_ACTIONS } from "../mock/mockActivity";
import { formatDate, timeAgo } from "../utils/formatters";
import SEO from "../../../components/SEO";

function DashboardHomeContent() {
  const { profile } = useProfileState();
  const { isDark } = useClientDashboardTheme();
  const headingRef = useRef(null);

  useEffect(() => {
    if (headingRef.current) headingRef.current.focus();
  }, []);

  const currentStage = TIMELINE_STAGES.find((stage) => stage.id === profile.currentStageId) || TIMELINE_STAGES[0];

  return (
    <div className="mx-auto max-w-5xl">
      <SEO
        title="Client Dashboard"
        description="Everything about your move to Mexico, guided from day one to settled."
        path="/client-dashboard"
      />
      <PageHeader
        eyebrow="Client Dashboard"
        title={`Welcome back, ${profile.firstName}.`}
        description="Here's where things stand with your move — one calm place for progress, next steps, and everything in between."
        headingRef={headingRef}
      />

      <div className="mt-10 grid grid-cols-1 gap-6">
        <SectionCard eyebrow="Your Progress" title={`${profile.progressPercent}% of the way there`}>
          <ProgressBar percent={profile.progressPercent} />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <p className={`text-sm ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>Current stage</p>
            <StatusPill status="current" />
            <p className={`text-sm font-medium ${isDark ? "text-white" : "text-zinc-950"}`}>{currentStage.title}</p>
          </div>
          <Link
            to="/client-dashboard/timeline"
            className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d8a15f] hover:underline underline-offset-4"
          >
            View Full Timeline &rarr;
          </Link>
        </SectionCard>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SectionCard eyebrow="Upcoming Milestone" title={profile.upcomingMilestone.title}>
            <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-zinc-950"}`}>
              {formatDate(profile.upcomingMilestone.date)}
            </p>
            <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              {profile.upcomingMilestone.description}
            </p>
            <Link
              to="/client-dashboard/appointments"
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d8a15f] hover:underline underline-offset-4"
            >
              View Appointments &rarr;
            </Link>
          </SectionCard>

          <SectionCard eyebrow="Quick Actions" title="Jump back in">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.id}
                  to={action.to}
                  className={`border px-4 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:border-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
                    isDark ? "border-zinc-800 text-white" : "border-zinc-200 text-zinc-950"
                  }`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </SectionCard>
        </div>

        <SectionCard eyebrow="Recent Activity" title="What's happened lately">
          <ul className={`divide-y ${isDark ? "divide-zinc-800" : "divide-zinc-200"}`}>
            {RECENT_ACTIVITY.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                <p className={`text-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>{item.text}</p>
                <p className={`shrink-0 text-xs uppercase tracking-[0.1em] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                  {timeAgo(item.timestamp)}
                </p>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}

// Routed /client-dashboard — Client Dashboard V2's home. Distinct from the
// existing /dashboard (built from live Blueprint/Plan answers): this is
// the post-signup client-services portal, entirely mock-data-driven per
// scope, and lives under its own layout/shell.
export default function ClientDashboardHomePage() {
  return (
    <ClientDashboardLayout>
      <DashboardHomeContent />
    </ClientDashboardLayout>
  );
}
