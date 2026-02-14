'use client';

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createCampaignThunk, updateCampaignThunk } from "@/redux/slices/campaignSlice";
import { Campaign, CampaignStatus } from "@/types";
import Loader from "@/components/ui/Loader";
import ErrorMessage from "@/components/ui/ErrorMessage";

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
  const [status, setStatus] = useState<CampaignStatus>("pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ملء الفورم عند التعديل
  useEffect(() => {
    if (campaign) {
      setTitle(campaign.title);
      setDescription(campaign.description);
      setStartDate(campaign.start_date);
      setEndDate(campaign.end_date);

      if (["pending", "active", "completed"].includes(campaign.status)) {
        setStatus(campaign.status);
      } else {
        setStatus("pending");
      }
    }
  }, [campaign]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);


    const data: Campaign = {
      id: campaign?.id || "",
      title,
      description,
      start_date: startDate,
      end_date: endDate,
      status,
    };

    try {
      if (campaign) {
        await dispatch(updateCampaignThunk({ id: campaign.id, data })).unwrap();
      } else {
        await dispatch(createCampaignThunk(data)).unwrap();
      }
      onClose?.();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <ErrorMessage message={error} />}
      {loading && <Loader text={campaign ? "Updating..." : "Creating..."} />}

      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">Campaign Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-600 dark:focus:ring-amber-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-600 dark:focus:ring-amber-400"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as CampaignStatus)}
          className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
        >
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-amber-600 text-white font-bold hover:opacity-90 transition disabled:opacity-50"
        >
          {campaign ? "Update Campaign" : "Create Campaign"}
        </button>
      </div>
    </form>
  );
};

export default CampaignForm;
