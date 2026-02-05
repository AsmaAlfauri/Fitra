"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const DashboardPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Hello {user?.name || "User"} 👋
        </h1>

        {/* Placeholders  Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded shadow text-center">
            Campaigns Feature
          </div>
          <div className="p-6 bg-white rounded shadow text-center">
            Donations Feature
          </div>
          <div className="p-6 bg-white rounded shadow text-center">
            Users Feature
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
