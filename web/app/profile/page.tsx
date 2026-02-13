'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { getUserById } from '@/redux/slices/userSlice';
import { useEffect } from 'react';
import ProfileForm from '@/components/profile/ProfileForm';
import DeleteAccountButton from '@/components/profile/DeleteAccountButton';

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.id) dispatch(getUserById(user.id));
  }, [user?.id]);

  return (
    <DashboardLayout>
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Profile</h1>
        <ProfileForm userId={user?.id || 0} />
        <DeleteAccountButton />
      </div>
    </DashboardLayout>
  );
}
