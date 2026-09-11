import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useGeolocation } from "../../hooks/useGeolocation";

const API_BASE = "http://localhost:5000/api";

const crops = ["Wheat", "Rice", "Cotton", "Sugarcane", "Maize", "Other"];

function Weather() {
  const { coords, loading: geoLoading, error: geoError, requestLocation } = useGeolocation();

  const [weather, setWeather] = useState(null);
  const [irrigation, setIrrigation] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [fetching, setFetching] = useState(false);

  const [soilMoisture, setSoilMoisture] = useState("medium");
  const [cropType, setCropType] = useState("Wheat");

  const fetchWeather = async (withIrrigation = false) => {
    if (!coords) return;
    setFetching(true);
    setFetchError(null);
    try {
      const params = { lat: coords.lat, lon: coords.lon };
      if (withIrrigation) {
        params.soilMoisture = soilMoisture;
        params.cropType = cropType;
      }
      const res = await axios.get(`${API_BASE}/weather`, { params });
      setWeather(res.data.weather);
      setIrrigation(res.data.irrigation);
    } catch (err) {
      setFetchError(
        err.response?.data?.message || "Could not load weather right now. Please try again."
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (coords) fetchWeather(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-10 w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🌦️</div>
          <h1 className="text-2xl font-bold text-gray-800">Weather & Smart Irrigation</h1>
        </div>

        {!coords && (
          <div className="text-center">
            <p className="text-gray-500 mb-4">
              We need your location to show real, local weather.
            </p>
            <button
              onClick={requestLocation}
              disabled={geoLoading}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              {geoLoading ? "Getting location..." : "📍 Use My Location"}
            </button>
            {geoError && <p className="text-red-600 text-sm mt-3">{geoError}</p>}
          </div>
        )}

        {fetching && <p className="text-center text-gray-500">Loading weather...</p>}
        {fetchError && (
          <div className="text-center">
            <p className="text-red-600 mb-3">{fetchError}</p>
            <button
              onClick={() => fetchWeather(false)}
              className="text-green-700 font-medium hover:underline"
            >
              Retry
            </button>
          </div>
        )}

        {weather && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
            <p className="text-sm text-blue-700 font-medium mb-1">{weather.description}</p>
            <p className="text-4xl font-bold text-gray-800">{weather.temperature}°C</p>
            <div className="grid grid-cols-3 gap-3 mt-4 text-sm text-gray-600">
              <div>💧 Humidity<br /><span className="font-semibold">{weather.humidity}%</span></div>
              <div>🌧️ Rain (1h)<br /><span className="font-semibold">{weather.precipitation} mm</span></div>
              <div>💨 Wind<br /><span className="font-semibold">{weather.windSpeed} km/h</span></div>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Source: {weather.source} · Updated {new Date(weather.time).toLocaleString()}
            </p>
          </div>
        )}

        {weather && (
          <div className="border border-gray-200 rounded-2xl p-6">
            <h2 className="font-bold text-gray-800 mb-3">Get Irrigation Advice</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Crop</label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
                >
                  {crops.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Soil moisture (check by hand)</label>
                <select
                  value={soilMoisture}
                  onChange={(e) => setSoilMoisture(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
                >
                  <option value="low">Low — dry, crumbly</option>
                  <option value="medium">Medium — slightly moist</option>
                  <option value="high">High — wet, sticks together</option>
                </select>
              </div>
              <button
                onClick={() => fetchWeather(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 w-full"
              >
                Get Recommendation
              </button>
            </div>

            {irrigation && (
              <div
                className={`mt-4 p-4 rounded-xl text-sm ${
                  irrigation.urgency === "high"
                    ? "bg-red-50 text-red-800 border border-red-200"
                    : irrigation.urgency === "low"
                    ? "bg-gray-50 text-gray-700 border border-gray-200"
                    : "bg-yellow-50 text-yellow-800 border border-yellow-200"
                }`}
              >
                <p className="font-medium">{irrigation.advice}</p>
                <p className="text-xs opacity-70 mt-2">{irrigation.label}</p>
              </div>
            )}
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

export default Weather;