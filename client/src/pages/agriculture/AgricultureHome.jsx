import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { Droplets, BarChart3, Truck, CloudSun, Leaf, Camera } from "lucide-react";

const features = [
  { id: "irrigation", icon: <Droplets className="h-6 w-6" />, title: "Smart Irrigation", description: "Weather + soil & crop inputs → precise irrigation recommendation.", path: "/agriculture/weather", status: "live", color: "bg-sky-100 text-sky-700" },
  { id: "yield", icon: <BarChart3 className="h-6 w-6" />, title: "Crop Yield Prediction", description: "Predict expected yield using crop, farm size and environmental data.", path: "/agriculture/yield-prediction", status: "live", color: "bg-emerald-100 text-emerald-700" },
  { id: "logistics", icon: <Truck className="h-6 w-6" />, title: "Direct-to-Market Logistics", description: "Compare markets, transport cost and expected net earnings.", path: "/agriculture/sell-transport", status: "live", color: "bg-amber-100 text-amber-700" },
  { id: "weather", icon: <CloudSun className="h-6 w-6" />, title: "Local Weather", description: "Real-time weather for your farm location.", path: "/agriculture/weather", status: "live", color: "bg-blue-100 text-blue-700" },
  { id: "mandi", icon: <Leaf className="h-6 w-6" />, title: "Mandi Prices", description: "Live government market prices for your crop.", path: "/agriculture/mandi-prices", status: "live", color: "bg-green-100 text-green-700" },
  { id: "disease", icon: <Camera className="h-6 w-6" />, title: "Crop Disease Scan", description: "Scan your crop with camera to detect common issues.", path: "/agriculture/crop-disease", status: "beta", color: "bg-violet-100 text-violet-700" },
];

function AgricultureHome() {
  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-4xl shadow-sm">🌾</div>
          <h1 className="section-title mb-2">Agriculture</h1>
          <p className="text-slate-500 max-w-md mx-auto">Smart tools for irrigation, yield planning and selling at the best price.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link key={f.id} to={f.path} className="group card-hover flex flex-col gap-4 !p-5">
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${f.color}`}>{f.icon}</div>
                {f.status === "live" ? <span className="badge-green">Live</span> : <span className="badge-amber">Beta</span>}
              </div>
              <div>
                <h2 className="font-bold text-slate-900 group-hover:text-brand-700 transition">{f.title}</h2>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
export default AgricultureHome;
