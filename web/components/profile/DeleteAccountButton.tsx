'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import api from '@/services/api';

export default function DeleteAccountButton() {
  const { user } = useSelector((state: RootState) => state.auth);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;

    try {
      await api.delete(`/users/${user?.id}`);
      alert('Account deleted successfully. Logging out...');
      // TODO: dispatch logout action
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete account');
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="w-full py-3 bg-red-600 hover:opacity-90 text-white rounded-lg font-semibold transition"
    >
      Delete Account
    </button>
  );
}
