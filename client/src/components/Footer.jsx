import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-gray-300 py-8 px-4 mt-12">
      <div className="max-w-6xl mx-auto text-center">
        <p className="font-semibold text-white mb-2">{t("appName")}</p>
        <p className="text-sm">{t("footerTagline")}</p>
        <p className="text-xs text-gray-500 mt-4">{t("footerNote")}</p>
      </div>
    </footer>
  );
}

export default Footer;