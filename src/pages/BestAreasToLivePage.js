import ArticleLayout from "../components/ArticleLayout";
import ArticleSection from "../components/ArticleSection";

function BestAreasToLivePage() {
  return (
    <ArticleLayout
      category="Neighborhoods"
      title="Best Areas To Live In Playa Del Carmen"
      description="A practical guide to the neighborhoods, atmosphere, lifestyle, and communities that make Playa del Carmen one of the most desirable places to live in Mexico."
    >
      <ArticleSection title="Choosing The Right Area">
        <p>One of the best things about Playa del Carmen is that every neighborhood has its own personality.</p>
        <p>The right neighborhood depends on the kind of life you hope to build.</p>
      </ArticleSection>

      <ArticleSection title="Centro">
        <p>Centro is the heart of Playa del Carmen, with restaurants, cafés, shopping, nightlife, and the beach close by.</p>
      </ArticleSection>

      <ArticleSection title="Playacar">
        <p>Playacar is gated, green, polished, and popular with families, retirees, and people who want more calm.</p>
      </ArticleSection>

      <ArticleSection title="Zazil-Ha">
        <p>Zazil-Ha offers walkability, beach access, cafés, and a slightly calmer feel than Centro.</p>
      </ArticleSection>

      <ArticleSection title="Colosio">
        <p>Colosio offers more local atmosphere and often better value for larger spaces and lower rents.</p>
      </ArticleSection>

      <ArticleSection title="The Best Area Depends On You">
        <p>Some people value walkability. Others prioritize peace, community, affordability, or beach access.</p>
        <p>Spend time in different parts of Playa before committing to a long-term lease.</p>
      </ArticleSection>
    </ArticleLayout>
  );
}

export default BestAreasToLivePage;
