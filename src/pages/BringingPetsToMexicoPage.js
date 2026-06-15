import ArticleLayout from "../components/ArticleLayout";
import Section from "../components/ArticleSection";

function BringingPetsToMexicoPage() {
  return (
    <ArticleLayout
      title="Bringing Pets to Mexico"
      subtitle="A practical guide to bringing dogs and cats to Mexico, including documents, airline planning, rentals, vet care, and settling in."
      category="2026 Guide"
    >
      <Section title="Overview">
        <p>Bringing a pet to Mexico is very possible, but it requires planning. The biggest things to think about are travel documents, airline rules, pet-friendly housing, climate, and veterinary care once you arrive.</p>
      </Section>

      <Section title="Documents And Entry Requirements">
        <p>Before traveling, speak with your vet and confirm current entry requirements. Most people need proof of good health, vaccination records, and sometimes a health certificate depending on airline and country of departure.</p>
      </Section>

      <Section title="Flying With Pets">
        <p>Airlines have their own rules for cabin travel, cargo, carrier size, breeds, temperature restrictions, and booking limits. Always confirm directly with the airline before buying your ticket.</p>
      </Section>

      <Section title="Finding Pet-Friendly Rentals">
        <p>Not every rental in Mexico accepts pets. Some landlords allow small dogs or cats, while others may ask for an additional deposit. Be honest about your pet from the beginning to avoid problems later.</p>
      </Section>

      <Section title="Vet Care In Mexico">
        <p>Playa del Carmen, Tulum, Cancún, and Mérida all have veterinarians, pet shops, grooming services, and emergency options. Vet care is often more affordable than in Canada or the United States.</p>
      </Section>

      <Section title="Climate And Daily Life">
        <p>Mexico’s heat and humidity can be hard on pets, especially older animals or flat-faced breeds. Walk dogs early in the morning or later in the evening, keep water available, and watch for hot pavement.</p>
      </Section>

      <Section title="Final Thoughts">
        <p>With the right planning, bringing your pet to Mexico can be smooth. The key is preparing documents early, choosing the right airline, finding pet-friendly housing, and connecting with a good local vet once you arrive.</p>
      </Section>
    </ArticleLayout>
  );
}

export default BringingPetsToMexicoPage;
