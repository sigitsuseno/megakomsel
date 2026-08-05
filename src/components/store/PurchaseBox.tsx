"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/store/AddToCartButton";

type Props = {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    stock: number;
  };
};

export function PurchaseBox({ product }: Props) {
  const [qty, setQty] = useState(1);
  const max = Math.max(product.stock, 1);

  return (
    <div className="flex items-center gap-4 mt-6">
      <div className="flex items-center rounded-xl border border-line bg-card">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-3 py-2 text-ink hover:text-primary transition-colors"
          aria-label="Kurangi jumlah"
        >
          −
        </button>
        <span className="w-10 text-center font-semibold text-ink" aria-live="polite">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => Math.min(max, q + 1))}
          className="px-3 py-2 text-ink hover:text-primary transition-colors"
          aria-label="Tambah jumlah"
        >
          +
        </button>
      </div>
      <AddToCartButton product={product} qty={qty} className="px-6 py-3" />
    </div>
  );
}
