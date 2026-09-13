import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { Droplets, BarChart3, Truck, Bug, IndianRupee, ArrowLeft } from "lucide-react";

const tools = [
  { to: "/agriculture/weather", icon: Droplets, title: "Smart Irrigation", desc: "Weather + soil → watering plan", color: "bg-emerald-50 text-emerald-700" },
  { to: "/agriculture/yield-prediction", icon: BarChart3, title: "Yield Prediction", desc: "Estimate harvest and value", color: "bg-sky-50 text-sky-700" },
  { to: "/agriculture/sell-transport", icon: Truck, title: "Market Logistics", desc: "Compare markets after transport", color: "bg-amber-50 text-amber-700" },
  { to: "/agriculture/mandi-prices", icon: IndianRupee, title: "Mandi Prices", desc: "Check rates by crop", color: "bg-violet-50 text-violet-700" },
  { to: "/agriculture/crop-disease", icon: Bug, title: "Crop Health", desc: "Photo-based guidance", color: "bg-rose-50 text-rose-700" },
];

export default function AgricultureHome() {
  return (
    <Layout>
      <div className="container-app page">
        <Link to="/" className="back-link"><ArrowLeft className="h-4 w-4" /> Home</Link>
        <div className="page-header !text-left mb-8">
          <h1 className="title">Agriculture</h1>
          <p className="subtitle">Irrigation, yield, markets and crop health.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {tools.map((t) => (
            <Link key={t.to} to={t.to} className="card-link flex gap-3">
              <span className={`icon-box ${t.color}`}><t.icon className="h-5 w-5" /></span>
              <span>
                <span className="block font-semibold text-slate-900">{t.title}</span>
                <span className="text-sm text-slate-500">{t.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
