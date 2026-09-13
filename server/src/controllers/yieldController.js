import { predictYield } from "../services/yieldService.js";

export const postYieldPrediction = (req, res) => {
  try {
    const { crop, area, areaAcres, soil, season, rainfall, fertilizer } = req.body;
    const acres = areaAcres ?? area;

    if (!crop) {
      return res.status(400).json({ message: "crop is required." });
    }
    if (acres === undefined || acres === null || Number(acres) <= 0) {
      return res.status(400).json({ message: "area (acres) must be a positive number." });
    }

    const result = predictYield({
      crop,
      areaAcres: acres,
      soil: soil || "Alluvial",
      season: season || "Rabi",
      rainfall: rainfall || "normal",
      fertilizer: fertilizer || "medium",
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Yield prediction error:", error.message);
    res.status(500).json({ message: "Could not compute yield prediction." });
  }
};
