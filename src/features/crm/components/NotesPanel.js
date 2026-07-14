import { useState } from "react";
import { formatDate } from "../logic/dateHelpers";

export default function NotesPanel({ notes, onAddNote, resolveAuthorName }) {
  const [draft, setDraft] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!draft.trim()) return;
    onAddNote(draft);
    setDraft("");
  };

  const sortedNotes = [...notes].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add an internal note…"
          aria-label="Add an internal note"
          rows={2}
          className="flex-1 resize-none border border-zinc-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]"
        />
        <button
          type="submit"
          className="shrink-0 bg-zinc-950 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#d8a15f] hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          Add Note
        </button>
      </form>

      <ul className="mt-5 space-y-4">
        {sortedNotes.length === 0 && <p className="text-sm text-zinc-400">No internal notes yet.</p>}
        {sortedNotes.map((note) => (
          <li key={note.id} className="border-l-2 border-zinc-200 pl-4">
            <p className="text-sm leading-relaxed text-zinc-700">{note.text}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-zinc-400">
              {resolveAuthorName(note.authorId)} · {formatDate(note.date)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
