// Trusted local partners a lead can be introduced to (immigration attorneys,
// real estate agents, etc.) — the CRM-side counterpart to the client-facing
// Trusted Partner Workspace in src/features/myMexicoPlan. Kept as its own
// mock table here rather than importing that feature's data, since the CRM
// needs partner records shaped for internal assignment (capacity, contact),
// not client-facing presentation copy.
export const PARTNERS = [
  { id: "pt_law_rivera", name: "Rivera & Asociados Immigration Law", category: "Immigration Attorney", city: "Playa del Carmen" },
  { id: "pt_realty_coastal", name: "Coastal Living Realty", category: "Real Estate Agent", city: "Tulum" },
  { id: "pt_property_maya", name: "Maya Property Management", category: "Property Manager", city: "Riviera Maya" },
  { id: "pt_tax_delgado", name: "Delgado Tax & Advisory", category: "Tax Advisor", city: "Playa del Carmen" },
  { id: "pt_moving_sunbelt", name: "Sunbelt International Movers", category: "Moving Company", city: "Riviera Maya" },
  { id: "pt_insurance_costa", name: "Costa Segura Insurance Brokers", category: "Insurance Broker", city: "Playa del Carmen" },
  { id: "pt_banking_nomad", name: "Nomad Banking Partners", category: "Banking Specialist", city: "Tulum" },
  { id: "pt_school_bright", name: "Bright Path School Placement", category: "School Placement Consultant", city: "Playa del Carmen" },
];

export function partnerById(id) {
  return PARTNERS.find((partner) => partner.id === id) || null;
}
