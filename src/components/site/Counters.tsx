"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/site";

export function Counters() {
  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<number[]>(STATS.map(() => 0));
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered.current) {
          triggered.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // Easing out quad
            const eased = progress * (2 - progress);
            setValues(STATS.map((s) => Math.floor(eased * s.value)));
            if (progress < 1) requestAnimationFrame(animate);
            else setValues(STATS.map((s) => s.value));
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="counter-section"
      ref={ref}
      className="py-16 bg-card border-y border-line"
      aria-label="Statistik Perusahaan"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="space-y-2">
              <div className="font-heading text-4xl lg:text-5xl font-bold text-primary-600 dark:text-secondary">
                {values[i].toLocaleString("id-ID")}
                {stat.suffix}
              </div>
              <p className="text-xs sm:text-sm text-ink/70 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
