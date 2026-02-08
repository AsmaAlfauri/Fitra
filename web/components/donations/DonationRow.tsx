"use client";

import { Donation } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { updateDonationStatusThunk } from "@/redux/slices/donationSlice";
import ProtectedComponent from "../ui/ProtectedRoute";

interface Props {
  donation: Donation;
}

export default function DonationRow({ donation }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const updateStatus = (status: "approved" | "rejected") => {
    dispatch(updateDonationStatusThunk({ id: donation.id, status }));
  };

  return (
    <div
      className="
        grid grid-cols-3 md:grid-cols-4
        px-4 py-3 items-center
        text-sm
        text-gray-700 dark:text-gray-200
      "
    >
      <span className="font-semibold">{donation.user_name}</span>

      <span className="font-bold">${donation.amount}</span>

      <span>
        <span
          className={`
            inline-block px-3 py-1 rounded-full text-xs font-bold capitalize
            ${
              donation.status === "approved"
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                : donation.status === "rejected"
                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
            }
          `}
        >
          {donation.status}
        </span>
      </span>

      <ProtectedComponent allowedRoles={["admin"]}>
        <div className="flex gap-2 justify-end md:justify-start">
          <button
            onClick={() => updateStatus("approved")}
            className="
                text-xs font-bold
                text-green-600 dark:text-green-400
                hover:underline
              "
          >
            Approve
          </button>

          <button
            onClick={() => updateStatus("rejected")}
            className="
                text-xs font-bold
                text-red-500 dark:text-red-400
                hover:underline
              "
          >
            Reject
          </button>
        </div>
      </ProtectedComponent>
    </div>
  );
}
