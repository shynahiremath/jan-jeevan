const MARKETS = [
  { name: "Local Mandi", distance: 12, pricePerQtl: 2150, transportPerKm: 8 },
  { name: "District APMC", distance: 38, pricePerQtl: 2380, transportPerKm: 7 },
  { name: "State Market Yard", distance: 95, pricePerQtl: 2520, transportPerKm: 6.5 },
  { name: "Private Trader Hub", distance: 55, pricePerQtl: 2450, transportPerKm: 7.5 },
];
const CROP_PRICE_MULT = {
  Wheat: 1, Rice: 1.35, Onion: 0.7, Potato: 0.5, Cotton: 2.5, Maize: 0.9, Tomato: 0.95,
};

export function compareMarkets({ crop = "Wheat", quantityQuintals }) {
  const qty = Math.max(1, Number(quantityQuintals) || 1);
  const mult = CROP_PRICE_MULT[crop] ?? 1;

  const results = MARKETS.map((m) => {
    const pricePerQtl = Math.round(m.pricePerQtl * mult);
    const transport = Math.round(m.distance * m.transportPerKm * (qty / 10));
    const revenue = Math.round(pricePerQtl * qty);
    const net = revenue - transport;
    const netPerQtl = Math.round(net / qty);
    return {
      name: m.name,
      distance: m.distance,
      pricePerQtl,
      transport,
      revenue,
      net,
      netPerQtl,
      tip: m.distance < 20 ? "Lowest travel risk; good for small loads." :
           m.distance > 80 ? "Worth it only if price gap stays high — call buyer first." :
           "Balance of price and distance for most farmers.",
    };
  }).sort((a, b) => b.net - a.net);

  const best = results[0];
  const second = results[1];
  const edge = best && second ? best.net - second.net : 0;

  return {
    crop,
    quantityQuintals: qty,
    markets: results,
    best: best?.name,
    insight:
      edge > 2000
        ? `${best.name} wins by about ₹${edge.toLocaleString()} net vs next option — prioritise that market.`
        : `Top options are close; pick based on trust, weighing facility and payment speed.`,
    disclaimer: "Demo rates for planning. Confirm live mandi price and truck rate before travel.",
  };
}
