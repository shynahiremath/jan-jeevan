export const getIrrigationAdvice = ({ temperature, precipitation, soilMoisture, cropType }) => {
  let urgency = "normal";
  let litersPerAcre = 0;
  const crop = (cropType || "general").toLowerCase();
  const rain = Number(precipitation) || 0;
  const temp = Number(temperature) || 30;
  const recentlyRained = rain > 1;

  const cropNeed = {
    rice: 25000, wheat: 12000, maize: 15000, cotton: 14000,
    sugarcane: 20000, onion: 10000, potato: 11000, soybean: 10000,
  };
  const base = cropNeed[crop] || 12000;

  if (soilMoisture === "low" && !recentlyRained) {
    urgency = "high";
    litersPerAcre = Math.round(base * (temp > 35 ? 1.25 : 1));
  } else if (soilMoisture === "low" && recentlyRained) {
    urgency = "normal";
    litersPerAcre = Math.round(base * 0.4);
  } else if (soilMoisture === "medium") {
    urgency = recentlyRained ? "low" : "normal";
    litersPerAcre = recentlyRained ? 0 : Math.round(base * 0.55);
  } else if (soilMoisture === "high") {
    urgency = "low";
    litersPerAcre = 0;
  } else {
    litersPerAcre = Math.round(base * 0.5);
  }

  if (temp > 38 && soilMoisture !== "high") {
    urgency = urgency === "low" ? "normal" : "high";
    litersPerAcre = Math.round(litersPerAcre * 1.15);
  }

  const when =
    urgency === "high" ? "Irrigate within 12–24 hours (early morning or evening)." :
    urgency === "normal" ? "Plan irrigation in the next 1–2 days if no rain is expected." :
    "Skip irrigation for now. Re-check soil in 2–3 days.";

  const method =
    crop === "rice" ? "Maintain standing water carefully; avoid overflow." :
    "Prefer furrow / drip if available to save 20–40% water vs flood.";

  const tips = [
    "Feel the soil 10–15 cm deep — if it crumbles dry, water is needed.",
    "Avoid midday irrigation in extreme heat to reduce evaporation loss.",
    "Mulch with crop residue to hold moisture longer.",
  ];
  if (recentlyRained) tips.unshift("Recent rain already added moisture — do not overwater.");
  if (temp > 35) tips.push("High temperature increases evaporation; prefer evening irrigation.");

  const advice =
    litersPerAcre > 0
      ? `Suggested about ${litersPerAcre.toLocaleString()} litres/acre (${(litersPerAcre / 1000).toFixed(1)} kL/acre). ${when}`
      : `No irrigation needed right now. ${when}`;

  return {
    advice,
    urgency,
    litersPerAcre,
    when,
    method,
    tips,
    cropType: cropType || "general",
    label: "Practical estimate from weather + your soil input — adjust for local field conditions.",
  };
};
