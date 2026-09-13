import { scoreMicroCredit } from "../services/creditService.js";

export const postCreditScore = (req, res) => {
  try {
    const { income, expenses, savings, land, livestock, monthlyIncome, monthlyExpenses, currentSavings } = req.body;
    const result = scoreMicroCredit({
      income: income ?? monthlyIncome,
      expenses: expenses ?? monthlyExpenses,
      savings: savings ?? currentSavings,
      land,
      livestock,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Credit score error:", error.message);
    res.status(500).json({ message: "Could not estimate credit score." });
  }
};
