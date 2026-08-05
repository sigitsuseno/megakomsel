"use client";

import { useTransition } from "react";

export function ConfirmAction({
  action,
  confirmText,
  children,
  className = "",
}: {
  action: () => Promise<void>;
  confirmText: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [pending] = useTransition();

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
      className="inline"
    >
      <button
        type="submit"
        disabled={pending}
        className={className}
      >
        {pending ? "..." : children}
      </button>
    </form>
  );
}
