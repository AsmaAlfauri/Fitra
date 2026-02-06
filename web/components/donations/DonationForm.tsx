"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createDonationThunk } from "@/redux/slices/donationSlice";

interface Props {
  campaignId: number;
  onClose?: () => void; // لو عايزين نستخدم مودال
}

export default function DonationForm({ campaignId, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await dispatch(createDonationThunk({ campaign_id: campaignId, amount })).unwrap();
      setAmount(0);
      if (onClose) onClose();
    } catch (err: any) {
      setError(err || "Failed to create donation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow-md">
      <h2 className="font-bold mb-2">Make a Donation</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 mb-2 w-full"
        min={1}
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Donate"}
      </button>
    </form>
  );
}
