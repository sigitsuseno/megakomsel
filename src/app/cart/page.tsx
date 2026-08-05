"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/store/CartProvider";
import { Button } from "@/components/ui";
import { formatRupiah } from "@/lib/utils";

export default function CartPage() {
  const { items, count, subtotal, updateQty, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center py-24">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-5xl mb-4">🛒</div>
          <h1 className="font-heading text-2xl font-bold text-ink">Keranjang kosong</h1>
          <p className="mt-2 text-sm text-ink/70">
            Belum ada produk di keranjang Anda. Yuk mulai belanja di official store kami.
          </p>
          <Link href="/store" className="mt-6 inline-block">
            <Button>Lihat Produk</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-3xl font-bold text-ink">
          Keranjang Belanja{" "}
          <span className="text-lg font-medium text-ink/60">({count} item)</span>
        </h1>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 p-4 rounded-2xl border border-line bg-card"
              >
                <Link href={`/store/${item.slug}`} className="shrink-0">
                  <Image
                    src={item.image || "https://placehold.co/200x200/0B4F8A/FFFFFF?text=M"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                </Link>
                <div className="flex-grow">
                  <Link
                    href={`/store/${item.slug}`}
                    className="font-heading font-bold text-ink hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm font-semibold text-primary-600 dark:text-secondary mt-1">
                    {formatRupiah(item.price)}
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center rounded-xl border border-line">
                      <button
                        onClick={() => updateQty(item.productId, item.qty - 1)}
                        className="px-3 py-1.5 text-ink hover:text-primary transition-colors"
                        aria-label={`Kurangi jumlah ${item.name}`}
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-ink">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.productId, item.qty + 1)}
                        className="px-3 py-1.5 text-ink hover:text-primary transition-colors"
                        aria-label={`Tambah jumlah ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-xs text-danger hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-ink">{formatRupiah(item.price * item.qty)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl border border-line bg-card sticky top-24">
            <h2 className="font-heading text-lg font-bold text-ink">Ringkasan</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-ink/70">
                <span>Subtotal ({count} item)</span>
                <span className="font-semibold text-ink">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink/70">
                <span>Ongkir</span>
                <span>Dihitung saat checkout</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-line flex justify-between">
              <span className="font-bold text-ink">Total</span>
              <span className="font-heading font-bold text-primary-600 dark:text-secondary">
                {formatRupiah(subtotal)}
              </span>
            </div>
            <Link href="/checkout" className="mt-6 block">
              <Button className="w-full py-3.5 font-bold">Lanjut ke Checkout</Button>
            </Link>
            <Link
              href="/store"
              className="mt-3 block text-center text-xs text-ink/60 hover:text-secondary transition-colors"
            >
              ← Lanjut belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
