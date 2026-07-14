import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import SEO from "../components/SEO";
import CinematicReveal from "../components/CinematicReveal";
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
    nav: ["Home", "Blueprint", "Relocation", "Services", "Guides", "About", "FAQ", "Contact"],
    heroLocation: "Riviera Maya • Mexico",
    heroSignal: "[ CIELO NUEVO ]",
    heroTitle: "Move to Mexico with confidence.",
    heroSubtext:
      "Path To Mexico helps people explore relocation, lifestyle, residency direction, trusted local connections, and the real possibility of building a new life in Mexico.",
    start: "Book A Mexico Fit Call",
    explore: "Explore Relocation Support",

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

    workLabel: "Work With Me",
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
        "/mexico-fit-call"
      ],
      [
        "Relocation Roadmap",
        "Starting at $499 USD",
        "A personalized relocation strategy built around your goals, timeline, budget, lifestyle preferences, and long-term vision for life in Mexico.",
        "Ideal for individuals, couples, families, retirees, entrepreneurs, and remote workers who want a clear roadmap before making major decisions.",
        "Discuss The Roadmap",
        "/mexico-fit-call"
      ],
      [
        "Guided Landing",
        "Custom Quote",
        "Private concierge-style relocation support for people who want hands-on guidance, trusted introductions, and ongoing assistance throughout the process.",
        "Best for families, professionals, investors, business owners, and anyone seeking a highly personalized relocation experience.",
        "Discuss Guided Landing",
        "/mexico-fit-call"
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

    testimonialsLabel: "Testimonials",
    testimonialsTitle1: "Trusted guidance.",
    testimonialsTitle2: "Real conversations.",
    testimonials: [
      [
        "We had been talking about moving to Mexico for years, but the amount of information online felt overwhelming. Path To Mexico helped us think through things we had not even considered, from neighborhoods and healthcare to what day-to-day life might actually feel like. More than anything, it gave us confidence and a clearer sense of direction.",
        "Sarah & Michael — Vancouver, Canada"
      ],
      [
        "I was not looking for someone to sell me anything. I just wanted honest answers from someone who had actually lived the experience. Path To Mexico provided clarity and helped me slow down and make better decisions. It felt more like talking to a trusted friend than dealing with a company.",
        "Client from Calgary, Alberta"
      ],
      [
        "Moving countries can feel intimidating. Having someone who understood both the practical and emotional sides of relocation made the entire process feel much less overwhelming. I left our conversations feeling excited instead of anxious.",
        "Amanda — Seattle, Washington"
      ]
    ],

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
    faqTitle: "Before you make the move.",
    faqs: [
      ["Do you only help Canadians?", "No. We mainly support Canadians and Americans, but we can help people from anywhere explore relocation to Mexico."],
      ["Do you sell real estate directly?", "No. We provide guidance and introductions to trusted local professionals. Real estate transactions are handled by qualified experts."],
      ["Can you help with residency?", "Yes. We can help you understand the general path and connect you with qualified professionals for immigration and paperwork."],
      ["Is this only for retirees?", "No. We support retirees, investors, remote workers, digital nomads, families, entrepreneurs, and people looking for a different lifestyle."]
    ],

    contactLabel: "Start Here",
    contactTitle: "Start Your Path To Mexico",
    contactText:
      "Send a few details about your timeline, goals, and questions. We’ll help you understand the clearest next step toward relocation, residency, lifestyle, real estate, or trusted local support in Mexico.",
    formSuccess: "Thanks — your inquiry was sent. We’ll be in touch soon.",
    footerLine: "A different rhythm of life.",
    footer: "Playa del Carmen • Tulum • Riviera Maya • Mexico"
  },

  es: {
    nav: ["Inicio", "Blueprint", "Reubicación", "Servicios", "Guías", "Historia", "FAQ", "Contacto"],
    heroLocation: "Riviera Maya • México",
    heroSignal: "[ CIELO NUEVO ]",
    heroTitle: "Múdate a México con más claridad.",
    heroSubtext:
      "Path To Mexico ayuda a personas a explorar reubicación, estilo de vida, orientación de residencia, conexiones locales confiables y la posibilidad real de construir una nueva vida en México.",
    start: "Reservar Llamada",
    explore: "Explorar Reubicación",

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

    workLabel: "Trabaja Conmigo",
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
        "/mexico-fit-call"
      ],
      [
        "Roadmap De Reubicación",
        "Desde $499 USD",
        "Una estrategia personalizada construida alrededor de tus metas, tiempos, presupuesto, preferencias de vida y visión a largo plazo en México.",
        "Ideal para individuos, parejas, familias, jubilados, emprendedores y trabajadores remotos que quieren un plan claro.",
        "Hablar Sobre El Roadmap",
        "/mexico-fit-call"
      ],
      [
        "Llegada Guiada",
        "Cotización Personalizada",
        "Apoyo privado estilo concierge para quienes quieren guía práctica, conexiones confiables y acompañamiento durante el proceso.",
        "Ideal para familias, profesionales, inversionistas, dueños de negocios y personas que buscan una experiencia personalizada.",
        "Hablar Sobre Llegada Guiada",
        "/mexico-fit-call"
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

    testimonialsLabel: "Testimonios",
    testimonialsTitle1: "Guía confiable.",
    testimonialsTitle2: "Conversaciones reales.",
    testimonials: [
      [
        "Kalen nos dio más claridad en una conversación que semanas de investigación en internet. Por fin entendimos cuáles eran nuestras opciones reales.",
        "Futuro Cliente De Reubicación"
      ],
      [
        "Lo que más destacó fue la honestidad. No hubo presión ni venta agresiva, solo consejos prácticos de alguien que ya había pasado por el proceso.",
        "Cliente Potencial"
      ],
      [
        "Mudarse de país se sentía abrumador hasta que tuvimos a alguien en el terreno que nos orientó y nos conectó con personas confiables.",
        "Consulta De Reubicación En Playa"
      ]
    ],

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
    faqTitle: "Antes de mudarte.",
    faqs: [
      ["¿Solo ayudan a canadienses?", "No. Principalmente apoyamos a canadienses y estadounidenses, pero también podemos ayudar a personas de otros países."],
      ["¿Venden bienes raíces directamente?", "No. Ofrecemos guía e introducciones a profesionales locales confiables. Las transacciones se manejan con expertos calificados."],
      ["¿Pueden ayudar con residencia?", "Sí. Podemos ayudarte a entender el camino general y conectarte con profesionales calificados."],
      ["¿Es solo para jubilados?", "No. Apoyamos jubilados, inversionistas, trabajadores remotos, nómadas digitales, familias, emprendedores y personas buscando otro estilo de vida."]
    ],

    contactLabel: "Empieza Aquí",
    contactTitle: "Empieza Tu Camino A México",
    contactText:
      "Envía algunos detalles sobre tus tiempos, metas y preguntas. Te ayudaremos a entender el próximo paso más claro hacia reubicación, residencia, estilo de vida, bienes raíces o apoyo local confiable en México.",
    formSuccess: "Gracias — tu consulta fue enviada. Te contactaremos pronto.",
    footerLine: "Un ritmo de vida diferente.",
    footer: "Playa del Carmen • Tulum • Riviera Maya • México"
  }
};

