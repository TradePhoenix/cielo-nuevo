import ArticleLayout from "../components/ArticleLayout";
import Section from "../components/ArticleSection";

function GroceryCostsInMexicoPage() {
  return (
    <ArticleLayout
      title="Grocery Costs in Mexico"
      description="A practical guide to supermarkets, markets, imported foods, and realistic food budgets in Mexico."
      category="2026 Guide"
    >
      <Section title="Overview">
        <p>
          Grocery costs in Mexico vary depending on your lifestyle. Eating local foods and shopping wisely can make daily life surprisingly affordable.
        </p>
      </Section>

      <Section title="Major Supermarkets">
        <p>
          Walmart, Chedraui, Soriana, Mega, and Costco are popular options throughout Mexico.
        </p>
      </Section>

      <Section title="Local Markets">
        <p>
          Markets often offer fresh fruits, vegetables, meats, and spices at lower prices than supermarkets.
        </p>
      </Section>

      <Section title="Imported Products">
        <p>
          Imported foods and specialty items can cost considerably more. Many newcomers are surprised that familiar brands may carry a premium.
        </p>
      </Section>

      <Section title="Typical Budgets">
        <p>
          Couples can often spend far less than they would in Canada or the United States while maintaining a healthy and enjoyable diet.
        </p>
      </Section>

      <Section title="Final Thoughts">
        <p>
          Mexico offers tremendous flexibility. Your grocery bill depends far more on your habits than on the country itself.
        </p>
      </Section>
    </ArticleLayout>
  );
}

export default GroceryCostsInMexicoPage;
