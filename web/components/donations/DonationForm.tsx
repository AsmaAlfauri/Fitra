"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createDonationThunk } from "@/redux/slices/donationSlice";

interface Props {
  campaignId: number;
  onClose?: () => void;
}

export default function DonationForm({ campaignId, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [amount, setAmount] = useState<number | "">( "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await dispatch(
        createDonationThunk({
          campaign_id: campaignId,
          amount: Number(amount),
        })
      ).unwrap();

      setAmount("");
      onClose?.();
    } catch (err: any) {
      setError(err || "Failed to create donation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-xl p-6 shadow-sm
        space-y-4
      "
    >
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        Make a Donation
      </h2>

      <div>
        <label className="block mb-1 text-sm font-bold text-gray-700 dark:text-gray-200">
          Amount $
        </label>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Enter amount"
          className="
            w-full p-2 rounded-lg
            border border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-primary
          "
        />
      </div>

      {error && (
        <p className="text-sm font-bold text-red-500">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="
              px-4 py-2 rounded-lg
              border border-gray-300 dark:border-gray-600
              text-gray-700 dark:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition
            "
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-amber-600 text-white font-bold hover:opacity-90 transition"
        >
          {loading ? "Processing..." : "Donate"}
        </button>
      </div>
    </form>
  );
}
