import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
      "Real-world guides for people exploring relocation, lifestyle, residency, healthcare, housing, and the quieter details that make Mexico feel possible.",
    read: "Read Guide →",
    comingSoon: "Coming Soon",
    footerLine: "A different rhythm of life.",
    footer: "Playa del Carmen • Riviera Maya • Mexico",
    guides: [
      {
        title: "Cost of Living in Playa del Carmen",
        description:
          "A realistic 2026 guide to housing, groceries, utilities, healthcare, restaurants, transportation, and monthly lifestyle costs in Playa del Carmen.",
        href: "/guides/cost-of-living-playa-del-carmen",
        label: "2026 Guide",
      },
      {
        title: "Temporary Residency in Mexico Explained",
        description:
          "A practical guide to temporary residency in Mexico, including financial requirements, consulates, documents, and building a long-term life here.",
        href: "/guides/temporary-residency-mexico",
        label: "2026 Guide",
      },
      {
        title: "Healthcare in Mexico for Canadians",
        description:
          "A practical guide to doctors, specialists, hospitals, insurance, prescriptions, dental care, and healthcare costs in Mexico.",
        href: "/guides/healthcare-in-mexico-for-canadians",
        label: "2026 Guide",
      },
    
      {
        title: "Best Areas To Live In Playa Del Carmen",
        description:
          "Explore the neighborhoods, atmosphere, walkability, and lifestyle differences between Centro, Playacar, Zazil-Ha, Colosio, and more.",
        href: "/guides/best-areas-to-live-in-playa-del-carmen",
        label: "2026 Guide",
      },
      {
        title: "Renting vs Buying Property in Mexico",
        description:
          "A practical guide to renting, buying, deposits, contracts, neighborhoods, ownership questions, and how to think clearly before committing to property in Mexico.",
        href: "/guides/renting-vs-buying-in-mexico",
        label: "2026 Guide",
      },
      {
        title: "Bringing Pets to Mexico",
        description:
          "A practical guide to bringing dogs and cats to Mexico, including travel documents, airline planning, vet care, rentals, and settling in with pets.",
        href: "/guides/bringing-pets-to-mexico",
        label: "2026 Guide",
      },
      {
        title: "Banking in Mexico as a Foreigner",
        description:
          "A practical guide to opening bank accounts, handling money, using cards, transfers, fees, and financial setup as a foreigner living in Mexico.",
        href: "/guides/banking-in-mexico-as-a-foreigner",
        label: "2026 Guide",
      },
      {
        title: "Internet and Remote Work in Mexico",
        description:
          "A practical guide to internet reliability, mobile data, coworking spaces, backup options, remote work lifestyle, and working online from Mexico.",
        href: "/guides/internet-and-remote-work-in-mexico",
        label: "2026 Guide",
      },
      {
        title: "Tulum vs Playa del Carmen",
        description:
          "A practical comparison of Tulum and Playa del Carmen, including cost, lifestyle, transportation, community, infrastructure, beaches, and long-term living.",
        href: "/guides/tulum-vs-playa-del-carmen",
        label: "2026 Guide",
      },
      {
        title: "How Much Money Do You Need to Move to Mexico?",
        description:
          "A practical guide to startup costs, monthly budgets, rent, deposits, emergency funds, healthcare, transportation, and planning your move to Mexico.",
        href: "/guides/how-much-money-do-you-need-to-move-to-mexico",
        label: "2026 Guide",
      },
      {
        title: "Safety in Mexico",
        description:
          "A practical guide to safety in Mexico, including neighborhoods, common-sense habits, transportation, scams, nightlife, and how to feel grounded as a newcomer.",
        href: "/guides/safety-in-mexico",
        label: "2026 Guide",
      },
      {
        title: "Grocery Costs in Mexico",
        description:
          "A practical guide to grocery shopping in Mexico, including supermarkets, local markets, imported foods, weekly budgets, and how daily food costs compare.",
        href: "/guides/grocery-costs-in-mexico",
        label: "2026 Guide",
      },
    ],
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
      "Guías reales para personas que están explorando reubicación, estilo de vida, residencia, salud, vivienda y los detalles más silenciosos que hacen que México se sienta posible.",
    read: "Leer Guía →",
    comingSoon: "Próximamente",
    footerLine: "Un ritmo de vida diferente.",
    footer: "Playa del Carmen • Riviera Maya • México",
    guides: [
      {
        title: "Costo De Vida En Playa Del Carmen",
        description:
          "Una guía realista 2026 sobre vivienda, despensa, servicios, salud, restaurantes, transporte y costos mensuales en Playa del Carmen.",
        href: "/guides/cost-of-living-playa-del-carmen",
        label: "Guía 2026",
      },
      {
        title: "Residencia Temporal En México Explicada",
        description:
          "Una guía práctica sobre residencia temporal en México, requisitos financieros, consulados, documentos y cómo construir una vida a largo plazo aquí.",
        href: "/guides/temporary-residency-mexico",
        label: "Guía 2026",
      },
      {
        title: "Salud En México Para Canadienses",
        description:
          "Una guía práctica sobre doctores, especialistas, hospitales, seguros, recetas, cuidado dental y costos médicos en México.",
        href: "/guides/healthcare-in-mexico-for-canadians",
        label: "Guía 2026",
      },
    
      {
        title: "Las Mejores Zonas Para Vivir En Playa Del Carmen",
        description:
          "Descubre las diferencias entre Centro, Playacar, Zazil-Ha, Colosio y otras zonas populares de Playa del Carmen.",
        href: "/guides/best-areas-to-live-in-playa-del-carmen",
        label: "Guía 2026",
      },
      {
        title: "Renting vs Buying Property in Mexico",
        description:
          "A practical guide to renting, buying, deposits, contracts, neighborhoods, ownership questions, and how to think clearly before committing to property in Mexico.",
        href: "/guides/renting-vs-buying-in-mexico",
        label: "2026 Guide",
      },
      {
        title: "Bringing Pets to Mexico",
        description:
          "A practical guide to bringing dogs and cats to Mexico, including travel documents, airline planning, vet care, rentals, and settling in with pets.",
        href: "/guides/bringing-pets-to-mexico",
        label: "2026 Guide",
      },
      {
        title: "Banking in Mexico as a Foreigner",
        description:
          "A practical guide to opening bank accounts, handling money, using cards, transfers, fees, and financial setup as a foreigner living in Mexico.",
        href: "/guides/banking-in-mexico-as-a-foreigner",
        label: "2026 Guide",
      },
      {
        title: "Internet and Remote Work in Mexico",
        description:
          "A practical guide to internet reliability, mobile data, coworking spaces, backup options, remote work lifestyle, and working online from Mexico.",
        href: "/guides/internet-and-remote-work-in-mexico",
        label: "2026 Guide",
      },
      {
        title: "Tulum vs Playa del Carmen",
        description:
          "A practical comparison of Tulum and Playa del Carmen, including cost, lifestyle, transportation, community, infrastructure, beaches, and long-term living.",
        href: "/guides/tulum-vs-playa-del-carmen",
        label: "2026 Guide",
      },
      {
        title: "How Much Money Do You Need to Move to Mexico?",
        description:
          "A practical guide to startup costs, monthly budgets, rent, deposits, emergency funds, healthcare, transportation, and planning your move to Mexico.",
        href: "/guides/how-much-money-do-you-need-to-move-to-mexico",
        label: "2026 Guide",
      },
      {
        title: "Safety in Mexico",
        description:
          "A practical guide to safety in Mexico, including neighborhoods, common-sense habits, transportation, scams, nightlife, and how to feel grounded as a newcomer.",
        href: "/guides/safety-in-mexico",
        label: "2026 Guide",
      },
      {
        title: "Grocery Costs in Mexico",
        description:
          "A practical guide to grocery shopping in Mexico, including supermarkets, local markets, imported foods, weekly budgets, and how daily food costs compare.",
        href: "/guides/grocery-costs-in-mexico",
        label: "2026 Guide",
      },
    ],
  },
};

