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


export default function CampaignsPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.campaigns);

  const [editing, setEditing] = useState<Campaign | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  const handleEdit = (campaign: Campaign) => {
    setEditing(campaign);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      dispatch(deleteCampaignThunk(id));
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Campaigns</h1>
        {user?.role === "admin" && (<>        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + New Campaign
        </button>
      <Modal
        isOpen={modalOpen}
        title={editing ? "Edit Campaign" : "Create Campaign"}
        onClose={() => setModalOpen(false)}
      >
        <CampaignForm
          campaign={editing || undefined}
          onClose={() => setModalOpen(false)}
        />
      </Modal></>)}

      </div>

      {loading && <p>Loading campaigns...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((c) => (
          <CampaignCard
            key={c.id}
            campaign={c}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

    </DashboardLayout>
  );
}
