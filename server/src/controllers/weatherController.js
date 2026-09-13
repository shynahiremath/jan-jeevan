import { fetchCurrentWeather, getWeatherDescription } from "../services/weatherService.js";
import { getIrrigationAdvice } from "../utils/irrigationLogic.js";

function mockWeather() {
  const hour = new Date().getHours();
  const temp = hour < 6 ? 22 : hour < 12 ? 28 : hour < 18 ? 34 : 26;
  return {
    temperature: temp,
    humidity: 45 + (hour % 20),
    precipitation: hour > 14 && hour < 18 ? 2.5 : 0,
    windSpeed: 8 + (hour % 7),
    weatherCode: hour < 12 ? 2 : 0,
    time: new Date().toISOString(),
    source: "Local estimate (fallback)",
    sourceUrl: "",
  };
}

export const getWeather = async (req, res) => {
  try {
    const { lat, lon, soilMoisture, cropType } = req.query;

    let weather;
    if (lat && lon) {
      try {
        weather = await fetchCurrentWeather(lat, lon);
      } catch (err) {
        console.warn("Open-Meteo failed, using fallback:", err.message);
        weather = mockWeather();
      }
    } else {
      weather = mockWeather();
    }

    const description = getWeatherDescription(weather.weatherCode ?? 0);
    let irrigation = null;
    if (soilMoisture) {
      irrigation = getIrrigationAdvice({
        temperature: weather.temperature,
        precipitation: weather.precipitation,
        soilMoisture,
        cropType,
      });
    }

    res.status(200).json({
      weather: { ...weather, description },
      irrigation,
    });
  } catch (error) {
    console.error("Weather error:", error.message);
    const weather = mockWeather();
    res.status(200).json({
      weather: { ...weather, description: getWeatherDescription(0) },
      irrigation: null,
    });
  }
};
