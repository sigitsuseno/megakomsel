"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { productSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";

export type ProductState = { error?: string } | undefined;

function parseProduct(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get("name"),
    categoryId: formData.get("categoryId"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock") || "0",
    image: formData.get("image") || "",
    featured: formData.get("featured") === "on",
    active: formData.get("active") === "on",
  });
}

export async function createProductAction(prevState: ProductState, formData: FormData): Promise<ProductState> {
  await requireAdmin();
  const parsed = parseProduct(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data produk tidak valid." };
  }

  const baseSlug = slugify(parsed.data.name);
  const existing = await prisma.product.findUnique({ where: { slug: baseSlug } });
  const slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;

  await prisma.product.create({
    data: {
      name: parsed.data.name,
      slug,
      description: parsed.data.description,
      price: parsed.data.price,
      stock: parsed.data.stock,
      image: parsed.data.image,
      featured: parsed.data.featured,
      active: parsed.data.active,
      categoryId: parsed.data.categoryId,
    },
  });

  revalidatePath("/store");
  redirect("/dashboard/products");
}

export async function updateProductAction(id: string, prevState: ProductState, formData: FormData): Promise<ProductState> {
  await requireAdmin();
  const parsed = parseProduct(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data produk tidak valid." };
  }

  await prisma.product.update({
    where: { id },
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      price: parsed.data.price,
      stock: parsed.data.stock,
      image: parsed.data.image,
      featured: parsed.data.featured,
      active: parsed.data.active,
      categoryId: parsed.data.categoryId,
    },
  });

  revalidatePath("/store");
  redirect("/dashboard/products");
}

export async function deleteProductAction(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/store");
  redirect("/dashboard/products");
}

export async function toggleProductAction(id: string, active: boolean) {
  await requireAdmin();
  await prisma.product.update({ where: { id }, data: { active } });
  revalidatePath("/store");
}