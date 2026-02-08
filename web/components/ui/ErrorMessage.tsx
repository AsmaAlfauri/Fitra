interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-2 text-sm text-red-500">
      {message}
    </div>
  );
}
