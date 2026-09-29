import type { Metadata } from "next";
import Link from "next/link";
import { createCategoryAction } from "@/actions/categories";
import { CategoryForm } from "@/components/dashboard/CategoryForm";

export const metadata: Metadata = { title: "Tambah Kategori" };

export default function NewCategoryPage() {
  return (
    <div>
      <Link href="/dashboard/categories" className="text-xs font-semibold text-primary dark:text-secondary hover:underline">
        ← Kembali
      </Link>
      <h1 className="mt-2 font-heading text-2xl font-bold text-ink">Tambah Kategori</h1>
      <div className="mt-6">
        <CategoryForm action={createCategoryAction} />
      </div>
    </div>
  );
}
