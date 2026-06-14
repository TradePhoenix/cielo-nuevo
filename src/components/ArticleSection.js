function ArticleSection({ title, children }) {
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

export default ArticleSection;