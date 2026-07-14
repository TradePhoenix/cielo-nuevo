import { useRef, useState } from "react";
import SectionCard from "./SectionCard";
import StatusPill from "./StatusPill";
import { useClientDashboardTheme } from "./ThemeContext";
import { formatDate } from "../utils/formatters";

export default function DocumentCard({ document, categoryName, onUpload }) {
  const { isDark } = useClientDashboardTheme();
  const fileInputRef = useRef(null);
  const [justDownloaded, setJustDownloaded] = useState(false);
  const hasFile = document.status !== "missing";

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) onUpload(file);
    event.target.value = "";
  };

  const handleDownload = () => {
    setJustDownloaded(true);
    setTimeout(() => setJustDownloaded(false), 1800);
  };

  return (
    <SectionCard eyebrow={categoryName} title={hasFile ? document.name : "No document uploaded yet"} action={<StatusPill status={document.status} />}>
      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} aria-hidden="true" tabIndex={-1} />

      {hasFile ? (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          {document.fileType && (
            <span className={`font-semibold uppercase tracking-[0.1em] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
              {document.fileType} &middot; {document.fileSizeLabel}
            </span>
          )}
          {document.uploadedDate && (
            <span className={isDark ? "text-zinc-500" : "text-zinc-400"}>Uploaded {formatDate(document.uploadedDate)}</span>
          )}
          {document.expiryDate && (
            <span className={isDark ? "text-zinc-500" : "text-zinc-400"}>Expires {formatDate(document.expiryDate)}</span>
          )}
        </div>
      ) : (
        <p className={`text-sm ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
          Upload a copy so your team can review it before it's needed.
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        {hasFile ? (
          <>
            <button
              type="button"
              onClick={handleDownload}
              className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
                isDark ? "border-zinc-700 text-white hover:border-[#d8a15f]" : "border-zinc-300 text-zinc-950 hover:border-[#d8a15f]"
              }`}
            >
              {justDownloaded ? "Downloaded ✓" : "Download"}
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 ${
                isDark ? "border-zinc-700 text-white hover:border-[#d8a15f]" : "border-zinc-300 text-zinc-950 hover:border-[#d8a15f]"
              }`}
            >
              Replace
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="bg-zinc-950 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            Upload
          </button>
        )}
      </div>
    </SectionCard>
  );
}
