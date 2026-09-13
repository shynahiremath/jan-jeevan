import { useTranslation } from "react-i18next";
import { Mic, Sparkles } from "lucide-react";

function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-accent-100/50 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Voice-first • Visual-first • Built for Bharat
          </div>
          <h1 className="section-title mb-5 text-4xl sm:text-5xl lg:text-6xl !leading-[1.1]">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg text-slate-600 sm:text-xl">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col items-center gap-4">
            <button className="group relative flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-xl shadow-brand-500/30 transition-all hover:scale-105 hover:shadow-2xl active:scale-95" aria-label="Tap to speak">
              <Mic className="h-8 w-8 mb-1 transition group-hover:scale-110" />
              <span className="text-[11px] font-bold tracking-wide uppercase">{t("tapToSpeak")}</span>
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-400">{t("voiceComingSoon")}</p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-sm border border-slate-100">🌾 Agriculture</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-sm border border-slate-100">🩺 Healthcare</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-sm border border-slate-100">💰 Fin-Inclusion</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;
