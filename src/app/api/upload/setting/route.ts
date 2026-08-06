import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/x-icon",
  "image/vnd.microsoft.icon",
]);
const MAX_BYTES = 2 * 1024 * 1024; // 2MB — logo & favicon berukuran kecil
const EXT_BY_TYPE: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/x-icon": "ico",
  "image/vnd.microsoft.icon": "ico",
};

/**
 * Upload logo / favicon untuk Setting ke folder public/uploads/settings.
 * Hanya ADMIN. Mengembalikan path publik (mis. /uploads/settings/xxx.png).
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

  if (!ALLOWED_TYPES.has(file.type)) {
    return Response.json(
      { error: "Tipe file harus PNG, JPG, WebP, GIF, SVG, atau ICO." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "Ukuran file maksimal 2MB." }, { status: 400 });
  }

  const ext = EXT_BY_TYPE[file.type] ?? "png";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", "settings");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()));

  return Response.json({ url: `/uploads/settings/${filename}` });
}
