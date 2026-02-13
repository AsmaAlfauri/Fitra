'use client';

interface UserFiltersProps {
  search: string;
  role: string;
  status: string;
  onSearchChange: (val: string) => void;
  onRoleChange: (val: string) => void;
  onStatusChange: (val: string) => void;
}

export default function UserFilters({
  search,
  role,
  status,
  onSearchChange,
  onRoleChange,
  onStatusChange,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full sm:w-1/3 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
      />

<<<<<<< HEAD
      <div className="flex gap-2 w-full sm:w-auto">
        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
=======
      <div className="flex gap-2">
        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="operations">Operations</option>
>>>>>>> 85c33702cd1cb9a7d2ba06ddbfdc748d4422a365
          <option value="viewer">Viewer</option>
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
<<<<<<< HEAD
          className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
=======
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
>>>>>>> 85c33702cd1cb9a7d2ba06ddbfdc748d4422a365
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}
