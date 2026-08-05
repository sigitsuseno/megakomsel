"use client";

import { useState } from "react";
import { useCart } from "@/components/store/CartProvider";

type Props = {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    stock: number;
  };
  qty?: number;
  className?: string;
};

export function AddToCartButton({ product, qty = 1, className = "" }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={product.stock <= 0}
      className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all shadow-sm disabled:opacity-50 disabled:pointer-events-none ${
        added
          ? "bg-success text-white"
          : "bg-primary text-white hover:bg-primary-600"
      } ${className}`}
      aria-label={`Tambah ${product.name} ke keranjang`}
    >
      {added ? (
        <>✓ Ditambahkan</>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Keranjang
        </>
      )}
    </button>
  );
}
