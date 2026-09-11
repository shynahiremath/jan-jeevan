import FinanceRecord from "../models/FinanceRecord.js";

// POST /api/finance/records  (create or update the user's finance record)
export const saveFinanceRecord = async (req, res) => {
  try {
    const { monthlyIncome, monthlyExpenses, currentSavings, existingLoanEMI } = req.body;

    if (
      monthlyIncome === undefined ||
      monthlyExpenses === undefined ||
      currentSavings === undefined
    ) {
      return res.status(400).json({
        message: "monthlyIncome, monthlyExpenses, and currentSavings are required.",
      });
    }

    if (monthlyIncome < 0 || monthlyExpenses < 0 || currentSavings < 0) {
      return res.status(400).json({ message: "Values cannot be negative." });
    }

    // Upsert: update if it exists for this user, otherwise create it
    const record = await FinanceRecord.findOneAndUpdate(
      { userId: req.userId },
      {
        userId: req.userId,
        monthlyIncome,
        monthlyExpenses,
        currentSavings,
        existingLoanEMI: existingLoanEMI || 0,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ record });
  } catch (error) {
    console.error("Save finance record error:", error.message);
    res.status(500).json({ message: "Something went wrong saving your finance data." });
  }
};

// GET /api/finance/dashboard  (fetch the user's finance record + simple calculations)
export const getFinanceDashboard = async (req, res) => {
  try {
    const record = await FinanceRecord.findOne({ userId: req.userId });

    if (!record) {
      return res.status(200).json({ record: null });
    }

    const monthlySavings = record.monthlyIncome - record.monthlyExpenses - record.existingLoanEMI;
    const savingsRate =
      record.monthlyIncome > 0
        ? ((monthlySavings / record.monthlyIncome) * 100).toFixed(1)
        : 0;

    res.status(200).json({
      record,
      calculated: {
        monthlySavings,
        savingsRate: Number(savingsRate),
      },
    });
  } catch (error) {
    console.error("Get finance dashboard error:", error.message);
    res.status(500).json({ message: "Something went wrong loading your dashboard." });
  }
};