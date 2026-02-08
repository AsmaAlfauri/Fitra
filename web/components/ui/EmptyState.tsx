'use client';

interface ErrorStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

export default function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again later.',
  actionText,
  onAction,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-xl font-semibold text-red-500">{title}</h2>
      <p className="opacity-70">{message}</p>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="rounded-lg bg-primary px-4 py-2 text-white hover:opacity-90"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