function GuidesPage() {
  const [lang, setLang] = useState("en");
  const t = content[lang];

  return (
    <main className="min-h-screen bg-[#080807] text-white">
      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/50 px-4 py-4 backdrop-blur-md md:px-10">
        <Link
          to="/"
          className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/80"
        >
          Path To Mexico
        </Link>

        <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.25em] text-white/50">
          <Link to="/" className="transition hover:text-white">
            {t.nav.home}
          </Link>

          <Link to="/guides" className="transition hover:text-white">
            {t.nav.guides}
          </Link>

          <a href="/#contact" className="transition hover:text-white">
            {t.nav.contact}
          </a>

          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="border border-white/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:bg-white hover:text-black"
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
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            {t.label}
          </p>

          <h1 className="max-w-5xl text-5xl font-light leading-tight tracking-[-0.06em] md:text-8xl">
            {t.title}
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/60 sm:text-xl">
            {t.intro}
          </p>

          <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-3">
            {t.guides.map((guide) => (
              <Link
                key={guide.title}
                to={guide.href}
                className="flex min-h-[360px] flex-col justify-between bg-[#080807] p-7 transition hover:bg-white hover:text-black"
              >
                <div>
                  <p className="mb-8 text-[10px] uppercase tracking-[0.28em] opacity-45">
                    {guide.label}
                  </p>

                  <h2 className="mb-6 text-3xl font-light leading-tight tracking-[-0.04em]">
                    {guide.title}
                  </h2>

                  <p className="leading-relaxed opacity-60">
                    {guide.description}
                  </p>
                </div>

                <p className="mt-10 text-xs font-semibold uppercase tracking-[0.25em]">
                  {guide.href === "#" ? t.comingSoon : t.read}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 bg-zinc-950 px-8 py-14 text-center text-sm text-zinc-500">
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