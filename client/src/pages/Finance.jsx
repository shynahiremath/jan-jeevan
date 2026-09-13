import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { CreditCard, Smartphone, Users, Calculator, ArrowRight, Shield } from "lucide-react";

function Finance() {
  const [tab, setTab] = useState("credit");
  const [creditForm, setCreditForm] = useState({ income: "", expenses: "", savings: "", land: "", livestock: "" });
  const [score, setScore] = useState(null);
  const [paymentStep, setPaymentStep] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState({ name: "", target: "", current: "0" });
  const [goals, setGoals] = useState([
    { id: 1, name: "Seeds for next season", target: 5000, current: 2200 },
    { id: 2, name: "Group emergency fund", target: 20000, current: 8500 },
  ]);

  const calcScore = (e) => {
    e.preventDefault();
    const income = Number(creditForm.income) || 0;
    const expenses = Number(creditForm.expenses) || 0;
    const savings = Number(creditForm.savings) || 0;
    const land = Number(creditForm.land) || 0;
    const livestock = Number(creditForm.livestock) || 0;
    let s = 40;
    if (income > expenses) s += 15;
    if (savings > income * 0.1) s += 10;
    if (land > 0) s += 12;
    if (livestock > 0) s += 8;
    if (income > 15000) s += 10;
    s = Math.min(95, Math.max(25, s + Math.floor(Math.random() * 5)));
    const band = s >= 75 ? "Good" : s >= 55 ? "Fair" : "Needs improvement";
    setScore({ value: s, band, tip: band === "Good" ? "You may qualify for micro-loans from SHG / bank BC." : "Improve savings ratio and document income for better offers." });
  };

  const tabs = [
    { id: "credit", label: "Micro-Credit Score", icon: CreditCard },
    { id: "payments", label: "Assisted Payments", icon: Smartphone },
    { id: "savings", label: "Community Savings", icon: Users },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-4xl">💰</div>
          <h1 className="section-title">Fin-Inclusion</h1>
          <p className="mt-2 text-slate-500 text-sm">Simple credit profile, guided payments & group savings.</p>
        </div>
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${tab === t.id ? "bg-amber-500 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}>
              <t.icon className="h-4 w-4" />{t.label}
            </button>
          ))}
        </div>
        {tab === "credit" && (
          <div className="space-y-5">
            <form onSubmit={calcScore} className="card space-y-4">
              <h2 className="font-bold text-slate-900">Simple financial profile</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="label">Monthly income (₹)</label><input type="number" className="input-field" value={creditForm.income} onChange={(e) => setCreditForm({ ...creditForm, income: e.target.value })} required /></div>
                <div><label className="label">Monthly expenses (₹)</label><input type="number" className="input-field" value={creditForm.expenses} onChange={(e) => setCreditForm({ ...creditForm, expenses: e.target.value })} required /></div>
                <div><label className="label">Current savings (₹)</label><input type="number" className="input-field" value={creditForm.savings} onChange={(e) => setCreditForm({ ...creditForm, savings: e.target.value })} /></div>
                <div><label className="label">Land (acres)</label><input type="number" step="0.1" className="input-field" value={creditForm.land} onChange={(e) => setCreditForm({ ...creditForm, land: e.target.value })} /></div>
                <div><label className="label">Livestock (count)</label><input type="number" className="input-field" value={creditForm.livestock} onChange={(e) => setCreditForm({ ...creditForm, livestock: e.target.value })} /></div>
              </div>
              <button type="submit" className="btn-primary w-full !bg-amber-500 hover:!bg-amber-600">Estimate Creditworthiness</button>
            </form>
            {score && (
              <div className="card border-amber-200 bg-gradient-to-br from-amber-50 to-white">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900">Your micro-credit score</h3>
                  <span className={`badge ${score.band === "Good" ? "badge-green" : score.band === "Fair" ? "badge-amber" : "badge-red"}`}>{score.band}</span>
                </div>
                <p className="text-5xl font-bold text-amber-600 mb-2">{score.value}</p>
                <p className="text-sm text-slate-600">{score.tip}</p>
                <p className="mt-3 text-xs text-slate-400">Demo score only. Banks use additional KYC & bureau data.</p>
              </div>
            )}
            <Link to="/finance/emi-calculator" className="card-hover flex items-center justify-between !p-4">
              <div className="flex items-center gap-3"><Calculator className="h-5 w-5 text-amber-600" /><span className="font-medium text-slate-800">EMI Calculator</span></div>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
          </div>
        )}
        {tab === "payments" && (
          <div className="card space-y-5">
            <div className="flex items-center gap-2 text-sm text-slate-500"><Shield className="h-4 w-4" /> Guided steps for users with limited digital literacy</div>
            {paymentStep === 0 && (
              <>
                <h2 className="font-bold text-slate-900">What do you want to do?</h2>
                <div className="grid gap-3">
                  {["Send money to family", "Pay shop / merchant", "Receive money", "Check balance"].map((opt, i) => (
                    <button key={opt} onClick={() => setPaymentStep(i + 1)} className="btn-secondary justify-start text-left">{opt}</button>
                  ))}
                </div>
              </>
            )}
            {paymentStep > 0 && (
              <>
                <h2 className="font-bold text-slate-900">Step-by-step guidance</h2>
                <ol className="space-y-3 text-sm text-slate-700 list-decimal list-inside">
                  <li>Open your UPI app (GPay / PhonePe / BHIM) or ask BC / CSC helper.</li>
                  <li>Tap the big button that matches what you want (Send / Pay / Receive).</li>
                  <li>Enter the mobile number or scan the QR code shown at the shop.</li>
                  <li>Type the amount carefully. Double-check before confirming.</li>
                  <li>Enter your UPI PIN only on the official screen — never share it.</li>
                </ol>
                <button onClick={() => setPaymentStep(0)} className="btn-secondary">← Choose another action</button>
                <p className="text-xs text-slate-400">Always verify the name shown before paying. Never share OTP or PIN with anyone.</p>
              </>
            )}
          </div>
        )}
        {tab === "savings" && (
          <div className="space-y-4">
            <div className="card">
              <h2 className="font-bold text-slate-900 mb-4">Your savings goals</h2>
              {goals.map((g) => {
                const pct = Math.min(100, Math.round((g.current / g.target) * 100));
                return (
                  <div key={g.id} className="mb-4 last:mb-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-800">{g.name}</span>
                      <span className="text-slate-500">₹{g.current.toLocaleString()} / ₹{g.target.toLocaleString()}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <form className="card space-y-3" onSubmit={(e) => {
              e.preventDefault();
              if (!savingsGoal.name || !savingsGoal.target) return;
              setGoals((prev) => [...prev, { id: Date.now(), name: savingsGoal.name, target: Number(savingsGoal.target), current: Number(savingsGoal.current) || 0 }]);
              setSavingsGoal({ name: "", target: "", current: "0" });
            }}>
              <h3 className="font-bold text-slate-900">Add goal / group fund</h3>
              <input className="input-field" placeholder="Goal name (e.g. School fees)" value={savingsGoal.name} onChange={(e) => setSavingsGoal({ ...savingsGoal, name: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" className="input-field" placeholder="Target ₹" value={savingsGoal.target} onChange={(e) => setSavingsGoal({ ...savingsGoal, target: e.target.value })} required />
                <input type="number" className="input-field" placeholder="Already saved ₹" value={savingsGoal.current} onChange={(e) => setSavingsGoal({ ...savingsGoal, current: e.target.value })} />
              </div>
              <button type="submit" className="btn-primary w-full !bg-amber-500 hover:!bg-amber-600">Add Goal</button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
export default Finance;
