import { Link } from "react-router-dom";
import { FIT_CALL_PRICE } from "../../../data/trustContent";
import { trackEvent, ANALYTICS_EVENTS } from "../../../utils/analytics";

// The one CTA reused across every Your Mexico (Living Destination Atlas,
// City Detail) and My Mexico Plan screen — quiet and constant rather than
// a pop-up, per the product's "never more than one screen away" principle.
// Personalizes its headline to a city when one is in view; `message` lets
// a caller override the headline entirely for a different context (e.g.
// "refine this plan") without duplicating the rest of the component. The
// price is stated plainly here too, so it's never a surprise by the time
// someone reaches the Fit Call page itself.
//
// CONV-001: `cityId` (distinct from the already-existing `cityName`, which
// stays purely presentational) carries destination context through to the
// Fit Call page via a `?city=` query param — see mexicoFitCallContext.js.
// The quiet secondary line below the button is this ticket's other
// addition: every surface that renders this bar now also has a real path
// to "what does working with Path To Mexico actually look like" (services
// and pricing), which previously only existed on the homepage and footer,
// disconnected from the personalized destination/Blueprint/Plan journey.
// It's deliberately a small text link, not a second button, so it can
// never visually compete with the one primary action on the page.
//
// `lang` (default "en", every existing caller unaffected): the Living
// Destination Atlas is the one caller of this component that has its own
// EN/ES toggle (CX-008) — this component's full copy is translated, not
// just the new secondary line, since a partially-translated bar would be
// exactly the "mixed-language UI" this ticket's EN/ES requirement forbids.
// Compare/City Detail/My Mexico Plan have no lang mechanism of their own
// (pre-existing, not something this ticket adds), so they simply never
// pass `lang` and this renders English, matching their own existing copy.
const TEXT = {
  en: {
    eyebrow: "Ready When You Are",
    defaultHeadline: "Talk through what your next chapter in Mexico could look like.",
    cityHeadline: (cityName) => `Talk through what life in ${cityName} could look like.`,
    subtext:
      "A Mexico Fit Call is where this gets specific — your city choice, a realistic budget, the residency path that fits you, and what to do first.",
    priceLabel: "One Private Call",
    buttonShort: "Book My Fit Call",
    buttonLong: "Book My Mexico Fit Call",
    notReady: "Not ready for a call?",
    servicesLink: "See how Path To Mexico can help",
  },
  es: {
    eyebrow: "Cuando Estés Listo",
    defaultHeadline: "Hablemos de cómo podría verse tu próximo capítulo en México.",
    cityHeadline: (cityName) => `Hablemos de cómo podría verse la vida en ${cityName}.`,
    subtext:
      "Una Mexico Fit Call es donde esto se vuelve concreto — tu elección de ciudad, un presupuesto realista, el camino de residencia adecuado para ti y qué hacer primero.",
    priceLabel: "Una Llamada Privada",
    buttonShort: "Reservar Mi Llamada",
    buttonLong: "Reservar Mi Mexico Fit Call",
    notReady: "¿Aún no estás listo para una llamada?",
    servicesLink: "Descubre cómo Path To Mexico puede ayudarte",
  },
};

export default function FitCallBar({ cityName, cityId, message, source = "fit_call_bar", lang = "en" }) {
  const t = TEXT[lang] || TEXT.en;
  const headline = message || (cityName ? t.cityHeadline(cityName) : t.defaultHeadline);
  const fitCallHref = cityId ? `/mexico-fit-call?city=${cityId}` : "/mexico-fit-call";

  return (
    <div className="mt-16 border border-zinc-200 bg-white p-8 text-center sm:p-12">
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{t.eyebrow}</p>
      <h3 className="mx-auto mt-4 max-w-lg text-2xl font-light leading-snug tracking-[-0.02em] sm:text-3xl">
        {headline}
      </h3>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-zinc-600">{t.subtext}</p>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-400">
        {FIT_CALL_PRICE} &middot; {t.priceLabel}
      </p>
      <Link
        to={fitCallHref}
        onClick={() => trackEvent(ANALYTICS_EVENTS.FIT_CALL_CTA_CLICKED, { source, cityId: cityId || null })}
        className="group mt-8 inline-flex items-center gap-2 whitespace-nowrap bg-zinc-950 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 sm:px-9 sm:tracking-[0.22em]"
      >
        <span className="sm:hidden">{t.buttonShort}</span>
        <span className="hidden sm:inline">{t.buttonLong}</span>
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
      <p className="mt-5 text-xs text-zinc-500">
        {t.notReady}{" "}
        <Link
          to="/work-with-path-to-mexico"
          onClick={() => trackEvent(ANALYTICS_EVENTS.SERVICES_CTA_CLICKED, { source })}
          className="font-semibold text-zinc-700 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
        >
          {t.servicesLink}
        </Link>
      </p>
    </div>
  );
}
