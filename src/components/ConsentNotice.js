import { Link } from "react-router-dom";
import { CONSENT_COPY, CONSENT_NOTICE_VERSION } from "../utils/consent";

// Concise consent sentence + the hidden fields that make each submission
// self-describing (see utils/consent.js). `tone` matches the surrounding
// form: "light" for cream/white sections, "dark" for the dark full-bleed
// forms (Free Guide, Weddings). Router <Link> is used so the legal pages
// open in-app; the Blueprint's checkbox variant keeps its own markup.
export default function ConsentNotice({ lang = "en", formName, mode = "notice", tone = "light" }) {
  const t = CONSENT_COPY[lang] || CONSENT_COPY.en;
  const textClass = tone === "dark" ? "text-white/55" : "text-zinc-500";
  const linkClass =
    tone === "dark"
      ? "underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-white"
      : "underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950";

  return (
    <>
      <input type="hidden" name="consent" value={mode} />
      <input type="hidden" name="consent_notice_version" value={CONSENT_NOTICE_VERSION} />
      <input type="hidden" name="consent_source" value={formName} />
      <input type="hidden" name="consent_at" value="" />
      <p className={`text-xs leading-relaxed ${textClass}`}>
        {t.prefix}
        <Link to="/privacy-policy" className={linkClass}>
          {t.privacy}
        </Link>
        {t.joiner}
        <Link to="/terms-of-service" className={linkClass}>
          {t.terms}
        </Link>
        {t.suffix}
      </p>
    </>
  );
}
