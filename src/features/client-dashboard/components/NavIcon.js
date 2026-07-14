// Small hand-authored icon set (stroke-based, 1.5px, currentColor) so the
// sidebar doesn't need a new icon-library dependency for ~11 glyphs.
const PATHS = {
  home: <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />,
  timeline: <path d="M4 6h11m-11 6h16m-16 6h9M17 4v4M9 10v4M6 16v4" />,
  checklist: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="m4 6 1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" />
    </>
  ),
  documents: <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm7 0v5h5M9 13h6M9 17h6" />,
  appointments: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="1" />
      <path d="M4 9.5h16M8 3v3.5M16 3v3.5" />
    </>
  ),
  partners: (
    <>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 8.5a2.5 2.5 0 1 1 0 5M19.5 19a4.5 4.5 0 0 0-3.8-4.45" />
    </>
  ),
  messages: <path d="M4 5h16v11H9l-4 4V5Z" />,
  payments: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="1.5" />
      <path d="M3 10h18M6.5 14.5h3" />
    </>
  ),
  emergency: <path d="M12 3 4 6.5V11c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6.5L12 3Zm0 4v5m0 3.2h.01" />,
  profile: (
    <>
      <circle cx="12" cy="8" r="3.3" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.3M12 18.2v2.3M20.5 12h-2.3M5.8 12H3.5M17.7 6.3l-1.6 1.6M7.9 16.1l-1.6 1.6M17.7 17.7l-1.6-1.6M7.9 7.9 6.3 6.3" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};

export default function NavIcon({ name, className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {PATHS[name] || null}
    </svg>
  );
}
