import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">J</div>
              <span className="text-lg font-bold text-white">Jan Jeevan</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">{t("footerTagline")}</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Pillars</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/agriculture" className="hover:text-white transition">Agriculture</Link></li>
              <li><Link to="/healthcare" className="hover:text-white transition">Healthcare</Link></li>
              <li><Link to="/finance" className="hover:text-white transition">Fin-Inclusion</Link></li>
              <li><Link to="/schemes" className="hover:text-white transition">Govt Schemes</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="tel:108" className="hover:text-white transition">Emergency 108</a></li>
              <li><Link to="/login" className="hover:text-white transition">Login / Register</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">{t("footerNote")}</div>
      </div>
    </footer>
  );
}
export default Footer;
