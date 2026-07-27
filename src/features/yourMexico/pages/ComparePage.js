import { useState } from "react";
import YourMexicoShell from "../components/YourMexicoShell";
import CitySection from "../components/CitySection";
import CompareYourMatches from "../components/CompareYourMatches";
import FitCallBar from "../components/FitCallBar";
import SEO from "../../../components/SEO";
import { getAllCities } from "../logic/cityLookup";
import { useTopMatches } from "../hooks/useTopMatches";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../../../utils/language";

// Routed /your-mexico/compare — a focused comparison of the visitor's
// matches, reachable from Your Top Matches and from the embedded
// comparison section on every City Detail page.
//
// PTM Spanish-parity pass — CompareYourMatches was already fully
// lang-aware (see that file); this page just never threaded a `lang`
// value through to it. Added the same local content + toggle pattern
// used elsewhere in Your Mexico.
const content = {
  en: {
    seoTitle: "Compare Your Matches",
    seoDescription: "Compare cost, pace, and the practical details of your matched Mexico cities side by side.",
    toggle: "ES",
    backLabel: "Back To Your Top Matches",
    eyebrow: "Compare Your Matches",
    title: "How your matches stack up.",
    text: "The same picture, side by side — cost, pace, and the practical details that make each one a different kind of life.",
    sectionEyebrow: "At A Glance",
    sectionTitle: "Cost and lifestyle, side by side",
  },
  es: {
    seoTitle: "Compara Tus Coincidencias",
    seoDescription: "Compara costo, ritmo y los detalles prácticos de tus ciudades mexicanas coincidentes, lado a lado.",
    toggle: "EN",
    backLabel: "Volver A Tus Mejores Coincidencias",
    eyebrow: "Compara Tus Coincidencias",
    title: "Cómo se comparan tus coincidencias.",
    text: "La misma imagen, lado a lado — costo, ritmo y los detalles prácticos que hacen de cada una un tipo de vida diferente.",
    sectionEyebrow: "De Un Vistazo",
    sectionTitle: "Costo y estilo de vida, lado a lado",
  },
};

export default function ComparePage() {
  const { hasCompletedBlueprint, matches } = useTopMatches();
  const cities = hasCompletedBlueprint ? matches : getAllCities();
  const [lang, setLangState] = useState(getStoredLanguage);
  const setLang = (next) => {
    setLangState(next);
    setStoredLanguage(next);
  };
  useHtmlLang(lang);
  const t = content[lang];

  return (
    <YourMexicoShell backTo="/your-mexico" backLabel={t.backLabel} lang={lang}>
      <SEO title={t.seoTitle} description={t.seoDescription} path="/your-mexico/compare" />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setLang(lang === "en" ? "es" : "en")}
          className="border border-zinc-300 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {t.toggle}
        </button>
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-zinc-500">{t.eyebrow}</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">{t.title}</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">{t.text}</p>

      <CitySection eyebrow={t.sectionEyebrow} title={t.sectionTitle}>
        <CompareYourMatches cities={cities} lang={lang} />
      </CitySection>

      <FitCallBar source="compare" lang={lang} />
    </YourMexicoShell>
  );
}
