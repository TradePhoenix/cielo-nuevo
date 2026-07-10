import { useState } from "react";
import ModuleCard from "./ModuleCard";

// Fully functional today — localStorage-backed, same as everything else in
// this feature. Cloud-synced, cross-device notes are a documented future
// integration point once accounts exist.
export default function NotesModule({ notes, onAddNote, onDeleteNote }) {
  const [draft, setDraft] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddNote(draft);
    setDraft("");
  };

  return (
    <ModuleCard eyebrow="Notes" title="Your Private Notes">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="dashboard-note-input" className="sr-only">
          Add a new note
        </label>
        <input
          id="dashboard-note-input"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Jot something down..."
          className="flex-1 border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-950"
        />
        <button
          type="submit"
          className="border border-zinc-950 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Add
        </button>
      </form>

      {notes.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {notes.map((note) => (
            <li key={note.id} className="flex items-start justify-between gap-4 border-t border-zinc-100 pt-3">
              <p className="text-sm leading-relaxed text-zinc-700">{note.text}</p>
              <button
                type="button"
                onClick={() => onDeleteNote(note.id)}
                aria-label="Delete note"
                className="flex-shrink-0 text-xs uppercase tracking-[0.15em] text-zinc-400 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-sm text-zinc-500">Nothing here yet — this is your own private scratchpad.</p>
      )}
    </ModuleCard>
  );
}
