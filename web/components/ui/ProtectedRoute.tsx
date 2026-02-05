"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { hydrate } from "@/redux/slices/authSlice";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ("admin" | "viewer")[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    dispatch(hydrate());
    setHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (hydrated) {
      if (!token) {
        router.push("/login");
        return;
      }
      if (allowedRoles && !allowedRoles.includes(user?.role!)) {
        router.push("/login");
      }
    }
  }, [hydrated, token, user, allowedRoles, router]);

  if (!hydrated || !token || (allowedRoles && !allowedRoles.includes(user?.role!))) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
