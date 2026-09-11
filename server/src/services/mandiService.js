import axios from "axios";

// REAL_API_DATA — data.gov.in, "Current Daily Price of Various
// Commodities from Various Markets (Mandi)"
// Resource: https://www.data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi
// Updates DAILY, not real-time.
const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";
const BASE_URL = `https://api.data.gov.in/resource/${RESOURCE_ID}`;

// Simple in-memory cache: key = "state|commodity", value = { data, cachedAt }
// Good enough for a hackathon MVP — resets when the server restarts.
const cache = new Map();
const CACHE_DURATION_MS = 6 * 60 * 60 * 1000; // 6 hours — matches daily update frequency

export const fetchMandiPrices = async ({ state, commodity }) => {
  const cacheKey = `${state || "any"}|${commodity || "any"}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.cachedAt < CACHE_DURATION_MS) {
    return { records: cached.data, fromCache: true };
  }

  const params = {
    "api-key": process.env.MANDI_API_KEY,
    format: "json",
    limit: 50,
  };

  // data.gov.in filter syntax: filters[field]=value
  if (state) params["filters[state]"] = state;
  if (commodity) params["filters[commodity]"] = commodity;

  const response = await axios.get(BASE_URL, { params, timeout: 10000 });

  const records = response.data.records || [];

  cache.set(cacheKey, { data: records, cachedAt: Date.now() });

  return { records, fromCache: false };
};