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

function TemporaryResidencyPage() {
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
            2026 Guide • Residency
          </p>

          <h1 className="text-5xl font-light leading-[0.98] tracking-[-0.06em] md:text-8xl">
            Temporary Residency In Mexico Explained
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white/60">
            A practical guide for Canadians, Americans, retirees, remote workers, and families exploring life in Mexico.
          </p>
        </motion.div>
      </header>

      <article className="px-6 py-14 md:px-20 md:py-20">
        <div className="mx-auto max-w-4xl">

          <Section title="What Is Temporary Residency In Mexico?">
            <p>
              Temporary residency allows foreigners to legally live in Mexico for longer than a tourist stay.
            </p>

            <p>
              For many people, it becomes the bridge between simply visiting Mexico and truly building a life here.
            </p>

            <p>
              It is one of the most common pathways used by Canadians, Americans, retirees, entrepreneurs, remote workers, and families seeking a different rhythm of life.
            </p>
          </Section>

          <Section title="How Long Does Temporary Residency Last?">
            <p>
              Temporary residency usually begins with a one-year card.
            </p>

            <p>
              Renewals can extend your status for up to four years total, after which many residents become eligible for Permanent Residency.
            </p>

            <p>
              Permanent Residency allows you to remain in Mexico indefinitely without future renewals.
            </p>
          </Section>

          <Section title="How Do Most People Qualify?">
            <p>
              The most common path is financial solvency.
            </p>

            <p>
              Applicants typically qualify through savings, investments, pensions, employment income, rental income, or business income.
            </p>

            <p>
              Requirements vary between Mexican consulates, which is why obtaining current information is important.
            </p>
          </Section>

          <Section title="Where Does The Process Begin?">
            <p>
              Most applications begin at a Mexican consulate outside Mexico.
            </p>

            <p>
              After approval, a residency visa is placed in your passport.
            </p>

            <p>
              Once you arrive in Mexico, you complete the process and receive your Temporary Resident Card.
            </p>
          </Section>

          <Section title="Can I Work In Mexico?">
            <p>
              Temporary residency does not automatically grant work authorization.
            </p>

            <p>
              However, many foreigners living in Mexico earn income remotely, operate businesses, invest, or receive pensions.
            </p>
          </Section>

          <Section title="Can I Bring My Family?">
            <p>
              Yes.
            </p>

            <p>
              Couples and families relocate to Mexico every year.
            </p>

            <p>
              Mexico has become increasingly popular among retirees, remote workers, entrepreneurs, and families looking for a slower and more meaningful lifestyle.
            </p>
          </Section>

          <Section title="What Happens After Four Years?">
            <p>
              After four years, many temporary residents become eligible for Permanent Residency.
            </p>

            <p>
              Permanent Residency allows you to stay indefinitely and build deeper roots in Mexico.
            </p>
          </Section>

          <Section title="A Different Rhythm Of Life">
            <p>
              Temporary residency is ultimately about more than paperwork.
            </p>

            <p>
              People come to Mexico seeking more sunshine, more freedom, lower costs, and a slower pace of life.
            </p>

            <p>
              Mexico does not solve every problem, but for many people it creates enough space to begin again.
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

    </main>
  );
}

export default TemporaryResidencyPage;
