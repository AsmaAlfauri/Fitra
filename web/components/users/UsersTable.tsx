'use client';

import UserRow from './UserRow';

interface UsersTableProps {
  users: any[];
  loading: boolean;
<<<<<<< HEAD
  onDelete: (id: number, role: string) => void;
=======
  onDelete: (id: number) => void;
>>>>>>> 85c33702cd1cb9a7d2ba06ddbfdc748d4422a365
}

export default function UsersTable({ users, loading, onDelete }: UsersTableProps) {
  if (loading) return <p className="text-gray-500 dark:text-gray-400">Loading users...</p>;

<<<<<<< HEAD
  if (users.length === 0)
    return <p className="text-gray-500 dark:text-gray-400">No users found.</p>;

=======
>>>>>>> 85c33702cd1cb9a7d2ba06ddbfdc748d4422a365
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
<<<<<<< HEAD
          {users.map((u) => (
=======
          {users.map(u => (
>>>>>>> 85c33702cd1cb9a7d2ba06ddbfdc748d4422a365
            <UserRow key={u.id} user={u} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
