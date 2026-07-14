// Single logged-in partner. No auth exists yet (see CLAUDE.md), so the
// portal always renders as this one partner — the same pattern the client
// Dashboard uses for its own no-auth mock session.
export const MOCK_PARTNER = {
  id: "partner-001",
  name: "Mariana Castillo",
  photoUrl: "/hero.jpg",
  company: "Castillo Immigration Law",
  services: ["immigration_lawyer"],
  languages: ["Spanish", "English"],
  coverageArea: "Playa del Carmen, Tulum, Mexico City",
  businessHours: "Mon–Fri, 9:00 AM – 6:00 PM (Mexico City Time)",
  contact: {
    email: "mariana@castilloimmigrationlaw.mx",
    phone: "+52 984 555 0142",
  },
  website: "https://castilloimmigrationlaw.mx",
  emergencyAvailability: true,
};
