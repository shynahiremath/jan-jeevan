import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const accentMap = {
  agriculture: { bg: "from-emerald-50 via-green-50 to-teal-50", border: "hover:border-emerald-300", iconBg: "bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-lg shadow-emerald-500/30", ring: "group-hover:ring-emerald-200" },
  healthcare: { bg: "from-rose-50 via-red-50 to-pink-50", border: "hover:border-rose-300", iconBg: "bg-gradient-to-br from-rose-400 to-red-600 text-white shadow-lg shadow-rose-500/30", ring: "group-hover:ring-rose-200" },
  finance: { bg: "from-amber-50 via-yellow-50 to-orange-50", border: "hover:border-amber-300", iconBg: "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30", ring: "group-hover:ring-amber-200" },
  schemes: { bg: "from-sky-50 via-blue-50 to-indigo-50", border: "hover:border-sky-300", iconBg: "bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-500/30", ring: "group-hover:ring-sky-200" },
};

function PillarCard({ icon, title, description, path, variant = "agriculture", features = [] }) {
  const navigate = useNavigate();
  const accent = accentMap[variant] || accentMap.agriculture;
  return (
    <div
      onClick={() => navigate(path)}
      className={`group relative overflow-hidden rounded-2xl border border-white/80 bg-gradient-to-br ${accent.bg} p-6 shadow-lg shadow-slate-200/40 transition-all duration-500 hover:shadow-2xl ${accent.border} hover:-translate-y-2 cursor-pointer`}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/40 blur-2xl transition group-hover:scale-150" />
      <div className={`relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${accent.iconBg} ring-4 ring-transparent transition duration-300 ${accent.ring} group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="relative mb-2 text-xl font-bold text-slate-900">{title}</h3>
      <p className="relative mb-4 text-sm leading-relaxed text-slate-600">{description}</p>
      {features.length > 0 && (
        <ul className="relative mb-4 space-y-1.5">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-400 to-teal-400" />
              {f}
            </li>
          ))}
        </ul>
      )}
      <div className="relative flex items-center gap-1 text-sm font-semibold text-slate-700 transition-all group-hover:gap-2.5 group-hover:text-brand-700">
        Explore <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  );
}
export default PillarCard;
