"use client";

import { useState } from "react";
import Link from "next/link";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { isPriceOnRequest } from "@/lib/utils";

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

  if (isPriceOnRequest(product.price)) {
    return (
      <div className="mt-6">
        <Link
          href="/#kontak"
          className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all shadow-sm bg-secondary text-white hover:brightness-110"
        >
          Hubungi Kami untuk Harga
        </Link>
        <p className="mt-2 text-xs text-ink/60">
          Produk ini memakai harga khusus — silakan hubungi tim kami untuk penawaran terbaik.
        </p>
      </div>
    );
  }

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
