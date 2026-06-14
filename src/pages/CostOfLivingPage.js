import ArticleLayout from "../components/ArticleLayout";
import ArticleSection from "../components/ArticleSection";

const costRows = [
  ["Studio Apartment", "12,000–18,000 MXN"],
  ["One Bedroom Condo", "15,000–25,000 MXN"],
  ["Two Bedroom Condo", "20,000–35,000 MXN"],
  ["Luxury Condo or House", "35,000+ MXN"],
];

function CostOfLivingPage() {
  return (
    <ArticleLayout
      category="Playa del Carmen"
      title="Cost Of Living In Playa Del Carmen"
      description="How much does it really cost to live in Playa del Carmen? Here is a grounded, human look at housing, groceries, utilities, healthcare, restaurants, and lifestyle."
    >
      <div className="mb-12 rounded-none border border-zinc-300 bg-white/55 p-6 text-zinc-700">
        <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">Quick Answer</p>
        <p className="mt-4 text-lg leading-relaxed">
          A simple lifestyle in Playa del Carmen may start around <strong>15,000–25,000 MXN per month</strong>.
          A comfortable lifestyle is often closer to <strong>25,000–45,000 MXN per month</strong>.
          A premium lifestyle can easily reach <strong>50,000–100,000+ MXN per month</strong>, especially near the beach.
        </p>
      </div>

      <ArticleSection title="How much does it really cost to live in Playa del Carmen?">
        <p>
          It is one of the first questions people ask before moving to Mexico, and the honest
          answer is that Playa del Carmen can be affordable, but it is not automatically cheap.
          The city has changed. It is no longer a hidden beach town where everything costs very little.
        </p>

        <p>
          Your cost of living depends heavily on how you choose to live. Someone renting a modest
          apartment away from the beach, shopping locally, walking often, and eating simple meals
          can live for much less than someone staying in a luxury condo, dining out every day,
          using air conditioning constantly, and treating Playa like a permanent vacation.
        </p>

        <p>
          The better question is not, “Is Playa del Carmen cheap?” The better question is,
          “What kind of life are you trying to build here?”
        </p>
      </ArticleSection>

      <ArticleSection title="Housing and rent">
        <p>
          Housing is usually the largest monthly expense. Long-term rentals are almost always better value
          than Airbnb, but prices vary depending on location, season, building quality, furniture,
          amenities, and distance from the beach.
        </p>

        <p>
          Areas closer to Fifth Avenue, Centro, Zazil-Ha, Gonzalo Guerrero, and the beach tend to cost more.
          Neighborhoods farther from the tourist center, such as Colosio or areas west of the highway,
          may offer more space and better value.
        </p>

        <div className="my-8 overflow-hidden border border-zinc-300">
          {costRows.map(([type, price]) => (
            <div key={type} className="grid grid-cols-2 border-b border-zinc-300 last:border-b-0">
              <div className="bg-white/60 p-4 font-medium">{type}</div>
              <div className="bg-[#f4f0e8] p-4 text-zinc-700">{price}</div>
            </div>
          ))}
        </div>

        <p>
          If you want a beautiful, modern apartment with a rooftop pool, security, elevator, gym,
          and a walkable location, expect to pay more. If you are flexible and willing to live farther
          from the beach, you can usually find better monthly pricing.
        </p>
      </ArticleSection>

      <ArticleSection title="Utilities">
        <p>
          Utilities are where many newcomers get surprised. Electricity can be reasonable if you use
          air conditioning lightly, but if you run AC all day and night, especially during hotter months,
          your bill can climb quickly.
        </p>

        <p>
          Typical monthly utility costs may look like this: electricity from 500–3,500 MXN depending on AC use,
          internet around 400–800 MXN, gas around 200–600 MXN, and water often included in rent.
        </p>

        <p>
          The quiet rule in Playa is simple: the more North American your indoor lifestyle feels,
          the more North American your utility bill may start to feel.
        </p>
      </ArticleSection>

      <ArticleSection title="Groceries">
        <p>
          Groceries can be affordable if you shop like you live in Mexico. Fresh fruit, vegetables,
          eggs, chicken, tortillas, rice, beans, seafood, and local staples are often good value.
        </p>

        <p>
          A single person may spend around 4,000–8,000 MXN per month on groceries. A couple may spend
          around 7,000–14,000 MXN depending on diet and cooking habits.
        </p>

        <p>
          Stores like Chedraui, Soriana, Walmart, Mega, and Sam’s Club are common options, while local
          produce shops and markets can help lower costs.
        </p>
      </ArticleSection>

      <ArticleSection title="Restaurants and dining out">
        <p>
          Playa del Carmen has a huge range of food options. You can eat street tacos for very little,
          enjoy casual local meals without spending much, or go to polished restaurants where prices
          feel closer to a major tourist city.
        </p>

        <p>
          Street tacos may cost around 20–40 MXN each. A casual local meal may be 120–250 MXN.
          A mid-range restaurant meal may run 250–500 MXN per person. A nice dinner for two can
          easily land around 700–1,500 MXN or more.
        </p>
      </ArticleSection>

      <ArticleSection title="Transportation">
        <p>
          Many people in Playa del Carmen do not need a car. Depending on where you live, you may be able
          to walk, bike, use taxis, take colectivos, or occasionally rent a vehicle for trips.
        </p>

        <p>
          Taxi rides around town commonly range from about 80–200 MXN depending on distance, time,
          and negotiation. ADO buses make it easy to travel to Cancun, Tulum, the airport, and other
          nearby destinations.
        </p>
      </ArticleSection>

      <ArticleSection title="Healthcare">
        <p>
          Healthcare is one of the areas where Mexico can feel like a relief, especially for Canadians
          used to long wait times. Private clinics, labs, dentists, pharmacies, and specialists are widely
          available in Playa del Carmen.
        </p>

        <p>
          A general doctor visit may cost around 600–1,500 MXN. Specialist appointments may range from
          1,000–2,500 MXN. Dental cleanings are often much less expensive than in Canada or the United States.
        </p>
      </ArticleSection>

      <ArticleSection title="Internet and remote work">
        <p>
          Playa del Carmen is popular with remote workers for a reason. Internet is generally reliable
          in many modern buildings, and fiber connections are common in better-equipped rentals.
        </p>

        <p>
          A typical internet plan may cost around 400–800 MXN per month. Remote workers should always
          ask for actual speed tests before signing a lease.
        </p>
      </ArticleSection>

      <ArticleSection title="Lifestyle and entertainment">
        <p>
          This is where Playa becomes personal. You can live quietly, walk to the beach, cook at home,
          swim in the sea, and spend very little on entertainment. Or you can spend heavily on beach clubs,
          cocktails, boutique gyms, spa treatments, weekend trips, and nightlife.
        </p>

        <p>
          The beautiful trap is that Playa makes life feel easier. Sunshine, restaurants, beaches, and
          convenience are always nearby. That is wonderful, but it also means your spending can quietly expand.
        </p>
      </ArticleSection>

      <ArticleSection title="Realistic monthly budgets">
        <p>
          For a budget lifestyle, estimate around 15,000–25,000 MXN per month. This usually means simple
          housing, local food, limited dining out, careful AC use, and a grounded daily rhythm.
        </p>

        <p>
          For a comfortable lifestyle, estimate around 25,000–45,000 MXN per month. This is realistic for
          many foreigners who want a decent apartment, restaurants, healthcare access, good internet, and
          room to enjoy life.
        </p>

        <p>
          For a premium lifestyle, estimate 50,000–100,000+ MXN per month.
        </p>
      </ArticleSection>

      <ArticleSection title="Is Playa del Carmen worth the cost?">
        <p>
          For many people, yes. But not because it is the cheapest place in Mexico. Playa del Carmen is worth
          it for people who want a blend of beach life, walkability, international community, access to services,
          strong internet, healthcare, restaurants, and a softer daily rhythm.
        </p>

        <p>
          Mexico will not magically solve your life. No country can do that. But the right environment can give
          you enough space to hear yourself again. For many people, that is the real reason Playa del Carmen becomes home.
        </p>
      </ArticleSection>
    </ArticleLayout>
  );
}

export default CostOfLivingPage;