import React from "react";

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-full text-gray-500">
      {message || "No Data!!"}
    </div>
  );
};

export default EmptyState;
