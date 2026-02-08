'use client';
import { Campaign } from '@/types';
import { useRouter } from 'next/navigation';
import ProtectedComponent from '../ui/ProtectedRoute';

interface Props {
  campaign: Campaign;
  onEdit?: (campaign: Campaign) => void;
  onDelete?: (id: number) => void;
}

export default function CampaignCard({
  campaign,
  onEdit,
  onDelete,
}: Props) {
  const router = useRouter();

  const handleOpen = () => {
    router.push(`/campaigns/${campaign.id}`);
  };

  return (
    <div
      onClick={handleOpen}
      className="
        rounded-xl border
        bg-white dark:bg-gray-800
        border-gray-200 dark:border-gray-700
        p-5 shadow-sm hover:shadow-md
        transition cursor-pointer
        flex flex-col justify-between
      "
    >
      {/* Top */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {campaign.title}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {campaign.description}
        </p>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          {campaign.start_date} → {campaign.end_date}
        </div>

        <span
          className={`
            inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold
            ${
              campaign.status === 'active'
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }
          `}
        >
          {campaign.status}
        </span>
      </div>

      {/* Admin actions */}
      <ProtectedComponent allowedRoles={['admin']}>
        <div className="flex gap-3 mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(campaign);
            }}
            className="text-sm font-bold text-amber-600 hover:underline"
          >
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(campaign.id);
            }}
            className="text-sm font-bold text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </ProtectedComponent>

    </div>
  );
}
