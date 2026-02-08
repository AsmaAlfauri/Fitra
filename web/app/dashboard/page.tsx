'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import DashboardLayout from '@/components/DashboardLayout';
import CampaignsCard from '@/components/dashboard/CampaignsCard';
import UsersCard from '@/components/dashboard/UsersCard';
import StatCard from '@/components/dashboard/StatCard';
import { FiUsers, FiGift, FiDollarSign, FiActivity } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { DonationsPerCampaign, getDonationsPerCampaign, fetchDashboardStats } from '@/services/dashboardService';
import DonationsChart from '@/components/dashboard/DonationsChart';
// import { DonationsPerCampaign, getDonationsPerCampaign } from '@/services/dashboardChartService';

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalUsers: 0,
    totalDonations: 0,
    approvedDonations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const data = await fetchDashboardStats();
      setStats(data);
      setLoading(false);
    }
    fetchStats();
  }, []);
  const [chartData, setChartData] = useState<DonationsPerCampaign[]>([]);
const [chartLoading, setChartLoading] = useState(true);

useEffect(() => {
  async function fetchChart() {
    setChartLoading(true);
    const data = await getDonationsPerCampaign();
    setChartData(data);
    setChartLoading(false);
  }
  fetchChart();
}, []);

  return (
    <DashboardLayout>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Hello {user?.name || 'User'} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here’s what’s happening in your dashboard
          </p>
        </div>
        {/* Main cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Campaigns"
            value={loading ? '...' : stats.totalCampaigns}
            icon={<FiGift size={24} />}
          />
          <StatCard
            label="Active Campaigns"
            value={loading ? '...' : stats.activeCampaigns}
            icon={<FiActivity size={24} />}
          />
          <StatCard
            label="Total Users"
            value={loading ? '...' : stats.totalUsers}
            icon={<FiUsers size={24} />}
          />
          <StatCard
            label="Approved Donations"
            value={loading ? '...' : `$${stats.approvedDonations.toLocaleString()}`}
            icon={<FiDollarSign size={24} />}
          />
        </div>
        <div className="mt-8">
  <DonationsChart data={chartData} />
</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CampaignsCard />
          <UsersCard />
        </div>

      </div>
    </DashboardLayout>
  );
}
