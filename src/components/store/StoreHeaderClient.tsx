"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/store/CartProvider";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import type { CompanySetting } from "@/lib/site";

type SessionUser = { id: string; name: string; email: string; role: string } | null;

type StoreCategory = { id: string; slug: string; name: string };

export function StoreHeaderClient({
  session,
  company,
  categories,
}: {
  session: SessionUser;
  company: Pick<CompanySetting, "brand" | "tagline" | "logo">;
  categories: StoreCategory[];
}) {
  const [catOpen, setCatOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-card/90 backdrop-blur-md border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
          {/* Logo → Home */}
          <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="Megakomsel Beranda">
            {company.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={company.logo}
                alt={`Logo ${company.brand}`}
                className="w-9 h-9 rounded-xl object-contain bg-card border border-line shadow-md"
              />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:bg-primary-600 transition-colors">
                M
              </div>
            )}
            <div className="hidden sm:flex flex-col">
              <span className="font-heading font-bold text-lg tracking-tight text-ink leading-tight">
                {company.brand}
              </span>
              <span className="text-[9px] tracking-widest text-secondary font-semibold uppercase leading-tight">
                {company.tagline}
              </span>
            </div>
          </Link>

          {/* Dropdown Kategori */}
          <div className="relative shrink-0">
            <button
              onClick={() => setCatOpen((v) => !v)}
              aria-label="Pilih Kategori"
              aria-expanded={catOpen}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-line bg-surface text-sm font-semibold text-ink hover:border-secondary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="hidden md:inline">Kategori</span>
              <svg
                className={`w-3.5 h-3.5 text-ink/50 transition-transform ${catOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {catOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setCatOpen(false)} aria-hidden="true" />
                <div className="absolute left-0 top-full mt-2 z-50 w-56 rounded-2xl border border-line bg-card shadow-xl p-2">
                  <Link
                    href="/store"
                    onClick={() => setCatOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-surface transition-colors"
                  >
                    Semua Kategori
                  </Link>
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/store?category=${c.slug}`}
                      onClick={() => setCatOpen(false)}
                      className="block px-4 py-2.5 rounded-xl text-sm text-ink/80 hover:bg-surface hover:text-secondary transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Pencarian */}
          <form action="/store" method="get" className="flex-1 max-w-xl">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="search"
                name="q"
                placeholder="Cari produk..."
                aria-label="Cari produk"
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-line bg-surface text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
          </form>

          {/* Aksi */}
          <div className="flex items-center gap-2 ml-auto">
            <Link
              href="/"
              className="hidden md:inline-flex p-2.5 rounded-xl border border-line bg-card text-ink hover:border-secondary transition-colors"
              aria-label="Beranda"
              title="Beranda"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1v-10.5z" />
              </svg>
            </Link>

            <Link
              href="/cart"
              aria-label={`Keranjang belanja, ${count} item`}
              title="Keranjang"
              className="relative p-2.5 rounded-xl border border-line bg-card text-ink hover:border-secondary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-secondary text-slate-900 text-[10px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            <ThemeToggle />

            {session ? (
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex px-4 py-2 rounded-xl border border-line bg-card text-ink text-xs font-semibold hover:border-secondary transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex px-4 py-2 rounded-xl border border-line bg-card text-ink text-xs font-semibold hover:border-secondary transition-colors"
              >
                Masuk
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