function LeadForm({ t }) {
  const [state, handleSubmit] = useForm("xdabqdyq");

  if (state.succeeded) {
    return (
      <div className="border border-zinc-200 bg-white p-8 text-center text-zinc-950 shadow-sm">
        <h3 className="mb-4 text-3xl font-light tracking-[-0.04em]">Message Sent</h3>
        <p className="text-zinc-600">{t.formSuccess}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 grid max-w-3xl gap-5 text-left">
      <input className="border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950" type="text" name="name" placeholder="Full Name" required />
      <input className="border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950" type="email" name="email" placeholder="Email Address" required />
      <ValidationError field="email" errors={state.errors} />
      <input className="border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950" type="text" name="country" placeholder="Current Country" />
      <input className="border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950" type="text" name="timeline" placeholder="Ideal Timeline" />
      <textarea className="min-h-36 border border-zinc-300 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-zinc-950" name="message" placeholder="What do you need help with?" required />
      <ValidationError field="message" errors={state.errors} />

      <button disabled={state.submitting} className="bg-zinc-950 px-8 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-zinc-800 disabled:opacity-60">
        {state.submitting ? "Sending..." : "Send Relocation Inquiry"}
      </button>
    </form>
  );
}

function SectionHeader({ label, title, text, light = false }) {
  // CX-003: this local component (not the shared ArticleSection.js) is
  // reused by every Homepage section header (Relocation, Work, Process,
  // Testimonials, Network, Trust, FAQ) — it had no reduced-motion handling
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
      <p className={`mb-6 text-xs uppercase tracking-[0.35em] ${light ? "text-white/40" : "text-zinc-500"}`}>
        {label}
      </p>
      <h2 className={`max-w-5xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-8xl ${light ? "text-white" : "text-zinc-950"}`}>
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
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [nearContact, setNearContact] = useState(false);
  const t = content[lang];
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

  const navLinks = ["#home", "/my-mexico-blueprint", "#relocation", "#services", "/guides", "#about", "#faq", "#contact"];

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
    <main className="min-h-screen overflow-x-hidden bg-[#f6f1e8] text-zinc-950 scroll-smooth">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.2em] focus:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        Skip to content
      </a>
      <SEO
        title="Path To Mexico | A Different Rhythm Of Life"
        description="Relocation guidance, trusted local connections, and lifestyle support for people considering a new life in Mexico."
        path="/"
      />
      <section
        id="home"
        ref={heroRef}
        onMouseMove={handleHeroPointerMove}
        onMouseLeave={handleHeroPointerLeave}
        className="relative min-h-[100svh] overflow-hidden text-white"
      >
        <div className="absolute inset-0">
          {/* CX-001: the hero's own restrained cinematic prototype — reuses
              the exact same tokens/keyframes proven on CityCard.js, applied
              here instead of a new section. Drift lives on this wrapper,
              never the <img> itself, so nothing here fights a transform;
              the section's own overflow-hidden clips the drift exactly like
              CityCard's aspect-ratio container does. The light-movement
              overlay sits beneath the existing dark gradients below, so it
              only ever adds a faint warm glow to the photo -- the gradients
              (and the text contrast they preserve) are completely
              untouched. Both effects are motion-safe + md:-gated: fully
              inert under prefers-reduced-motion and on mobile.

              CX-002 adds one more layer: a desktop-only pointer-depth
              translate on a dedicated outer wrapper, so it composes with
              (rather than fights) the CX-001 ambient-drift wrapper nested
              inside it — same rule as CityCard's ambient/hover layering.
              heroPointerActive is false on touch devices and under
              prefers-reduced-motion, so this motion.div's animate target
              never leaves POINTER_DEPTH.rest for those visitors, and
              onMouseLeave above always resets it cleanly. */}
          <motion.div
            animate={pointerOffset}
            transition={POINTER_DEPTH.transition}
            className="h-full w-full"
          >
            <div className="h-full w-full motion-safe:md:animate-[cinematic-drift_10s_ease-in-out_infinite]">
              <img src="/hero.jpg" alt="Riviera Maya relocation lifestyle" className="h-full w-full object-cover" />
            </div>
          </motion.div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 motion-safe:md:animate-[cinematic-light_10s_ease-in-out_infinite]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(216,161,95,0.18), transparent 60%)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#f6f1e8]"></div>
        </div>

        <nav
          className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b px-4 py-4 backdrop-blur-md transition-colors duration-300 md:px-10 ${
            scrolled ? "border-zinc-200 bg-[#f6f1e8]/90" : "border-white/15 bg-black/35"
          }`}
        >
          <a
            href="#home"
            className={`text-[10px] font-semibold uppercase tracking-[0.35em] transition-colors duration-300 sm:text-xs ${
              scrolled ? "text-zinc-950" : "text-white/90"
            }`}
          >
            Path To Mexico
          </a>

          <div
            className={`hidden gap-8 text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 lg:flex ${
              scrolled ? "text-zinc-500" : "text-white/65"
            }`}
          >
            {t.nav.map((item, index) => (
              <a
                key={item}
                href={navLinks[index]}
                className={`transition duration-300 ${scrolled ? "hover:text-zinc-950" : "hover:text-white"}`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition duration-300 ${
                scrolled
                  ? "border-zinc-300 text-zinc-700 hover:bg-zinc-950 hover:text-white"
                  : "border-white/25 text-white hover:bg-white hover:text-black"
              }`}
            >
              {lang === "en" ? "ES" : "EN"}
            </button>

            <button
              ref={menuTriggerRef}
              onClick={() => setMenuOpen(true)}
              onMouseDown={(event) => event.preventDefault()}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className={`text-[10px] font-semibold uppercase tracking-[0.3em] transition-colors duration-300 lg:hidden ${
                scrolled ? "text-zinc-950" : "text-white"
              }`}
            >
              Menu
            </button>
          </div>
        </nav>

        <div
          className={`fixed inset-0 z-[60] flex flex-col bg-[#0b0b0a] transition-all duration-500 ease-out lg:hidden ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0 pointer-events-none"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
        >
          <div className="flex items-center justify-between px-4 py-4 md:px-10">
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/90 sm:text-xs">
              Path To Mexico
            </span>

            <button
              onClick={() => setMenuOpen(false)}
              onMouseDown={(event) => event.preventDefault()}
              aria-label="Close menu"
              tabIndex={menuOpen ? 0 : -1}
              className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white transition hover:text-white/70"
            >
              Close
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-7 px-8 pb-20">
            {t.nav.map((item, index) => (
              <a
                key={item}
                ref={index === 0 ? firstMenuLinkRef : null}
                href={navLinks[index]}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
                className="group flex items-baseline gap-5"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-['Cormorant_Garamond'] text-4xl font-light leading-none tracking-[-0.03em] text-white/90 transition group-hover:text-white sm:text-5xl">
                  {item}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div id="main-content" className="relative z-10 flex min-h-[100svh] items-center px-6 pb-24 pt-32 md:px-16 md:pb-28 md:pt-28">
          <motion.div initial="hidden" animate="show" variants={heroStagger} className="max-w-5xl">
            <motion.p
              variants={heroFadeUp}
              className="mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-white/55 sm:mb-10"
            >
              <span>{t.heroLocation}</span>
              <span className="h-px w-8 bg-white/30" aria-hidden="true"></span>
              <span className="text-white/40">{t.heroSignal}</span>
            </motion.p>

            <motion.h1
              variants={heroFadeUp}
              className="max-w-5xl text-[2.75rem] font-light leading-[1.04] tracking-[-0.03em] sm:text-7xl sm:leading-[0.97] sm:tracking-[-0.05em] md:text-8xl lg:text-9xl lg:tracking-[-0.06em]"
            >
              {t.heroTitle}
            </motion.h1>

            <motion.p
              variants={heroFadeUp}
              className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:mt-9 sm:max-w-2xl sm:text-xl"
            >
              {t.heroSubtext}
            </motion.p>

            <motion.div
              variants={heroFadeUp}
              className="mt-10 flex flex-col items-start gap-5 sm:mt-14 sm:flex-row sm:items-center sm:gap-8"
            >
              <a
                href="/mexico-fit-call"
                className="bg-white px-9 py-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-zinc-950 transition duration-300 hover:bg-[#d8a15f]"
              >
                {t.start}
              </a>
              <a
                href="#relocation"
                className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-white/70 transition hover:text-white"
              >
                {t.explore}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="blueprint" className="bg-[#0b0b0a] px-6 py-20 text-center text-white md:py-28">
        <CinematicReveal className="mx-auto max-w-3xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            My Mexico Blueprint
          </p>
          <h2 className="mb-7 text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            See what your move to Mexico could actually look like.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            Answer 6 quick questions and get your personalized city matches, readiness score, and
            30/60/90-day roadmap.
          </p>
          <a
            href="/my-mexico-blueprint"
            className="inline-block bg-white px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-950 transition duration-300 hover:bg-[#d8a15f]"
          >
            Build My Mexico Blueprint
          </a>
          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-white/40">
            Free &middot; Takes About 2 Minutes
          </p>
        </CinematicReveal>
      </section>

      <section id="relocation" className="bg-[#f6f1e8] px-6 py-20 md:px-20 md:py-28">
        <SectionHeader label={t.servicesLabel} title={t.servicesTitle} text={t.servicesText} />
      </section>

      <section id="services" className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
        <CinematicReveal stagger className="mx-auto grid max-w-6xl gap-px bg-zinc-300 md:grid-cols-3">
          {t.services.map(([title, text]) => (
            <motion.div
              key={title}
              variants={CinematicReveal.itemVariants(prefersReducedMotion)}
              whileHover={{ y: -6 }}
              className="bg-[#efe7d8] p-8 transition hover:bg-white"
            >
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
                key={title}
                variants={CinematicReveal.itemVariants(prefersReducedMotion)}
                whileHover={{ y: -6 }}
                className={`flex min-h-[500px] flex-col justify-between p-7 transition ${
                  isPrimary ? "bg-zinc-950 text-white hover:bg-zinc-900" : "bg-white text-zinc-950 hover:bg-[#f6f1e8]"
                }`}
              >
                <div>
                  {isPrimary && (
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
                      Start Here
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
              key={title}
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
        <SectionHeader label={t.testimonialsLabel} title={`${t.testimonialsTitle1} ${t.testimonialsTitle2}`} />

        <CinematicReveal stagger className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
          {t.testimonials.map(([quote, name]) => (
            <motion.div
              key={quote}
              variants={CinematicReveal.itemVariants(prefersReducedMotion)}
              className="border border-zinc-200 bg-white/70 p-8 shadow-sm transition hover:bg-white"
            >
              <p className="mb-8 text-lg leading-relaxed text-zinc-700">“{quote}”</p>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">{name}</p>
            </motion.div>
          ))}
        </CinematicReveal>
      </section>

      <section id="about" className="bg-[#f6f1e8] px-6 py-20 md:px-20 md:py-28">
        <CinematicReveal className="mx-auto grid max-w-6xl gap-12 border-t border-zinc-300 pt-12 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.founderLabel}</p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.founderTitle}</h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-zinc-600 sm:text-xl">{t.founderIntro}</p>

            <div className="mt-10 max-w-sm overflow-hidden border border-zinc-200 bg-white p-3 shadow-sm">
              <img src="/kalen.jpg" alt="Kalen Enns, founder of Path To Mexico" loading="lazy" className="aspect-[4/5] h-full w-full object-cover" />
            </div>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-zinc-600">
            {t.founderParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <p className="pt-4 text-3xl font-light leading-tight tracking-[-0.04em] text-zinc-950 md:text-5xl">
              {t.founderQuote}
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
          {t.network.map((item) => (
            <motion.div
              key={item}
              variants={CinematicReveal.itemVariants(prefersReducedMotion)}
              className="border border-zinc-200 bg-white p-8 text-lg text-zinc-700 transition hover:bg-[#f6f1e8]"
            >
              {item}
            </motion.div>
          ))}
        </CinematicReveal>
      </section>

      <section id="trust" className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
        <SectionHeader label={t.trustLabel} title={t.trustTitle} />

        <CinematicReveal stagger className="mx-auto mt-14 grid max-w-6xl gap-px bg-zinc-300 sm:grid-cols-2 lg:grid-cols-4">
          {t.trustPoints.map((point) => (
            <motion.div
              key={point}
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
            {t.tags.map((item) => (
              <span key={item} className="border border-zinc-300 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-zinc-600 transition hover:bg-zinc-950 hover:text-white">
                {item}
              </span>
            ))}
          </div>
        </CinematicReveal>
      </section>

      <section id="faq" className="bg-white px-6 py-20 md:px-20 md:py-28">
        <SectionHeader label={t.faqLabel} title={t.faqTitle} />

        <CinematicReveal stagger className="mx-auto mt-14 grid max-w-6xl gap-px bg-zinc-300 md:grid-cols-2">
          {t.faqs.map(([question, answer]) => (
            <motion.div
              key={question}
              variants={CinematicReveal.itemVariants(prefersReducedMotion)}
              className="bg-white p-7 transition hover:bg-[#f6f1e8]"
            >
              <h3 className="mb-4 text-2xl font-medium tracking-[-0.03em]">{question}</h3>
              <p className="leading-relaxed text-zinc-600">{answer}</p>
            </motion.div>
          ))}
        </CinematicReveal>
      </section>

      <section id="contact" ref={contactRef} className="bg-[#0b0b0a] px-6 py-20 text-center text-white md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">{t.contactLabel}</p>
          <h2 className="mb-7 text-4xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.contactTitle}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">{t.contactText}</p>

          <LeadForm t={t} />

          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href="https://wa.me/16043154625?text=Hi%20Kalen,%20I%20found%20Path%20To%20Mexico%20and%20would%20love%20to%20learn%20more%20about%20moving%20to%20Mexico."
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-white/30 px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
            >
              Prefer WhatsApp? Message Directly
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
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950 text-2xl text-white shadow-2xl transition-all duration-300 ${
          nearContact || menuOpen ? "pointer-events-none scale-75 opacity-0" : "opacity-100 hover:scale-110"
        }`}
      >
        💬
      </a>

      <section id="disclaimer" className="bg-[#f6f1e8] px-6 py-12 text-zinc-950 md:px-20">
        <div className="mx-auto max-w-6xl border-t border-zinc-300 pt-8">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">Important Note</p>
          <p className="max-w-4xl text-sm leading-relaxed text-zinc-600">
            Path To Mexico provides relocation guidance, local insight, and trusted introductions. We are not a law firm, immigration agency, tax advisor, financial advisor, or real estate brokerage. Legal, immigration, tax, financial, and real estate services are provided by independent qualified professionals where appropriate.
          </p>
        </div>
      </section>

      <footer className="bg-zinc-950 px-8 py-14 text-center text-sm text-zinc-500">
        <p className="text-xs uppercase tracking-[0.38em] text-zinc-200">PATH TO MEXICO</p>
        <p className="mt-6 text-zinc-600">[ CIELO NUEVO ]</p>
        <p className="mt-6 italic text-zinc-400">{t.footerLine}</p>
        <p className="mt-6 text-zinc-600">{t.footer}</p>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-zinc-700">
          Not everyone is meant to stay where they started.
        </p>
      </footer>
    </main>
  );
}

export default HomePage;