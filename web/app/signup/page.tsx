'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupThunk, reset, hydrate } from '@/redux/slices/signupSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function SignupPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error, token } = useSelector((state: RootState) => state.signup);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'viewer' as 'viewer' | 'admin',
  });

  useEffect(() => {
    dispatch(hydrate());
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (token) router.push('/dashboard');
  }, [token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signupThunk(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-primary-light dark:text-primary-dark">
          Signup
        </h2>

        {error && <ErrorMessage message={error} />}
        {token && <p className="text-green-500 font-bold text-center">Signup successful! Redirecting...</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="input-field w-full"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="input-field w-full"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="input-field w-full"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="input-field w-full"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? <Loader size={5} text="Signing up..." /> : 'Signup'}
        </button>
      </form>
    </div>
  );
}
