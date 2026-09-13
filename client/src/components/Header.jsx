import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, Phone, LogOut, User } from "lucide-react";

const navLinks = [
  { to: "/agriculture", label: "Agriculture" },
  { to: "/healthcare", label: "Healthcare" },
  { to: "/finance", label: "Finance" },
  { to: "/schemes", label: "Schemes" },
];

function Header() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLanguageChange = (e) => i18n.changeLanguage(e.target.value);
  const handleLogout = () => { logout(); navigate("/"); setMobileOpen(false); };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-500/25">
            <span className="text-lg font-bold">J</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">Jan Jeevan</span>
            <span className="text-[10px] font-medium text-slate-400 tracking-wide uppercase">Rural Empowerment</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = location.pathname.startsWith(link.to);
            return (
              <Link key={link.to} to={link.to}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <select className="hidden sm:block rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            value={i18n.language} onChange={handleLanguageChange}>
            <option value="en">EN</option>
            <option value="hi">हिं</option>
            <option value="mr">मर</option>
            <option value="kn">ಕನ್</option>
          </select>
          <a href="tel:108" className="btn-danger !px-3 !py-1.5 text-xs sm:!px-4 sm:!py-2">
            <Phone className="h-3.5 w-3.5" /><span className="hidden sm:inline">108</span>
          </a>
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600 max-w-[100px] truncate">{user.name}</span>
              <button onClick={handleLogout} className="btn-ghost !px-2.5 !py-1.5" title="Logout"><LogOut className="h-4 w-4" /></button>
            </div>
          ) : (
            <Link to="/login" className="btn-secondary !px-3 !py-1.5 text-xs sm:!px-4 sm:!py-2 hidden sm:inline-flex">
              <User className="h-3.5 w-3.5" />{t("login")}
            </Link>
          )}
          <button className="md:hidden btn-ghost !p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
            <select className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm" value={i18n.language} onChange={handleLanguageChange}>
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>
            {user ? (
              <button onClick={handleLogout} className="btn-secondary flex-1">Logout</button>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 text-center">Login</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;
