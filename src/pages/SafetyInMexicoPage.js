import ArticleLayout from "../components/ArticleLayout";
import Section from "../components/ArticleSection";

function SafetyInMexicoPage() {
  return (
    <ArticleLayout
      title="Safety in Mexico"
      subtitle="A practical guide to safety, neighborhoods, transportation, scams, and everyday awareness for foreigners living in Mexico."
      category="2026 Guide"
    >
      <Section title="Overview">
        <p>
          One of the biggest concerns people have before moving to Mexico is safety. The reality is that Mexico is a large and diverse country, and safety varies greatly depending on the city, neighborhood, and your daily habits.
        </p>
      </Section>

      <Section title="Not All Of Mexico Is The Same">
        <p>
          Mexico cannot be painted with one brush. Some areas are extremely safe and peaceful, while others require much more caution.
        </p>
      </Section>

      <Section title="Everyday Awareness Matters">
        <p>
          Most safety comes down to common sense. Avoid flashing wealth, stay aware of your surroundings, and trust your intuition.
        </p>
      </Section>

      <Section title="Transportation">
        <p>
          Use reputable taxis, rideshare apps when available, and avoid unnecessary late-night travel in unfamiliar areas.
        </p>
      </Section>

      <Section title="Scams And Petty Crime">
        <p>
          Petty theft and scams exist everywhere. Stay alert, protect valuables, and avoid carrying large amounts of cash.
        </p>
      </Section>

      <Section title="Final Thoughts">
        <p>
          For many foreigners, Mexico feels safer than they expected. Building community, choosing the right neighborhood, and practicing good habits go a long way.
        </p>
      </Section>
    </ArticleLayout>
  );
}

export default SafetyInMexicoPage;
