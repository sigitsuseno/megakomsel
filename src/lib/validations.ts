import { z } from "zod";

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