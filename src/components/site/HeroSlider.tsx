"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    title: "Transformasi Digital Bisnis Anda",
    desc: "Tingkatkan efisiensi & keamanan infrastruktur IT perusahaan Anda bersama layanan teknisi ahli profesional dari Megakomsel.",
    cta: { label: "Konsultasi Gratis", href: "#kontak" },
    img: "https://picsum.photos/800/600?random=10",
  },
  {
    title: "Promo CCTV Hingga 30%",
    desc: "Sistem pengawasan keamanan IP CCTV terintegrasi 24/7, dapat dipantau langsung kapan saja melalui perangkat smartphone Anda.",
    cta: { label: "Lihat Paket CCTV", href: "#layanan" },
    img: "https://picsum.photos/800/600?random=11",
  },
  {
    title: "Layanan Pengadaan Peralatan IT",
    desc: "Mitra pengadaan resmi PC, Laptop, Server, dan Perlengkapan Kantor untuk instansi pemerintah & swasta via SiPLah & INAPROC.",
    cta: { label: "Store Resmi", href: "/store" },
    img: "https://picsum.photos/800/600?random=12",
  },
  {
    title: "Web & App Development",
    desc: "Pengembangan aplikasi & website perusahaan yang modern, responsif, aman, dan siap meningkatkan kredibilitas brand Anda.",
    cta: { label: "Mulai Project", href: "#kontak" },
    img: "https://picsum.photos/800/600?random=13",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const go = (index: number) => {
    setCurrent(index);
    resetTimer();
  };

  return (
    <section className="relative py-12 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Kiri: text slider */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary-600 dark:text-secondary border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
              IT Partner Terpercaya &amp; Profesional
            </span>

            <div className="relative min-h-[260px] sm:min-h-[240px]">
              {SLIDES.map((slide, i) => (
                <div
                  key={slide.title}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500 space-y-4",
                    i === current ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                >
                  <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg text-ink/75 leading-relaxed max-w-xl">
                    {slide.desc}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={slide.cta.href}
                      className="inline-flex items-center px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-600 transition-all shadow-md"
                    >
                      {slide.cta.label}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-4" role="tablist" aria-label="Slide Hero">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.title}
                  onClick={() => go(i)}
                  aria-label={`Slide ${i + 1}`}
                  aria-current={i === current}
                  className={cn(
                    "rounded-full transition-all",
                    i === current
                      ? "w-8 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-gray-300 dark:bg-slate-700"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Kanan: image slider + vignette */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-line bg-card p-2 shadow-xl">
              <div className="hero-vignette relative h-[320px] sm:h-[420px] rounded-xl overflow-hidden">
                {SLIDES.map((slide, i) => (
                  <Image
                  key={slide.img}
                  src={slide.img}
                  alt={slide.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={cn(
                    "object-cover transition-opacity duration-500",
                    i === current ? "opacity-100" : "opacity-0"
                  )}
                  priority={i === 0}
                />
                ))}
              </div>

              <button
                onClick={() => go((current - 1 + SLIDES.length) % SLIDES.length)}
                aria-label="Slide Sebelumnya"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-slate-900/80 text-ink hover:bg-white transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => go((current + 1) % SLIDES.length)}
                aria-label="Slide Selanjutnya"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-slate-900/80 text-ink hover:bg-white transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
