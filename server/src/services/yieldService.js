/** Rule-based yield estimate (tonnes or quintals per acre). Not ML — transparent factors. */
const BASE_YIELD = {
  Wheat: 3.2,
  Rice: 4.1,
  Maize: 3.8,
  Cotton: 1.8,
  Sugarcane: 70,
  Soybean: 1.5,
  Onion: 18,
  Potato: 22,
};

const QUINTAL_CROPS = new Set(["Sugarcane", "Onion", "Potato"]);

export function predictYield({ crop, areaAcres, soil, season, rainfall, fertilizer }) {
  const cropName = crop || "Wheat";
  const base = BASE_YIELD[cropName] ?? 3.0;
  let mult = 1;

  if (rainfall === "high") mult += 0.12;
  if (rainfall === "low") mult -= 0.18;
  if (fertilizer === "high") mult += 0.15;
  if (fertilizer === "low") mult -= 0.12;
  if (soil === "Black" || soil === "Alluvial") mult += 0.08;
  if (soil === "Sandy") mult -= 0.1;
  if (season === "Rabi" && (cropName === "Wheat" || cropName === "Potato")) mult += 0.05;
  if (season === "Kharif" && (cropName === "Rice" || cropName === "Maize" || cropName === "Cotton")) mult += 0.05;

  const area = Math.max(0.1, Number(areaAcres) || 1);
  const yieldPerAcre = +(base * mult).toFixed(2);
  const total = +(yieldPerAcre * area).toFixed(2);
  const low = +(total * 0.88).toFixed(2);
  const high = +(total * 1.12).toFixed(2);
  const unit = QUINTAL_CROPS.has(cropName) ? "quintals" : "tonnes";

  return {
    crop: cropName,
    areaAcres: area,
    yieldPerAcre,
    total,
    low,
    high,
    unit,
    factors: { soil, season, rainfall, fertilizer, multiplier: +mult.toFixed(3) },
    disclaimer: "Estimate only. Actual yield depends on local conditions and management.",
  };
}
