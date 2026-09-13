import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/60 bg-white/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-extrabold text-slate-900">Jan Jeevan</p>
            <p className="mt-1 max-w-sm text-sm text-slate-500">Practical tools for farmers, families and local communities — agriculture, health and finance in one place.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-600">
            <Link to="/agriculture" className="hover:text-slate-900">Agriculture</Link>
            <Link to="/healthcare" className="hover:text-slate-900">Healthcare</Link>
            <Link to="/finance" className="hover:text-slate-900">Finance</Link>
            <Link to="/schemes" className="hover:text-slate-900">Schemes</Link>
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-400">Built for rural India · Guidance only — not a substitute for certified experts or emergency services.</p>
      </div>
    </footer>
  );
}
