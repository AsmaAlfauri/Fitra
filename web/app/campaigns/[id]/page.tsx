'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchDonationsByCampaign } from '@/redux/slices/donationSlice';
import DashboardLayout from '@/components/DashboardLayout';
import DonationList from '@/components/donations/DonationList';
import DonationForm from '@/components/donations/DonationForm';

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const campaignId = Number(id);

  useEffect(() => {
    if (campaignId) {
      dispatch(fetchDonationsByCampaign(campaignId));
    }
  }, [campaignId, dispatch]);

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Campaign Details
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage donations for this campaign
          </p>
        </div>

        {/* Donation Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Add Donation
          </h2>
          <DonationForm campaignId={campaignId} />
        </div>

        {/* Donations List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Donations List
          </h2>
          <DonationList />
        </div>

      </div>
    </DashboardLayout>
  );
}
