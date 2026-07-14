// Mock client profile — stands in for an authenticated session record.
// Swap for a real API response later; every field here is what a backend
// "me" endpoint would plausibly return.
export const CLIENT = {
  id: "client-001",
  firstName: "Avery",
  lastName: "Chen",
  fullName: "Avery Chen",
  email: "avery.chen@example.com",
  phone: "+1 (416) 555-0148",
  destinationCity: "Playa del Carmen",
  destinationState: "Quintana Roo",
  progressPercent: 58,
  currentStageId: "documents-uploaded",
  currentStageLabel: "Documents Uploaded",
  upcomingMilestone: {
    title: "Residency Consultation with Marisol Duarte",
    date: "2026-07-22",
    description: "A 45-minute video call to review your temporary residency application before it's filed.",
  },
  conciergeName: "Marisol Duarte",
  memberSince: "2026-02-10",
  household: "Moving with 1 partner, 1 dog",
  targetMoveDate: "2026-11-01",
  languagePreference: "English",
};
