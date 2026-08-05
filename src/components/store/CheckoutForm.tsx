"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import Link from "next/link";
import { useCart } from "@/components/store/CartProvider";
import { createOrderAction } from "@/actions/orders";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { formatRupiah } from "@/lib/utils";

export function CheckoutForm({
  user,
}: {
  user: { name: string; email: string };
}) {
  const { items, subtotal, clearCart } = useCart();
  const [state, formAction, pending] = useActionState(createOrderAction, undefined);

  useEffect(() => {
    if (state?.success) clearCart();
  }, [state, clearCart]);

  if (state?.success) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="font-heading text-2xl font-bold text-ink">Pesanan Berhasil Dibuat!</h1>
        <p className="mt-2 text-sm text-ink/70">
          Nomor pesanan: <span className="font-mono font-bold">{state.orderId}</span>
          <br />
          Kami akan menghubungi Anda untuk konfirmasi pembayaran &amp; pengiriman.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/store">
            <Button variant="outline">Belanja Lagi</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Lihat Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const cartPayload = items.map((i) => ({ productId: i.productId, qty: i.qty }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <form action={formAction} className="lg:col-span-2 p-6 rounded-2xl border border-line bg-card space-y-5">
        <input type="hidden" name="items" value={JSON.stringify(cartPayload)} />
        <h2 className="font-heading text-lg font-bold text-ink">Data Penerima</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="customerName">Nama Lengkap *</Label>
            <Input id="customerName" name="customerName" required defaultValue={user.name} />
          </div>
          <div>
            <Label htmlFor="customerEmail">Email *</Label>
            <Input id="customerEmail" name="customerEmail" type="email" required defaultValue={user.email} />
          </div>
        </div>

        <div>
          <Label htmlFor="customerPhone">No. HP / WhatsApp *</Label>
          <Input id="customerPhone" name="customerPhone" type="tel" required placeholder="081234567890" />
        </div>

        <div>
          <Label htmlFor="customerAddress">Alamat Lengkap *</Label>
          <Textarea id="customerAddress" name="customerAddress" rows={3} required placeholder="Jalan, RT/RW, kelurahan, kecamatan, kota, kode pos" />
        </div>

        {state?.error && (
          <p className="p-4 rounded-xl bg-danger/10 text-danger text-sm font-medium" role="alert">
            {state.error}
          </p>
        )}

        <Button type="submit" disabled={pending || items.length === 0} className="w-full py-3.5 font-bold">
          {pending ? "Memproses..." : `Buat Pesanan • ${formatRupiah(subtotal)}`}
        </Button>
      </form>

      <aside className="p-6 rounded-2xl border border-line bg-card">
        <h2 className="font-heading text-lg font-bold text-ink">Ringkasan Pesanan</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((item) => (
            <li key={item.productId} className="flex justify-between gap-3">
              <span className="text-ink/80 line-clamp-1">
                {item.name} <span className="text-ink/50">× {item.qty}</span>
              </span>
              <span className="font-semibold text-ink shrink-0">
                {formatRupiah(item.price * item.qty)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-line flex justify-between font-bold text-ink">
          <span>Total</span>
          <span className="text-primary-600 dark:text-secondary">{formatRupiah(subtotal)}</span>
        </div>
      </aside>
    </div>
  );
}
