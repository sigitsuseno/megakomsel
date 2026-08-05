import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Daftar",
  description: "Buat akun baru di Megakomsel.",
};

export default function RegisterPage() {
  return (
    <div className="flex-grow flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-xl bg-primary text-white font-bold flex items-center justify-center text-2xl shadow-md">
            M
          </div>
          <h1 className="mt-4 font-heading text-3xl font-bold text-ink">Buat Akun Baru</h1>
          <p className="mt-1 text-sm text-ink/60">Daftar gratis untuk belanja lebih cepat.</p>
        </div>
        <div className="p-8 rounded-2xl border border-line bg-card shadow-lg">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
