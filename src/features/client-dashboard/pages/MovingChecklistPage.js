import { useEffect, useRef } from "react";
import ClientDashboardLayout from "../components/ClientDashboardLayout";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import ProgressBar from "../components/ProgressBar";
import ChecklistCategoryCard from "../components/ChecklistCategoryCard";
import { useChecklistState } from "../hooks/useChecklistState";
import SEO from "../../../components/SEO";

function MovingChecklistContent() {
  const headingRef = useRef(null);
  useEffect(() => {
    if (headingRef.current) headingRef.current.focus();
  }, []);

  const { categories, toggleTask, totalTasks, completedTasks, percentComplete } = useChecklistState();

  return (
    <div className="mx-auto max-w-5xl">
      <SEO
        title="Moving Checklist"
        description="Every task for your move to Mexico, organized by category."
        path="/client-dashboard/checklist"
      />
      <PageHeader
        eyebrow="Moving Checklist"
        title="Nothing forgotten, nothing rushed."
        description="Every task for your move, organized by category. Check things off as you go — your progress is saved automatically."
        headingRef={headingRef}
      />

      <SectionCard className="mt-10 max-w-md">
        <ProgressBar percent={percentComplete} label={`${completedTasks} of ${totalTasks} Tasks Complete`} />
      </SectionCard>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {categories.map((category) => (
          <ChecklistCategoryCard key={category.id} category={category} onToggleTask={toggleTask} />
        ))}
      </div>
    </div>
  );
}

// Routed /client-dashboard/checklist
export default function MovingChecklistPage() {
  return (
    <ClientDashboardLayout>
      <MovingChecklistContent />
    </ClientDashboardLayout>
  );
}
