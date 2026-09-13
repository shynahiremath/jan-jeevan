import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import { useGeolocation } from "../../hooks/useGeolocation";
import { CloudSun, ArrowLeft, Droplets, Wind, MapPin } from "lucide-react";

const API_BASE = "http://localhost:5000/api";
const crops = ["Wheat", "Rice", "Cotton", "Sugarcane", "Maize", "Onion", "Potato", "Soybean", "Other"];

function mockWeather() {
  const hour = new Date().getHours();
  const temp = hour < 6 ? 22 : hour < 12 ? 28 : hour < 18 ? 34 : 26;
  return {
    description: hour < 12 ? "Partly cloudy" : "Clear sky",
    temperature: temp,
    humidity: 45 + (hour % 20),
    precipitation: hour > 14 && hour < 18 ? 2.5 : 0,
    windSpeed: 8 + (hour % 7),
    source: "Local estimate",
    time: new Date().toISOString(),
  };
}

function Weather() {
  const { coords, loading: geoLoading, error: geoError, requestLocation } = useGeolocation();
  const [weather, setWeather] = useState(null);
  const [irrigation, setIrrigation] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [soilMoisture, setSoilMoisture] = useState("medium");
  const [cropType, setCropType] = useState("Wheat");

  const loadWeather = async () => {
    setFetching(true);
    try {
      const params = coords
        ? { lat: coords.lat, lon: coords.lon, soilMoisture, cropType }
        : { lat: 26.9, lon: 75.8, soilMoisture, cropType };
      const res = await axios.get(`${API_BASE}/weather`, { params, timeout: 8000 });
      setWeather(res.data.weather || mockWeather());
      if (res.data.irrigation) setIrrigation(res.data.irrigation);
    } catch {
      setWeather(mockWeather());
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, [coords]);

  const getIrrigation = async () => {
    setFetching(true);
    try {
      const params = {
        lat: coords?.lat || 26.9,
        lon: coords?.lon || 75.8,
        soilMoisture,
        cropType,
      };
      const res = await axios.get(`${API_BASE}/weather`, { params, timeout: 8000 });
      if (res.data.weather) setWeather(res.data.weather);
      if (res.data.irrigation) setIrrigation(res.data.irrigation);
      else throw new Error("no irrigation");
    } catch {
      const w = weather || mockWeather();
      const rain = Number(w.precipitation) || 0;
      const temp = Number(w.temperature) || 30;
      let urgency = "normal";
      let liters = 6500;
      if (soilMoisture === "low" && rain <= 1) {
        urgency = "high";
        liters = temp > 35 ? 15000 : 12000;
      } else if (soilMoisture === "high") {
        urgency = "low";
        liters = 0;
      } else if (rain > 1) {
        urgency = "low";
        liters = 0;
      }
      setIrrigation({
        urgency,
        litersPerAcre: liters,
        advice:
          liters > 0
            ? `Suggested about ${liters.toLocaleString()} litres/acre. ${urgency === "high" ? "Irrigate within 12–24 hours." : "Plan in the next 1–2 days."}`
            : "No irrigation needed right now. Re-check soil in 2–3 days.",
        when: urgency === "high" ? "Within 12–24 hours (morning/evening)" : urgency === "low" ? "Skip for now" : "Next 1–2 days",
        method: cropType === "Rice" ? "Maintain standing water carefully." : "Prefer furrow / drip if available.",
        tips: ["Feel soil 10–15 cm deep.", "Avoid midday watering in extreme heat."],
        label: `${cropType} · soil: ${soilMoisture}`,
      });
    } finally {
      setFetching(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link to="/agriculture" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" /> Agriculture
        </Link>
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#b8f34a] to-[#2ee6d6] text-[#0b1220] shadow-lg glow-lime">
            <Droplets className="h-7 w-7" />
          </div>
          <h1 className="section-title">Smart Irrigation</h1>
          <p className="mt-2 text-sm text-slate-500">Weather + soil → when and how much to water.</p>
        </div>

        {!coords && (
          <div className="card mb-6 text-center">
            <MapPin className="mx-auto mb-2 h-8 w-8 text-slate-400" />
            <p className="mb-4 text-sm text-slate-600">Share location for local weather, or continue with estimate.</p>
            <div className="flex flex-col justify-center gap-2 sm:flex-row">
              <button onClick={requestLocation} disabled={geoLoading} className="btn-primary">
                {geoLoading ? "Getting location…" : "Use my location"}
              </button>
              <button onClick={loadWeather} className="btn-secondary">Use estimate</button>
            </div>
            {geoError && <p className="mt-2 text-xs text-red-500">{geoError}</p>}
          </div>
        )}

        {fetching && <p className="mb-4 text-center text-sm text-slate-500">Loading…</p>}

        {weather && (
          <div className="card mb-6 bg-gradient-to-br from-white to-cyan-50/40">
            <p className="text-sm font-medium text-slate-500">{weather.description}</p>
            <p className="font-display text-5xl font-extrabold text-slate-900">{weather.temperature}°C</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/90 p-3 text-center shadow-sm">
                <Droplets className="mx-auto mb-1 h-4 w-4 text-cyan-500" />
                <p className="text-[10px] uppercase text-slate-400">Humidity</p>
                <p className="font-bold">{weather.humidity}%</p>
              </div>
              <div className="rounded-2xl bg-white/90 p-3 text-center shadow-sm">
                <CloudSun className="mx-auto mb-1 h-4 w-4 text-amber-500" />
                <p className="text-[10px] uppercase text-slate-400">Rain</p>
                <p className="font-bold">{weather.precipitation} mm</p>
              </div>
              <div className="rounded-2xl bg-white/90 p-3 text-center shadow-sm">
                <Wind className="mx-auto mb-1 h-4 w-4 text-slate-500" />
                <p className="text-[10px] uppercase text-slate-400">Wind</p>
                <p className="font-bold">{weather.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        )}

        {weather && (
          <div className="card space-y-4">
            <h2 className="flex items-center gap-2 font-bold text-slate-900">
              <Droplets className="h-5 w-5" /> Plan irrigation
            </h2>
            <div>
              <label className="label">Crop</label>
              <select value={cropType} onChange={(e) => setCropType(e.target.value)} className="input-field">
                {crops.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Soil moisture (feel by hand)</label>
              <select value={soilMoisture} onChange={(e) => setSoilMoisture(e.target.value)} className="input-field">
                <option value="low">Low — dry, crumbly</option>
                <option value="medium">Medium — slightly moist</option>
                <option value="high">High — wet, sticky</option>
              </select>
            </div>
            <button onClick={getIrrigation} className="btn-primary w-full" disabled={fetching}>
              {fetching ? "Calculating…" : "Get recommendation"}
            </button>

            {irrigation && (
              <div
                className={`result-panel mt-2 ${
                  irrigation.urgency === "high"
                    ? "border-red-200 bg-red-50"
                    : irrigation.urgency === "low"
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-amber-200 bg-amber-50"
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-bold capitalize">{irrigation.urgency} priority</span>
                  <span className="badge badge-cyan">{irrigation.label || cropType}</span>
                </div>
                <p className="text-sm font-medium text-slate-800">{irrigation.advice}</p>
                {irrigation.litersPerAcre != null && (
                  <p className="mt-3 font-display text-3xl font-extrabold text-slate-900">
                    {Number(irrigation.litersPerAcre).toLocaleString()}{" "}
                    <span className="text-sm font-semibold text-slate-500">L / acre</span>
                  </p>
                )}
                {irrigation.when && (
                  <p className="mt-2 text-sm text-slate-600">
                    <strong>When:</strong> {irrigation.when}
                  </p>
                )}
                {irrigation.method && (
                  <p className="text-sm text-slate-600">
                    <strong>Method:</strong> {irrigation.method}
                  </p>
                )}
                {irrigation.tips?.length > 0 && (
                  <ul className="mt-3 space-y-1 text-xs text-slate-500">
                    {irrigation.tips.map((t) => (
                      <li key={t}>• {t}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Weather;
