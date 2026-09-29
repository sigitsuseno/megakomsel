"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { categorySchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";

export type CategoryState = { error?: string } | undefined;

function revalidateCategoryPaths() {
  revalidatePath("/store");
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard/categories");
}

function parseCategory(formData: FormData) {
  return categorySchema.safeParse({
    name: formData.get("name"),
  });
}

export async function createCategoryAction(
  prevState: CategoryState,
  formData: FormData
): Promise<CategoryState> {
  await requireAdmin();
  const parsed = parseCategory(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data kategori tidak valid." };
  }

  const baseSlug = slugify(parsed.data.name);
  if (!baseSlug) {
    return { error: "Nama kategori tidak menghasilkan slug yang valid." };
  }
  const existing = await prisma.category.findUnique({ where: { slug: baseSlug } });
  const slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;

  await prisma.category.create({
    data: { name: parsed.data.name.trim(), slug },
  });

  revalidateCategoryPaths();
  redirect("/dashboard/categories");
}

export async function updateCategoryAction(
  id: string,
  prevState: CategoryState,
  formData: FormData
): Promise<CategoryState> {
  await requireAdmin();
  const parsed = parseCategory(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data kategori tidak valid." };
  }

  // Slug sengaja tidak diubah agar URL filter store (?category=slug) tetap stabil.
  await prisma.category.update({
    where: { id },
    data: { name: parsed.data.name.trim() },
  });

  revalidateCategoryPaths();
  redirect("/dashboard/categories");
}

export async function deleteCategoryAction(id: string) {
  await requireAdmin();
  // Guard: relasi Product.category memakai onDelete: Cascade,
  // jadi hapus kategori berproduk akan ikut menghapus produk. Blokir di server.
  const usedBy = await prisma.product.count({ where: { categoryId: id } });
  if (usedBy > 0) {
    redirect("/dashboard/categories");
  }
  await prisma.category.delete({ where: { id } });
  revalidateCategoryPaths();
  redirect("/dashboard/categories");
}
