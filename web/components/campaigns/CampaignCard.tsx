"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Campaign } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
  campaign: Campaign;
  onEdit?: (campaign: Campaign) => void;
  onDelete?: (id: number) => void;
}

export default function CampaignCard({ campaign, onEdit, onDelete }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/campaigns/${campaign.id}`); // هنا نفتح صفحة الكامبين
  };

  return (
    <div
      className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
      onClick={handleClick}
    >
      <h2 className="font-semibold">{campaign.name}</h2>
      <p>{campaign.description}</p>
      <p className="text-sm text-gray-500">
        {campaign.start_date} → {campaign.end_date}
      </p>
      <p className="capitalize text-sm">Status: {campaign.status}</p>

      {user?.role === "admin" && onEdit && onDelete && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(campaign); }}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(campaign.id); }}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
