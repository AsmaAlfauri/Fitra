"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchCampaigns,
  deleteCampaignThunk,
} from "@/redux/slices/campaignSlice";
import DashboardLayout from "@/components/DashboardLayout";
import CampaignForm from "@/components/campaigns/CampaignForm";
import { Campaign } from "@/types";
import Modal from "@/components/ui/Modal";
import CampaignCard from "@/components/campaigns/CampaignCard";
import ProtectedComponent from "@/components/ui/ProtectedRoute";

export default function CampaignsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.campaigns);

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
    if (confirm("Are you sure you want to delete this campaign?")) {
      dispatch(deleteCampaignThunk(id));
    }
  };

  return (
    <DashboardLayout>
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

      {/* Loading */}
      {loading && (
        <p className="text-gray-600 dark:text-gray-300">Loading campaigns...</p>
      )}

      {/* Empty state */}
      {!loading && list.length === 0 && (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          No campaigns yet.
        </div>
      )}

      {/* Campaigns Grid */}
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
    </DashboardLayout>
  );
}
