'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import DashboardLayout from '@/components/DashboardLayout';
import UsersTable from '@/components/users/UsersTable';
import UserFilters from '@/components/users/UserFilters';
import Toast from '@/components/ui/Toast';
import { getAllUsers, deleteUser } from '@/redux/slices/userSlice';

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector((state: RootState) => state.users);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (id: number, role: string) => {
    if (role === 'admin') {
      setToast({ message: 'Admin users cannot be deleted!', type: 'error' });
      return;
    }

    try {
      await dispatch(deleteUser(id)).unwrap();
      setToast({ message: 'User deleted successfully!', type: 'success' });
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to delete user', type: 'error' });
    }
  };

  // Apply filters
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter ? u.role === roleFilter : true;
    const matchesStatus = statusFilter
      ? statusFilter === 'active'
        ? u.status === true
        : u.status === false
      : true;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Users</h1>

        <UserFilters
          search={search}
          role={roleFilter}
          status={statusFilter}
          onSearchChange={setSearch}
          onRoleChange={setRoleFilter}
          onStatusChange={setStatusFilter}
        />

        <UsersTable users={filteredUsers} loading={loading} onDelete={handleDelete} />

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
