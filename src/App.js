import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

const content = {
  en: {
    nav: ["Home", "Relocation", "Process", "Trust", "FAQ", "Contact"],
    heroLocation: "Riviera Maya • Mexico",
    heroTitle: "PATH TO MEXICO",
    heroSignal: "[ CIELO NUEVO ]",
    heroHook1: "Some people visit Mexico.",
    heroHook2: "Others disappear into a better life.",
    heroSubtext:
      "Most people think they want a new country. What they really want is distance from a life that no longer feels like their own. Mexico just happens to be where many of them find it.",
    explore: "Enter The Signal",
    start: "Start The Conversation",

    manifestoLabel: "Before People Ask How",
    manifestoTitle: "A different country is rarely just about geography.",
    manifestoText:
      "People arrive searching for better weather, more space, lower costs, or a fresh start. What they often discover is something quieter: time, possibility, and the feeling that life can still change.",

    servicesTitle: "Relocation Without The Noise",
    servicesText:
      "Path To Mexico helps people step into life in Mexico through trusted local connections, real estate guidance, residency support, and grounded on-the-ground clarity.",
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
    heroTitle: "PATH TO MEXICO",
    heroSignal: "[ CIELO NUEVO ]",
    heroHook1: "Algunas personas visitan México.",
    heroHook2: "Otras desaparecen hacia una vida mejor.",
    heroSubtext:
      "La mayoría cree que quiere un nuevo país. Lo que realmente busca es distancia de una vida que ya no se siente propia. México simplemente es donde muchos lo encuentran.",
    explore: "Entrar A La Señal",
    start: "Iniciar Conversación",

    manifestoLabel: "Antes De Preguntar Cómo",
    manifestoTitle: "Un país diferente casi nunca se trata solo de geografía.",
    manifestoText:
      "Las personas llegan buscando mejor clima, más espacio, menores costos o un nuevo comienzo. Lo que muchas veces descubren es algo más silencioso: tiempo, posibilidad y la sensación de que la vida todavía puede cambiar.",

    servicesTitle: "Reubicación Sin Ruido",
    servicesText:
      "Path To Mexico ayuda a las personas a entrar en la vida en México con conexiones locales confiables, guía inmobiliaria, apoyo de residencia y claridad real en el terreno.",
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
      <div className="rounded-none border border-white/10 bg-white p-8 text-center text-black shadow-xl">
        <h3 className="mb-4 text-3xl font-semibold tracking-tight">Message Sent</h3>
        <p className="text-zinc-600">{t.formSuccess}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-12 grid max-w-3xl gap-5 text-left">
      <input className="border border-white/20 bg-white px-5 py-4 text-black outline-none transition focus:border-white" type="text" name="name" placeholder="Full Name" required />
      <input className="border border-white/20 bg-white px-5 py-4 text-black outline-none transition focus:border-white" type="email" name="email" placeholder="Email Address" required />
      <ValidationError field="email" errors={state.errors} />

      <input className="border border-white/20 bg-white px-5 py-4 text-black outline-none transition focus:border-white" type="text" name="country" placeholder="Current Country" />
      <input className="border border-white/20 bg-white px-5 py-4 text-black outline-none transition focus:border-white" type="text" name="timeline" placeholder="Ideal Timeline" />

      <textarea className="min-h-36 border border-white/20 bg-white px-5 py-4 text-black outline-none transition focus:border-white" name="message" placeholder="What do you need help with?" required />
      <ValidationError field="message" errors={state.errors} />

      <button disabled={state.submitting} className="border border-white bg-white px-10 py-5 text-sm font-semibold uppercase tracking-[0.25em] text-black transition duration-300 hover:bg-transparent hover:text-white disabled:opacity-60">
        {state.submitting ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}

function App() {
  const [lang, setLang] = useState("en");
  const t = content[lang];

  return (
    <main className="min-h-screen bg-[#080807] text-zinc-100 scroll-smooth">
      <section id="home" className="relative min-h-screen overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600566752355-35792bedcfea"
            alt="Cinematic architectural passageway with shadow and warm light"
            className="h-full w-full scale-105 object-cover"
          />
          <div className="absolute inset-0 bg-black/72"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-[#080807]"></div>
          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_45%_20%,rgba(255,255,255,0.12),transparent_32%)]"></div>
        </div>

        <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/25 px-6 py-5 backdrop-blur-md md:px-10">
          <a href="#home" className="text-xs font-semibold uppercase tracking-[0.45em] text-white/80 transition hover:opacity-70">
            Path To Mexico
          </a>

          <div className="hidden gap-8 text-[10px] uppercase tracking-[0.3em] text-white/40 md:flex">
            <a className="transition hover:text-white" href="#home">{t.nav[0]}</a>
            <a className="transition hover:text-white" href="#relocation">{t.nav[1]}</a>
            <a className="transition hover:text-white" href="#process">{t.nav[2]}</a>
            <a className="transition hover:text-white" href="#trust">{t.nav[3]}</a>
            <a className="transition hover:text-white" href="#faq">{t.nav[4]}</a>
            <a className="transition hover:text-white" href="#contact">{t.nav[5]}</a>
          </div>

          <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 transition hover:bg-white hover:text-black">
            {lang === "en" ? "ES" : "EN"}
          </button>
        </nav>

        <div className="relative z-10 flex min-h-screen items-center px-6 pt-24 md:px-16">
          <motion.div initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, ease: "easeOut" }} className="max-w-6xl">
            <p className="mb-8 text-xs uppercase tracking-[0.55em] text-white/45">{t.heroLocation}</p>

            <p className="mb-8 text-xs uppercase tracking-[0.45em] text-white/60">{t.heroSignal}</p>

            <h1 className="max-w-6xl text-[4rem] font-medium uppercase leading-[0.85] tracking-[-0.08em] md:text-[10rem] lg:text-[13rem]">
              {t.heroTitle}
            </h1>

            <div className="mt-10 h-px w-32 bg-white/30"></div>

            <p className="mt-16 max-w-4xl text-3xl font-light leading-tight tracking-[-0.04em] text-white md:text-6xl">
              {t.heroHook1}
              <br />
              {t.heroHook2}
            </p>

            <p className="mt-10 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              {t.heroSubtext}
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a href="#relocation" className="border border-white bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-black transition duration-300 hover:bg-transparent hover:text-white">
                {t.explore}
              </a>
              <a href="#contact" className="border border-white/30 px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition duration-300 hover:border-white hover:bg-white hover:text-black">
                {t.start}
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 right-8 z-10 hidden text-right text-[10px] uppercase tracking-[0.35em] text-white/35 md:block">
          <p>Signal 001</p>
          <p>Riviera Maya</p>
        </div>
      </section>

      <section className="bg-[#080807] px-6 py-28 text-white md:px-20">
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="mx-auto grid max-w-6xl gap-12 border-t border-white/10 pt-16 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-white/40">{t.manifestoLabel}</p>
          </div>

          <div>
            <h2 className="mb-8 max-w-4xl text-4xl font-light leading-tight tracking-[-0.04em] md:text-7xl">
              {t.manifestoTitle}
            </h2>
            <p className="max-w-3xl text-xl leading-relaxed text-white/55">
              {t.manifestoText}
            </p>
          </div>
        </motion.div>
      </section>

      <section id="relocation" className="bg-[#f4f0e8] px-6 py-28 text-zinc-950 md:px-20">
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-zinc-500">The Practical Layer</p>
          <h2 className="mb-6 max-w-4xl text-5xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.servicesTitle}</h2>
          <p className="mb-16 max-w-3xl text-xl leading-relaxed text-zinc-600">{t.servicesText}</p>

          <div className="grid gap-px bg-zinc-300 md:grid-cols-3">
            {t.services.map(([title, text]) => (
              <motion.div key={title} whileHover={{ y: -6 }} className="bg-[#f4f0e8] p-8 transition hover:bg-white">
                <h3 className="mb-6 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
                <p className="leading-relaxed text-zinc-600">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="grid bg-[#e8e0d3] text-zinc-950 md:grid-cols-2">
        <div className="min-h-[620px] bg-[url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3')] bg-cover bg-center"></div>
        <motion.div initial={{ opacity: 0, x: 70 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="flex items-center px-6 py-24 md:px-20">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-zinc-500">{t.lifestyleLabel}</p>
            <h2 className="mb-8 text-5xl font-light leading-tight tracking-[-0.05em] md:text-7xl">{t.lifestyleTitle}</h2>
            <p className="mb-8 text-xl leading-relaxed text-zinc-600">{t.lifestyleText1}</p>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">{t.lifestyleText2}</p>
          </div>
        </motion.div>
      </section>

      <section id="process" className="bg-[#080807] px-6 py-28 text-white md:px-20">
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-white/40">{t.processLabel}</p>
          <h2 className="mb-16 max-w-5xl text-5xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.processTitle}</h2>

          <div className="grid gap-px bg-white/15 md:grid-cols-4">
            {t.process.map(([number, title, text]) => (
              <motion.div key={title} whileHover={{ y: -6 }} className="bg-[#080807] p-8 transition hover:bg-white hover:text-black">
                <p className="mb-10 text-xs font-semibold uppercase tracking-[0.35em] opacity-40">{number}</p>
                <h3 className="mb-5 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
                <p className="leading-relaxed opacity-60">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="trust" className="bg-[#f4f0e8] px-6 py-28 text-zinc-950 md:px-20">
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-zinc-500">{t.trustLabel}</p>
            <h2 className="text-5xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.trustTitle}</h2>
          </div>

          <div className="space-y-8 text-lg leading-relaxed text-zinc-600">
            <p>{t.trust1}</p>
            <p>{t.trust2}</p>
            <p className="border border-zinc-300 bg-white/50 p-8 text-zinc-700">{t.trust3}</p>
          </div>
        </motion.div>
      </section>

      <section className="bg-black px-6 py-24 text-white md:px-20">
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto grid max-w-6xl gap-px bg-white/15 text-center md:grid-cols-4">
          {t.stats.map(([big, small]) => (
            <div key={small} className="bg-black p-10">
              <h3 className="text-5xl font-light tracking-[-0.06em]">{big}</h3>
              <p className="mt-4 text-xs uppercase tracking-[0.35em] text-white/45">{small}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="bg-[#f4f0e8] px-6 py-28 text-zinc-950 md:px-20">
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto max-w-6xl">
          <h2 className="mb-8 max-w-5xl text-5xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.whoTitle}</h2>
          <p className="mb-14 max-w-3xl text-xl leading-relaxed text-zinc-600">{t.whoText}</p>

          <div className="flex flex-wrap gap-3">
            {t.tags.map((item) => (
              <span key={item} className="border border-zinc-300 px-5 py-3 text-xs uppercase tracking-[0.25em] text-zinc-600 transition duration-300 hover:bg-black hover:text-white">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="faq" className="bg-[#e8e0d3] px-6 py-28 text-zinc-950 md:px-20">
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto max-w-6xl">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-zinc-500">{t.faqLabel}</p>
          <h2 className="mb-14 text-5xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.faqTitle}</h2>

          <div className="grid gap-px bg-zinc-300 md:grid-cols-2">
            {t.faqs.map(([question, answer]) => (
              <div key={question} className="bg-[#e8e0d3] p-8 transition hover:bg-white">
                <h3 className="mb-4 text-2xl font-medium tracking-[-0.03em]">{question}</h3>
                <p className="leading-relaxed text-zinc-600">{answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="contact" className="bg-black px-6 py-28 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-white/40">Begin</p>
          <h2 className="mb-8 text-5xl font-light leading-tight tracking-[-0.05em] md:text-8xl">{t.contactTitle}</h2>
          <p className="mb-8 text-xl leading-relaxed text-white/60">{t.contactText}</p>

          <LeadForm t={t} />

          <a href="https://wa.me/16043154625" target="_blank" rel="noreferrer" className="mt-10 inline-block text-white/60 underline">
            Prefer WhatsApp? Message us directly.
          </a>
        </motion.div>
      </section>

      <a href="https://wa.me/16043154625" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-black shadow-2xl transition duration-300 hover:scale-110">
        💬
      </a>

      <footer className="bg-zinc-950 px-8 py-14 text-center text-sm text-zinc-500">
        <p className="text-xs uppercase tracking-[0.45em] text-zinc-200">PATH TO MEXICO</p>
        <p className="mt-6 text-zinc-600">[ CIELO NUEVO ]</p>
        <p className="mt-6 italic text-zinc-400">{t.footerLine}</p>
        <p className="mt-6 text-zinc-600">{t.footer}</p>
        <p className="mt-8 text-xs uppercase tracking-[0.35em] text-zinc-700">
          Some people visit. Others disappear.
        </p>
      </footer>
    </main>
  );
}

export default App;