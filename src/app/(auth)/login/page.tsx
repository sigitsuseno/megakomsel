import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun Megakomsel Anda.",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const redirectTo = typeof params.redirect === "string" ? params.redirect : undefined;

  return (
    <div className="flex-grow flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-xl bg-primary text-white font-bold flex items-center justify-center text-2xl shadow-md">
            M
          </div>
          <h1 className="mt-4 font-heading text-3xl font-bold text-ink">Selamat Datang</h1>
          <p className="mt-1 text-sm text-ink/60">Masuk untuk melanjutkan belanja &amp; dashboard.</p>
        </div>
        <div className="p-8 rounded-2xl border border-line bg-card shadow-lg">
          <LoginForm redirectTo={redirectTo} />
        </div>
      </div>
    </div>
  );
}
