import { useState } from "react";
import { Link } from "react-router-dom";
import YourMexicoShell from "../../yourMexico/components/YourMexicoShell";
import SEO from "../../../components/SEO";
import { useTopMatches } from "../../yourMexico/hooks/useTopMatches";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../../../utils/language";

const CONTENT = {
  en: {
    seoTitle: "My Mexico Plan",
    seoDescription: "Turn your Blueprint answers into a real, dated 365-day sequence of next steps for your move to Mexico.",
    toggle: "ES",
    backLabel: "Back To Your Mexico",
    eyebrow: "My Mexico Plan",
    emptyTitle: "Complete your Blueprint to build your plan.",
    emptyText: "Your Mexico Plan is built from your Blueprint answers and the city you've explored in Your Mexico. Start there, and this will be waiting for you.",
    startBlueprint: "Start Your Blueprint",
    readyTitle: "Which city is this plan for?",
    readyText: "Your plan turns your Blueprint answers into a real, dated sequence of next steps — specific to one city at a time.",
    bestMatch: "Your Best Match",
    buildPlanFor: (name) => `Build My Plan For ${name}`,
    orChooseDifferent: "Or choose a different match",
  },
  es: {
    seoTitle: "My Mexico Plan",
    seoDescription: "Convierte tus respuestas del Blueprint en una secuencia real y fechada de 365 días de próximos pasos para tu mudanza a México.",
    toggle: "EN",
    backLabel: "Volver A Your Mexico",
    eyebrow: "My Mexico Plan",
    emptyTitle: "Completa tu Blueprint para construir tu plan.",
    emptyText: "Tu Mexico Plan se construye a partir de tus respuestas del Blueprint y la ciudad que has explorado en Your Mexico. Empieza ahí, y esto te estará esperando.",
    startBlueprint: "Empezar Tu Blueprint",
    readyTitle: "¿Para qué ciudad es este plan?",
    readyText: "Tu plan convierte tus respuestas del Blueprint en una secuencia real y fechada de próximos pasos — específica para una ciudad a la vez.",
    bestMatch: "Tu Mejor Coincidencia",
    buildPlanFor: (name) => `Construir Mi Plan Para ${name}`,
    orChooseDifferent: "O elige una coincidencia diferente",
  },
};

// Routed /my-mexico-plan — confirms which city the plan is for. Defaults
// to the visitor's top match with one click; the rest of their matches
// stay one click away rather than being hidden.
export default function MyMexicoPlanSetupPage() {
  const [lang, setLangState] = useState(getStoredLanguage);
  const setLang = (next) => {
    setLangState(next);
    setStoredLanguage(next);
  };
  useHtmlLang(lang);
  const t = CONTENT[lang];
  const { hasCompletedBlueprint, matches } = useTopMatches();

  const seo = <SEO title={t.seoTitle} description={t.seoDescription} path="/my-mexico-plan" />;

  const langToggle = (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={() => setLang(lang === "en" ? "es" : "en")}
        className="border border-zinc-300 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        {t.toggle}
      </button>
    </div>
  );

  if (!hasCompletedBlueprint || matches.length === 0) {
    return (
      <YourMexicoShell backTo="/your-mexico" backLabel={t.backLabel} lang={lang}>
        {seo}
        {langToggle}
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-zinc-500">{t.eyebrow}</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
          {t.emptyTitle}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">{t.emptyText}</p>
        <Link
          to="/my-mexico-blueprint"
          className="mt-8 inline-flex items-center gap-2 bg-zinc-950 px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {t.startBlueprint}
        </Link>
      </YourMexicoShell>
    );
  }

  const [topMatch, ...otherMatches] = matches;

  return (
    <YourMexicoShell backTo="/your-mexico" backLabel={t.backLabel} lang={lang}>
      {seo}
      {langToggle}
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-zinc-500">{t.eyebrow}</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
        {t.readyTitle}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">{t.readyText}</p>

      <Link
        to={`/my-mexico-plan/${topMatch.id}`}
        className="mt-8 block border border-zinc-950 bg-zinc-950 p-6 text-white transition hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">{t.bestMatch}</p>
        <p className="mt-2 text-2xl font-light tracking-[-0.01em]">{t.buildPlanFor(topMatch.name)}</p>
      </Link>

      {otherMatches.length > 0 && (
        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{t.orChooseDifferent}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {otherMatches.map((city) => (
              <Link
                key={city.id}
                to={`/my-mexico-plan/${city.id}`}
                className="border border-zinc-300 px-5 py-3 text-sm text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </YourMexicoShell>
  );
}
