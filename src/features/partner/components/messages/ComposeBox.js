import { useState } from "react";

export default function ComposeBox({ onSend }) {
  const [body, setBody] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!body.trim()) return;
    onSend(body);
    setBody("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3 border-t border-zinc-200 bg-white p-4">
      <label className="flex-1">
        <span className="sr-only">Write a message</span>
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit(event);
            }
          }}
          rows={1}
          placeholder="Write a message…"
          className="w-full resize-none border border-zinc-300 px-4 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        />
      </label>
      <button
        type="submit"
        disabled={!body.trim()}
        className="bg-zinc-950 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#d8a15f] hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-zinc-950 disabled:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        Send
      </button>
    </form>
  );
}
