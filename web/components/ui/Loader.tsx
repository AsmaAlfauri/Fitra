'use client';

interface LoaderProps {
  text?: string;
  size?: number;
}

export default function Loader({ text = 'Loading...', size = 8 }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 px-4">
      <div
        className={`animate-spin rounded-full border-4 border-primary-light border-t-transparent dark:border-primary-dark dark:border-t-transparent`}
        style={{ width: `${size}rem`, height: `${size}rem` }}
      />
      <p className="text-text-muted-light dark:text-text-muted-dark text-sm">{text}</p>
    </div>
  );
}
