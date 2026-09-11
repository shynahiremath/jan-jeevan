import { useTranslation } from "react-i18next";

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          {t("heroTitle")}
        </h1>
        <p className="text-xl text-gray-600 mb-10">{t("heroSubtitle")}</p>

        <button
          className="mx-auto flex flex-col items-center justify-center w-40 h-40 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 active:scale-95 transition"
          aria-label="Tap to speak"
        >
          <span className="text-5xl">🎤</span>
          <span className="mt-2 font-semibold">{t("tapToSpeak")}</span>
        </button>

        <p className="text-sm text-gray-400 mt-4">{t("voiceComingSoon")}</p>
      </div>
    </section>
  );
}

export default Hero;