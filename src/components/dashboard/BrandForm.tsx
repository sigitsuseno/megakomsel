"use client";

import { useActionState } from "react";
import { Button, Input, Label } from "@/components/ui";

type BrandState = { error?: string } | undefined;

export function BrandForm({
  action,
  defaultValues,
}: {
  action: (prevState: BrandState, formData: FormData) => Promise<BrandState>;
  defaultValues?: { name: string };
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      <div>
        <Label htmlFor="name">Nama Merek</Label>
        <Input
          id="name"
          name="name"
          required
          maxLength={100}
          defaultValue={defaultValues?.name}
          placeholder="mis. Lenovo"
        />
        <p className="mt-1 text-xs text-ink/60">
          Slug dibuat otomatis dari nama dan tidak berubah saat nama diedit.
        </p>
      </div>

      {state?.error && (
        <p className="p-3 rounded-xl bg-danger/10 text-danger text-sm font-medium" role="alert">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={pending} className="px-8">
        {pending ? "Menyimpan..." : "Simpan Merek"}
      </Button>
    </form>
  );
}
