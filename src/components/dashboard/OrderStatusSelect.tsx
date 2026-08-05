"use client";

import { useTransition } from "react";
import { updateOrderStatusAction } from "@/actions/orders";

const STATUSES = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "DONE", "CANCELLED"];

export function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => {
        startTransition(() => updateOrderStatusAction(orderId, e.target.value));
      }}
      className="rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs font-semibold text-ink focus:outline-none focus:border-secondary"
      aria-label={`Ubah status pesanan ${orderId}`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
