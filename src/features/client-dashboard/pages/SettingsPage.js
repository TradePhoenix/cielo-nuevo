import { useEffect, useRef } from "react";
import ClientDashboardLayout from "../components/ClientDashboardLayout";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import ToggleSwitch from "../components/ToggleSwitch";
import { useClientDashboardTheme } from "../components/ThemeContext";
import { useSettingsState } from "../hooks/useSettingsState";
import SEO from "../../../components/SEO";

function SettingsContent() {
  const headingRef = useRef(null);
  const { isDark } = useClientDashboardTheme();
  const { settings, toggleNotification, togglePrivacy, setLanguage, setTheme } = useSettingsState();

  useEffect(() => {
    if (headingRef.current) headingRef.current.focus();
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <SEO
        title="Settings"
        description="Notification preferences, language, appearance, and privacy settings."
        path="/client-dashboard/settings"
      />
      <PageHeader
        eyebrow="Settings"
        title="Make it yours."
        description="Control how and when we reach you, which language you'd like to use, and how your dashboard looks."
        headingRef={headingRef}
      />

      <div className="mt-10 grid grid-cols-1 gap-6">
        <SectionCard eyebrow="Notifications" title="How we reach you">
          <div className={`divide-y ${isDark ? "divide-zinc-800" : "divide-zinc-200"}`}>
            <ToggleSwitch
              checked={settings.notifications.email}
              onToggle={() => toggleNotification("email")}
              label="Email"
              description="Updates on your file, documents, and appointments."
            />
            <ToggleSwitch
              checked={settings.notifications.sms}
              onToggle={() => toggleNotification("sms")}
              label="SMS"
              description="Time-sensitive reminders sent by text."
            />
            <ToggleSwitch
              checked={settings.notifications.whatsapp}
              onToggle={() => toggleNotification("whatsapp")}
              label="WhatsApp"
              description="Message updates from your concierge and partners."
            />
          </div>
        </SectionCard>

        <SectionCard eyebrow="Language" title="Dashboard language">
          <select
            value={settings.language}
            onChange={(event) => setLanguage(event.target.value)}
            className={`w-full max-w-xs border px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] ${
              isDark ? "border-zinc-700 bg-zinc-900 text-white" : "border-zinc-300 bg-white text-zinc-950"
            }`}
          >
            <option>English</option>
            <option>Español</option>
          </select>
        </SectionCard>

        <SectionCard eyebrow="Appearance" title="Light or dark">
          <div className="flex gap-3">
            {["light", "dark"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTheme(option)}
                aria-pressed={settings.theme === option}
                className={`border px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
                  settings.theme === option
                    ? "border-[#d8a15f] bg-[#d8a15f] text-zinc-950"
                    : isDark
                    ? "border-zinc-700 text-white"
                    : "border-zinc-300 text-zinc-950"
                }`}
              >
                {option === "light" ? "Light" : "Dark"}
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard eyebrow="Privacy" title="Your data">
          <div className={`divide-y ${isDark ? "divide-zinc-800" : "divide-zinc-200"}`}>
            <ToggleSwitch
              checked={settings.privacy.shareProgressWithPartners}
              onToggle={() => togglePrivacy("shareProgressWithPartners")}
              label="Share progress with partners"
              description="Let your lawyer, realtor, and other partners see your checklist and timeline progress."
            />
            <ToggleSwitch
              checked={settings.privacy.allowMarketingEmails}
              onToggle={() => togglePrivacy("allowMarketingEmails")}
              label="Marketing emails"
              description="Occasional guides and offers unrelated to your active move."
            />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// Routed /client-dashboard/settings
export default function SettingsPage() {
  return (
    <ClientDashboardLayout>
      <SettingsContent />
    </ClientDashboardLayout>
  );
}
