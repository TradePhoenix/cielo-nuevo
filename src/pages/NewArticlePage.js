import ArticleLayout from "../components/ArticleLayout";
import ArticleSection from "../components/ArticleSection";

function NewArticlePage() {
  return (
    <ArticleLayout
      category="Whatever"
      title="Article Title"
      description="SEO description"
    >

      <ArticleSection title="First Section">

      </ArticleSection>

      <ArticleSection title="Second Section">

      </ArticleSection>

    </ArticleLayout>
  );
}

export default NewArticlePage;