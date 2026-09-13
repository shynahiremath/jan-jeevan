import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const accentMap = {
  agriculture: { bg: "from-emerald-50 to-green-50", border: "hover:border-emerald-300", iconBg: "bg-emerald-100 text-emerald-700", ring: "group-hover:ring-emerald-200" },
  healthcare: { bg: "from-rose-50 to-red-50", border: "hover:border-rose-300", iconBg: "bg-rose-100 text-rose-700", ring: "group-hover:ring-rose-200" },
  finance: { bg: "from-amber-50 to-yellow-50", border: "hover:border-amber-300", iconBg: "bg-amber-100 text-amber-700", ring: "group-hover:ring-amber-200" },
  schemes: { bg: "from-sky-50 to-blue-50", border: "hover:border-sky-300", iconBg: "bg-sky-100 text-sky-700", ring: "group-hover:ring-sky-200" },
};

function PillarCard({ icon, title, description, path, variant = "agriculture", features = [] }) {
  const navigate = useNavigate();
  const accent = accentMap[variant] || accentMap.agriculture;
  return (
    <div onClick={() => navigate(path)}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br ${accent.bg} p-6 shadow-sm transition-all duration-300 hover:shadow-xl ${accent.border} hover:-translate-y-1 cursor-pointer`}>
      <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${accent.iconBg} ring-4 ring-transparent transition ${accent.ring}`}>
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-slate-600">{description}</p>
      {features.length > 0 && (
        <ul className="mb-4 space-y-1.5">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />{f}
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 transition group-hover:gap-2">
        Explore <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  );
}
export default PillarCard;
