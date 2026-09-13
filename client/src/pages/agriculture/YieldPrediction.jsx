import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import api from "../../lib/api";
import { BarChart3, ArrowLeft } from "lucide-react";

const CROPS = ["Wheat", "Rice", "Maize", "Cotton", "Sugarcane", "Soybean", "Onion", "Potato"];

export default function YieldPrediction() {
  const [form, setForm] = useState({ crop: "Wheat", area: "2", soil: "Alluvial", season: "Rabi", rainfall: "normal", fertilizer: "medium" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const predict = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/yield/predict", { ...form, area: Number(form.area) });
      setResult(res.data);
    } catch {
      const base = { Wheat: 3.2, Rice: 4.1, Maize: 3.8, Cotton: 1.8, Sugarcane: 70, Soybean: 1.5, Onion: 18, Potato: 22 }[form.crop] || 3;
      let mult = 1;
      if (form.rainfall === "high") mult += 0.12;
      if (form.rainfall === "low") mult -= 0.18;
      if (form.fertilizer === "high") mult += 0.15;
      if (form.fertilizer === "low") mult -= 0.12;
      const yieldPerAcre = +(base * mult).toFixed(2);
      const total = +(yieldPerAcre * Number(form.area)).toFixed(2);
      const unit = ["Sugarcane", "Onion", "Potato"].includes(form.crop) ? "quintals" : "tonnes";
      const qtl = unit === "tonnes" ? total * 10 : total;
      const mid = Math.round(qtl * 2200);
      setResult({
        yieldPerAcre, total, low: +(total * 0.88).toFixed(2), high: +(total * 1.12).toFixed(2), unit,
        revenueEstimate: { low: Math.round(mid * 0.88), mid, high: Math.round(mid * 1.12) },
        actions: ["Confirm seed variety for your district.", "Track mandi prices before harvest."],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-app page max-w-xl">
        <Link to="/agriculture" className="back-link"><ArrowLeft className="h-4 w-4" /> Agriculture</Link>
        <div className="page-header">
          <div className="icon-box bg-sky-50 text-sky-700 mx-auto mb-3"><BarChart3 className="h-6 w-6" /></div>
          <h1 className="title">Yield Prediction</h1>
          <p className="subtitle">Estimate harvest and rough market value</p>
        </div>
        <form onSubmit={predict} className="card space-y-4">
          <div className="grid-2">
            <div><label className="label">Crop</label><select name="crop" value={form.crop} onChange={set} className="input">{CROPS.map((c) => <option key={c}>{c}</option>)}</select></div>
            <div><label className="label">Area (acres)</label><input type="number" name="area" min="0.1" step="0.1" required value={form.area} onChange={set} className="input" /></div>
            <div><label className="label">Soil</label><select name="soil" value={form.soil} onChange={set} className="input">{["Alluvial","Black","Red","Laterite","Sandy"].map((s) => <option key={s}>{s}</option>)}</select></div>
            <div><label className="label">Season</label><select name="season" value={form.season} onChange={set} className="input">{["Kharif","Rabi","Zaid"].map((s) => <option key={s}>{s}</option>)}</select></div>
            <div><label className="label">Rainfall</label><select name="rainfall" value={form.rainfall} onChange={set} className="input"><option value="low">Below normal</option><option value="normal">Normal</option><option value="high">Above normal</option></select></div>
            <div><label className="label">Fertilizer</label><select name="fertilizer" value={form.fertilizer} onChange={set} className="input"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Calculating…" : "Predict yield"}</button>
        </form>
        {result && (
          <div className="mt-4 space-y-3">
            <div className="card">
              <div className="grid grid-cols-3 gap-2">
                <div className="stat"><p className="stat-value">{result.yieldPerAcre}</p><p className="stat-label">Per acre</p></div>
                <div className="stat"><p className="stat-value">{result.total}</p><p className="stat-label">Total ({result.unit})</p></div>
                <div className="stat"><p className="stat-value text-base">{result.low}–{result.high}</p><p className="stat-label">Range</p></div>
              </div>
            </div>
            {result.revenueEstimate && (
              <div className="alert alert-info">
                <p className="font-semibold">Indicative revenue</p>
                <p className="mt-1 text-2xl font-bold">₹{result.revenueEstimate.mid?.toLocaleString()}</p>
                <p className="text-sm opacity-80">Range ₹{result.revenueEstimate.low?.toLocaleString()} – ₹{result.revenueEstimate.high?.toLocaleString()}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
