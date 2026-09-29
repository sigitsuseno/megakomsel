import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateCategoryAction } from "@/actions/categories";
import { CategoryForm } from "@/components/dashboard/CategoryForm";

export const metadata: Metadata = { title: "Edit Kategori" };

export default async function EditCategoryPage({
  params,
}: PageProps<"/dashboard/categories/[id]/edit">) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) notFound();

  const boundAction = updateCategoryAction.bind(null, category.id);

  return (
    <div>
      <Link href="/dashboard/categories" className="text-xs font-semibold text-primary dark:text-secondary hover:underline">
        ← Kembali
      </Link>
      <h1 className="mt-2 font-heading text-2xl font-bold text-ink">Edit Kategori</h1>
      <p className="mt-1 text-sm text-ink/60">
        Slug: <code className="text-xs bg-surface border border-line rounded-lg px-2 py-0.5">{category.slug}</code> (tidak berubah)
      </p>
      <div className="mt-6">
        <CategoryForm action={boundAction} defaultValues={{ name: category.name }} />
      </div>
    </div>
  );
}
