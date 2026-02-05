"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  createCampaignThunk,
  updateCampaignThunk,
} from "@/redux/slices/campaignSlice";
import { Campaign } from "@/types";


interface Props {
  campaign?: Campaign;
  onClose?: () => void;
}

const CampaignForm = ({ campaign, onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState<"draft" | "active" | "closed">("draft");

  useEffect(() => {
    if (campaign) {
      setTitle(campaign.name);
      setDescription(campaign.description);
      setStartDate(campaign.start_date);
      setEndDate(campaign.end_date);
      setStatus(campaign.status as "draft" | "active" | "closed");
    }
  }, [campaign]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: title,
      description,
      start_date: startDate,
      end_date: endDate,
      status,
    };

    if (campaign) {
      dispatch(updateCampaignThunk({ id: campaign.id, data }));
    } else {
      dispatch(createCampaignThunk(data));
    }

    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <div className="flex gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-1/2 p-2 border rounded"
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-1/2 p-2 border rounded"
          required
        />
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as any)}
        className="w-full p-2 border rounded"
      >
        <option value="draft">Draft</option>
        <option value="active">Active</option>
        <option value="closed">Closed</option>
      </select>

      <div className="flex gap-2 justify-end">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        )}
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {campaign ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default CampaignForm;
