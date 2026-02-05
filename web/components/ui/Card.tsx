"use client";

import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const Card = ({ title, children, actions }: CardProps) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      {title && (
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">{title}</h3>
          {actions}
        </div>
      )}

      <div>{children}</div>
    </div>
  );
};

export default Card;
