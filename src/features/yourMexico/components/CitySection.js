// Shared eyebrow/heading/spacing rhythm for every City Detail story section.
// Keeps section markup declarative in each section component while
// guaranteeing consistent typography as more sections are added.
export default function CitySection({ eyebrow, title, children }) {
  return (
    <section className="mt-16 sm:mt-20">
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{eyebrow}</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-light leading-tight tracking-[-0.02em] sm:text-4xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
