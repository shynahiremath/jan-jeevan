import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, Phone, LogOut } from "lucide-react";

const links = [
  { to: "/agriculture", label: "Agriculture" },
  { to: "/healthcare", label: "Healthcare" },
  { to: "/finance", label: "Finance" },
  { to: "/schemes", label: "Schemes" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const loc = useLocation();
  const nav = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-app flex h-14 items-center justify-between sm:h-16">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">ज</span>
          <span className="text-base font-bold text-slate-900">Jan Jeevan</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = loc.pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a href="tel:108" className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-bold text-red-600">
            <Phone className="h-3.5 w-3.5" /> 108
          </a>
          {user ? (
            <button type="button" onClick={() => { logout(); nav("/"); }} className="btn btn-secondary !py-1.5 !px-3 text-xs">
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary !py-1.5 !px-3 text-xs">Sign in</Link>
          )}
        </div>

        <button type="button" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  loc.pathname.startsWith(l.to) ? "bg-brand-50 text-brand-700" : "text-slate-700"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a href="tel:108" className="rounded-lg px-3 py-2.5 text-sm font-bold text-red-600">Emergency 108</a>
            {!user && (
              <Link to="/login" onClick={() => setOpen(false)} className="btn btn-primary btn-block mt-1">Sign in</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
