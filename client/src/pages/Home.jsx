import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import {
  Droplets, BarChart3, Truck, Stethoscope, MapPin, FileHeart,
  CreditCard, Smartphone, Users, ArrowRight,
} from "lucide-react";

const tools = [
  { to: "/agriculture/weather", icon: Droplets, title: "Smart Irrigation", desc: "When and how much to water", color: "bg-emerald-50 text-emerald-700" },
  { to: "/agriculture/yield-prediction", icon: BarChart3, title: "Yield Prediction", desc: "Harvest & revenue estimate", color: "bg-sky-50 text-sky-700" },
  { to: "/agriculture/sell-transport", icon: Truck, title: "Market Logistics", desc: "Best mandi after transport", color: "bg-amber-50 text-amber-700" },
  { to: "/healthcare", icon: Stethoscope, title: "Health Check", desc: "Symptom-based guidance", color: "bg-rose-50 text-rose-700" },
  { to: "/healthcare", icon: MapPin, title: "Local Health Watch", desc: "Area alerts & tips", color: "bg-orange-50 text-orange-700" },
  { to: "/healthcare", icon: FileHeart, title: "Digital Records", desc: "Simple family notes", color: "bg-pink-50 text-pink-700" },
  { to: "/finance", icon: CreditCard, title: "Micro-Credit Score", desc: "Estimate creditworthiness", color: "bg-violet-50 text-violet-700" },
  { to: "/finance", icon: Smartphone, title: "Assisted Payments", desc: "UPI steps made simple", color: "bg-indigo-50 text-indigo-700" },
  { to: "/finance", icon: Users, title: "Community Savings", desc: "Goals & group funds", color: "bg-teal-50 text-teal-700" },
];

export default function Home() {
  return (
    <Layout>
      <Hero />
      <section className="container-app page">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="title text-xl sm:text-2xl">All tools</h2>
            <p className="subtitle">Nine practical features — no clutter.</p>
          </div>
          <Link to="/schemes" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800">
            Government schemes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.title + t.to} to={t.to} className="card-link flex gap-3">
              <span className={`icon-box ${t.color}`}>
                <t.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900">{t.title}</span>
                <span className="text-xs text-slate-500">{t.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
