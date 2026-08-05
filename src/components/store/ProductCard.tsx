import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { formatRupiah } from "@/lib/utils";

export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  category: { name: string };
};

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <div className="group rounded-2xl border border-line bg-card overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
      <Link href={`/store/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800/60">
        <Image
          src={product.image || "https://placehold.co/600x450/0B4F8A/FFFFFF?text=Megakomsel"}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.stock <= 0 && (
          <span className="absolute top-3 left-3">
            <Badge tone="danger">Habis</Badge>
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">
          {product.category.name}
        </span>
        <Link href={`/store/${product.slug}`} className="mt-1 font-heading font-bold text-ink hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </Link>
        <p className="mt-2 font-bold text-primary-600 dark:text-secondary">
          {formatRupiah(product.price)}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-xs text-ink/60">
            {product.stock > 0 ? `Stok ${product.stock}` : "Pre-order"}
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
