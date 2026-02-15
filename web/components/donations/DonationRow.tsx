// DonationRow.tsx
"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Donation } from "@/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateDonationStatusThunk } from "@/redux/slices/donationSlice";
import ProtectedComponent from "../ui/ProtectedRoute";

interface Props {
  donation: Donation;
}

export default function DonationRow({ donation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const updateStatus = (status: "pending" | "approved" | "rejected") => {
    dispatch(updateDonationStatusThunk({ id: donation.id, status }));
  };
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
      <div className="flex-1">
        <p className="font-semibold text-gray-900 dark:text-white">
          {donation.user_name || user?.name}
        </p>
        <p className="font-bold text-amber-600">${donation.amount}</p>
      </div>

      <span
        className={`px-3 py-1 rounded-full text-xs font-bold capitalize
  ${
    donation.status === "approved"
      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
      : donation.status === "rejected"
        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
        : donation.status === "pending"
          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
          : "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200"
  }
`}
      >
        {donation.status}
      </span>

      <ProtectedComponent allowedRoles={["admin"]}>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => updateStatus("approved")}
            className="text-xs font-bold text-green-600 dark:text-green-400 hover:underline"
          >
            Approve
          </button>
          <button
            onClick={() => updateStatus("rejected")}
            className="text-xs font-bold text-red-500 dark:text-red-400 hover:underline"
          >
            Reject
          </button>
        </div>
      </ProtectedComponent>
    </div>
  );
}
