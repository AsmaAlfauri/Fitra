import React from "react";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-md">
      {message || "Somthing wrong!!"}
    </div>
  );
};

export default ErrorMessage;
