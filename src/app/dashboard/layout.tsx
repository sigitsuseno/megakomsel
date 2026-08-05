import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "@/actions/auth";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary text-white font-bold flex items-center justify-center">
              M
            </div>
            <span className="font-heading font-bold text-lg text-ink">Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:inline-flex text-xs font-semibold text-primary dark:text-secondary hover:underline"
            >
              Lihat Situs
            </Link>
            <span className="hidden sm:inline text-xs text-ink/60">
              {user.name} ({user.role})
            </span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl border border-line bg-card text-ink text-xs font-semibold hover:border-danger hover:text-danger transition-colors"
              >
                Keluar
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        <Sidebar />
        <main className="flex-grow min-w-0">{children}</main>
      </div>
    </div>
  );
}
