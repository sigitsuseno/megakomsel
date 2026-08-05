import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex-grow flex items-center justify-center py-24 px-4">
      <div className="text-center">
        <p className="font-heading text-7xl font-bold text-primary dark:text-secondary">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-ink">Halaman tidak ditemukan</h1>
        <p className="mt-2 text-sm text-ink/60">
          Halaman yang Anda cari mungkin sudah dipindahkan atau dihapus.
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button>Kembali ke Beranda</Button>
        </Link>
      </div>
    </div>
  );
}
