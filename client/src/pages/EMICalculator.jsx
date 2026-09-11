import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useEffect } from "react";

const API_BASE = "http://localhost:5000/api";

function EMICalculator() {
  const { user, token } = useAuth();

  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(9);
  const [tenureYears, setTenureYears] = useState(5);
  const [financeData, setFinanceData] = useState(null);

  useEffect(() => {
    if (!user) return;
    axios
      .get(`${API_BASE}/finance/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.record) setFinanceData(res.data);
      })
      .catch(() => {});
  }, [user, token]);

  const result = useMemo(() => {
    const P = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(tenureYears);

    if (P <= 0 || annualRate <= 0 || years <= 0) {
      return null;
    }

    const r = annualRate / 12 / 100;
    const n = years * 12;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalRepayment = emi * n;
    const totalInterest = totalRepayment - P;

    return {
      emi: Math.round(emi),
      totalRepayment: Math.round(totalRepayment),
      totalInterest: Math.round(totalInterest),
    };
  }, [loanAmount, interestRate, tenureYears]);

  const affordability = useMemo(() => {
    if (!result || !financeData?.record) return null;

    const availableIncome =
      financeData.record.monthlyIncome -
      financeData.record.monthlyExpenses -
      financeData.record.existingLoanEMI;

    const ratio = result.emi / financeData.record.monthlyIncome;

    if (availableIncome <= 0) {
      return { level: "high-risk", message: "Your current expenses already exceed your income." };
    }
    if (result.emi > availableIncome) {
      return {
        level: "high-risk",
        message: "This EMI is higher than what you have left after expenses each month.",
      };
    }
    if (ratio > 0.4) {
      return {
        level: "caution",
        message: "This EMI would take up a large share of your income. Consider a longer tenure or smaller loan.",
      };
    }
    return { level: "comfortable", message: "This EMI looks manageable based on your current finances." };
  }, [result, financeData]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-10 w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">🧮</div>
          <h1 className="text-3xl font-bold text-gray-800">EMI Calculator</h1>
          <p className="text-gray-500 text-sm mt-1">
            Educational estimate only. This is not a lending decision.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">Loan Amount</label>
              <span className="text-sm font-semibold text-gray-800">
                ₹{Number(loanAmount).toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="10000000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full accent-green-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">
                Interest Rate (per year)
              </label>
              <span className="text-sm font-semibold text-gray-800">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full accent-green-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">Tenure (years)</label>
              <span className="text-sm font-semibold text-gray-800">{tenureYears} yrs</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
              className="w-full accent-green-600"
            />
          </div>

          {result && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 mt-4">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
                Calculated result
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500">Monthly EMI</p>
                  <p className="text-xl font-bold text-green-700">
                    ₹{result.emi.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Interest</p>
                  <p className="text-xl font-bold text-gray-800">
                    ₹{result.totalInterest.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Repayment</p>
                  <p className="text-xl font-bold text-gray-800">
                    ₹{result.totalRepayment.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {user && affordability && (
            <div
              className={`rounded-xl p-4 border-2 ${
                affordability.level === "comfortable"
                  ? "bg-green-50 border-green-300"
                  : affordability.level === "caution"
                  ? "bg-yellow-50 border-yellow-300"
                  : "bg-red-50 border-red-300"
              }`}
            >
              <p className="font-semibold text-gray-800 mb-1">
                {affordability.level === "comfortable" && "🟢 Looks Comfortable"}
                {affordability.level === "caution" && "🟡 Use Caution"}
                {affordability.level === "high-risk" && "🔴 High Risk"}
              </p>
              <p className="text-sm text-gray-700">{affordability.message}</p>
              <p className="text-xs text-gray-500 mt-2">
                Based on the income/expenses you entered in your Finance Dashboard.
              </p>
            </div>
          )}

          {user && !financeData?.record && (
            <p className="text-sm text-gray-500 text-center">
              💡 <Link to="/finance" className="text-green-700 underline">Add your income and expenses</Link> to see if this EMI fits your budget.
            </p>
          )}

          {!user && (
            <p className="text-sm text-gray-500 text-center">
              💡 <Link to="/login" className="text-green-700 underline">Log in</Link> and add your finances to see affordability guidance.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default EMICalculator;