import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Button, Badge } from "@/components/ui";
import { toggleProductAction, deleteProductAction } from "@/actions/products";
import { ConfirmAction } from "@/components/dashboard/ConfirmAction";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">Produk</h1>
          <p className="text-sm text-ink/60">{products.length} produk terdaftar.</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button>+ Tambah Produk</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-ink/50 border-b border-line">
              <th className="py-3 px-4">Produk</th>
              <th className="py-3 px-4">Kategori</th>
              <th className="py-3 px-4">Harga</th>
              <th className="py-3 px-4">Stok</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-line/60 last:border-0">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={p.image || "https://placehold.co/80x80/0B4F8A/FFFFFF?text=M"}
                      alt=""
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="font-medium text-ink">{p.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-ink/70">{p.category.name}</td>
                <td className="py-3 px-4 font-semibold text-ink">{formatRupiah(p.price)}</td>
                <td className="py-3 px-4 text-ink/70">{p.stock}</td>
                <td className="py-3 px-4">
                  {p.active ? <Badge tone="success">Aktif</Badge> : <Badge tone="danger">Nonaktif</Badge>}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/products/${p.id}/edit`}
                      className="text-xs font-semibold text-primary dark:text-secondary hover:underline"
                    >
                      Edit
                    </Link>
                    <form action={toggleProductAction.bind(null, p.id, !p.active)}>
                      <button
                        type="submit"
                        className="text-xs font-semibold text-ink/60 hover:text-ink"
                      >
                        {p.active ? "Nonaktifkan" : "Aktifkan"}
                      </button>
                    </form>
                    <ConfirmAction
                      action={deleteProductAction.bind(null, p.id)}
                      confirmText={`Hapus produk "${p.name}"?`}
                      className="text-xs font-semibold text-danger hover:underline"
                    >
                      Hapus
                    </ConfirmAction>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
