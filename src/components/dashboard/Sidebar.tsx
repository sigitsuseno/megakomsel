"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Overview", href: "/dashboard", icon: "▦" },
  { label: "Produk", href: "/dashboard/products", icon: "📦" },
  { label: "Kategori", href: "/dashboard/categories", icon: "🗂️" },
  { label: "Merek", href: "/dashboard/brands", icon: "🏷️" },
  { label: "Pesanan", href: "/dashboard/orders", icon: "🧾" },
  { label: "Pesan Masuk", href: "/dashboard/messages", icon: "✉️" },
  { label: "WEB UI", href: "/dashboard/web-ui", icon: "🌐" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:w-60 shrink-0">
      <nav className="lg:sticky lg:top-24 space-y-1" aria-label="Menu Dashboard">
        {LINKS.map((link) => {
          const active =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-white"
                  : "text-ink/70 hover:bg-primary/10 hover:text-ink"
              )}
            >
              <span aria-hidden="true">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
