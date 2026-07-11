import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./ScrollToTop";

// Every other route is code-split: the single main bundle previously shipped
// all 21 guide articles' full text plus every feature (Blueprint, Your
// Mexico, Dashboard, Document Vault) on every single page load, regardless
// of which route a visitor actually landed on. HomePage stays a static
// import since it's the most common entry point and shouldn't show a
// loading gap on first paint.
const GuidesPage = lazy(() => import("./pages/GuidesPage"));
const CostOfLivingPage = lazy(() => import("./pages/CostOfLivingPage"));
const TemporaryResidencyPage = lazy(() => import("./pages/TemporaryResidencyPage"));
const HealthcareInMexicoForCanadiansPage = lazy(() => import("./pages/HealthcareInMexicoForCanadiansPage"));
const BestAreasToLivePage = lazy(() => import("./pages/BestAreasToLivePage"));
const MexicoRelocationChecklistPage = lazy(() => import("./pages/MexicoRelocationChecklistPage"));
const RemoteWorkersMovingToMexicoPage = lazy(() => import("./pages/RemoteWorkersMovingToMexicoPage"));
const RetiringInMexicoPage = lazy(() => import("./pages/RetiringInMexicoPage"));
const MexicoResidencySupportPage = lazy(() => import("./pages/MexicoResidencySupportPage"));
const UsToMexicoRelocationPage = lazy(() => import("./pages/UsToMexicoRelocationPage"));
const CanadaToMexicoRelocationPage = lazy(() => import("./pages/CanadaToMexicoRelocationPage"));
const MovingToRivieraMayaPage = lazy(() => import("./pages/MovingToRivieraMayaPage"));
const MovingToTulumPage = lazy(() => import("./pages/MovingToTulumPage"));
const MovingToPlayaDelCarmenPage = lazy(() => import("./pages/MovingToPlayaDelCarmenPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const MexicoFitCallPage = lazy(() => import("./pages/MexicoFitCallPage"));
const WorkWithPathToMexicoPage = lazy(() => import("./pages/WorkWithPathToMexicoPage"));
const FreeGuidePage = lazy(() => import("./pages/FreeGuidePage"));
const GroceryCostsInMexicoPage = lazy(() => import("./pages/GroceryCostsInMexicoPage"));
const SafetyInMexicoPage = lazy(() => import("./pages/SafetyInMexicoPage"));
const HowMuchMoneyDoYouNeedToMoveToMexicoPage = lazy(() => import("./pages/HowMuchMoneyDoYouNeedToMoveToMexicoPage"));
const TulumVsPlayaDelCarmenPage = lazy(() => import("./pages/TulumVsPlayaDelCarmenPage"));
const InternetAndRemoteWorkInMexicoPage = lazy(() => import("./pages/InternetAndRemoteWorkInMexicoPage"));
const BankingInMexicoAsAForeignerPage = lazy(() => import("./pages/BankingInMexicoAsAForeignerPage"));
const BringingPetsToMexicoPage = lazy(() => import("./pages/BringingPetsToMexicoPage"));
const RentingVsBuyingInMexicoPage = lazy(() => import("./pages/RentingVsBuyingInMexicoPage"));
const DeveloperDashboardPage = lazy(() => import("./pages/DeveloperDashboardPage"));
const MyMexicoBlueprintPage = lazy(() => import("./pages/MyMexicoBlueprintPage"));
const YourMexicoPage = lazy(() => import("./features/yourMexico/pages/YourMexicoPage"));
const ComparePage = lazy(() => import("./features/yourMexico/pages/ComparePage"));
const CityDetailPage = lazy(() => import("./features/yourMexico/pages/CityDetailPage"));
const MyMexicoPlanSetupPage = lazy(() => import("./features/myMexicoPlan/pages/MyMexicoPlanSetupPage"));
const MyMexicoPlanPage = lazy(() => import("./features/myMexicoPlan/pages/MyMexicoPlanPage"));
const DashboardPage = lazy(() => import("./features/dashboard/pages/DashboardPage"));
const DocumentVaultPage = lazy(() => import("./features/documentVault/pages/DocumentVaultPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/developer-dashboard" element={<DeveloperDashboardPage />} />

          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/guides/cost-of-living-playa-del-carmen" element={<CostOfLivingPage />} />
          <Route path="/guides/temporary-residency-mexico" element={<TemporaryResidencyPage />} />
          <Route path="/guides/healthcare-in-mexico-for-canadians" element={<HealthcareInMexicoForCanadiansPage />} />
          <Route path="/guides/best-areas-to-live-in-playa-del-carmen" element={<BestAreasToLivePage />} />
          <Route path="/guides/mexico-relocation-checklist" element={<MexicoRelocationChecklistPage />} />
          <Route path="/guides/remote-workers-moving-to-mexico" element={<RemoteWorkersMovingToMexicoPage />} />
          <Route path="/guides/retiring-in-mexico" element={<RetiringInMexicoPage />} />
          <Route path="/guides/mexico-residency-support" element={<MexicoResidencySupportPage />} />
          <Route path="/guides/us-to-mexico-relocation" element={<UsToMexicoRelocationPage />} />
          <Route path="/guides/canada-to-mexico-relocation" element={<CanadaToMexicoRelocationPage />} />
          <Route path="/guides/moving-to-riviera-maya" element={<MovingToRivieraMayaPage />} />
          <Route path="/guides/moving-to-tulum" element={<MovingToTulumPage />} />
          <Route path="/guides/moving-to-playa-del-carmen" element={<MovingToPlayaDelCarmenPage />} />
          <Route path="/guides/grocery-costs-in-mexico" element={<GroceryCostsInMexicoPage />} />
          <Route path="/guides/safety-in-mexico" element={<SafetyInMexicoPage />} />
          <Route path="/guides/how-much-money-do-you-need-to-move-to-mexico" element={<HowMuchMoneyDoYouNeedToMoveToMexicoPage />} />
          <Route path="/guides/tulum-vs-playa-del-carmen" element={<TulumVsPlayaDelCarmenPage />} />
          <Route path="/guides/internet-and-remote-work-in-mexico" element={<InternetAndRemoteWorkInMexicoPage />} />
          <Route path="/guides/banking-in-mexico-as-a-foreigner" element={<BankingInMexicoAsAForeignerPage />} />
          <Route path="/guides/bringing-pets-to-mexico" element={<BringingPetsToMexicoPage />} />
          <Route path="/guides/renting-vs-buying-in-mexico" element={<RentingVsBuyingInMexicoPage />} />

          <Route path="/mexico-fit-call" element={<MexicoFitCallPage />} />
          <Route path="/work-with-path-to-mexico" element={<WorkWithPathToMexicoPage />} />
          <Route path="/free-guide" element={<FreeGuidePage />} />
          <Route path="/my-mexico-blueprint" element={<MyMexicoBlueprintPage />} />
          <Route path="/your-mexico" element={<YourMexicoPage />} />
          <Route path="/your-mexico/compare" element={<ComparePage />} />
          <Route path="/your-mexico/:cityId" element={<CityDetailPage />} />
          <Route path="/my-mexico-plan" element={<MyMexicoPlanSetupPage />} />
          <Route path="/my-mexico-plan/:cityId" element={<MyMexicoPlanPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/documents" element={<DocumentVaultPage />} />

          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
