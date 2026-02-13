'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import DashboardLayout from '@/components/DashboardLayout';
import CampaignsCard from '@/components/dashboard/CampaignsCard';
import UsersCard from '@/components/dashboard/UsersCard';
import StateCard from '@/components/dashboard/StateCard';
import DonationsChart from '@/components/dashboard/DonationsChart';
import Loader from '@/components/ui/Loader';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import { FiUsers, FiGift, FiDollarSign, FiActivity } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { DonationsPerCampaign, getDonationsPerCampaign, fetchDashboardStats } from '@/services/dashboardService';

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalUsers: 0,
    totalDonations: 0,
    approvedDonations: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [chartData, setChartData] = useState<DonationsPerCampaign[]>([]);
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      setStatsLoading(true);
      setStatsError(null);
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (err) {
        setStatsError('Failed to load dashboard stats.');
      } finally {
        setStatsLoading(false);
      }
    }
    fetchStats();
  }, []);

  useEffect(() => {
    async function fetchChart() {
      setChartLoading(true);
      setChartError(null);
      try {
        const data = await getDonationsPerCampaign();
        setChartData(data);
      } catch (err) {
        setChartError('Failed to load donations chart.');
      } finally {
        setChartLoading(false);
      }
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

        {/* Stats */}
        {statsLoading ? (
          <Loader text="Loading stats..." />
        ) : statsError ? (
          <ErrorMessage message={statsError} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StateCard
              label="Total Campaigns"
              value={stats.totalCampaigns}
              icon={<FiGift size={24} />}
            />
            <StateCard
              label="Active Campaigns"
              value={stats.activeCampaigns}
              icon={<FiActivity size={24} />}
            />
            <StateCard
              label="Total Users"
              value={stats.totalUsers}
              icon={<FiUsers size={24} />}
            />
            <StateCard
              label="Approved Donations"
              value={`$${stats.approvedDonations.toLocaleString()}`}
              icon={<FiDollarSign size={24} />}
            />
          </div>
        )}

        {/* Donations Chart */}
        <div className="mb-8">
          {chartLoading ? (
            <Loader text="Loading donations chart..." />
          ) : chartError ? (
            <ErrorMessage message={chartError} />
          ) : chartData.length === 0 ? (
            <EmptyState
              title="No Donations Yet"
              message="Donations per campaign will appear here once available."
            />
          ) : (
            <DonationsChart data={chartData} />
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <CampaignsCard />
          </div>
          <div className="flex flex-col">
            <UsersCard />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
