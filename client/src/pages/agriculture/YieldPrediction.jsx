import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import { BarChart3, ArrowLeft, TrendingUp } from "lucide-react";

const API_BASE = "http://localhost:5000/api";
const CROPS = ["Wheat", "Rice", "Maize", "Cotton", "Sugarcane", "Soybean", "Onion", "Potato"];
const SOIL = ["Alluvial", "Black", "Red", "Laterite", "Sandy"];
const SEASON = ["Kharif", "Rabi", "Zaid"];

function YieldPrediction() {
  const [form, setForm] = useState({ crop: "Wheat", area: "", soil: "Alluvial", season: "Rabi", rainfall: "normal", fertilizer: "medium" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const predict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await axios.post(`${API_BASE}/yield/predict`, {
        crop: form.crop,
        area: Number(form.area),
        soil: form.soil,
        season: form.season,
        rainfall: form.rainfall,
        fertilizer: form.fertilizer,
      }, { timeout: 8000 });
      setResult(res.data);
    } catch (err) {
      const base = { Wheat: 3.2, Rice: 4.1, Maize: 3.8, Cotton: 1.8, Sugarcane: 70, Soybean: 1.5, Onion: 18, Potato: 22 }[form.crop] || 3;
      let mult = 1;
      if (form.rainfall === "high") mult += 0.12;
      if (form.rainfall === "low") mult -= 0.18;
      if (form.fertilizer === "high") mult += 0.15;
      if (form.fertilizer === "low") mult -= 0.12;
      if (form.soil === "Black" || form.soil === "Alluvial") mult += 0.08;
      const yieldPerAcre = +(base * mult).toFixed(1);
      const area = Number(form.area) || 1;
      const total = +(yieldPerAcre * area).toFixed(1);
      setResult({
        yieldPerAcre, total, low: +(total * 0.88).toFixed(1), high: +(total * 1.12).toFixed(1),
        unit: ["Sugarcane", "Onion", "Potato"].includes(form.crop) ? "quintals" : "tonnes",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link to="/agriculture" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-700">
          <ArrowLeft className="h-4 w-4" /> Back to Agriculture
        </Link>
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"><BarChart3 className="h-7 w-7" /></div>
          <h1 className="section-title">Crop Yield Prediction</h1>
          <p className="mt-2 text-slate-500 text-sm">Estimate expected yield from crop, farm & environmental data.</p>
        </div>
        <form onSubmit={predict} className="card space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="label">Crop</label><select name="crop" value={form.crop} onChange={handleChange} className="input-field">{CROPS.map((c) => <option key={c}>{c}</option>)}</select></div>
            <div><label className="label">Farm area (acres)</label><input type="number" name="area" min="0.1" step="0.1" required value={form.area} onChange={handleChange} placeholder="e.g. 2.5" className="input-field" /></div>
            <div><label className="label">Soil type</label><select name="soil" value={form.soil} onChange={handleChange} className="input-field">{SOIL.map((s) => <option key={s}>{s}</option>)}</select></div>
            <div><label className="label">Season</label><select name="season" value={form.season} onChange={handleChange} className="input-field">{SEASON.map((s) => <option key={s}>{s}</option>)}</select></div>
            <div><label className="label">Expected rainfall</label><select name="rainfall" value={form.rainfall} onChange={handleChange} className="input-field"><option value="low">Below normal</option><option value="normal">Normal</option><option value="high">Above normal</option></select></div>
            <div><label className="label">Fertilizer use</label><select name="fertilizer" value={form.fertilizer} onChange={handleChange} className="input-field"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Calculating…" : "Predict Yield"}</button>
        </form>
        {result && (
          <div className="mt-6 card border-brand-200 bg-gradient-to-br from-brand-50 to-white">
            <div className="flex items-center gap-2 mb-4"><TrendingUp className="h-5 w-5 text-brand-600" /><h3 className="font-bold text-slate-900">Predicted Yield</h3></div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div><p className="text-xs text-slate-500 mb-1">Per acre</p><p className="text-2xl font-bold text-brand-700">{result.yieldPerAcre}</p><p className="text-xs text-slate-400">{result.unit}</p></div>
              <div><p className="text-xs text-slate-500 mb-1">Total (mid)</p><p className="text-2xl font-bold text-slate-900">{result.total}</p><p className="text-xs text-slate-400">{result.unit}</p></div>
              <div><p className="text-xs text-slate-500 mb-1">Range</p><p className="text-lg font-bold text-slate-700">{result.low} – {result.high}</p><p className="text-xs text-slate-400">{result.unit}</p></div>
            </div>
            <p className="mt-4 text-xs text-slate-400 text-center">Estimate only. Actual yield depends on many local factors.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
export default YieldPrediction;
