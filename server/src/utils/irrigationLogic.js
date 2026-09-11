// CALCULATED_DATA — simple rule-based logic combining real weather
// data with the user's own inputs. This is NOT an AI model and NOT
// a measurement — it's a transparent if/else recommendation.

export const getIrrigationAdvice = ({ temperature, precipitation, soilMoisture, cropType }) => {
  // soilMoisture: "low" | "medium" | "high"
  // cropType: free text, only a few common crops get tailored notes

  let advice = "";
  let urgency = "normal"; // "low" | "normal" | "high"

  const recentlyRained = precipitation > 1; // mm in the last hour

  if (soilMoisture === "low" && !recentlyRained) {
    advice = "Soil moisture is low and there's been no recent rain. Consider watering today.";
    urgency = "high";
  } else if (soilMoisture === "low" && recentlyRained) {
    advice = "Soil moisture is low, but it has rained recently. Check the soil by hand before watering.";
    urgency = "normal";
  } else if (soilMoisture === "medium") {
    advice = recentlyRained
      ? "Soil moisture is adequate and recent rain has helped. No watering needed right now."
      : "Soil moisture is adequate. Monitor and water in the next day or two if no rain comes.";
    urgency = "normal";
  } else if (soilMoisture === "high") {
    advice = "Soil moisture is already high. Avoid watering to prevent waterlogging.";
    urgency = "low";
  }

  if (temperature > 35) {
    advice += " Note: high temperature today may increase water evaporation faster than usual.";
  }

  return {
    advice,
    urgency,
    cropType: cropType || "general",
    label: "Smart recommendation — based on real weather + your input, not a substitute for expert advice.",
  };
};