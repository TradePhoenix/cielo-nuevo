import { useClientDashboardTheme } from "./ThemeContext";
import { formatDateTime } from "../utils/formatters";

export default function MessageBubble({ message }) {
  const { isDark } = useClientDashboardTheme();
  const isClient = message.sender === "client";

  return (
    <div className={`flex ${isClient ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] ${isClient ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed ${
            isClient ? "bg-zinc-950 text-white" : isDark ? "bg-zinc-800 text-zinc-100" : "bg-zinc-100 text-zinc-800"
          }`}
        >
          {message.text}
        </div>
        <span className={`mt-1 text-[10px] uppercase tracking-[0.1em] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
          {formatDateTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
