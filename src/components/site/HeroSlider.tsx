"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HeroMediaVisual } from "@/components/site/HeroMedia";
import type { HeroSlide } from "@/lib/site";

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = slides.length;

  const resetTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (!count) return;
    timer.current = setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, 5000);
  }, [count]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [resetTimer]);

  if (!count) return null;

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
              {slides.map((slide, i) => (
                <div
                  key={slide.id}
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
                      href={slide.ctaHref}
                      className="inline-flex items-center px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-600 transition-all shadow-md"
                    >
                      {slide.ctaLabel}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-4" role="tablist" aria-label="Slide Hero">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
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

          {/* Kanan: media slider (gambar / svg / animasi) + vignette */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              <div className="relative h-[320px] sm:h-[420px] overflow-hidden">
                {slides.map((slide, i) => (
                  <div
                    key={slide.id}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500",
                      i === current ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <HeroMediaVisual slide={slide} />
                  </div>
                ))}
              </div>

              <button
                onClick={() => go((current - 1 + count) % count)}
                aria-label="Slide Sebelumnya"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-slate-900/80 text-ink hover:bg-white transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => go((current + 1) % count)}
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
