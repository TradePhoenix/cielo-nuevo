import { Link } from "react-router-dom";
import CitySection from "./CitySection";

const TEXT = {
  en: {
    eyebrow: "Your Mexico Plan",
    title: (name) => `Ready to see what the next year could look like in ${name}?`,
    body: "Your Mexico Plan turns everything you've just read into a real, dated sequence of next steps — organized by what actually comes first, not a flat list of everything at once.",
    cta: "Build My Mexico Plan",
  },
  es: {
    eyebrow: "Tu Plan México",
    title: (name) => `¿Listo para ver cómo podría verse el próximo año en ${name}?`,
    body: "Tu Plan México convierte todo lo que acabas de leer en una secuencia real de próximos pasos con fechas — organizada según lo que realmente viene primero, no una lista plana de todo a la vez.",
    cta: "Construir Mi Plan México",
  },
};

// The sequenced entry point into My Mexico Plan — appears only after a
// visitor has engaged with a specific city's full story, never pushed
// earlier. Deepens commitment one step at a time: explore, then plan.
export default function PlanEntryCTA({ city, lang = "en" }) {
  const t = TEXT[lang] || TEXT.en;

  return (
    <CitySection eyebrow={t.eyebrow} title={t.title(city.name)}>
      <p className="max-w-2xl text-lg leading-relaxed text-zinc-700">{t.body}</p>
      <Link
        to={`/my-mexico-plan/${city.id}`}
        className="mt-6 inline-flex items-center gap-2 bg-zinc-950 px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        {t.cta}
      </Link>
    </CitySection>
  );
}
