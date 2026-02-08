'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import {
  createCampaignThunk,
  updateCampaignThunk,
} from '@/redux/slices/campaignSlice';
import { Campaign } from '@/types';

interface Props {
  campaign?: Campaign;
  onClose?: () => void;
}

const CampaignForm = ({ campaign, onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] =
    useState<'draft' | 'active' | 'closed'>('draft');

  useEffect(() => {
    if (campaign) {
      setTitle(campaign.title);
      setDescription(campaign.description);
      setStartDate(campaign.start_date);
      setEndDate(campaign.end_date);
      setStatus(campaign.status as any);
    }
  }, [campaign]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title,
      description,
      start_date: startDate,
      end_date: endDate,
      status,
    };
    console.log(data);
    
    if (campaign) {
      dispatch(updateCampaignThunk({ id: campaign.id, data }));
    } else {
      dispatch(createCampaignThunk(data));
    }

    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Title */}
      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">
          Campaign Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white
            border-gray-300 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white
            border-gray-300 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border
              bg-white dark:bg-gray-900
              text-gray-900 dark:text-white
              border-gray-300 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border
              bg-white dark:bg-gray-900
              text-gray-900 dark:text-white
              border-gray-300 dark:border-gray-700"
            required
          />
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-200">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="w-full px-3 py-2 rounded-lg border
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white
            border-gray-300 dark:border-gray-700"
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border
              border-gray-300 dark:border-gray-600
              text-gray-700 dark:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-amber-600 text-white font-bold hover:opacity-90 transition"
        >
          {campaign ? 'Update Campaign' : 'Create Campaign'}
        </button>
      </div>
    </form>
  );
};

export default CampaignForm;
