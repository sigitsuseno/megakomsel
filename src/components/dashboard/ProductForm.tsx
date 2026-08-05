"use client";

import { useActionState } from "react";
import { Button, Input, Label, Select, Textarea } from "@/components/ui";

type Category = { id: string; name: string };
type ProductState = { error?: string } | undefined;

export function ProductForm({
  action,
  categories,
  defaultValues,
}: {
  action: (prevState: ProductState, formData: FormData) => Promise<ProductState>;
  categories: Category[];
  defaultValues?: {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: string;
    featured: boolean;
    active: boolean;
  };
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

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
          <Label htmlFor="price">Harga (Rp)</Label>
          <Input id="price" name="price" type="number" min={1} required defaultValue={defaultValues?.price ?? ""} placeholder="15000000" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="stock">Stok</Label>
          <Input id="stock" name="stock" type="number" min={0} defaultValue={defaultValues?.stock ?? 0} />
        </div>
        <div>
          <Label htmlFor="image">URL Gambar</Label>
          <Input id="image" name="image" defaultValue={defaultValues?.image} placeholder="https://... (opsional)" />
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

      <Button type="submit" disabled={pending} className="px-8">
        {pending ? "Menyimpan..." : "Simpan Produk"}
      </Button>
    </form>
  );
}
