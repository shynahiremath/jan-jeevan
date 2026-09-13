import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-app page flex justify-center">
        <form onSubmit={handleSubmit} className="card w-full max-w-sm space-y-4">
          <div className="text-center">
            <h1 className="title text-xl">Create account</h1>
            <p className="subtitle">Join Jan Jeevan</p>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div>
            <label className="label">Name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" className="input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary btn-block">{loading ? "Creating…" : "Register"}</button>
          <p className="text-center text-sm text-slate-500">
            Have an account? <Link to="/login" className="font-semibold text-brand-700">Sign in</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}
