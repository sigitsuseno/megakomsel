import { prisma } from "@/lib/prisma";

export const SETTING_KEYS = {
  marketplaces: "marketplaces",
  about: "about",
  hero: "hero",
} as const;

export type AboutSetting = {
  headline: string;
  description: string;
  milestones: { year: string; text: string }[];
};

/**
 * Baca setting JSON dari tabel SiteSetting.
 * Bila belum ada atau nilainya rusak, kembalikan `fallback`.
 */
export async function getSettingJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key } });
    if (row?.value) return JSON.parse(row.value) as T;
  } catch {
    // nilai korup diabaikan, gunakan fallback
  }
  return fallback;
}

export async function setSettingJson(key: string, value: unknown) {
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value: JSON.stringify(value) },
    create: { key, value: JSON.stringify(value) },
  });
}
