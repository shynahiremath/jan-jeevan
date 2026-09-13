import { fetchMandiPrices } from "../services/mandiService.js";

export const getMandiPrices = async (req, res) => {
  try {
    const { state, commodity } = req.query;
    const { records, fromCache, source } = await fetchMandiPrices({ state, commodity });

    if (!records.length) {
      return res.status(200).json({
        prices: [],
        message: "No prices found for this search. Try a different state or crop.",
      });
    }

    const prices = records.map((r) => ({
      state: r.state,
      district: r.district,
      market: r.market,
      commodity: r.commodity,
      variety: r.variety,
      grade: r.grade,
      minPrice: Number(r.min_price) || 0,
      maxPrice: Number(r.max_price) || 0,
      modalPrice: Number(r.modal_price) || 0,
      min: Number(r.min_price) || 0,
      max: Number(r.max_price) || 0,
      modal: Number(r.modal_price) || 0,
      arrivalDate: r.arrival_date,
    }));

    res.status(200).json({
      prices,
      source: source === "mock"
        ? "Sample mandi rates (set MANDI_API_KEY for live data.gov.in)"
        : "data.gov.in — Ministry of Agriculture and Farmers Welfare",
      sourceUrl: "https://www.data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi",
      updateFrequency: source === "mock" ? "Demo" : "Daily",
      fromCache: !!fromCache,
    });
  } catch (error) {
    console.error("Mandi price error:", error.message);
    res.status(503).json({ message: "Could not fetch mandi prices right now." });
  }
};
