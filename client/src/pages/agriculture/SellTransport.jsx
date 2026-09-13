import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import { Truck, ArrowLeft, MapPin } from "lucide-react";

const API_BASE = "http://localhost:5000/api";

function SellTransport() {
  const [crop, setCrop] = useState("Wheat");
  const [qty, setQty] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const compare = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/logistics/compare`, {
        crop,
        quantity: Number(qty),
      }, { timeout: 8000 });
      setResults(res.data.markets);
    } catch {
      const MARKETS = [
        { name: "Local Mandi", distance: 12, pricePerQtl: 2150, transportPerKm: 8 },
        { name: "District APMC", distance: 38, pricePerQtl: 2380, transportPerKm: 7 },
        { name: "State Market Yard", distance: 95, pricePerQtl: 2520, transportPerKm: 6.5 },
        { name: "Private Trader Hub", distance: 55, pricePerQtl: 2450, transportPerKm: 7.5 },
      ];
      const q = Number(qty) || 0;
      setResults(
        MARKETS.map((m) => {
          const transport = Math.round(m.distance * m.transportPerKm * (q / 10));
          const revenue = Math.round(m.pricePerQtl * q);
          return { ...m, transport, revenue, net: revenue - transport };
        }).sort((a, b) => b.net - a.net)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link to="/agriculture" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-700">
          <ArrowLeft className="h-4 w-4" /> Back to Agriculture
        </Link>
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700"><Truck className="h-7 w-7" /></div>
          <h1 className="section-title">Direct-to-Market Logistics</h1>
          <p className="mt-2 text-slate-500 text-sm">Compare markets, transport cost and expected net earnings.</p>
        </div>
        <form onSubmit={compare} className="card mb-6 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="label">Crop</label>
            <select value={crop} onChange={(e) => setCrop(e.target.value)} className="input-field">
              <option>Wheat</option><option>Rice</option><option>Onion</option><option>Potato</option><option>Cotton</option>
            </select>
          </div>
          <div>
            <label className="label">Quantity (quintals)</label>
            <input type="number" min="1" required value={qty} onChange={(e) => setQty(e.target.value)} placeholder="e.g. 50" className="input-field" />
          </div>
          <div className="flex items-end">
            <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Comparing…" : "Compare Markets"}</button>
          </div>
        </form>
        {results && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-600 mb-2">Best options ranked by net earnings</p>
            {results.map((m, i) => (
              <div key={m.name} className={`card !p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${i === 0 ? "border-brand-300 bg-brand-50/50 ring-1 ring-brand-200" : ""}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">{i === 0 && <span className="badge-green">Best net</span>}<h3 className="font-bold text-slate-900">{m.name}</h3></div>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{m.distance} km</span>
                    <span>₹{m.pricePerQtl}/qtl</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center sm:text-right">
                  <div><p className="text-[10px] uppercase text-slate-400">Revenue</p><p className="font-semibold text-slate-700">₹{m.revenue.toLocaleString()}</p></div>
                  <div><p className="text-[10px] uppercase text-slate-400">Transport</p><p className="font-semibold text-red-600">−₹{m.transport.toLocaleString()}</p></div>
                  <div><p className="text-[10px] uppercase text-slate-400">Net</p><p className="font-bold text-brand-700 text-lg">₹{m.net.toLocaleString()}</p></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
export default SellTransport;
