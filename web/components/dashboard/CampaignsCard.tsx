'use client';
import DashboardCard from './DashboardCard';
import Link from 'next/link';

export default function CampaignsCard() {
  return (
    <DashboardCard title="Campaigns">
      <p className="mb-4">Manage all your campaigns here.</p>
      <Link href="/campaigns">
        <button className="w-full py-2 rounded-lg bg-amber-600 text-white hover:opacity-90 transition">
          Go to Campaigns
        </button>
      </Link>
    </DashboardCard>
  );
}
