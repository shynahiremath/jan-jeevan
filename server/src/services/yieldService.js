const BASE_YIELD = {
  Wheat: 3.2, Rice: 4.1, Maize: 3.8, Cotton: 1.8,
  Sugarcane: 70, Soybean: 1.5, Onion: 18, Potato: 22,
};
const QUINTAL_CROPS = new Set(["Sugarcane", "Onion", "Potato"]);
const PRICE_PER_UNIT = {
  Wheat: 2200, Rice: 3000, Maize: 1950, Cotton: 5800,
  Sugarcane: 350, Soybean: 4400, Onion: 1500, Potato: 1000,
};

export function predictYield({ crop, areaAcres, soil, season, rainfall, fertilizer }) {
  const cropName = crop || "Wheat";
  const base = BASE_YIELD[cropName] ?? 3.0;
  let mult = 1;
  const notes = [];

  if (rainfall === "high") { mult += 0.12; notes.push("Above-normal rain supports growth if drainage is good."); }
  if (rainfall === "low") { mult -= 0.18; notes.push("Below-normal rain: plan protective irrigation."); }
  if (fertilizer === "high") { mult += 0.15; notes.push("Balanced NPK + micronutrients can lift yield further."); }
  if (fertilizer === "low") { mult -= 0.12; notes.push("Low fertilizer often caps yield — soil test helps."); }
  if (soil === "Black" || soil === "Alluvial") { mult += 0.08; notes.push(`${soil} soil is generally favourable for this crop.`); }
  if (soil === "Sandy") { mult -= 0.1; notes.push("Sandy soil needs more frequent light irrigation."); }
  if (season === "Rabi" && (cropName === "Wheat" || cropName === "Potato")) mult += 0.05;
  if (season === "Kharif" && ["Rice", "Maize", "Cotton"].includes(cropName)) mult += 0.05;

  const area = Math.max(0.1, Number(areaAcres) || 1);
  const yieldPerAcre = +(base * mult).toFixed(2);
  const total = +(yieldPerAcre * area).toFixed(2);
  const low = +(total * 0.88).toFixed(2);
  const high = +(total * 1.12).toFixed(2);
  const unit = QUINTAL_CROPS.has(cropName) ? "quintals" : "tonnes";
  const qtl = unit === "tonnes" ? total * 10 : total;
  const price = PRICE_PER_UNIT[cropName] || 2000;
  const revenueMid = Math.round(qtl * price);
  const revenueLow = Math.round(revenueMid * 0.88);
  const revenueHigh = Math.round(revenueMid * 1.12);

  const actions = [
    "Confirm seed variety suited to your district.",
    "Schedule one soil moisture check each week.",
    "Track mandi modal price 2–3 weeks before harvest.",
  ];
  if (rainfall === "low") actions.unshift("Book irrigation / tank water early.");
  if (fertilizer === "low") actions.unshift("Apply recommended basal dose after soil test if possible.");

  return {
    crop: cropName,
    areaAcres: area,
    yieldPerAcre,
    total,
    low,
    high,
    unit,
    revenueEstimate: { low: revenueLow, mid: revenueMid, high: revenueHigh, priceAssumed: price, unit: "₹" },
    notes,
    actions,
    factors: { soil, season, rainfall, fertilizer, multiplier: +mult.toFixed(3) },
    disclaimer: "Estimate for planning only. Actual yield and prices vary by field and market.",
  };
}
