import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-gray-50 p-8 rounded-2xl shadow-md"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create Account
          </h1>

          {error && (
            <p className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded-lg mb-4">
              {error}
            </p>
          )}

          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Register;