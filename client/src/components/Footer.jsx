import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="container-app py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-slate-900">Jan Jeevan</p>
            <p className="mt-1 max-w-md text-sm text-slate-500">Practical tools for farming, health and money — built for rural India.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
            <Link to="/agriculture" className="hover:text-brand-700">Agriculture</Link>
            <Link to="/healthcare" className="hover:text-brand-700">Healthcare</Link>
            <Link to="/finance" className="hover:text-brand-700">Finance</Link>
            <Link to="/schemes" className="hover:text-brand-700">Schemes</Link>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-400">Guidance only. Not a substitute for certified experts or emergency care (108).</p>
      </div>
    </footer>
  );
}
