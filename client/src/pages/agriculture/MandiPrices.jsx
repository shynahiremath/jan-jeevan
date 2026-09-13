import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import { IndianRupee, ArrowLeft, Search } from "lucide-react";

const API_BASE = "http://localhost:5000/api";
const commonCrops = ["Wheat", "Rice", "Onion", "Potato", "Tomato", "Cotton", "Maize", "Soybean"];
const commonStates = ["Rajasthan", "Maharashtra", "Uttar Pradesh", "Madhya Pradesh", "Gujarat", "Punjab", "Haryana", "West Bengal", "Karnataka", "Tamil Nadu"];

const MOCK_PRICES = {
  Wheat: [{ market: "Jaipur", state: "Rajasthan", min: 2100, max: 2350, modal: 2220 }, { market: "Indore", state: "Madhya Pradesh", min: 2150, max: 2400, modal: 2280 }, { market: "Karnal", state: "Haryana", min: 2200, max: 2450, modal: 2320 }],
  Rice: [{ market: "Raipur", state: "Chhattisgarh", min: 2800, max: 3200, modal: 3000 }, { market: "Karimnagar", state: "Telangana", min: 2900, max: 3300, modal: 3100 }],
  Onion: [{ market: "Lasalgaon", state: "Maharashtra", min: 1200, max: 1800, modal: 1500 }, { market: "Bengaluru", state: "Karnataka", min: 1400, max: 2000, modal: 1700 }],
  Potato: [{ market: "Agra", state: "Uttar Pradesh", min: 800, max: 1200, modal: 1000 }, { market: "Jalandhar", state: "Punjab", min: 900, max: 1300, modal: 1100 }],
  Tomato: [{ market: "Nashik", state: "Maharashtra", min: 1500, max: 2500, modal: 2000 }, { market: "Kolar", state: "Karnataka", min: 1600, max: 2400, modal: 2000 }],
  Cotton: [{ market: "Rajkot", state: "Gujarat", min: 5500, max: 6200, modal: 5800 }, { market: "Warangal", state: "Telangana", min: 5400, max: 6000, modal: 5700 }],
  Maize: [{ market: "Davangere", state: "Karnataka", min: 1800, max: 2100, modal: 1950 }],
  Soybean: [{ market: "Indore", state: "Madhya Pradesh", min: 4200, max: 4600, modal: 4400 }],
};

function MandiPrices() {
  const [commodity, setCommodity] = useState("Wheat");
  const [state, setState] = useState("");
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const res = await axios.get(`${API_BASE}/mandi-prices`, {
        params: { commodity, ...(state ? { state } : {}) },
        timeout: 4000,
      });
      if (res.data?.prices?.length) {
        setPrices(res.data.prices.map((p) => ({
          market: p.market || p.mandi || p.Market || "Market",
          state: p.state || p.State || state || "—",
          min: p.min || p.min_price || p.Min_Price || 0,
          max: p.max || p.max_price || p.Max_Price || 0,
          modal: p.modal || p.modal_price || p.Modal_Price || 0,
        })));
      } else {
        throw new Error("empty");
      }
    } catch {
      let list = MOCK_PRICES[commodity] || MOCK_PRICES.Wheat;
      if (state) {
        const filtered = list.filter((p) => p.state.toLowerCase().includes(state.toLowerCase()));
        list = filtered.length ? filtered : list;
      }
      setPrices(list);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link to="/agriculture" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-700 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Agriculture
        </Link>
        <div className="mb-8 text-center animate-fade-in-up">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 shadow-lg shadow-green-200/50">
            <IndianRupee className="h-7 w-7" />
          </div>
          <h1 className="section-title">Mandi Prices</h1>
          <p className="mt-2 text-slate-500 text-sm">Check market rates for your crop across states.</p>
        </div>
        <form onSubmit={handleSearch} className="card mb-6 grid gap-4 sm:grid-cols-3 animate-fade-in-up stagger-1">
          <div>
            <label className="label">Crop</label>
            <select value={commodity} onChange={(e) => setCommodity(e.target.value)} className="input-field">
              {commonCrops.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">State (optional)</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="input-field">
              <option value="">All states</option>
              {commonStates.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" disabled={loading} className="btn-primary w-full">
              <Search className="h-4 w-4" /> {loading ? "Searching…" : "Search"}
            </button>
          </div>
        </form>
        {searched && !loading && prices.length === 0 && (
          <p className="text-center text-slate-500 text-sm">No prices found. Try another crop.</p>
        )}
        <div className="space-y-3">
          {prices.map((p, i) => (
            <div key={`${p.market}-${i}`} className="card !p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div>
                <h3 className="font-bold text-slate-900">{p.market}</h3>
                <p className="text-xs text-slate-500">{p.state}</p>
              </div>
              <div className="flex gap-6 text-center">
                <div><p className="text-[10px] uppercase text-slate-400">Min</p><p className="font-semibold text-slate-700">₹{Number(p.min).toLocaleString()}</p></div>
                <div><p className="text-[10px] uppercase text-slate-400">Modal</p><p className="font-bold text-brand-700 text-lg">₹{Number(p.modal).toLocaleString()}</p></div>
                <div><p className="text-[10px] uppercase text-slate-400">Max</p><p className="font-semibold text-slate-700">₹{Number(p.max).toLocaleString()}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
export default MandiPrices;
