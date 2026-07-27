export default function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isUser
            ? "max-w-[85%] rounded-2xl rounded-br-sm bg-zinc-950 px-4 py-3 text-sm leading-relaxed text-white"
            : "max-w-[85%] rounded-2xl rounded-bl-sm border border-zinc-200 bg-white px-4 py-3 text-sm leading-relaxed text-zinc-800"
        }
      >
        {content ? (
          content.split("\n").map((line, i) => (
            <p key={i} className={i > 0 ? "mt-2" : undefined}>
              {line}
            </p>
          ))
        ) : (
          <span className="inline-flex items-center gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />
          </span>
        )}
      </div>
    </div>
  );
}
