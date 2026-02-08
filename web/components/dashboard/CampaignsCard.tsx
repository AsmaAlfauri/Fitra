'use client';
import DashboardCard from './DashboardCard';
import Link from 'next/link';

export default function CampaignsCard() {
  return (
    <DashboardCard title="Campaigns">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Create, update and manage all donation campaigns.
      </p>

      <Link href="/campaigns">
        <button
          className="mt-auto w-full py-2.5 rounded-lg
          bg-amber-600 text-white font-semibold
          hover:bg-amber-500 transition"
        >
          Go to Campaigns
        </button>
      </Link>
    </DashboardCard>
  );
}
