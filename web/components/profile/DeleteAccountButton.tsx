"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import api from "@/services/api";
import Toast from "../ui/Toast";
import { logout } from "@/redux/slices/authSlice";
import ModalConfirm from '@/components/ui/ModalConfirm'
import { useRouter } from "next/navigation";

export default function DeleteAccountButton() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/users/${user?.id}`);
      setToast({ message: "Account deleted successfully! Logging out...", type: "success" });
      setModalOpen(false);
      dispatch(logout());
      router.push("/");
    } catch (err: any) {
      setToast({ message: err.response?.data?.error || "Failed to delete account", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        disabled={loading}
        className="w-full py-3 bg-red-600 hover:opacity-90 text-white rounded-lg font-semibold transition"
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>

      {/* Confirm Modal */}
      <ModalConfirm
        isOpen={modalOpen}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
