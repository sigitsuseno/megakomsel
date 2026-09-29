import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { getSession } from "@/lib/auth";
import {
  ALLOWED_INPUT_TYPES,
  MAX_INPUT_BYTES,
  MAX_OUTPUT_BYTES,
  compressProductImage,
} from "@/lib/productImage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Upload gambar produk ke folder public/uploads/products.
 * Hanya ADMIN. File apapun dikompresi menjadi WebP dengan garansi ≤ 1MB.
 * Mengembalikan path publik + ukuran hasil kompresi (mis. /uploads/products/xxx.webp).
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "File tidak ditemukan." }, { status: 400 });
  }

  if (!ALLOWED_INPUT_TYPES.has(file.type)) {
    return Response.json(
      { error: "Tipe file harus PNG, JPG, atau WebP (GIF tidak didukung)." },
      { status: 400 }
    );
  }
  if (file.size > MAX_INPUT_BYTES) {
    return Response.json({ error: "Ukuran file maksimal 8MB." }, { status: 400 });
  }

  let compressed: Buffer;
  try {
    compressed = await compressProductImage(Buffer.from(await file.arrayBuffer()));
  } catch {
    return Response.json({ error: "Gagal mengompresi gambar." }, { status: 422 });
  }

  if (compressed.length > MAX_OUTPUT_BYTES) {
    return Response.json({ error: "Hasil kompresi masih melebihi 1MB." }, { status: 422 });
  }

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;
  const dir = path.join(process.cwd(), "public", "uploads", "products");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), compressed);

  return Response.json({ url: `/uploads/products/${filename}`, size: compressed.length });
}
