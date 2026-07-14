import { useCallback, useState } from "react";
import { readState, writeState } from "../utils/storage";

const STORAGE_KEY = "pathToMexico.clientDashboard.settings.v1";
const STORAGE_VERSION = 1;

const DEFAULT_SETTINGS = {
  notifications: { email: true, sms: true, whatsapp: false },
  language: "English",
  theme: "light",
  privacy: { shareProgressWithPartners: true, allowMarketingEmails: false },
};

export function useSettingsState() {
  const [settings, setSettings] = useState(() => readState(STORAGE_KEY, STORAGE_VERSION, DEFAULT_SETTINGS));

  const persist = useCallback((next) => {
    setSettings(next);
    writeState(STORAGE_KEY, STORAGE_VERSION, next);
  }, []);

  const toggleNotification = useCallback(
    (channel) => {
      persist({ ...settings, notifications: { ...settings.notifications, [channel]: !settings.notifications[channel] } });
    },
    [settings, persist]
  );

  const togglePrivacy = useCallback(
    (key) => {
      persist({ ...settings, privacy: { ...settings.privacy, [key]: !settings.privacy[key] } });
    },
    [settings, persist]
  );

  const setLanguage = useCallback((language) => persist({ ...settings, language }), [settings, persist]);
  const setTheme = useCallback((theme) => persist({ ...settings, theme }), [settings, persist]);

  return { settings, toggleNotification, togglePrivacy, setLanguage, setTheme };
}
