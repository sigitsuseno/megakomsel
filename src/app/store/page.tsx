import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/store/ProductCard";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Store",
  description: "Katalog produk IT Megakomsel — laptop, PC, CCTV, jaringan, server, dan aksesoris.",
};

export default async function StorePage({
  searchParams,
}: PageProps<"/store">) {
  const { category, q } = await searchParams;
  const selectedCategory = typeof category === "string" ? category : "";
  const query = typeof q === "string" ? q.trim() : "";

  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where: {
        active: true,
        ...(selectedCategory ? { category: { slug: selectedCategory } } : {}),
        ...(query ? { name: { contains: query } } : {}),
      },
      include: { category: true, brand: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  return (
    <div className="flex-grow">
      <div className="bg-card border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="text-xs uppercase tracking-widest font-bold text-secondary">
            Official Store
          </span>
          <h1 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-ink">
            Katalog Produk IT
          </h1>
          <p className="mt-2 text-ink/70 text-sm">
            Laptop, PC, CCTV, jaringan, server, dan aksesoris — garansi resmi distributor.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <Link
            href="/store"
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-semibold border transition-colors",
              !selectedCategory
                ? "bg-primary text-white border-primary"
                : "border-line bg-card text-ink hover:border-secondary"
            )}
          >
            Semua
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/store?category=${c.slug}`}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-semibold border transition-colors",
                selectedCategory === c.slug
                  ? "bg-primary text-white border-primary"
                  : "border-line bg-card text-ink hover:border-secondary"
              )}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-ink/60">
            <p className="font-heading text-xl font-bold text-ink">Belum ada produk</p>
            <p className="mt-2 text-sm">Coba ubah filter atau cek kembali nanti.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
