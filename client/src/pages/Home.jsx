import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { Droplets, BarChart3, Truck, Stethoscope, MapPin, FileHeart, CreditCard, Smartphone, Users, ArrowUpRight } from "lucide-react";

const pillars = [
  {
    title: "Agriculture",
    to: "/agriculture",
    tone: "from-[#b8f34a]/20 to-transparent",
    badge: "badge-green",
    items: [
      { icon: Droplets, name: "Smart Irrigation", desc: "Weather + soil → water today?", to: "/agriculture/weather" },
      { icon: BarChart3, name: "Yield Prediction", desc: "Estimate harvest before sowing", to: "/agriculture/yield-prediction" },
      { icon: Truck, name: "Market Logistics", desc: "Best mandi after transport cost", to: "/agriculture/sell-transport" },
    ],
  },
  {
    title: "Healthcare",
    to: "/healthcare",
    tone: "from-[#ff6b4a]/15 to-transparent",
    badge: "badge-red",
    items: [
      { icon: Stethoscope, name: "Remote Health Check", desc: "Symptom triage in plain words", to: "/healthcare" },
      { icon: MapPin, name: "Local Health Watch", desc: "Area alerts & prevention tips", to: "/healthcare" },
      { icon: FileHeart, name: "Digital Records", desc: "Simple notes for the family", to: "/healthcare" },
    ],
  },
  {
    title: "Fin-Inclusion",
    to: "/finance",
    tone: "from-[#ffc857]/20 to-transparent",
    badge: "badge-amber",
    items: [
      { icon: CreditCard, name: "Micro-Credit Score", desc: "Fair profile without a bureau", to: "/finance" },
      { icon: Smartphone, name: "Assisted Payments", desc: "UPI steps for first-timers", to: "/finance" },
      { icon: Users, name: "Community Savings", desc: "Goals & group funds", to: "/finance" },
    ],
  },
];

export default function Home() {
  return (
    <Layout>
      <Hero />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Everything in one place</p>
            <h2 className="section-title mt-1">Nine tools. Zero fluff.</h2>
          </div>
          <Link to="/schemes" className="btn-ghost text-sm">
            Browse government schemes <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <div key={p.title} className={`bento bg-gradient-to-b ${p.tone} anim-rise delay-${i + 1}`}>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-slate-900">{p.title}</h3>
                <Link to={p.to} className={`${p.badge} badge`}>Open</Link>
              </div>
              <ul className="space-y-3">
                {p.items.map((it) => (
                  <li key={it.name}>
                    <Link to={it.to} className="group flex gap-3 rounded-2xl border border-slate-100/80 bg-white/70 p-3 transition hover:border-slate-200 hover:shadow-md">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white group-hover:scale-105 transition">
                        <it.icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-slate-900">{it.name}</span>
                        <span className="text-xs text-slate-500">{it.desc}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
