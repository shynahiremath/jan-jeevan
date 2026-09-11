import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Healthcare from "./pages/Healthcare";
import Finance from "./pages/Finance";
import Schemes from "./pages/Schemes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EMICalculator from "./pages/EMICalculator";
import VoiceTest from "./pages/VoiceTest";
import AgricultureHome from "./pages/agriculture/AgricultureHome";
import Weather from "./pages/agriculture/Weather";
import YieldPrediction from "./pages/agriculture/YieldPrediction";
import MandiPrices from "./pages/agriculture/MandiPrices";
import SellTransport from "./pages/agriculture/SellTransport";
import CropDisease from "./pages/agriculture/CropDisease";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/finance/emi-calculator" element={<EMICalculator />} />
          <Route path="/voice-test" element={<VoiceTest />} />
          <Route path="/agriculture" element={<AgricultureHome />} />
          <Route path="/agriculture/weather" element={<Weather />} />
          <Route path="/agriculture/yield-prediction" element={<YieldPrediction />} />
          <Route path="/agriculture/mandi-prices" element={<MandiPrices />} />
          <Route path="/agriculture/sell-transport" element={<SellTransport />} />
          <Route path="/agriculture/crop-disease" element={<CropDisease />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;