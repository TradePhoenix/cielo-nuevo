import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../utils/language";
import { trackEvent, ANALYTICS_EVENTS } from "../utils/analytics";
import { WEDDINGS_CONTENT } from "../features/weddings/data/copy";
import WeddingHero from "../features/weddings/components/WeddingHero";
import WeddingPhilosophy from "../features/weddings/components/WeddingPhilosophy";
import CeremonyElements from "../features/weddings/components/CeremonyElements";
import RespectForCulture from "../features/weddings/components/RespectForCulture";
import LocalNetwork from "../features/weddings/components/LocalNetwork";
import WeddingLocations from "../features/weddings/components/WeddingLocations";
import WeddingWellness from "../features/weddings/components/WeddingWellness";
import ExperienceTypes from "../features/weddings/components/ExperienceTypes";
import CompleteExperience from "../features/weddings/components/CompleteExperience";
import WeddingJourney from "../features/weddings/components/WeddingJourney";
import LegalMarriageNotice from "../features/weddings/components/LegalMarriageNotice";
import ResponsibleWedding from "../features/weddings/components/ResponsibleWedding";
import WeddingCTA from "../features/weddings/components/WeddingCTA";

// WEDDINGS-001 — Maya Weddings & Sacred Unions, the Weddings vertical's
// landing page. Same bilingual page-local content convention as every
// other page (see src/utils/language.js); all copy lives in
// src/features/weddings/data/copy.js, including its cultural and legal
// guardrails — read that file's header before editing any wording.
export default function WeddingsPage() {
  const [lang, setLangState] = useState(getStoredLanguage);
  const setLang = (next) => {
    setLangState(next);
    setStoredLanguage(next);
  };
  useHtmlLang(lang);
  const t = WEDDINGS_CONTENT[lang];

  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.WEDDINGS_PAGE_VIEWED);
  }, []);

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <SEO
        title={t.seoTitle}
        description={t.seoDescription}
        path="/weddings"
        ogImage="https://pathtomexico.com/regions/tulum/tulum-hero-desktop.jpg"
      />

      <WeddingHero
        t={t.hero}
        lang={lang}
        toggleLabel={t.toggle}
        onToggleLang={() => setLang(lang === "en" ? "es" : "en")}
        onPrimaryCta={() => trackEvent(ANALYTICS_EVENTS.WEDDINGS_CTA_CLICKED, { source: "weddings_hero", cta: "begin_your_wedding" })}
      />
      <WeddingPhilosophy t={t.philosophy} />
      <CeremonyElements t={t.ceremony} />
      <RespectForCulture t={t.culture} />
      <LocalNetwork t={t.network} />
      <WeddingLocations t={t.places} />
      <WeddingWellness t={t.wellness} />
      <ExperienceTypes t={t.types} />
      <CompleteExperience t={t.complete} />
      <WeddingJourney t={t.journey} />
      <LegalMarriageNotice t={t.legal} />
      <ResponsibleWedding t={t.responsible} />
      <WeddingCTA t={t.closing} lang={lang} />
    </main>
  );
}
