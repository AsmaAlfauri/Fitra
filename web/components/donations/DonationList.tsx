"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DonationRow from "./DonationRow";
import ProtectedComponent from "../ui/ProtectedRoute";

export default function DonationList() {
  const { list, loading } = useSelector(
    (state: RootState) => state.donations
  );

  if (loading) {
    return (
      <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
        Loading donations...
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-500 dark:text-gray-400">
        No donations yet.
      </div>
    );
  }

  return (
    <div
      className="
        mt-6 rounded-xl overflow-hidden
        border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
      "
    >
      {/* Header */}
      <div
        className="
          grid grid-cols-3 md:grid-cols-4
          bg-gray-100 dark:bg-gray-900
          px-4 py-3 text-sm font-bold
          text-gray-700 dark:text-gray-200
        "
      >
        <span>User</span>
        <span>Amount</span>
        <span>Status</span>
        <ProtectedComponent allowedRoles={['admin']}><span className="hidden md:block">Actions</span></ProtectedComponent>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {list.map((donation) => (
          <DonationRow key={donation.id} donation={donation} />
        ))}
      </div>
    </div>
  );
}
