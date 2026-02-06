"use client";

import { Donation } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { updateDonationStatusThunk } from "@/redux/slices/donationSlice";

interface Props {
  donation: Donation;
}

export default function DonationRow({ donation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const isAdmin =user?.role === "admin";

  const updateStatus = (status: "approved" | "rejected") => {
    dispatch(updateDonationStatusThunk({ id: donation.id, status }));
  };
  console.log(donation);
  
  return (
    <div className="grid grid-cols-4 p-2 border-t items-center">
      <span>{donation.user_name}</span>
      <span>${donation.amount}</span>
      <span className="capitalize">{donation.status}</span>

      <div className="flex gap-2">
        {isAdmin && donation.status === "pending" && (
          <>
            <button
              onClick={() => updateStatus("approved")}
              className="text-green-600"
            >
              Approve
            </button>
            <button
              onClick={() => updateStatus("rejected")}
              className="text-red-600"
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
}
