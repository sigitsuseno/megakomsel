import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { CheckoutForm } from "@/components/store/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Selesaikan pesanan Anda di Megakomsel.",
};

export default async function CheckoutPage() {
  const user = await requireUser();

  return (
    <div className="flex-grow">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-3xl font-bold text-ink mb-8">Checkout</h1>
        <CheckoutForm user={{ name: user.name, email: user.email }} />
      </div>
    </div>
  );
}
