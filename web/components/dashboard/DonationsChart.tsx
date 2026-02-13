'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DonationsPerCampaign } from '@/services/dashboardService';

interface DonationsChartProps {
  data: DonationsPerCampaign[];
}

export default function DonationsChart({ data }: DonationsChartProps) {
  return (
    <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Donations Per Campaign
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={data.length ? "#e5e7eb" : "#374151"} />
          <XAxis dataKey="title" tick={{ fill: 'gray', fontSize: 12 }} />
          <YAxis tick={{ fill: 'gray', fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: 'rgba(251, 191, 36, 0.1)' }}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem', border: '1px solid #e5e7eb', color: '#111827' }}
          />
          <Bar dataKey="total" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
