'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchCampaigns, deleteCampaignThunk } from "@/redux/slices/campaignSlice";
import DashboardLayout from "@/components/DashboardLayout";
import CampaignForm from "@/components/campaigns/CampaignForm";
import { Campaign } from "@/types";
import Modal from "@/components/ui/Modal";
import CampaignCard from "@/components/campaigns/CampaignCard";
import ProtectedComponent from "@/components/ui/ProtectedRoute";
import EmptyState from "@/components/ui/EmptyState";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Loader from "@/components/ui/Loader";

export default function CampaignsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.campaigns);

  const [editing, setEditing] = useState<Campaign | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (campaign: Campaign) => {
    setEditing(campaign);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteCampaignThunk(id));
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Campaigns
          </h1>

          <ProtectedComponent allowedRoles={["admin"]}>
            <button
              onClick={handleCreate}
              className="px-5 py-2 rounded-lg bg-amber-600 text-white font-bold hover:opacity-90 transition"
            >
              + New Campaign
            </button>
          </ProtectedComponent>
        </div>

        {/* Error */}
        {error && <ErrorMessage message={error} />}

        {/* Loading */}
        {loading && <Loader text="Loading campaigns..." />}

        {/* Empty State */}
        {!loading && list.length === 0 && (
          <EmptyState
            title="No Campaigns"
            message="There are no campaigns yet. Start by creating a new one!"
            actionText="Create Campaign"
            onAction={handleCreate}
          />
        )}

        {/* Campaigns Grid */}
        {!loading && list.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={modalOpen}
          title={editing ? "Edit Campaign" : "Create Campaign"}
          onClose={() => setModalOpen(false)}
        >
          <CampaignForm
            campaign={editing || undefined}
            onClose={() => setModalOpen(false)}
          />
        </Modal>

      </div>
    </DashboardLayout>
  );
}
