import Checkbox from "../../../components/Checkbox";
import ModuleCard from "./ModuleCard";

// Fully functional today — checked state is localStorage-backed, same
// pattern as My Mexico Plan's tasks. A document upload/storage backend is
// a documented future integration point, not a gap in what's built here.
export default function DocumentChecklistModule({ documentChecklist, documentState, onToggleDocument }) {
  const checkedCount = documentChecklist.filter((doc) => documentState[doc.id]).length;

  return (
    <ModuleCard eyebrow="Document Checklist" title={`${checkedCount} Of ${documentChecklist.length} Ready`}>
      <ul className="space-y-4">
        {documentChecklist.map((doc) => {
          const done = Boolean(documentState[doc.id]);
          return (
            <li key={doc.id} className="flex items-start gap-3">
              <Checkbox
                checked={done}
                onToggle={() => onToggleDocument(doc.id)}
                label={done ? `Mark "${doc.title}" as not ready` : `Mark "${doc.title}" as ready`}
              />
              <div>
                <p className={`text-sm font-medium text-zinc-950 ${done ? "line-through" : ""}`}>{doc.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{doc.note}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </ModuleCard>
  );
}
