"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchDonationsByCampaign } from "@/redux/slices/donationSlice";
import DashboardLayout from "@/components/DashboardLayout";
import DonationList from "@/components/donations/DonationList";
import DonationForm from "@/components/donations/DonationForm";

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const campaignId = Number(id);

  useEffect(() => {
    if (campaignId) {
      dispatch(fetchDonationsByCampaign(campaignId));
    }
  }, [campaignId, dispatch]);

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold mb-4">Campaign Details</h1>

      {/* DONATION FORM */}
      <DonationForm campaignId={campaignId} />

      {/* DONATIONS LIST */}
      <DonationList />
    </DashboardLayout>
  );
}
