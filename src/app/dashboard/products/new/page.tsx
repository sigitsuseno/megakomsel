import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createProductAction } from "@/actions/products";
import { ProductForm } from "@/components/dashboard/ProductForm";

export const metadata: Metadata = { title: "Tambah Produk" };

export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <Link href="/dashboard/products" className="text-xs font-semibold text-primary dark:text-secondary hover:underline">
        ← Kembali
      </Link>
      <h1 className="mt-2 font-heading text-2xl font-bold text-ink">Tambah Produk</h1>
      <div className="mt-6">
        <ProductForm action={createProductAction} categories={categories} brands={brands} />
      </div>
    </div>
  );
}
