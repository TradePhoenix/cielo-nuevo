export default function TypingIndicator({ name }) {
  return (
    <div className="flex items-center gap-2 text-xs text-zinc-500" aria-live="polite">
      <span className="flex gap-0.5">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />
      </span>
      {name} is typing…
    </div>
  );
}
