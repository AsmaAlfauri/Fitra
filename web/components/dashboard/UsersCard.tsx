'use client';

import Link from 'next/link';
import DashboardCard from './DashboardCard';

export default function UsersCard() {
  return (
    <DashboardCard title="Users">
      <p className="mb-6">
        Manage system users and permissions.
      </p>

      <Link href="/users">
        <button
          className="w-full mt-auto py-2.5 rounded-xl
          bg-amber-600 hover:bg-amber-700
          text-white font-medium transition"
        >
          Go to Users
        </button>
      </Link>
    </DashboardCard>
  );
}
