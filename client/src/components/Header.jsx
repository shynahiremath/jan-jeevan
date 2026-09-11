import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🤝</span>
          <span className="text-xl font-bold text-green-700">{t("appName")}</span>
        </Link>

        <div className="flex items-center gap-3">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            aria-label="Select language"
            value={i18n.language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
            <option value="kn">ಕನ್ನಡ</option>
          </select>

          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700">
            🚨 {t("emergency")}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 hidden sm:inline">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="border border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="border border-green-600 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-50"
            >
              {t("login")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;