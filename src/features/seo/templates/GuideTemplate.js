import GuideSEO from "../metadata/GuideSEO";
import Hero from "../components/Hero";
import Breadcrumbs from "../components/Breadcrumbs";
import StickyGuideNav from "../components/StickyGuideNav";
import TableOfContents from "../components/TableOfContents";
import QuickFacts from "../components/QuickFacts";
import ProsAndCons from "../components/ProsAndCons";
import ComparisonTable from "../components/ComparisonTable";
import ImageGallery from "../components/ImageGallery";
import FAQAccordion from "../components/FAQAccordion";
import ExternalResources from "../components/ExternalResources";
import AuthorSection from "../components/AuthorSection";
import LastUpdated from "../components/LastUpdated";
import ReadingTime from "../components/ReadingTime";
import RelatedGuides from "../components/RelatedGuides";
import RelatedCities from "../components/RelatedCities";
import RelatedServices from "../components/RelatedServices";
import GuideCTA from "../components/GuideCTA";
import { useReadingTime } from "../hooks/useReadingTime";
import { useTableOfContents } from "../hooks/useTableOfContents";
import { useRelatedContent } from "../hooks/useRelatedContent";

/**
 * The single composition engine every guide-type template delegates to.
 * A new guide page is authored as a GuideRecord (see types/guide.js) plus
 * a handful of section-visibility flags — nothing here is copy-pasted
 * per guide type, which is what keeps 13 guide types from becoming 13
 * divergent layouts. Per-type templates in this folder only set which of
 * the optional blocks apply and forward everything else.
 *
 * @param {import('../types/guide').GuideRecord} guide
 * @param {{guides?: import('../types/guide').GuideRecord[], cities?: import('../types/city').CityRecord[], services?: import('../types/service').ServiceRecord[]}} [catalogs]
 * @param {{showQuickFacts?: boolean, showProsAndCons?: boolean, showComparisonTable?: boolean, showGallery?: boolean, showRelatedCities?: boolean, showRelatedServices?: boolean, showStickyNav?: boolean}} [options]
 */
export default function GuideTemplate({ guide, catalogs = {}, options = {} }) {
  const {
    showQuickFacts = true,
    showProsAndCons = true,
    showComparisonTable = false,
    showGallery = false,
    showRelatedCities = false,
    showRelatedServices = true,
    showStickyNav = true,
  } = options;

  const toc = useTableOfContents(guide.sections);
  const readingMinutes = useReadingTime(guide.sections);
  const related = useRelatedContent(guide, catalogs);

  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Guides", path: "/guides" },
    ...(guide.category?.href ? [{ label: guide.category.label, path: guide.category.href }] : []),
    { label: guide.title, path: guide.seo?.path || `/guides/${guide.slug}` },
  ];

  return (
    <main className="min-h-screen bg-[#f4f0e8] text-zinc-950">
      <GuideSEO guide={guide} breadcrumbs={breadcrumbs} />

      <Hero eyebrow={guide.category?.label} title={guide.title} description={guide.description} heroImage={guide.heroImage} />

      {showStickyNav && <StickyGuideNav items={toc} />}

      <article className="px-6 py-14 md:px-20 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs crumbs={breadcrumbs} />

          <div className="mb-10 flex flex-wrap items-center gap-6">
            <ReadingTime minutes={readingMinutes} />
            <LastUpdated updatedAt={guide.updatedAt} />
          </div>

          {toc.length > 0 && <div className="mb-12">{<TableOfContents items={toc} />}</div>}

          {showQuickFacts && Object.keys(guide.quickFacts || {}).length > 0 && (
            <div className="mb-12">
              <QuickFacts facts={guide.quickFacts} />
            </div>
          )}

          <div className="space-y-10 leading-relaxed text-zinc-700">
            {guide.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="mb-5 text-3xl font-light tracking-[-0.04em] text-zinc-950 md:text-4xl">
                  {section.heading}
                </h2>
                {(Array.isArray(section.body) ? section.body : [section.body]).map((paragraph, index) => (
                  <p key={index} className="mt-4 first:mt-0">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {showComparisonTable && guide.comparisonTable && (
            <div className="mt-14">
              <ComparisonTable {...guide.comparisonTable} />
            </div>
          )}

          {showProsAndCons && guide.prosAndCons && (
            <div className="mt-14">
              <ProsAndCons pros={guide.prosAndCons.pros} cons={guide.prosAndCons.cons} />
            </div>
          )}

          {showGallery && guide.galleryImages?.length > 0 && (
            <div className="mt-14">
              <ImageGallery images={guide.galleryImages} />
            </div>
          )}

          {guide.faqs?.length > 0 && (
            <div className="mt-14">
              <p className="mb-6 text-xs uppercase tracking-[0.3em] text-zinc-500">Frequently Asked Questions</p>
              <FAQAccordion faqs={guide.faqs} />
            </div>
          )}

          {guide.externalResources?.length > 0 && (
            <div className="mt-14">
              <ExternalResources resources={guide.externalResources} />
            </div>
          )}

          <div className="mt-14">
            <AuthorSection author={guide.author} />
          </div>

          {related.guides.length > 0 && (
            <div className="mt-14">
              <RelatedGuides guides={related.guides} />
            </div>
          )}

          {showRelatedCities && related.cities.length > 0 && (
            <div className="mt-14">
              <RelatedCities cities={related.cities} />
            </div>
          )}

          {showRelatedServices && related.services.length > 0 && (
            <div className="mt-14">
              <RelatedServices services={related.services} />
            </div>
          )}
        </div>
      </article>

      <GuideCTA />
    </main>
  );
}
