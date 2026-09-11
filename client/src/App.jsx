import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Agriculture from "./pages/Agriculture";
import Healthcare from "./pages/Healthcare";
import Finance from "./pages/Finance";
import Schemes from "./pages/Schemes";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agriculture" element={<Agriculture />} />
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;