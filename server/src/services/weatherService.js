import axios from "axios";

// REAL_API_DATA — Open-Meteo, no API key required.
// Docs: https://open-meteo.com/en/docs
export const fetchCurrentWeather = async (lat, lon) => {
  const url = "https://api.open-meteo.com/v1/forecast";

  const response = await axios.get(url, {
    params: {
      latitude: lat,
      longitude: lon,
      current: "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code",
      timezone: "auto",
    },
    timeout: 8000,
  });

  const current = response.data.current;

  return {
    temperature: current.temperature_2m, // °C
    humidity: current.relative_humidity_2m, // %
    precipitation: current.precipitation, // mm, last hour
    windSpeed: current.wind_speed_10m, // km/h
    weatherCode: current.weather_code, // WMO code
    time: current.time, // ISO timestamp from Open-Meteo
    source: "Open-Meteo",
    sourceUrl: "https://open-meteo.com",
  };
};

// Rough human-readable label for WMO weather codes (Open-Meteo standard).
// Not exhaustive — covers the common cases for an MVP.
export const getWeatherDescription = (code) => {
  const map = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    80: "Rain showers",
    95: "Thunderstorm",
  };
  return map[code] || "Weather condition unavailable";
};