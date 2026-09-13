import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import { useGeolocation } from "../../hooks/useGeolocation";
import { CloudSun, ArrowLeft, Droplets, Wind, MapPin } from "lucide-react";

const API_BASE = "http://localhost:5000/api";
const crops = ["Wheat", "Rice", "Cotton", "Sugarcane", "Maize", "Onion", "Potato", "Other"];

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

function computeIrrigation(weather, soilMoisture, cropType) {
  let urgency = "medium";
  let advice = "Water moderately in the early morning.";
  if (soilMoisture === "high" || weather.precipitation > 2) {
    urgency = "low";
    advice = "Soil is moist / rain expected. Skip irrigation today.";
  } else if (soilMoisture === "low" && weather.temperature > 30) {
    urgency = "high";
    advice = `Hot and dry — irrigate ${cropType} today (early morning or evening).`;
  } else if (soilMoisture === "low") {
    urgency = "high";
    advice = `Soil is dry. Water ${cropType} within 24 hours.`;
  } else if (weather.temperature > 32) {
    advice = `Warm day. Light irrigation recommended for ${cropType}.`;
  }
  return { urgency, advice, label: `${cropType} · soil: ${soilMoisture}` };
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
      if (coords) {
        const res = await axios.get(`${API_BASE}/weather`, { params: { lat: coords.lat, lon: coords.lon }, timeout: 5000 });
        setWeather(res.data.weather || mockWeather());
        if (res.data.irrigation) setIrrigation(res.data.irrigation);
      } else {
        setWeather(mockWeather());
      }
    } catch {
      setWeather(mockWeather());
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { loadWeather(); }, [coords]);

  const getIrrigation = () => {
    if (!weather) return;
    setIrrigation(computeIrrigation(weather, soilMoisture, cropType));
  };

  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link to="/agriculture" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-700 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Agriculture
        </Link>
        <div className="mb-8 text-center animate-fade-in-up">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 text-sky-700 shadow-lg shadow-sky-200/50">
            <CloudSun className="h-7 w-7" />
          </div>
          <h1 className="section-title">Weather & Smart Irrigation</h1>
          <p className="mt-2 text-slate-500 text-sm">Local weather + watering advice for your crop.</p>
        </div>
        {!coords && (
          <div className="card mb-6 text-center animate-fade-in-up">
            <MapPin className="h-8 w-8 text-brand-500 mx-auto mb-2" />
            <p className="text-slate-600 mb-4 text-sm">Share location for more accurate local weather, or continue with estimate.</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button onClick={requestLocation} disabled={geoLoading} className="btn-primary">{geoLoading ? "Getting location…" : "Use my location"}</button>
              <button onClick={loadWeather} className="btn-secondary">Use estimate</button>
            </div>
            {geoError && <p className="text-red-500 text-xs mt-2">{geoError}</p>}
          </div>
        )}
        {fetching && <p className="text-center text-slate-500 text-sm mb-4">Loading weather…</p>}
        {weather && (
          <div className="card mb-6 bg-gradient-to-br from-sky-50 via-white to-blue-50 border-sky-100 animate-scale-in">
            <p className="text-sm font-medium text-sky-700 mb-1">{weather.description}</p>
            <p className="text-5xl font-bold text-slate-900 tracking-tight">{weather.temperature}°C</p>
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="rounded-xl bg-white/80 p-3 text-center shadow-sm">
                <Droplets className="h-4 w-4 text-sky-500 mx-auto mb-1" />
                <p className="text-xs text-slate-400">Humidity</p>
                <p className="font-bold text-slate-800">{weather.humidity}%</p>
              </div>
              <div className="rounded-xl bg-white/80 p-3 text-center shadow-sm">
                <CloudSun className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                <p className="text-xs text-slate-400">Rain</p>
                <p className="font-bold text-slate-800">{weather.precipitation} mm</p>
              </div>
              <div className="rounded-xl bg-white/80 p-3 text-center shadow-sm">
                <Wind className="h-4 w-4 text-slate-500 mx-auto mb-1" />
                <p className="text-xs text-slate-400">Wind</p>
                <p className="font-bold text-slate-800">{weather.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        )}
        {weather && (
          <div className="card animate-fade-in-up stagger-2">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Droplets className="h-5 w-5 text-brand-600" /> Smart Irrigation
            </h2>
            <div className="space-y-4">
              <div>
                <label className="label">Crop</label>
                <select value={cropType} onChange={(e) => setCropType(e.target.value)} className="input-field">
                  {crops.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Soil moisture (check by hand)</label>
                <select value={soilMoisture} onChange={(e) => setSoilMoisture(e.target.value)} className="input-field">
                  <option value="low">Low — dry, crumbly</option>
                  <option value="medium">Medium — slightly moist</option>
                  <option value="high">High — wet, sticks together</option>
                </select>
              </div>
              <button onClick={getIrrigation} className="btn-primary w-full">Get recommendation</button>
            </div>
            {irrigation && (
              <div className={`mt-4 p-4 rounded-xl text-sm animate-scale-in ${
                irrigation.urgency === "high" ? "bg-red-50 text-red-800 border border-red-200" :
                irrigation.urgency === "low" ? "bg-slate-50 text-slate-700 border border-slate-200" :
                "bg-amber-50 text-amber-900 border border-amber-200"
              }`}>
                <p className="font-semibold">{irrigation.advice}</p>
                <p className="text-xs opacity-70 mt-1">{irrigation.label}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
export default Weather;
