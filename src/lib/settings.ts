import { prisma } from "@/lib/prisma";
import type { HeroAnimPreset } from "@/lib/site";

export const SETTING_KEYS = {
  marketplaces: "marketplaces",
  about: "about",
  hero: "hero",
  company: "company",
} as const;

export type AboutSetting = {
  headline: string;
  description: string;
  milestones: { year: string; text: string }[];
  /** Jenis visual di kolom gambar section Tentang Kami. */
  mediaType?: "image" | "svg" | "anim";
  /** URL gambar (upload lokal `/uploads/...` atau URL eksternal). Dipakai saat mediaType = "image". */
  image?: string;
  /** Kode SVG inline (script & event handler dibersihkan saat render). Dipakai saat mediaType = "svg". */
  svg?: string;
  /** Preset animasi bawaan. Dipakai saat mediaType = "anim". */
  anim?: HeroAnimPreset;
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
