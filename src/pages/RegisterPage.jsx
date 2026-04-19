import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as apiRegister } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    username: "", email: "", password: "", password_confirm: "",
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password_confirm) {
      setErrors({ password_confirm: "Passwords do not match" });
      return;
    }
    setLoading(true);
    try {
      await apiRegister(form);
      await login({ email: form.email, password: form.password });
      toast.success("Welcome to TruthfulWasp!");
      navigate("/");
    } catch (err) {
      const data = err.response?.data;
      if (data) setErrors(data);
      else toast.error("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded bg-accent flex items-center justify-center text-white font-display font-bold text-lg mx-auto mb-3">
            TW
          </div>
          <h1 className="font-display font-bold text-xl text-text-primary">
            Join TruthfulWasp
          </h1>
          <p className="text-text-muted text-xs mt-1">
            Help us expose online scams
          </p>
        </div>

        <div className="bg-surface border border-border rounded-md p-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            {[
              { key: "username", label: "Username", type: "text", placeholder: "yourname" },
              { key: "email", label: "Email", type: "email", placeholder: "you@email.com" },
              { key: "password", label: "Password", type: "password", placeholder: "••••••••" },
              { key: "password_confirm", label: "Confirm Password", type: "password", placeholder: "••••••••" },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="label">{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={set(key)}
                  className="input"
                  placeholder={placeholder}
                  required
                />
                {errors[key] && (
                  <p className="error-text">
                    {Array.isArray(errors[key]) ? errors[key][0] : errors[key]}
                  </p>
                )}
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-2.5 mt-1"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="border-t border-border mt-4 pt-4 text-center">
            <p className="text-xs text-text-muted">
              Already a member?{" "}
              <Link to="/login" className="text-accent hover:underline font-semibold">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}