import { formatTime } from "../../utils/formatters";
import TypingIndicator from "./TypingIndicator";

export default function MessageThread({ conversation, messages }) {
  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-5">
      {messages.map((message) => {
        const isPartner = message.sender === "partner";
        return (
          <div key={message.id} className={`flex ${isPartner ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                isPartner ? "bg-zinc-950 text-white" : "border border-zinc-200 bg-white text-zinc-950"
              }`}
            >
              <p>{message.body}</p>
              <p className={`mt-1 text-[10px] uppercase tracking-[0.1em] ${isPartner ? "text-zinc-400" : "text-zinc-400"}`}>
                {formatTime(message.sentAt)}
              </p>
            </div>
          </div>
        );
      })}

      {conversation.isTyping && (
        <div className="flex justify-start">
          <div className="border border-zinc-200 bg-white px-4 py-2.5">
            <TypingIndicator name={conversation.withName} />
          </div>
        </div>
      )}
    </div>
  );
}
