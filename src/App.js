import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

const content = {
  en: {
    nav: ["Home", "Relocation", "Process", "Trust", "FAQ", "Contact"],
    heroLocation: "Riviera Maya • Mexico",
    heroTitle: "Cielo Nuevo",
    heroHook1: "Some people visit Mexico.",
    heroHook2: "Others disappear into a better life.",
    heroSubtext:
      "Path To Mexico helps people transition into a new rhythm of life through trusted local connections, lifestyle guidance, and on-the-ground support in Playa del Carmen.",
    explore: "Explore Mexico",
    start: "Start The Conversation",

    servicesTitle: "Relocating Made Simple",
    servicesText:
      "We help people transition into life in Mexico through local connections, real estate guidance, residency assistance, and concierge-style support.",
    services: [
      ["Relocation Guidance", "Step-by-step support for settling into Playa del Carmen with confidence."],
      ["Real Estate Connections", "Trusted introductions for rentals, condos, investment properties, and local opportunities."],
      ["Residency Support", "Guidance toward the right professionals for residency, paperwork, and local setup."]
    ],

    lifestyleLabel: "Riviera Maya Living",
    lifestyleTitle: "A Softer Landing Into A Bigger Life",
    lifestyleText1:
      "Relocating is more than finding a place to stay. It is understanding neighborhoods, lifestyle, timing, paperwork, people, and the quiet details that make a new country feel like home.",
    lifestyleText2: "A different rhythm of life.",

    processLabel: "How It Works",
    processTitle: "From First Conversation To Feeling Settled",
    process: [
      ["01", "Talk", "We start with your goals, budget, timeline, and what kind of life you want in Mexico."],
      ["02", "Plan", "We map out your best relocation path, including neighborhoods, rentals, residency, and priorities."],
      ["03", "Connect", "We introduce you to trusted local professionals, agents, and service providers."],
      ["04", "Settle", "You arrive with more clarity, fewer surprises, and people already on the ground."]
    ],

    trustLabel: "Trust & Clarity",
    trustTitle: "Not everyone is meant to stay where they started.",
    trust1:
      "Cielo Nuevo acts as a trusted connector and relocation guide, helping you find the right people, places, and next steps in Playa del Carmen.",
    trust2:
      "For legal, immigration, tax, and real estate transactions, we connect clients with qualified local professionals so each step is handled properly.",
    trust3:
      "Simple promise: clearer options, better introductions, and a smoother landing in Mexico.",

    stats: [
      ["100+", "Conversations"],
      ["Playa", "Local Focus"],
      ["24/7", "Guidance"],
      ["Real", "Connections"]
    ],

    whoTitle: "Built For People Ready For A Different Life",
    whoText:
      "Whether you are coming from Canada, the United States, or somewhere else, Cielo Nuevo helps you understand your options and connect with the right people on the ground.",
    tags: ["Canadians", "Americans", "Digital Nomads", "Retirees", "Investors", "Families", "Remote Workers", "Freedom Seekers"],

    faqLabel: "Common Questions",
    faqTitle: "Before You Make The Move",
    faqs: [
      ["Do you only help Canadians?", "No. We mainly support Canadians and Americans, but we can help people from anywhere explore relocation to Playa del Carmen."],
      ["Do you sell real estate directly?", "We connect people with trusted local professionals. For legal contracts and real estate transactions, clients work with qualified experts."],
      ["Can you help with residency?", "Yes. We can help you understand the general path and connect you with the right professionals for immigration and paperwork."],
      ["Is this only for retirees?", "No. We support retirees, investors, remote workers, digital nomads, families, and people looking for a different lifestyle."]
    ],

    contactTitle: "Tell Us What You’re Looking For",
    contactText:
      "Send a few details and we’ll help you understand the best path toward relocation, lifestyle, real estate, and opportunity in Playa del Carmen.",
    formSuccess: "Thanks — your inquiry was sent. We’ll be in touch soon.",
    footerLine: "A different rhythm of life.",
    footer: "Playa del Carmen • Riviera Maya • Mexico"
  },

  es: {
    nav: ["Inicio", "Reubicación", "Proceso", "Confianza", "FAQ", "Contacto"],
    heroLocation: "Riviera Maya • México",
    heroTitle: "Cielo Nuevo",
    heroHook1: "Algunas personas visitan México.",
    heroHook2: "Otras desaparecen hacia una vida mejor.",
    heroSubtext:
      "Path To Mexico ayuda a las personas a entrar en un nuevo ritmo de vida con conexiones locales confiables, orientación de estilo de vida y apoyo real en Playa del Carmen.",
    explore: "Explorar México",
    start: "Iniciar Conversación",

    servicesTitle: "Mudarse De Forma Más Simple",
    servicesText:
      "Ayudamos a las personas a comenzar su vida en México con conexiones locales, guía inmobiliaria, apoyo de residencia y asistencia tipo concierge.",
    services: [
      ["Guía De Reubicación", "Apoyo paso a paso para establecerte en Playa del Carmen con confianza."],
      ["Conexiones Inmobiliarias", "Introducciones confiables para rentas, condominios, propiedades de inversión y oportunidades locales."],
      ["Apoyo De Residencia", "Orientación hacia profesionales adecuados para residencia, documentos y trámites locales."]
    ],

    lifestyleLabel: "Vida En La Riviera Maya",
    lifestyleTitle: "Una Llegada Más Suave A Una Vida Más Grande",
    lifestyleText1:
      "Mudarse es más que encontrar un lugar para vivir. Es entender zonas, estilo de vida, tiempos, documentos, personas y los detalles que hacen que un nuevo país se sienta como hogar.",
    lifestyleText2: "Un ritmo de vida diferente.",

    processLabel: "Cómo Funciona",
    processTitle: "De La Primera Conversación A Sentirte Establecido",
    process: [
      ["01", "Hablar", "Empezamos con tus metas, presupuesto, tiempo y el tipo de vida que quieres en México."],
      ["02", "Planear", "Diseñamos tu mejor camino de reubicación: zonas, rentas, residencia y prioridades."],
      ["03", "Conectar", "Te presentamos profesionales locales, agentes y proveedores de confianza."],
      ["04", "Establecerte", "Llegas con más claridad, menos sorpresas y personas listas para ayudarte."]
    ],

    trustLabel: "Confianza & Claridad",
    trustTitle: "No todos están destinados a quedarse donde empezaron.",
    trust1:
      "Cielo Nuevo funciona como guía y conector confiable para ayudarte a encontrar las personas, lugares y próximos pasos adecuados en Playa del Carmen.",
    trust2:
      "Para temas legales, migratorios, fiscales e inmobiliarios, conectamos a los clientes con profesionales locales calificados.",
    trust3:
      "Promesa simple: opciones más claras, mejores conexiones y una llegada más tranquila a México.",

    stats: [
      ["100+", "Conversaciones"],
      ["Playa", "Enfoque Local"],
      ["24/7", "Guía"],
      ["Real", "Conexiones"]
    ],

    whoTitle: "Hecho Para Personas Listas Para Una Vida Diferente",
    whoText:
      "Ya vengas de Canadá, Estados Unidos u otro lugar, Cielo Nuevo te ayuda a entender tus opciones y conectar con las personas correctas en el terreno.",
    tags: ["Canadienses", "Americanos", "Nómadas Digitales", "Jubilados", "Inversionistas", "Familias", "Trabajadores Remotos", "Buscadores De Libertad"],

    faqLabel: "Preguntas Comunes",
    faqTitle: "Antes De Mudarte",
    faqs: [
      ["¿Solo ayudan a canadienses?", "No. Principalmente apoyamos a canadienses y estadounidenses, pero podemos ayudar a personas de cualquier lugar."],
      ["¿Venden bienes raíces directamente?", "Conectamos a las personas con profesionales locales confiables. Para contratos y transacciones, los clientes trabajan con expertos calificados."],
      ["¿Pueden ayudar con residencia?", "Sí. Podemos ayudarte a entender el camino general y conectarte con profesionales adecuados."],
      ["¿Es solo para jubilados?", "No. Apoyamos jubilados, inversionistas, trabajadores remotos, nómadas digitales, familias y personas buscando otro estilo de vida."]
    ],

    contactTitle: "Cuéntanos Qué Estás Buscando",
    contactText:
      "Envía algunos detalles y te ayudaremos a entender el mejor camino hacia reubicación, estilo de vida, bienes raíces y oportunidad en Playa del Carmen.",
    formSuccess: "Gracias — tu consulta fue enviada. Te contactaremos pronto.",
    footerLine: "Un ritmo de vida diferente.",
    footer: "Playa del Carmen • Riviera Maya • México"
  }
};

