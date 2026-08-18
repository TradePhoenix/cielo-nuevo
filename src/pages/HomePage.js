import { useState, useEffect, useRef } from "react";
import { getStoredLanguage, setStoredLanguage, useHtmlLang } from "../utils/language";
import { ENDORSEMENT, CLIENT_TESTIMONIAL } from "../data/trustContent";
import { CALENDLY_EVENTS } from "../config/booking";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import SEO from "../components/SEO";
import CinematicReveal from "../components/CinematicReveal";
import FAQAccordion from "../components/FAQAccordion";
import { useCinematicMotion, POINTER_DEPTH } from "../components/cinematicMotion";

const heroFadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};

const content = {
  en: {
    nav: ["Blueprint", "Destinations", "Weddings", "Services", "Guides", "Impact", "About", "Contact"],
    seoTitle: "Path To Mexico | A Different Rhythm Of Life",
    seoDescription: "Relocation guidance, trusted local connections, and lifestyle support for people considering a new life in Mexico.",
    skipToContent: "Skip to content",
    heroAlt: "Riviera Maya relocation lifestyle",
    menuLabel: "Menu",
    closeLabel: "Close",
    openMenuAria: "Open menu",
    closeMenuAria: "Close menu",
    mobileNavAria: "Mobile navigation",
    startHereBadge: "Start Here",
    blueprintEyebrow: "My Mexico Blueprint",
    blueprintTitle: "See what your move to Mexico could actually look like.",
    blueprintText: "Answer 6 quick questions and get your personalized city matches, readiness score, and 30/60/90-day roadmap.",
    blueprintCta: "Build My Mexico Blueprint",
    blueprintFreeNote: "Free · Takes About 2 Minutes",
    blueprintHighlights: ["City matches built around you", "A clear readiness score", "Your first 90 days mapped"],

    impactEyebrow: "The Fifth Pillar",
    impactTitle: "Moving to Mexico is more than changing your address.",
    impactText: "It's becoming part of a community. Impact is our permanent commitment to helping every client arrive as a neighbor — respecting Mexican culture, supporting local businesses, and leaving a positive mark on the place they now call home.",
    impactCta: "See What Impact Means",
    impactNote: "Our Commitment To Responsible Relocation",
    impactCardLabel: "Impact",
    impactCardHighlights: ["Respect Mexican culture", "Support local businesses", "Protect the natural environment"],
    impactCardFooter: "Belong. Don't just arrive.",

    weddingsEyebrow: "Weddings In Mexico",
    weddingsTitle: "A ceremony that belongs to the place.",
    weddingsText: "Maya-inspired weddings, sacred unions, elopements, and multi-day celebrations across the Yucatán — created with local practitioners and Path To Mexico coordination.",
    weddingsCta: "Discover Maya Weddings",
    weddingsImageAlt: "The Caribbean coastline of the Riviera Maya at golden hour",
    founderPhotoAlt: "Kalen Enns, founder of Path To Mexico",
    whatsappCta: "Prefer WhatsApp? Message Directly",
    disclaimerLabel: "Important Note",
    disclaimerText:
      "Path To Mexico provides relocation guidance, local insight, and trusted introductions. We are not a law firm, immigration agency, tax advisor, financial advisor, or real estate brokerage. Legal, immigration, tax, financial, and real estate services are provided by independent qualified professionals where appropriate.",
    footerTagline2: "Not everyone is meant to stay where they started.",
    heroLocation: "Relocation, residency & real life in Mexico",
    heroSignal: "25 destinations • Yucatán Peninsula",
    heroTitle: "Your life.",
    heroTitleAccent: "A different rhythm.",
    heroSubtext:
      "We make the move feel possible — and the life feel yours. Clear planning, trusted local connections, and support shaped around how you actually want to live.",
    start: "Find Your Mexico",
    explore: "Plan The Move",

    servicesLabel: "Relocation Support",
    servicesTitle: "What Path To Mexico actually helps you with.",
    servicesText:
      "Personalized relocation planning, city and area guidance, housing and residency support, and introductions to trusted local professionals — all built around your own goals, budget, timeline, and lifestyle.",
    services: [
      ["Relocation Support", "Personalized planning built around your goals, budget, timeline, and lifestyle — not a generic checklist."],
      ["Residency Direction", "Education on the general residency process, plus introductions to qualified professionals where required."],
      ["Housing Connections", "Help understanding neighborhoods and rentals, with introductions to local real estate contacts where available."],
      ["Lifestyle Planning", "Clear insight into cost of living, healthcare, banking, transportation, pets, and daily life."],
      ["Trusted Local Network", "Coordination and introductions to local professionals — legal, accounting, insurance, healthcare, and more — where we have a genuine connection to offer."],
      ["Guided Landing", "Practical preparation, arrival planning, and settling-in support — before, during, and after your move."]
    ],
    employmentClarifier:
      "Path To Mexico is not a recruitment or job-placement agency. We provide relocation planning for remote workers, entrepreneurs, retirees, and others building a life in Mexico — but we cannot promise employment or work authorization.",
    servicesCta: "See your next step — Build Your Mexico Blueprint",

    workLabel: "Work With Path to Mexico",
    workTitle1: "Moving countries is a big decision.",
    workTitle2: "You do not have to figure it out alone.",
    workText:
      "Whether you are just exploring the possibility or preparing to make the move, Path To Mexico provides clear guidance, trusted introductions, and real-world insight from someone already living the path.",
    workOffers: [
      [
        "Mexico Fit Call",
        "$99 USD",
        "A private one-on-one conversation designed to answer your questions, provide honest insight, and help you understand what moving to Mexico could realistically look like for you.",
        "Perfect for people still exploring costs, residency options, neighborhoods, lifestyle questions, and next steps.",
        "Book A Mexico Fit Call",
        CALENDLY_EVENTS.en
      ],
      [
        "Relocation Roadmap",
        "$499 USD",
        "A personalized relocation plan built around your goals, timeline, budget, lifestyle preferences, and long-term vision for life in Mexico.",
        "Ideal for individuals, couples, families, retirees, entrepreneurs, and remote workers who want a clear roadmap before making major decisions.",
        "Explore The Roadmap",
        "/relocation-roadmap"
      ],
      [
        "Guided Landing",
        "Custom Quote",
        "Private concierge-style relocation support for people who want hands-on guidance, trusted introductions, and ongoing assistance throughout the process.",
        "Best for families, professionals, investors, business owners, and anyone seeking a highly personalized relocation experience.",
        "Explore Guided Landing",
        "/guided-landing"
      ]
    ],
    bestFor: "Best For",

    guideLabel: "Free Relocation Guide",
    guideTitle: "10 things to know before moving to Playa del Carmen.",
    guideText:
      "Get a simple starter guide covering cost of living, residency questions, renting, healthcare, banking, neighborhoods, and common mistakes people make before moving.",
    guideCta: "Request The Free Guide",

    processLabel: "How It Works",
    processTitle: "From first conversation to feeling more prepared.",
    process: [
      ["01", "Talk", "We start with your goals, budget, timeline, and what kind of life you want in Mexico."],
      ["02", "Plan", "We map your best relocation path, including neighborhoods, rentals, residency questions, and priorities."],
      ["03", "Connect", "We point you toward trusted local professionals, agents, and service providers when needed."],
      ["04", "Settle", "You move forward with more clarity, fewer surprises, and people already on the ground."]
    ],

    endorsementLabel: "Client Stories & Endorsements",
    endorsementTitle: "What people say about working with Kalen.",
    clientStoryCardLabel: "Client Story",
    endorsementCardLabel: "Professional Endorsement",
    starsAria: "Rated 5 out of 5 stars",

    founderLabel: "Founder Story",
    founderTitle: "Built from lived experience, not theory.",
    founderIntro:
      "Path To Mexico was created by Kalen Enns after leaving Canada and rebuilding life in Mexico.",
    founderParagraphs: [
      "I never planned on building a relocation business. I simply made a decision that changed my own life.",
      "After spending most of my life in Canada, I reached a point where I wanted something different: more freedom, more sunshine, more connection, and more time actually living.",
      "So I packed up what I could, left British Columbia behind, and moved to Mexico.",
      "It was not as simple or glamorous as social media makes it look. There were questions about residency, banking, healthcare, housing, paperwork, and figuring out who could actually be trusted.",
      "Some things were easier than I expected. Others were much harder. But somewhere along the way, life started to feel different.",
      "Mexico did not solve everything. No place can do that. But it gave me perspective and reminded me there is not only one way to live.",
      "That is what eventually led to Path To Mexico: not a corporate relocation company, but a trusted guide built from real experience.",
      "Most relocation information online is scattered, impersonal, and disconnected from what it actually feels like to leave a country you have always known. Path To Mexico exists to close that gap — to help people make informed decisions, reduce uncertainty, and build their next chapter with more clarity than I had.",
      "Path To Mexico is not a law firm, immigration agency, tax advisor, doctor, or real estate brokerage. What I can offer is honest guidance, real experience, and connections to trusted professionals when you need them."
    ],
    founderQuote:
      "Some people come to Mexico for a vacation. Others come here looking for a life that feels more like their own.",
    founderImpactParagraph:
      "That belief shapes how Path To Mexico works. This isn't only about helping you leave well — it's about helping you arrive well: as a neighbor, not just a newcomer. Responsible relocation means learning the language, respecting local ways of life, and becoming part of the community you're joining, not apart from it.",
    founderImpactQuote:
      "We don't just help people relocate. We help them become thoughtful members of the communities they join.",
    founderSignature: "— Kalen Enns",
    founderRole: "Founder, Path To Mexico",

    networkLabel: "Trusted Local Network",
    networkTitle: "Trusted people matter.",
    networkText:
      "Path To Mexico connects clients with selected professionals and local resources to create a smoother transition and a more confident landing.",
    network: [
      "Realtors",
      "Residency Facilitators",
      "Lawyers",
      "Insurance Brokers",
      "Doctors",
      "Property Managers",
      "Contractors",
      "Accountants",
      "Movers"
    ],

    trustLabel: "Trust & Clarity",
    trustTitle: "Clearer options, better introductions, and fewer expensive mistakes.",
    trustPoints: [
      "Canadian founder living in Mexico",
      "Riviera Maya local knowledge",
      "Trusted professional network",
      "Personal one-on-one support"
    ],

    whoTitle: "Built for people ready for a different life.",
    whoText:
      "Whether you are coming from Canada, the United States, or somewhere else, Path To Mexico helps you understand your options and connect with the right people on the ground.",
    tags: ["Canadians", "Americans", "Remote Professionals", "Retirees", "Investors", "Families", "Remote Workers", "Entrepreneurs"],

    faqLabel: "Common Questions",
    faqTitle: "Questions worth answering before you move.",
    faqs: [
      ["What does Path To Mexico actually help with?", "We help you get from “thinking about Mexico” to a clear, confident plan — matching you to the right region or city, mapping out a realistic 30/60/90-day path, and connecting you with the trusted local professionals (legal, real estate, insurance, and more) you'll actually need along the way. We don't sell real estate, process legal paperwork, or replace licensed advisors ourselves — we coordinate and guide."],
      ["How does the relocation process begin?", "Most people start with a Mexico Fit Call ($99 USD, one private conversation about your timeline, goals, and questions) or our free My Mexico Blueprint questionnaire, which can help narrow down where in Mexico might genuinely fit your life. Either way, we build out next steps from what we learn."],
      ["Can you help me determine where in Mexico I should live?", "Yes — that's exactly what My Mexico Blueprint is built for. It asks about your priorities (pace of life, budget, climate, community, and more) and matches you against real destinations across the Yucatán Peninsula, with an honest look at trade-offs, not just highlights."],
      ["Should I rent before buying?", "In most cases, yes. Renting for a season or a year gives you a real feel for a place before committing — weather patterns, commute, noise, community — in a way research alone can't. We generally encourage this, though your own timeline and goals may point elsewhere."],
      ["Can foreigners legally buy property in Mexico?", "Yes, foreigners can own property in Mexico, including within the restricted coastal and border zones, through a bank trust (fideicomiso) or a Mexican corporation, depending on the situation. The exact structure and requirements depend on your circumstances and the property itself, so we connect you with a qualified real estate attorney or notario to confirm what applies to you — we don't handle the transaction ourselves."],
      ["Can you help with temporary or permanent residency?", "Yes. We can help you understand the general path — temporary versus permanent residency, income and financial requirements, and what to expect — and connect you with qualified immigration professionals to handle your actual application. Requirements and eligibility can change and vary by consulate, so we always point you to current, qualified guidance rather than guessing."],
      ["How long does the residency process usually take?", "It varies — by consulate, by residency type, and by your own paperwork readiness. Some people move through it in a few months; others take longer, especially if documents need translation, apostille, or additional review. We help you plan around realistic timelines rather than promise a fixed number."],
      ["How much money should I budget for relocating?", "It depends heavily on where you land and how you live — a quiet interior town and a Caribbean coast city can have very different costs. Beyond day-to-day living, plan for moving costs, initial housing deposits, residency fees, and a comfortable buffer for the unexpected. We can walk through realistic ranges for your specific destinations once we know more about your situation."],
      ["Can you help me open a bank account or obtain insurance?", "Yes — we can point you toward trusted local banks and insurance providers and explain generally what to expect (documentation, residency status requirements, and typical timelines). Actual account opening and policy underwriting are handled directly by those institutions, since requirements and offerings change and vary by provider."],
      ["Do I need to speak Spanish?", "Not to get started, and plenty of people build a good life in Mexico with limited Spanish, especially in more international areas. That said, learning even conversational Spanish tends to noticeably deepen the experience and day-to-day ease — we generally encourage it as an ongoing goal, not a prerequisite."],
      ["Is Mexico safe for foreigners?", "Safety varies significantly by region and city, much like anywhere in the world, and conditions can change over time. Many of the areas we focus on have strong track records with foreign residents. We share what we honestly know about each destination, including trade-offs, and always recommend checking current government travel advisories for your own country as part of your research."],
      ["Can you help with healthcare and private insurance?", "Yes. We can explain the general landscape — public healthcare (IMSS), private hospitals, and private insurance options — and connect you with providers and brokers to review your specific situation. Coverage, cost, and eligibility depend on your age, health, and residency status, so we leave the specifics to licensed providers."],
      ["Can I bring my pets to Mexico?", "Generally, yes — Mexico's import requirements for pets are more straightforward than many countries, typically a health certificate and up-to-date vaccinations. Requirements can shift, so we recommend confirming current rules with a vet and your airline shortly before travel, and we're happy to point you to that current guidance."],
      ["Do you support families, remote workers, retirees, and entrepreneurs?", "Yes, and beyond that — we work with people from many countries and life stages, not just retirees or one nationality. Whatever brings you to Mexico, our job is to understand your specific situation and point you toward what actually fits it."],
      ["What happens after I arrive?", "That depends on what you've already set up before landing, but we stay involved — helping with local orientation, connecting you to community, and following up on the practical threads (banking, residency, housing) that are often still in motion after the move itself."],
      ["How much do your services cost?", "It depends on the level of support you need, from a single $99 USD Mexico Fit Call to a fully guided relocation. We'll walk through pricing clearly during that first call, with no obligation to continue — or start with our free My Mexico Blueprint questionnaire if you're not ready to book a call yet."],
      ["Can I start planning my move before I have residency sorted out?", "Yes — most people do. Exploring destinations, understanding budgets, and building a rough timeline don't require residency in hand. My Mexico Blueprint and a Mexico Fit Call are both built for exactly this stage, so residency becomes one part of a plan you're already building rather than the first hurdle you have to clear."],
      ["Can I buy, register, and insure a car in Mexico?", "Yes. Foreigners can buy a vehicle in Mexico with valid residency status (rules vary for tourist-visa visitors bringing a foreign-plated car temporarily). Registration and insurance work differently than in many home countries — insurance in particular is essential and not always mandatory by law depending on the state, which makes it easy to skip by mistake. We can point you toward what to expect and trusted local contacts; the actual purchase, registration, and policy are handled directly with dealers, government offices, and insurers."],
      ["Do I have to pay taxes in Mexico, and will I be taxed twice?", "It depends on your residency status, income sources, and your home country's own tax rules and any tax treaty with Mexico — this is genuinely one of the areas where a qualified cross-border tax professional matters most, not general guidance. We can explain the general landscape (tax residency and immigration residency are not the same thing) and connect you with a qualified accountant familiar with your specific situation, but we don't provide tax advice ourselves."],
      ["What's the best way to transfer money to Mexico or move funds between accounts?", "Most people use a mix of international wire transfers, transfer services designed for cross-border payments, and eventually a Mexican bank account once residency is in place. Fees, exchange rates, and transfer limits vary a lot between banks and services, so it's worth comparing before committing to one for anything ongoing. We can point you toward what's worked for others and trusted local contacts; the transfers themselves go through your own bank or provider."],
      ["Can I bring my furniture and personal belongings when I move?", "Yes — many people bring a container or partial shipment of household goods, while others sell most things and start fresh, furnishing locally instead. A household goods import (menaje de casa) has its own paperwork and, done correctly, can mean reduced or no import duties on personal items — but the rules are specific about timing and documentation. We can point you toward what to expect and trusted moving and customs contacts; the shipment and customs process itself is handled by licensed movers and brokers."],
      ["Is the internet reliable enough to work remotely from Mexico?", "In most of the destinations we cover, yes — fiber and reliable mobile data are common, especially in more established towns, and coworking spaces are increasingly available. Reliability varies more in smaller, more remote destinations, where a backup connection (a second provider or a mobile hotspot) is a genuinely good idea rather than overkill. We're happy to point you toward what to expect in your specific destination."],
      ["Does Path To Mexico support responsible relocation into local communities?", "Yes — it's central to how we work. We encourage learning the language, understanding local customs, and engaging with your new community rather than staying separate from it. A good relocation isn't just about your own comfort; it's about becoming a respectful, contributing part of the place you now call home.", { to: "/impact", label: "See our Impact commitment →" }]
    ],

    contactLabel: "Start Here",
    contactTitle: "Start Your Path To Mexico",
    contactText:
      "Send a few details about your timeline, goals, and questions. We’ll help you understand the clearest next step toward relocation, residency, lifestyle, real estate, or trusted local support in Mexico.",
    formSuccess: "Thanks — your inquiry was sent. We’ll be in touch soon.",
    formSuccessTitle: "Message Sent",
    formNamePlaceholder: "Full Name",
    formEmailPlaceholder: "Email Address",
    formCountryPlaceholder: "Current Country",
    formTimelinePlaceholder: "Ideal Timeline",
    formMessagePlaceholder: "What do you need help with?",
    formSubmitting: "Sending...",
    formSubmit: "Send Relocation Inquiry",
    formError:
      "Something went wrong sending your inquiry. Your details are still here — please try again.",
    footerLine: "A different rhythm of life.",
    footer: "25 Destinations Across The Yucatán Peninsula"
  },

  es: {
    nav: ["Blueprint", "Destinos", "Bodas", "Servicios", "Guías", "Impacto", "Nosotros", "Contacto"],
    seoTitle: "Path To Mexico | Un Ritmo De Vida Diferente",
    seoDescription: "Guía de reubicación, conexiones locales de confianza y apoyo de estilo de vida para quienes consideran una nueva vida en México.",
    skipToContent: "Saltar al contenido",
    heroAlt: "Estilo de vida de reubicación en la Riviera Maya",
    menuLabel: "Menú",
    closeLabel: "Cerrar",
    openMenuAria: "Abrir menú",
    closeMenuAria: "Cerrar menú",
    mobileNavAria: "Navegación móvil",
    startHereBadge: "Empieza Aquí",
    blueprintEyebrow: "My Mexico Blueprint",
    blueprintTitle: "Descubre cómo podría verse realmente tu mudanza a México.",
    blueprintText: "Responde 6 preguntas rápidas y obtén tus coincidencias personalizadas de ciudad, tu puntaje de preparación y una hoja de ruta de 30/60/90 días.",
    blueprintCta: "Construir Mi Mexico Blueprint",
    blueprintFreeNote: "Gratis · Toma Alrededor De 2 Minutos",
    blueprintHighlights: ["Ciudades que encajan contigo", "Un puntaje claro de preparación", "Tus primeros 90 días trazados"],

    impactEyebrow: "El Quinto Pilar",
    impactTitle: "Mudarte a México es más que cambiar de dirección.",
    impactText: "Es convertirte en parte de una comunidad. Impacto es nuestro compromiso permanente de ayudar a cada cliente a llegar como vecino — respetando la cultura mexicana, apoyando negocios locales y dejando una huella positiva en el lugar que ahora llama hogar.",
    impactCta: "Descubre Qué Significa Impacto",
    impactNote: "Nuestro Compromiso Con La Reubicación Responsable",
    impactCardLabel: "Impacto",
    impactCardHighlights: ["Respetar la cultura mexicana", "Apoyar negocios locales", "Proteger el entorno natural"],
    impactCardFooter: "Pertenece. No solo llegues.",

    weddingsEyebrow: "Bodas En México",
    weddingsTitle: "Una ceremonia que pertenece al lugar.",
    weddingsText: "Bodas de inspiración maya, uniones sagradas, fugas románticas y celebraciones de varios días en Yucatán — creadas con practicantes locales y la coordinación de Path To Mexico.",
    weddingsCta: "Descubre Bodas Mayas",
    weddingsImageAlt: "La costa caribeña de la Riviera Maya en la hora dorada",
    founderPhotoAlt: "Kalen Enns, fundador de Path To Mexico",
    whatsappCta: "¿Prefieres WhatsApp? Escríbenos Directamente",
    disclaimerLabel: "Nota Importante",
    disclaimerText:
      "Path To Mexico ofrece orientación de reubicación, conocimiento local e introducciones de confianza. No somos un despacho legal, una agencia de inmigración, un asesor fiscal, un asesor financiero ni una correduría inmobiliaria. Los servicios legales, de inmigración, fiscales, financieros e inmobiliarios los brindan profesionales calificados e independientes cuando corresponde.",
    footerTagline2: "No todos están destinados a quedarse donde empezaron.",
    heroLocation: "Reubicación, residencia y vida real en México",
    heroSignal: "25 destinos • Península de Yucatán",
    heroTitle: "Tu vida.",
    heroTitleAccent: "Un ritmo diferente.",
    heroSubtext:
      "Hacemos que la mudanza se sienta posible — y que la vida se sienta tuya. Planeación clara, conexiones locales confiables y apoyo diseñado alrededor de cómo realmente quieres vivir.",
    start: "Encuentra Tu México",
    explore: "Planea La Mudanza",

    servicesLabel: "Apoyo De Reubicación",
    servicesTitle: "En qué te ayuda realmente Path To Mexico.",
    servicesText:
      "Planeación personalizada de tu mudanza, orientación sobre ciudad y zona, apoyo con vivienda y residencia, y conexiones con profesionales locales de confianza — todo basado en tus propias metas, presupuesto, tiempos y estilo de vida.",
    services: [
      ["Apoyo De Reubicación", "Planeación personalizada basada en tus metas, presupuesto, tiempos y estilo de vida — no una lista genérica."],
      ["Orientación De Residencia", "Educación sobre el proceso general de residencia, más conexiones con profesionales calificados cuando sea necesario."],
      ["Conexiones De Vivienda", "Apoyo para entender colonias y rentas, con conexiones a contactos inmobiliarios locales cuando estén disponibles."],
      ["Planeación De Estilo De Vida", "Claridad sobre costo de vida, salud, bancos, transporte, mascotas y vida diaria."],
      ["Red Local Confiable", "Coordinación y conexiones con profesionales locales — legal, contable, seguros, salud y más — donde tengamos una conexión genuina que ofrecer."],
      ["Llegada Guiada", "Preparación práctica, planeación de llegada y apoyo para instalarte — antes, durante y después de tu mudanza."]
    ],
    employmentClarifier:
      "Path To Mexico no es una agencia de reclutamiento ni de colocación laboral. Ofrecemos planeación de reubicación para trabajadores remotos, emprendedores, jubilados y quienes construyen una vida en México — pero no podemos garantizar empleo ni autorización de trabajo.",
    servicesCta: "Descubre tu próximo paso — Construye Tu Mexico Blueprint",

    workLabel: "Trabaja Con Path to Mexico",
    workTitle1: "Mudarse de país es una gran decisión.",
    workTitle2: "No tienes que resolverlo todo solo.",
    workText:
      "Ya sea que estés explorando la posibilidad o preparándote para mudarte, Path To Mexico ofrece guía clara, conexiones confiables y perspectiva real de alguien que ya vive el camino.",
    workOffers: [
      [
        "Llamada México Fit",
        "$99 USD",
        "Una conversación privada uno a uno para responder tus preguntas, darte perspectiva honesta y ayudarte a entender cómo podría verse una mudanza a México para ti.",
        "Perfecto para personas que están explorando costos, opciones de residencia, zonas, estilo de vida y próximos pasos.",
        "Reservar Llamada",
        CALENDLY_EVENTS.es
      ],
      [
        "Roadmap De Reubicación",
        "$499 USD",
        "Un plan personalizado construido alrededor de tus metas, tiempos, presupuesto, preferencias de vida y visión a largo plazo en México.",
        "Ideal para individuos, parejas, familias, jubilados, emprendedores y trabajadores remotos que quieren un plan claro.",
        "Explorar El Roadmap",
        "/relocation-roadmap"
      ],
      [
        "Llegada Guiada",
        "Cotización Personalizada",
        "Apoyo privado estilo concierge para quienes quieren guía práctica, conexiones confiables y acompañamiento durante el proceso.",
        "Ideal para familias, profesionales, inversionistas, dueños de negocios y personas que buscan una experiencia personalizada.",
        "Explorar Llegada Guiada",
        "/guided-landing"
      ]
    ],
    bestFor: "Ideal Para",

    guideLabel: "Guía Gratis",
    guideTitle: "10 cosas que debes saber antes de mudarte a Playa del Carmen.",
    guideText:
      "Recibe una guía simple sobre costo de vida, residencia, rentas, salud, bancos, zonas y errores comunes antes de mudarte.",
    guideCta: "Solicitar La Guía Gratis",

    processLabel: "Cómo Funciona",
    processTitle: "De la primera conversación a sentirte más preparado.",
    process: [
      ["01", "Hablar", "Empezamos con tus metas, presupuesto, tiempos y el tipo de vida que quieres en México."],
      ["02", "Planear", "Mapeamos tu camino de reubicación: zonas, rentas, residencia y prioridades."],
      ["03", "Conectar", "Te orientamos hacia profesionales, agentes y proveedores confiables cuando sea necesario."],
      ["04", "Establecerte", "Avanzas con más claridad, menos sorpresas y personas listas para ayudarte."]
    ],

    endorsementLabel: "Historias De Clientes Y Respaldos",
    endorsementTitle: "Lo que dicen quienes han trabajado con Kalen.",
    clientStoryCardLabel: "Historia De Cliente",
    endorsementCardLabel: "Respaldo Profesional",
    starsAria: "Calificación: 5 de 5 estrellas",

    founderLabel: "Historia Del Fundador",
    founderTitle: "Construido desde experiencia real, no teoría.",
    founderIntro:
      "Path To Mexico fue creado por Kalen Enns después de dejar Canadá y reconstruir su vida en México.",
    founderParagraphs: [
      "Nunca planeé construir un negocio de reubicación. Simplemente tomé una decisión que cambió mi propia vida.",
      "Después de pasar la mayor parte de mi vida en Canadá, llegué a un punto donde quería algo diferente: más libertad, más sol, más conexión y más tiempo viviendo de verdad.",
      "Así que empaqué lo que pude, dejé British Columbia atrás y me mudé a México.",
      "No fue tan simple ni glamuroso como parece en redes sociales. Había preguntas sobre residencia, bancos, salud, vivienda, documentos y cómo encontrar personas confiables.",
      "Algunas cosas fueron más fáciles de lo esperado. Otras fueron más difíciles. Pero en algún punto, la vida empezó a sentirse diferente.",
      "México no resolvió todo. Ningún lugar puede hacer eso. Pero me dio perspectiva y me recordó que no existe una sola forma de vivir.",
      "Eso fue lo que llevó a Path To Mexico: no como una empresa corporativa de reubicación, sino como una guía confiable construida desde experiencia real.",
      "La mayoría de la información sobre reubicación en internet está dispersa, es impersonal y está desconectada de lo que realmente se siente dejar un país que siempre has conocido. Path To Mexico existe para cerrar esa brecha: ayudar a las personas a tomar decisiones informadas, reducir la incertidumbre y construir su próximo capítulo con más claridad de la que yo tuve.",
      "Path To Mexico no es un despacho legal, una agencia de inmigración, un asesor fiscal, un médico ni una inmobiliaria. Lo que puedo ofrecer es orientación honesta, experiencia real y conexiones con profesionales confiables cuando los necesites."
    ],
    founderQuote:
      "Algunas personas vienen a México de vacaciones. Otras vienen buscando una vida que se sienta más propia.",
    founderImpactParagraph:
      "Esa convicción define cómo trabaja Path To Mexico. No se trata solo de ayudarte a partir bien, sino de ayudarte a llegar bien: como vecino, no solo como recién llegado. La reubicación responsable significa aprender el idioma, respetar las formas de vida locales y convertirte en parte de la comunidad a la que te unes, no algo aparte de ella.",
    founderImpactQuote:
      "No solo ayudamos a las personas a reubicarse. Las ayudamos a convertirse en miembros conscientes de las comunidades a las que se integran.",
    founderSignature: "— Kalen Enns",
    founderRole: "Fundador, Path To Mexico",

    networkLabel: "Red Local Confiable",
    networkTitle: "Las personas confiables importan.",
    networkText:
      "Path To Mexico conecta clientes con profesionales seleccionados y recursos locales para crear una transición más tranquila y una llegada con más confianza.",
    network: [
      "Agentes Inmobiliarios",
      "Facilitadores De Residencia",
      "Abogados",
      "Seguros",
      "Doctores",
      "Administradores De Propiedad",
      "Contratistas",
      "Contadores",
      "Mudanzas"
    ],

    trustLabel: "Confianza & Claridad",
    trustTitle: "Opciones más claras, mejores conexiones y menos errores costosos.",
    trustPoints: [
      "Fundador canadiense viviendo en México",
      "Conocimiento local de Riviera Maya",
      "Red profesional confiable",
      "Apoyo personal uno a uno"
    ],

    whoTitle: "Hecho para personas listas para una vida diferente.",
    whoText:
      "Ya vengas de Canadá, Estados Unidos u otro lugar, Path To Mexico te ayuda a entender tus opciones y conectar con las personas correctas en el terreno.",
    tags: ["Canadienses", "Americanos", "Profesionales Remotos", "Jubilados", "Inversionistas", "Familias", "Trabajadores Remotos", "Emprendedores"],

    faqLabel: "Preguntas Comunes",
    faqTitle: "Preguntas que vale la pena responder antes de mudarte.",
    faqs: [
      ["¿En qué ayuda realmente Path To Mexico?", "Te ayudamos a pasar de “estar pensando en México” a tener un plan claro y con confianza: te orientamos hacia la región o ciudad adecuada, trazamos una ruta realista a 30/60/90 días y te conectamos con los profesionales locales de confianza (legales, inmobiliarios, de seguros y más) que realmente necesitarás en el camino. No vendemos bienes raíces ni tramitamos documentos legales nosotros mismos — coordinamos y te acompañamos."],
      ["¿Cómo comienza el proceso de reubicación?", "La mayoría empieza con una Mexico Fit Call ($99 USD, una conversación privada sobre tu cronograma, objetivos y dudas) o con nuestro cuestionario gratuito My Mexico Blueprint, que puede ayudarte a definir en qué parte de México encajaría realmente tu vida. De cualquier forma, construimos los siguientes pasos según lo que descubramos."],
      ["¿Pueden ayudarme a determinar en qué parte de México debería vivir?", "Sí — para eso está diseñado My Mexico Blueprint. Te pregunta sobre tus prioridades (ritmo de vida, presupuesto, clima, comunidad y más) y te compara con destinos reales de la Península de Yucatán, con una mirada honesta de los pros y contras, no solo lo atractivo."],
      ["¿Debería rentar antes de comprar?", "En la mayoría de los casos, sí. Rentar durante una temporada o un año te permite conocer realmente un lugar antes de comprometerte — el clima, los traslados, el ruido, la comunidad — de una forma que la investigación por sí sola no logra. Por lo general lo recomendamos, aunque tu propio cronograma y objetivos podrían indicar algo distinto."],
      ["¿Pueden los extranjeros comprar propiedades legalmente en México?", "Sí, los extranjeros pueden ser propietarios en México, incluso dentro de las zonas restringidas costeras y fronterizas, mediante un fideicomiso bancario o una sociedad mexicana, según el caso. La estructura y los requisitos exactos dependen de tu situación y de la propiedad en cuestión, así que te conectamos con un abogado inmobiliario calificado o un notario para confirmar lo que aplica en tu caso — nosotros no gestionamos la transacción directamente."],
      ["¿Pueden ayudar con la residencia temporal o permanente?", "Sí. Podemos ayudarte a entender el camino general — residencia temporal frente a permanente, requisitos de ingresos y financieros, y qué esperar — y conectarte con profesionales de inmigración calificados para gestionar tu solicitud. Los requisitos y la elegibilidad pueden cambiar y variar según el consulado, así que siempre te dirigimos a orientación actual y calificada en lugar de suponer."],
      ["¿Cuánto suele tardar el proceso de residencia?", "Varía — según el consulado, el tipo de residencia y qué tan listos estén tus documentos. Algunas personas lo resuelven en pocos meses; otras tardan más, especialmente si los documentos requieren traducción, apostilla o revisión adicional. Te ayudamos a planear con cronogramas realistas en lugar de prometer una cifra fija."],
      ["¿Cuánto dinero debería presupuestar para mudarme?", "Depende mucho de dónde te instales y de cómo vivas — un pueblo tranquilo del interior y una ciudad costera del Caribe pueden tener costos muy distintos. Más allá del día a día, considera los costos de la mudanza, los depósitos iniciales de vivienda, los trámites de residencia y un colchón cómodo para lo inesperado. Podemos revisar rangos realistas para tus destinos específicos una vez que conozcamos más sobre tu situación."],
      ["¿Pueden ayudarme a abrir una cuenta bancaria u obtener un seguro?", "Sí — podemos orientarte hacia bancos y aseguradoras locales de confianza y explicarte en términos generales qué esperar (documentación, requisitos según tu estatus migratorio y plazos típicos). La apertura de cuentas y la contratación de pólizas las gestionan directamente esas instituciones, ya que los requisitos y las ofertas cambian y varían según el proveedor."],
      ["¿Necesito hablar español?", "No para empezar, y muchas personas construyen una buena vida en México con un español limitado, especialmente en zonas más internacionales. Dicho esto, aprender aunque sea un español conversacional suele profundizar notablemente la experiencia y la facilidad del día a día — generalmente lo recomendamos como una meta continua, no como un requisito previo."],
      ["¿Es México seguro para los extranjeros?", "La seguridad varía significativamente según la región y la ciudad, como en cualquier parte del mundo, y las condiciones pueden cambiar con el tiempo. Muchas de las zonas en las que nos enfocamos tienen un buen historial con residentes extranjeros. Compartimos lo que honestamente sabemos de cada destino, incluyendo sus contras, y siempre recomendamos revisar las advertencias de viaje vigentes de tu propio gobierno como parte de tu investigación."],
      ["¿Pueden ayudar con la atención médica y el seguro privado?", "Sí. Podemos explicarte el panorama general — el sistema público de salud (IMSS), los hospitales privados y las opciones de seguro privado — y conectarte con proveedores y agentes para revisar tu situación específica. La cobertura, el costo y la elegibilidad dependen de tu edad, tu salud y tu estatus migratorio, así que dejamos los detalles a los proveedores autorizados."],
      ["¿Puedo llevar a mis mascotas a México?", "Por lo general, sí — los requisitos de México para importar mascotas son más sencillos que en muchos países, normalmente un certificado de salud y vacunas al día. Los requisitos pueden cambiar, así que recomendamos confirmar las reglas vigentes con un veterinario y tu aerolínea poco antes de viajar, y con gusto te orientamos hacia esa información actual."],
      ["¿Apoyan a familias, trabajadores remotos, jubilados y emprendedores?", "Sí, y más allá de eso — trabajamos con personas de muchos países y etapas de vida, no solo con jubilados o una nacionalidad en particular. Sea lo que sea lo que te traiga a México, nuestro trabajo es entender tu situación específica y orientarte hacia lo que realmente encaja con ella."],
      ["¿Qué pasa después de que llego?", "Depende de lo que ya hayas resuelto antes de llegar, pero seguimos presentes — ayudándote con la orientación local, conectándote con la comunidad y dando seguimiento a los asuntos prácticos (cuentas bancarias, residencia, vivienda) que muchas veces siguen en proceso después de la mudanza."],
      ["¿Cuánto cuestan sus servicios?", "Depende del nivel de apoyo que necesites, desde una sola Mexico Fit Call de $99 USD hasta una reubicación totalmente acompañada. Te explicaremos los costos con claridad durante esa primera llamada, sin ningún compromiso de continuar — o empieza con nuestro cuestionario gratuito My Mexico Blueprint si aún no estás listo para agendar una llamada."],
      ["¿Puedo empezar a planear mi mudanza antes de resolver la residencia?", "Sí — la mayoría de las personas lo hace así. Explorar destinos, entender presupuestos y armar un cronograma aproximado no requiere tener la residencia en mano. My Mexico Blueprint y una Mexico Fit Call están pensados exactamente para esta etapa, para que la residencia sea una parte más de un plan que ya estás construyendo, no el primer obstáculo que debes resolver."],
      ["¿Puedo comprar, registrar y asegurar un auto en México?", "Sí. Los extranjeros pueden comprar un vehículo en México con un estatus migratorio válido (las reglas varían para quienes visitan con visa de turista y traen un auto con placas extranjeras de forma temporal). El registro y el seguro funcionan distinto que en muchos países de origen — el seguro en particular es esencial y no siempre es obligatorio por ley según el estado, lo cual hace fácil pasarlo por alto sin querer. Podemos orientarte sobre qué esperar y conectarte con contactos locales de confianza; la compra, el registro y la póliza en sí se gestionan directamente con agencias, oficinas de gobierno y aseguradoras."],
      ["¿Tengo que pagar impuestos en México, y me cobrarán impuestos dos veces?", "Depende de tu estatus de residencia, tus fuentes de ingreso y las propias reglas fiscales de tu país de origen, además de cualquier tratado fiscal con México — esta es genuinamente una de las áreas donde más importa un profesional fiscal transfronterizo calificado, no una orientación general. Podemos explicarte el panorama general (la residencia fiscal y la residencia migratoria no son lo mismo) y conectarte con un contador calificado que conozca tu situación específica, pero nosotros no damos asesoría fiscal."],
      ["¿Cuál es la mejor forma de transferir dinero a México o mover fondos entre cuentas?", "La mayoría combina transferencias bancarias internacionales, servicios de transferencia diseñados para pagos transfronterizos y, eventualmente, una cuenta bancaria mexicana una vez que la residencia está en trámite o resuelta. Las comisiones, tipos de cambio y límites de transferencia varían mucho entre bancos y servicios, así que vale la pena comparar antes de comprometerte con uno para algo recurrente. Podemos orientarte sobre lo que le ha funcionado a otros y conectarte con contactos locales de confianza; las transferencias en sí las gestionas con tu propio banco o proveedor."],
      ["¿Puedo traer mis muebles y pertenencias personales cuando me mude?", "Sí — muchas personas traen un contenedor o un envío parcial de menaje de casa, mientras que otras venden la mayoría de sus cosas y empiezan de nuevo, amueblando localmente. El menaje de casa tiene sus propios trámites y, hecho correctamente, puede significar aranceles de importación reducidos o nulos en artículos personales — pero las reglas son específicas sobre tiempos y documentación. Podemos orientarte sobre qué esperar y conectarte con contactos de confianza de mudanzas y aduanas; el envío y el proceso aduanal en sí los gestionan agentes aduanales y empresas de mudanza con licencia."],
      ["¿Es el internet lo suficientemente confiable para trabajar remotamente desde México?", "En la mayoría de los destinos que cubrimos, sí — la fibra óptica y los datos móviles confiables son comunes, especialmente en pueblos más consolidados, y cada vez hay más espacios de coworking disponibles. La confiabilidad varía más en destinos más pequeños y remotos, donde tener una conexión de respaldo (un segundo proveedor o un hotspot móvil) es genuinamente una buena idea, no una exageración. Con gusto te orientamos sobre qué esperar en tu destino específico."],
      ["¿Path To Mexico apoya una reubicación responsable dentro de las comunidades locales?", "Sí — es central en la forma en que trabajamos. Fomentamos aprender el idioma, entender las costumbres locales y participar en tu nueva comunidad en lugar de mantenerte al margen. Una buena reubicación no se trata solo de tu propia comodidad; se trata de convertirte en una parte respetuosa y activa del lugar que ahora llamas hogar.", { to: "/impact", label: "Conoce nuestro compromiso de Impacto →" }]
    ],

    contactLabel: "Empieza Aquí",
    contactTitle: "Empieza Tu Camino A México",
    contactText:
      "Envía algunos detalles sobre tus tiempos, metas y preguntas. Te ayudaremos a entender el próximo paso más claro hacia reubicación, residencia, estilo de vida, bienes raíces o apoyo local confiable en México.",
    formSuccess: "Gracias — tu consulta fue enviada. Te contactaremos pronto.",
    formSuccessTitle: "Mensaje Enviado",
    formNamePlaceholder: "Nombre Completo",
    formEmailPlaceholder: "Correo Electrónico",
    formCountryPlaceholder: "País Actual",
    formTimelinePlaceholder: "Cronograma Ideal",
    formMessagePlaceholder: "¿En qué necesitas ayuda?",
    formSubmitting: "Enviando...",
    formSubmit: "Enviar Consulta De Reubicación",
    formError:
      "Algo salió mal al enviar tu consulta. Tus datos siguen aquí — inténtalo de nuevo.",
    footerLine: "Un ritmo de vida diferente.",
    footer: "25 Destinos En La Península De Yucatán"
  }
};

