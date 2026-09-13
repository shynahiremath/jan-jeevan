import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-app page flex justify-center">
        <form onSubmit={handleSubmit} className="card w-full max-w-sm space-y-4">
          <div className="text-center">
            <h1 className="title text-xl">Welcome back</h1>
            <p className="subtitle">Sign in to Jan Jeevan</p>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary btn-block">{loading ? "Signing in…" : "Sign in"}</button>
          <p className="text-center text-sm text-slate-500">
            No account? <Link to="/register" className="font-semibold text-brand-700">Register</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}
