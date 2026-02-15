'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import api from '@/services/api';
import Loader from '@/components/ui/Loader';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { hydrate } from '@/redux/slices/authSlice'; 

export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();
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
      localStorage.setItem('user', JSON.stringify(res.data.user));


      dispatch(hydrate());

      router.push('/dashboard');
    } catch (err: any) {
      setError('Guest login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <div className="w-full max-w-md bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl p-8 space-y-6 text-center">
        <h1 className="text-3xl font-bold text-primary-light dark:text-primary-dark">FITRA</h1>
        <p className="text-text-muted-light dark:text-text-muted-dark">Ramadan Charity Dashboard</p>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/login')}
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? <Loader size={5} text="Loading..." /> : 'Login'}
          </button>

          <button
            onClick={() => router.push('/signup')}
            className="btn-secondary w-full"
            disabled={loading}
          >
            Signup
          </button>
        </div>

        <div className="pt-4 border-t border-gray-300 dark:border-gray-600 space-y-2">
          <button
            onClick={() => loginAsGuest('admin')}
            className="btn-primary w-full bg-gray-900 hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>

          <button
            onClick={() => loginAsGuest('viewer')}
            className="btn-primary w-full bg-gray-700 hover:bg-gray-600"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login as Viewer'}
          </button>
        </div>

        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
}
