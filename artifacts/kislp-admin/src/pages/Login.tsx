import React, { useState } from "react";
import { useLocation } from "wouter";
import { api, setToken } from "../services/api";

interface LoginProps {
  onLoginSuccess: (user: any) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.login(email, password);
      setToken(res.access_token);
      onLoginSuccess(res.user);
      setLocation("/");
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-[#002B49] p-8 text-center text-white">
          <div className="w-16 h-16 rounded-full bg-[#C5A059] text-[#002B49] font-serif font-bold text-3xl flex items-center justify-center mx-auto mb-4 border-2 border-white shadow-md">
            K
          </div>
          <h2 className="font-serif font-bold text-2xl tracking-wide">Kussala Institute</h2>
          <p className="text-sm text-[#C5A059] font-medium uppercase tracking-widest mt-1">Content Management Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@kussalainstitute.org"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C5A059] focus:border-transparent outline-none transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C5A059] focus:border-transparent outline-none transition-all text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#C5A059] text-[#002B49] rounded-lg font-bold text-sm tracking-wide uppercase hover:bg-[#b08c48] transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In to CMS"}
          </button>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              Default Super Admin: <span className="font-mono text-gray-700">admin@kussalainstitute.org</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
