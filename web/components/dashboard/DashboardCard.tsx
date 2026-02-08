'use client';

import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function DashboardCard({
  title,
  children,
  className = '',
}: DashboardCardProps) {
  return (
    <div
      className={`flex flex-col justify-between p-6 rounded-2xl border
      bg-white dark:bg-gray-900
      border-gray-200 dark:border-gray-700
      shadow-sm hover:shadow-md transition
      ${className}`}
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <div className="text-gray-600 dark:text-gray-400 text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
