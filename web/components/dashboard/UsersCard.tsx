'use client';
import DashboardCard from './DashboardCard';
import Link from 'next/link';

export default function UsersCard() {
  return (
    <DashboardCard title="Users" className="flex flex-col flex-grow">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Manage system users and permissions.
      </p>

      <Link href="/users" className="mt-auto">
        <button className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold transition">
          Go to Users
        </button>
      </Link>
    </DashboardCard>
  );
}
