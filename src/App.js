import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GuidesPage from "./pages/GuidesPage";
import CostOfLivingPage from "./pages/CostOfLivingPage";
import TemporaryResidencyPage from "./pages/TemporaryResidencyPage";
import HealthcareInMexicoForCanadiansPage from "./pages/HealthcareInMexicoForCanadiansPage";
import BestAreasToLivePage from "./pages/BestAreasToLivePage";
import MexicoRelocationChecklistPage from "./pages/MexicoRelocationChecklistPage";
import RemoteWorkersMovingToMexicoPage from "./pages/RemoteWorkersMovingToMexicoPage";
import RetiringInMexicoPage from "./pages/RetiringInMexicoPage";
import MexicoResidencySupportPage from "./pages/MexicoResidencySupportPage";
import UsToMexicoRelocationPage from "./pages/UsToMexicoRelocationPage";
import CanadaToMexicoRelocationPage from "./pages/CanadaToMexicoRelocationPage";
import MovingToRivieraMayaPage from "./pages/MovingToRivieraMayaPage";
import MovingToTulumPage from "./pages/MovingToTulumPage";
import MovingToPlayaDelCarmenPage from "./pages/MovingToPlayaDelCarmenPage";
import ScrollToTop from "./ScrollToTop";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import MexicoFitCallPage from "./pages/MexicoFitCallPage";
import WorkWithPathToMexicoPage from "./pages/WorkWithPathToMexicoPage";
import FreeGuidePage from "./pages/FreeGuidePage";
import GroceryCostsInMexicoPage from "./pages/GroceryCostsInMexicoPage";
import SafetyInMexicoPage from "./pages/SafetyInMexicoPage";
import HowMuchMoneyDoYouNeedToMoveToMexicoPage from "./pages/HowMuchMoneyDoYouNeedToMoveToMexicoPage";
import TulumVsPlayaDelCarmenPage from "./pages/TulumVsPlayaDelCarmenPage";
import InternetAndRemoteWorkInMexicoPage from "./pages/InternetAndRemoteWorkInMexicoPage";
import BankingInMexicoAsAForeignerPage from "./pages/BankingInMexicoAsAForeignerPage";
import BringingPetsToMexicoPage from "./pages/BringingPetsToMexicoPage";
import RentingVsBuyingInMexicoPage from "./pages/RentingVsBuyingInMexicoPage";
import DeveloperDashboardPage from "./pages/DeveloperDashboardPage";
import MyMexicoBlueprintPage from "./pages/MyMexicoBlueprintPage";
import YourMexicoPage from "./features/yourMexico/pages/YourMexicoPage";
import ComparePage from "./features/yourMexico/pages/ComparePage";
import CityDetailPage from "./features/yourMexico/pages/CityDetailPage";
import MyMexicoPlanSetupPage from "./features/myMexicoPlan/pages/MyMexicoPlanSetupPage";
import MyMexicoPlanPage from "./features/myMexicoPlan/pages/MyMexicoPlanPage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import DocumentVaultPage from "./features/documentVault/pages/DocumentVaultPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;