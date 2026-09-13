import { useState } from "react";
import Layout from "../components/Layout";
import api from "../lib/api";
import { Stethoscope, MapPin, FileHeart, AlertTriangle, CheckCircle2 } from "lucide-react";

const SYMPTOMS = ["Fever", "Cough", "Headache", "Body pain", "Stomach pain", "Diarrhea", "Breathing difficulty", "Chest pain", "Dizziness", "Skin rash", "Vomiting", "Weakness"];

export default function Healthcare() {
  const [tab, setTab] = useState("check");
  const [selected, setSelected] = useState([]);
  const [screening, setScreening] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [records, setRecords] = useState([
    { id: 1, date: "2026-08-12", type: "Fever & cough", note: "Rest advised, paracetamol" },
    { id: 2, date: "2026-05-03", type: "Vaccination", note: "TT booster" },
  ]);

  const toggle = (s) => setSelected((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const run = async () => {
    if (!selected.length) return;
    try {
      const res = await api.post("/health/screen", { symptoms: selected });
      setScreening(res.data);
    } catch {
      const urgent = selected.some((s) => ["Breathing difficulty", "Chest pain"].includes(s));
      const moderate = selected.some((s) => ["Fever", "Diarrhea", "Vomiting"].includes(s));
      setScreening({
        level: urgent ? "urgent" : moderate ? "moderate" : "mild",
        advice: urgent ? "Seek emergency care now (call 108)." : moderate ? "Visit PHC today. Stay hydrated." : "Rest and fluids. See a doctor if worse in 48h.",
        nextSteps: urgent ? ["Call 108"] : ["Monitor symptoms", "Drink clean water"],
      });
    }
  };

  const tabs = [
    { id: "check", label: "Health Check", icon: Stethoscope },
    { id: "watch", label: "Local Watch", icon: MapPin },
    { id: "records", label: "Records", icon: FileHeart },
  ];

  return (
    <Layout>
      <div className="container-app page max-w-xl">
        <div className="page-header">
          <h1 className="title">Healthcare</h1>
          <p className="subtitle">Screening, local alerts and simple records</p>
        </div>

        <div className="tabs mb-6 justify-center">
          {tabs.map((t) => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)} className={`tab ${tab === t.id ? "tab-active" : ""}`}>
              <t.icon className="mr-1.5 inline h-3.5 w-3.5" />{t.label}
            </button>
          ))}
        </div>

        {tab === "check" && (
          <div className="card space-y-4">
            <p className="font-semibold text-slate-900">Select symptoms</p>
            <div className="flex flex-wrap gap-2">
              {SYMPTOMS.map((s) => (
                <button key={s} type="button" onClick={() => toggle(s)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium ${selected.includes(s) ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {s}
                </button>
              ))}
            </div>
            <button type="button" onClick={run} disabled={!selected.length} className="btn-primary w-full">Get guidance</button>
            {screening && (
              <div className={`alert ${screening.level === "urgent" ? "alert-danger" : screening.level === "moderate" ? "alert-warn" : "alert-info"}`}>
                <div className="mb-1 flex items-center gap-2">
                  {screening.level === "urgent" ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                  <span className="font-bold capitalize">{screening.level} priority</span>
                </div>
                <p>{screening.advice}</p>
                {screening.nextSteps?.map((s) => <p key={s} className="mt-1 text-sm">• {s}</p>)}
                <p className="mt-2 text-xs opacity-70">Not a diagnosis. Emergency → 108.</p>
              </div>
            )}
          </div>
        )}

        {tab === "watch" && (
          <div className="space-y-3">
            <div className="alert alert-warn">
              <p className="font-bold">Seasonal viral fever</p>
              <p className="mt-1">Cases rising nearby. Use mosquito nets, clear stagnant water, seek care if fever lasts more than 2 days.</p>
            </div>
            <div className="card">
              <p className="mb-2 font-semibold">Prevention tips</p>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• Drink boiled / filtered water in monsoon</li>
                <li>• Finish full medicine courses</li>
                <li>• Keep ORS ready for diarrhea season</li>
                <li>• Don’t skip ANC visits in pregnancy</li>
              </ul>
            </div>
          </div>
        )}

        {tab === "records" && (
          <div className="space-y-3">
            <div className="card">
              <label className="label">Patient name</label>
              <input className="input" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Family member" />
            </div>
            {records.map((r) => (
              <div key={r.id} className="card flex gap-3">
                <div className="icon-box bg-rose-50 text-rose-600"><FileHeart className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold">{r.type}</p>
                  <p className="text-xs text-slate-400">{r.date}</p>
                  <p className="text-sm text-slate-600">{r.note}</p>
                </div>
              </div>
            ))}
            <button type="button" className="btn-secondary w-full" onClick={() => setRecords((p) => [...p, { id: Date.now(), date: new Date().toISOString().slice(0, 10), type: "Note", note: patientName ? `For ${patientName}` : "Session note" }])}>
              + Add note
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
