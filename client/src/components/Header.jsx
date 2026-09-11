function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤝</span>
          <span className="text-xl font-bold text-green-700">Jan Setu</span>
        </div>

        <div className="flex items-center gap-3">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            aria-label="Select language"
          >
            <option>English</option>
            <option>हिंदी</option>
            <option>मराठी</option>
            <option>ಕನ್ನಡ</option>
          </select>

          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700">
            🚨 Emergency
          </button>

          <button className="border border-green-600 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-50">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;