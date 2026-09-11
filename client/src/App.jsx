import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Agriculture from "./pages/Agriculture";
import Healthcare from "./pages/Healthcare";
import Finance from "./pages/Finance";
import Schemes from "./pages/Schemes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agriculture" element={<Agriculture />} />
        <Route path="/healthcare" element={<Healthcare />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/schemes" element={<Schemes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;