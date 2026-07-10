// Client Dashboard — a curated, realistic checklist of documents commonly
// needed for a Mexico relocation. Fully functional today (checked state is
// localStorage-backed, same pattern as My Mexico Plan's tasks) — a document
// upload/storage backend is a documented future integration point, not a
// gap in what's built here.
export const DOCUMENT_CHECKLIST = [
  {
    id: "passport",
    title: "Valid passport (6+ months remaining)",
    note: "The single most common thing that quietly delays a move.",
  },
  {
    id: "birth-certificate",
    title: "Birth certificate (apostilled)",
    note: "Needed for most residency applications — the apostille step takes real time, start early.",
  },
  {
    id: "proof-of-income",
    title: "Proof of income or savings",
    note: "Recent bank statements or pay stubs covering the last several months.",
  },
  {
    id: "marriage-certificate",
    title: "Marriage certificate, if applicable",
    note: "Needed if applying as a couple or including a spouse on residency.",
  },
  {
    id: "passport-photos",
    title: "Passport-style photos",
    note: "Mexican consulates and INM often have specific size and background requirements.",
  },
  {
    id: "criminal-background-check",
    title: "Criminal background check",
    note: "Some residency tracks require this from your home country, apostilled.",
  },
  {
    id: "proof-of-address",
    title: "Proof of address (home country)",
    note: "A recent utility bill or bank statement usually works.",
  },
  {
    id: "health-records",
    title: "Medical and vaccination records",
    note: "Useful for registering with a new doctor — not usually required for residency itself.",
  },
];
