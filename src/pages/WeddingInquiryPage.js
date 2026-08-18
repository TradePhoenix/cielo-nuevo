import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../utils/language";
import { trackEvent, ANALYTICS_EVENTS } from "../utils/analytics";
import { WEDDINGS_CONTENT } from "../features/weddings/data/copy";
import WeddingInquiryForm from "../features/weddings/components/WeddingInquiryForm";

// WEDDINGS-001 — /weddings/inquire, the dedicated wedding inquiry flow
// ("Plan My Wedding"). Deliberately its own focused page rather than a
// section of the landing page: one purpose, no competing CTAs. V1.1
// layout: an editorial split — the introduction and quiet assurances hold
// the left column (sticky on desktop) while the three-movement form
// carries the right.
export default function WeddingInquiryPage() {
  const [lang, setLangState] = useState(getStoredLanguage);
  const setLang = (next) => {
    setLangState(next);
    setStoredLanguage(next);
  };
  useHtmlLang(lang);
  const t = WEDDINGS_CONTENT[lang];

  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.WEDDINGS_INQUIRY_VIEWED);
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0b0a] text-white">
      <SEO
        title={t.inquirySeoTitle}
        description={t.inquirySeoDescription}
        path="/weddings/inquire"
        ogImage="https://pathtomexico.com/regions/tulum/tulum-hero-desktop.jpg"
      />

      <div className="flex items-center justify-between px-6 py-5 md:px-12">
        <Link to="/weddings" aria-label="Path To Mexico — weddings" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2">
          <img src="/brand/logos/ptm-primary-horizontal-reverse.svg" alt="Path To Mexico" className="h-7 w-auto sm:h-8" />
        </Link>
        <button
          type="button"
          onClick={() => setLang(lang === "en" ? "es" : "en")}
          className="border border-white/30 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {t.toggle}
        </button>
      </div>

      <section className="px-6 pb-24 pt-10 md:px-12 md:pb-32 md:pt-16">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-16 lg:self-start">
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-white/50">{t.inquiry.eyebrow}</p>
            <h1 className="text-5xl font-light leading-[0.95] tracking-[-0.05em] md:text-6xl lg:text-7xl">
              {t.inquiry.title}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/65">{t.inquiry.lead}</p>

            <ul className="mt-12 hidden space-y-4 border-t border-white/15 pt-8 lg:block">
              {t.inquiry.assurances.map((assurance, index) => (
                <li key={index} className="flex items-baseline gap-3 text-sm leading-relaxed text-white/55">
                  <span aria-hidden="true" className="text-[#d8a15f]">·</span>
                  {assurance}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/15 pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <WeddingInquiryForm t={t.inquiry} lang={lang} />
          </div>
        </div>
      </section>
    </main>
  );
}
