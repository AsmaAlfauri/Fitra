'use client';
import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  className?: string;
}

export default function StatCard({
  label,
  value,
  icon,
  className = '',
}: StatCardProps) {
  return (
    <div
      className={`flex items-center justify-between p-5 rounded-2xl border
      bg-white dark:bg-gray-900
      border-gray-200 dark:border-gray-700
      shadow-sm hover:shadow-md transition
      ${className}`}
    >
      <div className="flex-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
      </div>

      <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
        {icon}
      </div>
    </div>
  );
}
