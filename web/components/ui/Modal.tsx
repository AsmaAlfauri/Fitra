'use client';

import React from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, title, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-surface-light dark:bg-surface-dark shadow-xl p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h2 className="text-lg font-bold text-text-light dark:text-text-dark">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="text-text-muted-light dark:text-text-muted-dark text-xl font-bold hover:text-text-light dark:hover:text-text-light transition"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="text-text-light dark:text-text-dark">{children}</div>
      </div>
    </div>
  );
}
