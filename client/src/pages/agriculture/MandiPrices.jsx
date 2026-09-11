import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const API_BASE = "http://localhost:5000/api";

const commonCrops = ["Wheat", "Rice", "Onion", "Potato", "Tomato", "Cotton", "Maize", "Soybean"];
const commonStates = [
  "Rajasthan", "Maharashtra", "Uttar Pradesh", "Madhya Pradesh",
  "Gujarat", "Punjab", "Haryana", "West Bengal", "Karnataka", "Tamil Nadu",
];

function MandiPrices() {
  const [commodity, setCommodity] = useState("Wheat");
  const [state, setState] = useState("");
  const [prices, setPrices] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noDataMsg, setNoDataMsg] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNoDataMsg(null);
    setPrices([]);

    try {
      const params = {};
      if (commodity) params.commodity = commodity;
      if (state) params.state = state;

      const res = await axios.get(`${API_BASE}/mandi-prices`, { params });

      if (res.data.prices.length === 0) {
        setNoDataMsg(res.data.message);
      } else {
        setPrices(res.data.prices);
        setMeta({
          source: res.data.source,
          sourceUrl: res.data.sourceUrl,
          updateFrequency: res.data.updateFrequency,
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not fetch mandi prices right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">💰</div>
          <h1 className="text-2xl font-bold text-gray-800">Mandi Prices</h1>
          <p className="text-gray-500 text-sm mt-1">
            Real government market prices — updated daily, not real-time.
          </p>
        </div>

        <form onSubmit={handleSearch} className="bg-gray-50 rounded-2xl p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
            <select
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              {commonCrops.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State (optional — narrows results)
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">All States</option>
              {commonStates.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search Prices"}
          </button>
        </form>

        {error && (
          <p className="bg-red-100 text-red-700 text-sm px-4 py-3 rounded-lg mt-4">{error}</p>
        )}

        {noDataMsg && (
          <p className="bg-yellow-50 text-yellow-800 text-sm px-4 py-3 rounded-lg mt-4">
            {noDataMsg}
          </p>
        )}

        {prices.length > 0 && (
          <div className="mt-6">
            <p className="text-xs text-gray-400 mb-3">
              Source: {meta.source} · Update frequency: {meta.updateFrequency} ·{" "}
              <a href={meta.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
                View original dataset
              </a>
            </p>

            <div className="space-y-3">
              {prices.map((p, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <p className="font-semibold text-gray-800">{p.market}</p>
                      <p className="text-sm text-gray-500">
                        {p.district}, {p.state} · {p.variety} ({p.grade})
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-700">
                        ₹{p.modalPrice}/quintal
                      </p>
                      <p className="text-xs text-gray-400">
                        Range: ₹{p.minPrice} – ₹{p.maxPrice}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Reported: {p.arrivalDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <Link to="/agriculture" className="text-green-700 font-medium hover:underline">
            ← Back to Agriculture
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MandiPrices;