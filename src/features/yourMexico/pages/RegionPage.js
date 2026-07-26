import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import YourMexicoShell from "../components/YourMexicoShell";
import CitySection from "../components/CitySection";
import CityCard from "../components/CityCard";
import CompareYourMatches from "../components/CompareYourMatches";
import DestinationImageFallback from "../components/DestinationImageFallback";
import SEO from "../../../components/SEO";
import { getRegionGroup } from "../data/atlasGroups";
import { REGION_PAGE_CONTENT } from "../data/regionPageContent";
import { getAllCities } from "../logic/cityLookup";

// DEST-003 — one reusable page for all 4 regions, routed at
// /your-mexico/region/:regionId, rather than 4 hand-built page components
// (see this ticket's explicit engineering rule against that). Region
// identity (label/description/cityIds) comes from atlasGroups.js's
// REGION_GROUPS; the deeper narrative content comes from
// regionPageContent.js. "Interactive destination links" and "regional
// comparison" reuse CityCard and CompareYourMatches exactly as the rest of
// Your Mexico already does — no new destination-rendering logic here.
export default function RegionPage() {
  const { regionId } = useParams();
  const [lang, setLang] = useState("en");
  const group = getRegionGroup(regionId);

  if (!group) {
    return <Navigate to="/your-mexico" replace />;
  }

  const content = REGION_PAGE_CONTENT[regionId]?.[lang] || REGION_PAGE_CONTENT[regionId]?.en;
  const allCities = getAllCities();
  const regionCities = group.cityIds.map((id) => allCities.find((city) => city.id === id)).filter(Boolean);
  const label = lang === "es" ? group.labelEs : group.labelEn;
  const description = lang === "es" ? group.descriptionEs : group.descriptionEn;

  if (!content) {
    return <Navigate to="/your-mexico" replace />;
  }

  return (
    <YourMexicoShell
      hero={
        <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-auto sm:h-[45vh] sm:min-h-[320px]">
          <DestinationImageFallback name={label} regionId={regionId} className="absolute inset-0" />
          <div className="absolute inset-x-6 top-6 flex items-center justify-between sm:inset-x-10 sm:top-10">
            <Link
              to="/your-mexico"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0a]"
            >
              <span aria-hidden="true">←</span>
              {lang === "es" ? "Volver A Tu México" : "Back To Your Mexico"}
            </Link>
            <button
              type="button"
              onClick={() => setLang((prev) => (prev === "en" ? "es" : "en"))}
              className="border border-white/30 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0a]"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              {lang === "es" ? "Región" : "Region"}
            </p>
            <h1 className="mt-3 text-4xl font-light leading-tight tracking-[-0.03em] text-white sm:text-6xl">
              {label}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">{description}</p>
          </div>
        </div>
      }
    >
      <SEO
        title={`${group.labelEn} — Your Mexico`}
        description={group.descriptionEn}
        path={`/your-mexico/region/${regionId}`}
      />

      <CitySection eyebrow={lang === "es" ? "Panorama" : "Overview"} title={lang === "es" ? `Vivir en ${label}` : `Living in ${label}`}>
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-700">{content.overview}</p>
      </CitySection>

      <CitySection eyebrow={lang === "es" ? "Estilo De Vida" : "Lifestyle"} title={lang === "es" ? "Cómo se vive aquí" : "How life here actually feels"}>
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-700">{content.lifestyle}</p>
      </CitySection>

      <div className="grid gap-6 sm:grid-cols-2">
        <CitySection eyebrow={lang === "es" ? "Clima" : "Climate"} title={lang === "es" ? "Qué esperar" : "What to expect"}>
          <p className="text-base leading-relaxed text-zinc-600">{content.climate}</p>
        </CitySection>
        <CitySection eyebrow={lang === "es" ? "Costo" : "Cost Positioning"} title={lang === "es" ? "Cómo se compara" : "How it compares"}>
          <p className="text-base leading-relaxed text-zinc-600">{content.costPositioning}</p>
        </CitySection>
      </div>

      <CitySection eyebrow={lang === "es" ? "Perfil Ideal" : "Ideal For"} title={lang === "es" ? "¿Esta región es para ti?" : "Is this region for you?"}>
        <ul className="grid gap-4 sm:grid-cols-2">
          {content.idealClientProfiles.map((profile) => (
            <li key={profile} className="flex gap-3 border border-zinc-200 bg-white p-5 text-sm leading-relaxed text-zinc-700">
              <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-950" />
              {profile}
            </li>
          ))}
        </ul>
      </CitySection>

      <CitySection eyebrow={lang === "es" ? "Destinos" : "Destinations"} title={lang === "es" ? `Explora ${label}` : `Explore ${label}`}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regionCities.map((city, index) => (
            <CityCard key={city.id} city={city} index={index} lang={lang} />
          ))}
        </div>
      </CitySection>

      <CitySection eyebrow={lang === "es" ? "Comparación Regional" : "Regional Comparison"} title={lang === "es" ? "Cómo se comparan estos destinos" : "How these destinations compare"}>
        <CompareYourMatches cities={regionCities} />
      </CitySection>

      <CitySection eyebrow={lang === "es" ? "Cómo Moverse" : "Getting Around"} title={lang === "es" ? "Tiempos de viaje de referencia" : "Reference travel times"}>
        <div className="overflow-x-auto border border-zinc-200 bg-white">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-950">
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">{lang === "es" ? "Desde" : "From"}</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">{lang === "es" ? "Hasta" : "To"}</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">{lang === "es" ? "Tiempo" : "Time"}</th>
              </tr>
            </thead>
            <tbody>
              {content.travelNotes.map((row) => (
                <tr key={`${row.from}-${row.to}`} className="border-b border-zinc-100 last:border-b-0">
                  <td className="px-4 py-3 text-sm text-zinc-800">{row.from}</td>
                  <td className="px-4 py-3 text-sm text-zinc-800">{row.to}</td>
                  <td className="px-4 py-3 text-sm text-zinc-600">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-zinc-400">
          {lang === "es"
            ? "Tiempos de referencia aproximados, no verificados — confirma las condiciones actuales de la carretera antes de planear un viaje."
            : "Approximate reference times, not verified — confirm current road conditions before planning a trip."}
        </p>
      </CitySection>

      <CitySection eyebrow={lang === "es" ? "¿Por Qué Esta Región?" : "Why Choose This Region"} title={lang === "es" ? "La razón de fondo" : "The underlying reason"}>
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-700">{content.whyChooseRegion}</p>
      </CitySection>

      <CitySection eyebrow={lang === "es" ? "Reubicación Responsable" : "Responsible Relocation"} title={lang === "es" ? "Cómo moverte bien aquí" : "How to move here well"}>
        <div className="border border-zinc-200 bg-white p-8 sm:p-10">
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-700">{content.responsibleRelocation}</p>
        </div>
      </CitySection>
    </YourMexicoShell>
  );
}
