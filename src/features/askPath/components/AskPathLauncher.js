import { useEffect, useRef, useState } from "react";
import { ASK_PATH_COPY } from "../data/copy";
import { useAskPathConversation } from "../state/useAskPathConversation";
import AskPathPanel from "./AskPathPanel";
import { trackEvent, ANALYTICS_EVENTS } from "../../../utils/analytics";

// Mounted once, globally, outside <Routes> (see src/App.js) so it persists
// across every page — a floating launcher when closed, a near-full-screen
// panel on mobile / anchored panel on desktop when open.
//
// Anchored bottom-LEFT deliberately: HomePage.js already has its own
// floating WhatsApp shortcut at bottom-right (fixed bottom-5 right-5,
// z-50) — homepage-only, pre-existing, out of this ticket's scope to move
// or touch. Putting Ask Path on the opposite corner avoids stacking two
// circular floating buttons on top of each other on the homepage, without
// editing HomePage.js at all.
export default function AskPathLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const launcherRef = useRef(null);
  const hasOpenedRef = useRef(false);
  const conversation = useAskPathConversation();
  const t = ASK_PATH_COPY[conversation.language];

  // The launcher button and the panel are mutually exclusive renders (the
  // button unmounts while the panel is open), so focus can't be restored
  // from inside the panel's own close handler — at that instant the button
  // doesn't exist in the DOM yet. Restoring focus here, after the button
  // has remounted, is what actually lands focus on it.
  useEffect(() => {
    if (isOpen) {
      hasOpenedRef.current = true;
    } else if (hasOpenedRef.current) {
      launcherRef.current?.focus();
    }
  }, [isOpen]);

  function handleOpen() {
    setIsOpen(true);
    trackEvent(ANALYTICS_EVENTS.ASK_PATH_OPENED);
  }

  return (
    <>
      {!isOpen && (
        <button
          ref={launcherRef}
          type="button"
          onClick={handleOpen}
          aria-label={t.launcherAria}
          className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 sm:bottom-6 sm:left-6"
        >
          <img src="/brand/logos/ptm-motion-mark-reverse.svg" alt="" aria-hidden="true" className="h-5 w-5" />
          {t.launcherLabel}
        </button>
      )}

      {isOpen && <AskPathPanel conversation={conversation} onClose={() => setIsOpen(false)} />}
    </>
  );
}
