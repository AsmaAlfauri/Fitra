'use client';
import DashboardCard from './DashboardCard';
import Link from 'next/link';

export default function CampaignsCard() {
  return (
    <DashboardCard title="Campaigns" className="flex flex-col flex-grow">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Create, update and manage all donation campaigns.
      </p>

      <Link href="/campaigns" className="mt-auto">
        <button className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold transition">
          Go to Campaigns
        </button>
      </Link>
    </DashboardCard>
  );
}
