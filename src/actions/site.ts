"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { setSettingJson } from "@/lib/settings";
import { aboutSchema, companySchema, heroSchema, marketplacesSchema } from "@/lib/validations";

export type SiteSettingState =
  | { error?: string; success?: string }
  | undefined;

export async function saveMarketplacesAction(
  _prev: SiteSettingState,
  formData: FormData
): Promise<SiteSettingState> {
  await requireAdmin();

  let raw: unknown;
  try {
    raw = JSON.parse(String(formData.get("marketplaces") || "[]"));
  } catch {
    return { error: "Data link marketplace tidak valid." };
  }

  const parsed = marketplacesSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data link marketplace tidak valid." };
  }

  await setSettingJson("marketplaces", parsed.data);
  revalidatePath("/");
  revalidatePath("/dashboard/web-ui");
  return { success: "Link marketplace berhasil disimpan & tampil di slider homepage." };
}

export async function saveAboutAction(
  _prev: SiteSettingState,
  formData: FormData
): Promise<SiteSettingState> {
  await requireAdmin();

  let raw: unknown;
  try {
    raw = JSON.parse(String(formData.get("about") || "{}"));
  } catch {
    return { error: "Konten About tidak valid." };
  }

  const parsed = aboutSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Konten About tidak valid." };
  }

  await setSettingJson("about", parsed.data);
  revalidatePath("/");
  revalidatePath("/dashboard/web-ui");
  return { success: "Konten About berhasil disimpan." };
}

export async function saveHeroAction(
  _prev: SiteSettingState,
  formData: FormData
): Promise<SiteSettingState> {
  await requireAdmin();

  let raw: unknown;
  try {
    raw = JSON.parse(String(formData.get("hero") || "[]"));
  } catch {
    return { error: "Data Hero Section tidak valid." };
  }

  const parsed = heroSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data Hero Section tidak valid." };
  }

  await setSettingJson("hero", parsed.data);
  revalidatePath("/");
  revalidatePath("/dashboard/web-ui");
  return { success: "Hero Section berhasil disimpan & tampil di homepage." };
}

export async function saveCompanyAction(
  _prev: SiteSettingState,
  formData: FormData
): Promise<SiteSettingState> {
  await requireAdmin();

  let raw: unknown;
  try {
    raw = JSON.parse(String(formData.get("company") || "{}"));
  } catch {
    return { error: "Data Setting tidak valid." };
  }

  const parsed = companySchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data Setting tidak valid." };
  }

  await setSettingJson("company", parsed.data);
  revalidatePath("/");
  revalidatePath("/dashboard/web-ui");
  return { success: "Setting berhasil disimpan & tampil di seluruh situs." };
}