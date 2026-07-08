import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const guides = [
  {
    title: "Cost of Living in Playa del Carmen",
    description:
      "Housing, groceries, utilities, healthcare, restaurants, transportation, and monthly lifestyle costs.",
    href: "/guides/cost-of-living-playa-del-carmen",
    category: "Living Costs",
  },
  {
    title: "Temporary Residency in Mexico Explained",
    description:
      "Financial requirements, consulates, documents, and the process of building a longer-term life in Mexico.",
    href: "/guides/temporary-residency-mexico",
    category: "Residency",
  },
  {
    title: "Healthcare in Mexico for Canadians",
    description:
      "Doctors, hospitals, specialists, insurance, prescriptions, dental care, and healthcare costs.",
    href: "/guides/healthcare-in-mexico-for-canadians",
    category: "Healthcare",
  },
  {
    title: "Best Areas To Live In Playa Del Carmen",
    description:
      "Centro, Playacar, Zazil-Ha, Colosio, walkability, atmosphere, and lifestyle differences.",
    href: "/guides/best-areas-to-live-in-playa-del-carmen",
    category: "Where To Live",
  },
  {
    title: "Renting vs Buying Property in Mexico",
    description:
      "Renting, buying, deposits, contracts, ownership questions, and how to think clearly before committing.",
    href: "/guides/renting-vs-buying-in-mexico",
    category: "Housing",
  },
  {
    title: "Bringing Pets to Mexico",
    description:
      "Travel documents, airline planning, vet care, rentals, and settling into Mexico with dogs or cats.",
    href: "/guides/bringing-pets-to-mexico",
    category: "Pets",
  },
  {
    title: "Banking in Mexico as a Foreigner",
    description:
      "Opening accounts, handling money, cards, transfers, fees, and financial setup as a foreigner.",
    href: "/guides/banking-in-mexico-as-a-foreigner",
    category: "Money",
  },
  {
    title: "Internet and Remote Work in Mexico",
    description:
      "Internet reliability, mobile data, coworking spaces, backup options, and working online from Mexico.",
    href: "/guides/internet-and-remote-work-in-mexico",
    category: "Remote Work",
  },
  {
    title: "Tulum vs Playa del Carmen",
    description:
      "A practical comparison of cost, lifestyle, transportation, community, infrastructure, and long-term living.",
    href: "/guides/tulum-vs-playa-del-carmen",
    category: "Location",
  },
  {
    title: "How Much Money Do You Need to Move to Mexico?",
    description:
      "Startup costs, monthly budgets, rent, deposits, emergency funds, healthcare, and planning your move.",
    href: "/guides/how-much-money-do-you-need-to-move-to-mexico",
    category: "Planning",
  },
  {
    title: "Safety in Mexico",
    description:
      "Neighborhoods, common-sense habits, transportation, scams, nightlife, and feeling grounded as a newcomer.",
    href: "/guides/safety-in-mexico",
    category: "Safety",
  },
  {
    title: "Grocery Costs in Mexico",
    description:
      "Supermarkets, local markets, imported foods, weekly budgets, and how daily food costs compare.",
    href: "/guides/grocery-costs-in-mexico",
    category: "Living Costs",
  },
  {
    title: "Moving to Playa del Carmen",
    description:
      "Neighborhoods, cost of living, rentals, residency, healthcare, lifestyle, and trusted local support.",
    href: "/guides/moving-to-playa-del-carmen",
    category: "Relocation",
  },
  {
    title: "Moving to Tulum",
    description:
      "Lifestyle, cost of living, transportation, rentals, wellness culture, and what to expect before settling.",
    href: "/guides/moving-to-tulum",
    category: "Relocation",
  },
  {
    title: "Moving to Riviera Maya",
    description:
      "Playa del Carmen, Tulum, Cancún, Puerto Morelos, healthcare, lifestyle differences, and local support.",
    href: "/guides/moving-to-riviera-maya",
    category: "Relocation",
  },
  {
    title: "Canada to Mexico Relocation",
    description:
      "Residency, healthcare, banking, taxes, lifestyle, and what Canadians should know before moving.",
    href: "/guides/canada-to-mexico-relocation",
    category: "Canada",
  },
  {
    title: "US to Mexico Relocation",
    description:
      "Healthcare, residency, taxes, banking, lifestyle, and building a new life abroad as an American.",
    href: "/guides/us-to-mexico-relocation",
    category: "United States",
  },
  {
    title: "Mexico Residency Support",
    description:
      "Temporary residency, permanent residency, financial requirements, and legally living in Mexico.",
    href: "/guides/mexico-residency-support",
    category: "Residency",
  },
  {
    title: "Retiring in Mexico",
    description:
      "Healthcare, costs, lifestyle, residency, and choosing the right location for retirement in Mexico.",
    href: "/guides/retiring-in-mexico",
    category: "Retirement",
  },
  {
    title: "Remote Workers Moving to Mexico",
    description:
      "Internet, lifestyle, coworking, visas, location choices, and daily life as a remote worker.",
    href: "/guides/remote-workers-moving-to-mexico",
    category: "Remote Work",
  },
  {
    title: "Mexico Relocation Checklist",
    description:
      "Documents, residency, housing, banking, healthcare, insurance, pets, transportation, and first-month setup.",
    href: "/guides/mexico-relocation-checklist",
    category: "Checklist",
  },
];

