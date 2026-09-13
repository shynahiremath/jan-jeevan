import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import api from "../../lib/api";
import { IndianRupee, ArrowLeft } from "lucide-react";

export default function MandiPrices() {
  const [commodity, setCommodity] = useState("Wheat");
  const [state, setState] = useState("");
  const [prices, setPrices] = useState(null);
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.get("/mandi-prices", { params: { commodity, state: state || undefined } });
      setPrices(res.data.prices || []);
      setSource(res.data.source || "");
    } catch {
      setPrices([
        { market: "Jaipur", state: "Rajasthan", modalPrice: 2220, minPrice: 2100, maxPrice: 2350 },
        { market: "Indore", state: "Madhya Pradesh", modalPrice: 2280, minPrice: 2150, maxPrice: 2400 },
      ]);
      setSource("Offline sample rates");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-app page max-w-2xl">
        <Link to="/agriculture" className="back-link"><ArrowLeft className="h-4 w-4" /> Agriculture</Link>
        <div className="page-header">
          <div className="icon-box bg-violet-50 text-violet-700 mx-auto mb-3"><IndianRupee className="h-6 w-6" /></div>
          <h1 className="title">Mandi Prices</h1>
          <p className="subtitle">Check rates before you travel to sell</p>
        </div>
        <form onSubmit={search} className="card mb-4 grid gap-3 sm:grid-cols-3">
          <div>
            <label className="label">Crop</label>
            <select value={commodity} onChange={(e) => setCommodity(e.target.value)} className="input">
              {["Wheat","Rice","Onion","Potato","Tomato","Cotton","Maize","Soybean"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">State (optional)</label>
            <input className="input" value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g. Rajasthan" />
          </div>
          <div className="flex items-end">
            <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Loading…" : "Get prices"}</button>
          </div>
        </form>
        {source && <p className="mb-3 text-xs text-slate-400">{source}</p>}
        {prices && prices.length === 0 && <p className="text-sm text-slate-500">No prices found. Try another crop or state.</p>}
        {prices?.map((p, i) => (
          <div key={i} className="card mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-slate-900">{p.market || p.district}</p>
              <p className="text-xs text-slate-500">{p.state}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-slate-900">₹{Number(p.modalPrice || p.modal || 0).toLocaleString()}</p>
              <p className="text-xs text-slate-400">min ₹{Number(p.minPrice || p.min || 0).toLocaleString()} · max ₹{Number(p.maxPrice || p.max || 0).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
