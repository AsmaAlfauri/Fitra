'use client';

<<<<<<< HEAD
import { useState } from 'react';
=======
>>>>>>> 85c33702cd1cb9a7d2ba06ddbfdc748d4422a365
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface UserRowProps {
  user: any;
<<<<<<< HEAD
  onDelete: (id: number, role: string) => void;
=======
  onDelete: (id: number) => void;
>>>>>>> 85c33702cd1cb9a7d2ba06ddbfdc748d4422a365
}

export default function UserRow({ user, onDelete }: UserRowProps) {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);

  const canDelete = user.role !== 'admin' && user.id !== currentUser?.id;

  const handleDeleteClick = async () => {
    if (!canDelete) return;

    setLoading(true);
    await onDelete(user.id, user.role);
    setLoading(false);
  };

=======

  // منع حذف الادمن نفسه أو أي ادمن آخر
  const canDelete = user.role !== 'admin' && user.id !== currentUser?.id;

>>>>>>> 85c33702cd1cb9a7d2ba06ddbfdc748d4422a365
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.role}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.status ? 'Active' : 'Inactive'}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {canDelete ? (
          <button
<<<<<<< HEAD
            onClick={handleDeleteClick}
            disabled={loading}
            className={`py-1 px-3 rounded-lg text-sm text-white transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:opacity-90'
            }`}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        ) : (
          <span className="text-gray-400 text-sm" title={user.role === 'admin' ? 'Admin cannot be deleted' : 'Cannot delete yourself'}>
            —
          </span>
=======
            onClick={() => onDelete(user.id)}
            className="py-1 px-3 bg-red-600 hover:opacity-90 text-white rounded-lg text-sm transition"
          >
            Delete
          </button>
        ) : (
          <span className="text-gray-400 text-sm">—</span>
>>>>>>> 85c33702cd1cb9a7d2ba06ddbfdc748d4422a365
        )}
      </td>
    </tr>
  );
}
