import { render, screen, within } from "@testing-library/react";
import App from "./App";

// LAUNCH-W1: replaced the CRA boilerplate ("learn react") that could never
// pass. This is the app-level smoke test: the root renders at "/" and the
// site-wide legal strip — the one guaranteed path to Privacy/Terms from
// every public page — is present, alongside the homepage form's own
// consent notice (so the page intentionally has two Privacy links).
test("renders the app shell with the site-wide legal strip", async () => {
  render(<App />);
  const legal = await screen.findByRole("contentinfo", { name: /legal/i });
  expect(within(legal).getByRole("link", { name: /privacy policy/i })).toHaveAttribute("href", "/privacy-policy");
  expect(within(legal).getByRole("link", { name: /terms of service/i })).toHaveAttribute("href", "/terms-of-service");
  expect(screen.getAllByRole("link", { name: /privacy policy/i }).length).toBeGreaterThanOrEqual(2);
});
