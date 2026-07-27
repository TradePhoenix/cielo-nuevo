import { Link } from "react-router-dom";

// Shared page shell for every Your Mexico screen — consistent max-width,
// a quiet "back into the story" link, and a background variant so dark and
// light screens both reuse the same wrapper instead of each page inventing
// its own container.
//
// `hero`, when passed, renders full-width as the first child of <main>,
// outside the padded content column — the shell then assumes that hero
// carries its own back-navigation (see CityHero) and suppresses its own.
const DEFAULT_BACK_LABEL = { en: "Back To Your Blueprint Results", es: "Volver A Tus Resultados Del Blueprint" };

export default function YourMexicoShell({
  children,
  hero,
  background = "cream",
  backTo = "/my-mexico-blueprint",
  backLabel,
  lang = "en",
}) {
  const isDark = background === "dark";
  const resolvedBackLabel = backLabel || DEFAULT_BACK_LABEL[lang] || DEFAULT_BACK_LABEL.en;

  return (
    <main className={isDark ? "min-h-screen bg-[#0b0b0a] text-white" : "min-h-screen bg-[#f6f1e8] text-zinc-950"}>
      {hero}
      <div className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
        {!hero && (
          <div className="print:hidden flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/"
              aria-label="Path to Mexico — home"
              className={`transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007C83] focus-visible:ring-offset-2 ${
                isDark ? "text-white/70 hover:text-white focus-visible:ring-offset-[#0b0b0a]" : "text-zinc-700 hover:text-zinc-950"
              }`}
            >
              <img
                src={isDark ? "/brand/logos/ptm-primary-horizontal-reverse.svg" : "/brand/logos/ptm-primary-horizontal-ink.svg"}
                alt="Path to Mexico"
                className="h-8 w-auto"
              />
            </Link>
            <Link
              to={backTo}
              className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007C83] focus-visible:ring-offset-2 ${
                isDark ? "text-white/50 hover:text-white focus-visible:ring-offset-[#0b0b0a]" : "text-zinc-500 hover:text-zinc-950"
              }`}
            >
              <span aria-hidden="true">←</span>
              {resolvedBackLabel}
            </Link>
          </div>
        )}

        <div className={hero ? "" : "mt-10"}>{children}</div>
      </div>
    </main>
  );
}
