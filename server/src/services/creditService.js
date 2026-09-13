export function scoreMicroCredit({ income, expenses, savings, land, livestock }) {
  const monthlyIncome = Number(income) || 0;
  const monthlyExpenses = Number(expenses) || 0;
  const currentSavings = Number(savings) || 0;
  const landAcres = Number(land) || 0;
  const livestockCount = Number(livestock) || 0;
  const surplus = monthlyIncome - monthlyExpenses;

  let s = 40;
  if (surplus > 0) s += 15;
  if (monthlyIncome > 0 && currentSavings > monthlyIncome * 0.1) s += 10;
  if (landAcres > 0) s += 12;
  if (landAcres >= 2) s += 5;
  if (livestockCount > 0) s += 8;
  if (monthlyIncome > 15000) s += 10;
  if (monthlyIncome > 30000) s += 5;
  if (surplus < 0) s -= 10;
  s = Math.min(95, Math.max(25, Math.round(s)));

  const band = s >= 75 ? "Good" : s >= 55 ? "Fair" : "Needs improvement";
  const maxLoan =
    band === "Good" ? Math.min(200000, Math.max(25000, surplus * 18)) :
    band === "Fair" ? Math.min(75000, Math.max(10000, surplus * 10)) :
    Math.min(25000, Math.max(5000, Math.abs(surplus) * 4));

  const tip =
    band === "Good"
      ? "Strong profile for SHG / Mudra / bank BC micro-loans. Carry Aadhaar, land papers and 3 months cash-flow notes."
      : band === "Fair"
      ? "Build 3 months of savings trail and keep expense receipts to improve offers."
      : "Focus on positive monthly surplus first; join a local SHG for group lending.";

  const checklist = [
    surplus > 0 ? "Monthly surplus is positive — good signal." : "Expenses exceed income — cut non-essentials or add income.",
    currentSavings > 0 ? "Some savings present." : "Start a small weekly savings habit.",
    landAcres > 0 ? "Land asset strengthens collateral-style confidence." : "No land listed — livestock / SHG membership can help.",
  ];

  return {
    score: s,
    band,
    tip,
    suggestedLoanRange: {
      min: Math.round(maxLoan * 0.4),
      max: Math.round(maxLoan),
      currency: "INR",
    },
    checklist,
    inputs: { monthlyIncome, monthlyExpenses, currentSavings, landAcres, livestockCount, surplus },
    disclaimer: "Guidance score only. Final decisions depend on KYC and lender policy.",
  };
}
