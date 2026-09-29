import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui";
import { PurchaseBox } from "@/components/store/PurchaseBox";
import { ProductCard } from "@/components/store/ProductCard";
import { formatRupiah } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/store/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, brand: true },
  });
  if (!product) return { title: "Produk tidak ditemukan" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/store/[slug]">) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, brand: true },
  });

  if (!product || !product.active) notFound();

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id }, active: true },
    include: { category: true, brand: true },
    take: 3,
  });

  return (
    <div className="flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav aria-label="Breadcrumb" className="text-xs text-ink/60 mb-6">
          <Link href="/store" className="hover:text-secondary">Store</Link>
          <span className="mx-2">/</span>
          <span>{product.category.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="rounded-2xl overflow-hidden border border-line bg-card">
            <Image
              src={product.image || "https://placehold.co/800x600/0B4F8A/FFFFFF?text=Megakomsel"}
              alt={product.name}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="primary">{product.category.name}</Badge>
              {product.brand && <Badge tone="neutral">{product.brand.name}</Badge>}
            </div>
            <h1 className="mt-3 font-heading text-3xl sm:text-4xl font-bold text-ink">
              {product.name}
            </h1>
            <p className="mt-3 font-heading text-2xl font-bold text-primary-600 dark:text-secondary">
              {formatRupiah(product.price)}
            </p>

            <div className="mt-3">
              {product.stock > 0 ? (
                <Badge tone="success">Stok tersedia: {product.stock}</Badge>
              ) : (
                <Badge tone="danger">Stok habis</Badge>
              )}
            </div>

            <div className="mt-6 prose-sm text-ink/75 leading-relaxed whitespace-pre-line">
              {product.description}
            </div>

            <PurchaseBox
              product={{
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
                stock: product.stock,
              }}
            />

            <div className="mt-6 p-4 rounded-xl bg-surface border border-line text-xs text-ink/70">
              <p className="font-bold text-ink mb-1">Kenapa belanja di Megakomsel?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Garansi resmi distributor</li>
                <li>Pengiriman seluruh Indonesia</li>
                <li>Dukungan teknis 7 hari seminggu</li>
              </ul>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-ink mb-6">Produk Terkait</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
