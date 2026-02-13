'use client';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = 'No Data',
  message = 'There is nothing to display here.',
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <svg
        className="h-12 w-12 text-primary-light dark:text-primary-dark"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">{title}</h2>
      <p className="text-text-muted-light dark:text-text-muted-dark">{message}</p>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn-primary mt-2"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
