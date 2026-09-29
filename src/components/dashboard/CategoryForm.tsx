"use client";

import { useActionState } from "react";
import { Button, Input, Label } from "@/components/ui";

type CategoryState = { error?: string } | undefined;

export function CategoryForm({
  action,
  defaultValues,
}: {
  action: (prevState: CategoryState, formData: FormData) => Promise<CategoryState>;
  defaultValues?: { name: string };
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      <div>
        <Label htmlFor="name">Nama Kategori</Label>
        <Input
          id="name"
          name="name"
          required
          maxLength={100}
          defaultValue={defaultValues?.name}
          placeholder="mis. Laptop"
        />
        <p className="mt-1 text-xs text-ink/60">
          Slug URL dibuat otomatis dari nama (mis. &ldquo;PC &amp; Workstation&rdquo; →{" "}
          <code>pc-workstation</code>) dan tidak berubah saat nama diedit.
        </p>
      </div>

      {state?.error && (
        <p className="p-3 rounded-xl bg-danger/10 text-danger text-sm font-medium" role="alert">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={pending} className="px-8">
        {pending ? "Menyimpan..." : "Simpan Kategori"}
      </Button>
    </form>
  );
}
