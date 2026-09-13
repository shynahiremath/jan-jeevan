import { useTranslation } from "react-i18next";
import { Mic, Sparkles } from "lucide-react";

function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-orange-50" />
      <div className="absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-brand-300/40 to-teal-200/30 blur-3xl animate-blob" />
      <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-accent-200/50 to-amber-100/40 blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-violet-200/20 blur-3xl animate-float" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-28 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/90 px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-lg shadow-brand-500/10 backdrop-blur animate-fade-in-up">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Voice-first • Visual-first • Built for Bharat
          </div>

          <h1 className="section-title mb-5 text-4xl sm:text-5xl lg:text-6xl !leading-[1.1] animate-fade-in-up stagger-1">
            <span className="gradient-text">{t("heroTitle")}</span>
          </h1>
          <p className="mx-auto mb-12 max-w-xl text-lg text-slate-600 sm:text-xl animate-fade-in-up stagger-2">
            {t("heroSubtitle")}
          </p>

          <div className="flex flex-col items-center gap-4 animate-fade-in-up stagger-3">
            <button
              className="group relative flex h-32 w-32 flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-400 via-brand-500 to-teal-600 text-white shadow-2xl shadow-brand-500/40 transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse-glow"
              aria-label="Tap to speak"
            >
              <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity shimmer-bg" />
              <Mic className="h-9 w-9 mb-1.5 relative z-10 transition group-hover:scale-110" />
              <span className="text-[11px] font-bold tracking-wide uppercase relative z-10">{t("tapToSpeak")}</span>
            </button>
          </div>
          <p className="mt-5 text-xs text-slate-400 animate-fade-in-up stagger-4">{t("voiceComingSoon")}</p>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-3 text-sm animate-fade-in-up stagger-5">
            {[
              { emoji: "🌾", label: "Agriculture", color: "from-emerald-50 to-green-50 border-emerald-200" },
              { emoji: "🩺", label: "Healthcare", color: "from-rose-50 to-red-50 border-rose-200" },
              { emoji: "💰", label: "Fin-Inclusion", color: "from-amber-50 to-yellow-50 border-amber-200" },
            ].map((item) => (
              <span key={item.label} className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${item.color} px-4 py-2 shadow-md border font-medium text-slate-700 transition hover:scale-105`}>
                <span className="text-base">{item.emoji}</span> {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;
