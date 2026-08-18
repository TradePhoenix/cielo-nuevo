import CinematicReveal from "../../../components/CinematicReveal";

// Section 6 — optional wellness, deliberately the quietest moment on the
// page: a single centered column, the offerings as one slow serif line
// separated by soft middots, generous air on every side. Positioned as an
// optional layer around the ceremony, never the product. The note is a
// hard requirement: wellness is never framed as medical treatment, no
// outcomes are promised, and licensed healthcare stays separate.
//
// image slot: wellnessQuietDetail — steam, water on stone, forest shade,
// hands — one muted full-width detail could sit beneath the list later.
export default function WeddingWellness({ t }) {
  return (
    <section className="bg-[#f6f1e8] px-6 py-24 md:py-36">
      <CinematicReveal className="mx-auto max-w-3xl text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">{t.label}</p>
        <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">{t.title}</h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-zinc-600">{t.text}</p>

        <p className="mx-auto mt-14 max-w-md text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          {t.itemsLead}
        </p>
        <p className="ptm-editorial mx-auto mt-8 max-w-2xl text-2xl leading-[1.8] text-zinc-800 md:text-3xl md:leading-[1.8]">
          {t.items.map((item, index) => (
            <span key={index}>
              <span className="inline-block">{item}</span>
              {index < t.items.length - 1 && <span aria-hidden="true" className="mx-3 text-[#e36f4f]">·</span>}
            </span>
          ))}
        </p>

        <p className="mx-auto mt-14 max-w-xl border-t border-zinc-300 pt-8 text-sm leading-relaxed text-zinc-500">
          {t.note}
        </p>
      </CinematicReveal>
    </section>
  );
}
