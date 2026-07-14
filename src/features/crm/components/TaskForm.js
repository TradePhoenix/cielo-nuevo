import { useState } from "react";
import { TASK_PRIORITIES } from "../data/pipelineStages";

const inputClasses = "border border-zinc-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f]";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const submit = (event) => {
    event.preventDefault();
    if (!title.trim() || !dueDate) return;
    onAddTask({ title, dueDate, priority });
    setTitle("");
    setDueDate("");
    setPriority("Medium");
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Follow-up task…"
        aria-label="Task title"
        className={`flex-1 ${inputClasses}`}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
        aria-label="Due date"
        required
        className={inputClasses}
      />
      <select value={priority} onChange={(event) => setPriority(event.target.value)} aria-label="Priority" className={inputClasses}>
        {TASK_PRIORITIES.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <button
        type="submit"
        className="shrink-0 bg-zinc-950 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#d8a15f] hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        Add Task
      </button>
    </form>
  );
}
