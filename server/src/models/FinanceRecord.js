import mongoose from "mongoose";

const financeRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    monthlyIncome: {
      type: Number,
      required: true,
      min: 0,
    },
    monthlyExpenses: {
      type: Number,
      required: true,
      min: 0,
    },
    currentSavings: {
      type: Number,
      required: true,
      min: 0,
    },
    existingLoanEMI: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const FinanceRecord = mongoose.model("FinanceRecord", financeRecordSchema);

export default FinanceRecord;