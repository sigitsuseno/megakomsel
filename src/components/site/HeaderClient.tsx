"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/store/CartProvider";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { cn } from "@/lib/utils";

type SessionUser = { id: string; name: string; email: string; role: string } | null;

const PREVIEW_DATA: Record<string, { title: string; desc: string; img: string }> = {
  about: {
    title: "Gedung Kantor Modern",
    desc: "Fasilitas workshop dan kantor pusat penunjang operasional Megakomsel.",
    img: "https://picsum.photos/600/400?random=1",
  },
  services: {
    title: "Ruang Server & Jaringan",
    desc: "Dokumentasi instalasi rak server, router Mikrotik, & pengabelan LAN.",
    img: "https://picsum.photos/600/400?random=2",
  },
  store: {
    title: "Stok Produk IT Lengkap",
    desc: "Pengadaan unit PC, Laptop, & Sparepart resmi garansi manufaktur.",
    img: "https://picsum.photos/600/400?random=3",
  },
  contact: {
    title: "Layanan Customer Service",
    desc: "Tim teknisi sigap melayani via WhatsApp & panggilan darurat 7 hari seminggu.",
    img: "https://picsum.photos/600/400?random=5",
  },
};

const OFF_CANVAS_LINKS = [
  { label: "Tentang Kami", href: "#tentang", preview: "about" },
  { label: "Layanan & Store", href: "/store", preview: "store" },
  { label: "Layanan Jasa", href: "#layanan", preview: "services" },
  { label: "Hubungi Kami", href: "#kontak", preview: "contact" },
];

export function HeaderClient({
  session,
  company,
}: {
  session: SessionUser;
  company: { wa1Url: string; brand: string; tagline: string };
}) {
  const [scrolled, setScrolled] = useState(false);
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(PREVIEW_DATA.about);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      setScrolled(top > 20);
      const doc = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(doc > 0 ? (top / doc) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = offcanvasOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOffcanvasOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [offcanvasOpen]);

  const navLinks = [
    { label: "Layanan", href: "#layanan" },
    { label: "Tentang", href: "#tentang" },
    { label: "Store", href: "/store" },
    { label: "Kontak", href: "#kontak" },
  ];

  return (
    <>
      {/* Scroll progress */}
      <div
        className="fixed top-0 left-0 h-1 bg-secondary z-50 transition-all duration-150"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 border-b",
          scrolled
            ? "bg-card/80 backdrop-blur-md shadow-sm border-line"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Megakomsel Beranda">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:bg-primary-600 transition-colors">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-2xl tracking-tight text-ink">
                {company.brand}
              </span>
              <span className="text-[10px] tracking-widest text-secondary font-semibold uppercase -mt-1">
                {company.tagline}
              </span>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm" aria-label="Navigasi Utama">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-ink hover:text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              href="/cart"
              aria-label={`Keranjang belanja, ${count} item`}
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
                className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-xl border border-line bg-card text-ink text-sm font-medium hover:border-secondary transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-xl border border-line bg-card text-ink text-sm font-medium hover:border-secondary transition-colors"
              >
                Masuk
              </Link>
            )}

            <a
              href={company.wa1Url}
              target="_blank"
              rel="noopener"
              className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Konsultasi
            </a>

            <button
              onClick={() => setOffcanvasOpen(true)}
              aria-label="Buka Menu Navigasi"
              aria-expanded={offcanvasOpen}
              className="md:hidden p-2.5 rounded-xl border border-line bg-card text-ink"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Offcanvas fullscreen */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-[#0E1624] text-white transition-all duration-300 flex flex-col md:flex-row",
          offcanvasOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu Navigasi"
      >
        <button
          onClick={() => setOffcanvasOpen(false)}
          aria-label="Tutup Menu"
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full md:w-1/2 p-8 lg:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-800">
          <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-6">
            Navigasi Utama
          </span>
          <nav className="flex flex-col gap-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
            {OFF_CANVAS_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOffcanvasOpen(false)}
                onMouseEnter={() => setPreview(PREVIEW_DATA[item.preview])}
                className="hover:text-secondary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={session ? "/dashboard" : "/login"}
              onClick={() => setOffcanvasOpen(false)}
              className="text-secondary text-2xl lg:text-3xl hover:text-white transition-colors mt-4"
            >
              {session ? "Dashboard" : "Masuk / Daftar"}
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex w-1/2 p-12 items-center justify-center bg-slate-900/50 relative overflow-hidden">
          <div className="max-w-md text-center">
            <Image
              src={preview.img}
              alt=""
              width={512}
              height={256}
              className="w-full h-64 object-cover rounded-2xl shadow-2xl mb-6 border border-slate-700"
            />
            <h3 className="font-heading text-2xl font-bold mb-2 text-white">{preview.title}</h3>
            <p className="text-slate-400 text-sm">{preview.desc}</p>
          </div>
        </div>
      </div>
    </>
  );
}
