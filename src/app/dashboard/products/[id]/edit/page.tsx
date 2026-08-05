import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProductAction } from "@/actions/products";
import { ProductForm } from "@/components/dashboard/ProductForm";

export const metadata: Metadata = { title: "Edit Produk" };

export default async function EditProductPage({
  params,
}: PageProps<"/dashboard/products/[id]/edit">) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  const boundAction = updateProductAction.bind(null, product.id);

  return (
    <div>
      <Link href="/dashboard/products" className="text-xs font-semibold text-primary dark:text-secondary hover:underline">
        ← Kembali
      </Link>
      <h1 className="mt-2 font-heading text-2xl font-bold text-ink">Edit Produk</h1>
      <div className="mt-6">
        <ProductForm
          action={boundAction}
          categories={categories}
          defaultValues={{
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            image: product.image,
            categoryId: product.categoryId,
            featured: product.featured,
            active: product.active,
          }}
        />
      </div>
    </div>
  );
}
