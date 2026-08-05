import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatRupiah, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardOverviewPage() {
  const [productCount, orderCount, revenueAgg, messageCount, recentOrders] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        where: { status: { not: "CANCELLED" } },
        _sum: { total: true },
      }),
      prisma.contactMessage.count(),
      prisma.order.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const stats = [
    { label: "Produk", value: productCount.toString(), href: "/dashboard/products" },
    { label: "Pesanan", value: orderCount.toString(), href: "/dashboard/orders" },
    {
      label: "Pendapatan",
      value: formatRupiah(revenueAgg._sum.total ?? 0),
      href: "/dashboard/orders",
    },
    { label: "Pesan Masuk", value: messageCount.toString(), href: "/dashboard/messages" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-ink">Overview</h1>
        <p className="text-sm text-ink/60">Ringkasan aktivitas toko.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="p-5 rounded-2xl border border-line bg-card hover:border-secondary transition-colors"
          >
            <p className="text-xs uppercase tracking-wider text-ink/50 font-bold">{s.label}</p>
            <p className="mt-2 font-heading text-2xl font-bold text-ink">{s.value}</p>
          </Link>
        ))}
      </div>

      <section className="p-6 rounded-2xl border border-line bg-card">
        <h2 className="font-heading text-lg font-bold text-ink mb-4">Pesanan Terbaru</h2>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-ink/60">Belum ada pesanan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-ink/50 border-b border-line">
                  <th className="py-2 pr-4">Order</th>
                  <th className="py-2 pr-4">Pelanggan</th>
                  <th className="py-2 pr-4">Total</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-line/60">
                    <td className="py-3 pr-4 font-mono text-xs text-ink/80">
                      {order.id.slice(0, 8)}
                    </td>
                    <td className="py-3 pr-4 text-ink">{order.customerName}</td>
                    <td className="py-3 pr-4 font-semibold text-ink">
                      {formatRupiah(order.total)}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex rounded-full bg-primary/10 text-primary dark:text-secondary px-2.5 py-0.5 text-xs font-semibold">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-ink/60">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
