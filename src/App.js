import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GuidesPage from "./pages/GuidesPage";
import CostOfLivingPage from "./pages/CostOfLivingPage";
import TemporaryResidencyPage from "./pages/TemporaryResidencyPage";
import HealthcareInMexicoForCanadiansPage from "./pages/HealthcareInMexicoForCanadiansPage";
import BestAreasToLivePage from "./pages/BestAreasToLivePage";
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
        <Route path="/guides/renting-vs-buying-in-mexico" element={<RentingVsBuyingInMexicoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
