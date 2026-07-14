import { createContext, useContext } from "react";

// Scoped to this feature only — the rest of the site has no dark mode, so
// this context (provided by ClientDashboardLayout, driven by the client's
// saved Settings preference) is the only source of truth for it. Nothing
// outside src/features/client-dashboard reads or provides this.
const ThemeContext = createContext({ isDark: false });

export function ClientDashboardThemeProvider({ isDark, children }) {
  return <ThemeContext.Provider value={{ isDark }}>{children}</ThemeContext.Provider>;
}

export function useClientDashboardTheme() {
  return useContext(ThemeContext);
}
