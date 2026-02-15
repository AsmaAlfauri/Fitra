'use client';

import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ isOpen, title = "Confirm", message = "Are you sure?", onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-xl p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 dark:text-gray-400 text-xl font-bold hover:text-gray-900 dark:hover:text-white transition"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Message */}
        <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:opacity-90 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:opacity-90 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
