"use client";

import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  allowedRoles: ("admin" | "viewer")[];
  children: ReactNode;
}

export default function ProtectedComponent({ allowedRoles, children }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || !allowedRoles.includes(user.role)) {
    return null; 
  }
  return <>{children}</>;
}
