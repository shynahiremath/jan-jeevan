import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function CropDisease() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-16 w-full text-center">
        <div className="text-5xl mb-3">🌱</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Crop Disease Detection</h1>
        <p className="text-gray-500 mb-6">
          Camera-based crop scanning is coming in a later phase.
        </p>
        <Link to="/agriculture" className="text-green-700 font-medium hover:underline">
          ← Back to Agriculture
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default CropDisease;