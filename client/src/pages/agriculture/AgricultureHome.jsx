import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const features = [
  {
    id: "weather",
    icon: "🌦️",
    title: "Weather & Smart Irrigation",
    description: "Check today's weather and get watering advice for your crop.",
    path: "/agriculture/weather",
    status: "live-soon", // becomes "live" in Phase 12
  },
  {
    id: "yield",
    icon: "📊",
    title: "Yield Prediction",
    description: "Get an estimated range for your expected crop yield.",
    path: "/agriculture/yield-prediction",
    status: "coming-soon",
  },
  {
    id: "mandi",
    icon: "💰",
    title: "Mandi Prices",
    description: "See real government market prices for your crop.",
    path: "/agriculture/mandi-prices",
    status: "coming-soon",
  },
  {
    id: "sell",
    icon: "🚛",
    title: "Sell & Transport",
    description: "Request transport or list your crop for sale.",
    path: "/agriculture/sell-transport",
    status: "coming-soon",
  },
  {
    id: "disease",
    icon: "🌱",
    title: "Crop Disease Detection",
    description: "Scan your crop with your camera to check for common issues.",
    path: "/agriculture/crop-disease",
    status: "coming-soon",
  },
];

function AgricultureHome() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10 w-full">
        <div className="text-center mb-10">
          <div className="text-5xl mb-2">🌾</div>
          <h1 className="text-3xl font-bold text-gray-800">Agriculture</h1>
          <p className="text-gray-500 text-sm mt-1">
            Everyday farming help — weather, prices, and crop guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((feature) => (
            <Link
              key={feature.id}
              to={feature.path}
              className="border border-gray-200 rounded-2xl p-6 flex items-start gap-4 hover:shadow-md hover:border-green-300 transition bg-white"
            >
              <span className="text-4xl">{feature.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-bold text-gray-800">{feature.title}</h2>
                  {feature.status === "coming-soon" && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AgricultureHome;