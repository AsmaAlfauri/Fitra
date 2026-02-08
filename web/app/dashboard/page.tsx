'use client';
import DashboardLayout from '@/components/DashboardLayout';
import CampaignsCard from '@/components/dashboard/CampaignsCard';
import UsersCard from '@/components/dashboard/UsersCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Hello {user?.name || 'User'} 👋
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CampaignsCard />
          <UsersCard />
        </div>
      </div>
    </DashboardLayout>
  );
}
