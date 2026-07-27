import { BLUEPRINT_UI } from "../data/uiCopy";

export default function ProgressBar({ current, total, lang = "en" }) {
  const percent = Math.round((current / total) * 100);
  const ui = BLUEPRINT_UI[lang].question;

  return (
    <div className="mx-auto mb-10 w-full max-w-xl">
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-zinc-500">
        <span>{ui.progress(current, total)}</span>
        <span>{percent}%</span>
      </div>

      <div className="h-1 w-full bg-zinc-200">
        <div
          className="h-1 bg-zinc-950 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
