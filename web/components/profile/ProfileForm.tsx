'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { updateUser } from '@/redux/slices/userSlice';

interface ProfileFormProps {
  userId: number;
}

export default function ProfileForm({ userId }: ProfileFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.users);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, password: '' });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      await dispatch(updateUser({ id: userId, data: formData })).unwrap();
      setMessage('Profile updated successfully!');
      setFormData({ ...formData, password: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
    >
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Leave blank to keep current password"
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-amber-600 hover:opacity-90 text-white rounded-lg font-semibold transition"
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
}
