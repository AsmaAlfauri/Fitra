// DonationList.tsx
'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import DonationRow from './DonationRow';

export default function DonationList() {
  const { list, loading } = useSelector((state: RootState) => state.donations);

  if (loading) return (
    <div className="text-center p-6 text-gray-600 dark:text-gray-300">
      Loading donations...
    </div>
  );

  if (list.length === 0) return (
    <div className="text-center p-6 text-gray-500 dark:text-gray-400">
      No donations yet.
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
      {list.map(d => <DonationRow key={d.id} donation={d} />)}
    </div>
  );
}
