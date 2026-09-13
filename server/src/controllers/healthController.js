import { screenSymptoms, getLocalAlerts } from "../services/healthService.js";

export const postSymptomScreen = (req, res) => {
  try {
    const { symptoms } = req.body;
    const result = screenSymptoms(symptoms);
    if (result.level === "none") {
      return res.status(400).json({ message: result.advice });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Symptom screen error:", error.message);
    res.status(500).json({ message: "Could not run health screening." });
  }
};

export const getHealthWatch = (req, res) => {
  try {
    const district = req.query.district || req.query.location || "";
    res.status(200).json(getLocalAlerts(district));
  } catch (error) {
    console.error("Health watch error:", error.message);
    res.status(500).json({ message: "Could not load health alerts." });
  }
};
