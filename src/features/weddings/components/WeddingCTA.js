import { Link } from "react-router-dom";
import CinematicReveal from "../../../components/CinematicReveal";
import { trackEvent, ANALYTICS_EVENTS } from "../../../utils/analytics";

// Final CTA — the emotional close. The Telchac Puerto dusk shoreline
// (real PTM region asset) sits deep under a heavy charcoal overlay, so
// the section reads as warm evening atmosphere rather than a literal
// place. "Start A Conversation" reuses the site's one verified direct
// channel — the founder's WhatsApp number, exactly as HomePage.js and
// mexicoFitCallContext.js already use it.
const WHATSAPP_NUMBER = "16043154625";
const WHATSAPP_MESSAGE = {
  en: "Hi Kalen, I found Path To Mexico and would love to talk about a wedding in Mexico.",
  es: "Hola Kalen, encontré Path To Mexico y me encantaría platicar sobre una boda en México.",
};

export default function WeddingCTA({ t, lang }) {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE[lang] || WHATSAPP_MESSAGE.en)}`;

  return (
    <section className="relative overflow-hidden bg-[#0b0b0a] px-6 py-32 text-center text-white md:py-44">
      <picture>
        <source type="image/webp" srcSet="/regions/telchac-puerto/telchac-puerto-hero-desktop.webp" />
        <img
          src="/regions/telchac-puerto/telchac-puerto-hero-desktop.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
      </picture>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0b0a]/80 via-[#0b0b0a]/60 to-[#0b0b0a]/90"
      />

      <CinematicReveal className="relative z-10 mx-auto max-w-4xl">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/45">{t.label}</p>
        <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.title}</h2>
        <div className="mx-auto mt-9 max-w-2xl space-y-4 text-lg leading-relaxed text-white/70">
          {t.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/weddings/inquire"
            onClick={() => trackEvent(ANALYTICS_EVENTS.WEDDINGS_CTA_CLICKED, { source: "weddings_closing", cta: "plan_my_wedding" })}
            className="bg-white px-9 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {t.ctaPrimary}
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent(ANALYTICS_EVENTS.WEDDINGS_CTA_CLICKED, { source: "weddings_closing", cta: "whatsapp" })}
            className="border border-white/35 px-9 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {t.ctaSecondary}
          </a>
        </div>

        <p className="mx-auto mt-12 max-w-xl text-sm leading-relaxed text-white/50">{t.qualification}</p>
      </CinematicReveal>
    </section>
  );
}
