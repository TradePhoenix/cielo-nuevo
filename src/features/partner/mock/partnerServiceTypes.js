// The 14 supported partner categories. Kept as a single ordered source of
// truth — the profile page, client "assigned services" chips, and the
// analytics service-mix widget all read from this list rather than each
// hardcoding their own copy of it.
export const PARTNER_SERVICE_TYPES = [
  { id: "immigration_lawyer", label: "Immigration Lawyer" },
  { id: "realtor", label: "Realtor" },
  { id: "insurance_advisor", label: "Insurance Advisor" },
  { id: "mortgage_broker", label: "Mortgage Broker" },
  { id: "accountant", label: "Accountant" },
  { id: "doctor", label: "Doctor" },
  { id: "dentist", label: "Dentist" },
  { id: "property_manager", label: "Property Manager" },
  { id: "contractor", label: "Contractor" },
  { id: "mover", label: "Mover" },
  { id: "car_dealer", label: "Car Dealer" },
  { id: "banking_partner", label: "Banking Partner" },
  { id: "internet_provider", label: "Internet Provider" },
  { id: "concierge_service", label: "Concierge Service" },
];

export function serviceLabel(serviceId) {
  return PARTNER_SERVICE_TYPES.find((service) => service.id === serviceId)?.label || serviceId;
}
