import sharp from "sharp";

/** Batas output: hasil kompresi DIJAMIN tidak lebih dari ini. */
export const MAX_OUTPUT_BYTES = 1 * 1024 * 1024; // 1MB
/** Batas input: file mentah yang diterima server (cegah memori jebol). */
export const MAX_INPUT_BYTES = 8 * 1024 * 1024; // 8MB
/** GIF ditolak: animasi hancur saat dikonversi & garansi 1MB sulit dipenuhi. */
export const ALLOWED_INPUT_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

/**
 * Kompresi gambar produk menjadi WebP dengan garansi ukuran ≤ 1MB.
 * Strategi: turunkan quality bertahap (82→30); bila masih kebesaran,
 * kecilkan dimensi lalu ulangi. Foto 400px q30 selalu jauh di bawah 1MB,
 * sehingga loop pasti konvergen.
 */
export async function compressProductImage(input: Buffer): Promise<Buffer> {
  let maxDim = 1600;
  let quality = 82;

  for (let round = 0; round < 8; round++) {
    const out = await sharp(input)
      .rotate() // hormati orientasi EXIF
      .resize({ width: maxDim, height: maxDim, fit: "inside", withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();

    if (out.length <= MAX_OUTPUT_BYTES) return out;

    if (quality > 30) {
      quality -= 12;
    } else {
      // Quality mentok: perkecil dimensi & ulangi dari quality awal.
      maxDim = Math.max(400, Math.floor(maxDim * 0.7));
      quality = 82;
      if (maxDim === 400 && quality === 82 && round > 4) break;
    }
  }

  // Jaring pengaman terakhir (praktis tidak tercapai untuk foto).
  const fallback = await sharp(input)
    .rotate()
    .resize({ width: 400, height: 400, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 30 })
    .toBuffer();
  if (fallback.length > MAX_OUTPUT_BYTES) {
    throw new Error("Kompresi gagal mencapai 1MB.");
  }
  return fallback;
}
