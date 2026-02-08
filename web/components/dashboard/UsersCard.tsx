'use client';
import DashboardCard from './DashboardCard';
import Link from 'next/link';

export default function UsersCard() {
  return (
    <DashboardCard title="Users">
      <p className="mb-4">Manage system users (Admin only).</p>
      <Link href="/users">
        <button className="w-full py-2 rounded-lg bg-amber-600 text-white hover:opacity-90 transition">
          Go to Users
        </button>
      </Link>
    </DashboardCard>
  );
}
