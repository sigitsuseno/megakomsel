"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction } from "@/actions/auth";
import { Button, Input, Label } from "@/components/ui";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <Label htmlFor="name">Nama Lengkap</Label>
        <Input id="name" name="name" required placeholder="Budi Santoso" autoComplete="name" />
      </div>
      <div>
        <Label htmlFor="email">Alamat Email</Label>
        <Input id="email" name="email" type="email" required placeholder="nama@email.com" autoComplete="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required placeholder="Minimal 8 karakter" autoComplete="new-password" />
        <p className="mt-1 text-xs text-ink/50">Gunakan minimal 8 karakter.</p>
      </div>

      {state?.error && (
        <p className="p-3 rounded-xl bg-danger/10 text-danger text-sm font-medium" role="alert">
          {state.error}
        </p>
      )}
      {state?.fieldErrors &&
        Object.entries(state.fieldErrors).map(([key, msg]) => (
          <p key={key} className="p-3 rounded-xl bg-danger/10 text-danger text-xs font-medium" role="alert">
            {msg}
          </p>
        ))}

      <Button type="submit" disabled={pending} className="w-full py-3 font-bold">
        {pending ? "Membuat akun..." : "Daftar"}
      </Button>

      <p className="text-center text-sm text-ink/60">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-semibold text-primary dark:text-secondary hover:underline">
          Masuk di sini
        </Link>
      </p>
    </form>
  );
}
