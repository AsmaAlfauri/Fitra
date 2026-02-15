'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Toast from '../ui/Toast';

interface UserRowProps {
  user: any;
  onDelete: (id: number, role: string) => void;
}

export default function UserRow({ user, onDelete }: UserRowProps) {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const canDelete = user.role !== 'admin' && user.id !== currentUser?.id;

  const handleDeleteClick = async () => {
    if (!canDelete) return;

    setLoading(true);
    // Simulate async deletion
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    setToast({ message: 'Delete simulated (disabled in demo)', type: 'success' });
  };

  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.email}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.role}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.status ? 'Active' : 'Inactive'}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
          {canDelete ? (
            <button
              onClick={handleDeleteClick}
              disabled={loading}
              className={`py-1 px-3 rounded-lg text-sm text-white transition ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:opacity-90'
              }`}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          ) : (
            <span className="text-gray-400 text-sm" title={user.role === 'admin' ? 'Admin cannot be deleted' : 'Cannot delete yourself'}>
              —
            </span>
          )}
        </td>
      </tr>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
