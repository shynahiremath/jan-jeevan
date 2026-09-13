export function scoreMicroCredit({ income, expenses, savings, land, livestock }) {
  const monthlyIncome = Number(income) || 0;
  const monthlyExpenses = Number(expenses) || 0;
  const currentSavings = Number(savings) || 0;
  const landAcres = Number(land) || 0;
  const livestockCount = Number(livestock) || 0;

  let s = 40;
  if (monthlyIncome > monthlyExpenses) s += 15;
  if (monthlyIncome > 0 && currentSavings > monthlyIncome * 0.1) s += 10;
  if (landAcres > 0) s += 12;
  if (landAcres >= 2) s += 5;
  if (livestockCount > 0) s += 8;
  if (monthlyIncome > 15000) s += 10;
  if (monthlyIncome > 30000) s += 5;
  if (monthlyExpenses > monthlyIncome) s -= 10;

  s = Math.min(95, Math.max(25, Math.round(s)));

  const band = s >= 75 ? "Good" : s >= 55 ? "Fair" : "Needs improvement";
  const tip =
    band === "Good"
      ? "You may qualify for micro-loans from SHG / bank BC."
      : band === "Fair"
      ? "Build a short savings track record and document income for better offers."
      : "Improve savings ratio and document income for better offers.";

  return {
    score: s,
    band,
    tip,
    inputs: { monthlyIncome, monthlyExpenses, currentSavings, landAcres, livestockCount },
    disclaimer: "Demo score for guidance only. Banks use KYC and bureau data.",
  };
}
