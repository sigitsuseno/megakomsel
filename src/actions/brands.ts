"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { brandSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";

export type BrandState = { error?: string } | undefined;

function revalidateBrandPaths() {
  revalidatePath("/store");
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard/brands");
}

function parseBrand(formData: FormData) {
  return brandSchema.safeParse({
    name: formData.get("name"),
  });
}

export async function createBrandAction(
  prevState: BrandState,
  formData: FormData
): Promise<BrandState> {
  await requireAdmin();
  const parsed = parseBrand(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data merek tidak valid." };
  }

  const baseSlug = slugify(parsed.data.name);
  if (!baseSlug) {
    return { error: "Nama merek tidak menghasilkan slug yang valid." };
  }
  const existing = await prisma.brand.findUnique({ where: { slug: baseSlug } });
  const slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;

  await prisma.brand.create({
    data: { name: parsed.data.name.trim(), slug },
  });

  revalidateBrandPaths();
  redirect("/dashboard/brands");
}

export async function updateBrandAction(
  id: string,
  prevState: BrandState,
  formData: FormData
): Promise<BrandState> {
  await requireAdmin();
  const parsed = parseBrand(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data merek tidak valid." };
  }

  // Slug sengaja tidak diubah agar konsisten dengan perilaku kategori.
  await prisma.brand.update({
    where: { id },
    data: { name: parsed.data.name.trim() },
  });

  revalidateBrandPaths();
  redirect("/dashboard/brands");
}

export async function deleteBrandAction(id: string) {
  await requireAdmin();
  // Blokir hapus bila masih dipakai produk (konsisten dengan kategori),
  // walau FK memakai SetNull.
  const usedBy = await prisma.product.count({ where: { brandId: id } });
  if (usedBy > 0) {
    redirect("/dashboard/brands");
  }
  await prisma.brand.delete({ where: { id } });
  revalidateBrandPaths();
  redirect("/dashboard/brands");
}
