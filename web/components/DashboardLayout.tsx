"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { hydrate } from "@/redux/slices/authSlice";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Loader from "@/components/ui/Loader";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    dispatch(hydrate());
    setHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (hydrated && !token) {
      router.push("/login");
    }
  }, [hydrated, token, router]);

  if (!hydrated || !token) return <Loader />;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
