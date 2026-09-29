"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireUser } from "@/lib/auth";
import { orderSchema } from "@/lib/validations";
import { isPriceOnRequest } from "@/lib/utils";

export type OrderState =
  | { error?: string; success?: boolean; orderId?: string }
  | undefined;

export async function createOrderAction(prevState: OrderState, formData: FormData): Promise<OrderState> {
  const user = await requireUser();

  let rawItems: unknown;
  try {
    rawItems = JSON.parse(String(formData.get("items") || "[]"));
  } catch {
    return { error: "Data keranjang tidak valid." };
  }

  const parsed = orderSchema.safeParse({
    customerName: formData.get("customerName"),
    customerEmail: formData.get("customerEmail"),
    customerPhone: formData.get("customerPhone"),
    customerAddress: formData.get("customerAddress"),
    items: rawItems,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data pesanan tidak valid." };
  }

  try {
    const order = await prisma.$transaction(async (tx) => {
      let total = 0;
      const items = [];

      for (const item of parsed.data.items) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });
        if (!product || !product.active) {
          throw new Error(`Produk tidak ditemukan atau tidak aktif.`);
        }
        if (isPriceOnRequest(product.price)) {
          throw new Error(`"${product.name}" memakai harga khusus — silakan hubungi kami.`);
        }
        if (product.stock < item.qty) {
          throw new Error(`Stok ${product.name} tidak mencukupi.`);
        }
        total += product.price * item.qty;
        items.push({
          productId: product.id,
          productName: product.name,
          price: product.price,
          qty: item.qty,
        });
        await tx.product.update({
          where: { id: product.id },
          data: { stock: { decrement: item.qty } },
        });
      }

      return tx.order.create({
        data: {
          userId: user.id,
          status: "PENDING",
          customerName: parsed.data.customerName,
          customerEmail: parsed.data.customerEmail,
          customerPhone: parsed.data.customerPhone,
          customerAddress: parsed.data.customerAddress,
          total,
          items: { create: items },
        },
      });
    });

    revalidatePath("/dashboard");
    return { success: true, orderId: order.id };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal membuat pesanan." };
  }
}

export async function updateOrderStatusAction(orderId: string, status: string) {
  await requireAdmin();
  const allowed = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "DONE", "CANCELLED"];
  if (!allowed.includes(status)) return;
  await prisma.order.update({ where: { id: orderId }, data: { status } });
  revalidatePath("/dashboard/orders");
}

export async function deleteOrderAction(orderId: string) {
  await requireAdmin();
  await prisma.order.delete({ where: { id: orderId } });
  revalidatePath("/dashboard/orders");
}