"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/actions/auth";
import { Button, Input, Label } from "@/components/ui";

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirect" value={redirectTo ?? ""} />
      <div>
        <Label htmlFor="email">Alamat Email</Label>
        <Input id="email" name="email" type="email" required placeholder="nama@email.com" autoComplete="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required placeholder="••••••••" autoComplete="current-password" />
      </div>

      {state?.error && (
        <p className="p-3 rounded-xl bg-danger/10 text-danger text-sm font-medium" role="alert">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full py-3 font-bold">
        {pending ? "Memproses..." : "Masuk"}
      </Button>

      <p className="text-center text-sm text-ink/60">
        Belum punya akun?{" "}
        <Link href="/register" className="font-semibold text-primary dark:text-secondary hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </form>
  );
}
