"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DonationRow from "./DonationRow";

export default function DonationList() {
  const { list, loading } = useSelector(
    (state: RootState) => state.donations
  );

  if (loading) return <p>Loading donations...</p>;
  if (list.length === 0) return <p>No donations yet.</p>;

  return (
    <div className="border rounded">
      <div className="grid grid-cols-4 font-semibold bg-gray-100 p-2">
        <span>User</span>
        <span>Amount</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {list.map((donation) => (
        <DonationRow key={donation.id} donation={donation} />
      ))}
    </div>
  );
}
