'use client';

import api from '@/services/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginAsGuest = async (role: 'admin' | 'viewer') => {
    const credentials =
      role === 'admin'
        ? { email: 'guestAdmin@gmail.com', password: '12345' }
        : { email: 'guestViewer@gmail.com', password: '12345' };

    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/auth/login', credentials);

      localStorage.setItem('token', res.data.token);

      router.push('/dashboard');
    } catch (err: any) {
      setError('Guest login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-yellow-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center">
        <h1 className="text-3xl font-bold text-amber-700">FITRA</h1>
        <p className="text-sm text-gray-600">Ramadan Charity Dashboard</p>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/login')}
            className="w-full py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition disabled:opacity-50"
            disabled={loading}
          >
            Login
          </button>

          <button
            onClick={() => router.push('/signup')}
            className="w-full py-2 rounded-lg border border-amber-600 text-amber-700 hover:bg-amber-50 transition disabled:opacity-50"
            disabled={loading}
          >
            Signup
          </button>
        </div>

        <div className="pt-4 border-t space-y-2">
          <button
            onClick={() => loginAsGuest('admin')}
            className="w-full py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>

          <button
            onClick={() => loginAsGuest('viewer')}
            className="w-full py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login as Viewer'}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}
