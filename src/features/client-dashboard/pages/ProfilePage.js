import { useEffect, useRef, useState } from "react";
import ClientDashboardLayout from "../components/ClientDashboardLayout";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import { useClientDashboardTheme } from "../components/ThemeContext";
import { useProfileState } from "../hooks/useProfileState";
import { formatDate } from "../utils/formatters";
import SEO from "../../../components/SEO";

function Field({ label, name, value, onChange, type = "text" }) {
  const { isDark } = useClientDashboardTheme();
  return (
    <label className="block">
      <span className={`text-xs uppercase tracking-[0.15em] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-2 w-full border px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] ${
          isDark ? "border-zinc-700 bg-zinc-900 text-white" : "border-zinc-300 bg-white text-zinc-950"
        }`}
      />
    </label>
  );
}

function ProfileContent() {
  const headingRef = useRef(null);
  const { isDark } = useClientDashboardTheme();
  const { profile, updateProfile } = useProfileState();
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (headingRef.current) headingRef.current.focus();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile(draft);
    setSaved(true);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <SEO title="Profile" description="Your personal information, destination, timeline, and preferences." path="/client-dashboard/profile" />
      <PageHeader
        eyebrow="Profile"
        title="Your information, kept current."
        description="This is what your concierge and partners see. Keep it up to date so nothing gets lost in translation."
        headingRef={headingRef}
      />

      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-6">
        <SectionCard eyebrow="Personal Information" title="Who you are">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="First Name" name="firstName" value={draft.firstName} onChange={handleChange} />
            <Field label="Last Name" name="lastName" value={draft.lastName} onChange={handleChange} />
            <Field label="Email" name="email" type="email" value={draft.email} onChange={handleChange} />
            <Field label="Phone" name="phone" type="tel" value={draft.phone} onChange={handleChange} />
          </div>
        </SectionCard>

        <SectionCard eyebrow="Destination" title="Where you're headed">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="City" name="destinationCity" value={draft.destinationCity} onChange={handleChange} />
            <Field label="State" name="destinationState" value={draft.destinationState} onChange={handleChange} />
          </div>
        </SectionCard>

        <SectionCard eyebrow="Timeline" title="When you're moving">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Target Move Date" name="targetMoveDate" type="date" value={draft.targetMoveDate} onChange={handleChange} />
            <div>
              <span className={`text-xs uppercase tracking-[0.15em] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Member Since</span>
              <p className={`mt-2 py-2.5 text-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>{formatDate(draft.memberSince)}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard eyebrow="Household & Preferences" title="Who's moving with you">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Household" name="household" value={draft.household} onChange={handleChange} />
            <label className="block">
              <span className={`text-xs uppercase tracking-[0.15em] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                Preferred Language
              </span>
              <select
                name="languagePreference"
                value={draft.languagePreference}
                onChange={handleChange}
                className={`mt-2 w-full border px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] ${
                  isDark ? "border-zinc-700 bg-zinc-900 text-white" : "border-zinc-300 bg-white text-zinc-950"
                }`}
              >
                <option>English</option>
                <option>Español</option>
              </select>
            </label>
          </div>
        </SectionCard>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-zinc-950 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            Save Changes
          </button>
          {saved && <p className="text-xs uppercase tracking-[0.15em] text-emerald-600">Saved ✓</p>}
        </div>
      </form>
    </div>
  );
}

// Routed /client-dashboard/profile
export default function ProfilePage() {
  return (
    <ClientDashboardLayout>
      <ProfileContent />
    </ClientDashboardLayout>
  );
}
