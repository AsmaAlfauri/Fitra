"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        px-4
      "
    >
      <div
        className="
          relative w-full max-w-lg
          rounded-2xl
          bg-white dark:bg-gray-800
          shadow-xl
          p-6
          animate-fadeIn
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}

          <button
            onClick={onClose}
            className="
              text-gray-400 hover:text-gray-700
              dark:hover:text-white
              text-xl font-bold
            "
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="text-gray-700 dark:text-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
