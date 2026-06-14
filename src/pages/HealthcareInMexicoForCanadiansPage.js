import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Section({ title, children }) {
  return (
    <section className="border-t border-zinc-300 py-10">
      <h2 className="mb-5 text-3xl font-light tracking-[-0.04em] text-zinc-950 md:text-5xl">
        {title}
      </h2>

      <div className="space-y-5 text-lg leading-relaxed text-zinc-700">
        {children}
      </div>
    </section>
  );
}

function HealthcareInMexicoForCanadiansPage() {
  return (
    <main className="min-h-screen bg-[#f4f0e8] text-zinc-950">

      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/50 px-4 py-4 backdrop-blur-md md:px-10">
        <Link to="/" className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/80">
          Path To Mexico
        </Link>

        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.25em] text-white/50">
          <Link to="/">Home</Link>
          <Link to="/guides">Guides</Link>
        </div>
      </nav>

      <header className="bg-[#080807] px-6 pb-20 pt-36 text-white md:px-20 md:pb-28 md:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-5xl"
        >

          <Link
            to="/guides"
            className="mb-10 inline-block text-xs uppercase tracking-[0.28em] text-white/45 transition hover:text-white"
          >
            ← Back To Guides
          </Link>

          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            2026 Guide • Healthcare
          </p>

          <h1 className="text-5xl font-light leading-[0.98] tracking-[-0.06em] md:text-8xl">
            Healthcare In Mexico For Canadians
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white/60">
            What Canadians should know about doctors, specialists, insurance, prescriptions, hospitals, and medical costs in Mexico.
          </p>
        </motion.div>
      </header>

      <article className="px-6 py-14 md:px-20 md:py-20">
        <div className="mx-auto max-w-4xl">

          <Section title="Is Healthcare In Mexico Good?">
            <p>
              One of the biggest concerns Canadians have before moving to Mexico is healthcare.
            </p>

            <p>
              The answer surprises many people. Mexico has excellent private healthcare, modern hospitals, and specialists available with far shorter wait times than many Canadians are used to.
            </p>

            <p>
              While experiences vary depending on location and the type of care needed, many expats describe healthcare as one of the unexpected advantages of life in Mexico.
            </p>
          </Section>

          <Section title="Public vs Private Healthcare">
            <p>
              Mexico has both public and private healthcare systems.
            </p>

            <p>
              Most foreigners choose private healthcare because it provides faster service, modern facilities, and English-speaking doctors in many areas.
            </p>

            <p>
              Public systems exist, but private care is often surprisingly affordable compared with Canada and the United States.
            </p>
          </Section>

          <Section title="Doctor Visits">
            <p>
              Routine appointments are generally easy to arrange.
            </p>

            <p>
              A visit with a general practitioner often costs between 600 and 1,500 pesos depending on the clinic and location.
            </p>

            <p>
              Same-day appointments are common, and wait times are usually far shorter than many Canadians expect.
            </p>
          </Section>

          <Section title="Specialists">
            <p>
              Access to specialists is one of the things many expats appreciate most.
            </p>

            <p>
              Dermatologists, cardiologists, urologists, orthopedists, and other specialists are widely available.
            </p>

            <p>
              Specialist consultations often range from 1,000 to 2,500 pesos.
            </p>
          </Section>

          <Section title="Prescriptions And Pharmacies">
            <p>
              Pharmacies are everywhere in Mexico.
            </p>

            <p>
              Many medications are inexpensive and easy to obtain. Chains like Farmacias del Ahorro and Farmacias Guadalajara are common throughout the country.
            </p>

            <p>
              Some medications that require prescriptions in Canada are easier to access in Mexico, although regulations vary.
            </p>
          </Section>

          <Section title="Dental Care">
            <p>
              Dental work is one reason many foreigners travel to Mexico.
            </p>

            <p>
              Cleanings, crowns, implants, and cosmetic procedures are often dramatically less expensive than in Canada.
            </p>

            <p>
              Many dentists are highly trained and modern clinics can be found in major cities and expat communities.
            </p>
          </Section>

          <Section title="Health Insurance">
            <p>
              Some expats purchase international insurance while others pay out of pocket for routine care and maintain emergency coverage.
            </p>

            <p>
              The right solution depends on age, health conditions, and personal risk tolerance.
            </p>

            <p>
              Many people use a combination of both approaches.
            </p>
          </Section>

          <Section title="Emergency Care">
            <p>
              Major cities and tourist areas have private hospitals capable of handling emergencies and complex procedures.
            </p>

            <p>
              For highly specialized cases, some residents travel to larger cities such as Cancun, Merida, Guadalajara, or Mexico City.
            </p>
          </Section>

          <Section title="A Pleasant Surprise">
            <p>
              Many Canadians arrive worried about healthcare and end up pleasantly surprised.
            </p>

            <p>
              Faster appointments, lower costs, and easy access to specialists often become some of the strongest reasons people decide to stay.
            </p>

            <p>
              Healthcare in Mexico is not perfect, but neither is healthcare anywhere else. What matters most is understanding your options and building a plan that fits your life.
            </p>
          </Section>

          <div className="mt-14 border border-zinc-300 bg-white p-8 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Thinking About Moving To Mexico?
            </p>

            <h2 className="mx-auto mb-5 max-w-2xl text-3xl font-light tracking-[-0.04em] md:text-5xl">
              You do not have to figure it out alone.
            </h2>

            <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-zinc-600">
              Path To Mexico helps individuals, couples, families, retirees, entrepreneurs, and remote workers navigate life in Mexico through trusted local resources and honest on-the-ground insight.
            </p>

            <a
              href="/#contact"
              className="inline-block border border-zinc-950 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white"
            >
              Start The Conversation
            </a>
          </div>


        </div>
      </article>

      <footer className="bg-zinc-950 px-8 py-14 text-center text-sm text-zinc-500">
        <p className="text-xs uppercase tracking-[0.38em] text-zinc-200">PATH TO MEXICO</p>
        <p className="mt-6 italic text-zinc-400">A different rhythm of life.</p>
        <p className="mt-6 text-zinc-600">Playa del Carmen • Riviera Maya • Mexico</p>
      </footer>


    </main>
  );
}

export default HealthcareInMexicoForCanadiansPage;