function LeadForm({ t, lang }) {
  const [state, handleSubmit] = useForm("xdabqdyq");

  if (state.succeeded) {
    return (
      <div className="border border-zinc-200 bg-white p-8 text-center text-zinc-950 shadow-sm">
        <h3 className="mb-4 text-3xl font-light tracking-[-0.04em]">{t.formSuccessTitle}</h3>
        <p className="text-zinc-600">{t.formSuccess}</p>
      </div>
    );
  }

  // Duplicate-click guard (same pattern as the Blueprint's LeadCaptureCard):
  // a submission already in flight must never fire a second POST.
  const onSubmit = (event) => {
    if (state.submitting || state.succeeded) {
      event.preventDefault();
      return;
    }
    handleSubmit(event);
  };

  // Launch fix #1: a network/Formspree failure must never disappear
  // silently — inputs stay filled (the form never unmounts) and this
  // message invites a retry.
  const showError = !state.submitting && !state.succeeded && state.errors != null;

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-10 grid max-w-3xl gap-5 text-left">
      <input type="hidden" name="_subject" value="New Website Inquiry — homepage" />
      <input type="hidden" name="source" value="homepage" />
      <input type="hidden" name="form_name" value="homepage_lead" />
      <input type="hidden" name="page" value="/" />
      <input type="hidden" name="language" value={lang} />
      {/* Formspree honeypot: display:none keeps it out of the tab order and
          accessibility tree; bots that fill it are silently dropped. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <input className="border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950" type="text" name="name" placeholder={t.formNamePlaceholder} required />
      <input className="border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950" type="email" name="email" placeholder={t.formEmailPlaceholder} required />
      <ValidationError field="email" errors={state.errors} />
      <input className="border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950" type="text" name="country" placeholder={t.formCountryPlaceholder} />
      <input className="border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950" type="text" name="timeline" placeholder={t.formTimelinePlaceholder} />
      <textarea className="min-h-36 border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950" name="message" placeholder={t.formMessagePlaceholder} required />
      <ValidationError field="message" errors={state.errors} />

      {showError && (
        <p role="alert" className="text-sm leading-relaxed text-[#E36F4F]">
          {t.formError}
        </p>
      )}

      <button disabled={state.submitting} className="bg-zinc-950 px-8 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-zinc-800 disabled:opacity-60">
        {state.submitting ? t.formSubmitting : t.formSubmit}
      </button>
    </form>
  );
}

function SectionHeader({ label, title, text, light = false }) {
  // CX-003: this local component (not the shared ArticleSection.js) is
  // reused by every Homepage section header (Relocation, Work, Process,
  // Endorsement, Network, Trust, FAQ) — it had no reduced-motion handling
  // at all until now, despite being the single most-repeated whileInView
  // usage on the page.
  const prefersReducedMotion = useCinematicMotion();
  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.12 : 0.8 }}
      viewport={{ once: true }}
      className="mx-auto max-w-6xl"
    >
      <div className="ptm-rhythm-line mb-7" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <p className={`mb-5 text-[11px] font-bold uppercase tracking-[0.2em] ${light ? "text-white/55" : "text-[#E36F4F]"}`}>
        {label}
      </p>
      <h2 className={`max-w-5xl text-4xl leading-[1.02] md:text-6xl lg:text-7xl ${light ? "text-white" : "text-zinc-950"}`}>
        {title}
      </h2>
      {text && (
        <p className={`mt-8 max-w-3xl text-lg leading-relaxed sm:text-xl ${light ? "text-white/60" : "text-zinc-600"}`}>
          {text}
        </p>
      )}
    </motion.div>
  );
}

function HomePage() {
  const [lang, setLangState] = useState(getStoredLanguage);
  const setLang = (next) => {
    setLangState(next);
    setStoredLanguage(next);
  };
  useHtmlLang(lang);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [nearContact, setNearContact] = useState(false);
  const t = content[lang];
  const endorsementParagraphs = lang === "es" ? ENDORSEMENT.quoteParagraphsEs : ENDORSEMENT.quoteParagraphs;
  const prefersReducedMotion = useCinematicMotion();

  // CX-002 hero pointer depth — desktop-only (a real cursor, not a touch
  // guess from viewport width), reduced-motion-aware, resets to POINTER_DEPTH.rest
  // whenever the pointer leaves so it can never get stuck offset.
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [pointerOffset, setPointerOffset] = useState(POINTER_DEPTH.rest);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHasFinePointer(mediaQuery.matches);
    const handleChange = (event) => setHasFinePointer(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const heroPointerActive = hasFinePointer && !prefersReducedMotion;

  // Index-coupled with content.en.nav / content.es.nav — any change here
  // must land at the same position in both label arrays above.
  const navLinks = ["/my-mexico-blueprint", "/your-mexico", "/weddings", "#services", "/guides", "/impact", "#about", "#contact"];

  const heroRef = useRef(null);
  const contactRef = useRef(null);
  const menuTriggerRef = useRef(null);
  const firstMenuLinkRef = useRef(null);
  const menuHasOpenedRef = useRef(false);

  const handleHeroPointerMove = (event) => {
    if (!heroPointerActive || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    setPointerOffset({ x: relX * -POINTER_DEPTH.maxOffset, y: relY * -POINTER_DEPTH.maxOffset });
  };

  const handleHeroPointerLeave = () => setPointerOffset(POINTER_DEPTH.rest);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = contactRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearContact(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px", threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Move focus into the menu when it opens, and back to the trigger when it
  // closes — skipped on initial mount (menuHasOpenedRef only becomes true
  // once the menu has actually been opened at least once), so page load
  // never steals focus onto the "Menu" button. The focus call is deferred to
  // the next animation frame because the click that opened the menu also
  // gives the trigger button native browser focus-on-click, which otherwise
  // runs after this effect and steals focus straight back.
  useEffect(() => {
    if (menuOpen) {
      menuHasOpenedRef.current = true;
      const frame = requestAnimationFrame(() => firstMenuLinkRef.current?.focus());
      return () => cancelAnimationFrame(frame);
    } else if (menuHasOpenedRef.current) {
      const frame = requestAnimationFrame(() => menuTriggerRef.current?.focus());
      return () => cancelAnimationFrame(frame);
    }
  }, [menuOpen]);

  // Escape closes the menu — only listens while it's actually open.
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <main className="ptm-home min-h-screen overflow-x-hidden bg-[#f6f1e8] text-zinc-950 scroll-smooth">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.2em] focus:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        {t.skipToContent}
      </a>
      <SEO
        title={t.seoTitle}
        description={t.seoDescription}
        path="/"
      />
      <section
        id="home"
        ref={heroRef}
        onMouseMove={handleHeroPointerMove}
        onMouseLeave={handleHeroPointerLeave}
        className="relative min-h-[100svh] overflow-hidden bg-[#F3EEE4] text-[#14211C]"
      >
        <nav
          className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b px-4 py-4 backdrop-blur-xl transition-all duration-300 md:px-8 lg:px-12 ${
            scrolled
              ? "border-[#14211C]/10 bg-[#FFFDF8]/95 shadow-[0_10px_40px_rgba(20,33,28,0.06)]"
              : "border-[#14211C]/10 bg-[#F3EEE4]/88"
          }`}
        >
          <a href="#home" aria-label="Path to Mexico — home" className="block">
            <img
              src="/brand/logos/ptm-primary-horizontal-ink.svg"
              alt="Path to Mexico"
              className="h-7 w-auto sm:h-8"
            />
          </a>

          <div className="hidden items-center gap-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#14211C]/65 xl:flex">
            {t.nav.map((item, index) => (
              <a
                key={index}
                href={navLinks[index]}
                className="transition duration-300 hover:text-[#007C83]"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="rounded-[4px] border border-[#14211C]/20 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#14211C] transition duration-300 hover:border-[#007C83] hover:bg-[#007C83] hover:text-white"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>

            <a
              href="/mexico-fit-call"
              className="hidden rounded-[4px] bg-[#14211C] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#007C83] lg:inline-flex"
            >
              {t.explore}
            </a>

            <button
              ref={menuTriggerRef}
              onClick={() => setMenuOpen(true)}
              onMouseDown={(event) => event.preventDefault()}
              aria-label={t.openMenuAria}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#14211C] transition-colors duration-300 xl:hidden"
            >
              {t.menuLabel}
            </button>
          </div>
        </nav>

        <div
          className={`fixed inset-0 z-[60] flex flex-col bg-[#14211C] transition-all duration-500 ease-out xl:hidden ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0 pointer-events-none"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={t.mobileNavAria}
          aria-hidden={!menuOpen}
        >
          <div className="flex items-center justify-between px-4 py-4 md:px-10">
            <img
              src="/brand/logos/ptm-primary-horizontal-reverse.svg"
              alt="Path to Mexico"
              className="h-7 w-auto sm:h-8"
            />

            <button
              onClick={() => setMenuOpen(false)}
              onMouseDown={(event) => event.preventDefault()}
              aria-label={t.closeMenuAria}
              tabIndex={menuOpen ? 0 : -1}
              className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white transition hover:text-white/70"
            >
              {t.closeLabel}
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 px-8 pb-20">
            {t.nav.map((item, index) => (
              <a
                key={index}
                ref={index === 0 ? firstMenuLinkRef : null}
                href={navLinks[index]}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
                className="group flex items-baseline gap-5"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-3xl font-semibold leading-none tracking-[-0.04em] text-white/90 transition group-hover:text-[#F3BE54] sm:text-5xl">
                  {item}
                </span>
              </a>
            ))}
            <div className="ptm-rhythm-line mt-5" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        <div id="main-content" className="grid min-h-[100svh] pt-[73px] lg:grid-cols-[0.44fr_0.56fr] lg:pt-0">
          <motion.div
            initial="hidden"
            animate="show"
            variants={heroStagger}
            className="relative z-10 flex flex-col justify-center px-6 py-16 sm:px-10 lg:min-h-[100svh] lg:px-14 lg:py-28 xl:px-20"
          >
            <motion.p
              variants={heroFadeUp}
              className="ptm-kicker mb-8 max-w-xl leading-relaxed"
            >
              {t.heroLocation}
            </motion.p>

            <motion.h1
              variants={heroFadeUp}
              className="max-w-3xl text-[3.15rem] leading-[0.96] text-[#14211C] sm:text-7xl lg:text-[5.6rem] xl:text-[6.5rem]"
            >
              <span className="block">{t.heroTitle}</span>
              <span className="ptm-editorial block text-[#007C83]">{t.heroTitleAccent}</span>
            </motion.h1>

            <motion.p
              variants={heroFadeUp}
              className="mt-8 max-w-xl text-base leading-relaxed text-[#14211C]/68 sm:text-lg lg:text-xl"
            >
              {t.heroSubtext}
            </motion.p>

            <motion.div
              variants={heroFadeUp}
              className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7"
            >
              <a
                href="/my-mexico-blueprint"
                className="ptm-action rounded-[4px] bg-[#14211C] px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#007C83]"
              >
                {t.start}
              </a>
              <a
                href="/mexico-fit-call"
                className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#14211C]/70 transition hover:text-[#007C83]"
              >
                {t.explore}
                <span aria-hidden="true" className="text-[#E36F4F] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>

            <motion.div variants={heroFadeUp} className="mt-12">
              <div className="ptm-rhythm-line" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#14211C]/45">
                {t.heroSignal}
              </p>
            </motion.div>
          </motion.div>

          <div className="relative min-h-[46svh] overflow-hidden lg:min-h-[100svh]">
            <motion.div animate={pointerOffset} transition={POINTER_DEPTH.transition} className="absolute -inset-3">
              <div className="h-full w-full motion-safe:md:animate-[cinematic-drift_12s_ease-in-out_infinite]">
                <img src="/hero.jpg" alt={t.heroAlt} className="h-full w-full object-cover" />
              </div>
            </motion.div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14211C]/60 via-[#14211C]/10 to-transparent"
            />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-5 md:bottom-10 md:left-10 md:right-10">
              <p className="ptm-editorial max-w-sm text-2xl leading-snug text-[#F3EEE4] sm:max-w-md sm:text-3xl lg:text-4xl">
                {lang === "es" ? "La vida que imaginas merece un plan real." : "The life you imagine deserves a real plan."}
              </p>
              <span className="h-3 w-3 shrink-0 rounded-full bg-[#F3BE54] shadow-[0_0_0_7px_rgba(243,190,84,0.22)]" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section id="blueprint" className="bg-[#E5EFEC] px-6 py-20 md:px-16 md:py-28">
        <CinematicReveal className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <div className="ptm-rhythm-line mb-7" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <p className="ptm-kicker mb-5">{t.blueprintEyebrow}</p>
            <h2 className="max-w-3xl text-4xl leading-[1.02] text-[#14211C] md:text-6xl lg:text-7xl">
              {t.blueprintTitle}
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#14211C]/65 sm:text-xl">
              {t.blueprintText}
            </p>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="/my-mexico-blueprint"
                className="ptm-action rounded-[4px] bg-[#007C83] px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#103D33]"
              >
                {t.blueprintCta}
              </a>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#14211C]/45">
                {t.blueprintFreeNote}
              </p>
            </div>
          </div>

          <div className="ptm-card relative overflow-hidden border border-[#14211C]/10 bg-[#FFFDF8] p-6 shadow-[0_30px_80px_rgba(20,33,28,0.12)] sm:p-8">
            <div className="flex items-center justify-between border-b border-[#14211C]/10 pb-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E36F4F]">
                  Path to Mexico
                </p>
                <p className="mt-2 text-lg font-bold text-[#14211C]">{t.blueprintEyebrow}</p>
              </div>
              <img src="/brand/logos/ptm-motion-mark-ink.svg" alt="" className="h-11 w-auto" aria-hidden="true" />
            </div>

            <div className="space-y-3 py-6">
              {t.blueprintHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-[4px] bg-[#F3EEE4] px-4 py-4"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                      index === 0 ? "bg-[#E36F4F]" : index === 1 ? "bg-[#007C83]" : "bg-[#103D33]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <p className="text-sm font-semibold text-[#14211C]">{highlight}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-[#14211C]/10 pt-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#14211C]/45">
                {lang === "es" ? "Tu vida. Tu camino." : "Your life. Your path."}
              </p>
              <span className="text-xl text-[#E36F4F]" aria-hidden="true">→</span>
            </div>
          </div>
        </CinematicReveal>
      </section>

      <section id="impact" className="bg-[#efe7d8] px-6 py-20 md:px-16 md:py-28">
        <CinematicReveal className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <div className="ptm-rhythm-line mb-7" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <p className="ptm-kicker mb-5">{t.impactEyebrow}</p>
            <h2 className="max-w-3xl text-4xl leading-[1.02] text-[#14211C] md:text-6xl lg:text-7xl">
              {t.impactTitle}
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#14211C]/65 sm:text-xl">
              {t.impactText}
            </p>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="/impact"
                className="ptm-action rounded-[4px] bg-[#103D33] px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#007C83]"
              >
                {t.impactCta}
              </a>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#14211C]/45">
                {t.impactNote}
              </p>
            </div>
          </div>

          <div className="ptm-card relative overflow-hidden border border-[#14211C]/10 bg-[#FFFDF8] p-6 shadow-[0_30px_80px_rgba(20,33,28,0.12)] sm:p-8">
            <div className="flex items-center justify-between border-b border-[#14211C]/10 pb-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#103D33]">
                  Path to Mexico
                </p>
                <p className="mt-2 text-lg font-bold text-[#14211C]">{t.impactCardLabel}</p>
              </div>
              <img src="/brand/logos/ptm-motion-mark-ink.svg" alt="" className="h-11 w-auto" aria-hidden="true" />
            </div>

            <div className="space-y-3 py-6">
              {t.impactCardHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-[4px] bg-[#F3EEE4] px-4 py-4"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                      index === 0 ? "bg-[#103D33]" : index === 1 ? "bg-[#E36F4F]" : "bg-[#007C83]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <p className="text-sm font-semibold text-[#14211C]">{highlight}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-[#14211C]/10 pt-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#14211C]/45">
                {t.impactCardFooter}
              </p>
              <span className="text-xl text-[#103D33]" aria-hidden="true">→</span>
            </div>
          </div>
        </CinematicReveal>
      </section>

      {/* WEDDINGS-001 — compact entry band for the Weddings vertical. Kept
          deliberately smaller than the Blueprint/Impact pillar bands above:
          one eyebrow, one serif line, one paragraph, one CTA. */}
      <section id="weddings" className="bg-[#14211C] px-6 py-16 text-white md:px-16 md:py-24">
        <CinematicReveal className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d8a15f]">{t.weddingsEyebrow}</p>
            <h2 className="ptm-editorial max-w-2xl text-4xl leading-[1.02] text-white md:text-6xl">
              {t.weddingsTitle}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">{t.weddingsText}</p>
            <a
              href="/weddings"
              className="ptm-action mt-8 inline-block rounded-[4px] bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#14211C] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f]"
            >
              {t.weddingsCta}
            </a>
          </div>
          <div className="relative overflow-hidden rounded-[4px]">
            <img
              src="/regions/riviera-maya/riviera-maya-hero-mobile.webp"
              alt={t.weddingsImageAlt}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover lg:aspect-[4/3]"
            />
          </div>
        </CinematicReveal>
      </section>

      <section id="relocation" className="bg-[#f6f1e8] px-6 py-20 md:px-20 md:py-28">
        <SectionHeader label={t.servicesLabel} title={t.servicesTitle} text={t.servicesText} />
      </section>

      <section id="services" className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
        <CinematicReveal stagger className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {t.services.map(([title, text], index) => (
            <motion.div
              key={index}
              variants={CinematicReveal.itemVariants(prefersReducedMotion)}
              whileHover={{ y: -6 }}
              className="ptm-card border-t-4 bg-white p-8 shadow-[0_18px_50px_rgba(20,33,28,0.06)] transition hover:shadow-[0_24px_70px_rgba(20,33,28,0.11)]"
              style={{ borderTopColor: ["#E36F4F", "#007C83", "#F3BE54", "#103D33", "#A8BBA6", "#BFDDE0"][index] }}
            >
              <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.18em] text-[#14211C]/35">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-5 text-3xl font-light tracking-[-0.04em]">{title}</h3>
              <p className="leading-relaxed text-zinc-600">{text}</p>
            </motion.div>
          ))}
        </CinematicReveal>

        <div className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-sm leading-relaxed text-zinc-500">{t.employmentClarifier}</p>
          <a
            href="/my-mexico-blueprint"
            className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-700 transition hover:text-zinc-950"
          >
            {t.servicesCta}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </section>

      <section id="work" className="bg-white px-6 py-20 md:px-20 md:py-28">
        <SectionHeader label={t.workLabel} title={`${t.workTitle1} ${t.workTitle2}`} text={t.workText} />

        <CinematicReveal stagger className="mx-auto mt-14 grid max-w-6xl gap-px bg-zinc-300 md:grid-cols-3">
          {t.workOffers.map(([title, price, text, bestFor, cta, href], index) => {
            const isPrimary = index === 0;
            return (
              <motion.div
                key={index}
                variants={CinematicReveal.itemVariants(prefersReducedMotion)}
                whileHover={{ y: -6 }}
                className={`ptm-card flex min-h-[500px] flex-col justify-between p-7 transition ${
                  isPrimary ? "bg-zinc-950 text-white hover:bg-zinc-900" : "bg-white text-zinc-950 hover:bg-[#f6f1e8]"
                }`}
              >
                <div>
                  {isPrimary && (
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
                      {t.startHereBadge}
                    </p>
                  )}
                  <h3 className="mb-3 text-3xl font-light tracking-[-0.04em]">{title}</h3>
                  <p className={`mb-6 text-sm uppercase tracking-[0.25em] ${isPrimary ? "text-white/50" : "text-zinc-500"}`}>
                    {price}
                  </p>
                  <p className={`mb-7 leading-relaxed ${isPrimary ? "text-white/70" : "text-zinc-600"}`}>{text}</p>

                  <div className={`border-t pt-6 ${isPrimary ? "border-white/20" : "border-zinc-300"}`}>
                    <p className={`mb-3 text-[10px] uppercase tracking-[0.25em] ${isPrimary ? "text-white/50" : "text-zinc-500"}`}>
                      {t.bestFor}
                    </p>
                    <p className={`leading-relaxed ${isPrimary ? "text-white/70" : "text-zinc-600"}`}>{bestFor}</p>
                  </div>
                </div>

                <a
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`mt-9 inline-block px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    isPrimary
                      ? "bg-white text-zinc-950 hover:bg-[#d8a15f]"
                      : "border border-zinc-950 text-zinc-950 hover:bg-zinc-950 hover:text-white"
                  }`}
                >
                  {cta}
                </a>
              </motion.div>
            );
          })}
        </CinematicReveal>
      </section>

      <section id="free-guide" className="bg-[#f6f1e8] px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 border-t border-zinc-300 pt-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.guideLabel}</p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.guideTitle}</h2>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-zinc-600">
            <p>{t.guideText}</p>
            <a href="/free-guide" className="inline-block border border-zinc-950 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white">
              {t.guideCta}
            </a>
          </div>
        </div>
      </section>

      <section id="process" className="bg-[#0b0b0a] px-6 py-20 text-white md:px-20 md:py-28">
        <SectionHeader label={t.processLabel} title={t.processTitle} light />

        <CinematicReveal stagger className="mx-auto mt-14 grid max-w-6xl gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.map(([number, title, text]) => (
            <motion.div
              key={number}
              variants={CinematicReveal.itemVariants(prefersReducedMotion)}
              whileHover={{ y: -6 }}
              className="bg-[#0b0b0a] p-7 transition hover:bg-white hover:text-zinc-950"
            >
              <p className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] opacity-40">{number}</p>
              <h3 className="mb-5 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
              <p className="leading-relaxed opacity-65">{text}</p>
            </motion.div>
          ))}
        </CinematicReveal>
      </section>

      <section className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
        <SectionHeader label={t.endorsementLabel} title={t.endorsementTitle} />

        <CinematicReveal className="mx-auto mt-14 max-w-3xl">
          <div className="ptm-card border border-zinc-200 bg-white/70 p-8 shadow-sm sm:p-12">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
              {t.clientStoryCardLabel}
            </p>
            <p role="img" aria-label={t.starsAria} className="mb-6 text-base tracking-[0.35em] text-zinc-950">
              <span aria-hidden="true">{"★".repeat(CLIENT_TESTIMONIAL.rating)}</span>
            </p>
            <p className="text-lg leading-relaxed text-zinc-700">
              "{lang === "es" ? CLIENT_TESTIMONIAL.excerptEs : CLIENT_TESTIMONIAL.excerpt}"
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-zinc-500">
              {CLIENT_TESTIMONIAL.name}
              <br />
              {lang === "es" ? CLIENT_TESTIMONIAL.roleEs : CLIENT_TESTIMONIAL.role}
            </p>
          </div>
        </CinematicReveal>

        <CinematicReveal className="mx-auto mt-8 max-w-3xl">
          <div className="ptm-card border border-zinc-200 bg-white/70 p-8 shadow-sm sm:p-12">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
              {t.endorsementCardLabel}
            </p>
            <div className="space-y-5 text-lg leading-relaxed text-zinc-700">
              {endorsementParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-zinc-500">
              {ENDORSEMENT.name}
              <br />
              {lang === "es" ? ENDORSEMENT.roleEs : ENDORSEMENT.role}
            </p>
          </div>
        </CinematicReveal>
      </section>

      <section id="about" className="bg-[#f6f1e8] px-6 py-20 md:px-20 md:py-28">
        <CinematicReveal className="mx-auto grid max-w-6xl gap-12 border-t border-zinc-300 pt-12 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.founderLabel}</p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.founderTitle}</h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-zinc-600 sm:text-xl">{t.founderIntro}</p>

            <div className="ptm-card mt-10 max-w-sm overflow-hidden border border-zinc-200 bg-white p-3 shadow-sm">
              <img src="/kalen.jpg" alt={t.founderPhotoAlt} loading="lazy" className="aspect-[4/5] h-full w-full rounded-[4px] object-cover" />
            </div>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-zinc-600">
            {t.founderParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <p className="ptm-editorial pt-4 text-3xl leading-tight tracking-[-0.04em] text-[#007C83] md:text-5xl">
              {t.founderQuote}
            </p>

            <p>{t.founderImpactParagraph}</p>

            <p className="ptm-editorial pt-4 text-3xl leading-tight tracking-[-0.04em] text-[#007C83] md:text-5xl">
              {t.founderImpactQuote}
            </p>

            <p className="pt-6 text-zinc-500">
              {t.founderSignature}
              <br />
              {t.founderRole}
            </p>
          </div>
        </CinematicReveal>
      </section>

      <section id="network" className="bg-white px-6 py-20 md:px-20 md:py-28">
        <SectionHeader label={t.networkLabel} title={t.networkTitle} text={t.networkText} />

        <CinematicReveal stagger className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 md:grid-cols-3">
          {t.network.map((item, index) => (
            <motion.div
              key={index}
              variants={CinematicReveal.itemVariants(prefersReducedMotion)}
              className="ptm-card border border-zinc-200 bg-white p-8 text-lg font-semibold text-zinc-700 transition hover:-translate-y-1 hover:bg-[#f6f1e8]"
            >
              {item}
            </motion.div>
          ))}
        </CinematicReveal>
      </section>

      <section id="trust" className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
        <SectionHeader label={t.trustLabel} title={t.trustTitle} />

        <CinematicReveal stagger className="mx-auto mt-14 grid max-w-6xl gap-px bg-zinc-300 sm:grid-cols-2 lg:grid-cols-4">
          {t.trustPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={CinematicReveal.itemVariants(prefersReducedMotion)}
              className="bg-[#efe7d8] p-8 text-lg text-zinc-700 transition hover:bg-white"
            >
              {point}
            </motion.div>
          ))}
        </CinematicReveal>
      </section>

      <section className="bg-[#f6f1e8] px-6 py-20 md:px-20 md:py-28">
        <CinematicReveal className="mx-auto max-w-6xl">
          <h2 className="mb-7 max-w-5xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.whoTitle}</h2>
          <p className="mb-12 max-w-3xl text-lg leading-relaxed text-zinc-600 sm:text-xl">{t.whoText}</p>

          <div className="flex flex-wrap gap-3">
            {t.tags.map((item, index) => (
              <span key={index} className="rounded-[4px] border border-zinc-300 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-600 transition hover:border-[#007C83] hover:bg-[#007C83] hover:text-white">
                {item}
              </span>
            ))}
          </div>
        </CinematicReveal>
      </section>

      <section id="faq" className="bg-white px-6 py-20 md:px-20 md:py-28">
        <SectionHeader label={t.faqLabel} title={t.faqTitle} />
        <FAQAccordion items={t.faqs} />
      </section>

      <section id="contact" ref={contactRef} className="bg-[#0b0b0a] px-6 py-20 text-center text-white md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">{t.contactLabel}</p>
          <h2 className="mb-7 text-4xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.contactTitle}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">{t.contactText}</p>

          <LeadForm t={t} lang={lang} />

          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href="https://wa.me/16043154625?text=Hi%20Kalen,%20I%20found%20Path%20To%20Mexico%20and%20would%20love%20to%20learn%20more%20about%20moving%20to%20Mexico."
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-white/30 px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
            >
              {t.whatsappCta}
            </a>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/16043154625?text=Hi%20Kalen,%20I%20found%20Path%20To%20Mexico%20and%20would%20love%20to%20learn%20more%20about%20moving%20to%20Mexico."
        target="_blank"
        rel="noreferrer"
        aria-hidden={nearContact || menuOpen}
        tabIndex={nearContact || menuOpen ? -1 : 0}
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#007C83] text-2xl text-white shadow-2xl transition-all duration-300 ${
          nearContact || menuOpen ? "pointer-events-none scale-75 opacity-0" : "opacity-100 hover:scale-110"
        }`}
      >
        💬
      </a>

      <section id="disclaimer" className="bg-[#f6f1e8] px-6 py-12 text-zinc-950 md:px-20">
        <div className="mx-auto max-w-6xl border-t border-zinc-300 pt-8">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">{t.disclaimerLabel}</p>
          <p className="max-w-4xl text-sm leading-relaxed text-zinc-600">
            {t.disclaimerText}
          </p>
        </div>
      </section>

      <footer className="bg-zinc-950 px-8 py-16 text-center text-sm text-zinc-500">
        <img
          src="/brand/logos/ptm-primary-horizontal-reverse.svg"
          alt="Path to Mexico"
          className="mx-auto h-9 w-auto"
        />
        <div className="ptm-rhythm-line mx-auto mt-8 justify-center" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <p className="ptm-editorial mt-7 text-lg text-white/70">{t.footerLine}</p>
        <p className="mt-5 text-zinc-500">{t.footer}</p>
        <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
          {t.footerTagline2}
        </p>
      </footer>
    </main>
  );
}

export default HomePage;
