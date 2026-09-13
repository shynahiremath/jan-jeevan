import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, Phone, LogOut, Sparkles } from "lucide-react";

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
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#b8f34a] to-[#2ee6d6] text-lg font-black text-[#0b1220] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
            ज
          </span>
          <div className="leading-tight">
            <p className="font-display text-base font-extrabold tracking-tight text-slate-900">Jan Jeevan</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Rural Super App</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = loc.pathname.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to} className={`nav-pill ${active ? "nav-pill-active" : "text-slate-600 hover:bg-slate-100"}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a href="tel:108" className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100 transition">
            <Phone className="h-3.5 w-3.5" /> 108
          </a>
          {user ? (
            <button onClick={() => { logout(); nav("/"); }} className="btn-ghost !py-2 !px-3 text-xs">
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          ) : (
            <Link to="/login" className="btn-dark !py-2 !px-4 text-xs">
              <Sparkles className="h-3.5 w-3.5" /> Sign in
            </Link>
          )}
        </div>

        <button className="md:hidden rounded-xl p-2 hover:bg-slate-100" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white/95 px-4 py-4 md:hidden anim-pop">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${loc.pathname.startsWith(l.to) ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"}`}>
                {l.label}
              </Link>
            ))}
            <a href="tel:108" className="rounded-xl px-4 py-3 text-sm font-bold text-red-600 bg-red-50">Emergency 108</a>
          </div>
        </div>
      )}
    </header>
  );
}
