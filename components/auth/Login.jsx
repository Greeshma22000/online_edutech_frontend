"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch, setAuthToken } from '../../lib/api';

export default function Login({ onSuccess }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setAuthToken(res.token);
      
      // Redirect based on role - use hard redirect to ensure clean state
      const userRole = res.user?.role;
      
      // Small delay to ensure token is saved
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (userRole === 'instructor') {
        window.location.href = '/instructor/dashboard';
      } else {
        window.location.href = '/dashboard';
      }
      
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] grid place-items-center bg-gradient-to-br from-brand-50 via-white to-accent-50 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-500 opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent-500 opacity-10 blur-3xl" />
      <div className="w-full max-w-xl rounded-3xl border border-brand-100 bg-white p-9 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full text-white text-xl" style={{ backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)' }}>🔐</span>
          <h1 className="text-3xl md:text-4xl font-semibold">Welcome back</h1>
        </div>
        <p className="text-base md:text-lg text-gray-600 mt-3">Enter your credentials to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div>
            <label className="block text-base font-medium">Email</label>
            <input className="mt-1.5 w-full border rounded-xl p-3.5 text-lg focus:outline-none focus:ring-2 focus:ring-brand-500" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div>
            <label className="block text-base font-medium">Password</label>
            <input className="mt-1.5 w-full border rounded-xl p-3.5 text-lg focus:outline-none focus:ring-2 focus:ring-brand-500" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button disabled={loading} className="w-full rounded-xl py-3.5 text-lg font-medium text-white shadow shadow-brand-500/30 hover:shadow-glow transition" style={{ backgroundImage: 'linear-gradient(135deg, #f25c54 0%, #f7b267 100%)' }}>{loading ? 'Logging in...' : 'Login'}</button>
          <p className="text-sm md:text-base text-gray-600 text-center">Don’t have an account? <a href="/register" className="text-brand-600 hover:underline">Create one</a></p>
        </form>
      </div>
    </div>
  );
}

