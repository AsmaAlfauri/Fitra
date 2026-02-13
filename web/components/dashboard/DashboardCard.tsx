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
    <div className={`p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex flex-col justify-between ${className}`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex-1">{children}</div>
    </div>
  );
}
