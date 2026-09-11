import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:5000/api";

function Finance() {
  const { user, token } = useAuth();

  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [existingLoanEMI, setExistingLoanEMI] = useState("");

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${API_BASE}/finance/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.record) {
        setDashboard(res.data);
        setMonthlyIncome(res.data.record.monthlyIncome);
        setMonthlyExpenses(res.data.record.monthlyExpenses);
        setCurrentSavings(res.data.record.currentSavings);
        setExistingLoanEMI(res.data.record.existingLoanEMI);
      }
    } catch (err) {
      setError("Could not load your finance data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboard();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setSaving(true);
    try {
      await axios.post(
        `${API_BASE}/finance/records`,
        {
          monthlyIncome: Number(monthlyIncome),
          monthlyExpenses: Number(monthlyExpenses),
          currentSavings: Number(currentSavings),
          existingLoanEMI: Number(existingLoanEMI) || 0,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMsg("Saved successfully!");
      fetchDashboard();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save your finance data.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 max-w-md mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">💰</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Finance Dashboard</h1>
          <p className="text-gray-600 mb-6">Please log in to track your personal finances.</p>
          <Link
            to="/login"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Login
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-10 w-full">
        <div className="text-center mb-8">
  <div className="text-5xl mb-2">💰</div>
  <h1 className="text-3xl font-bold text-gray-800">Finance Dashboard</h1>
  <p className="text-gray-500 text-sm mt-1">
    All figures below are entered by you — nothing here is estimated.
  </p>
  <Link
    to="/finance/emi-calculator"
    className="inline-block mt-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-200"
  >
    🧮 Try the EMI Calculator
  </Link>
</div>

        {loading ? (
          <p className="text-center text-gray-500">Loading your data...</p>
        ) : (
          <>
            {dashboard?.calculated && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
                <p className="text-xs font-semibold text-green-700 uppercase mb-3">
                  Calculated overview
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Monthly Savings</p>
                    <p
                      className={`text-2xl font-bold ${
                        dashboard.calculated.monthlySavings >= 0
                          ? "text-green-700"
                          : "text-red-600"
                      }`}
                    >
                      ₹{dashboard.calculated.monthlySavings.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Savings Rate</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {dashboard.calculated.savingsRate}%
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm space-y-4"
            >
              <h2 className="font-semibold text-gray-800 mb-2">
                {dashboard?.record ? "Update your details" : "Enter your details"}
              </h2>

              {error && (
                <p className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded-lg">{error}</p>
              )}
              {successMsg && (
                <p className="bg-green-100 text-green-700 text-sm px-3 py-2 rounded-lg">
                  {successMsg}
                </p>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Income (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Expenses (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Savings (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Existing Loan EMI (₹, if any)
                </label>
                <input
                  type="number"
                  min="0"
                  value={existingLoanEMI}
                  onChange={(e) => setExistingLoanEMI(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </form>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Finance;