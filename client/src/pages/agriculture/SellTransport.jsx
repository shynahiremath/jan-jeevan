import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import api from "../../lib/api";
import { Truck, ArrowLeft, MapPin } from "lucide-react";

export default function SellTransport() {
  const [crop, setCrop] = useState("Wheat");
  const [qty, setQty] = useState("50");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const compare = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/logistics/compare", { crop, quantity: Number(qty) });
      setData(res.data);
    } catch {
      const markets = [
        { name: "Local Mandi", distance: 12, pricePerQtl: 2150, transportPerKm: 8 },
        { name: "District APMC", distance: 38, pricePerQtl: 2380, transportPerKm: 7 },
        { name: "State Market Yard", distance: 95, pricePerQtl: 2520, transportPerKm: 6.5 },
        { name: "Private Trader Hub", distance: 55, pricePerQtl: 2450, transportPerKm: 7.5 },
      ].map((m) => {
        const q = Number(qty) || 1;
        const transport = Math.round(m.distance * m.transportPerKm * (q / 10));
        const revenue = Math.round(m.pricePerQtl * q);
        return { ...m, transport, revenue, net: revenue - transport };
      }).sort((a, b) => b.net - a.net);
      setData({ markets, best: markets[0].name, insight: `${markets[0].name} gives the highest net.` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-app page max-w-2xl">
        <Link to="/agriculture" className="back-link"><ArrowLeft className="h-4 w-4" /> Agriculture</Link>
        <div className="page-header">
          <div className="icon-box bg-amber-50 text-amber-700 mx-auto mb-3"><Truck className="h-6 w-6" /></div>
          <h1 className="title">Market Logistics</h1>
          <p className="subtitle">Compare net earnings after transport cost</p>
        </div>
        <form onSubmit={compare} className="card mb-4 grid gap-3 sm:grid-cols-3">
          <div>
            <label className="label">Crop</label>
            <select value={crop} onChange={(e) => setCrop(e.target.value)} className="input">
              {["Wheat","Rice","Onion","Potato","Cotton","Maize"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Quantity (quintals)</label>
            <input type="number" min="1" required value={qty} onChange={(e) => setQty(e.target.value)} className="input" />
          </div>
          <div className="flex items-end">
            <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Comparing…" : "Compare"}</button>
          </div>
        </form>
        {data?.insight && <div className="alert alert-info mb-4">{data.insight}</div>}
        {data?.markets?.map((m, i) => (
          <div key={m.name} className={`card mb-3 ${i === 0 ? "border-brand-500 border-2" : ""}`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {i === 0 && <span className="badge badge-green">Best net</span>}
                  <h3 className="font-semibold text-slate-900">{m.name}</h3>
                </div>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3 w-3" />{m.distance} km · ₹{m.pricePerQtl}/qtl
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-sm sm:min-w-[220px]">
                <div><p className="text-xs text-slate-400">Revenue</p><p className="font-semibold">₹{m.revenue.toLocaleString()}</p></div>
                <div><p className="text-xs text-slate-400">Transport</p><p className="font-semibold text-red-600">−₹{m.transport.toLocaleString()}</p></div>
                <div><p className="text-xs text-slate-400">Net</p><p className="text-lg font-bold text-brand-700">₹{m.net.toLocaleString()}</p></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
