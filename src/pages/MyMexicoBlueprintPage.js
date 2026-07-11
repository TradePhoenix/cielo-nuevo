import BlueprintApp from "../features/blueprint/BlueprintApp";
import SEO from "../components/SEO";

function MyMexicoBlueprintPage() {
  return (
    <>
      <SEO
        title="My Mexico Blueprint"
        description="A short questionnaire that turns your answers into a readiness score, matched cities, and a 30/60/90-day roadmap for moving to Mexico."
        path="/my-mexico-blueprint"
      />
      <BlueprintApp />
    </>
  );
}

export default MyMexicoBlueprintPage;
