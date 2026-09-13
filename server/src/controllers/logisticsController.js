import { compareMarkets } from "../services/logisticsService.js";

export const postCompareMarkets = (req, res) => {
  try {
    const { crop, quantity, quantityQuintals } = req.body;
    const qty = quantityQuintals ?? quantity;
    if (qty === undefined || Number(qty) <= 0) {
      return res.status(400).json({ message: "quantity (quintals) must be a positive number." });
    }
    const result = compareMarkets({ crop: crop || "Wheat", quantityQuintals: qty });
    res.status(200).json(result);
  } catch (error) {
    console.error("Logistics compare error:", error.message);
    res.status(500).json({ message: "Could not compare markets." });
  }
};
