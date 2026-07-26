import CitySection from "./CitySection";

const TEXT = {
  en: {
    eyebrow: "Investment Outlook",
    title: (name) => `Growth & long-term suitability in ${name}`,
    disclaimer:
      "This is not financial, investment, or real estate advice, and not a prediction of returns. Path To Mexico does not recommend speculative or short-term buying. Anyone considering a purchase should verify current conditions independently and consult qualified local professionals.",
  },
  es: {
    eyebrow: "Perspectiva De Inversión",
    title: (name) => `Crecimiento y viabilidad a largo plazo en ${name}`,
    disclaimer:
      "Esto no es asesoría financiera, de inversión ni inmobiliaria, ni una predicción de rendimientos. Path To Mexico no recomienda compras especulativas ni de corto plazo. Cualquier persona que considere una compra debe verificar las condiciones actuales de forma independiente y consultar a profesionales locales calificados.",
  },
};

// DEST-003 — deliberately framed as long-term suitability and community
// impact, never as financial advice, ROI, or "hot market" language (see
// CLAUDE.md's guiding principles and this ticket's explicit content rules).
// The disclaimer is not optional boilerplate tacked on the end — it's the
// section's whole point, which is why it renders every time this section
// does rather than once somewhere else on the page.
export default function InvestmentOutlook({ city, lang = "en" }) {
  const outlook = city.investmentOutlook;
  if (!outlook) return null;
  const t = TEXT[lang] || TEXT.en;

  return (
    <CitySection eyebrow={t.eyebrow} title={t.title(city.name)}>
      <div className="border border-zinc-200 bg-white p-8 sm:p-10">
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-700">{outlook.intro}</p>
        {outlook.considerations && outlook.considerations.length > 0 && (
          <ul className="mt-6 space-y-4">
            {outlook.considerations.map((point) => (
              <li key={point} className="flex gap-3 text-base leading-relaxed text-zinc-600">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-400" />
                {point}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6 border-t border-zinc-200 pt-6 text-xs leading-relaxed text-zinc-400">{t.disclaimer}</p>
      </div>
    </CitySection>
  );
}
