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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-lg p-5 relative">
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
