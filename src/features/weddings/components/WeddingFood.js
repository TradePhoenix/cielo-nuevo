import CinematicReveal from "../../../components/CinematicReveal";

// V2 (jungle-only model) — food elevated from a catering line item to its
// own quiet editorial moment: where arranged through the participating
// Maya and local network, the meal is part of the gathering itself.
// Claims stay grounded: no invented menus, no "ancient recipe" language —
// the offering is built with the people who will cook it.
//
// image slot: foodPreparationDetail — hands at the comal, smoke, masa,
// the fire kitchen at the setting. Warm working photography, never
// styled-plate stock.
export default function WeddingFood({ t }) {
  return (
    <section className="bg-[#efe7d8] px-6 py-20 md:px-20 md:py-28">
      <CinematicReveal className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.label}</p>
          <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">{t.title}</h2>
        </div>
        <div className="space-y-6 border-l border-zinc-300 pl-6 text-lg leading-relaxed text-zinc-600 md:pl-10 md:text-xl">
          {t.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </CinematicReveal>
    </section>
  );
}
