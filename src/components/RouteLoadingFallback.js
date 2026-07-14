import { useEffect, useState } from "react";

const APPEAR_DELAY = 220;

// App.js's Suspense fallback for every lazy-loaded route. Without this,
// a slow connection shows a completely blank page (matching the body's
// own #f5f5f4 background, so it reads as frozen, not just quiet) for as
// long as the destination route's JS chunk takes to download — no
// spinner, no message, nothing. Delays its own appearance so a fast
// connection never sees a flash: most navigations resolve before
// APPEAR_DELAY and this never renders anything at all.
export default function RouteLoadingFallback() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), APPEAR_DELAY);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f4]" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        {/* CX-003: motion-safe: means this pulses only when the visitor
            hasn't asked for reduced motion — under prefers-reduced-motion,
            it's simply a static line, still legible as "something is
            loading" without any animation. */}
        <div className="h-px w-16 overflow-hidden bg-zinc-300">
          <div className="h-px w-16 motion-safe:animate-pulse bg-zinc-950" />
        </div>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Loading</p>
      </div>
    </div>
  );
}
