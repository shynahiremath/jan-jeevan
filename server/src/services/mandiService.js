import axios from "axios";

const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";
const BASE_URL = `https://api.data.gov.in/resource/${RESOURCE_ID}`;
const cache = new Map();
const CACHE_DURATION_MS = 6 * 60 * 60 * 1000;

const MOCK = {
  Wheat: [
    { state: "Rajasthan", district: "Jaipur", market: "Jaipur", commodity: "Wheat", variety: "Other", grade: "FAQ", min_price: "2100", max_price: "2350", modal_price: "2220", arrival_date: new Date().toISOString().slice(0, 10) },
    { state: "Madhya Pradesh", district: "Indore", market: "Indore", commodity: "Wheat", variety: "Other", grade: "FAQ", min_price: "2150", max_price: "2400", modal_price: "2280", arrival_date: new Date().toISOString().slice(0, 10) },
    { state: "Haryana", district: "Karnal", market: "Karnal", commodity: "Wheat", variety: "Other", grade: "FAQ", min_price: "2200", max_price: "2450", modal_price: "2320", arrival_date: new Date().toISOString().slice(0, 10) },
  ],
  Rice: [
    { state: "Chhattisgarh", district: "Raipur", market: "Raipur", commodity: "Rice", variety: "Other", grade: "FAQ", min_price: "2800", max_price: "3200", modal_price: "3000", arrival_date: new Date().toISOString().slice(0, 10) },
  ],
  Onion: [
    { state: "Maharashtra", district: "Nashik", market: "Lasalgaon", commodity: "Onion", variety: "Other", grade: "FAQ", min_price: "1200", max_price: "1800", modal_price: "1500", arrival_date: new Date().toISOString().slice(0, 10) },
  ],
  Potato: [
    { state: "Uttar Pradesh", district: "Agra", market: "Agra", commodity: "Potato", variety: "Other", grade: "FAQ", min_price: "800", max_price: "1200", modal_price: "1000", arrival_date: new Date().toISOString().slice(0, 10) },
  ],
  Tomato: [
    { state: "Maharashtra", district: "Nashik", market: "Nashik", commodity: "Tomato", variety: "Other", grade: "FAQ", min_price: "1500", max_price: "2500", modal_price: "2000", arrival_date: new Date().toISOString().slice(0, 10) },
  ],
  Cotton: [
    { state: "Gujarat", district: "Rajkot", market: "Rajkot", commodity: "Cotton", variety: "Other", grade: "FAQ", min_price: "5500", max_price: "6200", modal_price: "5800", arrival_date: new Date().toISOString().slice(0, 10) },
  ],
  Maize: [
    { state: "Karnataka", district: "Davangere", market: "Davangere", commodity: "Maize", variety: "Other", grade: "FAQ", min_price: "1800", max_price: "2100", modal_price: "1950", arrival_date: new Date().toISOString().slice(0, 10) },
  ],
  Soybean: [
    { state: "Madhya Pradesh", district: "Indore", market: "Indore", commodity: "Soybean", variety: "Other", grade: "FAQ", min_price: "4200", max_price: "4600", modal_price: "4400", arrival_date: new Date().toISOString().slice(0, 10) },
  ],
};

function mockRecords({ state, commodity }) {
  let list = MOCK[commodity] || MOCK.Wheat;
  if (state) {
    const filtered = list.filter((r) => r.state.toLowerCase().includes(String(state).toLowerCase()));
    if (filtered.length) list = filtered;
  }
  return list;
}

export const fetchMandiPrices = async ({ state, commodity }) => {
  const cacheKey = `${state || "any"}|${commodity || "any"}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.cachedAt < CACHE_DURATION_MS) {
    return { records: cached.data, fromCache: true };
  }

  const apiKey = process.env.MANDI_API_KEY;
  if (!apiKey) {
    const records = mockRecords({ state, commodity });
    return { records, fromCache: false, source: "mock" };
  }

  try {
    const params = {
      "api-key": apiKey,
      format: "json",
      limit: 50,
    };
    if (state) params["filters[state]"] = state;
    if (commodity) params["filters[commodity]"] = commodity;

    const response = await axios.get(BASE_URL, { params, timeout: 10000 });
    const records = response.data.records || [];
    if (!records.length) {
      return { records: mockRecords({ state, commodity }), fromCache: false, source: "mock" };
    }
    cache.set(cacheKey, { data: records, cachedAt: Date.now() });
    return { records, fromCache: false, source: "data.gov.in" };
  } catch (err) {
    console.warn("Mandi API failed, using mock:", err.message);
    return { records: mockRecords({ state, commodity }), fromCache: false, source: "mock" };
  }
};
