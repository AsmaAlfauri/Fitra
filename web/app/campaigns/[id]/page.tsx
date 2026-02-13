'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchDonationsByCampaign } from '@/redux/slices/donationSlice';
import DashboardLayout from '@/components/DashboardLayout';
import DonationForm from '@/components/donations/DonationForm';
import DonationList from '@/components/donations/DonationList';
import Modal from '@/components/ui/Modal';

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const campaignId = Number(id);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (campaignId) {
      dispatch(fetchDonationsByCampaign(campaignId));
    }
  }, [campaignId, dispatch]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Campaign Details
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage donations for this campaign
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2 rounded-lg bg-amber-600 text-white font-bold hover:opacity-90 transition"
          >
            + Add Donation
          </button>
        </div>

        {/* Donations List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Donations List
          </h2>
          <DonationList />
        </div>

        {/* Modal */}
        <Modal
          isOpen={modalOpen}
          title="Add Donation"
          onClose={() => setModalOpen(false)}
        >
          <DonationForm
            campaignId={campaignId}
            onClose={() => setModalOpen(false)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}
