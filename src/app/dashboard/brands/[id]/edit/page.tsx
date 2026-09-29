import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateBrandAction } from "@/actions/brands";
import { BrandForm } from "@/components/dashboard/BrandForm";

export const metadata: Metadata = { title: "Edit Merek" };

export default async function EditBrandPage({
  params,
}: PageProps<"/dashboard/brands/[id]/edit">) {
  const { id } = await params;
  const brand = await prisma.brand.findUnique({ where: { id } });

  if (!brand) notFound();

  const boundAction = updateBrandAction.bind(null, brand.id);

  return (
    <div>
      <Link href="/dashboard/brands" className="text-xs font-semibold text-primary dark:text-secondary hover:underline">
        ← Kembali
      </Link>
      <h1 className="mt-2 font-heading text-2xl font-bold text-ink">Edit Merek</h1>
      <p className="mt-1 text-sm text-ink/60">
        Slug: <code className="text-xs bg-surface border border-line rounded-lg px-2 py-0.5">{brand.slug}</code> (tidak berubah)
      </p>
      <div className="mt-6">
        <BrandForm action={boundAction} defaultValues={{ name: brand.name }} />
      </div>
    </div>
  );
}
