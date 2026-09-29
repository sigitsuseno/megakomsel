"use client";

import { useActionState, useRef, useState } from "react";
import { Button, Input, Label, Select, Textarea } from "@/components/ui";

type Category = { id: string; name: string };
type Brand = { id: string; name: string };
type ProductState = { error?: string } | undefined;

export function ProductForm({
  action,
  categories,
  brands,
  defaultValues,
}: {
  action: (prevState: ProductState, formData: FormData) => Promise<ProductState>;
  categories: Category[];
  brands: Brand[];
  defaultValues?: {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: string;
    brandId: string;
    featured: boolean;
    active: boolean;
  };
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [imageUrl, setImageUrl] = useState(defaultValues?.image ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadInfo, setUploadInfo] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    setUploadInfo(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload/product", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload gagal");
      setImageUrl(data.url);
      const kb = Math.round((data.size as number) / 1024);
      setUploadInfo(`Terkirim & terkompresi: ${kb} KB (maks 1MB).`);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      <div>
        <Label htmlFor="name">Nama Produk</Label>
        <Input id="name" name="name" required defaultValue={defaultValues?.name} placeholder="Laptop Lenovo ThinkPad X1" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="categoryId">Kategori</Label>
          <Select id="categoryId" name="categoryId" required defaultValue={defaultValues?.categoryId}>
            <option value="">Pilih kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="brandId">Merek (opsional)</Label>
          <Select id="brandId" name="brandId" defaultValue={defaultValues?.brandId ?? ""}>
            <option value="">Tanpa merek</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="price">Harga (Rp)</Label>
          <Input id="price" name="price" type="number" min={1} required defaultValue={defaultValues?.price ?? ""} placeholder="15000000" />
        </div>
        <div>
          <Label htmlFor="stock">Stok</Label>
          <Input id="stock" name="stock" type="number" min={0} defaultValue={defaultValues?.stock ?? 0} />
        </div>
      </div>

      <div>
        <Label htmlFor="image">Gambar</Label>
        <div className="flex gap-3 items-start">
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="Pratinjau gambar produk"
              className="w-20 h-20 rounded-xl object-cover border border-line bg-surface shrink-0"
            />
          )}
          <div className="flex-grow space-y-2">
            <Input
              id="image"
              name="image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://... atau hasil upload"
            />
            <div className="flex items-center gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="text-xs text-ink/70 file:mr-2 file:px-3 file:py-1.5 file:rounded-lg file:border file:border-line file:bg-card file:text-xs file:font-semibold file:text-ink hover:file:border-secondary"
                onChange={(e) => handleFile(e.target.files?.[0])}
                disabled={uploading}
                aria-label="Upload gambar produk"
              />
              {uploading && <span className="text-xs text-ink/60">Mengompresi...</span>}
            </div>
            <p className="text-xs text-ink/60">
              Upload menerima PNG/JPG/WebP (maks 8MB) — otomatis dikompresi menjadi WebP ≤ 1MB.
              Atau isi URL gambar eksternal langsung.
            </p>
            {uploadInfo && <p className="text-xs text-emerald-600 dark:text-emerald-400">{uploadInfo}</p>}
            {uploadError && <p className="text-xs text-danger" role="alert">{uploadError}</p>}
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea id="description" name="description" rows={4} required defaultValue={defaultValues?.description} placeholder="Deskripsi lengkap produk..." />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="featured" defaultChecked={defaultValues?.featured} className="accent-primary" />
          Produk unggulan
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="active" defaultChecked={defaultValues?.active ?? true} className="accent-primary" />
          Aktif
        </label>
      </div>

      {state?.error && (
        <p className="p-3 rounded-xl bg-danger/10 text-danger text-sm font-medium" role="alert">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={pending || uploading} className="px-8">
        {pending ? "Menyimpan..." : "Simpan Produk"}
      </Button>
    </form>
  );
}
