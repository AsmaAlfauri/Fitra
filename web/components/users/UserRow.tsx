'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface UserRowProps {
  user: any;
  onDelete: (id: number) => void;
}

export default function UserRow({ user, onDelete }: UserRowProps) {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  // منع حذف الادمن نفسه أو أي ادمن آخر
  const canDelete = user.role !== 'admin' && user.id !== currentUser?.id;

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
            onClick={() => onDelete(user.id)}
            className="py-1 px-3 bg-red-600 hover:opacity-90 text-white rounded-lg text-sm transition"
          >
            Delete
          </button>
        ) : (
          <span className="text-gray-400 text-sm">—</span>
        )}
      </td>
    </tr>
  );
}
