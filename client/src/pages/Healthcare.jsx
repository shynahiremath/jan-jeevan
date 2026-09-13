import { useState } from "react";
import Layout from "../components/Layout";
import { Stethoscope, MapPin, FileHeart, AlertTriangle, CheckCircle2 } from "lucide-react";

const SYMPTOMS = ["Fever", "Cough", "Headache", "Body pain", "Stomach pain", "Diarrhea", "Breathing difficulty", "Chest pain", "Dizziness", "Skin rash", "Vomiting", "Weakness"];

function Healthcare() {
  const [tab, setTab] = useState("check");
  const [selected, setSelected] = useState([]);
  const [screening, setScreening] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [records, setRecords] = useState([
    { id: 1, date: "2026-08-12", type: "Fever & cough", note: "Paracetamol advised, rest 3 days" },
    { id: 2, date: "2026-05-03", type: "Vaccination", note: "TT booster given" },
  ]);

  const toggleSymptom = (s) => setSelected((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const runScreening = () => {
    if (selected.length === 0) return;
    const urgent = selected.some((s) => ["Breathing difficulty", "Chest pain"].includes(s));
    const moderate = selected.some((s) => ["Fever", "Diarrhea", "Vomiting"].includes(s));
    setScreening({
      level: urgent ? "urgent" : moderate ? "moderate" : "mild",
      advice: urgent ? "Seek emergency care immediately (call 108). Do not wait." : moderate ? "Visit nearest PHC / clinic today. Stay hydrated and monitor symptoms." : "Rest, fluids, and basic care. See a doctor if symptoms worsen in 48 hours.",
      symptoms: [...selected],
    });
  };

  const tabs = [
    { id: "check", label: "Remote Health Check", icon: Stethoscope },
    { id: "watch", label: "Local Health Watch", icon: MapPin },
    { id: "records", label: "Digital Records", icon: FileHeart },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-4xl">🩺</div>
          <h1 className="section-title">Healthcare</h1>
          <p className="mt-2 text-slate-500 text-sm">Preliminary screening, local alerts & simple digital records.</p>
        </div>
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${tab === t.id ? "bg-rose-600 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}>
              <t.icon className="h-4 w-4" />{t.label}
            </button>
          ))}
        </div>
        {tab === "check" && (
          <div className="card space-y-5">
            <h2 className="font-bold text-slate-900">Select symptoms you are experiencing</h2>
            <div className="flex flex-wrap gap-2">
              {SYMPTOMS.map((s) => (
                <button key={s} type="button" onClick={() => toggleSymptom(s)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${selected.includes(s) ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{s}</button>
              ))}
            </div>
            <button onClick={runScreening} disabled={selected.length === 0} className="btn-primary w-full !bg-rose-600 hover:!bg-rose-700">Get Preliminary Guidance</button>
            {screening && (
              <div className={`rounded-xl p-5 border ${screening.level === "urgent" ? "bg-red-50 border-red-200" : screening.level === "moderate" ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-200"}`}>
                <div className="flex items-center gap-2 mb-2">
                  {screening.level === "urgent" ? <AlertTriangle className="h-5 w-5 text-red-600" /> : <CheckCircle2 className="h-5 w-5 text-green-600" />}
                  <span className="font-bold capitalize">{screening.level} priority</span>
                </div>
                <p className="text-sm text-slate-700">{screening.advice}</p>
                <p className="mt-3 text-xs text-slate-400">This is not a diagnosis. Always consult a qualified health worker for serious concerns.</p>
              </div>
            )}
          </div>
        )}
        {tab === "watch" && (
          <div className="space-y-4">
            <div className="card border-amber-200 bg-amber-50/50">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900">Seasonal alert — your district</h3>
                  <p className="mt-1 text-sm text-slate-600">Increased cases of viral fever reported in nearby blocks. Use mosquito nets, avoid stagnant water, and seek care early if fever lasts more than 2 days.</p>
                </div>
              </div>
            </div>
            <div className="card">
              <h3 className="font-bold text-slate-900 mb-2">Awareness in simple language</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Drink clean / boiled water during monsoon.</li>
                <li>• Complete the full course of any medicine given by the doctor.</li>
                <li>• Keep ORS packets ready for diarrhea season.</li>
                <li>• Pregnant women: do not miss ANC check-ups at ASHA / PHC.</li>
              </ul>
            </div>
          </div>
        )}
        {tab === "records" && (
          <div className="space-y-4">
            <div className="card">
              <label className="label">Patient name (for this device)</label>
              <input className="input-field mb-3" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Enter name" />
              <p className="text-xs text-slate-400">Records stay on this device for privacy in this demo.</p>
            </div>
            {records.map((r) => (
              <div key={r.id} className="card !p-4 flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600"><FileHeart className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-slate-900">{r.type}</p>
                  <p className="text-xs text-slate-400">{r.date}</p>
                  <p className="mt-1 text-sm text-slate-600">{r.note}</p>
                </div>
              </div>
            ))}
            <button className="btn-secondary w-full" onClick={() => setRecords((prev) => [...prev, { id: Date.now(), date: new Date().toISOString().slice(0,10), type: "New entry", note: "Added from this session" }])}>+ Add quick note</button>
          </div>
        )}
      </div>
    </Layout>
  );
}
export default Healthcare;
