import GuideCard from "../../../components/GuideCard";

/**
 * @param {import('../types/guide').GuideRecord[]} guides
 */
export default function RelatedGuides({ guides = [] }) {
  if (!guides.length) return null;

  return (
    <div>
      <p className="mb-6 text-xs uppercase tracking-[0.3em] text-zinc-500">Related Guides</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <GuideCard
            key={guide.id}
            category={guide.category?.label}
            title={guide.title}
            description={guide.description}
            href={guide.seo?.path || `/guides/${guide.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
