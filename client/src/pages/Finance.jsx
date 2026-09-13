import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../lib/api";
import { CreditCard, Smartphone, Users, Calculator, ArrowRight, Shield } from "lucide-react";

export default function Finance() {
  const [tab, setTab] = useState("credit");
  const [form, setForm] = useState({ income: "15000", expenses: "10000", savings: "5000", land: "1", livestock: "2" });
  const [score, setScore] = useState(null);
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState({ name: "", target: "", current: "0" });
  const [goals, setGoals] = useState([
    { id: 1, name: "Seeds next season", target: 5000, current: 2200 },
    { id: 2, name: "Emergency fund", target: 20000, current: 8500 },
  ]);

  const calc = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/credit/score", form);
      setScore(res.data);
    } catch {
      const income = Number(form.income) || 0;
      const expenses = Number(form.expenses) || 0;
      let s = 40;
      if (income > expenses) s += 15;
      if (Number(form.savings) > income * 0.1) s += 10;
      if (Number(form.land) > 0) s += 12;
      if (Number(form.livestock) > 0) s += 8;
      if (income > 15000) s += 10;
      s = Math.min(95, Math.max(25, s));
      const band = s >= 75 ? "Good" : s >= 55 ? "Fair" : "Needs improvement";
      setScore({ score: s, band, tip: band === "Good" ? "Strong for SHG / Mudra loans." : "Build savings and document income.", suggestedLoanRange: { min: 10000, max: band === "Good" ? 150000 : 40000 } });
    }
  };

  const tabs = [
    { id: "credit", label: "Credit", icon: CreditCard },
    { id: "payments", label: "Payments", icon: Smartphone },
    { id: "savings", label: "Savings", icon: Users },
  ];

  return (
    <Layout>
      <div className="container-app page max-w-xl">
        <div className="page-header">
          <h1 className="title">Finance</h1>
          <p className="subtitle">Credit score, guided payments and savings goals</p>
        </div>

        <div className="tabs mb-6 justify-center">
          {tabs.map((t) => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)} className={`tab ${tab === t.id ? "tab-active" : ""}`}>
              <t.icon className="mr-1.5 inline h-3.5 w-3.5" />{t.label}
            </button>
          ))}
        </div>

        {tab === "credit" && (
          <div className="space-y-4">
            <form onSubmit={calc} className="card space-y-3">
              <div className="grid-2">
                {[["income","Monthly income ₹"],["expenses","Monthly expenses ₹"],["savings","Savings ₹"],["land","Land (acres)"],["livestock","Livestock"]].map(([k, lab]) => (
                  <div key={k}><label className="label">{lab}</label><input type="number" className="input" value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} required={k === "income" || k === "expenses"} /></div>
                ))}
              </div>
              <button type="submit" className="btn-primary w-full">Estimate score</button>
            </form>
            {score && (
              <div className="card">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Micro-credit score</p>
                  <span className={`badge ${score.band === "Good" ? "badge-green" : score.band === "Fair" ? "badge-amber" : "badge-red"}`}>{score.band}</span>
                </div>
                <p className="mt-2 text-4xl font-bold text-slate-900">{score.score}</p>
                <p className="mt-2 text-sm text-slate-600">{score.tip}</p>
                {score.suggestedLoanRange && (
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    Suggested range: ₹{score.suggestedLoanRange.min?.toLocaleString()} – ₹{score.suggestedLoanRange.max?.toLocaleString()}
                  </p>
                )}
              </div>
            )}
            <Link to="/finance/emi-calculator" className="card-link flex items-center justify-between">
              <span className="flex items-center gap-2 font-semibold"><Calculator className="h-5 w-5 text-brand-600" /> EMI Calculator</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
          </div>
        )}

        {tab === "payments" && (
          <div className="card space-y-4">
            <p className="flex items-center gap-2 text-sm text-slate-500"><Shield className="h-4 w-4" /> Safe steps for digital payments</p>
            {step === 0 ? (
              <div className="grid gap-2">
                {["Send money", "Pay merchant", "Receive money", "Check balance"].map((opt, i) => (
                  <button key={opt} type="button" onClick={() => setStep(i + 1)} className="btn-secondary justify-start">{opt}</button>
                ))}
              </div>
            ) : (
              <>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
                  <li>Open GPay / PhonePe / BHIM (or ask BC helper)</li>
                  <li>Choose Send, Pay or Receive</li>
                  <li>Enter number or scan QR</li>
                  <li>Verify name and amount</li>
                  <li>Enter UPI PIN only on official screen</li>
                </ol>
                <button type="button" onClick={() => setStep(0)} className="btn-secondary">← Back</button>
              </>
            )}
          </div>
        )}

        {tab === "savings" && (
          <div className="space-y-3">
            <div className="card">
              {goals.map((g) => {
                const pct = Math.min(100, Math.round((g.current / g.target) * 100));
                return (
                  <div key={g.id} className="mb-4 last:mb-0">
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium">{g.name}</span>
                      <span className="text-slate-500">₹{g.current.toLocaleString()} / ₹{g.target.toLocaleString()}</span>
                    </div>
                    <div className="progress"><span style={{ width: `${pct}%` }} /></div>
                  </div>
                );
              })}
            </div>
            <form className="card space-y-3" onSubmit={(e) => {
              e.preventDefault();
              if (!goal.name || !goal.target) return;
              setGoals((p) => [...p, { id: Date.now(), name: goal.name, target: Number(goal.target), current: Number(goal.current) || 0 }]);
              setGoal({ name: "", target: "", current: "0" });
            }}>
              <p className="font-semibold">Add goal</p>
              <input className="input" placeholder="Goal name" value={goal.name} onChange={(e) => setGoal({ ...goal, name: e.target.value })} required />
              <div className="grid-2">
                <input type="number" className="input" placeholder="Target ₹" value={goal.target} onChange={(e) => setGoal({ ...goal, target: e.target.value })} required />
                <input type="number" className="input" placeholder="Saved ₹" value={goal.current} onChange={(e) => setGoal({ ...goal, current: e.target.value })} />
              </div>
              <button type="submit" className="btn-primary w-full">Add goal</button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
