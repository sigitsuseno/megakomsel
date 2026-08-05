import { prisma } from "@/lib/prisma";
import { deleteOrderAction } from "@/actions/orders";
import { ConfirmAction } from "@/components/dashboard/ConfirmAction";
import { OrderStatusSelect } from "@/components/dashboard/OrderStatusSelect";
import { formatRupiah, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: { user: true, items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-ink">Pesanan</h1>
        <p className="text-sm text-ink/60">{orders.length} pesanan masuk.</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-ink/50 border-b border-line">
              <th className="py-3 px-4">Order</th>
              <th className="py-3 px-4">Pelanggan</th>
              <th className="py-3 px-4">Item</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Waktu</th>
              <th className="py-3 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-line/60 last:border-0 align-top">
                <td className="py-3 px-4 font-mono text-xs text-ink/80">{order.id.slice(0, 8)}</td>
                <td className="py-3 px-4">
                  <p className="font-medium text-ink">{order.customerName}</p>
                  <p className="text-xs text-ink/60">{order.customerPhone}</p>
                  <p className="text-xs text-ink/60">{order.customerAddress}</p>
                </td>
                <td className="py-3 px-4 text-xs text-ink/70">
                  {order.items.map((i) => (
                    <p key={i.id}>
                      {i.productName} × {i.qty}
                    </p>
                  ))}
                </td>
                <td className="py-3 px-4 font-semibold text-ink">{formatRupiah(order.total)}</td>
                <td className="py-3 px-4">
                  <OrderStatusSelect orderId={order.id} status={order.status} />
                </td>
                <td className="py-3 px-4 text-xs text-ink/60">{formatDate(order.createdAt)}</td>
                <td className="py-3 px-4">
                  <ConfirmAction
                    action={deleteOrderAction.bind(null, order.id)}
                    confirmText={`Hapus pesanan ${order.id.slice(0, 8)}?`}
                    className="text-xs font-semibold text-danger hover:underline"
                  >
                    Hapus
                  </ConfirmAction>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
