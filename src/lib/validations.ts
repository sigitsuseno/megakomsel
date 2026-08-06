import { z } from "zod";
import { HERO_ANIM_PRESETS } from "@/lib/site";

export const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").trim(),
  email: z.email("Format email tidak valid").trim().toLowerCase(),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export const loginSchema = z.object({
  email: z.email("Format email tidak valid").trim().toLowerCase(),
  password: z.string().min(1, "Password wajib diisi"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").trim(),
  email: z.email("Format email tidak valid").trim(),
  phone: z.string().min(9, "Nomor HP minimal 9 digit").trim(),
  company: z.string().trim().optional().or(z.literal("")),
  service: z.string().trim().optional().or(z.literal("")),
  message: z.string().min(10, "Pesan minimal 10 karakter").trim(),
});

export const productSchema = z.object({
  name: z.string().min(3, "Nama produk minimal 3 karakter").trim(),
  categoryId: z.string().min(1, "Pilih kategori"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter").trim(),
  price: z.coerce.number().int().positive("Harga harus angka positif"),
  stock: z.coerce.number().int().min(0).default(0),
  image: z.string().trim().optional().or(z.literal("")),
  featured: z.coerce.boolean().default(false),
  active: z.coerce.boolean().default(true),
});

export const orderSchema = z.object({
  customerName: z.string().min(2).trim(),
  customerEmail: z.email().trim(),
  customerPhone: z.string().min(9).trim(),
  customerAddress: z.string().min(10).trim(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        qty: z.number().int().min(1),
      })
    )
    .min(1, "Keranjang kosong"),
});

export const marketplacesSchema = z
  .array(
    z.object({
      name: z.string().min(1, "Nama wajib diisi").trim(),
      url: z
        .string()
        .min(1, "URL wajib diisi")
        .trim()
        .refine((v) => /^https?:\/\/.+/.test(v), "URL harus dimulai dengan http(s)://"),
      color: z
        .string()
        .trim()
        .regex(/^[0-9a-fA-F]{6}$/, "Warna harus kode hex 6 digit (contoh: 6366F1)"),
      image: z.string().trim().max(500).optional().or(z.literal("")),
    })
  )
  .min(1, "Minimal satu link marketplace");

export const aboutSchema = z.object({
  headline: z.string().min(1, "Judul/profile wajib diisi").trim(),
  description: z.string().min(1, "Deskripsi wajib diisi").trim(),
  milestones: z
    .array(
      z.object({
        year: z.string().min(1).trim(),
        text: z.string().min(1).trim(),
      })
    )
    .default([]),
});

export const heroSlideSchema = z.object({
  id: z.string().min(1).max(64),
  title: z.string().min(1, "Judul slide wajib diisi").trim().max(120),
  desc: z.string().min(1, "Deskripsi slide wajib diisi").trim().max(600),
  ctaLabel: z.string().min(1, "Label tombol wajib diisi").trim().max(60),
  ctaHref: z.string().min(1, "Link tombol wajib diisi").trim().max(300),
  mediaType: z.enum(["image", "svg", "anim"]),
  image: z.string().trim().max(2000).optional().or(z.literal("")),
  svg: z.string().trim().max(30000).optional().or(z.literal("")),
  anim: z.enum(HERO_ANIM_PRESETS).default("waves"),
});

export const heroSchema = z
  .array(heroSlideSchema)
  .min(1, "Minimal satu slide hero");