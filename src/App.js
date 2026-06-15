import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GuidesPage from "./pages/GuidesPage";
import CostOfLivingPage from "./pages/CostOfLivingPage";
import TemporaryResidencyPage from "./pages/TemporaryResidencyPage";
import HealthcareInMexicoForCanadiansPage from "./pages/HealthcareInMexicoForCanadiansPage";
import BestAreasToLivePage from "./pages/BestAreasToLivePage";
import HowMuchMoneyDoYouNeedToMoveToMexicoPage from "./pages/HowMuchMoneyDoYouNeedToMoveToMexicoPage";
import TulumVsPlayaDelCarmenPage from "./pages/TulumVsPlayaDelCarmenPage";
import InternetAndRemoteWorkInMexicoPage from "./pages/InternetAndRemoteWorkInMexicoPage";
import BankingInMexicoAsAForeignerPage from "./pages/BankingInMexicoAsAForeignerPage";
import BringingPetsToMexicoPage from "./pages/BringingPetsToMexicoPage";
import RentingVsBuyingInMexicoPage from "./pages/RentingVsBuyingInMexicoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/cost-of-living-playa-del-carmen" element={<CostOfLivingPage />} />
        <Route path="/guides/temporary-residency-mexico" element={<TemporaryResidencyPage />} />
        <Route path="/guides/healthcare-in-mexico-for-canadians" element={<HealthcareInMexicoForCanadiansPage />} />
        <Route path="/guides/best-areas-to-live-in-playa-del-carmen" element={<BestAreasToLivePage />} />
        <Route path="/guides/how-much-money-do-you-need-to-move-to-mexico" element={<HowMuchMoneyDoYouNeedToMoveToMexicoPage />} />
        <Route path="/guides/tulum-vs-playa-del-carmen" element={<TulumVsPlayaDelCarmenPage />} />
        <Route path="/guides/internet-and-remote-work-in-mexico" element={<InternetAndRemoteWorkInMexicoPage />} />
        <Route path="/guides/banking-in-mexico-as-a-foreigner" element={<BankingInMexicoAsAForeignerPage />} />
        <Route path="/guides/bringing-pets-to-mexico" element={<BringingPetsToMexicoPage />} />
        <Route path="/guides/renting-vs-buying-in-mexico" element={<RentingVsBuyingInMexicoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
