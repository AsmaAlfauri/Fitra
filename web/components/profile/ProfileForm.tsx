'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { updateUser } from '@/redux/slices/userSlice';
import Toast from '@/components/ui/Toast';

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

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

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
    setToast(null);

    try {
      const dataToSend = { ...formData };
      if (!dataToSend.password) delete dataToSend.password;

      await dispatch(updateUser({ id: userId, data: dataToSend })).unwrap();

      setToast({ message: 'Profile updated successfully!', type: 'success' });
      setFormData({ ...formData, password: '' });
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to update profile', type: 'error' });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
      >
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

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