const content = {
  en: {
    nav: {
      home: "Home",
      guides: "Guides",
      contact: "Contact",
      toggle: "ES",
    },
    label: "Relocation Guides",
    title: "Practical clarity for building a life in Mexico.",
    intro:
      "Real-world guides for people exploring relocation, residency, healthcare, housing, cost of living, and the smaller details that make Mexico feel possible.",
    featuredLabel: "Start Here",
    featuredTitle: "Not sure where to begin?",
    featuredText:
      "Start with the relocation checklist, then use the guides below to go deeper into costs, residency, healthcare, housing, and daily life.",
    read: "Read Guide →",
    ctaTitle: "Want guidance for your specific situation?",
    ctaText:
      "The guides are a strong starting point. A Mexico Fit Call helps you apply the information to your real timeline, budget, lifestyle, and relocation questions.",
    ctaButton: "Book A Mexico Fit Call",
    footerLine: "A different rhythm of life.",
    footer: "Playa del Carmen • Tulum • Riviera Maya • Mexico",
  },
  es: {
    nav: {
      home: "Inicio",
      guides: "Guías",
      contact: "Contacto",
      toggle: "EN",
    },
    label: "Guías De Reubicación",
    title: "Claridad práctica para construir una vida en México.",
    intro:
      "Guías reales para personas que exploran reubicación, residencia, salud, vivienda, costo de vida y los detalles que hacen que México se sienta posible.",
    featuredLabel: "Empieza Aquí",
    featuredTitle: "¿No sabes por dónde comenzar?",
    featuredText:
      "Empieza con la checklist de reubicación y luego usa las guías para profundizar en costos, residencia, salud, vivienda y vida diaria.",
    read: "Leer Guía →",
    ctaTitle: "¿Quieres guía para tu situación específica?",
    ctaText:
      "Las guías son un buen primer paso. Una Mexico Fit Call te ayuda a aplicar la información a tu tiempo, presupuesto, estilo de vida y preguntas reales.",
    ctaButton: "Reservar Llamada",
    footerLine: "Un ritmo de vida diferente.",
    footer: "Playa del Carmen • Tulum • Riviera Maya • México",
  },
};

function GuidesPage() {
  const [lang, setLang] = useState("en");
  const t = content[lang];

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-zinc-200 bg-[#f6f1e8]/85 px-4 py-4 backdrop-blur-md md:px-10">
        <Link
          to="/"
          className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-950 sm:text-xs"
        >
          Path To Mexico
        </Link>

        <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
          <Link to="/" className="transition hover:text-zinc-950">
            {t.nav.home}
          </Link>

          <Link to="/guides" className="transition hover:text-zinc-950">
            {t.nav.guides}
          </Link>

          <a href="/#contact" className="transition hover:text-zinc-950">
            {t.nav.contact}
          </a>

          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="border border-zinc-300 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700 transition hover:bg-zinc-950 hover:text-white"
          >
            {t.nav.toggle}
          </button>
        </div>
      </nav>

      <section className="px-6 pb-20 pt-36 md:px-20 md:pb-28 md:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-6xl"
        >
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">
            {t.label}
          </p>

          <h1 className="max-w-5xl text-5xl font-light leading-tight tracking-[-0.06em] md:text-8xl">
            {t.title}
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-600 sm:text-xl">
            {t.intro}
          </p>

          <div className="mt-14 grid gap-8 border-y border-zinc-300 py-10 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.35em] text-zinc-500">
                {t.featuredLabel}
              </p>

              <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
                {t.featuredTitle}
              </h2>
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-7 text-lg leading-relaxed text-zinc-600">
                {t.featuredText}
              </p>

              <Link
                to="/guides/mexico-relocation-checklist"
                className="w-fit border border-zinc-950 px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white"
              >
                {t.read}
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-px bg-zinc-300 md:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.title}
                to={guide.href}
                className="flex min-h-[340px] flex-col justify-between bg-[#f6f1e8] p-7 transition hover:bg-white"
              >
                <div>
                  <p className="mb-8 text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    {guide.category}
                  </p>

                  <h2 className="mb-6 text-3xl font-light leading-tight tracking-[-0.04em]">
                    {guide.title}
                  </h2>

                  <p className="leading-relaxed text-zinc-600">
                    {guide.description}
                  </p>
                </div>

                <p className="mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-950">
                  {t.read}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-[#0b0b0a] px-6 py-24 text-center text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            Path To Mexico
          </p>

          <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            {t.ctaTitle}
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65">
            {t.ctaText}
          </p>

          <Link
            to="/mexico-fit-call"
            className="mt-10 inline-block bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f]"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-zinc-950 px-8 py-14 text-center text-sm text-zinc-500">
        <p className="text-xs uppercase tracking-[0.38em] text-zinc-200">
          PATH TO MEXICO
        </p>
        <p className="mt-6 italic text-zinc-400">{t.footerLine}</p>
        <p className="mt-6 text-zinc-600">{t.footer}</p>
      </footer>
    </main>
  );
}

export default GuidesPage;