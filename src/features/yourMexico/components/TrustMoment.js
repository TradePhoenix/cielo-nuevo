import CitySection from "./CitySection";
import { FOUNDER, TESTIMONIALS } from "../../../data/trustContent";

const TEXT = {
  en: { eyebrow: "From Path To Mexico", title: "You're not figuring this out alone" },
  es: { eyebrow: "De Path To Mexico", title: "No estás resolviendo esto solo" },
};

// A real founder quote and a real client testimonial, reused verbatim from
// the homepage — the audit found these already existed and already worked,
// but went silent everywhere a visitor was actually deciding. This is the
// fix: the same trust signal, carried into Your Mexico.
export default function TrustMoment({ lang = "en" }) {
  const testimonial = TESTIMONIALS[0];
  const t = TEXT[lang] || TEXT.en;
  const founderQuote = lang === "es" ? FOUNDER.quoteEs : FOUNDER.quote;
  const founderRole = lang === "es" ? FOUNDER.roleEs : FOUNDER.role;
  const testimonialQuote = lang === "es" ? testimonial.quoteEs : testimonial.quote;
  const testimonialName = lang === "es" ? testimonial.nameEs : testimonial.name;

  return (
    <CitySection eyebrow={t.eyebrow} title={t.title}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="border border-zinc-200 bg-white p-6">
          <img
            src={FOUNDER.photo}
            alt={FOUNDER.name}
            loading="lazy"
            className="h-14 w-14 rounded-full object-cover"
          />
          <p className="mt-4 text-lg leading-relaxed text-zinc-700">"{founderQuote}"</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
            {FOUNDER.name} &middot; {founderRole}
          </p>
        </div>

        <div className="border border-zinc-200 bg-white p-6">
          <p className="text-lg leading-relaxed text-zinc-700">"{testimonialQuote}"</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">{testimonialName}</p>
        </div>
      </div>
    </CitySection>
  );
}
