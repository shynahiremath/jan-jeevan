import { fetchMandiPrices } from "../services/mandiService.js";

// GET /api/mandi-prices?state=..&commodity=..
export const getMandiPrices = async (req, res) => {
  try {
    const { state, commodity } = req.query;

    if (!state && !commodity) {
      return res.status(400).json({
        message: "Please provide at least a state or a commodity to search.",
      });
    }

    const { records, fromCache } = await fetchMandiPrices({ state, commodity });

    if (records.length === 0) {
      return res.status(200).json({
        prices: [],
        message: "No prices found for this search. This mandi/crop combo may not have reported today, or try a different state or crop name.",
      });
    }

    const prices = records.map((r) => ({
      state: r.state,
      district: r.district,
      market: r.market,
      commodity: r.commodity,
      variety: r.variety,
      grade: r.grade,
      minPrice: r.min_price,
      maxPrice: r.max_price,
      modalPrice: r.modal_price,
      arrivalDate: r.arrival_date,
    }));

    res.status(200).json({
      prices,
      source: "data.gov.in — Ministry of Agriculture and Farmers Welfare",
      sourceUrl: "https://www.data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi",
      updateFrequency: "Daily",
      fromCache,
    });
  } catch (error) {
    console.error("Mandi price fetch error:", error.message);
    res.status(503).json({
      message: "Could not fetch mandi prices right now. Please try again shortly.",
    });
  }
};