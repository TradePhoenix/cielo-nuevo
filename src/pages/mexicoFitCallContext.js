// CONV-001 — Fit Call continuity. Pure function, no React, no router
// import: MexicoFitCallPage.js reads the `?city=` query param via
// react-router-dom's useSearchParams and passes the raw string here; this
// function does the actual lookup/personalization, kept router-free so it
// stays directly testable in this project's Jest environment (see the
// established constraint from ENG-023/BP-002 — react-router-dom can't
// currently be imported, even transitively, in a Jest test file here).
//
// Reuses the existing getCityById() lookup — no duplicated destination
// data, and an invalid/unknown cityId safely falls back to the same
// generic message the page already used before this ticket.
import { getCityById } from "../features/yourMexico/logic/cityLookup";

const WHATSAPP_NUMBER = "16043154625";
const BASE_MESSAGE = "Hi Kalen, I found Path To Mexico and would like to book a Mexico Fit Call";

export function buildFitCallContext(cityId) {
  const city = cityId ? getCityById(cityId) : null;
  const cityName = city ? city.name : null;
  const messageText = cityName ? `${BASE_MESSAGE} about ${cityName}.` : `${BASE_MESSAGE}.`;

  return {
    cityId: city ? city.id : null,
    cityName,
    whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`,
  };
}