function LeadForm({ t }) {
  const [state, handleSubmit] = useForm("xdabqdyq");

  if (state.succeeded) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center text-black shadow-xl">
        <h3 className="mb-4 text-3xl font-bold">Message Sent</h3>
        <p className="text-zinc-600">{t.formSuccess}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-12 grid max-w-3xl gap-5 text-left">
      <input className="rounded-2xl border border-white/20 bg-white px-5 py-4 text-black" type="text" name="name" placeholder="Full Name" required />
      <input className="rounded-2xl border border-white/20 bg-white px-5 py-4 text-black" type="email" name="email" placeholder="Email Address" required />
      <ValidationError field="email" errors={state.errors} />

      <input className="rounded-2xl border border-white/20 bg-white px-5 py-4 text-black" type="text" name="country" placeholder="Current Country" />
      <input className="rounded-2xl border border-white/20 bg-white px-5 py-4 text-black" type="text" name="timeline" placeholder="Ideal Timeline" />

      <textarea className="min-h-36 rounded-2xl border border-white/20 bg-white px-5 py-4 text-black" name="message" placeholder="What do you need help with?" required />
      <ValidationError field="message" errors={state.errors} />

      <button disabled={state.submitting} className="rounded-full bg-white px-10 py-5 text-lg font-bold text-black transition duration-300 hover:scale-105 hover:bg-stone-200 disabled:opacity-60">
        {state.submitting ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}

function App() {
  const [lang, setLang] = useState("en");
  const t = content[lang];

  return (
    <main className="min-h-screen bg-stone-100 text-zinc-900 scroll-smooth">
      <section id="home" className="relative min-h-screen overflow-hidden text-white">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" alt="Mexico beach" className="h-full w-full object-cover scale-105" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/20 px-8 py-5 backdrop-blur-md">
          <a href="#home" className="text-2xl font-bold tracking-[0.25em] transition hover:opacity-70">CN</a>

          <div className="hidden gap-8 text-sm uppercase tracking-widest md:flex">
            <a href="#home">{t.nav[0]}</a>
            <a href="#relocation">{t.nav[1]}</a>
            <a href="#process">{t.nav[2]}</a>
            <a href="#trust">{t.nav[3]}</a>
            <a href="#faq">{t.nav[4]}</a>
            <a href="#contact">{t.nav[5]}</a>
          </div>

          <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-black">
            {lang === "en" ? "ES" : "EN"}
          </button>
        </nav>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="max-w-5xl">
            <p className="mb-6 text-sm uppercase tracking-[0.5em] text-white/70">{t.heroLocation}</p>

            <h1 className="text-7xl font-semibold leading-none md:text-[10rem]">
              {t.heroTitle}
            </h1>

            <p className="mx-auto mt-8 max-w-4xl text-2xl font-light leading-relaxed tracking-wide text-white/90 md:text-4xl">
              {t.heroHook1}
              <br />
              {t.heroHook2}
            </p>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed tracking-wide text-white/60 md:text-lg">
              {t.heroSubtext}
            </p>

            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <a href="#relocation" className="rounded-full bg-white px-10 py-5 text-lg font-semibold text-black transition duration-300 hover:scale-105 hover:bg-stone-200">{t.explore}</a>
              <a href="#contact" className="rounded-full border border-white px-10 py-5 text-lg font-semibold text-white transition duration-300 hover:bg-white hover:text-black">{t.start}</a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="relocation" className="bg-white px-6 py-24 md:px-20">
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">{t.servicesTitle}</h2>
          <p className="mb-14 max-w-3xl text-xl leading-relaxed text-zinc-600">{t.servicesText}</p>

          <div className="grid gap-6 md:grid-cols-3">
            {t.services.map(([title, text]) => (
              <motion.div key={title} whileHover={{ y: -10 }} className="rounded-3xl bg-stone-100 p-8 shadow-lg transition hover:shadow-2xl">
                <h3 className="mb-4 text-2xl font-bold">{title}</h3>
                <p className="leading-relaxed text-zinc-600">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="grid bg-stone-100 md:grid-cols-2">
        <div className="min-h-[520px] bg-[url('https://images.unsplash.com/photo-1519046904884-53103b34b206')] bg-cover bg-center"></div>
        <motion.div initial={{ opacity: 0, x: 70 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="flex items-center px-6 py-24 md:px-20">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-zinc-500">{t.lifestyleLabel}</p>
            <h2 className="mb-8 text-4xl font-bold md:text-6xl">{t.lifestyleTitle}</h2>
            <p className="mb-8 text-xl leading-relaxed text-zinc-600">{t.lifestyleText1}</p>
            <p className="text-lg leading-relaxed text-zinc-500">{t.lifestyleText2}</p>
          </div>
        </motion.div>
      </section>

      <section id="process" className="bg-white px-6 py-24 md:px-20">
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-zinc-500">{t.processLabel}</p>
          <h2 className="mb-14 text-4xl font-bold md:text-6xl">{t.processTitle}</h2>

          <div className="grid gap-6 md:grid-cols-4">
            {t.process.map(([number, title, text]) => (
              <motion.div key={title} whileHover={{ y: -8 }} className="rounded-3xl border border-zinc-200 p-8 transition hover:shadow-xl">
                <p className="mb-6 text-sm font-bold tracking-widest text-zinc-400">{number}</p>
                <h3 className="mb-4 text-2xl font-bold">{title}</h3>
                <p className="leading-relaxed text-zinc-600">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="trust" className="bg-stone-100 px-6 py-24 md:px-20">
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-zinc-500">{t.trustLabel}</p>
            <h2 className="text-4xl font-bold md:text-6xl">{t.trustTitle}</h2>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-zinc-600">
            <p>{t.trust1}</p>
            <p>{t.trust2}</p>
            <p className="rounded-2xl bg-white p-6 text-zinc-700 shadow-md">{t.trust3}</p>
          </div>
        </motion.div>
      </section>

      <section className="bg-black px-6 py-24 text-white md:px-20">
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto grid max-w-6xl gap-10 text-center md:grid-cols-4">
          {t.stats.map(([big, small]) => (
            <div key={small}>
              <h3 className="text-5xl font-bold">{big}</h3>
              <p className="mt-4 text-sm uppercase tracking-[0.3em] text-white/60">{small}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="bg-white px-6 py-24 md:px-20">
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">{t.whoTitle}</h2>
          <p className="mb-12 max-w-3xl text-xl leading-relaxed text-zinc-600">{t.whoText}</p>

          <div className="flex flex-wrap gap-4">
            {t.tags.map((item) => (
              <span key={item} className="rounded-full bg-stone-100 px-6 py-3 text-lg shadow-md transition duration-300 hover:scale-105 hover:shadow-xl">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="faq" className="bg-stone-100 px-6 py-24 md:px-20">
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-zinc-500">{t.faqLabel}</p>
          <h2 className="mb-12 text-4xl font-bold md:text-6xl">{t.faqTitle}</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {t.faqs.map(([question, answer]) => (
              <div key={question} className="rounded-3xl bg-white p-8 shadow-md">
                <h3 className="mb-4 text-2xl font-bold">{question}</h3>
                <p className="leading-relaxed text-zinc-600">{answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="contact" className="bg-black px-6 py-28 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-5xl font-bold md:text-7xl">{t.contactTitle}</h2>
          <p className="mb-8 text-xl leading-relaxed text-white/70">{t.contactText}</p>

          <LeadForm t={t} />

          <a href="https://wa.me/16043154625" target="_blank" rel="noreferrer" className="mt-10 inline-block text-white/70 underline">
            Prefer WhatsApp? Message us directly.
          </a>
        </motion.div>
      </section>

      <a href="https://wa.me/16043154625" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-3xl text-white shadow-2xl transition duration-300 hover:scale-110">
        💬
      </a>

      <footer className="bg-zinc-950 px-8 py-10 text-center text-sm text-zinc-400">
        <p className="tracking-[0.35em] text-zinc-200">PATH TO MEXICO</p>
        <p className="mt-3 text-zinc-500">—</p>
        <p className="mt-3 italic">{t.footerLine}</p>
        <p className="mt-6">{t.footer}</p>
      </footer>
    </main>
  );
}

export default App;