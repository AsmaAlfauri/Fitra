'use client';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="rounded-lg bg-danger-light/20 dark:bg-danger-dark/30 border border-danger-light dark:border-danger-dark px-4 py-2 text-sm text-danger-light dark:text-danger-dark">
      {message}
    </div>
  );
}
