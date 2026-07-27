import { useEffect } from "react";

// Shared language-selection persistence — NOT a new translation/i18n
// system. Every page still owns its own local `content = { en, es }`
// object and its own `useState` for `lang`, exactly the established
// pattern (HomePage.js, GuidesPage.js, YourMexicoPage.js, etc.). This
// helper only makes that initial choice and its updates persist across
// navigation and reloads via a single shared localStorage key, so
// switching language on one page keeps it selected on the next —
// per the PTM Spanish-parity ticket's requirement that language
// selection survive navigation/refresh.

export const LANGUAGE_STORAGE_KEY = "pathToMexico.language";

export function getStoredLanguage() {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored === "es" || stored === "en" ? stored : "en";
  } catch (error) {
    return "en";
  }
}

export function setStoredLanguage(lang) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang === "es" ? "es" : "en");
  } catch (error) {
    // localStorage unavailable (private browsing, quota) — language choice
    // just won't persist this session; not worth surfacing to the visitor.
  }
}

// Keeps <html lang="..."> in sync with whichever bilingual page is
// currently mounted — a real accessibility requirement (screen readers
// use it to pick pronunciation rules), not covered by SEO.js (which only
// controls <title>/<meta>, not the root <html> element). Call from any
// page that owns a `lang` state.
export function useHtmlLang(lang) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang === "es" ? "es" : "en";
  }, [lang]);
}
