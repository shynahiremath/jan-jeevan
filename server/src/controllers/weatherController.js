import { fetchCurrentWeather, getWeatherDescription } from "../services/weatherService.js";
import { getIrrigationAdvice } from "../utils/irrigationLogic.js";

// GET /api/weather?lat=..&lon=..&soilMoisture=..&cropType=..
export const getWeather = async (req, res) => {
  try {
    const { lat, lon, soilMoisture, cropType } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ message: "Location (lat/lon) is required." });
    }

    const weather = await fetchCurrentWeather(lat, lon);
    const description = getWeatherDescription(weather.weatherCode);

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
    console.error("Weather fetch error:", error.message);
    res.status(503).json({
      message: "Could not fetch weather right now. Please try again in a moment.",
    });
  }
};