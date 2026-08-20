import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getStoredLanguage } from "../utils/language";

// LAUNCH-W1 — site-wide legal strip. Before this, the Privacy Policy and
// Terms of Service were in the sitemap but linked from exactly one public
// place (the Blueprint consent checkbox). Pages hand-roll their own footers
// (or have none), so instead of editing ~30 page files this renders once,
// at the app root, beneath whatever each route draws. It is deliberately a
// quiet strip in the site's existing dark-footer language, not a second
// footer. Internal surfaces (admin, dashboards) are excluded — they are not
// public pages and carry their own chrome.
const HIDDEN_PREFIXES = ["/developer-dashboard", "/partner-network/admin", "/dashboard"];

const COPY = {
  en: { privacy: "Privacy Policy", terms: "Terms of Service", rights: "All rights reserved." },
  es: { privacy: "Política De Privacidad", terms: "Términos De Servicio", rights: "Todos los derechos reservados." },
};

export function isLegalFooterHidden(pathname) {
  return HIDDEN_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export default function LegalFooter() {
  const { pathname } = useLocation();
  // Pages own their language state locally (see utils/language.js); the
  // stored preference is the shared signal, re-read on every navigation.
  const [lang, setLang] = useState(getStoredLanguage);
  useEffect(() => {
    setLang(getStoredLanguage());
  }, [pathname]);

  if (isLegalFooterHidden(pathname)) return null;

  const t = COPY[lang] || COPY.en;
  const linkClass =
    "transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

  return (
    <footer
      aria-label={lang === "es" ? "Información legal" : "Legal"}
      className="border-t border-white/10 bg-zinc-950 px-6 pt-6 pb-28 text-center text-[11px] uppercase tracking-[0.22em] text-zinc-500 sm:pb-6"
    >
      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <Link to="/privacy-policy" className={linkClass}>
          {t.privacy}
        </Link>
        <span aria-hidden="true" className="text-zinc-700">
          ·
        </span>
        <Link to="/terms-of-service" className={linkClass}>
          {t.terms}
        </Link>
      </nav>
      <p className="mt-3 normal-case tracking-normal text-zinc-600">
        © {new Date().getFullYear()} Path To Mexico. {t.rights}
      </p>
    </footer>
  );
}
