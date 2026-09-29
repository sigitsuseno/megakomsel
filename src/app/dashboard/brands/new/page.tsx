import type { Metadata } from "next";
import Link from "next/link";
import { createBrandAction } from "@/actions/brands";
import { BrandForm } from "@/components/dashboard/BrandForm";

export const metadata: Metadata = { title: "Tambah Merek" };

export default function NewBrandPage() {
  return (
    <div>
      <Link href="/dashboard/brands" className="text-xs font-semibold text-primary dark:text-secondary hover:underline">
        ← Kembali
      </Link>
      <h1 className="mt-2 font-heading text-2xl font-bold text-ink">Tambah Merek</h1>
      <div className="mt-6">
        <BrandForm action={createBrandAction} />
      </div>
    </div>
  );
}
