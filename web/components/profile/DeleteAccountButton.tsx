'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import api from '@/services/api';
import Toast from '../ui/Toast';

export default function DeleteAccountButton() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;

    setLoading(true);
    try {
      await api.delete(`/users/${user?.id}`);
      setToast({ message: 'Account deleted successfully! Logging out...', type: 'success' });
      // TODO: dispatch logout action here
    } catch (err: any) {
      setToast({ message: err.response?.data?.error || 'Failed to delete account', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="w-full py-3 bg-red-600 hover:opacity-90 text-white rounded-lg font-semibold transition"
      >
        {loading ? 'Deleting...' : 'Delete Account'}
      </button>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
