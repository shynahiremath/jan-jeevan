import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const API_BASE = "http://localhost:5000/api";

const categories = [
  { id: "all", label: "All", icon: "🏛️" },
  { id: "farmer", label: "Farmer", icon: "🌾" },
  { id: "healthcare", label: "Healthcare", icon: "🏥" },
  { id: "housing", label: "Housing", icon: "🏠" },
  { id: "women", label: "Women", icon: "👧" },
  { id: "employment", label: "Employment", icon: "💼" },
];

function Schemes() {
  const { user, token } = useAuth();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showProfileForm, setShowProfileForm] = useState(false);

  const [profile, setProfile] = useState({
    isFarmer: false,
    gender: "",
    hasDaughterUnder10: false,
    isBusinessOwner: false,
    hasOwnHouse: true,
  });
  const [savingProfile, setSavingProfile] = useState(false);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`${API_BASE}/schemes`, { headers });
      setSchemes(res.data.schemes);
    } catch (err) {
      console.error("Failed to load schemes:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await axios.put(`${API_BASE}/auth/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowProfileForm(false);
      fetchSchemes();
    } catch (err) {
      console.error("Failed to save profile:", err.message);
    } finally {
      setSavingProfile(false);
    }
  };

  const filteredSchemes =
    activeCategory === "all" ? schemes : schemes.filter((s) => s.category === activeCategory);

  const recommendedSchemes = schemes.filter((s) => s.recommended);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">🏛️</div>
          <h1 className="text-3xl font-bold text-gray-800">Government Schemes</h1>
          <p className="text-gray-500 text-sm mt-1">
            Real official schemes — each verified against its government source.
          </p>
        </div>

        {user && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-blue-800">
              🔔 Tell us a bit about yourself to see schemes matched to your profile.
            </p>
            <button
              onClick={() => setShowProfileForm(!showProfileForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
            >
              {showProfileForm ? "Close" : "Update My Profile"}
            </button>
          </div>
        )}

        {showProfileForm && (
          <form
            onSubmit={handleProfileSave}
            className="bg-gray-50 rounded-xl p-5 mb-6 space-y-3"
          >
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={profile.isFarmer}
                onChange={(e) => setProfile({ ...profile, isFarmer: e.target.checked })}
              />
              I am a farmer / own agricultural land
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={profile.isBusinessOwner}
                onChange={(e) => setProfile({ ...profile, isBusinessOwner: e.target.checked })}
              />
              I own or want to start a small business
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={profile.hasDaughterUnder10}
                onChange={(e) => setProfile({ ...profile, hasDaughterUnder10: e.target.checked })}
              />
              I have a daughter under 10 years old
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!profile.hasOwnHouse}
                onChange={(e) => setProfile({ ...profile, hasOwnHouse: !e.target.checked })}
              />
              I do not currently own a pucca (permanent) house
            </label>
            <div>
              <label className="block text-sm mb-1">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Prefer not to say</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={savingProfile}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              {savingProfile ? "Saving..." : "Save & See Matches"}
            </button>
          </form>
        )}

        {user && recommendedSchemes.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-semibold text-green-700 uppercase mb-2">
              🔔 Recommended for you
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedSchemes.map((scheme) => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                activeCategory === cat.id
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading schemes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function SchemeCard({ scheme }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{scheme.icon}</span>
          <div>
            <h3 className="font-bold text-gray-800">{scheme.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{scheme.mainBenefit}</p>
          </div>
        </div>
        {scheme.recommended && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
            Matched
          </span>
        )}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm text-green-700 font-medium mt-3 hover:underline"
      >
        {expanded ? "Show less ▲" : "Show details ▼"}
      </button>

      {expanded && (
        <div className="mt-3 space-y-2 text-sm text-gray-700 border-t border-gray-100 pt-3">
          <p><strong>Who can benefit:</strong> {scheme.whoCanBenefit}</p>
          <div>
            <strong>Eligibility:</strong>
            <ul className="list-disc list-inside ml-2">
              {scheme.eligibility.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Required documents:</strong>
            <ul className="list-disc list-inside ml-2">
              {scheme.requiredDocuments.map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
          </div>
          <p><strong>How to apply:</strong> {scheme.howToApply}</p>
          <a
            href={scheme.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-600 underline"
          >
            Official website ↗
          </a>
          <p className="text-xs text-gray-400">Last verified: {scheme.lastVerified}</p>
        </div>
      )}
    </div>
  );
}

export default Schemes;