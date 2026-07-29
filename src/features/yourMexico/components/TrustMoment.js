import CitySection from "./CitySection";
import { FOUNDER, ENDORSEMENT } from "../../../data/trustContent";

const TEXT = {
  en: { eyebrow: "From Path To Mexico", title: "You're not figuring this out alone" },
  es: { eyebrow: "De Path To Mexico", title: "No estás resolviendo esto solo" },
};

// TRUST-001 — the second card was a client testimonial; it's now a
// verified professional endorsement (see trustContent.js's ENDORSEMENT
// comment for why). Shows only the endorsement's first paragraph — a
// complete, unaltered sentence — since this compact card was sized for a
// short pull-quote, not the full multi-paragraph reference letter (that
// lives in full on the homepage).
export default function TrustMoment({ lang = "en" }) {
  const t = TEXT[lang] || TEXT.en;
  const founderQuote = lang === "es" ? FOUNDER.quoteEs : FOUNDER.quote;
  const founderRole = lang === "es" ? FOUNDER.roleEs : FOUNDER.role;
  const endorsementQuote = (lang === "es" ? ENDORSEMENT.quoteParagraphsEs : ENDORSEMENT.quoteParagraphs)[0];
  const endorsementRole = lang === "es" ? ENDORSEMENT.roleEs : ENDORSEMENT.role;

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
          <p className="text-lg leading-relaxed text-zinc-700">"{endorsementQuote}"</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
            {ENDORSEMENT.name} &middot; {endorsementRole}
          </p>
        </div>
      </div>
    </CitySection>
  );
}
