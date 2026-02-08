'use client';
import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className }) => {
  return (
    <div className={`p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex flex-col justify-between ${className}`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardCard;
