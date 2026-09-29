import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui";
import { deleteBrandAction } from "@/actions/brands";
import { ConfirmAction } from "@/components/dashboard/ConfirmAction";

export const dynamic = "force-dynamic";

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">Merek</h1>
          <p className="text-sm text-ink/60">{brands.length} merek terdaftar.</p>
        </div>
        <Link href="/dashboard/brands/new">
          <Button>+ Tambah Merek</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-ink/50 border-b border-line">
              <th className="py-3 px-4">Nama</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Produk</th>
              <th className="py-3 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {brands.length === 0 && (
              <tr>
                <td colSpan={4} className="py-10 px-4 text-center text-ink/60">
                  Belum ada merek. Tambahkan merek pertama.
                </td>
              </tr>
            )}
            {brands.map((b) => (
              <tr key={b.id} className="border-b border-line/60 last:border-0">
                <td className="py-3 px-4 font-medium text-ink">{b.name}</td>
                <td className="py-3 px-4">
                  <code className="text-xs bg-surface border border-line rounded-lg px-2 py-1 text-ink/70">
                    {b.slug}
                  </code>
                </td>
                <td className="py-3 px-4 text-ink/70">{b._count.products} produk</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/brands/${b.id}/edit`}
                      className="text-xs font-semibold text-primary dark:text-secondary hover:underline"
                    >
                      Edit
                    </Link>
                    {b._count.products > 0 ? (
                      <span
                        className="text-xs text-ink/40 cursor-not-allowed"
                        title="Merek dipakai produk — kosongkan merek produknya dulu sebelum menghapus"
                      >
                        Hapus
                      </span>
                    ) : (
                      <ConfirmAction
                        action={deleteBrandAction.bind(null, b.id)}
                        confirmText={`Hapus merek "${b.name}"?`}
                        className="text-xs font-semibold text-danger hover:underline"
                      >
                        Hapus
                      </ConfirmAction>
                    )}
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
