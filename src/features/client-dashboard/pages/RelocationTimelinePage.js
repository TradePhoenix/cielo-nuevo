import { useEffect, useMemo, useRef } from "react";
import ClientDashboardLayout from "../components/ClientDashboardLayout";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import TimelineStageRow from "../components/TimelineStageRow";
import { TIMELINE_STAGES } from "../mock/mockTimeline";
import SEO from "../../../components/SEO";

function RelocationTimelineContent() {
  const headingRef = useRef(null);
  useEffect(() => {
    if (headingRef.current) headingRef.current.focus();
  }, []);

  const completedCount = useMemo(() => TIMELINE_STAGES.filter((stage) => stage.status === "completed").length, []);

  return (
    <div className="mx-auto max-w-3xl">
      <SEO
        title="Relocation Timeline"
        description="Your complete relocation journey, from application to settled."
        path="/client-dashboard/timeline"
      />
      <PageHeader
        eyebrow="Relocation Timeline"
        title="Your complete journey, stage by stage."
        description={`${completedCount} of ${TIMELINE_STAGES.length} stages complete. Each one unlocks the next once it's confirmed by your concierge.`}
        headingRef={headingRef}
      />

      <SectionCard className="mt-10">
        <div>
          {TIMELINE_STAGES.map((stage, index) => (
            <TimelineStageRow key={stage.id} stage={stage} isLast={index === TIMELINE_STAGES.length - 1} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

// Routed /client-dashboard/timeline
export default function RelocationTimelinePage() {
  return (
    <ClientDashboardLayout>
      <RelocationTimelineContent />
    </ClientDashboardLayout>
  );
}
